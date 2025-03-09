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

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[800px] max-h-[80vh] bg-white">
        <DialogHeader>
          <DialogTitle>Informativa sulla Privacy</DialogTitle>
          <DialogDescription>
            Come gestiamo e proteggiamo i tuoi dati su Chess Mentor AI.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-4">
            <section>
              <h3 className="font-semibold mb-2">1. Raccolta Dati</h3>
              <p>
                Raccogliamo solo i dati necessari per il funzionamento del
                servizio: - ID di autenticazione da provider esterni
                (GitHub/Google) - Cronologia delle partite - Progressi di
                apprendimento - Note personali e analisi salvate
              </p>
            </section>

            <section>
              <h3 className="font-semibold mb-2">2. Utilizzo dei Dati</h3>
              <p>
                I tuoi dati vengono utilizzati per: - Personalizzare il percorso
                di apprendimento - Fornire analisi delle partite - Tracciare i
                progressi - Migliorare l'esperienza di apprendimento
              </p>
            </section>

            <section>
              <h3 className="font-semibold mb-2">3. Protezione dei Dati</h3>
              <p>
                Tutti i dati sono memorizzati in modo sicuro su Supabase. Non
                condividiamo i tuoi dati con terze parti e implementiamo misure
                di sicurezza appropriate per proteggere le tue informazioni.
              </p>
            </section>

            <section>
              <h3 className="font-semibold mb-2">4. Diritti dell'Utente</h3>
              <p>
                Hai il diritto di: - Accedere ai tuoi dati - Richiedere la
                cancellazione del tuo account - Esportare le tue partite e
                analisi - Modificare le tue impostazioni di privacy
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
