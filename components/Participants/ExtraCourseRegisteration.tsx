"use client";
import { useGlobalState } from "@/Utils/State";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import React, { useCallback, useEffect, useRef, useState } from "react";

function ExtraCourseRegisteration({
  levelDataArr,
}: {
  levelDataArr: LevelToDisplay[];
}) {
  const { state } = useGlobalState();
  const [selectedLevel, setSelectedLevel] = useState<LevelToDisplay | any>([]);
  return (
    <div className="flex flex-col min-h-screen w-screen justify-center items-center">
      <div className="py-10">
        <div className="flex items-end">
          <h1 className="text-4xl font-bold">Registeration</h1>
          <h5 className="">GENERAL</h5>
        </div>
        <h1 className="text-lg">
          Looks like you are not registered please register
        </h1>
      </div>

      <div
        className={`md:p-5 rounded-[40px] p-4  mx-3 mb-6 ${
          state.theme.theme === "LIGHT"
            ? "bg-gray-50"
            : "bg-stone-900 bg-opacity-30"
        }`}
      >
        <form className="md:w-[500px]">
          <div>
            <div className="flex flex-col gap-5 w-full">
              <div className="flex flex-col gap-3">
                <label className="font-bold text-lg">Select Level</label>
                <MenuOthersDropDown
                  DataArr={levelDataArr}
                  setSelected={(value: LevelToDisplay) =>
                    setSelectedLevel(value)
                  }
                />
              </div>
              <div className="flex md:flex-row flex-col gap-5 w-full">
                <div className="flex flex-col gap-3 w-full">
                  <label htmlFor="firstName" className="font-bold text-lg">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    className={`border px-5 py-2.5 text-lg focus:ring-4 outline-none rounded-xl transition-all duration-500 w-full ${
                      state.theme.theme === "LIGHT"
                        ? "border-gray-300 focus:ring-blue-100 focus:border-blue-600"
                        : "border-stone-900 focus-ring-blue-950 focus:border-blue-600 bg-stone-950"
                    }`}
                    id="firstName"
                    placeholder="John"
                  />
                </div>
                <div className="flex flex-col gap-3 w-full">
                  <label htmlFor="lastName" className="font-bold text-lg">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    className={`border px-5 py-2.5 text-lg focus:ring-4 outline-none rounded-xl transition-all duration-500 w-full ${
                      state.theme.theme === "LIGHT"
                        ? "border-gray-300 focus:ring-blue-100 focus:border-blue-600"
                        : "border-stone-900 focus-ring-blue-950 focus:border-blue-600 bg-stone-950"
                    }`}
                    id="lastName"
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div className="flex md:flex-row flex-col gap-5 w-full">
                <div className="flex flex-col gap-3 w-full">
                  <label htmlFor="waNumber" className="font-bold text-lg">
                    Whatsapp Number
                  </label>
                  <input
                    type="tel"
                    name="waNumber"
                    className={`border px-5 py-2.5 text-lg focus:ring-4 outline-none rounded-xl transition-all duration-500 w-full ${
                      state.theme.theme === "LIGHT"
                        ? "border-gray-300 focus:ring-blue-100 focus:border-blue-600"
                        : "border-stone-900 focus-ring-blue-950 focus:border-blue-600 bg-stone-950"
                    }`}
                    id="waNumber"
                    placeholder="7379565771"
                  />
                </div>
                <div className="flex flex-col gap-3 w-full">
                  <label htmlFor="contactNumber" className="font-bold text-lg">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    name="contactNumber"
                    className={`border px-5 py-2.5 text-lg focus:ring-4 outline-none rounded-xl transition-all duration-500 w-full ${
                      state.theme.theme === "LIGHT"
                        ? "border-gray-300 focus:ring-blue-100 focus:border-blue-600"
                        : "border-stone-900 focus-ring-blue-950 focus:border-blue-600 bg-stone-950"
                    }`}
                    id="contactNumber"
                    placeholder="7379565779"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3 w-full">
                <label htmlFor="email" className="font-bold text-lg">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className={`border px-5 py-2.5 text-lg focus:ring-4 outline-none rounded-xl transition-all duration-500 w-full ${
                    state.theme.theme === "LIGHT"
                      ? "border-gray-300 focus:ring-blue-100 focus:border-blue-600"
                      : "border-stone-900 focus-ring-blue-950 focus:border-blue-600 bg-stone-950"
                  }`}
                  id="email"
                  placeholder="johndoe@example.com"
                />
              </div>
            </div>
            <div className="flex flex-col items-center gap-5 mt-14 w-full">
              <button
                className={`max-w-[300px] w-full py-2 text-xl font-bold rounded-xl ${
                  state.theme.theme === "LIGHT"
                    ? "bg-black text-white"
                    : "text-black bg-white"
                }`}
              >
                Submit
              </button>
              <div className="w-full flex flex-col items-center"></div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ExtraCourseRegisteration;

function MenuOthersDropDown({
  setSelected,
  DataArr,
}: {
  setSelected: (value: LevelToDisplay) => void;
  DataArr: LevelToDisplay[];
}) {
  const [isSelectionOpen, toggleSelection] = useState(false);
  const { state } = useGlobalState();
  const menuRef: any = useRef();
  const [selectedOption, setSelectedOption] = useState("");
  const [modalStyle, setModalStyle] = useState({
    transform: "scale(0.95)",
    opacity: 0,
  });

  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isSelectionOpen) {
      // Open modal animation
      setTimeout(() => {
        setModalStyle({
          transform: "scale(1)",
          opacity: 1,
        });
      }, 50); // Delay the transition slightly for better visual effect
    } else {
      // Close modal animation
      setModalStyle({
        transform: "scale(0.95)",
        opacity: 0,
      });
      setTimeout(() => {
        setIsClosing(false);
      }, 3000); // Adjust this duration according to your transition duration
    }
  }, [isSelectionOpen]);

  const closeModal = useCallback(() => {
    setIsClosing(true);
    toggleSelection(false);
  }, [toggleSelection]);

  // Attach click outside listener
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeModal();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleSelection, closeModal]);
  return (
    <div
      className="relative inline-block text-left w-full text-xl"
      ref={menuRef}
    >
      <button
        type="button"
        className={`flex items-center justify-between border px-2 py-2.5 rounded-xl gap-5 w-full focus:ring-4 outline-none focus:border font-semibold text-xl ${
          state.theme.theme === "LIGHT"
            ? "border-gray-300 bg-white focus:ring-blue-100 focus:border-blue-600"
            : "border-stone-700 bg-stone-950 focus:ring-blue-950 focus:border-blue-600"
        }`}
        id="options-menu"
        aria-haspopup="true"
        aria-expanded="true"
        onClick={() => toggleSelection(!isSelectionOpen)}
      >
        {selectedOption === "" ? "Select" : selectedOption}
        <ChevronDownIcon className="h-4 w-4" />
      </button>
      {isSelectionOpen && (
        <div
          className={`origin-top-left absolute font-semibold text-lg z-[10000] w-full rounded-lg shadow-lg mt-2 ${
            state.theme.theme === "LIGHT"
              ? "bg-white border-gray-300"
              : "bg-stone-900 border border-stone-700"
          } ring-1 ring-black ring-opacity-5 focus:outline-none py-1 px-1`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
          style={{
            ...modalStyle,
            transition: "transform 0.2s ease-out, opacity 0.2s ease-out",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {DataArr?.length > 0 ? (
            <div
              className={`flex flex-col gap-3 overflow-y-auto ${
                DataArr.length > 10
                  ? "md:h-[40vh] h-[60vh]"
                  : "h-[40vh] custom-scrollbar"
              }`}
              role="none"
            >
              {DataArr?.map((item: LevelToDisplay, index: number) => (
                <div
                  key={index}
                  onClick={() => {
                    setSelectedOption(item.name);
                    setSelected(item);
                    toggleSelection(false);
                  }}
                  className={`px-2 py-1.5 rounded-lg flex items-center gap-2 ${
                    item.name === selectedOption && "bg-blue-300"
                  } ${
                    state.theme.theme === "LIGHT"
                      ? "hover:bg-gray-100 "
                      : "hover:bg-stone-700"
                  }`}
                >
                  <p
                    className={`border-r pr-1 ${
                      state.theme.theme === "LIGHT"
                        ? "border-r-gray-300"
                        : "border-r-stone-700"
                    }`}
                  >
                    {item.displayName}
                  </p>
                  {item.sessionTime ? (
                    <p
                      className={`border-r pr-1 ${
                        state.theme.theme === "LIGHT"
                          ? "border-r-gray-300"
                          : "border-r-stone-700"
                      }`}
                    >
                      {formatTime(item.sessionTime)}
                    </p>
                  ) : (
                    <></>
                  )}
                  <p>{item.sessionDay}</p>
                </div>
              ))}
            </div>
          ) : (
            <ul>
              <p>No data to show</p>
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

function formatTime(timeObject: {
  hour: number;
  minute: number;
  second: number;
}) {
  // Extract hours, minutes, and seconds from the time object
  let { hour, minute, second } = timeObject;

  // Determine AM or PM
  var suffix = hour >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  hour = hour % 12 || 12;

  // Add leading zero to minutes and seconds if necessary
  minute = Number(minute < 10 ? "0" + minute : minute);
  second = Number(second < 10 ? "0" + second : second);

  // Return formatted time string
  return hour + ":" + minute + ":" + second + " " + suffix;
}
