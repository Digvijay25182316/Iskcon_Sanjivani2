"use client";
import useWindowDimensions from "@/Utils/Hooks/WindowDimentions";
import LoadingComponent from "@/Utils/Icons/LoadingComponent";
import { useGlobalState } from "@/Utils/State";
import React, { useEffect, useState } from "react";
import ViewController from "./ViewController";
import LoadingSkeleton from "@/Utils/LoadingSkeleton";
import VolunteerData from "./VolunteerData";

interface ProgramsData {
  name: string;
  preacher: string;
  coordinator: string;
  mentor: string;
  incharge: string;
  type: string;
  audienceType: string;
  location: string;
}

function Programs() {
  const { state, dispatch } = useGlobalState();
  const [programArr, setProgramsArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { width } = useWindowDimensions();

  const [customisationObjs, setCustomisationObjs] = useState({
    cellSize: "normal",
  });

  function handleCustomisation(object: any) {
    setCustomisationObjs((prevState) => ({
      ...prevState,
      ...object,
    }));
  }

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/admin/information/programs");
        if (response.ok) {
          const responseData = await response.json();
          setProgramsArr(responseData.content.content);
        } else {
          const errorData = await response.json();
          dispatch({
            type: "SHOW_TOAST",
            payload: { message: errorData.message, type: "ERROR" },
          });
        }
      } catch (error: any) {
        dispatch({
          type: "SHOW_TOAST",
          payload: { type: "ERROR", message: error.message },
        });
      } finally {
        setIsLoading(false);
      }
    })();
  }, [dispatch]);
  return (
    <div className={`min-h-screen`}>
      <h1
        className={`md:py-10 py-5 md:px-10 px-3 font-bold text-3xl border-b ${
          state.theme.theme === "LIGHT"
            ? "border-b-gray-200"
            : "border-b-stone-800"
        }`}
      >
        Programs
      </h1>
      <div className="my-3">
        <ViewController handleCustomisation={handleCustomisation} />
      </div>
      {isLoading ? (
        <>
          <LoadingSkeleton
            rows={8}
            columns={width < 600 ? 3 : 8}
            theme={state.theme.theme}
          />
        </>
      ) : (
        <div
          className={`w-full mx-auto rounded-3xl ${
            state.theme.theme === "LIGHT" ? "bg-gray-50" : "bg-stone-900"
          } p-4`}
        >
          <div className={`overflow-x-auto`}>
            <table>
              <thead>
                <tr
                  className={` ${
                    state.theme.theme === "LIGHT"
                      ? "border-b-2 border-gray-400 "
                      : "border-b-2 border-stone700"
                  }`}
                >
                  <th className=" whitespace-nowrap font-bold px-5 pb-3">
                    PROGRAM NAME
                  </th>
                  <th className=" whitespace-nowrap font-bold px-5 pb-3">
                    PREACHER
                  </th>
                  <th className=" whitespace-nowrap font-bold px-5 pb-3">
                    COORDINATOR
                  </th>
                  <th className=" whitespace-nowrap font-bold px-5 pb-3">
                    MENTOR
                  </th>
                  <th className=" whitespace-nowrap font-bold px-5 pb-3">
                    INCHARGE
                  </th>
                  <th className=" whitespace-nowrap font-bold px-5 pb-3">
                    TYPE
                  </th>
                  <th className=" whitespace-nowrap font-bold px-5 pb-3">
                    AUDIENCE TYPE
                  </th>
                  <th className=" whitespace-nowrap font-bold px-5 pb-3">
                    LOCATION
                  </th>
                  <th className=" whitespace-nowrap font-bold px-5 pb-3">
                    ACTIVITIES LINK
                  </th>
                  <th className=" whitespace-nowrap font-bold px-5 pb-3">
                    SADHANA LINK
                  </th>
                </tr>
              </thead>
              <tbody>
                {programArr.length > 0 ? (
                  programArr.map((item: ProgramsData, index) => (
                    <tr key={index}>
                      <td
                        className={`text-center border-b ${
                          customisationObjs.cellSize === "bigger"
                            ? "py-2"
                            : customisationObjs.cellSize === "biggest"
                            ? "py-3"
                            : "py-1"
                        } ${
                          state.theme.theme === "LIGHT"
                            ? "border-b-gray-200"
                            : "border-b-stone-800"
                        }`}
                      >
                        {item.name}
                      </td>
                      <td
                        className={`text-center border-b ${
                          customisationObjs.cellSize === "bigger"
                            ? "py-2"
                            : customisationObjs.cellSize === "biggest"
                            ? "py-3"
                            : "py-1"
                        } ${
                          state.theme.theme === "LIGHT"
                            ? "border-b-gray-200"
                            : "border-b-stone-800"
                        }`}
                      >
                        <VolunteerData volunteerid={item.preacher} />
                      </td>
                      <td
                        className={`text-center border-b ${
                          customisationObjs.cellSize === "normal"
                            ? "py-2"
                            : customisationObjs.cellSize === "bigger"
                            ? "py-3"
                            : "py-5"
                        } ${
                          state.theme.theme === "LIGHT"
                            ? "border-b-gray-200"
                            : "border-b-stone-800"
                        }`}
                      >
                        <VolunteerData volunteerid={item.coordinator} />
                      </td>
                      <td
                        className={`text-center border-b ${
                          customisationObjs.cellSize === "bigger"
                            ? "py-2"
                            : customisationObjs.cellSize === "biggest"
                            ? "py-3"
                            : "py-1"
                        } ${
                          state.theme.theme === "LIGHT"
                            ? "border-b-gray-200"
                            : "border-b-stone-800"
                        }`}
                      >
                        <VolunteerData volunteerid={item.mentor} />
                      </td>
                      <td
                        className={`text-center border-b ${
                          customisationObjs.cellSize === "bigger"
                            ? "py-2"
                            : customisationObjs.cellSize === "biggest"
                            ? "py-3"
                            : "py-1"
                        } ${
                          state.theme.theme === "LIGHT"
                            ? "border-b-gray-200"
                            : "border-b-stone-800"
                        }`}
                      >
                        <VolunteerData volunteerid={item.incharge} />
                      </td>
                      <td
                        className={`text-center border-b ${
                          customisationObjs.cellSize === "bigger"
                            ? "py-2"
                            : customisationObjs.cellSize === "biggest"
                            ? "py-3"
                            : "py-1"
                        } ${
                          state.theme.theme === "LIGHT"
                            ? "border-b-gray-200"
                            : "border-b-stone-800"
                        }`}
                      >
                        {item.type}
                      </td>
                      <td
                        className={`text-center border-b ${
                          customisationObjs.cellSize === "bigger"
                            ? "py-2"
                            : customisationObjs.cellSize === "biggest"
                            ? "py-3"
                            : "py-1"
                        } ${
                          state.theme.theme === "LIGHT"
                            ? "border-b-gray-200"
                            : "border-b-stone-800"
                        }`}
                      >
                        {item.audienceType}
                      </td>
                      <td
                        className={`text-center border-b ${
                          customisationObjs.cellSize === "bigger"
                            ? "py-2"
                            : customisationObjs.cellSize === "biggest"
                            ? "py-3"
                            : "py-1"
                        } ${
                          state.theme.theme === "LIGHT"
                            ? "border-b-gray-200"
                            : "border-b-stone-800"
                        }`}
                      >
                        {item.location}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={10} className="text-center py-10">
                      No Data To Show
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Programs;
