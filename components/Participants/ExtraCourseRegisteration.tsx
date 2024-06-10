"use client";
import { SERVER_ENDPOINT } from "@/ConfigFetch";
import LoadingComponent from "@/Utils/Icons/LoadingComponent";
import { useGlobalState } from "@/Utils/State";
import { POST } from "@/actions/POSTRequests";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { useRouter } from "next/navigation";
import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useFormStatus } from "react-dom";
import { ConcentScreen } from "./ConcentScreenRegisteration";

const ExtraCourseRegisteration: React.FC<
  responseDataFetched<LevelToDisplay>
> = ({ response }) => {
  const { state, dispatch } = useGlobalState();
  const [selectedLevel, setSelectedLevel] = useState<LevelToDisplay | any>({});
  const [isOpen, setIsOpen] = useState(false);
  const [Errorr, setErrorr] = useState<{ type: string; message: string } | any>(
    {}
  );
  const [focusMobile, setFocusMobile] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const { push } = useRouter();
  const [participantData, setParticipantData] = useState<
    PariticipantData | any
  >({});

  useEffect(() => {
    const phoneNumber = localStorage.getItem("PHONE");
    if (phoneNumber) {
      setPhoneNumber(phoneNumber);
    }
  }, []);

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

  async function handleSubmitGeneralRegisteration(e: FormData) {
    const formData: any = {
      participantId: participantData.id,
      levelId: selectedLevel.id,
    };
    try {
      const response = await POST(
        formData,
        `${SERVER_ENDPOINT}/participant-registration/register`
      );
      dispatch({
        type: "SHOW_TOAST",
        payload: { type: "SUCCESS", message: response.message },
      });
    } catch (error: any) {
      dispatch({
        type: "SHOW_TOAST",
        payload: {
          type: "ERROR",
          message: error.message || "something went wrong",
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
    <div className="flex flex-col min-h-screen w-screen items-center">
      <div className="py-10 mx-5">
        <h1 className="text-4xl font-bold">Registeration</h1>
        <h4 className="text-lg">
          Select a program from below that you are interested in
        </h4>
      </div>

      <div
        className={`md:p-5 rounded-[40px] p-4  mx-3 mb-6 ${
          state.theme.theme === "LIGHT"
            ? "bg-gray-50"
            : "bg-stone-900 bg-opacity-30"
        }`}
      >
        <form className="md:w-[400px] w-[80vw]">
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
                    state.theme.theme === "LIGHT" ? "bg-white" : "bg-stone-950"
                  }`}
                  onChange={handleChangePhoneNumber}
                  max={9999999999}
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
              {Errorr.type === "phoneNumber" ? (
                <p className="text-red-400">{Errorr.message}</p>
              ) : null}
            </div>
          </div>
        </form>
        <form action={handleSubmitGeneralRegisteration}>
          <div className="w-full my-5">
            {Object.keys(participantData).length > 0 ? (
              <div>
                <p className="font-extrabold text-2xl ">Hare Krishna!!</p>
                <p className="text-xl font-semibold">{`${participantData.firstName} ${participantData.lastName}`}</p>
              </div>
            ) : null}
          </div>
          <div className="flex flex-col gap-3">
            <label className="font-bold text-xl ">Select Programs</label>
            <MenuOthersDropDown
              DataArr={response.content}
              setSelected={(value: any) => setSelectedLevel(value)}
            />
          </div>
          <div className="mt-10 flex justify-center">
            <SubmitHandlerButton />
          </div>
        </form>
      </div>
      <ConcentScreen
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      />
    </div>
  );
};

export default ExtraCourseRegisteration;

function MenuOthersDropDown({
  setSelected,
  DataArr,
}: {
  setSelected: (value: LevelToDisplay) => void;
  DataArr: LevelToDisplay[];
}) {
  const [isSelectionOpen, toggleSelection] = useState(false);
  const { state } = useGlobalState();
  const menuRef: any = useRef();
  const [selectedOption, setSelectedOption] = useState("");
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
    <div
      className="relative inline-block text-left w-full text-xl"
      ref={menuRef}
    >
      <button
        type="button"
        className={`flex items-center justify-between border px-2 py-2.5 rounded-xl gap-5 w-full focus:ring-4 outline-none focus:border font-semibold text-xl ${
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
          className={`origin-top-left absolute font-semibold text-lg z-[2500] w-full rounded-lg shadow-lg mb-14 bottom-0 ${
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
            <div
              className={`flex flex-col gap-3 overflow-y-auto ${
                DataArr.length > 10
                  ? "md:h-[40vh] h-[60vh]"
                  : "h-[40vh] custom-scrollbar"
              }`}
              role="none"
            >
              {DataArr?.map((item: LevelToDisplay, index: number) => (
                <div
                  key={index}
                  onClick={() => {
                    setSelectedOption(item.name);
                    setSelected(item);
                    toggleSelection(false);
                  }}
                  className={`px-2 py-1.5 rounded-lg flex items-center gap-2 ${
                    item.name === selectedOption && "bg-blue-300"
                  } ${
                    state.theme.theme === "LIGHT"
                      ? "hover:bg-gray-100 "
                      : "hover:bg-stone-700"
                  }`}
                >
                  <p
                    className={`border-r pr-1 ${
                      state.theme.theme === "LIGHT"
                        ? "border-r-gray-300"
                        : "border-r-stone-700"
                    }`}
                  >
                    {item.displayName}
                  </p>
                  {item.sessionTime ? (
                    <p
                      className={`border-r pr-1 ${
                        state.theme.theme === "LIGHT"
                          ? "border-r-gray-300"
                          : "border-r-stone-700"
                      }`}
                    >
                      {formatTime(item.sessionTime)}
                    </p>
                  ) : (
                    <></>
                  )}
                  <p>{item.sessionDay}</p>
                </div>
              ))}
            </div>
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

function formatTime(timeObject: number[]) {
  // Extract hours, minutes, and seconds from the time object
  let [hour, minute] = timeObject;

  // Determine AM or PM
  var suffix = hour >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  hour = hour % 12 || 12;

  // Add leading zero to minutes and seconds if necessary
  minute = Number(minute < 10 ? "0" + minute : minute);

  // Return formatted time string
  return hour + ":" + minute + suffix;
}

function SubmitHandlerButton() {
  const { state } = useGlobalState();
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <div
          className={`text-blue-600 font-semibold text-xl w-full py-2 rounded-xl flex justify-center`}
        >
          <LoadingComponent />
        </div>
      ) : (
        <button
          type="submit"
          className={`max-w-[300px] w-full py-2 text-xl font-bold rounded-xl ${
            state.theme.theme === "LIGHT"
              ? "bg-black text-white"
              : "text-black bg-white"
          }`}
          disabled={pending}
        >
          Submit
        </button>
      )}
    </>
  );
}
