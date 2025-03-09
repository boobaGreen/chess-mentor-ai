/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { Brain, MessageSquare, Send, Sparkles } from "lucide-react";

interface AiInsightsProps {
  currentMoveIndex: number;
  fen: string;
  gameInfo: any;
  history: any[];
}

const AiInsights: React.FC<AiInsightsProps> = ({
  currentMoveIndex,
  gameInfo,
  history,
}) => {
  const [message, setMessage] = useState("");
  const [conversationHistory, setConversationHistory] = useState<
    Array<{ role: string; content: string }>
  >([
    {
      role: "assistant",
      content:
        "Ciao! Sono il tuo assistente scacchistico. Posso aiutarti ad analizzare questa posizione, spiegarti le idee strategiche o rispondere alle tue domande sulla partita.",
    },
  ]);

  // Insights precompilati generati dall'AI
  const getAiInsights = () => {
    if (currentMoveIndex < 0 || !gameInfo.aiCommentary) {
      return "Seleziona una mossa per vedere l'analisi dell'AI.";
    }

    return (
      gameInfo.aiCommentary[currentMoveIndex] ||
      "Nessuna analisi disponibile per questa posizione."
    );
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    // Aggiungi il messaggio dell'utente alla conversazione
    setConversationHistory([
      ...conversationHistory,
      { role: "user", content: message },
    ]);

    // Simula una risposta dall'assistente (in un'app reale, questa sarebbe una chiamata API)
    setTimeout(() => {
      setConversationHistory((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Ho analizzato la posizione attuale (${
            currentMoveIndex >= 0
              ? `dopo la mossa ${history[currentMoveIndex]?.san}`
              : "iniziale"
          }). Questa è una posizione interessante dove ${
            currentMoveIndex % 2 === 0 ? "il Nero" : "il Bianco"
          } deve fare attenzione al centro. Considererei di sviluppare i pezzi minori e assicurarmi il controllo delle case centrali.`,
        },
      ]);
    }, 1000);

    setMessage("");
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Brain className="h-5 w-5 mr-2 text-primary" />
          AI Mentor
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="insights" className="w-full">
          <TabsList className="grid grid-cols-2 m-0 rounded-none">
            <TabsTrigger value="insights" className="rounded-none">
              <Sparkles className="h-4 w-4 mr-2" />
              Insights
            </TabsTrigger>
            <TabsTrigger value="chat" className="rounded-none">
              <MessageSquare className="h-4 w-4 mr-2" />
              Chat
            </TabsTrigger>
          </TabsList>

          <TabsContent value="insights" className="p-4 border-t">
            <div className="prose prose-sm max-w-none">
              <p>{getAiInsights()}</p>
            </div>
          </TabsContent>

          <TabsContent
            value="chat"
            className="border-t flex flex-col h-[400px]"
          >
            <div className="flex-grow overflow-y-auto p-4">
              {conversationHistory.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-4 ${
                    msg.role === "user"
                      ? "ml-8 bg-muted p-3 rounded-lg"
                      : "mr-8 bg-primary/10 p-3 rounded-lg"
                  }`}
                >
                  {msg.content}
                </div>
              ))}
            </div>

            <div className="border-t p-3 flex items-end gap-2">
              <Textarea
                placeholder="Fai una domanda sulla posizione attuale..."
                className="min-h-[80px]"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button
                size="icon"
                onClick={handleSendMessage}
                className="mb-1 flex-shrink-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AiInsights;
