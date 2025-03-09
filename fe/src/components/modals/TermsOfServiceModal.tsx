import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";

interface TermsOfServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsOfServiceModal: React.FC<TermsOfServiceModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[800px] max-h-[80vh] bg-white">
        <DialogHeader>
          <DialogTitle>Termini di Servizio</DialogTitle>
          <DialogDescription>
            Leggi attentamente questi termini prima di utilizzare Chess Mentor AI.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-4">
            <section>
              <h3 className="font-semibold mb-2">1. Panoramica del Servizio</h3>
              <p>
                Chess Mentor AI è un progetto didattico che offre un'esperienza di apprendimento 
                degli scacchi assistita dall'intelligenza artificiale. Il servizio include analisi 
                delle partite, tutorial interattivi e strumenti di pratica.
              </p>
            </section>

            <section>
              <h3 className="font-semibold mb-2">2. Responsabilità dell'Utente</h3>
              <p>
                Gli utenti sono responsabili del proprio comportamento sulla piattaforma 
                e devono rispettare le regole della community. Non è permesso l'uso di motori 
                scacchistici esterni durante le partite o i puzzle.
              </p>
            </section>

            <section>
              <h3 className="font-semibold mb-2">3. Contenuti Educativi</h3>
              <p>
                I contenuti educativi sono forniti a scopo di apprendimento. Le analisi AI 
                sono generate automaticamente e dovrebbero essere considerate come suggerimenti 
                di studio, non verità assolute.
              </p>
            </section>

            <section>
              <h3 className="font-semibold mb-2">4. Limitazioni di Responsabilità</h3>
              <p>
                Questo è un progetto didattico fornito "così com'è". Non garantiamo 
                la disponibilità continua del servizio o l'accuratezza delle analisi AI.
              </p>
            </section>
          </div>
        </ScrollArea>
        <DialogFooter>
          <Button onClick={onClose}>Chiudi</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};