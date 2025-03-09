import React from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { Flame, Trophy, Star, CheckCircle2, Award, Zap } from "lucide-react";

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          Learning Journeys
        </h2>

        <Tabs defaultValue="beginner" className="max-w-4xl mx-auto">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="beginner">Beginner</TabsTrigger>
            <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          {/* BEGINNER TESTIMONIAL */}
          <TabsContent
            value="beginner"
            className="bg-white rounded-lg p-6 shadow-sm"
          >
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="md:w-1/3">
                <div className="bg-gray-200 rounded-full w-32 h-32 mx-auto mb-4">
                  {/* Placeholder for user image */}
                  <div className="flex items-center justify-center h-full text-gray-400">
                    [User Photo]
                  </div>
                </div>
                <h3 className="font-medium text-lg">Marco, 34</h3>
                <p className="text-gray-500">Started 3 months ago</p>
              </div>

              <div className="md:w-2/3 text-left">
                <p className="italic text-gray-700 mb-4">
                  "As a complete beginner, I was intimidated by chess. The AI
                  mentor broke everything down into simple lessons and never
                  made me feel rushed. Now I understand the basics and can
                  actually enjoy playing!"
                </p>

                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-medium">Progress Highlights:</p>
                    <ul className="text-sm space-y-1 mt-1">
                      <li className="flex items-center gap-1">
                        <Flame className="h-4 w-4 text-amber-500" />
                        Completed Fundamentals Course
                      </li>
                      <li className="flex items-center gap-1">
                        <Flame className="h-4 w-4 text-amber-500" />
                        Solved 120+ Basic Tactics
                      </li>
                      <li className="flex items-center gap-1">
                        <Flame className="h-4 w-4 text-amber-500" />
                        First win against Easy Bot
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* INTERMEDIATE TESTIMONIAL */}
          <TabsContent
            value="intermediate"
            className="bg-white rounded-lg p-6 shadow-sm"
          >
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="md:w-1/3">
                <div className="bg-gray-200 rounded-full w-32 h-32 mx-auto mb-4">
                  {/* Placeholder for user image */}
                  <div className="flex items-center justify-center h-full text-gray-400">
                    [User Photo]
                  </div>
                </div>
                <h3 className="font-medium text-lg">Sophia, 28</h3>
                <p className="text-gray-500">Started 1 year ago</p>
              </div>

              <div className="md:w-2/3 text-left">
                <p className="italic text-gray-700 mb-4">
                  "I plateaued around 1200 ELO on other platforms. The AI mentor
                  analyzed my games and identified exactly what was holding me
                  back - weak endgames and missed tactical opportunities. After
                  six months of focused training on these areas, I've climbed to
                  1500!"
                </p>

                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-medium">Progress Highlights:</p>
                    <ul className="text-sm space-y-1 mt-1">
                      <li className="flex items-center gap-1">
                        <Trophy className="h-4 w-4 text-blue-500" />
                        Completed Intermediate Tactics Course
                      </li>
                      <li className="flex items-center gap-1">
                        <CheckCircle2 className="h-4 w-4 text-blue-500" />
                        Mastered 5 Essential Endgame Patterns
                      </li>
                      <li className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-blue-500" />
                        Won 12 Community Tournament Games
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* ADVANCED TESTIMONIAL */}
          <TabsContent
            value="advanced"
            className="bg-white rounded-lg p-6 shadow-sm"
          >
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="md:w-1/3">
                <div className="bg-gray-200 rounded-full w-32 h-32 mx-auto mb-4">
                  {/* Placeholder for user image */}
                  <div className="flex items-center justify-center h-full text-gray-400">
                    [User Photo]
                  </div>
                </div>
                <h3 className="font-medium text-lg">Daniel, 41</h3>
                <p className="text-gray-500">Member for 2+ years</p>
              </div>

              <div className="md:w-2/3 text-left">
                <p className="italic text-gray-700 mb-4">
                  "As a 1900-rated player, I was skeptical that an AI could
                  still help me improve. But the depth of analysis and
                  personalized training plans were incredible. The mentor not
                  only helped refine my opening repertoire but also showed me
                  strategic patterns I was missing. Now at 2100+, I'm still
                  learning daily."
                </p>

                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-medium">Progress Highlights:</p>
                    <ul className="text-sm space-y-1 mt-1">
                      <li className="flex items-center gap-1">
                        <Award className="h-4 w-4 text-purple-500" />
                        Completed GM-level Positional Course
                      </li>
                      <li className="flex items-center gap-1">
                        <Zap className="h-4 w-4 text-purple-500" />
                        Built Custom Advanced Opening Repertoire
                      </li>
                      <li className="flex items-center gap-1">
                        <Trophy className="h-4 w-4 text-purple-500" />
                        Won Regional Championship with AI-prepared strategy
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default TestimonialsSection;
