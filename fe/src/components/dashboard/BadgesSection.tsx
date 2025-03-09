import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Badge } from "../../components/ui/badge";
import { Lock, CheckCircle, Star, Castle, Medal, Crown, Target } from "lucide-react";

const BadgesSection: React.FC = () => {
  // Dati di esempio per i badge
  const badges = {
    earned: [
      { id: 1, name: "Principiante", icon: <CheckCircle className="h-4 w-4" />, date: "10 Feb 2025", description: "Completato il corso base" },
      { id: 2, name: "Gambetto", icon: <Castle className="h-4 w-4" />, date: "22 Feb 2025", description: "Padronanza del Gambetto di Donna" },
      { id: 3, name: "Tattiche 101", icon: <Target className="h-4 w-4" />, date: "5 Mar 2025", description: "Risolti 100 puzzle tattici" },
      { id: 4, name: "L'Analista", icon: <Star className="h-4 w-4" />, date: "18 Mar 2025", description: "Analizzate 25 partite" },
    ],
    available: [
      { id: 5, name: "Maestro di Finali", icon: <Crown className="h-4 w-4" />, progress: 65, description: "Completa tutti i corsi di finali" },
      { id: 6, name: "Stratega", icon: <Target className="h-4 w-4" />, progress: 40, description: "Vinci 10 partite con piani strategici" },
      { id: 7, name: "Esperto di Aperture", icon: <Castle className="h-4 w-4" />, progress: 20, description: "Padroneggia 5 strutture di apertura" },
    ],
    web3: [
      { id: 8, name: "NFT del Campione", icon: <Medal className="h-4 w-4" />, description: "Collezione esclusiva per il podio" },
      { id: 9, name: "Posizione Storica", icon: <Crown className="h-4 w-4" />, description: "Colleziona una posizione di partita famosa" },
    ]
  };

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Badge e Traguardi</CardTitle>
        <CardDescription>La tua collezione di riconoscimenti</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="earned">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="earned">Ottenuti ({badges.earned.length})</TabsTrigger>
            <TabsTrigger value="progress">In corso ({badges.available.length})</TabsTrigger>
            <TabsTrigger value="web3">NFT ({badges.web3.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="earned" className="space-y-4">
            {badges.earned.map((badge) => (
              <div key={badge.id} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <div className="bg-blue-100 p-3 rounded-full">
                  {badge.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{badge.name}</p>
                    <Badge variant="secondary" className="text-xs">{badge.date}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{badge.description}</p>
                </div>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="progress" className="space-y-4">
            {badges.available.map((badge) => (
              <div key={badge.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="bg-gray-100 p-3 rounded-full">
                  {badge.icon}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{badge.name}</p>
                  <p className="text-xs text-muted-foreground mb-1">{badge.description}</p>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${badge.progress}%` }}></div>
                  </div>
                  <p className="text-xs text-right mt-0.5">{badge.progress}%</p>
                </div>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="web3" className="space-y-4">
            {badges.web3.map((badge) => (
              <div key={badge.id} className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg border border-dashed border-purple-200">
                <div className="bg-purple-100 p-3 rounded-full">
                  {badge.icon}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="font-medium">{badge.name}</p>
                    <Badge variant="secondary" className="bg-purple-100 text-purple-700 text-xs">Web3</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{badge.description}</p>
                </div>
              </div>
            ))}
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-dashed border-gray-200">
              <div className="bg-gray-100 p-3 rounded-full">
                <Lock className="h-4 w-4 text-gray-500" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-500">Sblocca altri NFT</p>
                <p className="text-xs text-muted-foreground">Completa più obiettivi per sbloccare NFT esclusivi</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default BadgesSection;