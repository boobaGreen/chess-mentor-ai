import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Crown, Shield, Trophy } from "lucide-react";

const NftPage: React.FC = () => {
  const nftCollections = [
    {
      title: "Grandmaster Collection",
      description:
        "Exclusive NFTs featuring legendary chess positions and games",
      icon: <Crown className="h-8 w-8 text-yellow-500" />,
      price: "0.5 ETH",
      benefits: "Access to GM analysis and private tournaments",
    },
    {
      title: "Master Defender Series",
      description: "Strategic defensive positions immortalized as NFTs",
      icon: <Shield className="h-8 w-8 text-blue-500" />,
      price: "0.3 ETH",
      benefits: "Weekly defensive puzzles and strategy sessions",
    },
    {
      title: "Tournament Victory Moments",
      description: "Memorable tournament victories captured as NFTs",
      icon: <Trophy className="h-8 w-8 text-purple-500" />,
      price: "0.4 ETH",
      benefits: "Tournament entry privileges and exclusive content",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Chess NFT Collections</h1>
        <p className="text-xl text-gray-600">
          Own a piece of chess history with our exclusive NFT collections
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {nftCollections.map((collection, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-center mb-4">{collection.icon}</div>
              <CardTitle>{collection.title}</CardTitle>
              <CardDescription>{collection.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="space-y-2">
                <p className="text-2xl font-bold text-center text-primary">
                  {collection.price}
                </p>
                <p className="text-sm text-gray-600">{collection.benefits}</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Mint NFT</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Why Chess NFTs?</h2>
        <div className="max-w-2xl mx-auto text-gray-600">
          <p>
            Our NFTs combine the timeless art of chess with blockchain
            technology. Each piece represents not just ownership, but membership
            in an exclusive community of chess enthusiasts and collectors.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NftPage;
