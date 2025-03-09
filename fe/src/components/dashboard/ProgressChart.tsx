import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ProgressChart: React.FC = () => {
  // Dati di esempio per il grafico
  const data = [
    { month: 'Gen', rating: 850 },
    { month: 'Feb', rating: 900 },
    { month: 'Mar', rating: 920 },
    { month: 'Apr', rating: 980 },
    { month: 'Mag', rating: 950 },
    { month: 'Giu', rating: 1010 },
    { month: 'Lug', rating: 1080 },
    { month: 'Ago', rating: 1150 },
  ];

  return (
    <Card className="col-span-3 md:col-span-1">
      <CardHeader>
        <CardTitle>Progressi rating</CardTitle>
        <CardDescription>Il tuo miglioramento nel tempo</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          {/* Se hai recharts incluso nel progetto, utilizza questo componente */}
          {/* Altrimenti, puoi sostituirlo con un'immagine placeholder per ora */}
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={['dataMin - 50', 'dataMax + 50']} />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="rating" 
                stroke="#3b82f6" 
                strokeWidth={2} 
              />
            </LineChart>
          </ResponsiveContainer>
          
          {/* Decommentare questa sezione se non hai recharts */}
          {/* <div className="bg-gray-100 flex items-center justify-center h-full rounded-md">
            <p className="text-gray-500 text-sm">Grafico dei progressi</p>
          </div> */}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressChart;