"use client";
import { SERVER_ENDPOINT } from "@/ConfigFetch";
import LoadingComponent from "@/Utils/Icons/LoadingComponent";
import { useGlobalState } from "@/Utils/State";
import { POST } from "@/actions/POSTRequests";
import { CheckIcon, XMarkIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

function Rsvp({ response, level }: responseDataFetched<Sessions> | any) {
  const { state, dispatch } = useGlobalState();
  const { push } = useRouter();
  const [rsvpResponse, setRsvpResponse] = useState(false);
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
    const phoneNumber = localStorage.getItem("phoneNumber");
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

  async function handleRsvp(answer: string) {
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
      const response = await POST(formData, `${SERVER_ENDPOINT}/rsvp/mark`);
      dispatch({
        type: "SHOW_TOAST",
        payload: { type: "SUCCESS", message: response.message },
      });
    } catch (error: any) {
      if (error.message === "This Entry Already exists") {
        dispatch({
          type: "SHOW_TOAST",
          payload: {
            type: "SUCCESS",
            message: "Successfully noted your response",
          },
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

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
              <p className="w-max">Course :</p> {level?.name}
            </div>
          </div>
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
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setPhoneNumber(e.target.value)
                    }
                    maxLength={10}
                    placeholder="9090909090"
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
            onSubmit={(e) => e.preventDefault()}
            className={`transition-all duration-700 ${
              Object.keys(ParticipantData).length > 0
                ? "scale-100"
                : "scale-0 h-0"
            }`}
          >
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
                        onClick={() => handleRsvp("NO")}
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
                        onClick={() => handleRsvp("YES")}
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
