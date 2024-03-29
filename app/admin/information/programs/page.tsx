import { SERVER_ENDPOINT } from "@/ConfigFetch";
import Programs from "@/components/Modules/Information/programs/Programs";
import { unstable_noStore } from "next/cache";
import React from "react";

async function getProgram() {
  unstable_noStore();
  const response = await fetch(`${SERVER_ENDPOINT}/program/`);
  if (response.ok) {
    const responseData = await response.json();
    return responseData;
  } else {
    const errorData = await response.json();
    throw new Error(errorData.message || errorData.statusText);
  }
}

async function page() {
  const response = await getProgram();
  return (
    <div className="w-full">
      <Programs response={response} />
    </div>
  );
}

export default page;
