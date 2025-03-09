import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Users, Calendar } from "lucide-react";

const CommunitySection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Community & Events
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Chess is better together. Join our friendly community where the focus
          is on improvement, not just winning.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                Online Community
              </CardTitle>
              <CardDescription>Connect with fellow learners</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Our online community is focused on friendly matches and
                collaborative learning. No competitive pressure—just chess
                enthusiasts helping each other improve.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Friendly Matches</Badge>
                <Badge variant="secondary">Study Groups</Badge>
                <Badge variant="secondary">Analysis Sessions</Badge>
                <Badge variant="secondary">Skill-Based Pairing</Badge>
              </div>
            </CardContent>
            <CardFooter>
              <Link to="/friends" className="w-full">
                <Button variant="outline" className="w-full">
                  Browse Community
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="bg-gradient-to-br from-amber-50 to-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-amber-600" />
                Live Events
              </CardTitle>
              <CardDescription>Experience chess in person</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Take your online learning offline with our in-person events.
                From casual club nights to friendly tournaments, apply your
                skills at the board.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Club Nights</Badge>
                <Badge variant="secondary">Beginner Workshops</Badge>
                <Badge variant="secondary">Friendly Tournaments</Badge>
                <Badge variant="secondary">GM Lectures</Badge>
              </div>
            </CardContent>
            <CardFooter>
              <Link to="/events" className="w-full">
                <Button variant="outline" className="w-full">
                  Browse Events
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;