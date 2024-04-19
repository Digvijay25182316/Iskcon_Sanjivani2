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
import CopyClipBoard from "@/Utils/CopyToClipBoard";
import {
  ClipboardDocumentCheckIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/16/solid";
import Modal from "@/Utils/Modal";

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
  const [Errorr, setErrorr] = useState<{ type: string; message: string } | any>(
    {}
  );
  const [ParticipantData, setParticipantData] = useState<
    PariticipantData | any
  >({});
  const [focusMobile, setFocusMobile] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [checkedItems, setCheckedItems] = useState<any[]>([]);
  const date = formatDate(new Date());
  const [SubmittedSuccess, setSubmittedSuccess] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [sadhanaFormData, setSadhanaFormData] = useState("");

  const handleShare = (text: any) => {
    // Encode the message for URL
    let message = `*!!Sadhana Submitted* \n \n *${ParticipantData.firstName}${ParticipantData.lastName}* \n \n`;
    for (const key in text) {
      if (
        Object.hasOwnProperty.call(text, key) &&
        key !== "programId" &&
        key !== "participantId"
      ) {
        message += `*${key}*: ${text[key]}\n`; // Wrapping keys in asterisks for bold formatting
      }
    }
    setSadhanaFormData(message);
  };
  useEffect(() => {
    const phoneNumber = localStorage.getItem("PHONE");
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
    } else if (phoneNumber.length < 10) {
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
      } else {
        if (response.status === 404) {
          console.log(
            "participant with the phone number does not exists  please register"
          );
          push("/participants/registeration");
          localStorage.setItem("PHONE", phoneNumber);
        }
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
      programName: response?.name,
      sadhanaDate: date,
    };
    checkedItems.forEach((value: FieldTypeFormList) => {
      if (value.valueType === "Time") {
        formDataObject[value.databaseField] =
          e.get(value.databaseField)?.toString() + ":00.000000";
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
    setFormData(formDataObject);
    handleShare(formDataObject);
    setSubmittedSuccess(true);
    try {
      const response = await POST(
        formDataObject,
        `${SERVER_ENDPOINT}/participant-sadhana/record`
      );
      dispatch({
        type: "SHOW_TOAST",
        payload: { message: response.message, type: "SUCCESS" },
      });

      handleShare(formDataObject);
      setFormData(formDataObject);
      setSubmittedSuccess(true);
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

  const handleChangePhoneNumber = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isNaN(Number(e.target.value))) {
      if (e.target.value.length > 10) {
        setErrorr({
          type: "phoneNumber",
          message: "phone Number can only contain 10 digits",
        });
        return;
      } else if (e.target.value.length < 10) {
        setErrorr({
          type: "phoneNumber",
          message: "phone Number can only contain 10 digits",
        });
      }
    } else {
      setErrorr({
        type: "phoneNumber",
        message: "invalid type of phonenumber",
      });
      return;
    }
    setPhoneNumber(e.target.value);
  };

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
                    onChange={handleChangePhoneNumber}
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
      <Modal
        isOpen={SubmittedSuccess}
        onClose={() => setSubmittedSuccess(false)}
      >
        <div
          className={`flex flex-col items-center p-5 rounded-[40px] ${
            state.theme.theme === "LIGHT" ? "bg-gray-50" : "bg-stone-900"
          }`}
        >
          <p className="text-red-600 font-bold text-xl">Preview Message</p>
          <div className="p-5 flex flex-col gap-2">
            <p className="font-bold">Sadhana Submitted</p>
            <p className="font-semibold w-full">{`Name : ${ParticipantData.firstName}${ParticipantData.lastName}`}</p>
            <div>
              {Object.keys(formData).map((key) => (
                <p key={key} className="mb-2">
                  <span className="font-bold">{key}:</span> {formData[key]}
                </p>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-5 py-5">
            {" "}
            <button
              onClick={() => {
                const encodedMessage = encodeURIComponent(sadhanaFormData);
                // Construct the shareable link
                const shareableLink = `whatsapp://send?text=${encodedMessage}`;
                // Open the shareable link in a new window
                window.open(shareableLink);
              }}
              className={`flex items-center border px-4 py-1.5 ${
                state.theme.theme === "LIGHT"
                  ? "border-green-400 bg-green-200"
                  : "border-green-900 bg-green-950"
              } px-2 rounded-2xl`}
            >
              Whatsapp
              <i>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="40"
                  height="40"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#fff"
                    d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z"
                  ></path>
                  <path
                    fill="#cfd8dc"
                    d="M24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,4C24.014,4,24.014,4,24.014,4C12.998,4,4.032,12.962,4.027,23.979c-0.001,3.367,0.849,6.685,2.461,9.622l-2.585,9.439c-0.094,0.345,0.002,0.713,0.254,0.967c0.19,0.192,0.447,0.297,0.711,0.297c0.085,0,0.17-0.011,0.254-0.033l9.687-2.54c2.828,1.468,5.998,2.243,9.197,2.244c11.024,0,19.99-8.963,19.995-19.98c0.002-5.339-2.075-10.359-5.848-14.135C34.378,6.083,29.357,4.002,24.014,4L24.014,4z"
                  ></path>
                  <path
                    fill="#40c351"
                    d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"
                  ></path>
                  <path
                    fill="#fff"
                    fillRule="evenodd"
                    d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </i>
            </button>
            copy
            <CopyClipBoard
              url={sadhanaFormData}
              whenCopied={<ClipboardDocumentListIcon className="h-8 w-8" />}
              NotCopied={<ClipboardDocumentCheckIcon className="h-8 w-8" />}
            />
            {/*this is not being used to store the url this is to store the text to share to whatsapp */}
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default SadhanaForm;
