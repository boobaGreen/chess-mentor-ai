import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { Card, CardContent, CardFooter } from "../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import { ExternalLink, Youtube, Users } from "lucide-react";
import PageTitle from "../components/ui/page-title";

// Local images import
import tanaImage from "../assets/images/channels_tana_degli_scacchi_banner.webp";
import giuppiDevImage from "../assets/images/channels_giuppydev.webp";
import scarsoImage from "../assets/images/channels_scarsoscacco_banner.webp";
import gianlucaImage from "../assets/images/channels_gianlucalomarco_banner.webp";

const youtubeChannels = [
  {
    name: "Tana degli Scacchi",
    url: "https://www.youtube.com/@Tana-degli-Scacchi",
    description: "Excellent Italian chess content and tutorials",
    bannerImage: tanaImage,
    category: "Chess Edu-Entertainment",
    featured: true,
  },
  {
    name: "ScarsoScacco",
    url: "https://www.youtube.com/@scarsoscacco/shorts",
    description:
      "Creative chess shorts and analysis and professional developer",
    bannerImage: scarsoImage,
    category: "Chess Edu-Entertainment",
    featured: true,
  },
  {
    name: "Gianluca Lomarco",
    url: "https://www.youtube.com/@gianlucalomarco",
    description: "Programming tutorials and developer 3D creative specialist",
    bannerImage: gianlucaImage,
    category: "Chess Analysis",
    featured: true,
  },
  {
    name: "GiuppiDev",
    url: "https://www.youtube.com/@giuppidev",
    description: "Programming tutorials and developer insights AI specialist",
    bannerImage: giuppiDevImage,
    category: "Programming & Chess Tech",
    featured: true,
  },
];

const websites = [
  {
    name: "Lichess",
    url: "https://lichess.org",
    description: "Free and open-source chess server with training tools",
    category: "Chess Platform",
    featured: true,
  },
  {
    name: "Chess Programming Wiki",
    url: "https://www.chessprogramming.org/Main_Page",
    description: "Comprehensive resource on chess AI development",
    category: "Programming Resource",
    featured: false,
  },
];

const FriendsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center">
        <PageTitle icon={Users} title="Friends" />

        <Card className="p-4 mb-6 w-full max-w-3xl">
          <p className="text-lg text-center text-muted-foreground">
            Connect with our network of chess educators, content creators, and
            resources. We're proud to support these outstanding members of the
            chess community.
          </p>
        </Card>

        <Tabs defaultValue="youtube" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="youtube" className="flex items-center gap-2">
              <Youtube className="h-4 w-4" />
              YouTube Channels
            </TabsTrigger>
            <TabsTrigger value="websites">Websites & Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="youtube" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {youtubeChannels.map((channel, index) => (
                <Card key={index} className="overflow-hidden">
                  <div
                    className="aspect-video w-full relative cursor-pointer overflow-hidden hover:opacity-90 transition-opacity"
                    onClick={() => window.open(channel.url, "_blank")}
                  >
                    <div className="w-full h-full relative">
                      <img
                        src={channel.bannerImage}
                        alt={`${channel.name} channel`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-full shadow-lg opacity-90">
                          <Youtube className="h-14 w-14 text-red-600" />
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                        <h3 className="text-xl font-bold text-white">
                          {channel.name}
                        </h3>
                        <div className="text-sm text-gray-300">
                          {channel.category}
                        </div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity">
                        <div className="bg-white p-4 rounded-full shadow-lg">
                          <ExternalLink className="h-8 w-8 text-red-600" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <CardContent className="pt-4">
                    <p>{channel.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                      onClick={() => window.open(channel.url, "_blank")}
                    >
                      <Youtube className="h-4 w-4 text-red-600" /> Visit Channel
                    </Button>
                    {channel.featured && (
                      <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                        Featured
                      </span>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="websites" className="mt-6">
            <Accordion type="single" collapsible className="w-full">
              {websites.map((site, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <span>{site.name}</span>
                      {site.featured && (
                        <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                          Featured
                        </span>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="p-4 bg-gray-50 rounded-md">
                      <p className="mb-4">{site.description}</p>
                      <Button
                        size="sm"
                        className="flex items-center gap-2"
                        onClick={() => window.open(site.url, "_blank")}
                      >
                        <ExternalLink className="h-4 w-4" /> Visit Website
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>
        </Tabs>

        <div className="mt-12 border-t pt-6 w-full max-w-3xl">
          <h3 className="text-xl font-semibold mb-4">Want to be featured?</h3>
          <p className="text-gray-600 mb-4">
            If you run a chess website, YouTube channel, or educational platform
            and would like to partner with Chess Mentor AI, we'd love to hear
            from you!
          </p>
          <Button variant="default">Contact Us</Button>
        </div>
      </div>
    </div>
  );
};

export default FriendsPage;
