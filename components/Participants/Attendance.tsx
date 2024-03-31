"use client";
import { useGlobalState } from "@/Utils/State";
import React from "react";

function Attendance() {
  const { state } = useGlobalState();
  return (
    <div>
      <div
        className={`flex flex-col items-center min-h-screen w-screen overflow-x-hidden`}
      >
        <h1 className="font-bold md:text-4xl text-3xl my-20">Attendance</h1>
        <div
          className={`md:p-10 p-5 md:rounded-[40px] rounded-3xl ${
            state.theme.theme === "LIGHT" ? "bg-gray-50" : " bg-stone-900"
          }`}
        >
          <div className="md:w-[450px] ">
            <form action="">
              <div className="flex flex-col">
                <label
                  htmlFor="phone_number"
                  className="font-bold text-xl pb-3"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phone_number"
                  className={`rounded-xl px-4 py-2.5 text-lg border transition-all duration-500 ${
                    state.theme.theme === "LIGHT"
                      ? "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-100 bg-white"
                      : "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-950 bg-stone-950 border-stone-800"
                  }`}
                />
                <button
                  className={`px-4 py-2 text-lg rounded-xl my-5 w-full font-bold ${
                    state.theme.theme === "LIGHT"
                      ? "bg-blue-200 text-blue-600"
                      : "bg-blue-900 bg-opacity-40 text-blue-600"
                  } `}
                  type="submit"
                  disabled
                >
                  Search
                </button>
              </div>
            </form>
            <div>
              <div className="flex flex-col items-center gap-4">
                <h1 className="text-red-600 text-center font-bold text-2xl">
                  Digvijay Edake
                </h1>
                <h1 className="text-gray-500 text-center font-bold text-xl">
                  Gitasar Batch 12
                </h1>
                <div className="w-full flex justify-center gap-3">
                  <p className="text-blue-600 font-bold text-xl">Course : </p>
                  <p className="text-blue-600 font-bold text-xl">
                    Dicover yourself
                  </p>
                </div>
              </div>
              <div
                className={`w-full flex flex-col items-center ${
                  state.theme.theme === "LIGHT" ? "bg-white" : "bg-stone-950"
                } rounded-3xl mt-5`}
              >
                <div className="font-bold text-xl flex flex-col gap-3 w-full p-5">
                  <div className="flex flex-col  border-b-2">
                    <p className="font-bold">Latest Session</p>
                    <p className="font-normal">This is the recent session </p>
                  </div>
                  <label className="flex items-center gap-5 text-xl font-bold">
                    <input type="radio" className="h-5 w-5" />
                    <p>DYS 2</p>
                  </label>
                </div>
                <div className="font-bold text-xl flex flex-col gap-3 w-full p-5">
                  <div className="flex flex-col  border-b-2">
                    <p className="font-bold">Previous Session</p>
                    <p className="font-normal">These are the past sessions</p>
                  </div>
                  <label className="flex items-center gap-5 text-xl font-bold">
                    <input type="radio" className="h-5 w-5" />
                    <p>DYS 2</p>
                  </label>
                </div>
                <div className="md:p-5 p-3 w-full flex items-center justify-center">
                  <button
                    className={`py-2 text-lg rounded-xl my-5 w-full font-bold md:mx-5 ${
                      state.theme.theme === "LIGHT"
                        ? "bg-blue-200 text-blue-600"
                        : "bg-blue-900 bg-opacity-40 text-blue-600"
                    } `}
                    type="submit"
                    disabled
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Attendance;
