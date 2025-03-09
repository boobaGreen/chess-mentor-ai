import React, { useState, useEffect } from "react";
import { Chess } from "chess.js";
import { Eye } from "lucide-react";
import PageTitle from "../components/ui/page-title";

// Componenti - correzione dell'import
import GameHeader from "../components/analysis/GameHeader";
import ChessAnalysisBoard from "../components/analysis/ChessAnalysisBoard"; // CORRETTO: "Chess" non "Cheese"
import AnalysisTabs from "../components/analysis/AnalysisTabs";

// Dati e tipi
import { sampleGame, aiComments } from "../data/sampleAnalysisData";
import { ChatMessage, UserNote } from "../types/analysis";
import useChessboardSize from "../hooks/useChessboardSize"; // Aggiungiamo l'import dell'hook

const WatchPage: React.FC = () => {
  // Stato della scacchiera e della partita
  const [chess, setChess] = useState(new Chess());
  const [fen, setFen] = useState(chess.fen());
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [history, setHistory] = useState<any[]>([]);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(-1);

  // Stato dell'interfaccia
  const [activeTab, setActiveTab] = useState("analysis");
  const [evaluation, setEvaluation] = useState<number | string>(0);
  const [showEvalBar, setShowEvalBar] = useState(true);

  // Utilizziamo l'hook personalizzato passando showEvalBar
  // L'hook si occuperà di ridurre leggermente la dimensione se la barra è visibile
  const boardWidth = useChessboardSize(showEvalBar);

  const [gameInfo] = useState(sampleGame);

  // Stati per funzionalità interattive
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      role: "ai",
      content:
        "Benvenuto all'analisi di questa partita storica tra Fischer e Spassky! Chiedimi pure qualunque cosa sulla partita o sulle mosse.",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [userNotes, setUserNotes] = useState<UserNote[]>([]);
  const [newNote, setNewNote] = useState("");

  // Stati per le raccomandazioni di apprendimento
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [personalizedTips, _] = useState([
    "Potresti migliorare nella gestione dei pedoni isolati",
    "Il tuo profilo mostra debolezze in finali simili",
    "Suggerisco di studiare le partite di Fischer sul controllo del centro",
    "Questo tipo di struttura appare spesso nelle tue sconfitte",
  ]);

  // Rimuoviamo useEffect per updateDimensions poiché è ora gestito dall'hook useChessboardSize

  // Carica la partita all'avvio
  useEffect(() => {
    loadGame(gameInfo.pgn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Carica una partita dal PGN
  const loadGame = (pgn: string) => {
    try {
      const newChess = new Chess();
      newChess.loadPgn(pgn);
      setChess(newChess);
      setFen(newChess.fen());
      setHistory(newChess.history({ verbose: true }));
      setCurrentMoveIndex(-1);
      // Resetta il messaggio di benvenuto
      setChatMessages([
        {
          role: "ai",
          content: `Benvenuto all'analisi di questa partita tra ${gameInfo.white} e ${gameInfo.black}! Chiedimi pure qualunque cosa sulla partita o sulle mosse.`,
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error("Errore nel caricamento della partita", error);
    }
  };

  // Navigazione delle mosse
  const goToMove = (moveIndex: number) => {
    const newChess = new Chess();

    // Se è l'inizio della partita
    if (moveIndex < 0) {
      setFen(newChess.fen());
      setCurrentMoveIndex(-1);
      return;
    }

    // Altrimenti, applica tutte le mosse fino all'indice desiderato
    for (let i = 0; i <= moveIndex; i++) {
      newChess.move(history[i]);
    }

    setFen(newChess.fen());
    setCurrentMoveIndex(moveIndex);

    // Aggiorna la valutazione
    updateEvaluation(moveIndex);

    // Aggiungi commento AI quando disponibile
    if (
      aiComments[moveIndex] &&
      !chatMessages.some((msg) => msg.content === aiComments[moveIndex])
    ) {
      setChatMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: aiComments[moveIndex],
          timestamp: new Date(),
        },
      ]);
    }
  };

  // Navigazione delle mosse con i controlli
  const moveControls = {
    goToPreviousMove: () => {
      if (currentMoveIndex >= 0) {
        goToMove(currentMoveIndex - 1);
      }
    },
    goToNextMove: () => {
      if (currentMoveIndex < history.length - 1) {
        goToMove(currentMoveIndex + 1);
      }
    },
    goToStart: () => {
      goToMove(-1);
    },
    goToEnd: () => {
      goToMove(history.length - 1);
    },
  };

  // Aggiorna la valutazione in base alla mossa corrente
  const updateEvaluation = (moveIndex: number) => {
    // Trova la valutazione più vicina disponibile
    let closestEval = 0;
    let closestDistance = Infinity;

    Object.keys(gameInfo.evaluations).forEach((idx) => {
      const index = parseInt(idx);
      const distance = Math.abs(index - moveIndex);
      if (distance < closestDistance) {
        closestDistance = distance;
        const evalValue = gameInfo.evaluations[index];
        if (typeof evalValue === "number") {
          closestEval = evalValue;
        }
      }
    });

    setEvaluation(closestEval);
  };

  // Formatta la valutazione per la visualizzazione
  const formatEvaluation = (eval_: number | string): string => {
    if (typeof eval_ === "string") {
      return eval_; // Già formattato (es. "+M5")
    }

    // Formato numerico
    const sign = eval_ > 0 ? "+" : "";
    return `${sign}${eval_.toFixed(1)}`;
  };

  // Calcola la percentuale di vantaggio per la barra di valutazione
  const calculateAdvantagePercentage = (eval_: number | string): number => {
    if (typeof eval_ === "string") {
      // Se è un matto
      if (eval_.includes("M")) {
        // Corretto: il bianco deve essere rappresentato in alto (100%)
        return eval_.startsWith("+") ? 100 : 0;
      }
      return 50; // Neutrale se non possiamo interpretare
    }

    // Limita tra -5 e +5 per la visualizzazione
    const clampedEval = Math.max(-5, Math.min(5, eval_));

    // Converti in percentuale (0-100)
    // 0 = vantaggio nero totale, 100 = vantaggio bianco totale, 50 = parità
    return 50 + clampedEval * 10;
  };

  // Gestione della chat
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Aggiungi messaggio utente
    const userMessage: ChatMessage = {
      role: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setInputMessage("");

    // Simula risposta AI (in un'app reale, qui chiameresti un'API)
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        role: "ai",
        content: generateAIResponse(inputMessage, currentMoveIndex),
        timestamp: new Date(),
      };
      setChatMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  // Genera una risposta AI basata sul messaggio dell'utente e sulla mossa corrente
  const generateAIResponse = (message: string, moveIndex: number): string => {
    // Esempi di risposte (in un'app reale userei un'API)
    if (
      message.toLowerCase().includes("perché") ||
      message.toLowerCase().includes("perche")
    ) {
      return `Alla mossa ${
        Math.floor(moveIndex / 2) + 1
      }, la decisione è stata influenzata dalla struttura dei pedoni centrali. Fischer era noto per il suo approccio aggressivo al controllo del centro, e questa mossa segue quella filosofia.`;
    }

    if (message.toLowerCase().includes("alternativ")) {
      return `Un'alternativa interessante sarebbe stata ${history[
        moveIndex
      ]?.san.charAt(0)}${history[moveIndex]?.san.charAt(1)}${
        history[moveIndex]?.san.includes("x") ? "x" : ""
      }${String.fromCharCode(
        history[moveIndex]?.to.charCodeAt(0) + 1
      )}${history[moveIndex]?.to.charAt(
        1
      )}. Questo avrebbe portato a una struttura di pedoni più bilanciata ma avrebbe ceduto l'iniziativa.`;
    }

    if (
      message.toLowerCase().includes("sbaglio") ||
      message.toLowerCase().includes("error")
    ) {
      return "L'errore principale in questa posizione è stato perdere il controllo della colonna c. Una strategia migliore sarebbe stata raddoppiare le torri su quella colonna prima di procedere con l'avanzamento del pedone.";
    }

    return `Interessante osservazione! In questa posizione, la valutazione è ${formatEvaluation(
      evaluation
    )}. Il piano strategico principale riguarda il controllo delle case centrali e lo sfruttamento delle debolezze nella struttura di pedoni dell'avversario. Basandomi sul tuo profilo di gioco, ti consiglierei di prestare particolare attenzione a come Fischer gestisce la pressione sulla colonna aperta.`;
  };

  // Gestione delle note utente
  const handleAddNote = () => {
    if (!newNote.trim()) return;

    const note: UserNote = {
      id: Date.now().toString(),
      moveNumber: currentMoveIndex,
      note: newNote,
      timestamp: new Date(),
    };

    setUserNotes((prev) => [...prev, note]);
    setNewNote("");
  };

  // Formatta la mossa in notazione algebrica
  const formatMoveNumber = (index: number): string => {
    const moveNumber = Math.floor(index / 2) + 1;
    const isWhite = index % 2 === 0;
    return `${moveNumber}${isWhite ? "." : "..."}`;
  };

  // Formatta il timestamp
  const formatTime = (date: Date): string => {
    return `${date.getHours()}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center">
        <PageTitle icon={Eye} title="Game Analysis" />
      </div>

      <GameHeader gameInfo={gameInfo} />

      {/* Aggiunto w-full al grid container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-6 w-full">
        {/* Left column - Chess area - aggiunto flex flex-col items-center e w-full */}
        <div className="lg:col-span-7 flex flex-col items-center w-full">
          <div className="w-full flex justify-center items-center">
            <ChessAnalysisBoard
              fen={fen}
              boardWidth={boardWidth}
              evaluation={evaluation}
              showEvalBar={showEvalBar}
              calculateAdvantagePercentage={calculateAdvantagePercentage}
              formatEvaluation={formatEvaluation}
              currentMoveIndex={currentMoveIndex}
              history={history}
              formatMoveNumber={formatMoveNumber}
              moveControls={moveControls}
              goToMove={goToMove}
              gameInfo={gameInfo}
              toggleEvalBar={() => setShowEvalBar(!showEvalBar)}
            />
          </div>
        </div>

        {/* Right column - Analysis tabs */}
        <div className="lg:col-span-5">
          <AnalysisTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            currentMoveIndex={currentMoveIndex}
            evaluation={evaluation}
            formatEvaluation={formatEvaluation}
            gameInfo={gameInfo}
            personalizedTips={personalizedTips}
            history={history}
            chatMessages={chatMessages}
            inputMessage={inputMessage}
            setInputMessage={setInputMessage}
            handleSendMessage={handleSendMessage}
            formatTime={formatTime}
            userNotes={userNotes}
            newNote={newNote}
            setNewNote={setNewNote}
            handleAddNote={handleAddNote}
            formatMoveNumber={formatMoveNumber}
          />
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
