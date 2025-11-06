import { create } from 'zustand';
import { getFocusModeFromLocalStorage, saveFocusModeToLocalStorage } from './storage';

interface FocusModeStore {
  typewriterMode: boolean;
  zenMode: boolean;
  toggleTypewriter: () => void;
  toggleZen: () => void;
  setTypewriterMode: (enabled: boolean) => void;
  setZenMode: (enabled: boolean) => void;
}

export const useFocusModeStore = create<FocusModeStore>((set, get) => ({
  typewriterMode: getFocusModeFromLocalStorage()?.typewriterMode ?? false,
  zenMode: getFocusModeFromLocalStorage()?.zenMode ?? false,

  toggleTypewriter: () => {
    set((state) => {
      const newTypewriterMode = !state.typewriterMode;
      const newState = { ...state, typewriterMode: newTypewriterMode };
      saveFocusModeToLocalStorage(newState);
      return newState;
    });
  },

  toggleZen: () => {
    set((state) => {
      const newZenMode = !state.zenMode;
      const newState = { ...state, zenMode: newZenMode };
      saveFocusModeToLocalStorage(newState);
      return newState;
    });
  },

  setTypewriterMode: (enabled: boolean) => {
    set((state) => {
      const newState = { ...state, typewriterMode: enabled };
      saveFocusModeToLocalStorage(newState);
      return newState;
    });
  },

  setZenMode: (enabled: boolean) => {
    set((state) => {
      const newState = { ...state, zenMode: enabled };
      saveFocusModeToLocalStorage(newState);
      return newState;
    });
  },
}));
