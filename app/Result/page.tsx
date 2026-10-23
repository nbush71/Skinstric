import Header from "../../src/components/Header";
import Results from "../../src/components/Result";

export default function Home() {
  return (
    <main className="relative flex h-dvh min-h-0 flex-col overflow-hidden bg-background">
      <header className="w-full shrink-0 px-4 pt-4 sm:px-6 sm:pt-6">
        <Header />
      </header>

      <p className="shrink-0 px-4 pb-2 text-xs font-semibold sm:px-6">
        TO START ANALYSIS
      </p>

      <section className="relative min-h-0 w-full flex-1 overflow-hidden">
        <Results />
      </section>
    </main>
  );
}
