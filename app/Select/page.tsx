import Header from "../../src/components/Header";
import Select from "../../src/components/Select";

export default function SelectPage() {
  return (
    <main className="relative h-[calc(100dvh-100px)] overflow-hidden bg-background">
      <header className="w-full shrink-0 px-4 py-6 sm:px-6">
        <Header />
      </header>
      <div className="px-12">
        <p className="pb-2 text-lg font-semibold">A.I. ANALYSIS</p>
        <Select />
      </div>
    </main>
  );
}
