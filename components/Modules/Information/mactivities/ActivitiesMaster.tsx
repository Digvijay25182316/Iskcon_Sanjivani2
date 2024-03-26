"use client";
import useWindowDimensions from "@/Utils/Hooks/WindowDimentions";
import { useGlobalState } from "@/Utils/State";
import React, { useEffect, useState } from "react";
import ViewController from "./ViewController";
import LoadingSkeleton from "@/Utils/LoadingSkeleton";
import SortableIcon from "@/Utils/Icons/SortableIcon";
import DateFormatter from "@/Utils/DateFormatter";

function ActivityMaster() {
  const { state, dispatch } = useGlobalState();
  const [ActivitiesArr, setActivitiesArr] = useState([]);
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
        const response = await fetch("/api/admin/information/levels");
        if (response.ok) {
          const responseData = await response.json();
          setActivitiesArr(responseData.content.content);
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
        Activities List
      </h1>
      <div className="my-3">
        <ViewController handleCustomisation={handleCustomisation} />
      </div>
      {isLoading ? (
        <>
          <LoadingSkeleton
            rows={8}
            columns={width < 600 ? 3 : 4}
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
                  <th className=" whitespace-nowrap font-bold pb-3">
                    <SortableIcon
                      fieldName={"name"}
                      tableHeading={"ACTIVITY NAME"}
                      handleCheck={SortElements}
                      isSorted={queryArr.some((obj) => obj.sort === "name")}
                    />
                  </th>
                  <th className=" whitespace-nowrap font-bold pb-3">
                    <SortableIcon
                      fieldName={"programName"}
                      tableHeading={"ACTIVITY DESCRIPTION"}
                      handleCheck={SortElements}
                      isSorted={queryArr.some(
                        (obj) => obj.sort === "programName"
                      )}
                    />
                  </th>
                  <th className=" whitespace-nowrap font-bold pb-3">
                    <SortableIcon
                      fieldName={"coordinator"}
                      tableHeading={"CREATED BY"}
                      handleCheck={SortElements}
                      isSorted={queryArr.some(
                        (obj) => obj.sort === "coordinator"
                      )}
                    />
                  </th>
                  <th className=" whitespace-nowrap font-bold pb-3">
                    <SortableIcon
                      tableHeading={"DATE OF CREATION"}
                      handleCheck={SortElements}
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                {ActivitiesArr.length > 0 ? (
                  ActivitiesArr.map((item: ActivityMaster, index) => (
                    <tr key={index}>
                      <td
                        className={`whitespace-nowrap text-center border-b ${
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
                        className={`whitespace-nowrap text-center border-b ${
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
                        {item.description}
                      </td>
                      <td
                        className={`whitespace-nowrap text-center border-b ${
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
                        {item.createdBy}
                      </td>
                      <td
                        className={`whitespace-nowrap text-center border-b ${
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
                        <DateFormatter dateString={item.created} />
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

export default ActivityMaster;
