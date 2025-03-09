import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { AlertTriangle, ArrowRight } from "lucide-react";

const ImprovementAreas: React.FC = () => {
  const areas = [
    {
      name: "Finali di Torre",
      urgency: "high",
      description: "Difficoltà nelle posizioni di torri e pedoni",
    },
    {
      name: "Tattiche in Mediogioco",
      urgency: "medium",
      description: "Occasioni tattiche mancate nelle ultime 5 partite",
    },
    {
      name: "Strutture di Pedoni",
      urgency: "low",
      description: "Valutazione dell'importanza dei pedoni isolati",
    },
  ];

  const getUrgencyStyle = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "bg-red-50 border-red-200";
      case "medium":
        return "bg-amber-50 border-amber-200";
      case "low":
        return "bg-blue-50 border-blue-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  const getUrgencyTextStyle = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "text-red-700";
      case "medium":
        return "text-amber-700";
      case "low":
        return "text-blue-700";
      default:
        return "text-gray-700";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-500" />
          Aree di Miglioramento
        </CardTitle>
        <CardDescription>Concentra qui i tuoi sforzi</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {areas.map((area, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg border ${getUrgencyStyle(
              area.urgency
            )} space-y-1`}
          >
            <h3 className={`font-medium ${getUrgencyTextStyle(area.urgency)}`}>
              {area.name}
            </h3>
            <p className="text-xs text-muted-foreground">{area.description}</p>
          </div>
        ))}
        <Button
          variant="link"
          className="w-full text-blue-600 flex items-center justify-center gap-1 mt-2"
        >
          Visualizza analisi completa
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default ImprovementAreas;
