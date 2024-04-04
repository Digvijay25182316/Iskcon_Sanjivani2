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

function Activities({
  response,
  activity,
}: responseDataFetched<ProgramsData> | any) {
  const { state, dispatch } = useGlobalState();
  const { push } = useRouter();
  const [ParticipantData, setParticipantData] = useState<
    PariticipantData | any
  >({});
  const [focusMobile, setFocusMobile] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [LatestSession, setLatestSession] = useState<ScheduledSessions | any>(
    {}
  );
  const [selectedActivity, setSelectedActivity] = useState<
    ScheduledSessions | any
  >({});
  const [PreviousSessions, setPreviousSessions] = useState<
    ScheduledSessions[] | any[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const phoneNumber = localStorage.getItem("phoneNumber");
    if (phoneNumber) {
      setPhoneNumber(phoneNumber);
    }
  }, []);

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

  async function handleAttedance(e: FormData) {
    const formData: any = {
      scheduledSessionId: selectedActivity.id,
      participantId: ParticipantData.id,
      programId: response.id,
    };
    try {
      const response = await POST(
        formData,
        `${SERVER_ENDPOINT}/participant-activity/register`
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

  return (
    <div className="flex lg:flex-row flex-col h-full items-center ">
      <div className="md:h-full">
        <div className="md:ml-20 flex flex-col gap-3 mx-5">
          <h1 className="md:mt-20 mt-10 font-bold md:text-5xl text-4xl">
            Activities
          </h1>
          <h4>You have to select service that you are interested in</h4>
          <div className="relative font-semibold">
            <div
              className={`absolute top-0 border flex items-center gap-2 px-4 py-1.5 rounded-full text-lg ${
                state.theme.theme === "LIGHT"
                  ? "border-stone-300 bg-white"
                  : "border-stone-700 bg-stone-950"
              }`}
            >
              <p>Program :</p> {response?.name}
            </div>
          </div>
        </div>
        <div className="flex md:h-full lg:w-[50vw] w-full ">
          <div>
            <Image
              src={
                "https://res.cloudinary.com/dko1ffxgt/image/upload/v1712122185/old-lady-chanting-mantra-on-rudraksh-mala_ed1t6e.png"
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
            action={handleAttedance}
            className={`transition-all duration-700 ${
              Object.keys(ParticipantData).length > 0
                ? "scale-100"
                : "scale-0 h-0"
            }`}
          >
            <div>
              <div className={`text-xl font-bold mx-4`}>
                <p>Select Service</p>
                <p className="font-normal text-sm">
                  Select some services that you are interested in
                </p>
              </div>
              <div className="mt-5 mx-2">
                <MenuOthersDropDown
                  DataArr={activity.content}
                  setSelected={(value: ScheduledSessions) =>
                    setSelectedActivity(value)
                  }
                  position="up"
                />
              </div>
              <div className="flex flex-col gap-3 p-3">
                <label
                  htmlFor="Service_description"
                  className=" text-xl font-bold"
                >
                  Service Description
                </label>
                <textarea
                  className={`border focus:ring-4 transition-all duration-500 outline-none rounded-xl text-lg px-4 py-2 ${
                    state.theme.theme === "LIGHT"
                      ? "focus:ring-blue-100 focus:border-blue-600"
                      : "focus:ring-blue-950 focus:border-blue-600"
                  }`}
                  name="description"
                  id="Service_description"
                  placeholder="write some description"
                />
              </div>
              <div className="flex flex-col gap-3 px-3 w-max mb-5">
                <label htmlFor="Service_Date" className=" text-xl font-bold">
                  Activity Date
                </label>
                <input
                  type="date"
                  className={`border focus:ring-4 transition-all duration-500 outline-none rounded-xl text-lg px-4 py-2 ${
                    state.theme.theme === "LIGHT"
                      ? "focus:ring-blue-100 focus:border-blue-600"
                      : "focus:ring-blue-950 focus:border-blue-600"
                  }`}
                  name="activityDate"
                  id="Service_Date"
                />
              </div>
            </div>
            <SubmitHandlerButton />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Activities;

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
