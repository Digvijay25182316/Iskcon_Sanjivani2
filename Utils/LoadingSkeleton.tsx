import React from "react";

interface LoadingSkeletonProps {
  rows: number;
  columns: number;
  theme: string; // "LIGHT" or "DARK"
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  rows,
  columns,
  theme,
}) => {
  const renderRows = () => {
    return Array.from({ length: rows }, (_, rowIndex) => (
      <div
        key={rowIndex}
        className={`flex items-center ${
          rowIndex !== rows - 1 ? "border-b border-gray-200" : ""
        } py-4`}
      >
        {renderColumns()}
      </div>
    ));
  };

  const renderColumns = () => {
    return Array.from({ length: columns }, (_, colIndex) => (
      <div
        key={colIndex}
        className={`bg-gray-200 h-8 min-w-32 w-full mr-4 animate-pulse rounded-xl `}
      ></div>
    ));
  };

  return (
    <div
      className={`w-full mx-auto rounded-3xl ${
        theme === "LIGHT" ? "bg-gray-50" : "bg-stone-900"
      } p-4`}
    >
      <div className="overflow-x-auto">
        <div>{renderRows()}</div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
