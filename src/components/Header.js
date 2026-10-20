"use client";

import React from 'react';
import Image from "next/image";
import leftBracket from "../assets/Rectangle 2710.svg";
import rightBracket from "../assets/Rectangle 2711.svg";

const Header = () => {
    return (
        <div className="flex flex-row h-16 w-full min-w-0 justify-between py-3 mb-3 relative z-1000">
            <div className="flex flex-row pt-1 scale-75 justify-center gap-2 items-center">
              <a href="/" className="text-lg font-bold pr-4"> SKINSTRIC</a>

              <Image alt="left-bracket" width={5} height={18} className="h-4.5 w-1.25"  loading="eager" src={leftBracket} />
              <p className="text-brand-foreground-text text-opacity-70 font-semibold text-sm ">INTRO</p>
              <Image alt="right-bracket" width={5} height={18} className="h-4.5 w-1.25"  loading="eager" src={rightBracket} />
            </div>
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold  transition-colors  disabled:pointer-events-none text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 scale-[0.8] text-brand-text-light text-[10px] bg-brand-bg-Buttons leading-4 "> ENTER CODE </button>
        </div>
    );
};

export default Header;