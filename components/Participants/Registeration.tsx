"use client";
import { useGlobalState } from "@/Utils/State";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

function Registeration() {
  const { state } = useGlobalState();
  const [step, setStep] = useState(1);
  function nextHandler() {
    setStep((prev) => prev + 1);
  }
  function prevHandler() {
    setStep((prev) => prev - 1);
  }

  async function handleSubmit(e: FormData) {
    const firstName = e.get("firstName")?.toString();
    const lastName = e.get("lastName")?.toString();
    const contactNumber = e.get("contactNumber")?.toString();
    const waNumber = e.get("waNumber")?.toString();
    if (firstName || lastName || contactNumber || waNumber) {
      console.log(firstName, lastName, contactNumber, waNumber);
    }
  }

  return (
    <div className="flex flex-col min-h-screen w-screen justify-center items-center">
      <div className="py-10">
        <h1 className="text-3xl font-bold">Registeration</h1>
        <h1 className="text-lg">
          Looks like you are not registered please register
        </h1>
      </div>
      <div className="mb-4 md:w-[500px] w-full flex items-center justify-between md:px-0 px-5">
        <p
          className={`font-bold border rounded-full px-3.5 py-1 text-lg ${
            state.theme.theme === "LIGHT"
              ? `border-gray-300  ${
                  step === 1 ? "bg-stone-950 text-white" : "text-black bg-white"
                }`
              : `border-stone-700 ${
                  step === 1
                    ? "text-stone-950 bg-white"
                    : "bg-stone-950 text-white"
                }`
          }`}
        >
          1
        </p>
        <p className="bg-gray-200 border w-full mx-2"></p>
        <p
          className={`font-bold border rounded-full px-3.5 py-1 text-lg ${
            state.theme.theme === "LIGHT"
              ? `border-gray-300  ${
                  step === 2 ? "bg-stone-950 text-white" : "text-black bg-white"
                }`
              : `border-stone-700 ${
                  step === 2
                    ? "text-stone-950 bg-white"
                    : "bg-stone-950 text-white"
                }`
          }`}
        >
          2
        </p>
        <p className="bg-gray-200 border w-full mx-2"></p>
        <p
          className={`font-bold border rounded-full px-3.5 py-1 text-lg ${
            state.theme.theme === "LIGHT"
              ? `border-gray-300  ${
                  step === 3 ? "bg-stone-950 text-white" : "text-black bg-white"
                }`
              : `border-stone-700 ${
                  step === 3
                    ? "text-stone-950 bg-white"
                    : "bg-stone-950 text-white"
                }`
          }`}
        >
          3
        </p>
      </div>
      <div
        className={`md:p-5 rounded-[40px] p-4  mx-3 mb-6 ${
          state.theme.theme === "LIGHT"
            ? "bg-gray-50"
            : "bg-stone-900 bg-opacity-30"
        }`}
      >
        <form className="md:w-[500px]">
          <>
            {step === 1 ? (
              <FirstStep nextStep={nextHandler} />
            ) : step === 2 ? (
              <SecondStep nextStep={nextHandler} prevStep={prevHandler} />
            ) : (
              <ThirdStep prevStep={prevHandler} />
            )}
          </>
        </form>
      </div>
    </div>
  );
}

export default Registeration;

const FirstStep = ({ nextStep }: { nextStep: () => void }) => {
  const { state } = useGlobalState();
  return (
    <>
      <div className="flex flex-col gap-5 w-full">
        <div className="flex md:flex-row flex-col gap-5 w-full">
          <div className="flex flex-col gap-3 w-full">
            <label htmlFor="firstName" className="font-bold text-lg">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              className={`border px-5 py-2.5 text-lg focus:ring-4 outline-none rounded-xl transition-all duration-500 w-full ${
                state.theme.theme === "LIGHT"
                  ? "border-gray-300 focus:ring-blue-100 focus:border-blue-600"
                  : "border-stone-900 focus-ring-blue-950 focus:border-blue-600 bg-stone-950"
              }`}
              id="firstName"
              placeholder="John"
            />
          </div>
          <div className="flex flex-col gap-3 w-full">
            <label htmlFor="lastName" className="font-bold text-lg">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              className={`border px-5 py-2.5 text-lg focus:ring-4 outline-none rounded-xl transition-all duration-500 w-full ${
                state.theme.theme === "LIGHT"
                  ? "border-gray-300 focus:ring-blue-100 focus:border-blue-600"
                  : "border-stone-900 focus-ring-blue-950 focus:border-blue-600 bg-stone-950"
              }`}
              id="lastName"
              placeholder="Doe"
            />
          </div>
        </div>
        <div className="flex md:flex-row flex-col gap-5 w-full">
          <div className="flex flex-col gap-3 w-full">
            <label htmlFor="waNumber" className="font-bold text-lg">
              Whatsapp Number
            </label>
            <input
              type="tel"
              name="waNumber"
              className={`border px-5 py-2.5 text-lg focus:ring-4 outline-none rounded-xl transition-all duration-500 w-full ${
                state.theme.theme === "LIGHT"
                  ? "border-gray-300 focus:ring-blue-100 focus:border-blue-600"
                  : "border-stone-900 focus-ring-blue-950 focus:border-blue-600 bg-stone-950"
              }`}
              id="waNumber"
              placeholder="7379565771"
            />
          </div>
          <div className="flex flex-col gap-3 w-full">
            <label htmlFor="contactNumber" className="font-bold text-lg">
              Contact Number
            </label>
            <input
              type="tel"
              name="contactNumber"
              className={`border px-5 py-2.5 text-lg focus:ring-4 outline-none rounded-xl transition-all duration-500 w-full ${
                state.theme.theme === "LIGHT"
                  ? "border-gray-300 focus:ring-blue-100 focus:border-blue-600"
                  : "border-stone-900 focus-ring-blue-950 focus:border-blue-600 bg-stone-950"
              }`}
              id="contactNumber"
              placeholder="7379565779"
            />
          </div>
        </div>
        <div className="flex md:flex-row flex-col gap-5 w-full">
          <div className="flex flex-col gap-3 w-full">
            <label htmlFor="gender" className="font-bold text-lg">
              Gender
            </label>
            <input
              type="text"
              name="gender"
              className={`border px-5 py-2.5 text-lg focus:ring-4 outline-none rounded-xl transition-all duration-500 w-full ${
                state.theme.theme === "LIGHT"
                  ? "border-gray-300 focus:ring-blue-100 focus:border-blue-600"
                  : "border-stone-900 focus-ring-blue-950 focus:border-blue-600 bg-stone-950"
              }`}
              id="gender"
              placeholder="male/female"
            />
          </div>
          <div className="flex flex-col gap-3 w-full">
            <label htmlFor="dob" className="font-bold text-lg">
              Date Of Birth
            </label>
            <input
              type="date"
              name="dob"
              className={`border px-5 py-2.5 text-lg focus:ring-4 outline-none rounded-xl transition-all duration-500 w-full ${
                state.theme.theme === "LIGHT"
                  ? "border-gray-300 focus:ring-blue-100 focus:border-blue-600"
                  : "border-stone-900 focus-ring-blue-950 focus:border-blue-600 bg-stone-950"
              }`}
              id="dob"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-5 mt-14 w-full">
        <button
          className={`max-w-[300px] w-full py-2 text-xl font-bold rounded-xl ${
            state.theme.theme === "LIGHT"
              ? "bg-black text-white"
              : "text-black bg-white"
          }`}
        >
          Submit
        </button>
        <div className="flex items-center gap-5">
          <p
            className={`border ${
              state.theme.theme === "LIGHT"
                ? "border-gray-300 w-[150px]"
                : "border-stone-700 w-[150px]"
            }`}
          ></p>
          <p className="font-semibold">OR</p>
          <p
            className={`border ${
              state.theme.theme === "LIGHT"
                ? "border-gray-300 w-[150px]"
                : "border-stone-700 w-[150px]"
            }`}
          ></p>
        </div>
        <div className="w-full flex flex-col items-center">
          <p className="text-lg mb-3">
            click on continue to fill more information
          </p>
          <button
            onClick={nextStep}
            type="button"
            className={`max-w-[300px] w-full px-4 py-2 text-xl font-bold rounded-xl flex items-center justify-center ${
              state.theme.theme === "LIGHT"
                ? "bg-black text-white"
                : "text-black bg-white"
            }`}
          >
            Continue
            <ArrowRightIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </>
  );
};

function SecondStep({
  nextStep,
  prevStep,
}: {
  nextStep: () => void;
  prevStep: () => void;
}) {
  const { state } = useGlobalState();
  return (
    <>
      <div className="flex flex-col gap-5 md:w-full w-[85vw]">
        <div className="flex md:flex-row flex-col gap-5 w-full">
          <div className="flex flex-col gap-3 w-full">
            <label htmlFor="email" className="font-bold text-lg">
              Email
            </label>
            <input
              type="email"
              name="email"
              className={`border px-5 py-2.5 text-lg focus:ring-4 outline-none rounded-xl transition-all duration-500 w-full ${
                state.theme.theme === "LIGHT"
                  ? "border-gray-300 focus:ring-blue-100 focus:border-blue-600"
                  : "border-stone-900 focus-ring-blue-950 focus:border-blue-600 bg-stone-950"
              }`}
              id="email"
              placeholder="johndoe@gmail.com"
            />
          </div>
        </div>
        <div className="flex md:flex-row flex-col gap-5 w-full">
          <div className="flex flex-col gap-3 w-full">
            <label htmlFor="education" className="font-bold text-lg">
              Education
            </label>
            <input
              type="text"
              name="education"
              className={`border px-5 py-2.5 text-lg focus:ring-4 outline-none rounded-xl transition-all duration-500 w-full ${
                state.theme.theme === "LIGHT"
                  ? "border-gray-300 focus:ring-blue-100 focus:border-blue-600"
                  : "border-stone-900 focus-ring-blue-950 focus:border-blue-600 bg-stone-950"
              }`}
              id="education"
              placeholder="Graduate"
            />
          </div>
          <div className="flex flex-col gap-3 w-full">
            <label htmlFor="occupation" className="font-bold text-lg">
              Occupation
            </label>
            <input
              type="text"
              name="occupation"
              className={`border px-5 py-2.5 text-lg focus:ring-4 outline-none rounded-xl transition-all duration-500 w-full ${
                state.theme.theme === "LIGHT"
                  ? "border-gray-300 focus:ring-blue-100 focus:border-blue-600"
                  : "border-stone-900 focus-ring-blue-950 focus:border-blue-600 bg-stone-950"
              }`}
              id="occupation"
              placeholder="Doctor"
            />
          </div>
          <div className="flex flex-col gap-3 w-full">
            <label htmlFor="maritalStatus" className="font-bold text-lg">
              Marital Status
            </label>
            <input
              type="text"
              name="maritalStatus"
              className={`border px-5 py-2.5 text-lg focus:ring-4 outline-none rounded-xl transition-all duration-500 w-full ${
                state.theme.theme === "LIGHT"
                  ? "border-gray-300 focus:ring-blue-100 focus:border-blue-600"
                  : "border-stone-900 focus-ring-blue-950 focus:border-blue-600 bg-stone-950"
              }`}
              id="maritalStatus"
              placeholder="married/unmarried"
            />
          </div>
        </div>
        <div className="flex md:flex-row flex-col gap-5 w-full">
          <div className="flex flex-col gap-3 w-full">
            <label htmlFor="address" className="font-bold text-lg">
              Address
            </label>
            <input
              type="text"
              name="address"
              className={`border px-5 py-2.5 text-lg focus:ring-4 outline-none rounded-xl transition-all duration-500 w-full ${
                state.theme.theme === "LIGHT"
                  ? "border-gray-300 focus:ring-blue-100 focus:border-blue-600"
                  : "border-stone-900 focus-ring-blue-950 focus:border-blue-600 bg-stone-950"
              }`}
              id="address"
              placeholder="Iskon NVCC"
            />
          </div>
          <div className="flex flex-col gap-3 w-full">
            <label htmlFor="city" className="font-bold text-lg">
              City
            </label>
            <input
              type="text"
              name="city"
              className={`border px-5 py-2.5 text-lg focus:ring-4 outline-none rounded-xl transition-all duration-500 w-full ${
                state.theme.theme === "LIGHT"
                  ? "border-gray-300 focus:ring-blue-100 focus:border-blue-600"
                  : "border-stone-900 focus-ring-blue-950 focus:border-blue-600 bg-stone-950"
              }`}
              id="city"
              placeholder="Pune"
            />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-5 mt-14 w-full">
        <button
          onClick={prevStep}
          type="button"
          className={`max-w-[300px] md:w-full w-[150px] flex items-center justify-center gap-3 py-2 text-xl font-bold rounded-xl ${
            state.theme.theme === "LIGHT"
              ? "bg-black text-white"
              : "text-black bg-white "
          }`}
        >
          <ArrowLeftIcon className="h-5 w-5" />
          Prev
        </button>

        <button
          onClick={nextStep}
          type="button"
          className={`max-w-[300px] md:w-full w-[150px] px-4 py-2 text-xl font-bold rounded-xl flex items-center justify-center gap-3 ${
            state.theme.theme === "LIGHT"
              ? "bg-black text-white"
              : "text-black bg-white"
          }`}
        >
          Continue
          <ArrowRightIcon className="w-5 h-5" />
        </button>
      </div>
    </>
  );
}

const ThirdStep = ({ prevStep }: { prevStep: () => void }) => {
  const { state } = useGlobalState();
  return (
    <>
      <div className="flex flex-col gap-5 w-full">
        <div className="flex md:flex-row flex-col gap-5 w-full">
          <div className="flex flex-col gap-3 w-full">
            <label htmlFor="reference" className="font-bold text-lg">
              Reference
            </label>
            <input
              type="text"
              name="reference"
              className={`border px-5 py-2.5 text-lg focus:ring-4 outline-none rounded-xl transition-all duration-500 w-full ${
                state.theme.theme === "LIGHT"
                  ? "border-gray-300 focus:ring-blue-100 focus:border-blue-600"
                  : "border-stone-900 focus-ring-blue-950 focus:border-blue-600 bg-stone-950"
              }`}
              id="reference"
              placeholder="friends/collegue/etc."
            />
          </div>
          <div className="flex flex-col gap-3 w-full">
            <label htmlFor="numberOfChildren" className="font-bold text-lg">
              Number Of Children
            </label>
            <input
              type="number"
              name="numberOfChildren"
              className={`border px-5 py-2.5 text-lg focus:ring-4 outline-none rounded-xl transition-all duration-500 w-full ${
                state.theme.theme === "LIGHT"
                  ? "border-gray-300 focus:ring-blue-100 focus:border-blue-600"
                  : "border-stone-900 focus-ring-blue-950 focus:border-blue-600 bg-stone-950"
              }`}
              id="numberOfChildren"
              placeholder="0"
            />
          </div>
        </div>
        <div className="flex flex-col gap-3 w-full">
          <label htmlFor="notes" className="font-bold text-lg">
            Notes
          </label>
          <input
            type="text"
            name="notes"
            className={`border px-5 py-2.5 text-lg focus:ring-4 outline-none rounded-xl transition-all duration-500 w-full ${
              state.theme.theme === "LIGHT"
                ? "border-gray-300 focus:ring-blue-100 focus:border-blue-600"
                : "border-stone-900 focus-ring-blue-950 focus:border-blue-600 bg-stone-950"
            }`}
            id="notes"
            placeholder="write something"
          />
        </div>
      </div>
      <div className="flex flex-col items-center gap-5 mt-14 w-full">
        <button
          className={`max-w-[300px] w-full py-2 text-xl font-bold rounded-xl ${
            state.theme.theme === "LIGHT"
              ? "bg-black text-white"
              : "text-black bg-white"
          }`}
        >
          Submit
        </button>
        <div className="flex items-center gap-5">
          <p
            className={`border ${
              state.theme.theme === "LIGHT"
                ? "border-gray-300 w-[150px]"
                : "border-stone-700 w-[150px]"
            }`}
          ></p>
          <p className="font-semibold">OR</p>
          <p
            className={`border ${
              state.theme.theme === "LIGHT"
                ? "border-gray-300 w-[150px]"
                : "border-stone-700 w-[150px]"
            }`}
          ></p>
        </div>

        <button
          onClick={prevStep}
          type="button"
          className={`max-w-[300px] w-full px-4 py-2 text-xl font-bold rounded-xl flex items-center justify-center gap-3 ${
            state.theme.theme === "LIGHT"
              ? "bg-black text-white"
              : "text-black bg-white"
          }`}
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Prev
        </button>
      </div>
    </>
  );
};
