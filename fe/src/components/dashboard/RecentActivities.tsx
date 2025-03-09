import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Puzzle,
  Trophy,
  BookOpen,
  Swords,
  History,
  BarChart,
} from "lucide-react";
import { Button } from "../../components/ui/button";

const RecentActivities: React.FC = () => {
  // Dati di esempio per le attività recenti
  const activities = [
    {
      id: 1,
      type: "lesson",
      title: "Strutture di pedoni nel Mediogioco",
      date: "Oggi, 10:23",
      icon: <BookOpen className="h-4 w-4 text-amber-600" />,
      progress: 100,
      result: "Completato",
    },
    {
      id: 2,
      type: "puzzle",
      title: "Tattica: Forcella",
      date: "Oggi, 9:45",
      icon: <Puzzle className="h-4 w-4 text-indigo-600" />,
      progress: 100,
      result: "Risolto al primo tentativo",
    },
    {
      id: 3,
      type: "game",
      title: "Partita contro AI (Livello 3)",
      date: "Ieri, 17:30",
      icon: <Swords className="h-4 w-4 text-emerald-600" />,
      progress: 100,
      result: "Vittoria in 34 mosse",
    },
    {
      id: 4,
      type: "study",
      title: "Studio partita: Kasparov vs Topalov",
      date: "Ieri, 15:42",
      icon: <History className="h-4 w-4 text-blue-600" />,
      progress: 80,
      result: "In corso",
    },
    {
      id: 5,
      type: "analysis",
      title: "Analisi della partita #28",
      date: "2 giorni fa",
      icon: <BarChart className="h-4 w-4 text-purple-600" />,
      progress: 100,
      result: "Completato, 4 errori trovati",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Attività Recenti</CardTitle>
        <CardDescription>
          Le tue ultime attività sulla piattaforma
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {activities.map((activity) => (
            <div key={activity.id} className="flex gap-4">
              <div className="flex-shrink-0 mt-1">
                <div className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center">
                  {activity.icon}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {activity.progress === 100 && activity.type !== "game" ? (
                        <span className="text-emerald-600 flex items-center gap-1">
                          <Trophy className="h-3 w-3" /> {activity.result}
                        </span>
                      ) : (
                        <span>{activity.result}</span>
                      )}
                    </p>
                    {activity.progress < 100 && (
                      <div className="w-20 bg-gray-100 rounded-full h-1.5 mt-1">
                        <div
                          className="bg-blue-500 h-1.5 rounded-full"
                          style={{ width: `${activity.progress}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full">
          Visualizza tutte le attività
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecentActivities;
