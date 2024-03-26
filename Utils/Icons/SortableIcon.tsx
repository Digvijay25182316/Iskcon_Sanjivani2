import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import React from "react";
interface SortableProp {
  fieldName?: string;
  tableHeading: string;
  handleCheck: (value: string) => void;
  isSorted?: boolean;
}

function SortableIcon({
  fieldName,
  tableHeading,
  handleCheck,
  isSorted,
}: SortableProp) {
  return (
    <span
      className={`flex items-center justify-center relative cursor-pointer ${
        isSorted ? "text-blue-600" : ""
      }`}
    >
      <p>{tableHeading}</p>
      <button onClick={() => (fieldName ? handleCheck(fieldName) : "")}>
        <ChevronUpDownIcon className="h-4 w-4" />
      </button>
    </span>
  );
}

export default SortableIcon;
