"use client";

import { useState, useEffect } from "react";

const Summary = () => {
  const [confirmedRace, setConfirmedRace] = useState(null);
  const [confirmedPicks, setConfirmedPicks] = useState({});
  const [analysisData, setAnalysisData] = useState(null);
  const [category, setCategory] = useState("race");

  const [picks, setPicks] = useState({});

  useEffect(() => {
    const savedData = localStorage.getItem("demographicData");

    if (savedData) {
      setAnalysisData(JSON.parse(savedData));
    }
  }, []);

  const raceConfidences = Object.entries(analysisData?.[category] ?? {})
    .map(([race, probability]) => ({
      race,
      confidence: Math.round(probability * 100),
    }))
    .sort((a, b) => b.confidence - a.confidence);

  const activeRace = picks[category] ?? raceConfidences[0];

  const topOf = (key) =>
    Object.entries(analysisData?.[key] ?? {}).sort(
      (a, b) => b[1] - a[1],
    )[0]?.[0];

  return (
    <>
      <div className="mb-4 text-start md:mb-6">
        <div className="text-[clamp(2.5rem,10vw,4.5rem)] font-medium uppercase leading-none">
          Demographics
        </div>
        <div className="text-sm font-medium uppercase">
          Predicted Age & Race
        </div>
      </div>
      {/** Race section */}
      <div className="mt-4 mb-6 grid grid-cols-1 gap-3 md:grid-cols-[85px_minmax(0,1fr)_minmax(150px,0.38fr)] md:gap-4">
        <div className="grid grid-cols-3 gap-2 md:flex md:flex-col md:gap-3">
          <button
            className="flex min-h-20 cursor-pointer flex-col justify-between bg-brand-bg-dark p-2 text-white hover:bg-black sm:p-3 md:min-h-24"
            onClick={() => setCategory("race")}
          >
            <p className="text-base font-semibold">
              {picks.race?.race ?? topOf("race")}
            </p>
            <div className="text-sm font-medium uppercase md:text-base">
              Race
            </div>
          </button>

          {/** Age section */}
          <button
            className="flex min-h-20 cursor-pointer flex-col justify-between border-t bg-brand-bg-light p-2 text-brand-text-dark sm:p-3 md:min-h-24"
            onClick={() => setCategory("age")}
          >
            <p className="text-base font-semibold">
              {picks.age?.race ?? topOf("age")}
            </p>
            <div className="text-sm font-medium uppercase md:text-base">
              Age
            </div>
          </button>

          {/** Gender section */}
          <button
            className="flex min-h-20 cursor-pointer flex-col justify-between border-t bg-brand-bg-light p-2 text-brand-text-dark sm:p-3 md:min-h-24"
            onClick={() => setCategory("gender")}
          >
            <p className="text-base font-semibold uppercase">
              {picks.gender?.race ?? topOf("gender")}
            </p>
            <div className="text-sm font-medium uppercase md:text-base">
              Sex
            </div>
          </button>
        </div>

        {/** Confidence section */}
        <section className="relative h-[clamp(280px,45dvh,600px)] min-h-[280px] bg-gray-100 p-4 md:h-[clamp(320px,55dvh,620px)]">
          <p className="text-3xl text-brand-text-dark md:text-[40px]">
            {activeRace?.race}
          </p>
          <div
            role="img"
            aria-label={`${activeRace?.race} confidence: ${activeRace?.confidence} percent`}
            className="absolute inset-x-4 bottom-4 top-20 grid place-items-center"
          >
            <div
              className="relative aspect-square w-full max-w-96 rounded-full p-[6px]"
              style={{
                background: `conic-gradient(#1a1b1c 0 ${activeRace?.confidence}%, #d6d6d6 ${activeRace?.confidence}% 100%)`,
              }}
            >
              <div className="grid h-full w-full place-items-center rounded-full bg-gray-100 text-[40px] text-brand-text-dark">
                {activeRace?.confidence}%
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-100 md:h-[clamp(320px,55dvh,620px)] md:overflow-y-auto">
          <div className="flex min-h-14 items-center justify-center border-y border-brand-border px-2 text-center text-sm font-medium uppercase">
            {category} A.I. Confidence
          </div>
          <ul>
            {raceConfidences.map((race) => {
              const isSelected = activeRace?.race === race.race;

              return (
                <li key={race.race}>
                  <button
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => {
                      setPicks({ ...picks, [category]: race });
                      setConfirmedPicks((prev) => ({
                        ...prev,
                        [category]: undefined,
                      }));
                    }}
                    className={`flex min-h-10 w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-border ${
                      isSelected
                        ? "bg-brand-bg-dark text-white"
                        : "text-brand-text-dark hover:bg-brand-bg-dark2"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`relative size-2 shrink-0 rotate-45 border ${
                        isSelected ? "border-white" : "border-brand-text-dark"
                      }`}
                    >
                      {isSelected && (
                        <span className="absolute inset-[2px] rotate-45 bg-white" />
                      )}
                    </span>
                    <span className="min-w-0 flex-1">{race.race}</span>
                    <span>{race.confidence}%</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      <footer className="fixed inset-x-0 bottom-0 z-20 grid grid-cols-2 items-center gap-2 bg-background px-4 py-3 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:px-6 md:static md:mt-6 md:mb-4 md:px-8">
        <a
          href="/Select"
          aria-label="Back to analysis selection"
          className="group flex items-center gap-2 md:gap-6"
        >
          <span className="flex size-10 rotate-45 items-center justify-center border border-[#1A1B1C] transition-transform duration-300 group-hover:scale-110 md:size-12">
            <span
              aria-hidden="true"
              className="-rotate-45 text-[9px] font-semibold sm:hidden"
            >
              BACK
            </span>
            <span
              aria-hidden="true"
              className="hidden -rotate-45 text-xs sm:inline"
            >
              ◀
            </span>
          </span>
          <span className="hidden text-sm font-semibold sm:inline">BACK</span>
        </a>

        <p className="hidden text-center text-brand-input-text sm:block sm:text-xs md:text-sm">
          If A.I. estimate is wrong, select the correct one.
        </p>

        <div className="col-span-2 flex items-center justify-end gap-2 sm:col-span-1">
          <button
            type="button"
            onClick={() => {
              setPicks({});
              setConfirmedPicks({});
            }}
            className="border border-brand-text-dark px-4 py-2 text-xs font-semibold text-brand-text-dark transition-colors hover:bg-brand-bg-light sm:text-sm"
          >
            RESET
          </button>
          <button
            type="button"
            aria-pressed={confirmedPicks[category] === activeRace?.race}
            onClick={() => {
              if (!activeRace) return;

              setPicks((prev) => ({
                ...prev,
                [category]: activeRace,
              }));

              setConfirmedPicks((prev) => ({
                ...prev,
                [category]: activeRace.race,
              }));
            }}
            className="bg-brand-bg-dark px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-black sm:text-sm"
          >
            {confirmedPicks[category] === activeRace?.race
              ? "CONFIRMED"
              : "CONFIRM"}
          </button>
        </div>
      </footer>
    </>
  );
};

export default Summary;
