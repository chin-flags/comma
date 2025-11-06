'use client';

import React from 'react';
import { useFocusModeStore } from '@/lib/focusMode';

const FocusModeToggle: React.FC = () => {
  const { typewriterMode, zenMode, toggleTypewriter, toggleZen } = useFocusModeStore();

  return (
    <div className="fixed bottom-4 right-4 flex flex-col space-y-2 p-2 rounded-lg bg-muted shadow-lg z-50">
      <button
        onClick={toggleTypewriter}
        className={`p-2 rounded-full transition-colors duration-200 ${typewriterMode ? 'bg-accent text-foreground' : 'bg-background text-muted-foreground'}`}
        title="Toggle Typewriter Mode (Cmd/Ctrl + T)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-type-square"><rect width="16" height="16" x="4" y="4" rx="2"/><path d="M10 9V7h4v2"/><path d="M12 7v10"/></svg>
      </button>
      <button
        onClick={toggleZen}
        className={`p-2 rounded-full transition-colors duration-200 ${zenMode ? 'bg-accent text-foreground' : 'bg-background text-muted-foreground'}`}
        title="Toggle Zen Mode (Cmd/Ctrl + Z)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-feather"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5.25 12.24a3 3 0 0 0 0 4.24l.94.94a1 1 0 0 0 1.41 0l3.41-3.41a1 1 0 0 0 0-1.41l-.94-.94a3 3 0 0 0-4.24 0L2.76 15.76a6 6 0 0 0 8.49 8.49l6.5-6.5a1 1 0 0 0 0-1.41l-.94-.94a3 3 0 0 0-4.24 0L12.24 20.24a6 6 0 0 0 8.49-8.49Z"/><path d="M18 12h.01"/><path d="M12 18h.01"/></svg>
      </button>
    </div>
  );
};

export default FocusModeToggle;