import React from "react";
import { Globe, Smile, Frown, Flame, Zap, Angry } from "lucide-react";

const moods = [
    { label: "All", icon: Globe },
    { label: "Happy", icon: Smile },
    { label: "Sad", icon: Frown },
    { label: "Motivated", icon: Flame },
    { label: "Excited", icon: Zap },
    { label: "Angry", icon: Angry },
];

const MoodFilterBar = ({ selectedMood, onMoodChange }) => {
    return (
        <div className="flex flex-wrap gap-2 justify-start">
            {moods.map(({ label, icon: Icon }) => (
                <button
                    key={label}
                    onClick={() => onMoodChange(label)}
                    className={`group relative px-3 py-1 rounded-full border transition
            ${
                        selectedMood === label
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white dark:bg-gray-700 text-gray-700 dark:text-white border-gray-300 dark:border-gray-500"
                    }`}
                >
                    <Icon size={18} />

                    {/* Tooltip on hover */}
                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 text-xs bg-gray-800 text-white px-2 py-1 rounded shadow transition">
            {label}
          </span>
                </button>
            ))}
        </div>
    );
};

export default MoodFilterBar;
