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
  strengths: string[];
  weaknesses: string[];
  goals: string[];
  recentGames: {
    result: "win" | "loss" | "draw";
    opponent: string;
    opening?: string;
    moveCount?: number;
    notes?: string;
  }[];
  recentPuzzles: {
    success: boolean;
    theme: string;
    difficulty: number;
    timeSpent: number;
  }[];
}

interface TestCase {
  profile: UserProfile;
  queries: string[];
  position?: string; // Optional chess position in FEN notation
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

// Funzione per chiamare l'API in base al profilo e alla query
const getAIResponse = async (
  profile: UserProfile,
  query: string,
  position?: string
) => {
  const MAX_RETRIES = 3;
  const RETRY_DELAY = 2000; // 2 seconds
  const API_URL = "https://api.deepseek.com/v1/chat/completions";

  const systemPrompt = `You are an expert chess tutor with grandmaster-level skills.
  You're helping a ${profile.level} player (ELO: ${profile.elo}).
  
  Their strengths: ${profile.strengths.join(", ")}
  Their weaknesses: ${profile.weaknesses.join(", ")}
  Their goals: ${profile.goals.join(", ")}
  
  Always tailor your advice to their specific level, strengths, weaknesses, and goals.
  Keep responses focused, practical and specific to chess improvement.`;

  const userContext = `Player context:
  Name: ${profile.name}
  Level: ${profile.level} (ELO: ${profile.elo})
  Experience: ${profile.experience}
  
  Recent games:
  ${profile.recentGames
    .map(
      (g) =>
        `- ${g.result.toUpperCase()} vs ${g.opponent}${
          g.opening ? ` (${g.opening})` : ""
        }`
    )
    .join("\n")}
  
  Recent puzzles performance:
  - Success rate: ${Math.round(
    (profile.recentPuzzles.filter((p) => p.success).length /
      profile.recentPuzzles.length) *
      100
  )}%
  - Average difficulty: ${
    profile.recentPuzzles.reduce((sum, p) => sum + p.difficulty, 0) /
    profile.recentPuzzles.length
  }
  
  ${position ? `Current position: ${position}` : ""}
  
  Question: ${query}`;

  let attempts = 0;
  while (attempts < MAX_RETRIES) {
    try {
      console.log(`Richiesta API: tentativo ${attempts + 1}/${MAX_RETRIES}`);

      const response = await axios.post<DeepseekResponse>(
        API_URL,
        {
          model: "deepseek-chat",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userContext },
          ],
          temperature: 0.3,
          max_tokens: 500,
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

      const answer = response.data.choices[0].message.content;
      const usage = response.data.usage;
      const costs = calculateCost(usage);

      return { answer, usage, costs };
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
          answer:
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

// Definizione dei profili utente
const profiles: UserProfile[] = [
  {
    id: "beginner1",
    name: "Marco",
    level: "beginner",
    elo: 800,
    experience: "Playing for 3 months",
    strengths: ["enthusiasm", "pattern recognition"],
    weaknesses: ["endgames", "tactical awareness", "time management"],
    goals: ["reach 1200 ELO", "improve tactical vision"],
    recentGames: [
      { result: "loss", opponent: "Club junior", notes: "Lost in endgame" },
      {
        result: "loss",
        opponent: "Online opponent",
        opening: "Italian Game",
      },
      { result: "win", opponent: "Sibling", notes: "Won by checkmate" },
    ],
    recentPuzzles: [
      { success: false, theme: "pin", difficulty: 1, timeSpent: 120 },
      { success: true, theme: "fork", difficulty: 1, timeSpent: 60 },
      {
        success: false,
        theme: "discovered attack",
        difficulty: 2,
        timeSpent: 180,
      },
    ],
  },
  {
    id: "intermediate1",
    name: "Sofia",
    level: "intermediate",
    elo: 1500,
    experience: "Playing for 2 years, club player",
    strengths: ["opening preparation", "attacking play"],
    weaknesses: [
      "positional understanding",
      "pawn structures",
      "defensive technique",
    ],
    goals: ["master Sicilian Defense", "improve calculation", "reach 1800 ELO"],
    recentGames: [
      {
        result: "win",
        opponent: "Club player",
        opening: "Sicilian Defense",
        moveCount: 32,
      },
      {
        result: "loss",
        opponent: "Tournament player",
        opening: "Queen's Gambit",
        notes: "Positional mistake in middlegame",
      },
      {
        result: "draw",
        opponent: "Online opponent",
        opening: "French Defense",
        moveCount: 60,
        notes: "Endgame technique issues",
      },
    ],
    recentPuzzles: [
      { success: true, theme: "pin", difficulty: 3, timeSpent: 90 },
      { success: true, theme: "tactics", difficulty: 3, timeSpent: 120 },
      { success: false, theme: "endgame", difficulty: 4, timeSpent: 210 },
    ],
  },
  {
    id: "advanced1",
    name: "Alessandro",
    level: "advanced",
    elo: 2100,
    experience: "Tournament player for 10 years",
    strengths: ["calculation", "endgame technique", "opening repertoire"],
    weaknesses: [
      "time pressure decisions",
      "complex middlegame positions",
      "psychological stability",
    ],
    goals: [
      "reach 2300 ELO",
      "improve performance in tournaments",
      "master dynamic sacrifice positions",
    ],
    recentGames: [
      {
        result: "win",
        opponent: "FM player",
        opening: "Sicilian Najdorf",
        moveCount: 41,
      },
      {
        result: "loss",
        opponent: "IM player",
        opening: "King's Indian Defense",
        notes: "Collapsed under time pressure",
      },
      {
        result: "win",
        opponent: "Club champion",
        opening: "Ruy Lopez",
        moveCount: 56,
        notes: "Complex endgame conversion",
      },
    ],
    recentPuzzles: [
      { success: true, theme: "calculation", difficulty: 5, timeSpent: 180 },
      { success: false, theme: "sacrifice", difficulty: 6, timeSpent: 240 },
      { success: true, theme: "endgame", difficulty: 5, timeSpent: 150 },
    ],
  },
];

// Posizioni scacchistiche in formato FEN
const positions = {
  tacticalPosition: "r4rk1/pp2ppbp/2p3p1/q7/3P1B2/P1Q5/1P3PPP/R3R1K1 w - - 0 1", // Posizione con tattica pin
  middlegamePosition:
    "r1bq1rk1/pp2ppbp/2np1np1/8/3NP3/2N1BP2/PPPQ2PP/R3KB1R w KQ - 0 1", // Posizione di mediogioco
  endgamePosition: "8/8/8/3k4/8/3K4/4P3/8 w - - 0 1", // Finale re e pedone contro re
};

// Query per ciascun profilo
const testCases: TestCase[] = [
  {
    profile: profiles[0], // beginner
    queries: [
      "What should I focus on learning first as a beginner?",
      "How can I improve my tactical vision?",
      "I always lose in endgames, what should I do?",
    ],
  },
  {
    profile: profiles[0], // beginner with position
    queries: ["What should I do in this position?", "Is there a tactic here?"],
    position: positions.tacticalPosition,
  },
  {
    profile: profiles[1], // intermediate
    queries: [
      "How can I improve my understanding of pawn structures?",
      "What resources would help me master the Sicilian Defense?",
      "I struggle in complex middlegame positions, any advice?",
    ],
  },
  {
    profile: profiles[1], // intermediate with position
    queries: [
      "What's my best plan in this position?",
      "How should I evaluate this position?",
    ],
    position: positions.middlegamePosition,
  },
  {
    profile: profiles[2], // advanced
    queries: [
      "How can I improve my performance under time pressure?",
      "What training regimen would you recommend for a 2100 player?",
      "How can I better handle complex positional sacrifices?",
    ],
  },
  {
    profile: profiles[2], // advanced with position
    queries: [
      "How should I proceed in this endgame?",
      "Analyze the key features of this position",
    ],
    position: positions.endgamePosition,
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
  console.log("===== CHESS TUTOR AI - TEST SCRIPT =====");
  console.log(`Data inizio: ${new Date().toLocaleString()}`);

  // Crea directory per i risultati
  const resultsDir = path.join(__dirname, "../../results");
  ensureDirectoryExists(resultsDir);

  const resultsFile = path.join(
    resultsDir,
    `chess-tutor-responses-${Date.now()}.json`
  );
  const logFile = path.join(resultsDir, `chess-tutor-log-${Date.now()}.txt`);

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

  // Esegui tutte le query in testCases
  for (const testCase of testCases) {
    const { profile, queries, position } = testCase;

    console.log(
      `\n===== TESTING FOR ${profile.name.toUpperCase()} (${
        profile.level
      }, ELO: ${profile.elo}) =====`
    );

    for (const query of queries) {
      console.log(`\nQUERY: "${query}"`);

      if (position) {
        console.log(`POSITION: ${position}`);
      }

      try {
        console.log("Chiamata API in corso...");
        const startTime = Date.now();

        const { answer, usage, costs } = await getAIResponse(
          profile,
          query,
          position
        );

        const elapsedTime = Date.now() - startTime;
        console.log(
          `Tempo di risposta: ${(elapsedTime / 1000).toFixed(2)} secondi`
        );

        console.log("\n--- RISPOSTA AI ---");
        console.log(answer);
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
          query,
          position,
          answer,
          usage,
          costs,
          responseTime: elapsedTime,
        };

        allResults.push(result);

        // Salva risultati dopo ogni query (per sicurezza)
        fs.writeFileSync(resultsFile, JSON.stringify(allResults, null, 2));
        console.log(`Risultati aggiornati salvati in: ${resultsFile}`);

        // Attendi un po' prima della prossima query per non sovraccaricare l'API
        await sleep(1000);
      } catch (error: any) {
        console.error(
          `ERRORE durante l'esecuzione della query: ${error.message}`
        );
      }
    }
  }

  // Test comparativo finale
  console.log("\n===== TEST COMPARATIVO =====");
  const position = positions.middlegamePosition;
  const query = "What should I focus on in this position?";
  const comparativeResults = [];

  console.log(`POSIZIONE: ${position}`);
  console.log(`QUERY: "${query}"`);

  for (const profile of profiles) {
    console.log(
      `\nINVIO RICHIESTA PER ${profile.name.toUpperCase()} (${
        profile.level
      }, ELO: ${profile.elo})...`
    );

    try {
      const { answer, usage, costs } = await getAIResponse(
        profile,
        query,
        position
      );

      console.log(
        `RISPOSTA RICEVUTA (${
          usage.total_tokens
        } tokens, $${costs.total.toFixed(6)})`
      );
      console.log(`Sommario risposta: ${answer.substring(0, 100)}...`);

      comparativeResults.push({
        profile: {
          name: profile.name,
          level: profile.level,
          elo: profile.elo,
        },
        answer,
        usage,
        costs,
      });

      // Attendi un po' prima della prossima query
      await sleep(1000);
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
    position,
    query,
    results: comparativeResults,
  });

  // Salva tutti i risultati nel file finale
  fs.writeFileSync(resultsFile, JSON.stringify(allResults, null, 2));
  console.log(`\n===== COMPLETATO =====`);
  console.log(`Data fine: ${new Date().toLocaleString()}`);
  console.log(`Tutti i risultati salvati in: ${resultsFile}`);
  console.log(`Log completo salvato in: ${logFile}`);

  // Ripristina console.log e console.error originali
  console.log = originalConsoleLog;
  console.error = originalConsoleError;

  // Analisi delle risposte
  console.log("\n===== ANALISI RISPOSTE =====");

  // Statistiche di base
  const successfulResponses = allResults.filter(
    (r) => !r.test && !r.answer?.includes("ERRORE API")
  ).length;
  const totalQueries = testCases.reduce(
    (sum, tc) => sum + tc.queries.length,
    0
  );

  console.log(
    `Risposte riuscite: ${successfulResponses}/${totalQueries} (${(
      (successfulResponses / totalQueries) *
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
      `Token medi per risposta: ${avgTokens.toFixed(
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
    console.log(`Costo medio per risposta: $${avgCost.toFixed(6)}`);
  }
};

// Esegui lo script
main().catch((error) => {
  console.error("Errore esecuzione script:", error);
  process.exit(1);
});
