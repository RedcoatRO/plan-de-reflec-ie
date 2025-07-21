
import React from 'react';

interface StreakIndicatorProps {
  streak: number;
}

const StreakIndicator: React.FC<StreakIndicatorProps> = ({ streak }) => {
  if (streak === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-1 bg-orange-100 text-orange-600 font-bold px-3 py-1 rounded-full text-lg">
      <span>🔥</span>
      <span>{streak}</span>
    </div>
  );
};

export default StreakIndicator;
