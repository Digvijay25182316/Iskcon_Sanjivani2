import { SERVER_ENDPOINT } from "@/ConfigFetch";
import Levels from "@/components/Modules/Information/levels/Levels";
import { unstable_noStore } from "next/cache";
import React from "react";

async function getLevel() {
  unstable_noStore();
  const response = await fetch(`${SERVER_ENDPOINT}/level/`);
  if (response.ok) {
    const responseData = await response.json();
    return responseData;
  } else {
    const errorData = await response.json();
    throw new Error(errorData.message || errorData.statusText);
  }
}

async function page() {
  const response = await getLevel();

  return (
    <div className="w-full">
      <Levels response={response} />
    </div>
  );
}

export default page;
