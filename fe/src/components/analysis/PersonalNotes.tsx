import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import { BookMarked, Save } from "lucide-react";

interface PersonalNotesProps {
  currentMoveIndex: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  gameInfo: any;
}

const PersonalNotes: React.FC<PersonalNotesProps> = ({ currentMoveIndex }) => {
  const [notes, setNotes] = useState<Record<number, string>>({});
  const [currentNote, setCurrentNote] = useState("");

  // Carica le note quando cambia mossa
  useEffect(() => {
    if (currentMoveIndex >= 0 && notes[currentMoveIndex]) {
      setCurrentNote(notes[currentMoveIndex]);
    } else {
      setCurrentNote("");
    }
  }, [currentMoveIndex, notes]);

  const handleSaveNote = () => {
    if (currentMoveIndex >= 0) {
      setNotes({
        ...notes,
        [currentMoveIndex]: currentNote,
      });
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <BookMarked className="h-5 w-5 mr-2 text-primary" />
          Appunti Personali
        </CardTitle>
      </CardHeader>
      <CardContent>
        {currentMoveIndex >= 0 ? (
          <Textarea
            placeholder="Scrivi qui i tuoi appunti su questa posizione..."
            className="min-h-[200px]"
            value={currentNote}
            onChange={(e) => setCurrentNote(e.target.value)}
          />
        ) : (
          <p className="text-sm text-muted-foreground">
            Seleziona una mossa per aggiungere appunti.
          </p>
        )}
      </CardContent>
      <CardFooter>
        <Button
          className="ml-auto flex items-center gap-1"
          onClick={handleSaveNote}
          disabled={currentMoveIndex < 0}
        >
          <Save className="h-4 w-4" />
          Salva Nota
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PersonalNotes;
