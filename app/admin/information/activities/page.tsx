import { SERVER_ENDPOINT } from "@/ConfigFetch";
import Activities from "@/components/Modules/Information/activities/Activities";
import { unstable_noStore } from "next/cache";
import React from "react";

async function getActivities() {
  unstable_noStore();
  const response = await fetch(
    `${SERVER_ENDPOINT}/participant-activity/filter/`
  );
  if (response.ok) {
    const responseData = await response.json();
    return responseData;
  } else {
    const errorData = await response.json();
    throw new Error(errorData.message || errorData.statusText);
  }
}

async function page() {
  const response = await getActivities();
  return (
    <div>
      <Activities response={response} />
    </div>
  );
}

export default page;
