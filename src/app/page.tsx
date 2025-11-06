import WritingSpace from '@/components/WritingSpace';
import ThemeToggle from '@/components/ThemeToggle';

export default function Home() {
  return (
    <main className="w-screen h-screen overflow-hidden">
      <ThemeToggle />
      <WritingSpace />
    </main>
  );
}
