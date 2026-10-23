"use client";

import { useState } from "react";

const DIAMOND_STYLES = {
  demographics: "h-[112%] w-[112%] border-gray-300",
  cosmetic: "h-[128%] w-[128%] border-gray-200",
  skin: "h-[128%] w-[128%] border-gray-200",
  weather: "h-[148%] w-[148%] border-gray-400",
};

const HoverDiamond = ({ activeTile }) => (
  <span
    aria-hidden="true"
    className={`pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 border-[3px] border-dotted bg-transparent transition-[height,width,transform,opacity,border-color] duration-700 ease-in-out ${
      activeTile
        ? `${DIAMOND_STYLES[activeTile]} rotate-[135deg] opacity-100`
        : "h-[100%] w-[100%] rotate-45 scale-[0.82] opacity-0"
    }`}
  />
);

const Select = () => {
  const [activeTile, setActiveTile] = useState(null);

  return (
    <>
      <div className="fixed bottom-[15vh] left-8 z-20 md:bottom-8">
        <a href="/Result" aria-label="Back to image analysis" className="group flex items-center gap-6">
          <div className="flex h-12 w-12 rotate-45 items-center justify-center border border-[#1A1B1C] transition-transform duration-300 group-hover:scale-110">
            <span className="-rotate-45 text-[9px] font-bold tracking-wide md:hidden">
              BACK
            </span>
            <span className="hidden -rotate-45 text-xs md:inline">◀</span>
          </div>
          <span className="hidden text-sm font-semibold md:inline">BACK</span>
        </a>
      </div>
      <div className="fixed bottom-[15vh] right-8 z-20 md:bottom-8">
        <a href="/Summary" aria-label="Get summary" className="group flex items-center gap-6">
          <span className="hidden text-sm font-semibold md:inline">GET SUMMARY</span>
          <div className="flex h-12 w-12 rotate-45 items-center justify-center border border-[#1A1B1C] transition-transform duration-300 group-hover:scale-110">
            <span className="-rotate-45 text-[9px] font-bold tracking-wide md:hidden">
              SUM
            </span>
            <span className="hidden -rotate-45 text-xs md:inline">▶</span>
          </div>
        </a>
      </div>

      <div className="flex flex-wrap items-center gap-x-1 text-[16px] font-medium uppercase">
        A.I. has estimated the following. <br /> Fix estimated information if
        needed.
      </div>

      <div className="flex h-[68.3vh] items-center justify-center bg-background">
        <div className="relative grid aspect-square w-[72vw] max-w-[342px] -translate-y-6 grid-cols-3 grid-rows-3 place-items-center md:translate-y-0">
          <HoverDiamond activeTile={activeTile} />
          <div
            className="relative z-10 col-start-2 row-start-1 flex items-center justify-center"
            onPointerEnter={() => setActiveTile("demographics")}
            onPointerLeave={() => setActiveTile(null)}
            onFocus={() => setActiveTile("demographics")}
            onBlur={() => setActiveTile(null)}
          >
            <a
              href="/Summary"
              className="relative z-10 flex h-[32vw] w-[32vw] max-h-[154px] max-w-[154px] rotate-45 items-center justify-center bg-gray-200 transition-colors duration-300 ease-in-out hover:bg-gray-300"
            >
              <span className="-rotate-45 text-center font-semibold uppercase">
                Demographics
              </span>
            </a>
          </div>

          <div
            className="relative z-10 col-start-1 row-start-2 flex items-center justify-center"
            onPointerEnter={() => setActiveTile("cosmetic")}
            onPointerLeave={() => setActiveTile(null)}
          >
            <button
              type="button"
              disabled
              aria-label="Cosmetic concerns, unavailable"
              className="relative z-10 flex h-[32vw] w-[32vw] max-h-[154px] max-w-[154px] rotate-45 cursor-not-allowed items-center justify-center bg-gray-100"
            >
              <span className="-rotate-45 text-center font-semibold uppercase">
                Cosmetic
                <br />
                Concerns
              </span>
            </button>
          </div>

          <div
            className="relative z-10 col-start-3 row-start-2 flex items-center justify-center"
            onPointerEnter={() => setActiveTile("skin")}
            onPointerLeave={() => setActiveTile(null)}
          >
            <button
              type="button"
              disabled
              aria-label="Skin type details, unavailable"
              className="relative z-10 flex h-[32vw] w-[32vw] max-h-[154px] max-w-[154px] rotate-45 cursor-not-allowed items-center justify-center bg-gray-100"
            >
              <span className="-rotate-45 text-center font-semibold uppercase">
                Skin Type Details
              </span>
            </button>
          </div>

          <div
            className="relative z-10 col-start-2 row-start-3 flex items-center justify-center"
            onPointerEnter={() => setActiveTile("weather")}
            onPointerLeave={() => setActiveTile(null)}
          >
            <button
              type="button"
              disabled
              aria-label="Weather, unavailable"
              className="relative z-10 flex h-[32vw] w-[32vw] max-h-[154px] max-w-[154px] rotate-45 cursor-not-allowed items-center justify-center bg-gray-100"
            >
              <span className="-rotate-45 text-center font-semibold uppercase">
                Weather
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Select;
