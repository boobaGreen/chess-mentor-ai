import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import {
  CheckCircle2,
  Circle,
  ArrowRight,
  BookOpen,
  Clock,
} from "lucide-react";
import { Progress } from "../../components/ui/progress";

const LearningPath: React.FC = () => {
  // Dati di esempio per il percorso di apprendimento
  const path = {
    name: "Strategia e Piani nel Mediogioco",
    progress: 45,
    completed: 4,
    total: 9,
    estimatedTimeLeft: "3 ore",
    modules: [
      {
        id: 1,
        title: "Introduzione alla Strategia",
        status: "completed",
        duration: "30 min",
      },
      {
        id: 2,
        title: "Valutare la Posizione",
        status: "completed",
        duration: "45 min",
      },
      {
        id: 3,
        title: "Piani a Lungo Termine",
        status: "completed",
        duration: "50 min",
      },
      {
        id: 4,
        title: "Strutture di Pedoni nel Mediogioco",
        status: "completed",
        duration: "40 min",
      },
      {
        id: 5,
        title: "Iniziativa e Spazio",
        status: "active",
        duration: "35 min",
      },
      {
        id: 6,
        title: "Attacco al Re",
        status: "locked",
        duration: "45 min",
      },
      {
        id: 7,
        title: "Difesa e Contrattacco",
        status: "locked",
        duration: "50 min",
      },
      {
        id: 8,
        title: "Finali Strategici",
        status: "locked",
        duration: "45 min",
      },
      {
        id: 9,
        title: "Applicazione Pratica",
        status: "locked",
        duration: "40 min",
      },
    ],
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{path.name}</CardTitle>
            <CardDescription>
              Il tuo percorso di apprendimento attuale
            </CardDescription>
          </div>
          <Badge variant="outline" className="flex items-center gap-1">
            <BookOpen className="h-3 w-3" />
            <span>Livello Intermedio</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Progresso</span>
            <span className="text-sm font-medium">{path.progress}%</span>
          </div>
          <Progress value={path.progress} className="h-2" />
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-muted-foreground">
              {path.completed} di {path.total} moduli completati
            </span>
            <span className="text-xs flex items-center gap-1 text-muted-foreground">
              <Clock className="h-3 w-3" /> Tempo stimato rimasto:{" "}
              {path.estimatedTimeLeft}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {path.modules.map((module) => (
            <div
              key={module.id}
              className={`flex items-center p-3 rounded-lg border ${
                module.status === "active"
                  ? "bg-blue-50 border-blue-200"
                  : module.status === "completed"
                  ? "bg-gray-50"
                  : "bg-gray-50 opacity-60"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                  module.status === "completed"
                    ? "bg-green-100"
                    : module.status === "active"
                    ? "bg-blue-100"
                    : "bg-gray-100"
                }`}
              >
                {module.status === "completed" ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                ) : module.status === "active" ? (
                  <Circle className="h-5 w-5 text-blue-600" />
                ) : (
                  <Circle className="h-5 w-5 text-gray-400" />
                )}
              </div>
              <div className="flex-1">
                <h4
                  className={`font-medium ${
                    module.status === "locked" ? "text-gray-400" : ""
                  }`}
                >
                  {module.title}
                </h4>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {module.duration}
                </p>
              </div>
              {module.status === "active" && (
                <Button size="sm" className="ml-2">
                  Continua
                </Button>
              )}
              {module.status === "completed" && (
                <Badge variant="outline" className="bg-green-50">
                  Completato
                </Badge>
              )}
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Vedi tutto il percorso</Button>
        <Button variant="default" className="gap-1">
          Prossima lezione <ArrowRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LearningPath;
