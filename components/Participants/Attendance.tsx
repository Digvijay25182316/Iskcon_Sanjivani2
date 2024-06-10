"use client";
import { SERVER_ENDPOINT } from "@/ConfigFetch";
import LoadingComponent from "@/Utils/Icons/LoadingComponent";
import { useGlobalState } from "@/Utils/State";
import SubmitHandlerButton from "@/Utils/SubmitHandlerButton";
import { POST } from "@/actions/POSTRequests";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
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
import { ConcentScreen } from "./ConcentScreenRegisteration";

function Attendance({ response, level }: responseDataFetched<Sessions> | any) {
  const { state, dispatch } = useGlobalState();
  const { push } = useRouter();
  const [ParticipantData, setParticipantData] = useState<
    PariticipantData | any
  >({});
  const [focusMobile, setFocusMobile] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedActivity, setSelectedActivity] = useState<
    ScheduledSessions | any
  >({});
  const [LatestSession, setLatestSession] = useState<ScheduledSessions | any>(
    {}
  );
  const [recordAttended, setRecordAttended] = useState<ScheduledSessions | any>(
    {}
  );
  const [Errorr, setErrorr] = useState<{ type: string; message: string } | any>(
    {}
  );
  const [PreviousSessions, setPreviousSessions] = useState<
    ScheduledSessions[] | any[]
  >([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const phoneNumber = localStorage.getItem("PHONE");
    if (phoneNumber) {
      setPhoneNumber(phoneNumber);
    }
  }, []);

  useEffect(() => {
    const future: ScheduledSessions[] = [];
    response?.content?.forEach((session: ScheduledSessions, index: number) => {
      if (new Date(session.startTime) <= new Date()) {
        future.push(session);
      }
    });
    setLatestSession(future[0]);
    const previous = future.splice(1);
    setPreviousSessions(previous);
    console.log(previous);
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

  // const handleSubmit = async (e: FormEvent) => {
  //   e.preventDefault();
  //   if (phoneNumber === "") {
  //     dispatch({
  //       type: "SHOW_TOAST",
  //       payload: { type: "ERROR", message: "Enter your phone Number" },
  //     });
  //     return;
  //   } else if (phoneNumber.length < 10) {
  //     dispatch({
  //       type: "SHOW_TOAST",
  //       payload: { type: "ERROR", message: "Enter your phone Number" },
  //     });
  //     return;
  //   }

  //   try {
  //     const response = await fetch(`/api/participants/phone/${phoneNumber}`);
  //     if (response.ok) {
  //       const responseData = await response.json();
  //       setParticipantData(responseData.content);
  //     } else {
  //       if (response.status === 404) {
  //         console.log(
  //           "participant with the phone number does not exists  please register"
  //         );
  //         push("/participants/registeration");
  //         localStorage.setItem("PHONE", phoneNumber);
  //       }
  //       const errorData = await response.json();
  //       dispatch({
  //         type: "SHOW_TOAST",
  //         payload: {
  //           type: "ERROR",
  //           message: errorData.message || errorData.statusText,
  //         },
  //       });
  //     }
  //   } catch (error: any) {
  //     dispatch({
  //       type: "SHOW_TOAST",
  //       payload: { type: "ERROR", message: error.message },
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  async function handleAttedance(e: FormData) {
    const formData: any = {
      scheduledSessionId: recordAttended.id,
      participantId: ParticipantData.id,
      levelId: Number(level.id),
      programId: level.programId,
    };
    try {
      const response = await POST(
        formData,
        `${SERVER_ENDPOINT}/attendance/mark`
      );
      dispatch({
        type: "SHOW_TOAST",
        payload: { type: "SUCCESS", message: response.message },
      });
    } catch (error: any) {
      dispatch({
        type: "SHOW_TOAST",
        payload: { type: "ERROR", message: error.message },
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
    <div className="flex lg:flex-row flex-col h-full items-center ">
      <div className="md:h-full">
        <div className="md:ml-20 flex flex-col gap-3 mx-5">
          <h1 className="md:mt-20 mt-10 font-bold md:text-5xl text-4xl">
            Attendance
          </h1>
          <h4>
            Looks like you have not marked your attendance yet, please do so
          </h4>
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
      <div className="lg:w-[40vw] w-full p-3 ">
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
              <p>Course :</p> {level?.name}
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
                    onClick={handleSubmit}
                    className={`text-xl font-semibold ${
                      state.theme.theme === "LIGHT"
                        ? `${isLoading ? "bg-white" : "bg-blue-600"} text-white`
                        : "bg-blue-950"
                    } rounded px-2 py-1`}
                  >
                    {isLoading ? <LoadingComponent /> : "Search"}
                  </button> */}
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
            action={handleAttedance}
            className={`transition-all duration-700 ${
              Object.keys(ParticipantData).length > 0
                ? "scale-100"
                : "scale-0 h-0"
            }`}
          >
            <div>
              <div className={`text-xl font-bold mx-4`}>
                <p>Latest session</p>
                <p className="font-normal text-sm">
                  select from latest session
                </p>
              </div>
              <label className="flex items-center gap-5 mx-4 py-2 font-bold">
                <input
                  type="radio"
                  name="sessionAttendence"
                  checked={LatestSession.id === recordAttended?.id}
                  onChange={(e) => {
                    setRecordAttended(LatestSession);
                  }}
                  disabled={Object.keys(ParticipantData).length === 0}
                  className="h-6 w-6"
                />
                <p className="text-lg">{LatestSession?.name}</p>
              </label>
            </div>
            <div className="flex items-center gap-5 px-5">
              <p
                className={`w-[50%] border ${
                  state.theme.theme === "LIGHT"
                    ? "border-gray-400"
                    : "border-stone-700"
                }`}
              ></p>
              <p
                className={`font-bold ${
                  state.theme.theme === "LIGHT"
                    ? "text-gray-600"
                    : "text-stone-600"
                }`}
              >
                OR
              </p>
              <p
                className={`w-[50%] border ${
                  state.theme.theme === "LIGHT"
                    ? "border-gray-400"
                    : "border-stone-700"
                }`}
              ></p>
            </div>
            <div>
              <div className={`text-xl font-bold mx-4`}>
                <p>Previous sessions</p>
                <p className="font-normal text-sm">
                  select from previous sessions
                </p>
              </div>
              <div className="my-5 mx-2">
                <MenuOthersDropDown
                  DataArr={PreviousSessions}
                  setSelected={(value: ScheduledSessions) =>
                    setRecordAttended(value)
                  }
                  position="up"
                />
              </div>
            </div>
            <SubmitHandlerButton />
          </form>
        </div>
      </div>
      <ConcentScreen
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      />
    </div>
  );
}

export default Attendance;

function MenuOthersDropDown({
  setSelected,
  DataArr,
  defaultVal,
  position,
}: {
  setSelected: (value: ScheduledSessions) => void;
  DataArr: ScheduledSessions[];
  defaultVal?: string;
  position?: string;
}) {
  const [isSelectionOpen, toggleSelection] = useState(false);
  const { state } = useGlobalState();
  const menuRef: any = useRef();
  const [selectedOption, setSelectedOption] = useState("");
  const [modalStyle, setModalStyle] = useState({
    transform: "scale(0.95)",
    opacity: 0,
  });
  useEffect(() => {
    if (defaultVal) {
      setSelectedOption(defaultVal);
    }
  }, [defaultVal]);
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
        className={`flex items-center justify-between border px-2 py-2 rounded-xl gap-5 w-full focus:ring-4 outline-none focus:border font-semibold ${
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
          } ring-1 ring-black ring-opacity-5 focus:outline-none py-1 px-1`}
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
              className={`flex flex-col gap-3 overflow-y-auto ${
                DataArr.length > 10
                  ? "md:h-[40vh] h-[60vh]"
                  : "h-[40vh] custom-scrollbar"
              }`}
              role="none"
            >
              {DataArr?.map((item: ScheduledSessions, index: number) => (
                <li
                  key={index}
                  onClick={() => {
                    setSelectedOption(item.name);
                    setSelected(item);
                    toggleSelection(false);
                  }}
                  className={`px-2 py-1.5 rounded-lg ${
                    item.name === selectedOption && "bg-blue-300"
                  } ${
                    state.theme.theme === "LIGHT"
                      ? "hover:bg-gray-100 "
                      : "hover:bg-stone-700"
                  }`}
                >
                  {item.name}
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
