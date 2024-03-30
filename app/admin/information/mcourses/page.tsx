import { SERVER_ENDPOINT } from "@/ConfigFetch";
import CoursesMaster from "@/components/Modules/Information/mcourses/MasterCourses";
import { unstable_noStore } from "next/cache";
import React from "react";

async function getCourses() {
  unstable_noStore();
  const response = await fetch(`${SERVER_ENDPOINT}/session/`);
  if (response.ok) {
    const responseData = await response.json();
    return responseData;
  } else {
    const errorData = await response.json();
    throw new Error(errorData.message || errorData.statusText);
  }
}

async function page() {
  const response = await getCourses();
  return (
    <div>
      <CoursesMaster response={response} />
    </div>
  );
}

export default page;
