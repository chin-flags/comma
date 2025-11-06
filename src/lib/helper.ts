import { create } from 'zustand';
import { getHelperPreferencesFromLocalStorage, saveHelperPreferencesToLocalStorage } from './storage';

export interface HelperStore {
  helperVisible: boolean;
  helperMessage: string;
  helperDelay: number; // delay in milliseconds (15-30 seconds)
  showHelper: (message: string) => void;
  hideHelper: () => void;
  setMessage: (message: string) => void;
  setHelperDelay: (delay: number) => void;
}

export const useHelperStore = create<HelperStore>((set) => {
  const savedPreferences = getHelperPreferencesFromLocalStorage();

  return {
    helperVisible: false,
    helperMessage: '',
    helperDelay: savedPreferences?.helperDelay ?? 20000, // default 20 seconds

    showHelper: (message: string) => {
      set({ helperVisible: true, helperMessage: message });
    },

    hideHelper: () => {
      set({ helperVisible: false, helperMessage: '' });
    },

    setMessage: (message: string) => {
      set({ helperMessage: message });
    },

    setHelperDelay: (delay: number) => {
      set({ helperDelay: delay });
      const preferences = { helperDelay: delay };
      saveHelperPreferencesToLocalStorage(preferences);
    },
  };
});

// Context-aware message generator
export const getContextualMessage = (content: string, isReturningUser: boolean): string => {
  const messages = {
    empty: [
      "Blank pages are just very long commas",
      "Every story starts somewhere quiet",
      "The cursor is blinking. That's a good sign."
    ],
    paused: [
      "You've comma'd. Happens to writers.",
      "That sentence was almost something",
      "Pauses are part of the rhythm",
      "Still here. Still writing."
    ],
    returning: [
      "The words you left are still here",
      "Welcome back to your words",
      "Ready when you are"
    ]
  };

  // Empty page
  if (!content || content.trim().length === 0) {
    return messages.empty[Math.floor(Math.random() * messages.empty.length)];
  }

  // Returning user with existing content
  if (isReturningUser && content.trim().length > 0) {
    return messages.returning[Math.floor(Math.random() * messages.returning.length)];
  }

  // Mid-writing pause
  return messages.paused[Math.floor(Math.random() * messages.paused.length)];
};
