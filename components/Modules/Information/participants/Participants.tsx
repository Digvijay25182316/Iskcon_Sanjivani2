"use client";
import useWindowDimensions from "@/Utils/Hooks/WindowDimentions";
import { useGlobalState } from "@/Utils/State";
import React, { useEffect, useState } from "react";
import ViewController from "./ViewController";
import LoadingSkeleton from "@/Utils/LoadingSkeleton";

interface PariticipantData {
  firstName: string;
  lastName: string;
  contactNumber: string;
  dob: string;
  gender: string;
}

function Participants() {
  const { state, dispatch } = useGlobalState();
  const [participantsArr, setProgramsArr] = useState([]);
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
        const response = await fetch("/api/admin/information/participants");
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
        Participants
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
                    FIRST NAME
                  </th>
                  <th className=" whitespace-nowrap font-bold px-5 pb-3">
                    LAST NAME
                  </th>
                  <th className=" whitespace-nowrap font-bold px-5 pb-3">
                    PHONE
                  </th>
                  <th className=" whitespace-nowrap font-bold px-5 pb-3">
                    DOB
                  </th>
                  <th className=" whitespace-nowrap font-bold px-5 pb-3">
                    GENDER
                  </th>
                </tr>
              </thead>
              <tbody>
                {participantsArr.length > 0 ? (
                  participantsArr.map((item: PariticipantData, index) => (
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
                        {item.firstName}
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
                        {item.lastName}
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
                        {item.contactNumber}
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
                        {item.dob}
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
                        {item.gender}
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

export default Participants;
