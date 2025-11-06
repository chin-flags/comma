'use client';

import React from 'react';

interface MetricsDisplayProps {
  wordCount: number;
  elapsedTime: string;
}

const MetricsDisplay: React.FC<MetricsDisplayProps> = ({ wordCount, elapsedTime }) => {
  const showWordCount = wordCount >= 50;

  return (
    <div className="fixed bottom-4 right-4 flex items-center space-x-4 text-sm text-muted-foreground transition-opacity duration-500 ease-in-out">
      {showWordCount && (
        <div className={`transition-opacity duration-500 ease-in-out ${showWordCount ? 'opacity-100' : 'opacity-0'}`}>
          {wordCount} words
        </div>
      )}
      <div>{elapsedTime}</div>
    </div>
  );
};

export default MetricsDisplay;