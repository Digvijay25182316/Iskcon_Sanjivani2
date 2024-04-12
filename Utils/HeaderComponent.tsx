"use client";
import React, { useEffect, useState } from "react";
import { useGlobalState } from "./State";
import { usePathname } from "next/navigation";
import {
  AcademicCapIcon,
  ArrowTrendingUpIcon,
  Bars3Icon,
  CalendarDaysIcon,
  ChevronDownIcon,
  CircleStackIcon,
  Cog6ToothIcon,
  PresentationChartBarIcon,
  QueueListIcon,
  RectangleGroupIcon,
  SparklesIcon,
  Squares2X2Icon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/16/solid";
import Link from "next/link";

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
          className={`md:py-6 py-5 md:px-10 px-3 font-bold text-3xl border-b ${
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
  const { state } = useGlobalState();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [isOpenOverlay, setIsOpenOverlay] = useState(false);
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setIsOpenOverlay(true);
      }, 100);
    }
  }, [isOpen]);
  function onClose() {
    setIsOpenOverlay(false);
    setIsOpen(false);
  }
  return (
    <div className={`md:hidden block relative`}>
      <div
        className={`p-2 border-b flex items-center justify-between ${
          state.theme.theme === "LIGHT"
            ? "border-b-gray-300"
            : "border-b-stone-700"
        }`}
      >
        <h1 className="text-xl font-bold ">Sanjivani</h1>
        <button
          onClick={() => setIsOpen(true)}
          className={`p-3 rounded-full ${
            state.theme.theme === "LIGHT" ? "bg-gray-50" : "bg-stone-900"
          }`}
        >
          <Bars3Icon className="h-5 w-5" />
        </button>
      </div>
      {isOpen ? (
        <>
          <div
            className="fixed top-0 left-0 right-0 bottom-0 z-[1000] backdrop-blur-sm cursor-pointer flex items-center justify-center"
            onClick={onClose}
          ></div>
          <div
            className={`fixed md:hidden left-0 top-0 bottom-0 w-3/4 z-[1000]  transition-all duration-500 ${
              state.theme.theme === "LIGHT"
                ? "bg-white shadow-lg shadow-gray-300"
                : "bg-stone-900 shadow-lg shadow-black"
            } h-full ${isOpenOverlay ? "translate-x-0 " : "-translate-x-full"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <h1 className="my-5 text-lg font-bold text-center">Sanjivani</h1>
            <div className="flex flex-col text-lg mx-4 overflow-y-auto">
              <Link href={"/admin/dashboard"} onClick={onClose}>
                <div
                  className={`flex items-center gap-3 py-2 my-1 px-1.5 rounded-2xl font-semibold ${
                    pathname.startsWith("/admin/dashboard")
                      ? `${
                          state.theme.theme === "LIGHT"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-blue-950 text-blue-300 bg-opacity-40"
                        }`
                      : `${
                          state.theme.theme === "LIGHT"
                            ? "hover:bg-blue-50 text-black"
                            : "hover:bg-blue-950 text-stone-300"
                        }`
                  }`}
                >
                  <Squares2X2Icon className="h-6 w-6" />
                  Dashboard
                </div>
              </Link>
              <ToggleMenuOptions
                onClose={() => {
                  setIsOpen(false);
                  setIsOpenOverlay(false);
                }}
                options={[
                  {
                    title: "Programs",
                    LinkrouteName:
                      "/admin/information/programs?sort=id&page=0&size=10",
                    routeName: "/admin/information/programs",
                    icon: <CalendarDaysIcon />,
                  },
                  {
                    title: "Courses Master",
                    LinkrouteName:
                      "/admin/information/mcourses?sort=id&page=0&size=10",
                    routeName: "/admin/information/mcourses",
                    icon: <AcademicCapIcon />,
                  },
                  {
                    title: "Activities",
                    LinkrouteName:
                      "/admin/information/activities?sort=id&page=0&size=10",
                    routeName: "/admin/information/activities",
                    icon: <PresentationChartBarIcon />,
                  },
                  {
                    title: "Activity Master",
                    LinkrouteName:
                      "/admin/information/mactivities?sort=id&page=0&size=10",
                    routeName: "/admin/information/mactivities",
                    icon: <QueueListIcon />,
                  },
                  {
                    title: "Course Levels",
                    LinkrouteName:
                      "/admin/information/levels?sort=id&page=0&size=10",
                    routeName: "/admin/information/levels",
                    icon: <ArrowTrendingUpIcon />,
                  },
                  {
                    title: "Volunteers",
                    LinkrouteName:
                      "/admin/information/volunteers?sort=id&page=0&size=10",
                    routeName: "/admin/information/volunteers",
                    icon: <UserIcon />,
                  },
                  {
                    title: "Participants",
                    LinkrouteName:
                      "/admin/information/participants?sort=id&page=0&size=10",
                    routeName: "/admin/information/participants",
                    icon: <UserGroupIcon />,
                  },
                  {
                    title: "Sadhana",
                    LinkrouteName:
                      "/admin/information/sadhana?sort=id&page=0&size=10",
                    routeName: "/admin/information/sadhana",
                    icon: <SparklesIcon />,
                  },
                  {
                    title: "Extra Courses",
                    LinkrouteName:
                      "/admin/information/extracourses?sort=id&page=0&size=10",
                    routeName: "/admin/information/extracourses",
                    icon: <RectangleGroupIcon />,
                  },
                ]}
                title="Information"
                buttonStyles={`flex items-center py-2 my-1 px-1.5 rounded-2xl`}
              />
              <Link href={"/admin/customizations"} onClick={onClose}>
                <div
                  className={`flex items-center gap-3 py-2 my-1 px-1.5 rounded-2xl font-semibold ${
                    pathname.startsWith("/admin/customizations")
                      ? `${
                          state.theme.theme === "LIGHT"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-blue-950 text-blue-300 bg-opacity-40"
                        }`
                      : `${
                          state.theme.theme === "LIGHT"
                            ? "hover:bg-blue-50 text-black"
                            : "hover:bg-blue-950 text-stone-300"
                        }`
                  }`}
                >
                  <Cog6ToothIcon className="h-6 w-6" /> Settings
                </div>
              </Link>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

interface MenuProps {
  options: Options[];
  title: string;
  buttonStyles: string;
  onClose: () => void;
}

interface Options {
  title: string;
  routeName: string;
  icon: React.ReactNode;
  LinkrouteName: string;
}

function ToggleMenuOptions({
  options,
  title,
  buttonStyles,
  onClose,
}: MenuProps) {
  const { state } = useGlobalState();
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();

  return (
    <div className="flex flex-col">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`${buttonStyles} relative overflow-hidden cursor-pointer font-semibold ${
          pathname.startsWith("/admin/information")
            ? `${
                state.theme.theme === "LIGHT"
                  ? "bg-blue-50 text-blue-700"
                  : "bg-blue-950 text-blue-300 bg-opacity-40"
              }`
            : `${
                state.theme.theme === "LIGHT"
                  ? "hover:bg-blue-50 text-black"
                  : "hover:bg-blue-950 text-stone-300"
              }`
        }`}
      >
        <div className="flex items-center gap-3">
          <CircleStackIcon className="h-6 w-6" />
          {title}
        </div>
        <ChevronDownIcon
          className={`h-4 w-4 absolute right-2 transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>
      <div
        className={`transition-all duration-700 overflow-y-auto custom-scrollbar ${
          isOpen ? " max-h-80" : "max-h-0"
        } overflow-hidden`}
      >
        {options.map((item, key) => (
          <Link href={`${item.LinkrouteName}`} key={key} onClick={onClose}>
            <div
              className={`${buttonStyles} pl-6 flex items-center gap-3 font-semibold ${
                pathname.startsWith(item.routeName)
                  ? `${
                      state.theme.theme === "LIGHT"
                        ? "bg-blue-50 text-blue-700"
                        : "bg-blue-950 text-blue-300 bg-opacity-40"
                    }`
                  : `${
                      state.theme.theme === "LIGHT"
                        ? "hover:bg-blue-50 text-black"
                        : "hover:bg-blue-950 text-stone-300"
                    }`
              }`}
            >
              <i className="h-6 w-6">{item.icon}</i>
              <p>{item.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
