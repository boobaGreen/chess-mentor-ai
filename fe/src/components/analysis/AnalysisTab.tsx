import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { AlertTriangle, TrendingUp, Info, Lightbulb } from "lucide-react";

interface AnalysisTabProps {
  currentMoveIndex: number;
  evaluation: number | string;
  formatEvaluation: (evaluation: number | string) => string;
  gameInfo: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  personalizedTips: string[];
  history: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
}

const AnalysisTab: React.FC<AnalysisTabProps> = ({
  currentMoveIndex,
  evaluation,
  formatEvaluation,
  gameInfo,
  personalizedTips,
  history,
}) => {
  // Helper per determinare il colore della mossa corrente
  const getMoveColor = () => {
    if (typeof evaluation !== "number") return "gray";
    if (evaluation > 1.5) return "green";
    if (evaluation < -1.5) return "red";
    if (Math.abs(evaluation) > 0.5) return "yellow";
    return "gray";
  };

  // Determina di chi è il turno
  const isWhiteTurn = currentMoveIndex % 2 === 0;
  const currentPlayerName = isWhiteTurn ? gameInfo.white : gameInfo.black;
  const moveNumber = Math.floor(currentMoveIndex / 2) + 1;

  return (
    <div className="space-y-4">
      {/* Current position evaluation */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Valutazione della posizione
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                {currentMoveIndex >= 0
                  ? `Mossa ${moveNumber}${isWhiteTurn ? "" : "..."} - ${
                      history[currentMoveIndex]?.san || ""
                    }`
                  : "Posizione iniziale"}
              </p>
              <p className="font-semibold">
                {currentMoveIndex >= 0
                  ? `Tocca a ${currentPlayerName}`
                  : "Inizio partita"}
              </p>
            </div>
            <Badge
              variant={
                getMoveColor() === "green"
                  ? "default"
                  : getMoveColor() === "red"
                  ? "destructive"
                  : getMoveColor() === "yellow"
                  ? "secondary"
                  : "outline"
              }
              className="text-lg font-mono px-3 py-1"
            >
              {formatEvaluation(evaluation)}
            </Badge>
          </div>

          {/* Valutazione verbale basata sul valore numerico */}
          <p className="mt-3 text-sm">
            {typeof evaluation === "number"
              ? evaluation > 1.5
                ? "Il bianco ha un vantaggio significativo in questa posizione."
                : evaluation < -1.5
                ? "Il nero ha un vantaggio significativo in questa posizione."
                : Math.abs(evaluation) > 0.5
                ? `${
                    evaluation > 0 ? "Il bianco" : "Il nero"
                  } ha un leggero vantaggio in questa posizione.`
                : "La posizione è sostanzialmente equilibrata."
              : evaluation.includes("M")
              ? `Matto in ${evaluation.replace(/[^0-9]/g, "")} mosse per ${
                  evaluation.startsWith("+") ? "il bianco" : "il nero"
                }.`
              : "Valutazione non disponibile."}
          </p>
        </CardContent>
      </Card>

      {/* Consigli personalizzati */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Consigli personalizzati
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {personalizedTips.map((tip, index) => (
              <li key={index} className="flex gap-2">
                <span className="text-primary">•</span>
                <span className="text-sm">{tip}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Informazioni partita */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Info className="h-5 w-5" />
            Dettagli partita
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-muted-foreground">Evento:</div>
            <div>{gameInfo.event}</div>
            <div className="text-muted-foreground">Data:</div>
            <div>{gameInfo.date}</div>
            <div className="text-muted-foreground">Risultato:</div>
            <div>{gameInfo.result}</div>
            <div className="text-muted-foreground">ECO:</div>
            <div>{gameInfo.eco || "N/A"}</div>
          </div>
        </CardContent>
      </Card>

      {/* Problemi comuni */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Pattern da osservare
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm mb-2">In questa posizione, fai attenzione a:</p>
          <ul className="space-y-1 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span>
                {isWhiteTurn
                  ? "La struttura di pedoni sul lato di donna è vulnerabile"
                  : "I pedoni centrali potrebbero diventare bersagli"}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span>
                {isWhiteTurn
                  ? "L'alfiere in c1 ha mobilità limitata"
                  : "Il re potrebbe essere vulnerabile a un attacco sul lato di re"}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span>
                La colonna {isWhiteTurn ? "e" : "d"} è importante per il
                controllo del centro
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalysisTab;
