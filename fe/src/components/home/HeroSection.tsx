import React from "react";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Link } from "react-router-dom";
import {
  Brain,
  History,
  Puzzle,
  TrendingUp,
  Play,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const HeroSection: React.FC = () => {
  const { user } = useAuth();

  const isAuthenticated = !!user;

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 z-0"></div>
      <div className="absolute inset-0 opacity-20 z-0">
        <div className="absolute inset-0 bg-[url('/assets/images/chess-pattern.webp')] bg-repeat opacity-10"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center">
        <Badge
          variant="outline"
          className="mb-6 px-3 py-1 border-blue-200 bg-blue-50 text-blue-700"
        >
          The Future of Chess Training
        </Badge>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700">
          Your Personal Chess Mentor
        </h1>

        <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-10">
          Grow at your own pace with an AI companion that adapts to your style,
          studies your weaknesses, and evolves alongside you.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard">
                <Button size="lg" className="px-8 gap-2">
                  <Play className="h-4 w-4" /> Go to Dashboard
                </Button>
              </Link>
              <Link to="/partita">
                <Button size="lg" variant="outline" className="px-8 gap-2">
                  <ArrowRight className="h-4 w-4" /> Play Now
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button size="lg" className="px-8 gap-2">
                  <Play className="h-4 w-4" /> Sign In
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="px-8 gap-2">
                  <BookOpen className="h-4 w-4" /> Create Account
                </Button>
              </Link>
            </>
          )}
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="flex flex-col items-center">
            <div className="bg-blue-100 p-4 rounded-full mb-3">
              <Brain className="h-6 w-6 text-blue-700" />
            </div>
            <h3 className="font-medium">Personalized Tutoring</h3>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-indigo-100 p-4 rounded-full mb-3">
              <Puzzle className="h-6 w-6 text-indigo-700" />
            </div>
            <h3 className="font-medium">Tailored Puzzles</h3>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-purple-100 p-4 rounded-full mb-3">
              <History className="h-6 w-6 text-purple-700" />
            </div>
            <h3 className="font-medium">Historic Games</h3>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-teal-100 p-4 rounded-full mb-3">
              <TrendingUp className="h-6 w-6 text-teal-700" />
            </div>
            <h3 className="font-medium">Skill Development</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
