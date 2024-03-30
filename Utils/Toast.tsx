import React, { useEffect } from "react";
import { useGlobalState } from "./State";
import LoadingComponent from "./Icons/LoadingComponent";
import { CheckIcon, XMarkIcon } from "@heroicons/react/16/solid";

function Toast() {
  const { state, dispatch } = useGlobalState();
  useEffect(() => {
    if (state.toast.toast.isVisible) {
      setTimeout(() => {
        dispatch({ type: "HIDE_TOAST" });
      }, 3000);
    }
  }, [state.toast.toast.isVisible, dispatch]);

  return (
    <div
      className={`fixed z-[10000] -top-10 transition-all duration-700 mx-auto lg:left-[35vw] md:left-[30vw] left-[20vw] backdrop-blur-xl border md:w-[400px] w-[250px] rounded-3xl px-4 py-2 text-lg ${
        state.toast.toast.isVisible
          ? "translate-y-full"
          : " -translate-y-full scale-75"
      } ${
        state.theme.theme === "LIGHT"
          ? "border-gray-200 shadow-xl shadow-gray-100 bg-black bg-opacity-20"
          : "border-stone-700 shadow-lg shadow-stone-900 bg-white bg-opacity-20"
      }`}
    >
      {state.toast.toast.type === "LOADING" ? (
        <div className="flex items-center">
          <i>
            <LoadingComponent />
          </i>
          <div className="flex items-center">{state.toast.toast.message}</div>
        </div>
      ) : state.toast.toast.type === "SUCCESS" ? (
        <div className="flex items-center md:gap-5 gap-3 py-1.5">
          <i className="bg-green-600 p-1 rounded-full text-white">
            <CheckIcon className="h-5 w-5" />
          </i>
          <div className="flex items-center">{state.toast.toast.message}</div>
        </div>
      ) : (
        <div className="flex items-center md:gap-5 gap-3 py-1.5">
          <i className="bg-red-600 p-1 rounded-full text-white">
            <XMarkIcon className="h-5 w-5" />
          </i>
          <div className="flex items-center">{state.toast.toast.message}</div>
        </div>
      )}
    </div>
  );
}

export default Toast;
