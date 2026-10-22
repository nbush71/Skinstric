import Camera from "../../src/components/Camera";

export default function Home() {
  return (
    <main className="relative flex h-dvh flex-col overflow-hidden bg-background">
      <section className="relative min-h-0 flex-1 overflow-hidden">
        <Camera />
      </section>
    </main>
  );
}
