import { SERVER_ENDPOINT } from "@/ConfigFetch";
import Activities from "@/components/Modules/Information/activities/Activities";
import { unstable_noStore } from "next/cache";
import React from "react";
import PageNavigation from "@/Utils/Pagination";

async function getActivities(queryString: string) {
  unstable_noStore();
  const response = await fetch(
    `${SERVER_ENDPOINT}/participant-activity/filter/?${queryString}`
  );
  if (response.ok) {
    const responseData = await response.json();
    return responseData;
  } else {
    const errorData = await response.json();
    throw new Error(errorData.message || errorData.statusText);
  }
}

async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const queryString = new URLSearchParams(searchParams).toString();
  const response = await getActivities(queryString);
  return (
    <div>
      {response.content.length > 0 ? (
        <Activities response={response} />
      ) : (
        <div className="h-[350px] flex items-center justify-center font-bold text-xl">
          No Data To Show
        </div>
      )}
      {response && <PageNavigation totalElements={response.totalElements} />}
    </div>
  );
}

export default page;
