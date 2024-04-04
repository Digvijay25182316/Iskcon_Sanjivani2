"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useGlobalState } from "./State";
import Link from "next/link";

function Pagination({ totalElements }: { totalElements: number }) {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { state } = useGlobalState();
  const [VisibleElements, setVisibleElement] = useState<number>(10);

  useEffect(() => {
    const page = searchParams.get("page")
      ? Number(searchParams.get("page"))
      : 0;
    setCurrentPage(page);
  }, [searchParams]);

  return (
    <div className="flex items-center justify-between gap-5 p-5">
      {VisibleElements !== 10 ? (
        <Link
          href={{
            pathname,
            query: {
              ...Object.fromEntries(new URLSearchParams(searchParams)),
              page: currentPage - 1,
            },
          }}
          onClick={() => setVisibleElement((prev) => prev - 10)}
        >
          <p
            className={`bg-white rounded-full border p-2 ${
              state.theme.theme === "LIGHT"
                ? "bg-gray-50 border-gray-400"
                : "bg-stone-950 border-stone-700"
            }`}
          >
            <ChevronLeftIcon className="h-8 w-8" />
          </p>
        </Link>
      ) : (
        <p
          className={`bg-white rounded-full border p-2 ${
            state.theme.theme === "LIGHT"
              ? "bg-gray-50 border-gray-200 text-gray-400"
              : "bg-stone-950 border-stone-800 text-stone-700"
          }`}
        >
          <ChevronLeftIcon className="h-8 w-8" />
        </p>
      )}
      <p className="px-2 py-1 text-xl">{`${
        totalElements < 10
          ? totalElements
          : VisibleElements > totalElements
          ? totalElements
          : VisibleElements
      } of ${totalElements}`}</p>
      {VisibleElements > totalElements ? (
        <p
          className={`bg-white rounded-full border p-2 ${
            state.theme.theme
              ? "bg-gray-50 border-gray-200 text-gray-400"
              : "bg-stone-950 border-stone-800 text-stone-700"
          }`}
        >
          <ChevronRightIcon className="h-8 w-8" />
        </p>
      ) : (
        <Link
          href={{
            pathname,
            query: {
              ...Object.fromEntries(new URLSearchParams(searchParams)),
              page: currentPage + 1,
            },
          }}
          onClick={() => setVisibleElement((prev) => prev + 10)}
        >
          <p
            className={`bg-white rounded-full border p-2 ${
              state.theme.theme
                ? "bg-gray-50 border-gray-400"
                : "bg-stone-950 border-stone-700"
            }`}
          >
            <ChevronRightIcon className="h-8 w-8" />
          </p>
        </Link>
      )}
    </div>
  );
}

export default Pagination;
