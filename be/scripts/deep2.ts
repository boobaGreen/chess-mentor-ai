import axios from "axios";
import { env } from "../src/utils/loadDotEnv";
import fs from "fs";
import path from "path";

interface DeepseekResponse {
  id: string;
  choices: Array<{
    message: {
      role: string;
      content: string;
    };
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
    prompt_cache_hit_tokens: number;
    prompt_cache_miss_tokens: number;
  };
}

interface UserProfile {
  id: string;
  name: string;
  level: string;
  elo: number;
  experience: string;
  interests?: string[]; // Interessi specifici degli scacchi dell'utente
  favoritePlayer?: string;
  favoriteOpening?: string;
}

interface ContentRequest {
  profile: UserProfile;
  contentType: "rebus" | "historical-game" | "story";
  difficulty?: 1 | 2 | 3 | 4 | 5; // Livello di difficoltà (1-5)
  theme?: string; // Tema specifico (es. "sacrificio", "finale", "tattica")
  specificRequest?: string; // Richiesta specifica dell'utente
}

// Utility per calcolare i costi
const calculateCost = (usage: DeepseekResponse["usage"]) => {
  const rates = {
    cacheHit: 0.07,
    cacheMiss: 0.27,
    output: 1.1,
  };

  return {
    cacheHitCost: (usage.prompt_cache_hit_tokens * rates.cacheHit) / 1000000,
    cacheMissCost: (usage.prompt_cache_miss_tokens * rates.cacheMiss) / 1000000,
    outputCost: (usage.completion_tokens * rates.output) / 1000000,
    total:
      (usage.prompt_cache_hit_tokens * rates.cacheHit +
        usage.prompt_cache_miss_tokens * rates.cacheMiss +
        usage.completion_tokens * rates.output) /
      1000000,
  };
};

// Sleep utility
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Funzione per generare il prompt appropriato in base al tipo di contenuto richiesto
const generatePrompt = (
  request: ContentRequest
): { system: string; user: string } => {
  const {
    profile,
    contentType,
    difficulty = 3,
    theme,
    specificRequest,
  } = request;

  // Base del prompt di sistema
  let systemPrompt = `You are an expert chess content creator with deep knowledge of chess history, famous games, and educational puzzles.
You're creating engaging chess content for a ${profile.level} player (ELO: ${profile.elo}).

When creating content, always:
- Adapt difficulty to their level (${profile.level}, ELO: ${profile.elo})
- Write in an engaging, passionate style
- Include visual descriptions where appropriate
- Use proper chess notation
- Provide context and explanations suitable for their level`;

  // Base del prompt utente
  let userPrompt = `Player profile:
Name: ${profile.name}
Level: ${profile.level} (ELO: ${profile.elo})
Experience: ${profile.experience}
${profile.interests ? `Interests: ${profile.interests.join(", ")}` : ""}
${profile.favoritePlayer ? `Favorite player: ${profile.favoritePlayer}` : ""}
${profile.favoriteOpening ? `Favorite opening: ${profile.favoriteOpening}` : ""}

Difficulty level requested: ${difficulty}/5
${theme ? `Theme: ${theme}` : ""}
${specificRequest ? `Specific request: ${specificRequest}` : ""}`;

  // Personalizzazione basata sul tipo di contenuto
  switch (contentType) {
    case "rebus":
      systemPrompt += `
      
You're specialized in creating chess puzzles and rebuses. For each puzzle:
- Make it visually clear and understandable
- Ensure it has a definitive solution
- Tailor the difficulty to the player's level
- Include clear instructions
- Use standard chess notation
- Always provide the solution at the end`;

      userPrompt += `\n\nPlease create an engaging chess puzzle/rebus that will challenge but not frustrate this player.
The puzzle should include:
- A clear setup
- Specific goal (mate in X moves, win material, find the best move)
- Visual description of the position
- FEN notation of the starting position
- The solution with explanation

For difficulty ${difficulty}/5 and player level ${profile.level}, adjust complexity appropriately.`;
      break;

    case "historical-game":
      systemPrompt += `
      
You're specialized in presenting historical chess games in an educational way. For each game:
- Choose games appropriate for the player's level
- Highlight key moments and strategic concepts
- Explain the historical context
- Include notable quotes or anecdotes related to the game
- Use proper chess notation with clear explanations`;

      userPrompt += `\n\nPlease present a historical chess game that would be both educational and interesting for this player.
The analysis should include:
- Game context and players
- Key strategic concepts (at appropriate level)
- Critical positions with diagrams (described in text)
- Notable quotes or anecdotes
- Key lessons that can be learned

For difficulty ${difficulty}/5 and player level ${profile.level}, focus on ${
        profile.level === "beginner"
          ? "clear patterns and basic concepts"
          : profile.level === "intermediate"
          ? "middlegame strategy and tactical patterns"
          : "subtle positional concepts and deep strategic ideas"
      }.`;
      break;

    case "story":
      systemPrompt += `
      
You're specialized in creating engaging chess stories and anecdotes. For each story:
- Make it emotionally engaging and educational
- Include authentic historical details
- Connect the story to chess principles
- Choose stories appropriate to the player's level
- End with a meaningful chess lesson or insight`;

      userPrompt += `\n\nPlease share an engaging chess story or anecdote that would resonate with this player.
The story should:
- Be memorable and entertaining
- Include historical context
- Connect to chess principles appropriate for their level
- Share a meaningful insight or lesson about chess or life
- Be appropriate in length (not too short, not too long)

For a ${profile.level} player, focus on stories that highlight ${
        profile.level === "beginner"
          ? "determination, learning from mistakes, and basic principles"
          : profile.level === "intermediate"
          ? "strategic thinking, famous rivalries, and creative play"
          : "deep calculation, psychological warfare, and chess mastery"
      }.`;
      break;
  }

  return { system: systemPrompt, user: userPrompt };
};

// Funzione per chiamare l'API
const getAIContent = async (request: ContentRequest) => {
  const MAX_RETRIES = 3;
  const RETRY_DELAY = 2000; // 2 seconds
  const API_URL = "https://api.deepseek.com/v1/chat/completions";

  const prompts = generatePrompt(request);

  let attempts = 0;
  while (attempts < MAX_RETRIES) {
    try {
      console.log(`Richiesta API: tentativo ${attempts + 1}/${MAX_RETRIES}`);

      const response = await axios.post<DeepseekResponse>(
        API_URL,
        {
          model: "deepseek-chat",
          messages: [
            { role: "system", content: prompts.system },
            { role: "user", content: prompts.user },
          ],
          temperature: 0.7, // Temperatura più alta per contenuto creativo
          max_tokens: 1000, // Token aumentati per storie e analisi più lunghe
          use_cache: true,
        },
        {
          headers: {
            Authorization: `Bearer ${env.deepseekApiKey}`,
            "Content-Type": "application/json",
          },
          timeout: 60000, // 60 secondi di timeout
        }
      );

      if (
        !response.data ||
        !response.data.choices ||
        !response.data.choices[0]
      ) {
        throw new Error("Risposta API non valida");
      }

      const content = response.data.choices[0].message.content;
      const usage = response.data.usage;
      const costs = calculateCost(usage);

      return { content, usage, costs };
    } catch (error: any) {
      attempts++;
      console.error(
        `Tentativo ${attempts} fallito:`,
        error.response?.data?.error?.message || error.message
      );

      if (attempts < MAX_RETRIES) {
        console.log(
          `Attesa di ${
            RETRY_DELAY / 1000
          } secondi prima del prossimo tentativo...`
        );
        await sleep(RETRY_DELAY);
      } else {
        return {
          content:
            "ERRORE API: Impossibile ottenere una risposta dopo multipli tentativi.",
          usage: {
            prompt_tokens: 0,
            completion_tokens: 0,
            total_tokens: 0,
            prompt_cache_hit_tokens: 0,
            prompt_cache_miss_tokens: 0,
          },
          costs: {
            cacheHitCost: 0,
            cacheMissCost: 0,
            outputCost: 0,
            total: 0,
          },
        };
      }
    }
  }

  // Questa riga non dovrebbe mai essere raggiunta, ma TypeScript richiede un return
  throw new Error("Errore imprevisto");
};

// Profili utenti per test
const profiles: UserProfile[] = [
  {
    id: "beginner1",
    name: "Marco",
    level: "beginner",
    elo: 800,
    experience: "Playing for 3 months",
    interests: ["famous players", "checkmates", "openings"],
    favoritePlayer: "Bobby Fischer",
  },
  {
    id: "intermediate1",
    name: "Sofia",
    level: "intermediate",
    elo: 1500,
    experience: "Playing for 2 years, club player",
    interests: ["tactics", "Sicilian Defense", "chess history"],
    favoriteOpening: "Sicilian Defense",
  },
  {
    id: "advanced1",
    name: "Alessandro",
    level: "advanced",
    elo: 2100,
    experience: "Tournament player for 10 years",
    interests: ["positional play", "endgames", "chess psychology"],
    favoritePlayer: "Anatoly Karpov",
  },
];

// Richieste di contenuti per test
const contentRequests: ContentRequest[] = [
  // Rebus per diversi livelli
  {
    profile: profiles[0],
    contentType: "rebus",
    difficulty: 1,
    theme: "checkmate patterns",
  },
  {
    profile: profiles[1],
    contentType: "rebus",
    difficulty: 3,
    theme: "tactical combinations",
  },
  {
    profile: profiles[2],
    contentType: "rebus",
    difficulty: 5,
    theme: "positional sacrifices",
  },

  // Partite storiche per diversi livelli
  {
    profile: profiles[0],
    contentType: "historical-game",
    theme: "famous checkmates",
  },
  {
    profile: profiles[1],
    contentType: "historical-game",
    theme: "Sicilian Defense brilliancies",
  },
  {
    profile: profiles[2],
    contentType: "historical-game",
    theme: "endgame masterpieces",
  },

  // Storie scacchistiche per diversi livelli
  {
    profile: profiles[0],
    contentType: "story",
    theme: "chess beginnings",
  },
  {
    profile: profiles[1],
    contentType: "story",
    theme: "overcoming challenges",
  },
  {
    profile: profiles[2],
    contentType: "story",
    theme: "psychology in chess",
  },

  // Richieste specifiche
  {
    profile: profiles[0],
    contentType: "rebus",
    specificRequest: "A simple puzzle about protecting pieces",
  },
  {
    profile: profiles[1],
    contentType: "historical-game",
    specificRequest:
      "A game where the Sicilian Defense leads to a brilliant attack",
  },
  {
    profile: profiles[2],
    contentType: "story",
    specificRequest:
      "A story about concentration and focus in critical moments",
  },
];

// Funzione per assicurare che la directory esista
const ensureDirectoryExists = (dirPath: string) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// Funzione principale
const main = async () => {
  console.log("===== CHESS ENRICHMENT CONTENT GENERATOR =====");
  console.log(`Data inizio: ${new Date().toLocaleString()}`);

  // Crea directory per i risultati
  const resultsDir = path.join(__dirname, "../../results");
  ensureDirectoryExists(resultsDir);

  const resultsFile = path.join(
    resultsDir,
    `chess-enrichment-${Date.now()}.json`
  );
  const logFile = path.join(
    resultsDir,
    `chess-enrichment-log-${Date.now()}.txt`
  );

  // Salva log su file oltre che console
  const logStream = fs.createWriteStream(logFile, { flags: "a" });
  const originalConsoleLog = console.log;
  const originalConsoleError = console.error;

  console.log = function () {
    const args = Array.from(arguments);
    originalConsoleLog.apply(console, args);
    logStream.write(args.join(" ") + "\n");
  };

  console.error = function () {
    const args = Array.from(arguments);
    originalConsoleError.apply(console, args);
    logStream.write("[ERROR] " + args.join(" ") + "\n");
  };

  // Array per i risultati
  const allResults: any[] = [];

  // Esegui tutte le richieste di contenuti
  for (const request of contentRequests) {
    const { profile, contentType, theme, specificRequest, difficulty } =
      request;

    console.log(
      `\n===== GENERAZIONE CONTENUTO PER ${profile.name.toUpperCase()} (${
        profile.level
      }, ELO: ${profile.elo}) =====`
    );
    console.log(`Tipo contenuto: ${contentType.toUpperCase()}`);

    if (theme) console.log(`Tema: ${theme}`);
    if (difficulty) console.log(`Difficoltà: ${difficulty}/5`);
    if (specificRequest) console.log(`Richiesta specifica: ${specificRequest}`);

    try {
      console.log("Chiamata API in corso...");
      const startTime = Date.now();

      const { content, usage, costs } = await getAIContent(request);

      const elapsedTime = Date.now() - startTime;
      console.log(
        `Tempo di risposta: ${(elapsedTime / 1000).toFixed(2)} secondi`
      );

      console.log("\n--- CONTENUTO GENERATO ---");
      console.log(content);
      console.log("\n--- STATISTICHE UTILIZZO ---");
      console.log(`- Token totali: ${usage.total_tokens}`);
      console.log(`- Costo: $${costs.total.toFixed(6)}`);

      // Salva risultato
      const result = {
        timestamp: new Date().toISOString(),
        profile: {
          name: profile.name,
          level: profile.level,
          elo: profile.elo,
        },
        request: {
          contentType,
          theme,
          difficulty,
          specificRequest,
        },
        content,
        usage,
        costs,
        responseTime: elapsedTime,
      };

      allResults.push(result);

      // Salva risultati dopo ogni query (per sicurezza)
      fs.writeFileSync(resultsFile, JSON.stringify(allResults, null, 2));
      console.log(`Risultati aggiornati salvati in: ${resultsFile}`);

      // Attendi un po' prima della prossima query per non sovraccaricare l'API
      await sleep(2000);
    } catch (error: any) {
      console.error(
        `ERRORE durante la generazione del contenuto: ${error.message}`
      );
    }
  }

  // Test comparativo: stesso contenuto, diversi livelli
  console.log("\n===== TEST COMPARATIVO =====");
  const theme = "the immortal game";

  // Define the type for comparativeResults
  interface ComparativeResult {
    profile: {
      name: string;
      level: string;
      elo: number;
    };
    content: string;
    usage: {
      prompt_tokens: number;
      completion_tokens: number;
      total_tokens: number;
      prompt_cache_hit_tokens: number;
      prompt_cache_miss_tokens: number;
    };
    costs: {
      cacheHitCost: number;
      cacheMissCost: number;
      outputCost: number;
      total: number;
    };
  }

  const comparativeResults: ComparativeResult[] = [];

  console.log(`TEMA: "${theme}"`);

  for (const profile of profiles) {
    console.log(
      `\nINVIO RICHIESTA PER ${profile.name.toUpperCase()} (${
        profile.level
      }, ELO: ${profile.elo})...`
    );

    try {
      const request: ContentRequest = {
        profile,
        contentType: "historical-game",
        theme,
      };

      const { content, usage, costs } = await getAIContent(request);

      console.log(
        `RISPOSTA RICEVUTA (${
          usage.total_tokens
        } tokens, $${costs.total.toFixed(6)})`
      );
      console.log(`Sommario contenuto: ${content.substring(0, 100)}...`);

      comparativeResults.push({
        profile: {
          name: profile.name,
          level: profile.level,
          elo: profile.elo,
        },
        content,
        usage,
        costs,
      });

      // Attendi un po' prima della prossima query
      await sleep(2000);
    } catch (error: any) {
      console.error(
        `ERRORE durante il test comparativo per ${profile.name}: ${error.message}`
      );
    }
  }

  // Aggiungi risultati comparativi
  allResults.push({
    test: "comparative-analysis",
    timestamp: new Date().toISOString(),
    theme,
    results: comparativeResults,
  });

  // Salva tutti i risultati nel file finale
  fs.writeFileSync(resultsFile, JSON.stringify(allResults, null, 2));

  // Estrazione per markdown
  const markdownContent = generateMarkdownReport(allResults);
  const mdFile = path.join(
    resultsDir,
    `chess-enrichment-report-${Date.now()}.md`
  );
  fs.writeFileSync(mdFile, markdownContent);

  console.log(`\n===== COMPLETATO =====`);
  console.log(`Data fine: ${new Date().toLocaleString()}`);
  console.log(`Tutti i risultati salvati in: ${resultsFile}`);
  console.log(`Report markdown salvato in: ${mdFile}`);
  console.log(`Log completo salvato in: ${logFile}`);

  // Ripristina console.log e console.error originali
  console.log = originalConsoleLog;
  console.error = originalConsoleError;

  // Analisi delle risposte
  console.log("\n===== ANALISI CONTENUTI =====");

  // Statistiche di base
  const successfulResponses = allResults.filter(
    (r) => !r.test && !r.content?.includes("ERRORE API")
  ).length;
  const totalRequests = contentRequests.length;

  console.log(
    `Contenuti generati con successo: ${successfulResponses}/${totalRequests} (${(
      (successfulResponses / totalRequests) *
      100
    ).toFixed(1)}%)`
  );

  const tokensStats = allResults
    .filter((r) => !r.test && r.usage?.total_tokens)
    .map((r) => r.usage.total_tokens);

  if (tokensStats.length > 0) {
    const avgTokens =
      tokensStats.reduce((sum, t) => sum + t, 0) / tokensStats.length;
    const minTokens = Math.min(...tokensStats);
    const maxTokens = Math.max(...tokensStats);

    console.log(
      `Token medi per contenuto: ${avgTokens.toFixed(
        0
      )} (min: ${minTokens}, max: ${maxTokens})`
    );
  }

  const costsStats = allResults
    .filter((r) => !r.test && r.costs?.total)
    .map((r) => r.costs.total);

  if (costsStats.length > 0) {
    const totalCost = costsStats.reduce((sum, c) => sum + c, 0);
    const avgCost = totalCost / costsStats.length;

    console.log(`Costo totale: $${totalCost.toFixed(6)}`);
    console.log(`Costo medio per contenuto: $${avgCost.toFixed(6)}`);
  }
};

// Funzione per generare un report markdown
function generateMarkdownReport(results: any[]): string {
  let markdown = `# Chess Enrichment Content Report\n\n`;
  markdown += `Generated: ${new Date().toLocaleString()}\n\n`;

  // Organizza per tipo di contenuto
  const rebusPuzzles = results.filter(
    (r) => !r.test && r.request?.contentType === "rebus"
  );
  const historicalGames = results.filter(
    (r) => !r.test && r.request?.contentType === "historical-game"
  );
  const stories = results.filter(
    (r) => !r.test && r.request?.contentType === "story"
  );
  const comparative = results.find((r) => r.test === "comparative-analysis");

  // Sezione puzzle
  if (rebusPuzzles.length > 0) {
    markdown += `## Chess Puzzles and Rebuses\n\n`;

    rebusPuzzles.forEach((puzzle) => {
      const profile = puzzle.profile;
      const request = puzzle.request;

      markdown += `### ${request.theme || "Chess Puzzle"} (Difficulty: ${
        request.difficulty || "N/A"
      }/5)\n\n`;
      markdown += `**For:** ${profile.name} (${profile.level}, ELO: ${profile.elo})\n\n`;
      markdown += `${puzzle.content}\n\n`;
      markdown += `---\n\n`;
    });
  }

  // Sezione partite storiche
  if (historicalGames.length > 0) {
    markdown += `## Historical Chess Games\n\n`;

    historicalGames.forEach((game) => {
      const profile = game.profile;
      const request = game.request;

      markdown += `### ${request.theme || "Historical Chess Game"}\n\n`;
      markdown += `**For:** ${profile.name} (${profile.level}, ELO: ${profile.elo})\n\n`;
      markdown += `${game.content}\n\n`;
      markdown += `---\n\n`;
    });
  }

  // Sezione storie
  if (stories.length > 0) {
    markdown += `## Chess Stories and Anecdotes\n\n`;

    stories.forEach((story) => {
      const profile = story.profile;
      const request = story.request;

      markdown += `### ${request.theme || "Chess Story"}\n\n`;
      markdown += `**For:** ${profile.name} (${profile.level}, ELO: ${profile.elo})\n\n`;
      markdown += `${story.content}\n\n`;
      markdown += `---\n\n`;
    });
  }

  // Sezione comparativa
  if (comparative) {
    markdown += `## Comparative Analysis: "${comparative.theme}"\n\n`;

    comparative.results.forEach((result) => {
      const profile = result.profile;

      markdown += `### For ${profile.name} (${profile.level}, ELO: ${profile.elo})\n\n`;
      markdown += `${result.content}\n\n`;
      markdown += `---\n\n`;
    });
  }

  // Statistiche finali
  const successfulResponses = results.filter(
    (r) => !r.test && !r.content?.includes("ERRORE API")
  ).length;
  const totalRequests = results.filter((r) => !r.test).length;

  const tokensStats = results
    .filter((r) => !r.test && r.usage?.total_tokens)
    .map((r) => r.usage.total_tokens);

  const avgTokens =
    tokensStats.length > 0
      ? tokensStats.reduce((sum, t) => sum + t, 0) / tokensStats.length
      : 0;

  const costsStats = results
    .filter((r) => !r.test && r.costs?.total)
    .map((r) => r.costs.total);

  const totalCost =
    costsStats.length > 0 ? costsStats.reduce((sum, c) => sum + c, 0) : 0;

  markdown += `## Statistics\n\n`;
  markdown += `- Total content pieces: ${totalRequests}\n`;
  markdown += `- Successfully generated: ${successfulResponses} (${(
    (successfulResponses / totalRequests) *
    100
  ).toFixed(1)}%)\n`;
  markdown += `- Average tokens per content: ${avgTokens.toFixed(0)}\n`;
  markdown += `- Total cost: $${totalCost.toFixed(6)}\n`;

  return markdown;
}

// Esegui lo script
main().catch((error) => {
  console.error("Errore esecuzione script:", error);
  process.exit(1);
});
