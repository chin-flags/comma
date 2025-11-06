'use client';

import { Inter } from "next/font/google";
import "./globals.css";
import { useThemeStore } from '@/lib/theme';
import { useEffect } from 'react';
import { getThemeFromLocalStorage, saveThemeToLocalStorage } from '@/lib/storage';
// import { metadata } from './metadata'; // metadata is automatically picked up from metadata.ts

const inter = Inter({ subsets: ["latin"] });

// export { metadata }; // No need to re-export metadata from a client component

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <ThemeWrapper>{children}</ThemeWrapper>
    </html>
  );
}

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    const storedTheme = getThemeFromLocalStorage();
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, [setTheme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    saveThemeToLocalStorage(theme);
  }, [theme]);

  return (
    <body className={inter.className}>{children}</body>
  );
}
