export const countWords = (text: string): number => {
  if (!text) {
    return 0;
  }
  // Trim whitespace from the beginning and end of the string
  const trimmedText = text.trim();
  // Split the string by one or more whitespace characters
  const words = trimmedText.split(/\s+/);
  // Filter out any empty strings that might result from multiple spaces
  return words.filter((word) => word.length > 0).length;
};

export const formatTime = (seconds: number): string => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  const hDisplay = h > 0 ? h + ":" : "";
  const mDisplay = m < 10 ? "0" + m : m;
  const sDisplay = s < 10 ? "0" + s : s;

  return `${hDisplay}${mDisplay}:${sDisplay}`;
};
