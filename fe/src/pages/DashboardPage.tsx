import React from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { CalendarIcon, ChevronUp, UserIcon } from "lucide-react";

import UserOverview from "../components/dashboard/UserOverview";
import ProgressChart from "../components/dashboard/ProgressChart";
import BadgesSection from "../components/dashboard/BadgesSection";
import RecentActivities from "../components/dashboard/RecentActivities";
import ImprovementAreas from "../components/dashboard/ImprovementAreas";
import LearningPath from "../components/dashboard/LearningPath";
import UpcomingEvents from "../components/dashboard/UpcomingEvents";
import Strengths from "../components/dashboard/Strengths";
import { List } from "lucide-react"; // Add this import
import PageTitle from "../components/ui/page-title";

const DashboardPage: React.FC = () => {
  return (
    <div className="container mx-auto py-6 px-4 md:px-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 md:items-center">
        <PageTitle icon={List} title="Dashboard" />
        <div className="flex items-center gap-4">
          <CalendarIcon className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Last updated: Today, 9:42 AM
          </span>
          <Avatar className="h-9 w-9">
            <AvatarImage src="/assets/avatars/user-avatar.png" alt="User" />
            <AvatarFallback>
              <UserIcon className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Remove the old header text */}

      {/* Rest of the dashboard content remains the same */}
      <UserOverview />

      {/* Main Tabs */}
      <Tabs defaultValue="progress" className="space-y-4 ">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 mb-12">
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="learning">Learning Path</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="events" className="hidden lg:block">
            Events
          </TabsTrigger>
        </TabsList>

        {/* Progress Tab */}
        <TabsContent value="progress" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="col-span-1 md:col-span-2 lg:col-span-1">
              <ProgressChart />
            </div>
            <div className="col-span-1">
              <ImprovementAreas />
            </div>
            <div className="col-span-1">
              <Strengths />
            </div>
          </div>
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements" className="space-y-4">
          <BadgesSection />
        </TabsContent>

        {/* Learning Path Tab */}
        <TabsContent value="learning" className="space-y-4">
          <LearningPath />
        </TabsContent>

        {/* Activities Tab */}
        <TabsContent value="activities" className="space-y-4">
          <RecentActivities />
        </TabsContent>

        {/* Events Tab */}
        <TabsContent value="events" className="space-y-4">
          <UpcomingEvents />
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
          <CardDescription>Continue where you left off</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            variant="default"
            className="h-20 flex-col text-center w-full"
          >
            <span className="font-bold">Daily Puzzle</span>
            <span className="text-xs">Challenge yourself</span>
          </Button>
          <Button
            variant="secondary"
            className="h-20 flex-col text-center w-full"
          >
            <span className="font-bold">Continue Lesson</span>
            <span className="text-xs">Queen's Gambit: Chapter 4</span>
          </Button>
          <Button
            variant="outline"
            className="h-20 flex-col text-center w-full"
          >
            <span className="font-bold">Play vs AI</span>
            <span className="text-xs">Adaptive difficulty</span>
          </Button>
        </CardContent>
      </Card>

      {/* Back to top */}
      <div className="flex justify-center pt-4">
        <Button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          size="sm"
          variant="outline"
          className="rounded-full h-10 w-10 p-0"
        >
          <ChevronUp className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default DashboardPage;
