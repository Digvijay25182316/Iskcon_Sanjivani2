"use client";
import { useGlobalState } from "@/Utils/State";
import React from "react";

function DashboardScreen() {
  const { state, dispatch } = useGlobalState();
  function handleOpen() {
    dispatch({
      type: "SHOW_TOAST",
      payload: {
        type: "SUCCESS",
        message: "you have successfully fired the code",
      },
    });
  }
  return (
    <div>
      <div>DashboardScreen</div>
      <button onClick={handleOpen}>open</button>
    </div>
  );
}

export default DashboardScreen;
