import { SERVER_ENDPOINT } from "@/ConfigFetch";
import ExtraCourseRegisteration from "@/components/Participants/ExtraCourseRegisteration";
import React from "react";

async function getLevelArr() {
  const response = await fetch(
    `${SERVER_ENDPOINT}/level/new-participant-levels`
  );
  if (response.ok) {
    const responseData = await response.json();
    return responseData;
  } else {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }
}

async function page() {
  const dataArray = await getLevelArr();
  return (
    <div>
      <ExtraCourseRegisteration response={dataArray} />
    </div>
  );
}

export default page;
