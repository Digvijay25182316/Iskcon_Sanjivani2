import { SERVER_ENDPOINT } from "@/ConfigFetch";
import Sadhana from "@/components/Modules/Information/sadhana/Sadhana";
import React from "react";

async function getSadhana() {
  const response = await fetch(
    `${SERVER_ENDPOINT}/participant-sadhana/filter/`
  );
  if (response.ok) {
    const responseData = await response.json();
    return responseData;
  } else {
    const errorData = await response.json();
    throw errorData;
  }
}

async function page() {
  const response = await getSadhana();
  return (
    <div>
      <Sadhana response={response} />
    </div>
  );
}

export default page;
