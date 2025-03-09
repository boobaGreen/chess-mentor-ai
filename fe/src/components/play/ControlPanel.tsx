import React from "react";
import ToggleSwitch from "./ToggleSwitch";

interface ControlPanelProps {
  skillLevel: number;
  setSkillLevel: (level: number) => void;
  depth: number;
  setDepth: (depth: number) => void;
  showUndo: boolean;
  setShowUndo: (show: boolean) => void;
  showHistory: boolean;
  setShowHistory: (show: boolean) => void;
  showSkill: boolean;
  setShowSkill: (show: boolean) => void;
  showDepth: boolean;
  setShowDepth: (show: boolean) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  skillLevel,
  setSkillLevel,
  depth,
  setDepth,
  showUndo,
  setShowUndo,
  showHistory,
  setShowHistory,
  showSkill,
  setShowSkill,
  showDepth,
  setShowDepth,
}) => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block text-lg font-semibold text-gray-700">
          Skill Level
        </label>
        <input
          type="range"
          min="0"
          max="20"
          value={skillLevel}
          onChange={(e) => setSkillLevel(Number(e.target.value))}
          className="w-full mt-2"
          disabled={!showSkill}
        />
        <span className="block text-center mt-2">{skillLevel}</span>
      </div>
      <div className="mb-4">
        <label className="block text-lg font-semibold text-gray-700">
          Depth
        </label>
        <input
          type="range"
          min="1"
          max="99"
          value={depth}
          onChange={(e) => setDepth(Number(e.target.value))}
          className="w-full mt-2"
          disabled={!showDepth}
        />
        <span className="block text-center mt-2">{depth}</span>
      </div>
      <ToggleSwitch
        label="Undo"
        isEnabled={showUndo}
        onToggle={() => setShowUndo(!showUndo)}
      />
      <ToggleSwitch
        label="Move History"
        isEnabled={showHistory}
        onToggle={() => setShowHistory(!showHistory)}
      />
      <ToggleSwitch
        label="Skill Selection"
        isEnabled={showSkill}
        onToggle={() => setShowSkill(!showSkill)}
      />
      <ToggleSwitch
        label="Depth Selection"
        isEnabled={showDepth}
        onToggle={() => setShowDepth(!showDepth)}
      />
    </div>
  );
};

export default ControlPanel;
