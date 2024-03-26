"use client";
import React, { useEffect, useState } from "react";

interface HidableProps {
  columnNamesArray: string[];
  ColumnToHide: string;
  children: React.ReactNode;
  isColumnHeader: boolean;
}

function HidableColumns({
  columnNamesArray,
  ColumnToHide,
  children,
  isColumnHeader,
}: HidableProps) {
  const [isHidden, setIsHidden] = useState(false);
  useEffect(() => {
    const hidable = columnNamesArray.some((item) => item === ColumnToHide);
    setIsHidden(hidable);
  }, [columnNamesArray, ColumnToHide]);
  if (isHidden) {
    return;
  } else {
    return <>{isColumnHeader ? <th>{children}</th> : <td>{children}</td>}</>;
  }
}

export default HidableColumns;
