"use client";

import React from 'react';
import Image from "next/image";
import leftBracket from "../assets/Rectangle 2710.svg";
import rightBracket from "../assets/Rectangle 2711.svg";

const Header = ({ title = "INTRO", light = false, showEnterCode = true }) => {
    return (
        <div className={`relative z-[1000] mb-3 flex h-16 w-full min-w-0 flex-row justify-between py-3 ${light ? "text-white" : ""}`}>
            <div className="flex scale-75 flex-row items-center justify-center gap-2 pt-1">
              <a href="/" className="text-lg font-bold pr-4" id="Skinstric"> SKINSTRIC</a>

              <Image alt="left-bracket" width={5} height={18} className={`h-4.5 w-1.25 ${light ? "brightness-0 invert" : ""}`} loading="eager" src={leftBracket} />
              <p id="header-title, INTRO" className={`${light ? "text-white" : "text-brand-foreground-text"} text-sm font-semibold text-opacity-70`}>{title}</p>
              <Image alt="right-bracket" width={5} height={18} className={`h-4.5 w-1.25 ${light ? "brightness-0 invert" : ""}`} loading="eager" src={rightBracket} />
            </div>
            {showEnterCode && (
              <button className="inline-flex h-9 scale-[0.8] items-center justify-center gap-2 whitespace-nowrap bg-brand-bg-Buttons px-4 py-2 text-[10px] font-semibold leading-4 text-brand-text-light shadow transition-colors hover:bg-primary/90 disabled:pointer-events-none">
                ENTER CODE
              </button>
            )}
        </div>
    );
};

export default Header;