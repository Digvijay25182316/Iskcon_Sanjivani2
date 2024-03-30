"use client"; // Error components must be Client Components

import { useGlobalState } from "@/Utils/State";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { state } = useGlobalState();

  return (
    <div
      className={`flex items-center justify-center w-full md:text-3xl text-2xl h-full min-h-[60vh] ${
        state.theme.theme === "LIGHT" ? "bg-white" : "bg-sone-950"
      }`}
    >
      <div className="flex flex-col items-center gap-5">
        {error.message ? (
          <div className="flex flex-col items-center font-bold gap-5 text-red-600">
            <h2>{error.message}</h2>
          </div>
        ) : (
          <h2>Something went wrong!</h2>
        )}
        <button
          className={`text-red-600 px-5 py-2 rounded-xl ${
            state.theme.theme === "LIGHT"
              ? "bg-red-50"
              : "bg-red-950 bg-opacity-25"
          }`}
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          TRY AGAIN
        </button>
      </div>
    </div>
  );
}
