import React from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import { ScrollArea } from "../../components/ui/scroll-area";
import { UserNote } from "../../types/analysis";
import { Pencil, Trash, Plus } from "lucide-react";

interface NotesTabProps {
  userNotes: UserNote[];
  newNote: string;
  setNewNote: (note: string) => void;
  handleAddNote: () => void;
  currentMoveIndex: number;
  formatMoveNumber: (index: number) => string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  history: any[];
  formatTime: (date: Date) => string;
}

const NotesTab: React.FC<NotesTabProps> = ({
  userNotes,
  newNote,
  setNewNote,
  handleAddNote,
  currentMoveIndex,
  formatMoveNumber,
  history,
  formatTime,
}) => {
  return (
    <Card className="h-full flex flex-col border-none shadow-none">
      <CardContent className="flex-grow p-0">
        <div className="space-y-4">
          <div className="p-4 border rounded-lg bg-muted/30">
            <Textarea
              placeholder="Aggiungi una nota per questa posizione..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="mb-2 min-h-[100px]"
            />
            <Button
              onClick={handleAddNote}
              className="w-full"
              disabled={!newNote.trim()}
            >
              <Plus className="w-4 h-4 mr-2" />
              Aggiungi Nota
            </Button>
          </div>

          <ScrollArea className="h-[calc(100vh-400px)]">
            <div className="space-y-4 px-4">
              {userNotes
                .filter((note) => note.moveNumber === currentMoveIndex)
                .map((note) => (
                  <div key={note.id} className="p-4 border rounded-lg bg-card">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="text-sm font-medium">
                          {formatMoveNumber(note.moveNumber)}{" "}
                          {history[note.moveNumber]?.san}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {formatTime(note.timestamp)}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm whitespace-pre-wrap">{note.note}</p>
                  </div>
                ))}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotesTab;
