import { SERVER_ENDPOINT } from "@/ConfigFetch";
import Sadhana from "@/components/Modules/Information/sadhana/Sadhana";
import React from "react";
import PageNavigation from "@/Utils/Pagination";

async function getSadhana(queryString: string) {
  const response = await fetch(
    `${SERVER_ENDPOINT}/participant-sadhana/filter/?${queryString}`
  );
  if (response.ok) {
    const responseData = await response.json();
    return responseData;
  } else {
    const errorData = await response.json();
    throw errorData;
  }
}

async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const queryString = new URLSearchParams(searchParams).toString();
  const response = await getSadhana(queryString);
  return (
    <div>
      {response.content.length > 0 ? (
        <Sadhana response={response} />
      ) : (
        <div className="h-[350px] flex items-center justify-center font-bold text-xl">
          No Data To Show
        </div>
      )}
      <PageNavigation totalElements={response.totalElements} />
    </div>
  );
}

export default page;
