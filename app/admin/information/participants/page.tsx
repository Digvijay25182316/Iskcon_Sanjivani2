import { SERVER_ENDPOINT } from "@/ConfigFetch";
import Participants from "@/components/Modules/Information/participants/Participants";
import { unstable_noStore } from "next/cache";
import React from "react";

async function getParticipant() {
  unstable_noStore();

  const response = await fetch(`${SERVER_ENDPOINT}/participant/`);
  if (response.ok) {
    const responseData = await response.json();
    return responseData;
  } else {
    const errorData = await response.json();
    throw new Error(errorData.message || errorData.statusText);
  }
}

async function page() {
  const response = await getParticipant();
  return (
    <div>
      <Participants response={response} />
    </div>
  );
}

export default page;
