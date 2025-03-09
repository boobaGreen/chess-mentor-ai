import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { AlertTriangle, Crown, Home } from "lucide-react";
import PageTitle from "../components/ui/page-title";
import { Card } from "../components/ui/card";

const NotFoundPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center">
        <PageTitle icon={AlertTriangle} title="Page Not Found" />

        <div className="flex flex-col items-center justify-center py-12 max-w-3xl w-full">
          <div className="mb-8 flex justify-center items-center">
            <Crown size={160} className="text-primary" strokeWidth={1.5} />
          </div>

          <Card className="p-8 w-full max-w-md text-center">
            <h1 className="text-6xl font-bold text-primary">404</h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Sorry, we couldn't find the page you're looking for. It might have
              been moved or doesn't exist.
            </p>
            <p className="mt-2 text-muted-foreground italic">
              Looks like this knight made an illegal move!
            </p>

            <div className="mt-8">
              <Button asChild size="lg" className="gap-2">
                <Link to="/">
                  <Home size={18} /> Return Home
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
