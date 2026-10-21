'use client';

import React, { useState } from "react";

const Testing = () => {
  const [step, setStep] = useState("name");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [validationError, setValidationError] = useState("");

  const normalizeAndValidate = (value) => {
    if (typeof value !== "string") {
      return null;
    }

    const normalized = value.trim().replace(/\s+/g, " ");
    return /^[\p{L}\p{M}]+(?:[ '\u2019.,-][\p{L}\p{M}]+)*$/u.test(normalized)
      ? normalized
      : null;
  };

  const handleNameSubmit = (event) => {
    event.preventDefault();

    const validatedName = normalizeAndValidate(name);
    if (!validatedName) {
      setValidationError(
        name.trim()
          ? "Enter a valid name using letters only."
          : "Please enter your name",
      );
      return;
    }

    setName(validatedName);
    setValidationError("");
    setStep("city");
  };

  const handleCitySubmit = async (event) => {
    event.preventDefault();
    const validatedName = normalizeAndValidate(name);
    const validatedLocation = normalizeAndValidate(location);

    if (!validatedName || !validatedLocation) {
      setValidationError(
        !validatedName
          ? name.trim()
            ? "Enter a valid name using letters only."
            : "Please enter your name"
          : location.trim()
            ? "Enter a valid city name using letters only."
            : "Please enter your city",
      );
      return;
    }

    setName(validatedName);
    setLocation(validatedLocation);
    setValidationError("");
    setErrorMessage("");
    setStep("processing");

    try {
      const response = await fetch(
        "https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseOne",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: validatedName,
            location: validatedLocation,
          }),
        },
      );

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
            : typeof result?.ERROR === "string"
              ? result.ERROR
            : `Submission failed with status ${response.status}.`,
        );
      }

      const message =
        typeof result?.SUCCESS === "string"
          ? result.SUCCESS
          : result?.success === true && typeof result?.message === "string"
            ? result.message
            : null;

      if (!message) {
        throw new Error("The server response did not include a success message.");
      }

      setSuccessMessage(message);
      setStep("complete");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to submit your information. Please try again.",
      );
      setStep("error");
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
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
                {validationError && (
                  <p
                    id="form-validation-error"
                    role="alert"
                    className="mb-2 text-center text-red-700"
                  >
                    {validationError}
                  </p>
                )}
                <input
                  type="text"
                  autoFocus
                  autoComplete="name"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                    setValidationError("");
                  }}
                  aria-invalid={Boolean(validationError)}
                  aria-describedby={validationError ? "form-validation-error" : undefined}
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
                {validationError && (
                  <p
                    id="form-validation-error"
                    role="alert"
                    className="mb-2 text-center text-red-700"
                  >
                    {validationError}
                  </p>
                )}
                <input
                  type="text"
                  autoFocus
                  autoComplete="address-level2"
                  value={location}
                  onChange={(event) => {
                    setLocation(event.target.value);
                    setValidationError("");
                  }}
                  aria-invalid={Boolean(validationError)}
                  aria-describedby={validationError ? "form-validation-error" : undefined}
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
            <>
              <p role="status" aria-live="polite" className="text-xl text-brand-text-dark text-center">
                {successMessage}
              </p>
              <p className="mt-2 text-xl text-brand-text-dark text-center">
                Thank You! <br /> <span className="text-brand-input-text">Proceed to the next step</span>
              </p>
            </>
          )}

          {step === "error" && (
            <div className="flex flex-col items-center gap-4">
              <p role="alert" className="text-center text-red-700">
                {errorMessage}
              </p>
              <button
                type="button"
                onClick={() => setStep("city")}
                className="border border-brand-text-dark px-4 py-2 text-sm font-semibold"
              >
                Try again
              </button>
            </div>
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
