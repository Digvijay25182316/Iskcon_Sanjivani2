"use client";
import { useGlobalState } from "@/Utils/State";
import React from "react";

function Sadhana() {
  const { state } = useGlobalState();
  return (
    <div className="min-h-screen">
      <h1
        className={`md:py-10 py-5 md:px-10 px-3 font-bold text-3xl border-b md:min-w-[650px] lg:w-[1090px] ${
          state.theme.theme === "LIGHT"
            ? "border-b-gray-200"
            : "border-b-stone-800"
        }`}
      >
        Sadhana
      </h1>
    </div>
  );
}

export default Sadhana;
