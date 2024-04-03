import { SERVER_ENDPOINT } from "@/ConfigFetch";
import SadhanaForm from "@/components/Participants/Sadhana";
import React from "react";

async function getProgram(programId: string) {
  const response = await fetch(`${SERVER_ENDPOINT}/program/id/${programId}`);
  if (response.ok) {
    const responseData = await response.json();
    return responseData;
  } else {
    const errorData = await response.json();
    throw new Error(errorData.message || errorData.statusText);
  }
}

async function page({ params }: { params: { programid: string } }) {
  const response = await getProgram(params.programid);
  return (
    <div>
      <SadhanaForm />
    </div>
  );
}

export default page;
