"use client";
import useWindowDimensions from "@/Utils/Hooks/WindowDimentions";
import { useGlobalState } from "@/Utils/State";
import React, { useEffect, useState } from "react";
import ViewController from "./ViewController";
import LoadingSkeleton from "@/Utils/LoadingSkeleton";
import SortableIcon from "@/Utils/Icons/SortableIcon";
import DateFormatter from "@/Utils/DateFormatter";

function Activities() {
  const { state, dispatch } = useGlobalState();
  const [activityArr, setActivityArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { width } = useWindowDimensions();
  const [queryArr, setQueryArr] = useState([
    { page: 0 },
    { size: 10 }, // a default page size
    { sort: "id" },
  ]);

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

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/admin/information/activities");
        if (response.ok) {
          const responseData = await response.json();
          setActivityArr(responseData.content.content);
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
        Activities
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
                      fieldName={
                        queryArr.some((obj) => obj.sort !== "id")
                          ? "program_name"
                          : "programName"
                      }
                      tableHeading={"PROGRAM NAME"}
                      handleCheck={SortElements}
                      isSorted={queryArr.some(
                        (obj) =>
                          obj.sort === "program_name" ||
                          obj.sort === "programName"
                      )}
                    />
                  </th>
                  <th className=" whitespace-nowrap font-bold px-5 pb-3">
                    <SortableIcon
                      fieldName={
                        queryArr.some((obj) => obj.sort !== "id")
                          ? "level_name"
                          : "levelName"
                      }
                      tableHeading={"LEVEL NAME"}
                      handleCheck={SortElements}
                      isSorted={queryArr.some(
                        (obj) =>
                          obj.sort === "level_name" || obj.sort === "levelName"
                      )}
                    />
                  </th>
                  <th className=" whitespace-nowrap font-bold px-5 pb-3">
                    <SortableIcon
                      fieldName={
                        queryArr.some((obj) => obj.sort !== "id")
                          ? "scheduled_session_name"
                          : "scheduledSessionName"
                      }
                      tableHeading={"SESSION NAME"}
                      handleCheck={SortElements}
                      isSorted={queryArr.some(
                        (obj) =>
                          obj.sort === "scheduled_session_name" ||
                          obj.sort === "schduledSessionName"
                      )}
                    />
                  </th>
                  <th className=" whitespace-nowrap font-bold px-5 pb-3">
                    <SortableIcon
                      fieldName={
                        queryArr.some((obj) => obj.sort !== "id")
                          ? "activity_name"
                          : "activityName"
                      }
                      tableHeading={"ACTIVITY NAME"}
                      handleCheck={SortElements}
                      isSorted={queryArr.some(
                        (obj) =>
                          obj.sort === "activity_name" ||
                          obj.sort === "activityName"
                      )}
                    />
                  </th>
                  <th className=" whitespace-nowrap font-bold px-5 pb-3">
                    <SortableIcon
                      fieldName={"contactNumber"}
                      tableHeading={"CONTACT NUMBER"}
                      handleCheck={SortElements}
                      isSorted={queryArr.some(
                        (obj) =>
                          obj.sort === "contact_number" ||
                          obj.sort === "contactNumber"
                      )}
                    />
                  </th>

                  <th className=" whitespace-nowrap font-bold px-5 pb-3">
                    <SortableIcon
                      fieldName={
                        queryArr.some((obj) => obj.sort !== "id")
                          ? "participant_first_name"
                          : "participantFirstName"
                      }
                      tableHeading={"FIRST NAME"}
                      handleCheck={SortElements}
                      isSorted={queryArr.some(
                        (obj) =>
                          obj.sort === "participant_first_name" ||
                          obj.sort === "participantFirstName"
                      )}
                    />
                  </th>
                  <th className=" whitespace-nowrap font-bold px-5 pb-3">
                    <SortableIcon
                      fieldName={
                        queryArr.some((obj) => obj.sort !== "id")
                          ? "participant_last_name"
                          : "participantLastName"
                      }
                      tableHeading={"LAST NAME"}
                      handleCheck={SortElements}
                      isSorted={queryArr.some(
                        (obj) =>
                          obj.sort === "participant_last_name" ||
                          obj.sort === "participantLastName"
                      )}
                    />
                  </th>
                  <th className=" whitespace-nowrap font-bold px-5 pb-3">
                    <SortableIcon
                      fieldName={
                        queryArr.some((obj) => obj.sort !== "id")
                          ? "date"
                          : "date"
                      }
                      tableHeading={"DATE"}
                      handleCheck={SortElements}
                      isSorted={queryArr.some(
                        (obj) =>
                          obj.sort === "activity_date" ||
                          obj.sort === "activityDate"
                      )}
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                {activityArr.length > 0 ? (
                  activityArr.map((item: ActivityData, index) => (
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
                        {item.programName ? (
                          item.programName
                        ) : (
                          <p className="text-gray-500">null</p>
                        )}
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
                        {item.levelName ? (
                          item.levelName
                        ) : (
                          <p className="text-gray-500">null</p>
                        )}
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
                        {item.scheduledSessionName ? (
                          item.scheduledSessionName
                        ) : (
                          <p className="text-gray-500">null</p>
                        )}
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
                        {item.activityName ? (
                          item.activityName
                        ) : (
                          <p className="text-gray-500">null</p>
                        )}
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
                        {item.participantContactNumber ? (
                          item.participantContactNumber
                        ) : (
                          <p className="text-gray-500">null</p>
                        )}
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
                        {item.participantFirstName ? (
                          item.participantFirstName
                        ) : (
                          <p className="text-gray-500">null</p>
                        )}
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
                        {item.participantLastName ? (
                          item.participantLastName
                        ) : (
                          <p className="text-gray-500">null</p>
                        )}
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
                        {item.activityName === "Attendance" ? (
                          item.activityDate
                        ) : (
                          <DateFormatter dateString={item.activityDate} />
                        )}
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

export default Activities;
