"use client";
import useWindowDimensions from "@/Utils/Hooks/WindowDimentions";
import LoadingSkeleton from "@/Utils/LoadingSkeleton";
import { useGlobalState } from "@/Utils/State";
import React from "react";

function Loading() {
  const { state } = useGlobalState();
  const { width } = useWindowDimensions();
  return (
    <div>
      <div className={`min-h-screen`}>
        <h1
          className={`md:py-10 py-5 md:px-10 px-3 font-bold text-3xl border-b ${
            state.theme.theme === "LIGHT"
              ? "border-b-gray-200"
              : "border-b-stone-800"
          }`}
        >
          Levels
        </h1>
        <LoadingSkeleton
          rows={8}
          columns={width < 600 ? 3 : 8}
          theme={state.theme.theme}
        />
      </div>
    </div>
  );
}

export default Loading;
