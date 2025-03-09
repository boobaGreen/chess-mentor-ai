import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Trophy,
  Award,
  ChevronRight,
} from "lucide-react";

const UpcomingEvents: React.FC = () => {
  // Esempio di eventi imminenti
  const events = [
    {
      id: 1,
      title: "Chess Mentor AI Club Night",
      date: "15 Marzo 2025",
      time: "19:00 - 22:00",
      location: "Chess Mentor AI Headquarters, Rome",
      type: "club",
      spotsLeft: 8,
    },
    {
      id: 2,
      title: "Lezione di Analisi Partite",
      date: "22 Marzo 2025",
      time: "18:30 - 20:00",
      location: "Online (Zoom)",
      type: "lecture",
      spotsLeft: 15,
    },
    {
      id: 3,
      title: "Torneo Amichevole di Primavera",
      date: "5 Aprile 2025",
      time: "10:00 - 17:00",
      location: "Limoteca Chess Club, Milan",
      type: "tournament",
      spotsLeft: 14,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Eventi in Arrivo</CardTitle>
            <CardDescription>Prossimi eventi del calendario</CardDescription>
          </div>
          <Button size="sm" variant="ghost" className="text-blue-600">
            Vedi Tutti
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="flex flex-col sm:flex-row justify-between border rounded-lg p-3 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  event.type === "tournament"
                    ? "bg-amber-100"
                    : event.type === "club"
                    ? "bg-blue-100"
                    : "bg-purple-100"
                }`}
              >
                {event.type === "tournament" ? (
                  <Trophy className="h-5 w-5 text-amber-600" />
                ) : event.type === "club" ? (
                  <Users className="h-5 w-5 text-blue-600" />
                ) : (
                  <Award className="h-5 w-5 text-purple-600" />
                )}
              </div>
              <div>
                <h4 className="font-medium">{event.title}</h4>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mt-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {event.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {event.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {event.location}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-3 sm:mt-0">
              <Badge variant={event.spotsLeft < 10 ? "destructive" : "outline"}>
                {event.spotsLeft} posti rimasti
              </Badge>
              <Button size="sm" variant="ghost">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Esplora tutti gli eventi
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UpcomingEvents;
