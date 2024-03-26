"use client";
import useWindowDimensions from "@/Utils/Hooks/WindowDimentions";
import { useGlobalState } from "@/Utils/State";
import React, { useEffect, useState } from "react";
import ViewController from "./ViewController";
import LoadingSkeleton from "@/Utils/LoadingSkeleton";
import VolunteerData from "./VolunteerData";
import SortableIcon from "@/Utils/Icons/SortableIcon";
import ScheduledSessionTable from "./ScheduledSessionsTable";
import { GetLevels } from "@/actions/GetRequests";

interface LevelsProps<T> {
  response: LevelsData[];
}

function Levels({ response }: LevelsProps<LevelsData[]>) {
  const { state, dispatch } = useGlobalState();
  const [levelsArr, setLevelsArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { width } = useWindowDimensions();
  const [expandedRow, setExpandedRow] = useState<number>(-1);
  const [queryArr, setQueryArr] = useState([
    { page: 0 },
    { size: 10 }, // a default page size
    { sort: "id" },
  ]);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/admin/information/levels`);
        if (response.ok) {
          const responseData = await response.json();
          setLevelsArr(responseData.content.content);
        } else {
          const errorData = await response.json();
          dispatch({
            type: "SHOW_TOAST",
            payload: {
              message: errorData.message || errorData.title,
              type: "ERROR",
            },
          });
        }
      } catch (error: any) {
        dispatch({
          type: "SHOW_TOAST",
          payload: {
            message: error.message || "Unexpected exception occured",
            type: "ERROR",
          },
        });
      } finally {
        setIsLoading(false);
      }
    })();
  }, [dispatch]);

  //Function to sort
  const SortElements = (sortBy: any) => {
    setQueryArr((prev) => {
      const sortIndex = prev.findIndex((item) => item.hasOwnProperty("sort"));
      if (sortIndex !== -1) {
        const updatedQueryArr = [...prev];
        updatedQueryArr[sortIndex] = {
          ...updatedQueryArr[sortIndex],
          sort: sortBy,
        };
        return updatedQueryArr;
      }
      return prev;
    });
  };

  const [customisationObjs, setCustomisationObjs] = useState({
    cellSize: "normal",
  });

  function handleCustomisation(object: any) {
    setCustomisationObjs((prevState) => ({
      ...prevState,
      ...object,
    }));
  }

  const toggleRow = (index: number) => {
    if (expandedRow === index) {
      setExpandedRow(-1); // Collapse the row if it's already expanded
    } else {
      setExpandedRow(index); // Expand the clicked row
    }
  };
  return (
    <div className={`min-h-screen`}>
      <h1
        className={`md:py-10 py-5 md:px-10 px-3 font-bold text-3xl border-b ${
          state.theme.theme === "LIGHT"
            ? "border-b-gray-200"
            : "border-b-stone-800"
        }`}
      >
        Levels
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
                    <SortableIcon
                      fieldName={"name"}
                      tableHeading={"COURSE NAME"}
                      handleCheck={SortElements}
                      isSorted={queryArr.some((obj) => obj.sort === "name")}
                    />
                  </th>
                  <th className=" whitespace-nowrap font-bold px-5 pb-3">
                    <SortableIcon
                      fieldName={"programName"}
                      tableHeading={"PROGRAM NAME"}
                      handleCheck={SortElements}
                      isSorted={queryArr.some(
                        (obj) => obj.sort === "programName"
                      )}
                    />
                  </th>
                  <th className=" whitespace-nowrap font-bold px-5 pb-3">
                    <SortableIcon
                      fieldName={"coordinator"}
                      tableHeading={"COORDINATOR"}
                      handleCheck={SortElements}
                      isSorted={queryArr.some(
                        (obj) => obj.sort === "coordinator"
                      )}
                    />
                  </th>
                  <th className=" whitespace-nowrap font-bold px-5 pb-3">
                    <SortableIcon
                      fieldName={"mentor"}
                      tableHeading={"MENTOR"}
                      handleCheck={SortElements}
                      isSorted={queryArr.some((obj) => obj.sort === "mentor")}
                    />
                  </th>
                  <th className=" whitespace-nowrap font-bold px-5 pb-3">
                    <SortableIcon
                      fieldName={"preacher1"}
                      tableHeading={"PREACHER1"}
                      handleCheck={SortElements}
                      isSorted={queryArr.some(
                        (obj) => obj.sort === "preacher1"
                      )}
                    />
                  </th>
                  <th className=" whitespace-nowrap font-bold px-5 pb-3">
                    <SortableIcon
                      fieldName={"preacher2"}
                      tableHeading={"PREACHER2"}
                      handleCheck={SortElements}
                      isSorted={queryArr.some(
                        (obj) => obj.sort === "preacher2"
                      )}
                    />
                  </th>
                  <th className=" whitespace-nowrap font-bold px-5 pb-3">
                    <SortableIcon
                      fieldName={"status"}
                      tableHeading={"STATUS"}
                      handleCheck={SortElements}
                      isSorted={queryArr.some((obj) => obj.sort === "status")}
                    />
                  </th>
                  <th className=" whitespace-nowrap font-bold px-5 pb-3">
                    ATTENDANCE LINK
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
                {levelsArr.length > 0 ? (
                  levelsArr.map((item: LevelsData, index) => (
                    <React.Fragment key={index}>
                      <tr onClick={() => toggleRow(index)}>
                        <td
                          className={`text-center ${
                            expandedRow !== index && "border-b"
                          } ${
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
                          className={`text-center ${
                            expandedRow !== index && "border-b"
                          } ${
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
                          {item.programName}
                        </td>
                        <td
                          className={`text-center ${
                            expandedRow !== index && "border-b"
                          } ${
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
                          className={`text-center ${
                            expandedRow !== index && "border-b"
                          } ${
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
                          className={`text-center ${
                            expandedRow !== index && "border-b"
                          } ${
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
                          <VolunteerData volunteerid={item.preacher1} />
                        </td>
                        <td
                          className={`text-center ${
                            expandedRow !== index && "border-b"
                          } ${
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
                          <VolunteerData volunteerid={item.preacher2} />
                        </td>
                        <td
                          className={`text-center ${
                            expandedRow !== index && "border-b"
                          } ${
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
                          {item.status}
                        </td>
                      </tr>
                      {expandedRow === index && (
                        <tr>
                          <td className="border-b" colSpan={10}>
                            <div
                              className={`p-3 m-2 rounded-3xl ${
                                state.theme.theme === "LIGHT"
                                  ? "bg-white"
                                  : "bg-stone-950 "
                              }`}
                            >
                              <ScheduledSessionTable levelId={item.id} />
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
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

export default Levels;
