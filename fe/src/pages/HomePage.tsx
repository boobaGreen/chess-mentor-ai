import React from "react";
import HeroSection from "../components/home/HeroSection";
import FeaturesSection from "../components/home/FeaturesSection";
import CommunitySection from "../components/home/CommunitySection";
import AchievementSection from "../components/home/AchievementSection";
import TestimonialsSection from "../components/home/TestimonialsSection";
import CtaSection from "../components/home/CTASection";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <CommunitySection />
      <AchievementSection />
      <TestimonialsSection />
      <CtaSection />
    </div>
  );
};

export default HomePage;
