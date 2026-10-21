import Header from "../../src/components/Header";
import Testing from "../../src/components/Testing";

export default function Home() {
  return (
    <main className="relative h-[calc(100dvh-100px)] overflow-hidden bg-background">
      <header className="w-full shrink-0 px-4 py-6 sm:px-6">
        <Header />
      </header>

      <p className="px-12 pb-2 text-xs font-semibold">TO START ANALYSIS</p>

      <section className="w-full min-h-0 flex-1 overflow-x-hidden">
        <Testing />
      </section>
    </main>
  );
}
