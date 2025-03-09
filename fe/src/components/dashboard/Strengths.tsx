import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { CheckCircle2 } from "lucide-react";

const Strengths: React.FC = () => {
  // Dati di esempio per i punti di forza
  const strengths = [
    {
      name: "Siciliana",
      category: "Apertura",
      score: 92,
      games: 18
    },
    {
      name: "Posizioni Tattiche",
      category: "Mediogioco",
      score: 86,
      games: 25
    },
    {
      name: "Finali Re e Pedone",
      category: "Finale",
      score: 84,
      games: 12
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          Punti di Forza
        </CardTitle>
        <CardDescription>Le tue aree più sviluppate</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {strengths.map((strength, index) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">{strength.name}</h3>
                <p className="text-xs text-muted-foreground">{strength.category}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-emerald-600">{strength.score}%</p>
                <p className="text-xs text-muted-foreground">{strength.games} partite</p>
              </div>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5">
              <div 
                className="bg-emerald-500 h-1.5 rounded-full" 
                style={{ width: `${strength.score}%` }}
              ></div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default Strengths;