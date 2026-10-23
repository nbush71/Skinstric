'use client';

import { useState } from "react";

const MainHeading = () => {
  const [isDiscoverHovered, setIsDiscoverHovered] = useState(false);
  const [isDiscoverSelected, setIsDiscoverSelected] = useState(false);
  const [isTakeTestHovered, setIsTakeTestHovered] = useState(false);
  const isDiscoverActive = isDiscoverHovered || isDiscoverSelected;

  return (
    <div className="w-full h-full max-sm:origin-center max-sm:p-6 items-center justify-center bg-background">
      <div className="relative flex w-full h-full flex-col items-center justify-center">
        <div className="absolute inset-0 flex items-center justify-center xl:hidden">
          <div className="w-[85vw] h-[85vw] sm:w-96 sm:h-96 rotate-45 border border-dotted border-brand-border"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center xl:hidden">
          <div className="w-[70vw] h-[70vw] sm:w-80 sm:h-80 rotate-45 border border-dotted border-brand-border"></div>
        </div>

        {/* Main heading content */}
        <div
          id="main-heading-inner"
          className={`main-heading-reveal relative z-10 text-center transition-transform duration-500 ease-in-out ${
            isTakeTestHovered
              ? "xl:translate-x-[-18vw] xl:text-left"
              : isDiscoverActive
              ? "xl:translate-x-[18vw] xl:text-right"
              : ""
          }`}
        >
          <div className="text-[42px] sm:text-[60px] xl:text-[100px] text-brand-text-dark font-inter font-normal tracking-tighter leading-none">
            Sophisticated
            <br />
            <span
              className={`block text-[42px] sm:text-[60px] xl:text-[100px] text-brand-text-dark font-inter font-normal tracking-tighter leading-none text-center ${
                isTakeTestHovered || isDiscoverActive ? "xl:text-left" : ""
              }`}
            >
              skincare
            </span>
          </div>
        </div>
        <p className="relative z-10 mt-4 w-60 sm:w-[30ch] text-center text-sm sm:text-base font-semibold leading-relaxed text-brand-foreground-text xl:hidden">
          Skinstric developed an A.I. that creates a highly-personalized routine
          tailored to what your skin needs.
        </p>

        <div className="hidden xl:block absolute bottom-6 left-8 text-sm font-normal uppercase text-brand-text-dark">
          <p>
            Skinstric developed an A.I. that creates a
            <br />
            highly-personalized routine tailored to
            <br />
            what your skin needs.
          </p>
        </div>

        {/* Right section */}
        <div className="hidden xl:block absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64">
          {!isDiscoverActive && (
            <div className="pointer-events-none absolute -right-16 top-1/2 h-130 w-130 translate-x-1/2 -translate-y-1/2 rotate-45 border border-dotted border-brand-border"></div>
          )}

          {!isDiscoverActive && (
            <a
              href="/Testing"
              onMouseEnter={() => setIsTakeTestHovered(true)}
              onMouseLeave={() => setIsTakeTestHovered(false)}
              onClick={() => setIsTakeTestHovered(true)}
              className="absolute left-0 top-1/2 z-10 flex -translate-y-1/2 items-center gap-4 whitespace-nowrap text-sm"
            >
              <span>TAKE TEST</span>
              <span className="flex h-8 w-8 rotate-45 items-center justify-center border border-black">
                <span className="-rotate-45">▶</span>
              </span>
            </a>
          )}
        </div>
        <div className="relative z-10 mt-4 flex justify-center xl:hidden">
          <a
            href="/Testing"
            className="inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap px-3 text-xs font-bold"
          >
            <span>ENTER EXPERIENCE</span>

            <span className="flex h-5 w-5 shrink-0 rotate-45 items-center justify-center border border-black">
              <span className="-rotate-45 text-[9px] leading-none">▶</span>
            </span>
          </a>
        </div>
        {/* Left section */}
        <div
          id="left-section"
          className="hidden xl:block absolute left-0 top-1/2 -translate-y-1/2 w-64 h-64"
        >
          <div className="relative w-full h-full">
            {!isTakeTestHovered && (
              <>
                <div className="pointer-events-none absolute -left-16 top-1/2 h-130 w-130 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-dotted border-brand-border"></div>
                <button
                  id="discover-button"
                  aria-pressed={isDiscoverSelected}
                  onMouseEnter={() => setIsDiscoverHovered(true)}
                  onMouseLeave={() => setIsDiscoverHovered(false)}
                  onClick={() => setIsDiscoverSelected((selected) => !selected)}
                  className="group inline-flex items-center justify-center gap-4 whitespace-nowrap rounded-md text-sm font-normal text-brand-text-dark transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer disabled:opacity-50 h-9 absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/5 xl:translate-x-1/6 [@media(width&gt;=1920px)]:translate-x-1/20 px-3 py-1"
                >
                  <div className="w-7.5 h-7.5 border border-solid border-black rotate-45 cursor-pointer group-hover:scale-110 duration-300"></div>
                  <span className="absolute left-4.5 top-2 scale-[0.9] rotate-180 group-hover:scale-105 duration-300">
                    ▶
                  </span>
                  <span>DISCOVER A.I.</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainHeading;
