import React from "react";

interface ControlsProps {
  skillLevel: number;
  setSkillLevel: (level: number) => void;
  depth: number;
  setDepth: (depth: number) => void;
}

const Controls: React.FC<ControlsProps> = ({ skillLevel, setSkillLevel, depth, setDepth }) => {
  return (
    <div>
      <label className="text-xl font-semibold text-gray-700">
        Skill Level:
        <select
          value={skillLevel}
          onChange={(e) => setSkillLevel(Number(e.target.value))}
          className="ml-2 p-1 border rounded"
        >
          {Array.from({ length: 21 }, (_, i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
      </label>
      <label className="text-xl font-semibold text-gray-700 mt-4">
        Depth:
        <select
          value={depth}
          onChange={(e) => setDepth(Number(e.target.value))}
          className="ml-2 p-1 border rounded"
        >
          {Array.from({ length: 99 }, (_, i) => (
            <option key={i} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default Controls;