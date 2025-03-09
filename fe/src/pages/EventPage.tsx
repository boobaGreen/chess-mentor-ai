import React from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Trophy,
  Award,
  CalendarDays,
  Info,
  ExternalLink,
  Users2,
} from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardFooter } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import PageTitle from "../components/ui/page-title";

interface Event {
  id: number;
  title: string;
  date: string;
  time?: string;
  location: string;
  description: string;
  type: string;
  capacity?: number;
  spotsLeft?: number;
  registrationFee?: string;
  participants?: number;
  isOnline?: boolean;
}

interface Club {
  name: string;
  location: string;
  description: string;
  website: string;
}

const upcomingEvents: Event[] = [
  {
    id: 1,
    title: "Spring Tournament 2025",
    date: "March 15, 2025",
    time: "10:00 - 18:00",
    location: "Chess Club Roma, Via Roma 123",
    description:
      "Open tournament with 3 rounds. Perfect for intermediate players looking to test their skills.",
    type: "tournament",
    capacity: 32,
    spotsLeft: 12,
    registrationFee: "€20",
  },
  {
    id: 2,
    title: "Endgame Mastery Workshop",
    date: "March 20, 2025",
    time: "18:30 - 20:30",
    location: "Online (Zoom)",
    description: "Learn essential endgame techniques with our expert coaches.",
    type: "lecture",
    capacity: 50,
    spotsLeft: 25,
    isOnline: true,
    registrationFee: "€15",
  },
  {
    id: 3,
    title: "Weekly Club Night",
    date: "Every Thursday",
    time: "19:00 - 22:00",
    location: "Chess Club Milano, Via Milano 456",
    description: "Join us for casual games and analysis sessions.",
    type: "club",
    capacity: 30,
    spotsLeft: 15,
  },
];

const pastEvents: Event[] = [
  {
    id: 101,
    title: "Winter Chess Championship",
    date: "January 15, 2025",
    location: "Chess Club Roma",
    description:
      "Annual winter tournament with participants from all over Italy.",
    type: "tournament",
    participants: 48,
  },
  {
    id: 102,
    title: "Opening Preparation Workshop",
    date: "February 1, 2025",
    location: "Online",
    description: "Intensive workshop focusing on modern opening theory.",
    type: "lecture",
    participants: 35,
  },
];

const affiliatedClubs: Club[] = [
  {
    name: "Chess Club Roma",
    location: "Via Roma 123, Roma",
    description:
      "Our main venue in Rome, featuring weekly tournaments and training sessions.",
    website: "https://chessclub-roma.it",
  },
  {
    name: "Milano Chess Academy",
    location: "Via Milano 456, Milano",
    description:
      "Partner club specializing in youth development and advanced training.",
    website: "https://milano-chess.it",
  },
  {
    name: "Firenze Chess Society",
    location: "Via Firenze 789, Firenze",
    description:
      "Historic chess club with a focus on classical chess traditions.",
    website: "https://firenze-chess.it",
  },
];

const EventPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center">
        <PageTitle icon={Calendar} title="Chess Events" />

        <Card className="p-4 mb-6 w-full max-w-3xl">
          <p className="text-lg text-center text-muted-foreground">
            Join our chess community events! From club nights to tournaments,
            connect with fellow enthusiasts and enhance your chess journey.
          </p>
        </Card>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upcoming" className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              Upcoming Events
            </TabsTrigger>
            <TabsTrigger value="past" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Past Events
            </TabsTrigger>
            <TabsTrigger value="clubs" className="flex items-center gap-2">
              <Users2 className="h-4 w-4" />
              Affiliated Clubs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-6">
            <div className="space-y-8">
              {upcomingEvents.map((event) => (
                <Card key={event.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                      <div className="text-left mb-3 md:mb-0">
                        <h3 className="text-xl font-bold">{event.title}</h3>
                        <Badge
                          className="mt-1"
                          variant={
                            event.type === "tournament"
                              ? "destructive"
                              : event.type === "club"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {event.type === "tournament" && (
                            <Trophy className="mr-1 h-3 w-3" />
                          )}
                          {event.type === "club" && (
                            <Award className="mr-1 h-3 w-3" />
                          )}
                          {event.type === "lecture" && (
                            <Info className="mr-1 h-3 w-3" />
                          )}
                          {event.type.charAt(0).toUpperCase() +
                            event.type.slice(1)}
                        </Badge>
                      </div>
                      <div className="flex flex-col items-start gap-1.5 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4" />
                          <span>{event.date}</span>
                        </div>
                        {event.time && (
                          <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4" />
                            <span>{event.time}</span>
                          </div>
                        )}
                        <div className="flex items-center">
                          <MapPin className="mr-2 h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-left mb-6">
                      <p>{event.description}</p>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center">
                      {event.spotsLeft !== undefined && (
                        <div className="flex items-center mb-4 md:mb-0">
                          <Users className="mr-2 h-4 w-4 text-blue-600" />
                          <span className="text-sm">
                            <span className="font-medium">
                              {event.spotsLeft}
                            </span>{" "}
                            spots left of{" "}
                            <span className="font-medium">
                              {event.capacity}
                            </span>
                          </span>
                        </div>
                      )}
                      {event.registrationFee && (
                        <span className="ml-4 text-sm">
                          Fee: {event.registrationFee}
                        </span>
                      )}
                      <Button>Register Now</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="past" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pastEvents.map((event) => (
                <Card key={event.id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold">{event.title}</h3>
                        <Badge
                          className="mt-1"
                          variant={
                            event.type === "match" ? "outline" : "secondary"
                          }
                        >
                          {event.type.charAt(0).toUpperCase() +
                            event.type.slice(1)}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-500">
                        <Calendar className="inline mr-1 h-3 w-3" />{" "}
                        {event.date}
                      </div>
                    </div>
                    <p className="text-left text-gray-600 mb-3">
                      {event.description}
                    </p>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="mr-1 h-3 w-3" /> {event.location}
                    </div>
                    {event.participants && (
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Users className="mr-1 h-3 w-3" /> {event.participants}{" "}
                        participants
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm">
                      View Photos
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="clubs" className="mt-6">
            <div className="mb-6 text-left">
              <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-6">
                <div className="flex">
                  <Info className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-amber-800">
                      About Our Chess Philosophy
                    </h3>
                    <p className="text-amber-700 text-sm mt-1">
                      At Chess Mentor AI, we believe chess learning is personal,
                      while competition is social. Our online platform focuses
                      on self-improvement and practice with bots, while our
                      physical events and affiliated clubs provide a space for
                      friendly human interaction and real-board play.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {affiliatedClubs.map((club, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold">{club.name}</h3>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <MapPin className="mr-1 h-3 w-3" /> {club.location}
                      </div>
                      <p className="text-left mb-4">{club.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="outline"
                        className="flex items-center gap-2"
                        onClick={() => window.open(club.website, "_blank")}
                      >
                        <ExternalLink className="h-4 w-4" /> Visit Website
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-12 border-t pt-6 w-full">
          <h3 className="text-xl font-semibold mb-4">
            Want to host a Chess Mentor AI event?
          </h3>
          <p className="text-gray-600 mb-4">
            If you run a chess club or venue and would like to host an event
            with us, we'd love to collaborate! We can provide instructors,
            equipment, and help organize workshops or friendly tournaments.
          </p>
          <Button variant="default">Contact Our Events Team</Button>
        </div>
      </div>
    </div>
  );
};
export default EventPage;
