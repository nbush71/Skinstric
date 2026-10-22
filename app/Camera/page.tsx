import Header from "@/src/components/Header";
import Camera from "../../src/components/Camera";

export default function Home() {
  return (
    <main className="relative flex h-dvh flex-col overflow-hidden bg-background">
      <header className="absolute top-0 left-0 z-30 w-full px-6 py-6 text-white">
        <Header title="ANALYSIS" />
      </header>
      <section className="relative min-h-0 flex-1 overflow-hidden">
        <Camera />
      </section>
    </main>
  );
}
