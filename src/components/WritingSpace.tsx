'use client';

import React from 'react';

const WritingSpace: React.FC = () => {
  return (
    <div className="flex flex-col h-screen w-screen bg-background text-foreground">
      <textarea
        className="flex-grow p-8 text-lg resize-none outline-none bg-transparent placeholder-foreground/50"
        placeholder="Start writing..."
        autoFocus
      />
    </div>
  );
};

export default WritingSpace;