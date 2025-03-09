import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

const CtaSection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <Card className="p-8 text-center border-t-4 border-primary shadow-lg">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Improve Your Chess Skills?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join Chess Mentor AI today and start your journey to chess mastery
            with personalized AI coaching.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button size="lg" variant="default" className="font-semibold">
                Sign In
              </Button>
            </Link>
            <Link to="/partita">
              <Button size="lg" variant="outline" className="font-semibold">
                Try Free Game
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default CtaSection;
