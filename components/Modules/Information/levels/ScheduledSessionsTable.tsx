"use client";
import useWindowDimensions from "@/Utils/Hooks/WindowDimentions";
import { useGlobalState } from "@/Utils/State";
import React, { useEffect, useState } from "react";
import ViewController from "./ViewController";
import LoadingSkeleton from "@/Utils/LoadingSkeleton";

function ScheduledSessionTable({ levelId }: { levelId: string }) {
  const { state, dispatch } = useGlobalState();
  const [scheduledSessionsArr, setCoursesArr] = useState([]);
  const [columnNamesArr, setColumnNamesArr] = useState<string[]>([]);
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

  const handleAddItemToColumnNameArr = (option: { value: string }) => {
    if (columnNamesArr.includes(option.value)) {
      setColumnNamesArr(
        columnNamesArr.filter((selected) => selected !== option.value)
      );
    } else {
      setColumnNamesArr([...columnNamesArr, option.value]);
    }
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/admin/information/sessions/scheduled/${levelId}`
        );
        if (response.ok) {
          const responseData = await response.json();
          setCoursesArr(responseData.content.content);
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
  }, [dispatch, levelId]);
  return (
    <div className={`h-full`}>
      <h1
        className={`md:py-5 py-3 md:px-10 px-3 font-bold text-3xl border-b ${
          state.theme.theme === "LIGHT"
            ? "border-b-gray-200"
            : "border-b-stone-800"
        }`}
      >
        Scheduled Sessions
      </h1>
      <div className="my-3">
        <ViewController
          handleCustomisation={handleCustomisation}
          handleHidables={handleAddItemToColumnNameArr}
          columnNames={[]}
          options={columnNamesArr}
        />
      </div>
      {isLoading ? (
        <>
          <LoadingSkeleton
            rows={6}
            columns={width < 600 ? 3 : 6}
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
            <table className="w-full">
              <thead>
                <tr
                  className={` ${
                    state.theme.theme === "LIGHT"
                      ? "border-b-2 border-gray-400 "
                      : "border-b-2 border-stone700"
                  }`}
                >
                  <th className=" whitespace-nowrap font-bold px-5 pb-3">
                    SESSION NAME
                  </th>
                  <th className=" whitespace-nowrap font-bold px-5 pb-3">
                    SCHEDULED DATE
                  </th>
                  <th className=" whitespace-nowrap font-bold px-5 pb-3">
                    COURSE NAME
                  </th>
                  <th className=" whitespace-nowrap font-bold px-5 pb-3">
                    SESSION NAME
                  </th>
                </tr>
              </thead>
              <tbody>
                {scheduledSessionsArr.length > 0 ? (
                  scheduledSessionsArr.map((item: ScheduledSessions, index) => (
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
                        {item.startTime}
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
                        {item.courseName}
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
                        {item.sessionName}
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

export default ScheduledSessionTable;
