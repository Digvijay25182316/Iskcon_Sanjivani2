"use client";
import LoadingSkeleton from "@/Utils/LoadingSkeleton";
import { useGlobalState } from "@/Utils/State";
import { useRouter } from "next/navigation";
import React from "react";

function NotFound() {
  const navigator = useRouter();
  const { state } = useGlobalState();

  return (
    <div>
      <div>404</div>
      <div>Not Found</div>
      <button
        onClick={() => navigator.back()}
        className={`text-3xl text-red-600 px-5 py-2 rounded-xl ${
          state.theme.theme === "LIGHT"
            ? "bg-red-50"
            : "bg-red-950 bg-opacity-20"
        }`}
      >
        Go back
      </button>
    </div>
  );
}

export default NotFound;
