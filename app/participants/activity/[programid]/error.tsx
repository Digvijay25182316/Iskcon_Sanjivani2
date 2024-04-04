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
        <h2 className="font-bold">Something went wrong!</h2>

        <div className="flex flex-col items-center">
          <button
            className={`text-blue-600 px-5 py-2 rounded-xl font-bold ${
              state.theme.theme === "LIGHT"
                ? "bg-blue-50"
                : "bg-blue-950 bg-opacity-25"
            }`}
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}
