"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import Header from "./Header";
import takeShot from "../assets/camera_takeshot.svg";
import shutter from "../assets/shutter.svg";

const Camera = () => {
  const videoRef = useRef(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    let cameraStream;
    let cancelled = false;

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (cancelled) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        cameraStream = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setCameraReady(true);
        }
      })
      .catch((error) => {
        console.error("Error accessing camera:", error);
      });

    return () => {
      cancelled = true;
      cameraStream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const takePicture = () => {
    const video = videoRef.current;
    if (!video || !video.videoWidth) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.drawImage(video, 0, 0);
    setPhoto(canvas.toDataURL("image/jpeg"));
  };

  return (
    <div
      className={`relative h-full w-full overflow-hidden ${
        cameraReady ? "text-white" : "text-brand-text-dark"
      }`}
    >
      <header className="absolute left-0 top-0 z-30 w-full px-6 py-6">
        <Header
          title="ANALYSIS"
          light={cameraReady}
          showEnterCode={!cameraReady}
        />
      </header>
      <div className="relative h-full w-full overflow-hidden text-brand-text-dark">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="absolute inset-0 h-full w-full object-cover"
        />
        {photo && (
          <img
            src={photo}
            alt="Captured photo"
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}

        {!cameraReady && (
          <div className="result-diamond-stage absolute left-1/2 top-1/2 flex aspect-square w-[min(94vw,90dvh,720px)] -translate-x-1/2 -translate-y-1/2 items-center justify-center">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
            >
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
              </p>
            </div>
            {/* Keep your existing diamonds, shutter,
            and setting up camera text here */}
          </div>
        )}

        {/* Keep your tips section down here */}
        {!photo && (
          <section
            aria-label="Tips for better results"
            className={`absolute inset-x-4 flex flex-col items-center gap-6 text-center text-[16px] ${cameraReady ? "bottom-24 text-white sm:bottom-6" : "bottom-6 text-brand-text-dark"}`}
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
                      className={`size-2 rotate-45 border ${cameraReady ? "border-white" : "border-brand-text-dark"}`}
                    />
                    {tip}
                  </li>
                ),
              )}
            </ul>
          </section>
        )}
      </div>
      {cameraReady && (
        <>
          {!photo ? (
            <div className="absolute right-4 top-1/2 z-20 -translate-y-1/2 sm:right-8">
              <button
                type="button"
                onClick={takePicture}
                className="flex items-center gap-1 whitespace-nowrap py-2 pl-2 pr-1 text-xs font-semibold text-white sm:gap-2 sm:pl-5 sm:pr-2 sm:text-[16px]"
              >
                <span>TAKE PICTURE</span>
                <Image
                  src={takeShot}
                  alt=""
                  width={62}
                  height={62}
                  className="size-12 sm:size-[62px]"
                />
              </button>
            </div>
          ) : (
            <section
              aria-label="Photo preview actions"
              className="absolute inset-x-4 bottom-24 z-20 flex flex-col items-center gap-3 text-center"
            >
              <p className="whitespace-nowrap text-[16px] font-semibold text-white">
                Preview
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setPhoto(null)}
                  className="bg-white px-5 py-3 text-sm font-semibold text-brand-text-dark"
                >
                  Retake
                </button>
                <button
                  type="button"
                  onClick={() => {
                    sessionStorage.setItem("capturedPhoto", photo);
                    window.location.href = "/Result";
                  }}
                  className="bg-brand-bg-Buttons px-5 py-3 text-sm font-semibold text-brand-text-light"
                >
                  Use this Photo
                </button>
              </div>
            </section>
          )}

          <div className="absolute bottom-8 left-8 z-20">
            <button
              type="button"
              onClick={() => {
                if (photo) {
                  setPhoto(null);
                } else {
                  window.location.href = "/Result";
                }
              }}
              aria-label="Back"
              className="group flex items-center gap-6 whitespace-nowrap"
            >
              <div className="flex h-12 w-12 shrink-0 rotate-45 items-center justify-center border border-white transition-transform duration-300 group-hover:scale-110">
                <span className="-rotate-45 text-[9px] font-bold tracking-wide sm:hidden">
                  BACK
                </span>
                <span className="hidden -rotate-45 text-xs sm:inline">◀</span>
              </div>
              <span className="hidden text-sm font-semibold sm:inline">BACK</span>
            </button>
          </div>

          {photo && (
            <div className="absolute bottom-8 right-8 z-20">
              <button
                type="button"
                onClick={() => {
                  sessionStorage.setItem("capturedPhoto", photo);
                  window.location.href = "/Result";
                }}
                aria-label="Proceed"
                className="group flex items-center gap-6 whitespace-nowrap"
              >
                <span className="hidden text-sm font-semibold sm:inline">
                  PROCEED
                </span>
                <div className="flex h-12 w-12 shrink-0 rotate-45 items-center justify-center border border-white transition-transform duration-300 group-hover:scale-110">
                  <span className="-rotate-45 text-[9px] font-bold tracking-wide sm:hidden">
                    PROCEED
                  </span>
                  <span className="hidden -rotate-45 text-xs sm:inline">▶</span>
                </div>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Camera;
