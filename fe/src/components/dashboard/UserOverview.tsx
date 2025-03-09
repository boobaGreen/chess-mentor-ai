import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Progress } from "../../components/ui/progress";
import { Badge } from "../../components/ui/badge";
import { Clock, Award, Flame, Book, Target } from "lucide-react";

const UserOverview: React.FC = () => {
  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
      <CardHeader>
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Benvenuto, Andrea!</CardTitle>
            <CardDescription>
              Ecco il riepilogo del tuo percorso scacchistico
            </CardDescription>
          </div>
          <Badge variant="outline" className="border-blue-500 text-blue-700">
            <Target className="mr-1 h-3 w-3" /> Livello: Intermedio
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <Clock className="h-5 w-5 text-blue-700" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Studio totale</p>
              <p className="font-medium">48 ore</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-amber-100 p-2 rounded-full">
              <Award className="h-5 w-5 text-amber-700" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Badge ottenuti</p>
              <p className="font-medium">17 / 50</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-emerald-100 p-2 rounded-full">
              <Book className="h-5 w-5 text-emerald-700" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">
                Lezioni completate
              </p>
              <p className="font-medium">24 / 80</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-2 rounded-full">
              <Flame className="h-5 w-5 text-purple-700" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Serie attuale</p>
              <p className="font-medium">7 giorni</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progresso del percorso attuale</span>
            <span className="font-medium">45%</span>
          </div>
          <Progress value={45} className="h-2" />
          <p className="text-xs text-muted-foreground">
            Fondamenti di strategie nel mediogioco • 9 lezioni rimanenti
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserOverview;
