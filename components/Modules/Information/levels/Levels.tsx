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
import { HidableColumns } from "@/Utils/TableUtils/HidableColumns";

// interface LevelsProps<T> {
//   response: LevelsData[];
// }
// { response }: LevelsProps<LevelsData[]>

function Levels() {
  const { state, dispatch } = useGlobalState();
  const [levelsArr, setLevelsArr] = useState([]);
  const [columnNamesArr, setColumnNamesArr] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { width } = useWindowDimensions();
  const [expandedRow, setExpandedRow] = useState<number>(-1);
  const [queryArr, setQueryArr] = useState([
    { page: 0 },
    { size: 10 }, // a default page size
    { sort: "id" },
  ]);
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
    <div className={`min-h-screen px-2`}>
      <div className="my-3">
        <ViewController
          handleCustomisation={handleCustomisation}
          options={columnNamesArr}
          handleHidables={handleAddItemToColumnNameArr}
          columnNames={[
            { columnName: "COURSE NAME", field: "Course_Name_Level" },
            { columnName: "PROGRAM NAME", field: "Program_Name_Level" },
            { columnName: "COORDINATOR", field: "Coordinator_Level" },
            { columnName: "MENTOR", field: "Mentor_Level" },
            { columnName: "PREACHER1", field: "Preacher1_Level" },
            { columnName: "PREACHER2", field: "Preacher2_Level" },
            { columnName: "STATUS", field: "Status_Level" },
          ]}
        />
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
          className={`w-full rounded-3xl ${
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
                  <HidableColumns
                    isColumnHeader={true}
                    stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                    columnNamesArray={columnNamesArr}
                    ColumnToHide="Course_Name_Level"
                  >
                    <SortableIcon
                      fieldName={"name"}
                      tableHeading={"COURSE NAME"}
                      handleCheck={SortElements}
                      isSorted={queryArr.some((obj) => obj.sort === "name")}
                    />
                  </HidableColumns>
                  <HidableColumns
                    isColumnHeader={true}
                    stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                    columnNamesArray={columnNamesArr}
                    ColumnToHide="Program_Name_Level"
                  >
                    <SortableIcon
                      fieldName={"programName"}
                      tableHeading={"PROGRAM NAME"}
                      handleCheck={SortElements}
                      isSorted={queryArr.some(
                        (obj) => obj.sort === "programName"
                      )}
                    />
                  </HidableColumns>
                  <HidableColumns
                    isColumnHeader={true}
                    stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                    columnNamesArray={columnNamesArr}
                    ColumnToHide="Coordinator_Level"
                  >
                    <SortableIcon
                      fieldName={"coordinator"}
                      tableHeading={"COORDINATOR"}
                      handleCheck={SortElements}
                      isSorted={queryArr.some(
                        (obj) => obj.sort === "coordinator"
                      )}
                    />
                  </HidableColumns>
                  <HidableColumns
                    isColumnHeader={true}
                    stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                    columnNamesArray={columnNamesArr}
                    ColumnToHide="Mentor_Level"
                  >
                    <SortableIcon
                      fieldName={"mentor"}
                      tableHeading={"MENTOR"}
                      handleCheck={SortElements}
                      isSorted={queryArr.some((obj) => obj.sort === "mentor")}
                    />
                  </HidableColumns>
                  <HidableColumns
                    isColumnHeader={true}
                    stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                    columnNamesArray={columnNamesArr}
                    ColumnToHide="Preacher1_Level"
                  >
                    <SortableIcon
                      fieldName={"preacher1"}
                      tableHeading={"PREACHER1"}
                      handleCheck={SortElements}
                      isSorted={queryArr.some(
                        (obj) => obj.sort === "preacher1"
                      )}
                    />
                  </HidableColumns>
                  <HidableColumns
                    isColumnHeader={true}
                    stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                    columnNamesArray={columnNamesArr}
                    ColumnToHide="Preacher2_Level"
                  >
                    <SortableIcon
                      fieldName={"preacher2"}
                      tableHeading={"PREACHER2"}
                      handleCheck={SortElements}
                      isSorted={queryArr.some(
                        (obj) => obj.sort === "preacher2"
                      )}
                    />
                  </HidableColumns>
                  <HidableColumns
                    isColumnHeader={true}
                    stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                    columnNamesArray={columnNamesArr}
                    ColumnToHide="Status_Level"
                  >
                    <SortableIcon
                      fieldName={"status"}
                      tableHeading={"STATUS"}
                      handleCheck={SortElements}
                      isSorted={queryArr.some((obj) => obj.sort === "status")}
                    />
                  </HidableColumns>
                  <HidableColumns
                    ColumnToHide=""
                    isColumnHeader={true}
                    stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                    columnNamesArray={columnNamesArr}
                  >
                    ATTENDANCE LINK
                  </HidableColumns>
                  <HidableColumns
                    ColumnToHide=""
                    isColumnHeader={true}
                    stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                    columnNamesArray={columnNamesArr}
                  >
                    ACTIVITIES LINK
                  </HidableColumns>
                  <HidableColumns
                    ColumnToHide=""
                    isColumnHeader={true}
                    stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                    columnNamesArray={columnNamesArr}
                  >
                    SADHANA LINK
                  </HidableColumns>
                </tr>
              </thead>
              <tbody>
                {levelsArr.length > 0 ? (
                  levelsArr.map((item: LevelsData, index) => (
                    <React.Fragment key={index}>
                      <tr onClick={() => toggleRow(index)}>
                        <HidableColumns
                          ColumnToHide="Course_Name_Level"
                          isColumnHeader={false}
                          columnNamesArray={columnNamesArr}
                          stylesClassNames={`text-center ${
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
                        </HidableColumns>
                        <HidableColumns
                          ColumnToHide="Program_Name_Level"
                          isColumnHeader={false}
                          columnNamesArray={columnNamesArr}
                          stylesClassNames={`text-center ${
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
                        </HidableColumns>
                        <HidableColumns
                          ColumnToHide="Coordinator_Level"
                          isColumnHeader={false}
                          columnNamesArray={columnNamesArr}
                          stylesClassNames={`text-center ${
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
                        </HidableColumns>
                        <HidableColumns
                          ColumnToHide="Mentor_Level"
                          isColumnHeader={false}
                          columnNamesArray={columnNamesArr}
                          stylesClassNames={`text-center ${
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
                        </HidableColumns>
                        <HidableColumns
                          ColumnToHide="Preacher1_Level"
                          isColumnHeader={false}
                          columnNamesArray={columnNamesArr}
                          stylesClassNames={`text-center ${
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
                        </HidableColumns>
                        <HidableColumns
                          ColumnToHide="Preacher2_Level"
                          isColumnHeader={false}
                          columnNamesArray={columnNamesArr}
                          stylesClassNames={`text-center ${
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
                        </HidableColumns>
                        <HidableColumns
                          ColumnToHide="Status_Level"
                          isColumnHeader={false}
                          columnNamesArray={columnNamesArr}
                          stylesClassNames={`text-center ${
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
                        </HidableColumns>
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
