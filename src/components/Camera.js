"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import shutter from "../assets/shutter.svg";

const Camera = () => {
  const videoRef = useRef(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [stream, setStream] = useState(null);

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
      <div className="relative h-full w-full overflow-hidden text-brand-text-dark">
        {photo ? (
          <img
            src={photo}
            alt="Captured photo"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
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
        <section
          aria-label="Tips for better results"
          className={`absolute inset-x-4 bottom-6 flex flex-col items-center gap-6 text-center text-[16px] ${cameraReady ? "text-white" : "text-brand-text-dark"}`}
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
      </div>
      {cameraReady && (
        <>
          <div className="absolute right-8 top-1/2 z-20 -translate-y-1/2">
            {!photo ? (
              <button onClick={takePicture}>TAKE PICTURE ◎</button>
            ) : (
              <p>GREAT SHOT!</p>
            )}
          </div>

          <div className="absolute bottom-8 left-8 z-20">
            <button
              onClick={() => {
                if (photo) {
                  setPhoto(null);
                } else {
                  window.location.href = "/Result";
                }
              }}
            >
              ◇ BACK
            </button>
          </div>

          {photo && (
            <div className="absolute bottom-8 right-8 z-20">
              <button
                onClick={() => {
                  if (!photo) return;

                  sessionStorage.setItem("capturedPhoto", photo);
                  window.location.href = "/Result";
                }}
              >
                PROCEED ◇
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Camera;
