import { SERVER_ENDPOINT } from "@/ConfigFetch";
import Attendance from "@/components/Participants/Attendance";
import Rsvp from "@/components/Participants/Rsvp";
import React from "react";

async function getScheduledSessions(levelId: string) {
  const response = await fetch(
    `${SERVER_ENDPOINT}/session/scheduled/level/${levelId}?sort=startTime,desc`
  );
  if (response.ok) {
    const responseData = await response.json();
    return responseData;
  } else {
    const errorData = await response.json();
    throw new Error(errorData.message || errorData.statusText);
  }
}
async function getLevel(levelId: string) {
  const response = await fetch(`${SERVER_ENDPOINT}/level/id/${levelId}`);
  if (response.ok) {
    const responseData = await response.json();
    return responseData;
  } else {
    const errorData = await response.json();
    throw new Error(errorData.message || errorData.statusText);
  }
}

async function page({ params }: { params: { levelid: string } }) {
  const response = await getScheduledSessions(params.levelid);
  const responseLevel = await getLevel(params.levelid);

  return (
    <div>
      <Rsvp response={response} level={responseLevel} />
    </div>
  );
}

export default page;
