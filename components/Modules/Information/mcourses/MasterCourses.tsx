"use client";
import useWindowDimensions from "@/Utils/Hooks/WindowDimentions";
import { useGlobalState } from "@/Utils/State";
import React, { useEffect, useState } from "react";
import ViewController from "./ViewController";
import LoadingSkeleton from "@/Utils/LoadingSkeleton";
import SessionData from "./SessionData";
import { HidableColumns } from "@/Utils/TableUtils/HidableColumns";

interface PariticipantData {
  firstName: string;
  lastName: string;
  contactNumber: string;
  dob: string;
  gender: string;
}

const CoursesMaster: React.FC<responseDataFetched<Sessions>> = ({
  response,
}) => {
  const { state } = useGlobalState();
  const [columnNamesArr, setColumnNamesArr] = useState<string[]>([]);
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

  return (
    <div className={``}>
      <div className="my-3">
        <ViewController
          handleCustomisation={handleCustomisation}
          columnNames={[
            { columnName: "COURSE NAME", field: "Course_Name_Master" },
            {
              columnName: "COURSE DESCRIPTION",
              field: "Course_Description_Master",
            },
            { columnName: "COURSE CODE", field: "Course_Code_Master" },
            { columnName: "SESSION CODE", field: "Course_Session_Code_Master" },
            { columnName: "SESSION NAME", field: "Course_Session_Name_Master" },
            {
              columnName: "SESSION DESCRIPTION",
              field: "Course_Session_Description_Master",
            },
            {
              columnName: "SESSION DURATION",
              field: "Course_Session_Duration_Master",
            },
          ]}
          handleHidables={handleAddItemToColumnNameArr}
          options={columnNamesArr}
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
                  stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                  columnNamesArray={columnNamesArr}
                  ColumnToHide="Course_Name_Master"
                >
                  COURSE NAME
                </HidableColumns>

                <HidableColumns
                  isColumnHeader={true}
                  stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                  columnNamesArray={columnNamesArr}
                  ColumnToHide="Course_Description_Master"
                >
                  COURSE DESCRIPTION
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                  columnNamesArray={columnNamesArr}
                  ColumnToHide="Course_Code_Master"
                >
                  COURSE CODE
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                  columnNamesArray={columnNamesArr}
                  ColumnToHide="Course_Session_Code_Master"
                >
                  SESSION CODE
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                  columnNamesArray={columnNamesArr}
                  ColumnToHide="Course_Session_Name_Master"
                >
                  SESSION NAME
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                  columnNamesArray={columnNamesArr}
                  ColumnToHide="Course_Session_Description_Master"
                >
                  SESSION DESCRIPTION
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                  columnNamesArray={columnNamesArr}
                  ColumnToHide="Course_Session_Duration_Master"
                >
                  SESSION DURATION
                </HidableColumns>
              </tr>
            </thead>
            <tbody>
              {response.content.length > 0 ? (
                response.content.map((item: Sessions, index) => (
                  <tr key={index}>
                    <HidableColumns
                      ColumnToHide="Course_Name_Master"
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
                      <SessionData
                        coursecode={item.courseCode}
                        fieldName="name"
                      />
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="Course_Description_Master"
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
                      <SessionData
                        coursecode={item.courseCode}
                        fieldName="description"
                      />
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="Course_Code_Master"
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
                      <SessionData
                        coursecode={item.courseCode}
                        fieldName="code"
                      />
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="Course_Session_Code_Master"
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
                      {item.code}
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="Course_Session_Name_Master"
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
                      {item.name}
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="Course_Session_Description_Master"
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
                      {item.description}
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="Course_Session_Duration_Master"
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
                      {item.durationInMinutes}
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

export default CoursesMaster;
