"use client";
import React from "react";
import { useGlobalState } from "./State";
import { usePathname } from "next/navigation";

function HeaderComponent() {
  const { state } = useGlobalState();
  const pathname = usePathname();
  var parts = pathname.split("/");

  // Extract the last part which should be 'levels'
  var actualPathname = parts[parts.length - 1];

  return (
    <>
      <HeadlessMenu />
      <div>
        <div
          className={`md:py-10 py-5 md:px-10 px-3 font-bold text-3xl border-b ${
            state.theme.theme === "LIGHT"
              ? "border-b-gray-200"
              : "border-b-stone-800"
          }`}
        >
          <h1 className="md:text-3xl text-2xl">
            {actualPathname ? actualPathname : pathname}
          </h1>
          <div className={` text-lg font-normal text-gray-500`}>
            <PathWithIcons pathname={pathname} />
          </div>
        </div>
      </div>
    </>
  );
}

export default HeaderComponent;

const PathWithIcons = ({ pathname }: { pathname: string }) => {
  // Split the string by '/'
  const parts = pathname.split("/");

  // Create JSX for each part with SVG icon and text
  const formattedPath = parts.map((part, index) => (
    <React.Fragment key={index}>
      <div className="flex items-center">
        {index > 0 && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        )}
        {part}
      </div>
    </React.Fragment>
  ));

  return <div className="flex items-center">{formattedPath}</div>;
};

function HeadlessMenu() {
  return (
    <div className="md:hidden block relative">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold ">Sanjivani</h1>
        <div></div>
      </div>
    </div>
  );
}
