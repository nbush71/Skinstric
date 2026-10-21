import Header from "../../src/components/Header";
import Summary from "../../src/components/Summary";

export default function SummaryPage() {
  return (
    <main className="relative min-h-dvh bg-background pb-20 md:pb-0">
      <header className="w-full shrink-0 px-4 py-3 sm:px-6">
        <Header />
      </header>
      <div className="px-4 sm:px-6 md:px-12">
        <p className="pb-2 text-lg font-semibold">A.I. ANALYSIS</p>
        <Summary />
      </div>
    </main>
  );
}
