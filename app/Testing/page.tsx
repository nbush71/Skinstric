import Header from "../src/components/Header";
import Testing from "../src/components/Testing";
import "../app/globals.css";

export default function Home() {
  return (
    <main className="flex h-dvh flex-col bg-zinc-50">
      <header className="w-full shrink-0 px-4 py-6 sm:px-16">
        <Header />
      </header>

      <section className="w-full min-h-0 flex-1 overflow-x-hidden">
        <Testing />
      </section>
    </main>
  );
}
