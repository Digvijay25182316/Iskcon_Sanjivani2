import { SERVER_ENDPOINT } from "@/ConfigFetch";
import Activities from "@/components/Participants/Activities";
import Attendance from "@/components/Participants/Attendance";
import Rsvp from "@/components/Participants/Rsvp";
import React from "react";

async function getActivities() {
  const response = await fetch(`${SERVER_ENDPOINT}/activity/`);
  if (response.ok) {
    const responseData = await response.json();
    return responseData;
  } else {
    const errorData = await response.json();
    throw new Error(errorData.message || errorData.statusText);
  }
}
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
  const responseActivity = await getActivities();

  return (
    <div>
      <Activities response={response} activity={responseActivity} />
    </div>
  );
}

export default page;
