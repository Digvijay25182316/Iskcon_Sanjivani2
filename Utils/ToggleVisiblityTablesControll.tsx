"use client";
import { useEffect, useState } from "react";

interface hidablesProp {
  children: string;
  fieldName: string;
  columnNameArr: string[];
}

export function HidableColumns({
  children,
  fieldName,
  columnNameArr,
}: hidablesProp) {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    setIsHidden(columnNameArr.includes(fieldName));
  }, [columnNameArr, fieldName]);

  return !isHidden ? <td className="text-center">{children}</td> : null;
}
export function HidableColumnsHeader({
  children,
  fieldName,
  columnNameArr,
}: hidablesProp) {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    setIsHidden(columnNameArr.includes(fieldName));
  }, [columnNameArr, fieldName]);

  return !isHidden ? (
    <th className="border-b px-6 font-semibold py-1">{children}</th>
  ) : null;
}
