import { GameInfo } from "../types/analysis";

export const sampleGame: GameInfo = {
  white: "Garry Kasparov",
  black: "Veselin Topalov",
  event: "Wijk aan Zee",
  site: "Wijk aan Zee NED",
  date: "1999.01.20",
  result: "1-0",
  eco: "B06",
  title: "Kasparov's Immortal",
  pgn: `[Event "Hoogovens A Tournament"]
[Site "Wijk aan Zee NED"]
[Date "1999.01.20"]
[Round "4"]
[Result "1-0"]
[White "Garry Kasparov"]
[Black "Veselin Topalov"]
[ECO "B06"]
[WhiteElo "2812"]
[BlackElo "2700"]

1. e4 d6 2. d4 Nf6 3. Nc3 g6 4. Be3 Bg7 5. Qd2 c6 6. f3 b5 7. Nge2 Nbd7 8. Bh6 
Bxh6 9. Qxh6 Bb7 10. a3 e5 11. O-O-O Qe7 12. Kb1 a6 13. Nc1 O-O-O 14. Nb3 exd4 
15. Rxd4 c5 16. Rd1 Nb6 17. g3 Kb8 18. Na5 Ba8 19. Bh3 d5 20. Qf4+ Ka7 21. Rhe1 
d4 22. Nd5 Nbxd5 23. exd5 Qd6 24. Rxd4 cxd4 25. Re7+ Kb6 26. Qxd4+ Kxa5 27. b4+ 
Ka4 28. Qc3 Qxd5 29. Ra7 Bb7 30. Rxb7 Qc4 31. Qxf6 Kxa3 32. Qxa6+ Kxb4 33. c3+ 
Kxc3 34. Qa1+ Kd2 35. Qb2+ Kd1 36. Bf1 Rd2 37. Rd7 Rxd7 38. Bxc4 bxc4 39. Qxh8 
Rd3 40. Qa8 c3 41. Qa4+ Ke1 42. f4 f5 43. Kc1 Rd2 44. Qa7 1-0`,
  evaluations: {
    0: 0.2,
    10: 0.5,
    20: 1.2,
    30: 2.0,
    40: 4.5,
    50: "+M5", // Matto in 5 per il bianco
  },
};

// Commenti AI pre-generati per mosse specifiche
export const aiComments: { [key: number]: string } = {
  10: "Questa mossa di Kasparov (a3) è tipica del suo stile. Prepara un'espansione sul lato di donna mentre mantiene il controllo del centro.",
  20: "Qf4+ è una mossa tattica brillante che sfrutta la posizione esposta del re nero.",
  30: "La combinazione iniziata con Rxb7 è uno dei momenti più spettacolari della partita. Kasparov sacrifica materiale per un attacco devastante.",
  40: "Con Qxh8, il bianco ha un vantaggio decisivo. La posizione del nero è in completo collasso.",
};

// Linee di analisi alternative per posizioni chiave
export const alternativeLines = {
  20: [
    {
      move: "Qe4+",
      evaluation: 0.8,
      variation: ["Qe4+ Ka7", "Nc4 Nc5", "b4"],
      comment:
        "Un'alternativa interessante che mantiene la pressione ma permette al nero più controgioco.",
    },
    {
      move: "Nc4",
      evaluation: 0.5,
      variation: ["Nc4 Nxc4", "Bxc4 b4"],
      comment:
        "Una continuazione più posizionale che evita complicazioni immediate.",
    },
  ],
  30: [
    {
      move: "Rxf7",
      evaluation: 1.5,
      variation: ["Rxf7 Qxd5", "Qe4"],
      comment:
        "Un'alternativa aggressiva che porta a posizioni molto complicate.",
    },
  ],
};

// Suggerimenti personalizzati basati su pattern comuni
export const commonPatterns = [
  {
    pattern: "Attacco al re scoperto",
    description:
      "Kasparov utilizza spesso la minaccia di scacco scoperto per creare debolezze nella posizione avversaria.",
    moves: [20, 21, 22],
    learningPoints: [
      "Coordinazione dei pezzi",
      "Timing dell'attacco",
      "Sfruttamento delle debolezze",
    ],
  },
  {
    pattern: "Sacrificio posizionale",
    description:
      "Il sacrificio di qualità porta a un vantaggio posizionale decisivo.",
    moves: [30, 31, 32],
    learningPoints: [
      "Valutazione del compenso",
      "Iniziativa",
      "Pressione psicologica",
    ],
  },
];

// Lezioni chiave e punti di apprendimento
export const learningPoints = [
  {
    title: "Attacco al Re",
    description:
      "Kasparov dimostra come l'attacco al re può compensare lo svantaggio materiale.",
    relevantMoves: [20, 25, 30],
    difficulty: "Avanzato",
  },
  {
    title: "Coordinazione dei Pezzi",
    description:
      "La perfetta coordinazione tra donna e torre crea minacce impossibili da parare.",
    relevantMoves: [26, 27, 28],
    difficulty: "Intermedio",
  },
  {
    title: "Sacrificio di Materiale",
    description:
      "Il sacrificio di materiale per l'iniziativa è un tema ricorrente nella partita.",
    relevantMoves: [30, 31, 32],
    difficulty: "Avanzato",
  },
];
