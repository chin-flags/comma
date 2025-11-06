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