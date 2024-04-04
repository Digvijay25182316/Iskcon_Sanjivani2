import Extracourses from "@/components/Modules/Information/extracourses/ExtraCourses";
import React from "react";
import PageNavigation from "@/Utils/Pagination";

async function getExtraCourses(queryString: string) {
  console.log(queryString);
  return { content: queryString, totalElements: 20 };
}

async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const queryString = new URLSearchParams(searchParams).toString();
  const response = await getExtraCourses(queryString);
  return (
    <div>
      {response?.content?.length > 0 ? (
        <Extracourses />
      ) : (
        <div className="h-[350px] flex items-center justify-center font-bold text-xl">
          No Data To Show
        </div>
      )}
      {response && <PageNavigation totalElements={response?.totalElements} />}
    </div>
  );
}

export default page;
