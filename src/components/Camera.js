"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import shutter from "../assets/shutter.svg";


const Camera = () => {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);

useEffect(() => {
  
  navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
      setStream(stream);

      const videoElement = document.querySelector("video");
      if (videoElement) {
        videoElement.srcObject = stream;
      }

      videoRef.current = null;
      videoRef.current.srcObject = stream;
      navigator.mediaDevices.getUserMedia({ video: true });
      toDataURL();
      // Handle the camera stream here
    })
    .catch((error) => {
      console.error("Error accessing camera:", error);
    });
  }, []);
  
  return (
    <div className="relative h-full w-full overflow-hidden text-brand-text-dark">
      <div className="result-diamond-stage absolute left-1/2 top-1/2 flex aspect-square w-[min(94vw,90dvh,720px)] -translate-x-1/2 -translate-y-1/2 items-center justify-center">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="diamond diamond-outer" />
          <div className="diamond diamond-middle" />
          <div className="diamond diamond-inner" />
        </div>
        <div className="relative z-10 flex translate-y-6 flex-col items-center gap-7">
          <div
            role="img"
            aria-label="Camera shutter"
            className="flex size-[156px] items-center justify-center rounded-full border-2 border-brand-text-dark p-2"
          >
            <Image
              src={shutter}
              alt=""
              loading="eager"
              className="size-[138px] rounded-full border-4 bg-brand-bg-Buttons"
            />
          </div>
          <p className="text-center text-[16px] font-semibold uppercase">
            Setting up camera ...
            <video ref={videoRef} autoPlay playsInline muted />
          </p>
        </div>
      </div>

      <section
        aria-label="Tips for better results"
        className="absolute inset-x-4 bottom-6 flex flex-col items-center gap-6 text-center text-[16px] text-brand-text-dark"
      >
        <p className="font-medium uppercase">
          To get better results make sure to have
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {["Neutral expression", "Frontal pose", "Adequate lighting"].map(
            (tip) => (
              <li key={tip} className="flex items-center gap-2 uppercase">
                <span
                  aria-hidden="true"
                  className="size-2 rotate-45 border border-brand-text-dark"
                />
                {tip}
              </li>
            ),
          )}
        </ul>
      </section>
    </div>
  );
};

export default Camera;
