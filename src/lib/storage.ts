export const getThemeFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('theme') as 'dark' | 'light' | null;
  }
  return null;
};

export const saveThemeToLocalStorage = (theme: 'dark' | 'light') => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('theme', theme);
  }
};

export interface WritingSession {
  content: string;
  wordCount: number;
  startTime: number; // timestamp
  lastSaved: number; // timestamp
  sessionId: string; // unique identifier
}

export const getWritingSessionFromLocalStorage = (): WritingSession | null => {
  if (typeof window !== 'undefined') {
    const session = localStorage.getItem('writingSession');
    return session ? JSON.parse(session) : null;
  }
  return null;
};

export const saveWritingSessionToLocalStorage = (session: WritingSession) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('writingSession', JSON.stringify(session));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      // Handle quota exceeded error gracefully
      alert('Could not save your session. Your browser storage might be full.');
    }
  }
};

export interface FocusModeState {
  typewriterMode: boolean;
  zenMode: boolean;
}

export const getFocusModeFromLocalStorage = (): FocusModeState | null => {
  if (typeof window !== 'undefined') {
    const focusMode = localStorage.getItem('focusMode');
    return focusMode ? JSON.parse(focusMode) : null;
  }
  return null;
};

export const saveFocusModeToLocalStorage = (focusMode: FocusModeState) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('focusMode', JSON.stringify(focusMode));
    } catch (error) {
      console.error('Error saving focus mode to localStorage:', error);
      alert('Could not save focus mode. Your browser storage might be full.');
    }
  }
};