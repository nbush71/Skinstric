import Header from "../src/components/Header";
import MainHeading from "../src/components/MainHeading";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-none flex-col items-center justify-start bg-zinc-50 pt-8 dark:bg-black sm:items-start">
        <header className="w-full px-4 sm:px-16">
          <Header />
        </header>
        <MainHeading />
      </main>
    </div>
  );
}
