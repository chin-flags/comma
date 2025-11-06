'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { getWritingSessionFromLocalStorage, saveWritingSessionToLocalStorage, WritingSession } from '@/lib/storage';
import { countWords, formatTime } from '@/lib/metrics';
import { useFocusModeStore } from '@/lib/focusMode';
import { useThemeStore } from '@/lib/theme'; // Import useThemeStore
import MetricsDisplay from './MetricsDisplay';
import ThemeToggle from './ThemeToggle'; // Import ThemeToggle
import FocusModeToggle from './FocusModeToggle'; // Import FocusModeToggle

const WritingSpace: React.FC = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { typewriterMode, zenMode, toggleTypewriter, toggleZen } = useFocusModeStore();
  const { theme } = useThemeStore(); // Get theme from store

  const [session, setSession] = useState<WritingSession | null>(null);
  const [content, setContent] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('unsaved');

  // Load session from local storage on mount
  useEffect(() => {
    const loadedSession = getWritingSessionFromLocalStorage();
    if (loadedSession) {
      setSession(loadedSession);
      setContent(loadedSession.content);
      setWordCount(loadedSession.wordCount);
      setElapsedTime(Math.floor((Date.now() - loadedSession.startTime) / 1000));
    } else {
      const newSession: WritingSession = {
        sessionId: crypto.randomUUID(),
        content: '',
        wordCount: 0,
        startTime: Date.now(),
        lastSaved: Date.now(),
      };
      setSession(newSession);
      saveWritingSessionToLocalStorage(newSession);
    }
  }, []);

  // Timer for elapsed time
  useEffect(() => {
    const timer = setInterval(() => {
      if (session) {
        setElapsedTime(Math.floor((Date.now() - session.startTime) / 1000));
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [session]);

  // Debounced save function
  const debouncedSave = useCallback(
    (newContent: string) => {
      setSaveStatus('saving');
      if (session) {
        const newWordCount = countWords(newContent);
        const updatedSession: WritingSession = {
          ...session,
          content: newContent,
          wordCount: newWordCount,
          lastSaved: Date.now(),
        };
        saveWritingSessionToLocalStorage(updatedSession);
        setSession(updatedSession);
        setWordCount(newWordCount);
        setTimeout(() => setSaveStatus('saved'), 500);
      }
    },
    [session]
  );

  // Effect for debouncing
  useEffect(() => {
    const handler = setTimeout(() => {
      if (content !== session?.content) {
        debouncedSave(content);
      }
    }, 300); // 300ms debounce delay

    return () => {
      clearTimeout(handler);
    };
  }, [content, session, debouncedSave]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setSaveStatus('unsaved');
  };

  // Typewriter Mode Effect
  useEffect(() => {
    if (!typewriterMode || !textareaRef.current) return;

    const textarea = textareaRef.current;
    const { selectionStart } = textarea;
    const currentLineNumber = textarea.value.slice(0, selectionStart).split('\n').length;
    const lineHeight = parseFloat(getComputedStyle(textarea).lineHeight);
    const viewportHeight = textarea.clientHeight;

    // Calculate the scroll position needed to center the current line
    const scrollTo = (currentLineNumber * lineHeight) - (viewportHeight / 2) + (lineHeight / 2);

    textarea.scrollTop = scrollTo;
  }, [content, typewriterMode, textareaRef]); // Removed wordCount, elapsedTime from dependencies as they don't affect scroll

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 't') {
        event.preventDefault();
        toggleTypewriter();
      }
      if ((event.metaKey || event.ctrlKey) && event.key === 'z') {
        event.preventDefault();
        toggleZen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggleTypewriter, toggleZen]);

  return (
    <div className="flex flex-col h-screen w-screen bg-background text-foreground">
      <textarea
        ref={textareaRef}
        className="flex-grow p-8 text-lg resize-none outline-none bg-transparent placeholder-foreground/50"
        placeholder="Start writing..."
        autoFocus
        value={content}
        onChange={handleContentChange}
      />
      <MetricsDisplay wordCount={wordCount} elapsedTime={formatTime(elapsedTime)} />
      <div className={`fixed bottom-4 left-4 text-sm text-muted-foreground ${zenMode ? 'zen-mode-hide' : ''}`}>
        {saveStatus === 'saving' && 'Saving...'}
        {saveStatus === 'saved' && 'Saved'}
      </div>
      <div className={`${zenMode ? 'zen-mode-hide' : ''}`}>
        <ThemeToggle />
        <FocusModeToggle />
      </div>
    </div>
  );
};

export default WritingSpace;