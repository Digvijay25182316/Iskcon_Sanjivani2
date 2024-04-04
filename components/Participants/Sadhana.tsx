"use client";
import { SERVER_ENDPOINT } from "@/ConfigFetch";
import LoadingComponent from "@/Utils/Icons/LoadingComponent";
import { useGlobalState } from "@/Utils/State";
import SubmitHandlerButton from "@/Utils/SubmitHandlerButton";
import { POST } from "@/actions/POSTRequests";

function formatDate(date: Date) {
  // Extract day, month, and year components
  const day = date.getDate().toString().padStart(2, "0"); // Ensure two-digit day
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
  const year = date.getFullYear().toString().slice(2); // Get last two digits of the year

  // Format the date as DD-MM-YY
  return `${day}-${month}-${year}`;
}

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  FormListItems,
  NOR as NORComponent,
  EJRB8A as EJRB8AComponent,
  AJRA8A as AJRA8AComponent,
  F8RCT as F8RCTComponent,
  N8RCT as N8RCTComponent,
  WUT as WUTComponent,
  ST as STComponent,
  PBR as PBRComponent,
  BNR as BNRComponent,
  PCH as PCHComponent,
  GCH as GCHComponent,
  CH as CHComponent,
  S as SComponent,
  AA as AAComponent,
  MIU as MIUComponent,
} from "../Modules/Information/programs/sadhana/ConfigSadhanaForm";

interface FieldTypeFormList {
  id: number;
  type: string;
  valueType: string;
  functionName: string;
  databaseField: string;
}

function SadhanaForm({
  response,
  sadhanaForm,
}: responseDataFetched<ProgramsData> | any) {
  const { state, dispatch } = useGlobalState();
  const { push } = useRouter();
  const [ParticipantData, setParticipantData] = useState<
    PariticipantData | any
  >({});
  const [focusMobile, setFocusMobile] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [checkedItems, setCheckedItems] = useState<any[]>([]);
  const date = formatDate(new Date());

  useEffect(() => {
    const phoneNumber = localStorage.getItem("phoneNumber");
    if (phoneNumber) {
      setPhoneNumber(phoneNumber);
    }
  }, []);
  useEffect(() => {
    const filteredArrForChecked = FormListItems.filter(
      (item) => sadhanaForm[item.databaseField] === true
    );
    setCheckedItems(filteredArrForChecked);
  }, [sadhanaForm]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (phoneNumber === "") {
      dispatch({
        type: "SHOW_TOAST",
        payload: { type: "ERROR", message: "Enter your phone Number" },
      });
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(`/api/participants/phone/${phoneNumber}`);
      if (response.ok) {
        const responseData = await response.json();
        setParticipantData(responseData.content);
      } else if (response.status === 404) {
        console.log(
          "participant with the phone number does not exists  please register"
        );
        push("/registeration");
        localStorage.setItem("PHONE", phoneNumber);
      } else {
        const errorData = await response.json();
        dispatch({
          type: "SHOW_TOAST",
          payload: {
            type: "ERROR",
            message: errorData.message || errorData.statusText,
          },
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
  };
  async function handleSubmitSadhana(e: FormData) {
    const formDataObject: any = {
      programId: response?.id,
      participantId: Number(ParticipantData.id),
      sadhanaDate: date,
    };
    checkedItems.forEach((value: FieldTypeFormList) => {
      if (value.valueType === "Time") {
        formDataObject[value.databaseField] =
          e.get(value.databaseField)?.toString() + ":00:000000";
      } else if (value.valueType === "Number") {
        formDataObject[value.databaseField] = Number(
          e.get(value.databaseField)?.toString()
        );
      } else {
        formDataObject[value.databaseField] = e
          .get(value.databaseField)
          ?.toString();
      }
    });
    try {
      const response = await POST(
        formDataObject,
        `${SERVER_ENDPOINT}/participant-sadhana/record`
      );
      dispatch({
        type: "SHOW_TOAST",
        payload: { message: response.message, type: "SUCCESS" },
      });
    } catch (error: any) {
      dispatch({
        type: "SHOW_TOAST",
        payload: {
          message: error.message || "something unexpected happened",
          type: "ERROR",
        },
      });
    }
  }

  return (
    <div className="flex lg:flex-row flex-col min-h-full items-center ">
      <div className="md:h-full lg:fixed top-0">
        <div className="md:ml-20 flex flex-col gap-3 mx-5">
          <h1 className="md:mt-20 mt-10 font-bold md:text-5xl text-4xl">
            Sadhana
          </h1>
          <h4>We are trying to track your spiritual growth</h4>
          <div className="relative font-semibold">
            <div
              className={`absolute top-0 border flex items-center gap-2 px-4 py-1.5 rounded-full text-lg ${
                state.theme.theme === "LIGHT"
                  ? "border-stone-300"
                  : "border-stone-700"
              }`}
            >
              <p>Program :</p> {response?.name}
            </div>
          </div>
        </div>
        <div className="flex md:h-full lg:w-[50vw] w-full lg:ml-20">
          <div>
            <Image
              src={
                "https://res.cloudinary.com/dko1ffxgt/image/upload/v1712141835/5184243-removebg-preview_jebfzg.png"
              }
              alt="attendance"
              height={200}
              width={200}
              className={`"md:w-auto lg:h-[70vh] lg:w-full w-full "`}
              quality={100}
              unoptimized={true}
            />
          </div>
        </div>
      </div>
      <div className="lg:w-[40vw] w-full p-3 lg:ml-[50vw]">
        <div
          className={`w-full px-5 rounded-[40px] py-5 ${
            state.theme.theme === "LIGHT"
              ? "bg-gray-50 bg-opacity-60"
              : "bg-stone-900 bg-opacity-40"
          }`}
        >
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="flex flex-col w-full gap-5">
              <div className="flex flex-col w-full gap-3">
                <label htmlFor="Phone_Number" className="font-bold md:text-xl">
                  Phone Number
                </label>
                <div
                  onFocus={() => setFocusMobile(true)}
                  onBlur={() => setFocusMobile(false)}
                  className={`border ${
                    focusMobile && "ring-4"
                  } py-1 px-1 text-lg rounded w-full transition-all duration-500 flex items-center ${
                    state.theme.theme === "LIGHT"
                      ? `bg-white ${
                          focusMobile
                            ? "ring-blue-100 border-blue-600"
                            : "border-gray-400"
                        } `
                      : `bg-stone-950  ${
                          focusMobile
                            ? "border-blue-700 ring-blue-950"
                            : "border-stone-700"
                        } `
                  }`}
                >
                  <input
                    type="tel"
                    id="Phone_Number"
                    value={phoneNumber}
                    className={`outline-none w-full ${
                      state.theme.theme === "LIGHT"
                        ? "bg-white"
                        : "bg-stone-950"
                    }`}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setPhoneNumber(e.target.value)
                    }
                    maxLength={10}
                  />
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className={`text-xl font-semibold ${
                      state.theme.theme === "LIGHT"
                        ? `${isLoading ? "bg-white" : "bg-blue-600"} text-white`
                        : "bg-blue-950"
                    } rounded px-2 py-1`}
                  >
                    {isLoading ? <LoadingComponent /> : "Search"}
                  </button>
                </div>
              </div>
            </div>
          </form>
          <div className="w-full my-5">
            {Object.keys(ParticipantData).length > 0 ? (
              <div>
                <p className="font-extrabold text-2xl ">Hare Krishna!!</p>
                <p className="text-xl font-semibold">{`${ParticipantData.firstName} ${ParticipantData.lastName}`}</p>
              </div>
            ) : null}
          </div>
          <form
            action={handleSubmitSadhana}
            className={`transition-all duration-700 ${
              Object.keys(ParticipantData).length > 0
                ? "scale-100"
                : "scale-0 h-0"
            }`}
          >
            <div className="flex flex-col gap-5 mb-5">
              {checkedItems.map((item, index) => {
                switch (item.functionName) {
                  case "NOR":
                    return (
                      <NORComponent key={index} label={"Number of Rounds "} />
                    );
                  case "EJRB8A":
                    return (
                      <EJRB8AComponent
                        key={index}
                        label={"Early Japa rounds before 8 AM "}
                      />
                    );
                  case "AJRA8A":
                    return (
                      <AJRA8AComponent
                        key={index}
                        label={"Early Japa rounds after 8 AM "}
                      />
                    );
                  // Add cases for other function names as needed
                  case "F8RCT":
                    return (
                      <F8RCTComponent
                        key={index}
                        label={"First 8 rounds completed time "}
                      />
                    );
                  case "N8RCT":
                    return (
                      <N8RCTComponent
                        key={index}
                        label={"Next 8 rounds completed time "}
                      />
                    );
                  case "WUT":
                    return <WUTComponent key={index} label={"Wake up time "} />;
                  case "ST":
                    return <STComponent key={index} label={"Sleep time "} />;
                  case "PBR":
                    return (
                      <PBRComponent
                        key={index}
                        label={"Prabhupada Book Reading "}
                      />
                    );
                  case "BNR":
                    return (
                      <BNRComponent key={index} label={"Book Name Reading"} />
                    );
                  case "PCH":
                    return (
                      <PCHComponent
                        key={index}
                        label={"Prabhupada Class Hearing "}
                      />
                    );
                  case "GCH":
                    return (
                      <GCHComponent key={index} label={"Guru Class Hearing "} />
                    );
                  case "CH":
                    return <CHComponent key={index} label={"Class Hearing "} />;
                  case "S":
                    return <SComponent key={index} label={"Speaker "} />;
                  case "AA":
                    return (
                      <AAComponent
                        key={index}
                        onChange={(value) => console.log(value)}
                        label={"Attended Arthi"}
                      />
                    );
                  case "MIU":
                    return (
                      <MIUComponent
                        key={index}
                        label={"Mobile/Internet-Usage"}
                      />
                    );
                  // Add more cases as needed
                  default:
                    return null;
                }
              })}
            </div>
            <SubmitHandlerButton />
          </form>
        </div>
      </div>
    </div>
  );
}

export default SadhanaForm;
