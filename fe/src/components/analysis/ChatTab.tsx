import React, { useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Bot, Send, User, HelpCircle } from "lucide-react";
import { ChatMessage } from "../../types/analysis";
import { cn } from "../../lib/utils";

interface ChatTabProps {
  chatMessages: ChatMessage[];
  inputMessage: string;
  setInputMessage: (message: string) => void;
  handleSendMessage: () => void;
  formatTime: (date: Date) => string;
  isTyping?: boolean;
}

const ChatTab: React.FC<ChatTabProps> = ({
  chatMessages,
  inputMessage,
  setInputMessage,
  handleSendMessage,
  formatTime,
  isTyping = false,
}) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollArea = scrollAreaRef.current;
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  }, [chatMessages]);

  const suggestionPrompts = [
    "Analizza la posizione attuale",
    "Quali sono i temi tattici in questa partita?",
    "Suggerisci un piano strategico",
    "Spiega l'ultima mossa"
  ];

  return (
    <Card className="h-full flex flex-col border-none shadow-none">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          Chat con AI Tutor
        </CardTitle>
        <CardDescription>
          Chiedi consigli, analisi o spiegazioni sulla partita
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-grow overflow-hidden p-0">
        <ScrollArea 
          ref={scrollAreaRef} 
          className="h-[calc(100vh-400px)] px-6"
        >
          {chatMessages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
              <HelpCircle className="h-12 w-12 mb-4 text-muted" />
              <h3 className="font-medium mb-2">Inizia una conversazione</h3>
              <p className="text-sm mb-4">
                Puoi chiedere analisi, consigli o spiegazioni sulla partita
              </p>
              <div className="grid grid-cols-2 gap-2 w-full max-w-md">
                {suggestionPrompts.map((prompt, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="text-sm"
                    onClick={() => {
                      setInputMessage(prompt);
                    }}
                  >
                    {prompt}
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {chatMessages.map((message, index) => (
                <div
                  key={index}
                  className={cn("flex", {
                    "justify-end": message.role === "user",
                    "justify-start": message.role === "ai"
                  })}
                >
                  <div
                    className={cn("flex gap-2 max-w-[80%]", {
                      "flex-row-reverse": message.role === "user",
                      "flex-row": message.role === "ai"
                    })}
                  >
                    <div className="flex-shrink-0">
                      {message.role === "user" ? (
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                          <Bot className="h-4 w-4 text-green-600" />
                        </div>
                      )}
                    </div>
                    <div
                      className={cn("rounded-lg p-3", {
                        "bg-primary text-primary-foreground": message.role === "user",
                        "bg-muted": message.role === "ai"
                      })}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      <span
                        className={cn("text-xs mt-1 block", {
                          "text-primary-foreground/75": message.role === "user",
                          "text-muted-foreground": message.role === "ai"
                        })}
                      >
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="bg-muted rounded-lg p-3">
                      <div className="flex gap-1">
                        <span className="animate-bounce">•</span>
                        <span className="animate-bounce delay-100">•</span>
                        <span className="animate-bounce delay-200">•</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </ScrollArea>
      </CardContent>

      <CardFooter className="border-t pt-4">
        <div className="flex w-full gap-2">
          <Textarea
            placeholder="Fai una domanda sulla partita..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-grow min-h-[80px]"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping}
            className="flex-shrink-0 h-[80px] px-6"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ChatTab;