const MainHeading = () => {
  return (
    <div className="w-full max-sm:scale-[0.75] max-sm:origin-center max-sm:p-6 items-center justify-center bg-zinc-50 dark:bg-black">
      <div className="relative flex w-full flex-col items-center justify-center h-[71dvh] md:h-[calc(100dvh-7rem)]">
        <div className="absolute inset-0 flex items-center justify-center ">
          <div className="w-105 h-105 border border-dotted border-brand-border rotate-45 absolute top-1/2 left-1/2 translate-x-[-52%] -translate-y-1/2"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center lg:hidden">
          <div className="w-105 h-105 border border-dotted border-brand-border rotate-45 absolute top-1/2 left-1/2 translate-x-[-52%] -translate-y-1/2"></div>
        </div>

        {/* Main heading content */}
        <div id="main-heading-inner" className="relative z-10 text-center">
          <div className="text-[60px] text-brand-text-dark lg:text-[100px] font-inter font-normal tracking-tighter leading-none opacity-0">
            Sophisticated
            <br />
            <span className="text-[60px] text-brand-text-dark lg:text-[100px] font-inter font-normal tracking-tighter leading-none opacity-0">
              Skincare
            </span>
          </div>
        </div>
        <p className="z-10 block lg:hidden w-[30ch] mt-4 text-[16px] font-semibold text-center text-muted-foreground  text-brand-foreground-text">
          Skinstric developed an A.I. that creates a highly-personalized routine
          tailored to what your skin needs.
        </p>
        <div className="z-10 mt-4 lg:hidden">
          <a href="/testing">
            <button className="relative flex items-center gap-4 hover:scale-105 duration-300">
              <span className="text-[12px] font-bold cursor-pointer">
                ENTER EXPERIENCE
              </span>
              <div className="w-6 h-6 border border-solid border-black rotate-45 cursor-pointer"></div>
              <span className="absolute left-32.25 scale-[0.5] hover:scale-60 duration-300">
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="fill-current text-black"
                >
                  <path d="M8 5v14l11-7z"></path>
                </svg>
              </span>
            </button>
          </a>
        </div>
        <div className="hidden lg:block fixed bottom-[calc(-7vh)] left-[calc(-20vw)] xl:left-[calc(-27vw)] 2xl:left-[calc(-31vw)] [@media(width&gt;=1920px)]:left-[calc(-33vw)] font-normal text-sm text-[#1A1B1C] space-y-3 uppercase">
          <p>
            Skinstric developed an A.I. that creates a
            <br />
            highly-personalized routine tailored to
            <br />
            what your skin needs.
          </p>
        </div>
        <div
          id="left-section"
          className="hidden lg:block fixed left-[calc(-53vw)] xl:left-[calc(-50vw)] top-1/2 -translate-y-1/2 w-125 h-125 transition-opacity duration-500 ease-in-out opacity-100"
        >
          <div className="relative w-full h-full">
            <div className="w-full h-full border border-dotted border-brand-border rotate-45 fixed inset-0"></div>
            <button
              id="discover-button"
              className="group inline-flex items-center justify-center gap-4 whitespace-nowrap rounded-md text-sm font-normal text-brand-text-dark transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer disabled:opacity-50 h-9 absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/5 xl:translate-x-1/6 [@media(width&gt;=1920px)]:translate-x-1/20 px-3 py-1"
            >
              <div className="w-7.5 h-7.5 border border-solid border-black rotate-45 cursor-pointer group-hover:scale-110 duration-300"></div>
              <span className="absolute left-4.5 top-2 scale-[0.9] rotate-180 group-hover:scale-105 duration-300">
                ▶
              </span>
              <span>DISCOVER A.I.</span>
            </button>
          </div>
        {/* </div>
        <next-route-announcer style="position: absolute;"></next-route-announcer> */}
        </div>
      </div>
    </div>
  );
};

export default MainHeading;
