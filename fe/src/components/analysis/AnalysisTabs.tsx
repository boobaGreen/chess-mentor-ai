import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import AnalysisTab from "./AnalysisTab"; // CORRETTO: importa da "./AnalysisTab" invece di "./AnalysisTabs"
import ChatTab from "./ChatTab";
import NotesTab from "./NotesTab";
import { ChatMessage, UserNote } from "../../types/analysis";

interface AnalysisTabsProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  currentMoveIndex: number;
  evaluation: number | string;
  formatEvaluation: (evaluation: number | string) => string;
  gameInfo: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  personalizedTips: string[];
  history: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
  chatMessages: ChatMessage[];
  inputMessage: string;
  setInputMessage: (message: string) => void;
  handleSendMessage: () => void;
  formatTime: (date: Date) => string;
  userNotes: UserNote[];
  newNote: string;
  setNewNote: (note: string) => void;
  handleAddNote: () => void;
  formatMoveNumber: (index: number) => string;
}

const AnalysisTabs: React.FC<AnalysisTabsProps> = ({
  activeTab,
  setActiveTab,
  currentMoveIndex,
  evaluation,
  formatEvaluation,
  gameInfo,
  personalizedTips,
  history,
  chatMessages,
  inputMessage,
  setInputMessage,
  handleSendMessage,
  formatTime,
  userNotes,
  newNote,
  setNewNote,
  handleAddNote,
  formatMoveNumber,
}) => {
  return (
    <Tabs
      defaultValue="analysis"
      value={activeTab}
      onValueChange={setActiveTab}
      className="flex flex-col h-full"
    >
      <TabsList className="grid grid-cols-3 mb-4">
        <TabsTrigger value="analysis">Analisi</TabsTrigger>
        <TabsTrigger value="chat">Chat</TabsTrigger>
        <TabsTrigger value="notes">Note</TabsTrigger>
      </TabsList>

      {/* Tab Analisi */}
      <TabsContent value="analysis" className="flex-grow">
        <AnalysisTab
          currentMoveIndex={currentMoveIndex}
          evaluation={evaluation}
          formatEvaluation={formatEvaluation}
          gameInfo={gameInfo}
          personalizedTips={personalizedTips}
          history={history}
        />
      </TabsContent>

      {/* Tab Chat */}
      <TabsContent value="chat" className="flex-grow">
        <ChatTab
          chatMessages={chatMessages}
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          handleSendMessage={handleSendMessage}
          formatTime={formatTime}
        />
      </TabsContent>

      {/* Tab Note */}
      <TabsContent value="notes" className="flex-grow">
        <NotesTab
          userNotes={userNotes}
          newNote={newNote}
          setNewNote={setNewNote}
          handleAddNote={handleAddNote}
          currentMoveIndex={currentMoveIndex}
          formatMoveNumber={formatMoveNumber}
          history={history}
          formatTime={formatTime}
        />
      </TabsContent>
    </Tabs>
  );
};

export default AnalysisTabs;
