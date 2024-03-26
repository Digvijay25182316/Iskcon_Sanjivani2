"use client";
import React, { useState } from "react";
import { useGlobalState } from "./State";
import useWindowDimensions from "./Hooks/WindowDimentions";
import Link from "next/link";

import {
  ArrowTrendingUpIcon,
  AcademicCapIcon,
  ChevronDownIcon,
  CalendarDaysIcon,
  CircleStackIcon,
  Cog6ToothIcon,
  PresentationChartBarIcon,
  QueueListIcon,
  UserIcon,
  UserGroupIcon,
  SparklesIcon,
  Squares2X2Icon,
  RectangleGroupIcon,
} from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";

function SidebarMenu() {
  const { state } = useGlobalState();
  const { width } = useWindowDimensions();
  const pathname = usePathname();
  return (
    <div
      className={`hidden md:block fixed w-[240px] z-[1000] ${
        state.theme.theme === "LIGHT"
          ? "h-screen border-r bg-white"
          : "h-screen border-r bg-stone-900 border-r-stone-900 bg-opacity-10"
      }`}
    >
      <h1 className="my-5 text-lg font-bold text-center">Sanjivani</h1>
      <div className="flex flex-col text-lg mx-4 overflow-y-auto">
        <Link href={"/admin/dashboard"}>
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
          options={[
            {
              title: "Programs",
              routeName: "/admin/information/programs",
              icon: <CalendarDaysIcon />,
            },
            {
              title: "Courses Master",
              routeName: "/admin/information/mcourses",
              icon: <AcademicCapIcon />,
            },
            {
              title: "Activities",
              routeName: "/admin/information/activities",
              icon: <PresentationChartBarIcon />,
            },
            {
              title: "Activity Master",
              routeName: "/admin/information/mactivities",
              icon: <QueueListIcon />,
            },
            {
              title: "Course Levels",
              routeName: "/admin/information/levels",
              icon: <ArrowTrendingUpIcon />,
            },
            {
              title: "Volunteers",
              routeName: "/admin/information/volunteers",
              icon: <UserIcon />,
            },
            {
              title: "Participants",
              routeName: "/admin/information/participants",
              icon: <UserGroupIcon />,
            },
            {
              title: "Sadhana",
              routeName: "/admin/information/sadhana",
              icon: <SparklesIcon />,
            },
            {
              title: "Extra Courses",
              routeName: "/admin/information/extracourses",
              icon: <RectangleGroupIcon />,
            },
          ]}
          title="Information"
          buttonStyles={`flex items-center py-2 my-1 px-1.5 rounded-2xl`}
        />
        <Link href={"/admin/customizations"}>
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
  );
}

export default SidebarMenu;

interface MenuProps {
  options: Options[];
  title: string;
  buttonStyles: string;
}

interface Options {
  title: string;
  routeName: string;
  icon: React.ReactNode;
}

function ToggleMenuOptions({ options, title, buttonStyles }: MenuProps) {
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
          <Link href={`${item.routeName}`} key={key}>
            <div
              className={`${buttonStyles} pl-6 flex items-center gap-3 font-semibold ${
                pathname === item.routeName
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
