"use client";
import useWindowDimensions from "@/Utils/Hooks/WindowDimentions";
import { useGlobalState } from "@/Utils/State";
import React, { useState } from "react";
import ViewController from "./ViewController";
import SortableIcon from "@/Utils/Icons/SortableIcon";
import DateFormatter from "@/Utils/DateFormatter";
import { HidableColumns } from "@/Utils/TableUtils/HidableColumns";

const ActivityMaster: React.FC<responseDataFetched<ActivityMaster>> = ({
  response,
}) => {
  const { state, dispatch } = useGlobalState();

  const [columnNamesArr, setColumnNamesArr] = useState<string[]>([]);
  const { width } = useWindowDimensions();
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
    <div className={`px-2`}>
      <div className="my-3 flex items-center justify-between">
        <div></div>
        <div className="flex items-center gap-5">
          <button
            className={`my-3 px-4 py-2 text-lg rounded-xl font-semibold ${
              state.theme.theme === "LIGHT"
                ? "bg-blue-50 text-blue-500"
                : "bg-blue-950 bg-opacity-40 text-blue-300"
            }`}
            onClick={() => console.log(true)}
          >
            + Activity
          </button>
          <ViewController
            handleHidables={handleAddItemToColumnNameArr}
            options={columnNamesArr}
            handleCustomisation={handleCustomisation}
            columnNames={[
              { columnName: "ACTIVITY NAME", field: "ACTIVITY_NAME" },
              {
                columnName: "ACTIVITY DESCRIPTION",
                field: "ACTIVITY_DESCRIPTION",
              },
              {
                columnName: "ACTIVITY CREATEDBY",
                field: "ACTIVITY_CREATEDBY",
              },
              { columnName: "DATE OF CREATION", field: "DATE_OF_CREATION" },
            ]}
          />
        </div>
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
                  stylesClassNames=" whitespace-nowrap font-bold pb-3"
                  columnNamesArray={columnNamesArr}
                  ColumnToHide="ACTIVITY_NAME"
                >
                  <SortableIcon
                    fieldName={"name"}
                    tableHeading={"ACTIVITY NAME"}
                    isSorted={queryArr.some((obj) => obj.sort === "name")}
                  />
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  stylesClassNames=" whitespace-nowrap font-bold pb-3"
                  columnNamesArray={columnNamesArr}
                  ColumnToHide="ACTIVITY_DESCRIPTION"
                >
                  <SortableIcon
                    fieldName={"programName"}
                    tableHeading={"ACTIVITY DESCRIPTION"}
                    isSorted={queryArr.some(
                      (obj) => obj.sort === "programName"
                    )}
                  />
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  stylesClassNames=" whitespace-nowrap font-bold pb-3"
                  columnNamesArray={columnNamesArr}
                  ColumnToHide="ACTIVITY_CREATEDBY"
                >
                  <SortableIcon
                    fieldName={"coordinator"}
                    tableHeading={"CREATED BY"}
                    isSorted={queryArr.some(
                      (obj) => obj.sort === "coordinator"
                    )}
                  />
                </HidableColumns>
                <HidableColumns
                  isColumnHeader={true}
                  stylesClassNames=" whitespace-nowrap font-bold pb-3"
                  columnNamesArray={columnNamesArr}
                  ColumnToHide="DATE_OF_CREATION"
                >
                  <SortableIcon
                    tableHeading={"DATE OF CREATION"}
                    isSorted={queryArr.some((obj) => obj.sort === "created")}
                  />
                </HidableColumns>
              </tr>
            </thead>
            <tbody>
              {response.content.length > 0 ? (
                response.content.map((item: ActivityMaster, index) => (
                  <tr key={index}>
                    <HidableColumns
                      ColumnToHide="ACTIVITY_NAME"
                      isColumnHeader={false}
                      columnNamesArray={columnNamesArr}
                      stylesClassNames={`whitespace-nowrap text-center border-b ${
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
                      ColumnToHide="ACTIVITY_DESCRIPTION"
                      isColumnHeader={false}
                      columnNamesArray={columnNamesArr}
                      stylesClassNames={`whitespace-nowrap text-center border-b ${
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
                      ColumnToHide="ACTIVITY_CREATEDBY"
                      isColumnHeader={false}
                      columnNamesArray={columnNamesArr}
                      stylesClassNames={`whitespace-nowrap text-center border-b ${
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
                    </HidableColumns>
                    <HidableColumns
                      ColumnToHide="DATE_OF_CREATION"
                      isColumnHeader={false}
                      columnNamesArray={columnNamesArr}
                      stylesClassNames={`whitespace-nowrap text-center border-b ${
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

export default ActivityMaster;
