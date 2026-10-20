'use client';

import React, { useEffect, useState } from "react";

const Testing = () => {
  const [step, setStep] = useState("name");

  useEffect(() => {
    if (step !== "processing") {
      return;
    }

    const timeoutId = window.setTimeout(() => setStep("complete"), 1000);
    return () => window.clearTimeout(timeoutId);
  }, [step]);

  const handleNameSubmit = (event) => {
    event.preventDefault();
    setStep("city");
  };

  const handleCitySubmit = (event) => {
    event.preventDefault();
    setStep("processing");
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      {/* Top heading */}
      <div className="absolute top-2 left-12 z-20">
        <p className="text-xs font-semibold">TO START ANALYSIS</p>
      </div>

      {/* Center content */}
      <div className="relative flex items-center justify-center translate-y-60">
        {/* Rotating diamonds */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
        >
          <div className="relative w-[620px] h-[620px]">
            <div className="diamond diamond-outer" />
            <div className="diamond diamond-middle" />
            <div className="diamond diamond-inner" />
          </div>
        </div>

        {/* Input form */}
        <div className="relative z-10 flex flex-col items-center px-4">
          {step === "name" && (
            <>
              <p className="text-sm text-gray-400 tracking-wider uppercase mb-1">
                CLICK TO TYPE
              </p>
              <form
                className="flex flex-col items-center justify-center"
                onSubmit={handleNameSubmit}
              >
                <input
                  type="text"
                  required
                  autoFocus
                  className="border-b border-brand-input-text p-2 w-[80vw] max-w-[480px] placeholder:text-brand-input-text bg-transparent text-center text-[clamp(28px,5vw,50px)] outline-none"
                  placeholder="Introduce Yourself"
                  aria-label="Introduce Yourself"
                />
                <button type="submit" className="sr-only">
                  Continue
                </button>
              </form>
            </>
          )}

          {step === "city" && (
            <>
              <p className="text-sm text-gray-400 tracking-wider uppercase mb-1">
                WHERE ARE YOU FROM?
              </p>
              <form
                className="flex flex-col items-center justify-center"
                onSubmit={handleCitySubmit}
              >
                <input
                  type="text"
                  required
                  autoFocus
                  className="border-b border-brand-input-text p-2 w-[80vw] max-w-[480px] placeholder:text-brand-input-text bg-transparent text-center text-[clamp(28px,5vw,50px)] outline-none"
                  placeholder="Your City Name"
                  aria-label="Your City Name"
                />
                <button type="submit" className="sr-only">
                  Submit
                </button>
              </form>
            </>
          )}

          {step === "processing" && (
            <p role="status" aria-live="polite" className="text-xl text-brand-text-dark">
              Processing submission
            </p>
          )}

          {step === "complete" && (
            <p role="status" aria-live="polite" className="text-xl text-brand-text-dark justify-center text-center">
              Thank You! <br /> <span className="text-brand-input-text">Proceed to the next step</span>
            </p>
          )}
        </div>
      </div>

      {/* Back button */}
      <div className="fixed bottom-8 left-8 z-20">
        <a href="/" aria-label="Back" className="group flex items-center gap-6">
          <div className="w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 transition-transform duration-300 group-hover:scale-110">
            <span className="-rotate-45 text-xs">◀</span>
          </div>

          <span className="text-sm font-semibold">BACK</span>
        </a>
      </div>

      {step === "complete" && (
        <div className="fixed bottom-8 right-8 z-20">
          <button
            type="button"
            aria-label="Proceed"
            className="group flex items-center gap-6"
          >
            <span className="text-sm font-semibold">PROCEED</span>

            <div className="w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 transition-transform duration-300 group-hover:scale-110">
              <span className="-rotate-45 text-xs">▶</span>
            </div>
          </button>
        </div>
      )}
    </main>
  );
};

export default Testing;
