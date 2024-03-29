import { SERVER_ENDPOINT } from "@/ConfigFetch";
import Volunteers from "@/components/Modules/Information/volunteers/Volunteers";
import { unstable_noStore } from "next/cache";
import React from "react";

async function getVolunteers() {
  unstable_noStore();
  const response = await fetch(`${SERVER_ENDPOINT}/volunteer/`);
  if (response.ok) {
    const responseData = await response.json();
    return responseData;
  } else {
    const errorData = await response.json();
    throw new Error(errorData.message || errorData.statusText);
  }
}

async function page() {
  const response = await getVolunteers();
  return (
    <div>
      <Volunteers response={response} />
    </div>
  );
}

export default page;
