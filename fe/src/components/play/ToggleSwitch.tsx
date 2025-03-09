import React from "react";

interface ToggleSwitchProps {
  label: string;
  isEnabled: boolean;
  onToggle: () => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  label,
  isEnabled,
  onToggle,
}) => {
  return (
    <div className="flex items-center mt-4">
      <label className="text-xl font-semibold text-gray-700 mr-2">
        {label}
      </label>
      <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
        <input
          type="checkbox"
          name={label}
          id={label}
          checked={isEnabled}
          onChange={onToggle}
          className="absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer right-0 checked:right-0 checked:border-green-500"
        />
        <label
          htmlFor={label}
          className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
        ></label>
      </div>
    </div>
  );
};

export default ToggleSwitch;
