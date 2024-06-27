"use client";
import { SERVER_ENDPOINT } from "@/ConfigFetch";
import LoadingComponent from "@/Utils/Icons/LoadingComponent";
import { useGlobalState } from "@/Utils/State";
import { POST } from "@/actions/POSTRequests";
import {
  CheckIcon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/16/solid";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { GenericErrorPage } from "./GenericErrorPage";
import { GenericSuccessPage } from "./GenericSuccessPage";

function Rsvp({ response, level }: responseDataFetched<Sessions> | any) {
  const [answer, setAnswer] = useState("");
  const { state, dispatch } = useGlobalState();
  const [rsvpResponse, setRsvpResponse] = useState(false);
  const [Errorr, setErrorr] = useState<{ type: string; message: string } | any>(
    {}
  );
  const [selectedGender, setSelectedGender] = useState("MALE");
  const [errorMessage, setErrorMessage] = useState("");
  const [isOpenWarning, setIsOpenWarning] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [SuccessMessage, setSuccessMessage] = useState("");
  const [ParticipantData, setParticipantData] = useState<
    PariticipantData | any
  >({});
  const [focusMobile, setFocusMobile] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [LatestSession, setLatestSession] = useState<ScheduledSessions | any>(
    {}
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const phoneNumber = localStorage.getItem("PHONE");
    if (phoneNumber) {
      setPhoneNumber(phoneNumber);
    }
  }, []);

  useEffect(() => {
    const future: ScheduledSessions[] = [];
    const past: ScheduledSessions[] = [];
    response?.content?.forEach((session: ScheduledSessions, index: number) => {
      if (new Date(session.startTime) <= new Date()) {
        future.push(session);
      }
    });
    setLatestSession(future[0]);
  }, [response]);

  useEffect(() => {
    if (phoneNumber.length === 10) {
      (async () => {
        try {
          const response = await fetch(
            `/api/participants/phone/${phoneNumber}`
          );
          if (response.ok) {
            const responseData = await response.json();
            setIsOpen(false);
            setParticipantData(responseData.content);
          } else {
            if (response.status === 404) {
              ///consent screen

              setIsOpen(true);
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
        }
      })();
    }
  }, [phoneNumber]);

  useEffect(() => {
    if (ParticipantData?.id && Object.keys(LatestSession).length > 0) {
      (async () => {
        try {
          const response = await fetch(
            `/api/participants/rsvp?participant=${ParticipantData.id}&session=${LatestSession.id}`
          );
          if (response.ok) {
            const responseData = await response.json();
            setRsvpResponse(
              responseData?.content?.rsvp === "YES" ? true : false
            );
          } else {
            if (response.status === 404) {
              console.log(response.statusText);
            }
            const errorData = await response.json();
            console.log(errorData);
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
    }
  }, [dispatch, LatestSession, ParticipantData]);

  async function handleSubmitAttendanceIfNotRegistered(e: FormData) {
    const firstName = e.get("firstName")?.toString();
    const lastName = e.get("lastName")?.toString();
    const contactNumber = phoneNumber;
    const waNumber = phoneNumber;
    const age = e.get("age")?.toString();
    const city = e.get("city")?.toString();
    const RegisterationData = {
      firstName,
      lastName,
      contactNumber,
      waNumber,
      age,
      gender: selectedGender,
      city,
    };
    try {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      const responseRegister = await fetch(`/api/participants/registration`, {
        method: "POST",
        headers,
        body: JSON.stringify(RegisterationData),
      });
      if (!responseRegister.ok) {
        const errorData = await responseRegister.json();
        setIsOpenWarning(true);
        setErrorMessage(errorData.message);
        dispatch({
          type: "SHOW_TOAST",
          payload: { type: "ERROR", message: errorData.message },
        });
        return;
      }
      ///second request to find the participant created
      const responseParticipant = await fetch(
        `/api/participants/phone/${phoneNumber}`
      );
      if (!responseParticipant.ok) {
        const errorData = await responseParticipant.json();
        setIsOpenWarning(true);
        setErrorMessage(errorData.message);
        dispatch({
          type: "SHOW_TOAST",
          payload: {
            type: "ERROR",
            message: errorData.message || errorData.statusText,
          },
        });
      } else {
        const responseData = await responseParticipant.json();
        setParticipantData(responseData.content);
        const formData: any = {
          scheduledSessionId: LatestSession.id,
          participantId: responseData.content.id,
          levelId: Number(level.id),
          programId: level.programId,
        };
        const header = new Headers();
        header.append("Content-Type", "application/json");
        const response = await fetch(`/api/participants/rsvp/mark`, {
          method: "POST",
          headers: header,
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          const responseData = await response.json();
          dispatch({
            type: "SHOW_TOAST",
            payload: { type: "SUCCESS", message: responseData.message },
          });
        } else {
          const errorData = await response.json();
          dispatch({
            type: "SHOW_TOAST",
            payload: { type: "ERROR", message: errorData.message },
          });
        }
      }
    } catch (error: any) {
      localStorage.removeItem("PHONE");
      setIsSuccess(true);
      dispatch({
        type: "SHOW_TOAST",
        payload: { type: "ERROR", message: error.message },
      });
      return;
    }
  }

  async function handleRsvp(e: FormData) {
    // setIsLoading(true);
    const formData: any = {
      scheduledSessionId: LatestSession.id,
      participantId: ParticipantData.id,
      levelId: Number(level.id),
      programId: level.programId,
      scheduledSessionName: LatestSession.name,
      rsvp: answer,
    };

    try {
      const header = new Headers();
      header.append("Content-Type", "application/json");
      const response = await fetch(`/api/participants/rsvp/mark`, {
        method: "POST",
        headers: header,
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const responseData = await response.json();
        dispatch({
          type: "SHOW_TOAST",
          payload: { type: "SUCCESS", message: responseData.message },
        });
      } else {
        const errorData = await response.json();
        dispatch({
          type: "SHOW_TOAST",
          payload: { type: "ERROR", message: errorData.message },
        });
      }
    } catch (error: any) {
      dispatch({
        type: "SHOW_TOAST",
        payload: {
          type: "SUCCESS",
          message: error.message || error.title,
        },
      });
    } finally {
      setIsLoading(false);
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
    <div className="flex lg:flex-row flex-col h-full items-center ">
      <div className="md:h-full">
        <div className="md:ml-20 flex flex-col gap-3 mx-5">
          <h1 className="md:mt-20 mt-10 font-bold md:text-5xl text-4xl">
            RSVP
          </h1>
          <h4>you can confirm you presence for upcomming sessions here</h4>
          <div className="relative font-semibold">
            <div
              className={`absolute top-0 border flex items-center gap-2 px-4 py-1.5 rounded-full text-lg ${
                state.theme.theme === "LIGHT"
                  ? "border-stone-300"
                  : "border-stone-700"
              }`}
            >
              <p>Program :</p> {level?.programName}
            </div>
          </div>
        </div>
        <div className="flex md:h-full lg:w-[50vw] w-full ">
          <div>
            <Image
              src={
                "https://res.cloudinary.com/dko1ffxgt/image/upload/v1712050777/6274-removebg-preview_mt6ysl.png"
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
      <div className="lg:w-[40vw] w-full p-3 max-h-[80vh] overflow-y-auto py-10 custom-scrollbar">
        <div
          className={`w-full px-5 rounded-[40px] py-5 ${
            state.theme.theme === "LIGHT"
              ? "bg-gray-50 bg-opacity-60"
              : "bg-stone-900 bg-opacity-40"
          }`}
        >
          <div className="relative font-semibold">
            <div
              className={`absolute bottom-0 mb-2 border flex items-center gap-2 px-4 py-1.5 rounded-full text-lg ${
                state.theme.theme === "LIGHT"
                  ? "border-stone-300"
                  : "border-stone-700"
              }`}
            >
              <p className="w-max">Course :</p> {level?.name}
            </div>
          </div>
          <form className="w-full">
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
                            : " border-stone-700"
                        }`
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
                    placeholder="9090909090"
                  />
                  {/* <button
                    type="button"

                    className={`text-xl font-semibold ${
                      state.theme.theme === "LIGHT"
                        ? `${isLoading ? "bg-white" : "bg-blue-600"} text-white`
                        : "bg-blue-950"
                    } rounded px-2 py-1`}
                  >
                    {isLoading ? <LoadingComponent /> : "Search"}
                  </button> */}
                </div>

                {Errorr.type === "phoneNumber" ? (
                  <p className="text-red-400">{Errorr.message}</p>
                ) : null}
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
            action={isOpen ? handleSubmitAttendanceIfNotRegistered : handleRsvp}
            className={`transition-all duration-700`}
          >
            {isOpen && (
              <div
                className={`p-2 rounded-xl flex flex-col gap-4 my-4 ${
                  state.theme.theme === "LIGHT" ? "bg-white" : "bg-stone-950"
                }`}
              >
                <p className="text-center font-semibold text-xl text-red-400">
                  Since You&apos;r Not Registered Fill Additional Details
                </p>
                <div className="flex flex-col gap-2">
                  <label htmlFor="firstName" className="font-bold text-lg">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    className={`outline-none w-full border focus:ring-4 py-1.5 px-4  ${
                      state.theme.theme === "LIGHT"
                        ? `bg-white focus:ring-blue-100 focus:border-blue-600 border-gray-400`
                        : `bg-stone-950 focus:border-blue-700 focus:ring-blue-950 border-stone-700`
                    }`}
                    placeholder="John"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="lastName" className="font-bold text-lg">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    className={`outline-none w-full border focus:ring-4 py-1.5 px-4  ${
                      state.theme.theme === "LIGHT"
                        ? `bg-white focus:ring-blue-100 focus:border-blue-600 border-gray-400`
                        : `bg-stone-950 focus:border-blue-700 focus:ring-blue-950 border-stone-700`
                    }`}
                    placeholder="Doe"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="age" className="font-bold text-lg">
                    Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    id="age"
                    className={`outline-none w-full border focus:ring-4 py-1.5 px-4  ${
                      state.theme.theme === "LIGHT"
                        ? `bg-white focus:ring-blue-100 focus:border-blue-600 border-gray-400`
                        : `bg-stone-950 focus:border-blue-700 focus:ring-blue-950 border-stone-700`
                    }`}
                    max={100}
                    min={3}
                    placeholder="43"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="gender" className="font-bold text-lg">
                    Gender
                  </label>
                  <MenuToggleComponent
                    DataArr={["MALE", "FEMALE"]}
                    setSelected={(value) => setSelectedGender(value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="city" className="font-bold text-lg">
                    Where Do You Live In Pune
                  </label>
                  <input
                    name="city"
                    id="city"
                    type="type"
                    className={`outline-none w-full border focus:ring-4 py-1.5 px-4  ${
                      state.theme.theme === "LIGHT"
                        ? `bg-white focus:ring-blue-100 focus:border-blue-600 border-gray-400`
                        : `bg-stone-950 focus:border-blue-700 focus:ring-blue-950 border-stone-700`
                    }`}
                    placeholder="Pune"
                    required
                  />
                </div>
              </div>
            )}
            <div>
              <div className={`text-xl font-bold mx-4`}>
                <p>Future session</p>
                <p className="font-normal text-sm">
                  confirm you presence for future sessions
                </p>
              </div>
              <div
                className={`flex items-center gap-3 px-3 py-2.5 rounded-2xl font-bold text-2xl my-5 ${
                  state.theme.theme === "LIGHT" ? "bg-white" : "bg-stone-950"
                }`}
              >
                <p className=" whitespace-nowrap">Session :</p>
                <p className="mx-5">{LatestSession.name}</p>
              </div>
              <div className="flex items-center gap-5">
                {rsvpResponse ? (
                  <>
                    {isLoading ? (
                      <LoadingComponent />
                    ) : (
                      <button
                        type="submit"
                        onClick={() => setAnswer("NO")}
                        className={`w-full rounded-lg text-xl py-2 ${
                          state.theme.theme === "LIGHT"
                            ? "bg-red-100 text-red-600"
                            : "bg-red-950 text-red-600 bg-opacity-35"
                        }`}
                        disabled={isLoading}
                      >
                        Cancel
                      </button>
                    )}
                  </>
                ) : (
                  <div
                    className={`w-full rounded-lg text-xl py-1.5 flex justify-center ${
                      state.theme.theme === "LIGHT"
                        ? "bg-red-100 text-red-600"
                        : "bg-red-950 text-red-600 bg-opacity-35"
                    }`}
                  >
                    <XMarkIcon className="h-8 w-8" />
                  </div>
                )}
                {rsvpResponse ? (
                  <div
                    className={`w-full rounded-lg text-xl py-1.5 flex justify-center ${
                      state.theme.theme === "LIGHT"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-blue-950 text-blue-600 bg-opacity-25"
                    }`}
                  >
                    <CheckIcon className="h-8 w-8" />
                  </div>
                ) : (
                  <>
                    {isLoading ? (
                      <LoadingComponent />
                    ) : (
                      <button
                        onClick={() => setAnswer("YES")}
                        type="submit"
                        className={`w-full rounded-lg text-xl py-2 ${
                          state.theme.theme === "LIGHT"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-blue-950 text-blue-600 bg-opacity-25"
                        }`}
                        disabled={isLoading}
                      >
                        Confirm
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Rsvp;

function MenuToggleComponent({
  setSelected,
  DataArr,
  position,
}: {
  setSelected: (value: string) => void;
  DataArr: string[];
  position?: string;
}) {
  const [isSelectionOpen, toggleSelection] = useState(false);
  const { state } = useGlobalState();
  const menuRef: any = useRef();
  const [selectedOption, setSelectedOption] = useState("MALE");
  const [modalStyle, setModalStyle] = useState({
    transform: "scale(0.95)",
    opacity: 0,
  });

  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isSelectionOpen) {
      // Open modal animation
      setTimeout(() => {
        setModalStyle({
          transform: "scale(1)",
          opacity: 1,
        });
      }, 50); // Delay the transition slightly for better visual effect
    } else {
      // Close modal animation
      setModalStyle({
        transform: "scale(0.95)",
        opacity: 0,
      });
      setTimeout(() => {
        setIsClosing(false);
      }, 3000); // Adjust this duration according to your transition duration
    }
  }, [isSelectionOpen]);

  const closeModal = useCallback(() => {
    setIsClosing(true);
    toggleSelection(false);
  }, [toggleSelection]);

  // Attach click outside listener
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeModal();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleSelection, closeModal]);
  return (
    <div className="relative inline-block text-left w-full" ref={menuRef}>
      <button
        type="button"
        className={`flex items-center justify-between border px-2 py-1.5 gap-5 w-full focus:ring-4 outline-none focus:border font-semibold ${
          state.theme.theme === "LIGHT"
            ? "border-gray-300 bg-white focus:ring-blue-100 focus:border-blue-600"
            : "border-stone-700 bg-stone-950 focus:ring-blue-950 focus:border-blue-600"
        }`}
        id="options-menu"
        aria-haspopup="true"
        aria-expanded="true"
        onClick={() => toggleSelection(!isSelectionOpen)}
      >
        {selectedOption === "" ? "Select" : selectedOption}
        <ChevronDownIcon className="h-4 w-4" />
      </button>
      {isSelectionOpen && (
        <div
          className={`origin-top-left absolute font-semibold text-lg z-[10000] ${
            position === "up" ? "bottom-0 mb-12" : "mt-2 right-0"
          } w-full rounded-lg shadow-lg ${
            state.theme.theme === "LIGHT"
              ? "bg-white border-gray-300"
              : "bg-stone-900 border border-stone-700"
          } ring-1 ring-black ring-opacity-5 focus:outline-none py-2 px-1`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
          style={{
            ...modalStyle,
            transition: "transform 0.2s ease-out, opacity 0.2s ease-out",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {DataArr?.length > 0 ? (
            <ul
              className={`flex flex-col gap-3 overflow-y-auto h-full custom-scrollbar`}
              role="none"
            >
              {DataArr?.map((item: string, index: number) => (
                <li
                  key={index}
                  onClick={() => {
                    setSelectedOption(item);
                    setSelected(item);
                    toggleSelection(false);
                  }}
                  className={`px-2 py-1.5 rounded-lg ${
                    item === selectedOption && "bg-blue-300"
                  } ${
                    state.theme.theme === "LIGHT"
                      ? "hover:bg-gray-100 "
                      : "hover:bg-stone-700"
                  }`}
                >
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <ul>
              <p>No data to show</p>
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
