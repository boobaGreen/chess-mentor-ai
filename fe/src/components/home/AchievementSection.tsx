import React from "react";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Medal, Wallet, FileDigit } from "lucide-react";

const AchievementSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <Badge
              variant="outline"
              className="mb-2 px-3 py-1 border-purple-200 bg-purple-50 text-purple-700"
            >
              Track Your Growth
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Achievement System & Digital Collectibles
            </h2>
            <p className="text-gray-700 mb-6">
              Our unique achievement system rewards your progress with badges
              and collectibles. Master tactics, openings, or endgames and build
              your digital chess portfolio.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="bg-purple-100 p-2 rounded-full mt-1">
                  <Medal className="h-5 w-5 text-purple-700" />
                </div>
                <div>
                  <h3 className="font-medium">Web2 Achievements</h3>
                  <p className="text-sm text-gray-600">
                    Earn badges for completing courses, solving puzzles, and
                    improving your skills.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-blue-100 p-2 rounded-full mt-1">
                  <Wallet className="h-5 w-5 text-blue-700" />
                </div>
                <div>
                  <h3 className="font-medium">Web3 Integration</h3>
                  <p className="text-sm text-gray-600">
                    Convert your achievements to blockchain badges or collect
                    unique chess position NFTs.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-emerald-100 p-2 rounded-full mt-1">
                  <FileDigit className="h-5 w-5 text-emerald-700" />
                </div>
                <div>
                  <h3 className="font-medium">Chess Position NFTs</h3>
                  <p className="text-sm text-gray-600">
                    Own historic chess positions or moments from your own
                    journey as unique digital collectibles.
                  </p>
                </div>
              </div>
            </div>

            <Button>Explore Achievements</Button>
          </div>

          <div className="md:w-1/2">
            <div className="bg-gray-100 rounded-xl p-8 aspect-square w-full max-w-md mx-auto">
              {/* Placeholder for achievement badges gallery */}
              <div className="text-center text-gray-500">
                [Achievement Badges Gallery]
                <p className="text-sm mt-4">
                  Image placeholder: A collection of chess-themed achievement
                  badges and NFT positions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AchievementSection;
