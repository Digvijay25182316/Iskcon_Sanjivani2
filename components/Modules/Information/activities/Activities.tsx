"use client";
import useWindowDimensions from "@/Utils/Hooks/WindowDimentions";
import { useGlobalState } from "@/Utils/State";
import React, { useEffect, useState } from "react";
import ViewController from "./ViewController";
import LoadingSkeleton from "@/Utils/LoadingSkeleton";
import SortableIcon from "@/Utils/Icons/SortableIcon";
import DateFormatter from "@/Utils/DateFormatter";
import { HidableColumns } from "@/Utils/TableUtils/HidableColumns";

const Activities: React.FC<responseDataFetched<ActivityData>> = ({
  response,
}) => {
  const { state } = useGlobalState();
  const [columnNamesArr, setColumnNamesArr] = useState<string[]>([]);

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
  return (
    <div className={`min-h-screen`}>
      <div className="my-3">
        <ViewController
          handleCustomisation={handleCustomisation}
          handleHidables={handleAddItemToColumnNameArr}
          options={columnNamesArr}
          columnNames={[
            { columnName: "PROGRAM NAME", field: "Program_Name_Activity" },
            { columnName: "LEVEL NAME", field: "Level_Name_Activity" },
            {
              columnName: "SESSION NAME",
              field: "Scheduled_Session_Name_Activity",
            },
            {
              columnName: "ACTIVITY NAME",
              field: "Scheduled_Activity_Name_Activity",
            },
            {
              columnName: "CONTACT NUMBER",
              field: "Participant_Contact_Number_Activity",
            },
            {
              columnName: "FIRST NAME",
              field: "Participant_First_Name_Activity",
            },
            {
              columnName: "LAST NAME",
              field: "Participant_Last_Name_Activity",
            },
            { columnName: "DATE", field: "Participant_Date_Activity" },
          ]}
        />
      </div>

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
                <HidableColumns
                  isColumnHeader={true}
                  columnNamesArray={columnNamesArr}
                  stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                  ColumnToHide="Program_Name_Activity"
                >
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
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  columnNamesArray={columnNamesArr}
                  stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                  ColumnToHide="Level_Name_Activity"
                >
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
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  columnNamesArray={columnNamesArr}
                  stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                  ColumnToHide="Scheduled_Session_Name_Activity"
                >
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
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  columnNamesArray={columnNamesArr}
                  stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                  ColumnToHide="Scheduled_Activity_Name_Activity"
                >
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
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  columnNamesArray={columnNamesArr}
                  stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                  ColumnToHide="Participant_Contact_Number_Activity"
                >
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
                </HidableColumns>

                <HidableColumns
                  isColumnHeader={true}
                  columnNamesArray={columnNamesArr}
                  stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                  ColumnToHide="Participant_First_Name_Activity"
                >
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
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  columnNamesArray={columnNamesArr}
                  stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                  ColumnToHide="Participant_Last_Name_Activity"
                >
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
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  columnNamesArray={columnNamesArr}
                  stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                  ColumnToHide="Participant_Date_Activity"
                >
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
                </HidableColumns>
              </tr>
            </thead>
            <tbody>
              {response.content.length > 0 ? (
                response.content.map((item: ActivityData, index) => (
                  <tr key={index}>
                    <HidableColumns
                      ColumnToHide="Program_Name_Activity"
                      isColumnHeader={false}
                      columnNamesArray={columnNamesArr}
                      stylesClassNames={`text-center border-b ${
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
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="Level_Name_Activity"
                      isColumnHeader={false}
                      columnNamesArray={columnNamesArr}
                      stylesClassNames={`text-center border-b ${
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
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="Scheduled_Session_Name_Activity"
                      isColumnHeader={false}
                      columnNamesArray={columnNamesArr}
                      stylesClassNames={`text-center border-b ${
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
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="Scheduled_Activity_Name_Activity"
                      isColumnHeader={false}
                      columnNamesArray={columnNamesArr}
                      stylesClassNames={`text-center border-b ${
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
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="Participant_Contact_Number_Activity"
                      isColumnHeader={false}
                      columnNamesArray={columnNamesArr}
                      stylesClassNames={`text-center border-b ${
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
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="Participant_First_Name_Activity"
                      isColumnHeader={false}
                      columnNamesArray={columnNamesArr}
                      stylesClassNames={`text-center border-b ${
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
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="Participant_Last_Name_Activity"
                      isColumnHeader={false}
                      columnNamesArray={columnNamesArr}
                      stylesClassNames={`text-center border-b ${
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
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="Participant_Date_Activity"
                      isColumnHeader={false}
                      columnNamesArray={columnNamesArr}
                      stylesClassNames={`text-center border-b ${
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
                    </HidableColumns>
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
    </div>
  );
};

export default Activities;
