
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import gallery from "../assets/gallery.svg";
import scanCallout from "../assets/Group 39690.svg";
import shutter from "../assets/shutter.svg";

const ANALYSIS_ENDPOINT =
  "https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseTwo";

const isDistribution = (value) =>
  value !== null &&
  typeof value === "object" &&
  !Array.isArray(value) &&
  Object.keys(value).length > 0 &&
  Object.values(value).every(
    (probability) =>
      typeof probability === "number" &&
      Number.isFinite(probability) &&
      probability >= 0 &&
      probability <= 1,
  );

const Result = () => {
  const router = useRouter();
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [actualAttributes, setActualAttributes] = useState({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showAnalysisSuccess, setShowAnalysisSuccess] = useState(false);
  const [permissionPrompt, setPermissionPrompt] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!showAnalysisSuccess) {
      return;
    }

    const timeoutId = window.setTimeout(() => router.push("/Select"), 1800);
    return () => window.clearTimeout(timeoutId);
  }, [router, showAnalysisSuccess]);

  const handleImageChange = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please choose a valid image.");
      return;
    }

    setIsAnalyzing(true);
    setErrorMessage("");
    setAnalysis(null);
    setShowAnalysisSuccess(false);

    try {
      const dataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error("Unable to read the selected image."));
        reader.readAsDataURL(file);
      });

      if (typeof dataUrl !== "string") {
        throw new Error("Unable to read the selected image.");
      }

      const separatorIndex = dataUrl.indexOf(",");
      const base64Image = dataUrl.slice(separatorIndex + 1);
      if (separatorIndex < 0 || !base64Image) {
        throw new Error("The selected image could not be prepared for analysis.");
      }

      setImage(base64Image);
      setImagePreview(dataUrl);
      setActualAttributes({});
      await handleAnalyze(base64Image);
    } catch (error) {
      setIsAnalyzing(false);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to read the selected image.",
      );
    }
  };

  const handleAnalyze = async (imageToAnalyze = image) => {
    if (!imageToAnalyze || isAnalyzing) {
      return;
    }

    setIsAnalyzing(true);
    setErrorMessage("");

    try {
      const response = await fetch(ANALYSIS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: imageToAnalyze }),
      });

      let result;
      try {
        result = await response.json();
      } catch {
        throw new Error("The server returned an invalid response.");
      }

      if (!response.ok) {
        throw new Error(
          typeof result?.message === "string"
            ? result.message
            : `Analysis failed with status ${response.status}.`,
        );
      }

      const data = result?.data;
      if (
        typeof result?.message !== "string" ||
        !isDistribution(data?.race) ||
        !isDistribution(data?.age) ||
        !isDistribution(data?.gender)
      ) {
        throw new Error("The server response did not include valid analysis results.");
      }
      
      localStorage.setItem("demographicData", JSON.stringify(data));

      setAnalysis({ message: result.message, data });
      setShowAnalysisSuccess(true);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to analyze the image. Please try again.",
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  useEffect(() => {
    const savedPhoto = sessionStorage.getItem("capturedPhoto");
    if (!savedPhoto) return;

    sessionStorage.removeItem("capturedPhoto");

    const base64Image = savedPhoto.split(",")[1];
    if (!base64Image) return;

    setImage(base64Image);
    setImagePreview(savedPhoto);
    handleAnalyze(base64Image);
  }, []);

  const renderDistribution = (title, distribution) => (
    <section
      key={title}
      className="border border-gray-300 bg-white/70 p-4"
      aria-label={`${title} analysis`}
    >
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide">{title}</h2>
      <ul className="space-y-2">
        {Object.entries(distribution)
          .sort(([, first], [, second]) => second - first)
          .map(([label, probability]) => (
            <li key={label}>
              <button
                type="button"
                aria-pressed={actualAttributes[title] === label}
                onClick={() =>
                  setActualAttributes((current) => ({
                    ...current,
                    [title]: label,
                  }))
                }
                className={`flex w-full items-center justify-between gap-4 p-2 text-left text-sm ${
                  actualAttributes[title] === label
                    ? "bg-brand-bg-Buttons text-brand-text-light"
                    : "hover:bg-gray-100"
                }`}
              >
                <span className="capitalize">{label}</span>
                <span className="flex items-center gap-3">
                  {actualAttributes[title] === label && (
                    <span className="text-[10px] font-semibold uppercase tracking-wide">
                      Your actual
                    </span>
                  )}
                  <span className="font-semibold">{(probability * 100).toFixed(2)}%</span>
                </span>
              </button>
            </li>
          ))}
      </ul>
    </section>
  );

  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <div className="fixed bottom-8 left-8 z-20">
        <a href="/Testing" aria-label="Back" className="group flex items-center gap-6">
          <div className="flex h-12 w-12 rotate-45 items-center justify-center border border-[#1A1B1C] transition-transform duration-300 group-hover:scale-110">
            <span className="-rotate-45 text-[9px] font-bold tracking-wide md:hidden">BACK</span>
            <span className="hidden -rotate-45 text-xs md:inline">◀</span>
          </div>
          <span className="hidden text-sm font-semibold md:inline">BACK</span>
        </a>
      </div>
      <div className="fixed hidden bottom-8 right-8 z-20">
        <a href="/Select" aria-label="Proceed" className="group flex items-center gap-6">
          <span className="text-sm font-semibold">PROCEED</span>
          <div className="flex h-12 w-12 rotate-45 items-center justify-center border border-[#1A1B1C] transition-transform duration-300 group-hover:scale-110">
            <span className="-rotate-45 text-xs">▶</span>
          </div>
        </a>
      </div>

      <input
        id="camera-image"
        className="hidden"
        type="file"
        accept="image/*"
        capture="user"
        onChange={handleImageChange}
      />
      <input
        id="gallery-image"
        className="hidden"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />

      {permissionPrompt && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 px-4"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setPermissionPrompt(null);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="permission-prompt-title"
            className="w-full max-w-[350px] border border-white/20 bg-[#1A1B1C] opacity-95 text-white shadow-2xl"
          >
            <div className="relative flex min-h-[87px] items-center px-4 py-5">
              <p
                id="permission-prompt-title"
                className="pr-10 text-sm font-semibold uppercase tracking-wide"
              >
                {permissionPrompt === "camera"
                  ? "Allow A.I. to access your camera"
                  : "Allow A.I. to access your gallery"}
              </p>
            </div>
            <div className="flex h-10 justify-end border-t border-white/40">
              <button
                type="button"
                onClick={() => setPermissionPrompt(null)}
                className="px-5 text-xs font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                DENY
              </button>
              <button
                type="button"
                onClick={() => {
                  if (permissionPrompt === "camera") {
                    setPermissionPrompt(null);
                    router.push("/Camera");
                    return;
                  }

                  setPermissionPrompt(null);
                  document.getElementById("gallery-image")?.click();
                }}
                className="px-5 text-xs font-semibold transition-colors hover:bg-white/10"
              >
                ALLOW
              </button>
            </div>
          </div>
        </div>
      )}

      {isAnalyzing ? (
        <section
          aria-label="Preparing analysis"
          aria-live="polite"
          className="absolute inset-0 z-10 flex items-center justify-center bg-background"
        >
          <div className="result-diamond-stage relative flex h-[min(76vw,64dvh,460px)] w-[min(76vw,64dvh,460px)] items-center justify-center">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <div className="diamond diamond-outer" />
              <div className="diamond diamond-middle" />
              <div className="diamond diamond-inner" />
            </div>
            <p className="relative z-10 px-4 text-center text-sm font-semibold tracking-wide">
              PREPARING YOUR ANALYSIS
            </p>
          </div>
        </section>
      ) : analysis ? (
        <section className="absolute inset-x-4 top-20 bottom-24 z-10 overflow-y-auto bg-background px-4 py-3 md:inset-x-16 md:top-24 md:bottom-24 md:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide">Analysis complete</p>
                <p role="status" className="mt-1 text-sm text-gray-600">
                  {analysis.message}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPermissionPrompt("gallery")}
                className="border border-[#1A1B1C] px-4 py-2 text-sm font-semibold"
              >
                Choose another image
              </button>
            </div>
            <div className="mb-5 flex items-center gap-4">
              <Image
                src={imagePreview}
                alt="Image analyzed"
                width={96}
                height={96}
                unoptimized
                className="h-24 w-24 object-cover"
              />
              <p className="text-sm font-semibold">Your analysis results</p>
            </div>
            <p className="mb-3 text-sm text-gray-600">
              Select one option in each category to mark your actual attributes.
              This does not change the AI scores.
            </p>
            <div className="grid gap-4 md:grid-cols-[minmax(150px,0.7fr)_repeat(3,minmax(0,1fr))]">
              <aside
                aria-live="polite"
                aria-label="Your actual attributes"
                className="border border-gray-300 bg-white/70 p-4"
              >
                <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide">
                  Your actual
                </h2>
                <ul className="space-y-4">
                  {["Race", "Age", "Gender"].map((category) => (
                    <li key={category} className="border-b border-gray-200 pb-3 last:border-0">
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                        {category}
                      </p>
                      <p className="mt-1 text-sm font-semibold capitalize">
                        {actualAttributes[category] || "Select a score"}
                      </p>
                    </li>
                  ))}
                </ul>
              </aside>
              {renderDistribution("Race", analysis.data.race)}
              {renderDistribution("Age", analysis.data.age)}
              {renderDistribution("Gender", analysis.data.gender)}
            </div>
          </div>
        </section>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-1 py-12 md:flex-row md:justify-between md:gap-0 md:px-8 md:py-0 lg:px-16">
          <div className="result-diamond-stage relative flex h-[min(70vw,28dvh,300px)] w-[min(70vw,28dvh,300px)] shrink-0 items-center justify-center md:h-[min(45vw,58dvh,500px)] md:w-[min(45vw,58dvh,500px)]">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <div className="diamond diamond-outer" />
              <div className="diamond diamond-middle" />
              <div className="diamond diamond-inner" />
            </div>
            <button
              type="button"
              onClick={() => setPermissionPrompt("camera")}
              aria-label="Take or select a photo to scan your face"
              className="group relative z-10 flex h-[136px] w-[136px] scale-[0.75] items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-bg-Buttons sm:scale-100"
            >
              <span className="absolute inset-0 rounded-full border-2 border-brand-bg-Buttons transition-transform duration-300 ease-in-out group-hover:scale-105 group-active:scale-95" />
              <Image
                src={shutter}
                alt=""
                className="h-[116px] w-[116px] rounded-full border-4 bg-brand-bg-Buttons transition-transform duration-300 ease-in-out group-hover:scale-105 group-active:scale-95"
              />
              <div className="pointer-events-none absolute left-[117px] top-[-38px] h-[60px] w-[67px]">
                <Image
                  src={scanCallout}
                  alt=""
                  aria-hidden="true"
                  className="hidden h-full w-full md:block"
                />
              </div>
              <span className="absolute bottom-[-52px] left-[-80px] w-44 text-left text-[16px] font-medium leading-tight tracking-wide md:bottom-auto md:left-[188px] md:top-[-52px]">
                ALLOW A.I.
                <br />
                TO SCAN YOUR FACE
              </span>
            </button>
          </div>
          <div className="result-diamond-stage relative flex h-[min(70vw,28dvh,300px)] w-[min(70vw,28dvh,300px)] shrink-0 items-center justify-center md:h-[min(45vw,58dvh,500px)] md:w-[min(45vw,58dvh,500px)]">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <div className="diamond diamond-outer" />
              <div className="diamond diamond-middle" />
              <div className="diamond diamond-inner" />
            </div>
            <button
              type="button"
              onClick={() => setPermissionPrompt("gallery")}
              aria-label="Choose a photo from your gallery"
              className="group relative z-10 flex h-[136px] w-[136px] scale-[0.75] items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-bg-Buttons sm:scale-100"
            >
              <span className="absolute inset-0 rounded-full border-2 border-brand-bg-Buttons transition-transform duration-300 ease-in-out group-hover:scale-105 group-active:scale-95" />
              <Image
                src={gallery}
                alt=""
                className="h-[116px] w-[116px] transition-transform duration-300 ease-in-out group-hover:scale-105 group-active:scale-95"
              />
              <div className="pointer-events-none absolute left-[-39px] top-[119px] h-[60px] w-[67px]">
                <Image
                  src={scanCallout}
                  alt=""
                  aria-hidden="true"
                  className="hidden h-full w-full rotate-180 md:block"
                />
              </div>
              <span className="absolute bottom-[-60px] right-[-26px] w-40 text-right text-[16px] font-medium leading-tight tracking-wide md:bottom-[-84px] md:right-[174px]">
                ALLOW A.I.
                <br />
                ACCESS GALLERY
              </span>
            </button>
          </div>
          <div className="absolute right-9 top-[1] p-6 text-left text-sm opacity-100 transition-opacity duration-300 md:top-1">
            <p className="mb-1 text-xs font-normal">Preview</p>
            <div className="relative h-24 w-24 overflow-hidden border border-gray-300 md:h-32 md:w-32">
              {imagePreview && (
                <Image
                  src={imagePreview}
                  alt="Selected image preview"
                  fill
                  unoptimized
                  className="object-cover"
                />
              )}
            </div>
          </div>
          {image && !isAnalyzing && (
            <div className="absolute bottom-24 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 md:bottom-8">
              <button
                type="button"
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="bg-brand-bg-Buttons px-6 py-3 text-sm font-semibold text-brand-text-light disabled:cursor-wait disabled:opacity-60"
              >
                {isAnalyzing ? "ANALYZING..." : "ANALYZE IMAGE"}
              </button>
              {errorMessage && (
                <p role="alert" className="max-w-sm text-center text-sm text-red-700">
                  {errorMessage}
                </p>
              )}
            </div>
          )}
          {errorMessage && !image && (
            <p role="alert" className="absolute bottom-24 z-20 text-center text-sm text-red-700 md:bottom-8">
              {errorMessage}
            </p>
          )}
        </div>
      )}

      {showAnalysisSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 px-4">
          <div
            role="status"
            aria-live="assertive"
            className="w-full max-w-sm border border-white/20 bg-[#1A1B1C] px-6 py-5 text-center text-white shadow-2xl"
          >
            <p className="text-sm font-semibold">Image analyzed successfully!</p>
          </div>
        </div>
      )}
    </main>
  );
};

export default Result;