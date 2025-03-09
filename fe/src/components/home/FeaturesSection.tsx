import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Puzzle,
  Brain,
  History,
  Castle,
  Bot,
  Users,
  Award,
  TrendingUp,
  Sparkles,
  BookOpen,
  Shield,
  Crown,
} from "lucide-react";

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          A Complete Chess Journey
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* AI Mentorship */}
          <Card className="border-2 border-blue-200">
            <CardHeader className="pb-2">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                <Bot className="h-6 w-6 text-blue-700" />
              </div>
              <CardTitle className="text-blue-700">AI Mentorship</CardTitle>
              <CardDescription>Your personal chess companion</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <Sparkles className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <span>Analyzes your games and identifies patterns</span>
                </li>
                <li className="flex gap-2">
                  <Sparkles className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <span>Learns your style and adapts feedback</span>
                </li>
                <li className="flex gap-2">
                  <Sparkles className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <span>Grows alongside you from beginner to master</span>
                </li>
                <li className="flex gap-2">
                  <Sparkles className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <span>Teaches at your pace, with personalized lessons</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Practice & Play */}
          <Card>
            <CardHeader className="pb-2">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                <Castle className="h-6 w-6 text-green-700" />
              </div>
              <CardTitle>Practice & Play</CardTitle>
              <CardDescription>
                Improve through guided experience
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <Shield className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span>Custom bot games at your skill level</span>
                </li>
                <li className="flex gap-2">
                  <Puzzle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span>Targeted puzzles focusing on your weaknesses</span>
                </li>
                <li className="flex gap-2">
                  <Crown className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span>Opening trainer with personalized repertoire</span>
                </li>
                <li className="flex gap-2">
                  <Users className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span>Friendly matches with community members</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Learn & Grow */}
          <Card>
            <CardHeader className="pb-2">
              <div className="bg-amber-100 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                <TrendingUp className="h-6 w-6 text-amber-700" />
              </div>
              <CardTitle>Learn & Grow</CardTitle>
              <CardDescription>
                Structured progress at your pace
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <BookOpen className="h-5 w-5 text-amber-600 flex-shrink-0" />
                  <span>Interactive courses for all skill levels</span>
                </li>
                <li className="flex gap-2">
                  <History className="h-5 w-5 text-amber-600 flex-shrink-0" />
                  <span>Study historic games with AI commentary</span>
                </li>
                <li className="flex gap-2">
                  <Brain className="h-5 w-5 text-amber-600 flex-shrink-0" />
                  <span>Tactical and strategic thinking development</span>
                </li>
                <li className="flex gap-2">
                  <Award className="h-5 w-5 text-amber-600 flex-shrink-0" />
                  <span>Earn badges and track your improvement</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
