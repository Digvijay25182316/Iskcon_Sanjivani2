import FilterIcon from "@/Utils/Icons/FilterIcon";
import { useGlobalState } from "@/Utils/State";
import { debounce } from "@/Utils/helpers/DebounceFunction";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDebounce } from "use-debounce";

const keysall = [
  "programName",
  "levelName",
  "courseCode",
  "activityName",
  "participantContactNumber",
  "date",
];

const FilterComponent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);

  const [selected, setSelected] = useState<{
    category:
      | "programName"
      | "levelName"
      | "courseCode"
      | "activityName"
      | "participantContactNumber"
      | "date";
  }>({
    category: "programName",
  });
  const { state } = useGlobalState();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        componentRef.current &&
        !componentRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const searchParams = useSearchParams();
  const queryParams = Object.fromEntries(new URLSearchParams(searchParams));
  return (
    <div className="relative" ref={componentRef}>
      <div className="flex justify-end">
        <button
          onClick={() => setIsOpen(true)}
          className={`p-3 rounded-xl ${
            state.theme.theme === "LIGHT"
              ? "bg-blue-50"
              : "bg-blue-900 bg-opacity-40"
          }`}
        >
          <FilterIcon />
        </button>
      </div>
      <div
        className={`fixed top-0 right-0 transition-transform duration-300 transform z-[2500] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div
          className={`m-2 rounded-xl h-[97vh] border md:w-[320px] w-[90vw] overflow-y-auto custom-scrollbar ${
            state.theme.theme === "LIGHT"
              ? "border-gray-100  shadow-2xl bg-white "
              : "border-stone-800 shadow-2xl shadow-black bg-stone-900"
          }`}
        >
          {isOpen && (
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-0 right-0 p-2"
            >
              <XMarkIcon className="h-6 w-6 text-gray-400" />
            </button>
          )}
          <div className="py-4 px-3 w-full flex flex-col">
            <ActionFilter category={selected.category} />
          </div>
          <div className="flex flex-col gap-2">
            <ToggleMenuOptions
              selectedOption={selected.category}
              setSelected={(
                value:
                  | "programName"
                  | "levelName"
                  | "courseCode"
                  | "activityName"
                  | "participantContactNumber"
                  | "date"
              ) => setSelected({ category: value })}
              title="Available categories"
              isActive={false}
              options={[
                {
                  query: "programName",
                  routeName: "Program Name",
                  title: "Program Name",
                },
                {
                  query: "levelName",
                  routeName: "Level Name",
                  title: "Level Name",
                },
                {
                  query: "courseCode",
                  routeName: "Course Code",
                  title: "Course Code",
                },
                {
                  query: "activityName",
                  routeName: "Activity Name",
                  title: "Activity Name",
                },
                {
                  query: "participantContactNumber",
                  routeName: "participant Contact",
                  title: "participant Contact",
                },
                {
                  query: "date",
                  routeName: "Date",
                  title: "Date",
                },
              ]}
              buttonStyles={`flex items-center py-2 my-1 px-1.5 rounded-2xl mx-3`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;

//////////////////////////collected all the filter components in one place to make it easy to maintain which containing different parts as requirements of filter

function ActionFilter({
  category,
}: {
  category:
    | "programName"
    | "levelName"
    | "courseCode"
    | "activityName"
    | "participantContactNumber"
    | "date";
}) {
  const searchParams = useSearchParams();
  const searchUrlParams = Object.fromEntries(new URLSearchParams(searchParams));
  const pathname = usePathname();

  if (category === "programName") {
    return <ProgramNamesSelect />;
  } else if (category === "levelName") {
    return <LevelNameInput />;
  } else if (category === "courseCode") {
    return <CourseCodeInput />;
  } else if (category === "activityName") {
    return <ActivityNameSelect />;
  } else if (category === "participantContactNumber") {
    return <ParticipantContactNumberInput />;
  } else if (category === "date") {
    return <DateInput />;
  }
}

interface MenuProps {
  selectedOption: string;
  isActive: boolean;
  options: Options[];
  title: string;
  buttonStyles: string;
  setSelected: (
    value:
      | "programName"
      | "levelName"
      | "courseCode"
      | "activityName"
      | "participantContactNumber"
      | "date"
  ) => void;
}

interface Options {
  title: string;
  routeName: string;
  query:
    | "programName"
    | "levelName"
    | "courseCode"
    | "activityName"
    | "participantContactNumber"
    | "date";
}

function ToggleMenuOptions({
  selectedOption,
  isActive,
  options,
  title,
  buttonStyles,
  setSelected,
}: MenuProps) {
  const { state } = useGlobalState();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex flex-col">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`${buttonStyles} relative overflow-hidden cursor-pointer font-semibold text-lg ${
          state.theme.theme === "LIGHT"
            ? "bg-blue-50 text-blue-700"
            : "bg-blue-950 text-blue-300 bg-opacity-40"
        }`}
      >
        <div className="flex items-center gap-3">{title}</div>
        <ChevronDownIcon
          className={`h-4 w-4 absolute right-2 transition-transform  ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>
      <div
        className={`transition-all duration-700 ${
          isOpen ? " max-h-80" : "max-h-0"
        } overflow-hidden`}
      >
        {options.map((item, key) => (
          <div key={key} onClick={() => setSelected(item.query)}>
            <div
              className={`${buttonStyles} pl-6 flex items-center gap-3 font-semibold text-lg ${
                selectedOption === item.query
                  ? `${
                      state.theme.theme === "LIGHT"
                        ? "bg-blue-50 text-blue-700"
                        : "bg-blue-950 text-blue-300 bg-opacity-40"
                    }`
                  : `${
                      state.theme.theme === "LIGHT"
                        ? "hover:bg-blue-50 text-black"
                        : "hover:bg-blue-950 text-stone-300"
                    }`
              }`}
            >
              <p>{item.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProgramNamesSelect() {
  const [isSelectionOpen, toggleSelection] = useState(false);
  const [activityArr, setActivityArr] = useState([]);
  const { state } = useGlobalState();
  const menuRef: any = useRef();
  const [selectedOption, setSelectedOption] = useState("");
  const [modalStyle, setModalStyle] = useState({
    transform: "scale(0.95)",
    opacity: 0,
  });
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchUrlParams = Object.fromEntries(new URLSearchParams(searchParams));
  const initialRef = useRef(true);
  const [value] = useDebounce(selectedOption, 500);

  const prevQry: any = {
    ...searchUrlParams,
  };
  const queryStr: any = {
    ...searchUrlParams,
    programName: value,
  };
  const prevQueryString = Object.keys(prevQry)
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(queryStr[key])
    )
    .join("&");
  const queryString = Object.keys(queryStr)
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(queryStr[key])
    )
    .join("&");

  useEffect(() => {
    if (initialRef.current) {
      initialRef.current = false;
      return;
    }
    if (!value) {
      router.push(`${pathname}?${prevQueryString}`);
    } else {
      router.push(`${pathname}?${queryString}`);
    }
  }, [value, router, pathname, queryString, prevQueryString]);

  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`/api/admin/information/programs`);
        if (response.ok) {
          const responseData = await response.json();
          setActivityArr(responseData.content.content);
        } else {
          const errorData = await response.json();
          console.log(errorData);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    if (isSelectionOpen) {
      // Open modal animation
      setTimeout(() => {
        setModalStyle({
          transform: "scale(1)",
          opacity: 1,
        });
      }, 50); // Delay the transition slightly for better visual effect
    } else {
      // Close modal animation
      setModalStyle({
        transform: "scale(0.95)",
        opacity: 0,
      });
      setTimeout(() => {
        setIsClosing(false);
      }, 3000); // Adjust this duration according to your transition duration
    }
  }, [isSelectionOpen]);

  const closeModal = useCallback(() => {
    setIsClosing(true);
    toggleSelection(false);
  }, [toggleSelection]);

  // Attach click outside listener
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeModal();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleSelection, closeModal]);
  return (
    <div className="relative inline-block text-left w-full" ref={menuRef}>
      <button
        type="button"
        className={`flex items-center justify-between border px-2 py-2 rounded-xl gap-5 w-full focus:ring-4 outline-none focus:border font-semibold ${
          state.theme.theme === "LIGHT"
            ? "border-gray-300 bg-white focus:ring-blue-100 focus:border-blue-600"
            : "border-stone-700 bg-stone-950 focus:ring-blue-950 focus:border-blue-600"
        }`}
        id="options-menu"
        aria-haspopup="true"
        aria-expanded="true"
        onClick={() => toggleSelection(!isSelectionOpen)}
      >
        {selectedOption === "" ? "Select" : selectedOption}
        <ChevronDownIcon className="h-4 w-4" />
      </button>
      {isSelectionOpen && (
        <div
          className={`origin-top-left absolute font-semibold text-lg z-[10000] w-full rounded-lg shadow-lg  mt-2 ${
            state.theme.theme === "LIGHT"
              ? "bg-white border-gray-300"
              : "bg-stone-900 border border-stone-700"
          } ring-1 ring-black ring-opacity-5 focus:outline-none py-1 px-1`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
          style={{
            ...modalStyle,
            transition: "transform 0.2s ease-out, opacity 0.2s ease-out",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {activityArr?.length > 0 ? (
            <ul
              className={`flex flex-col gap-3 overflow-y-auto ${
                activityArr.length > 10
                  ? "md:h-[40vh] h-[60vh]"
                  : "h-[40vh] custom-scrollbar"
              }`}
              role="none"
            >
              {activityArr?.map((item: ProgramsData, index: number) => (
                <div
                  key={index}
                  onClick={() => {
                    setSelectedOption(item.name);
                    toggleSelection(false);
                  }}
                  className={`px-2 py-1.5 rounded-lg ${
                    item.name === selectedOption && "bg-blue-300"
                  } ${
                    state.theme.theme === "LIGHT"
                      ? "hover:bg-gray-100 "
                      : "hover:bg-stone-700"
                  }`}
                >
                  {item.name}
                </div>
              ))}
            </ul>
          ) : (
            <ul>
              <p>No data to show</p>
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

function ActivityNameSelect() {
  const [isSelectionOpen, toggleSelection] = useState(false);
  const [activityArr, setActivityArr] = useState([]);
  const { state } = useGlobalState();
  const menuRef: any = useRef();
  const [selectedOption, setSelectedOption] = useState("");
  const [modalStyle, setModalStyle] = useState({
    transform: "scale(0.95)",
    opacity: 0,
  });
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchUrlParams = Object.fromEntries(new URLSearchParams(searchParams));
  const initialRef = useRef(true);
  const [value] = useDebounce(selectedOption, 500);

  const prevQry: any = {
    ...searchUrlParams,
  };
  const queryStr: any = {
    ...searchUrlParams,
    activityName: value,
  };
  const prevQueryString = Object.keys(prevQry)
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(queryStr[key])
    )
    .join("&");
  const queryString = Object.keys(queryStr)
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(queryStr[key])
    )
    .join("&");

  useEffect(() => {
    if (initialRef.current) {
      initialRef.current = false;
      return;
    }
    if (!value) {
      router.push(`${pathname}?${prevQueryString}`);
    } else {
      router.push(`${pathname}?${queryString}`);
    }
  }, [value, router, pathname, queryString, prevQueryString]);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`/api/admin/information/mactivity`);
        if (response.ok) {
          const responseData = await response.json();
          setActivityArr(responseData.content.content);
        } else {
          const errorData = await response.json();
          console.log(errorData);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    if (isSelectionOpen) {
      // Open modal animation
      setTimeout(() => {
        setModalStyle({
          transform: "scale(1)",
          opacity: 1,
        });
      }, 50); // Delay the transition slightly for better visual effect
    } else {
      // Close modal animation
      setModalStyle({
        transform: "scale(0.95)",
        opacity: 0,
      });
      setTimeout(() => {
        setIsClosing(false);
      }, 3000); // Adjust this duration according to your transition duration
    }
  }, [isSelectionOpen]);

  const closeModal = useCallback(() => {
    setIsClosing(true);
    toggleSelection(false);
  }, [toggleSelection]);

  // Attach click outside listener
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeModal();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleSelection, closeModal]);
  return (
    <div className="relative inline-block text-left w-full" ref={menuRef}>
      <button
        type="button"
        className={`flex items-center justify-between border px-2 py-2 rounded-xl gap-5 w-full focus:ring-4 outline-none focus:border font-semibold ${
          state.theme.theme === "LIGHT"
            ? "border-gray-300 bg-white focus:ring-blue-100 focus:border-blue-600"
            : "border-stone-700 bg-stone-950 focus:ring-blue-950 focus:border-blue-600"
        }`}
        id="options-menu"
        aria-haspopup="true"
        aria-expanded="true"
        onClick={() => toggleSelection(!isSelectionOpen)}
      >
        {selectedOption === "" ? "Select" : selectedOption}
        <ChevronDownIcon className="h-4 w-4" />
      </button>
      {isSelectionOpen && (
        <div
          className={`origin-top-left absolute font-semibold text-lg z-[10000] w-full rounded-lg shadow-lg mt-2 ${
            state.theme.theme === "LIGHT"
              ? "bg-white border-gray-300"
              : "bg-stone-900 border border-stone-700"
          } ring-1 ring-black ring-opacity-5 focus:outline-none py-1 px-1`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
          style={{
            ...modalStyle,
            transition: "transform 0.2s ease-out, opacity 0.2s ease-out",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {activityArr?.length > 0 ? (
            <ul
              className={`flex flex-col gap-3 overflow-y-auto ${
                activityArr.length > 10
                  ? "md:h-[40vh] h-[60vh]"
                  : "h-[40vh] custom-scrollbar"
              }`}
              role="none"
            >
              {activityArr?.map((item: ActivityMaster, index: number) => (
                <div
                  key={index}
                  onClick={() => {
                    setSelectedOption(item.name);
                    toggleSelection(false);
                  }}
                  className={`px-2 py-1.5 rounded-lg ${
                    item.name === selectedOption && "bg-blue-300"
                  } ${
                    state.theme.theme === "LIGHT"
                      ? "hover:bg-gray-100 "
                      : "hover:bg-stone-700"
                  }`}
                >
                  {item.name}
                </div>
              ))}
            </ul>
          ) : (
            <ul>
              <p>No data to show</p>
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

function ParticipantContactNumberInput() {
  const { state } = useGlobalState();
  const [onFocusFilterInput, setOnFocusFilterInput] = useState(false);
  const [searchParamsInput, setSearchParamsInput] = useState("");
  const initialRef = useRef(true);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchUrlParams = Object.fromEntries(new URLSearchParams(searchParams));
  const [value] = useDebounce(searchParamsInput, 500);

  useEffect(() => {
    if (initialRef.current) {
      initialRef.current = false;
      return;
    }
    if (!value) {
      router.push(`${pathname}`);
    } else {
      router.push(`${pathname}?participantContactNumber=${value}`);
    }
  }, [value, router, pathname]);

  return (
    <div
      onFocus={() => setOnFocusFilterInput(true)}
      onBlur={() => setOnFocusFilterInput(false)}
      className={`rounded-xl pr-4 py-2 text-lg border transition-all duration-500 w-full flex items-center ${
        state.theme.theme === "LIGHT"
          ? `${
              onFocusFilterInput
                ? "border-blue-600 ring-4 ring-blue-100 "
                : "bg-white border-gray-300"
            }`
          : `${
              onFocusFilterInput
                ? "border-blue-600 ring-4 ring-blue-950 bg-stone-950"
                : "bg-stone-950 border-stone-800"
            }`
      }`}
    >
      <p className="px-2">
        <MagnifyingGlassIcon className="h5 w-5" />
      </p>

      <input
        onChange={(e) => setSearchParamsInput(e.target.value)}
        value={searchParamsInput}
        type={"text"}
        placeholder={`write query for course code`}
        className={`outline-none w-full ${
          state.theme.theme === "LIGHT"
            ? `transition-all duration-500  ${
                onFocusFilterInput
                  ? "placeholder:text-gray-400 bg-white"
                  : "bg-white placeholder:text-blue-500 "
              }`
            : `transition-all duration-500  ${
                onFocusFilterInput
                  ? "placeholder:hidden placeholder:text-gray-400 bg-stone-950"
                  : "placeholder:text-blue-500 bg-stone-950"
              }`
        }`}
      />
    </div>
  );
}
function LevelNameInput() {
  const { state } = useGlobalState();
  const [onFocusFilterInput, setOnFocusFilterInput] = useState(false);
  const [searchParamsInput, setSearchParamsInput] = useState("");
  const initialRef = useRef(true);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchUrlParams = Object.fromEntries(new URLSearchParams(searchParams));
  const [value] = useDebounce(searchParamsInput, 500);

  const prevQry: any = {
    ...searchUrlParams,
  };
  const queryStr: any = {
    ...searchUrlParams,
    levelName: value,
  };
  const prevQueryString = Object.keys(prevQry)
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(queryStr[key])
    )
    .join("&");
  const queryString = Object.keys(queryStr)
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(queryStr[key])
    )
    .join("&");

  useEffect(() => {
    if (initialRef.current) {
      initialRef.current = false;
      return;
    }
    if (!value) {
      router.push(`${pathname}?${prevQueryString}`);
    } else {
      router.push(`${pathname}?${queryString}`);
    }
  }, [value, router, pathname, queryString, prevQueryString]);

  return (
    <div
      onFocus={() => setOnFocusFilterInput(true)}
      onBlur={() => setOnFocusFilterInput(false)}
      className={`rounded-xl pr-4 py-2 text-lg border transition-all duration-500 w-full flex items-center ${
        state.theme.theme === "LIGHT"
          ? `${
              onFocusFilterInput
                ? "border-blue-600 ring-4 ring-blue-100 "
                : "bg-white border-gray-300"
            }`
          : `${
              onFocusFilterInput
                ? "border-blue-600 ring-4 ring-blue-950 bg-stone-950"
                : "bg-stone-950 border-stone-800"
            }`
      }`}
    >
      <p className="px-2">
        <MagnifyingGlassIcon className="h5 w-5" />
      </p>

      <input
        onChange={(e) => setSearchParamsInput(e.target.value)}
        value={searchParamsInput}
        type={"text"}
        placeholder={`write query for course code`}
        className={`outline-none w-full ${
          state.theme.theme === "LIGHT"
            ? `transition-all duration-500  ${
                onFocusFilterInput
                  ? "placeholder:text-gray-400 bg-white"
                  : "bg-white placeholder:text-blue-500 "
              }`
            : `transition-all duration-500  ${
                onFocusFilterInput
                  ? "placeholder:hidden placeholder:text-gray-400 bg-stone-950"
                  : "placeholder:text-blue-500 bg-stone-950"
              }`
        }`}
      />
    </div>
  );
}

function CourseCodeInput() {
  const { state } = useGlobalState();
  const [onFocusFilterInput, setOnFocusFilterInput] = useState(false);
  const [searchParamsInput, setSearchParamsInput] = useState("");
  const initialRef = useRef(true);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchUrlParams = Object.fromEntries(new URLSearchParams(searchParams));
  const [value] = useDebounce(searchParamsInput, 500);

  const prevQry: any = {
    ...searchUrlParams,
  };
  const queryStr: any = {
    ...searchUrlParams,
    courseCode: value,
  };
  const prevQueryString = Object.keys(prevQry)
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(queryStr[key])
    )
    .join("&");
  const queryString = Object.keys(queryStr)
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(queryStr[key])
    )
    .join("&");

  useEffect(() => {
    if (initialRef.current) {
      initialRef.current = false;
      return;
    }
    if (!value) {
      router.push(`${pathname}?${prevQueryString}`);
    } else {
      router.push(`${pathname}?${queryString}`);
    }
  }, [value, router, pathname, queryString, prevQueryString]);

  return (
    <div
      onFocus={() => setOnFocusFilterInput(true)}
      onBlur={() => setOnFocusFilterInput(false)}
      className={`rounded-xl pr-4 py-2 text-lg border transition-all duration-500 w-full flex items-center ${
        state.theme.theme === "LIGHT"
          ? `${
              onFocusFilterInput
                ? "border-blue-600 ring-4 ring-blue-100 "
                : "bg-white border-gray-300"
            }`
          : `${
              onFocusFilterInput
                ? "border-blue-600 ring-4 ring-blue-950 bg-stone-950"
                : "bg-stone-950 border-stone-800"
            }`
      }`}
    >
      <p className="px-2">
        <MagnifyingGlassIcon className="h5 w-5" />
      </p>

      <input
        onChange={(e) => setSearchParamsInput(e.target.value)}
        value={searchParamsInput}
        type={"text"}
        placeholder={`write query for course code`}
        className={`outline-none w-full ${
          state.theme.theme === "LIGHT"
            ? `transition-all duration-500  ${
                onFocusFilterInput
                  ? "placeholder:text-gray-400 bg-white"
                  : "bg-white placeholder:text-blue-500 "
              }`
            : `transition-all duration-500  ${
                onFocusFilterInput
                  ? "placeholder:hidden placeholder:text-gray-400 bg-stone-950"
                  : "placeholder:text-blue-500 bg-stone-950"
              }`
        }`}
      />
    </div>
  );
}
function DateInput() {
  const { state } = useGlobalState();
  const [onFocusFilterInput, setOnFocusFilterInput] = useState(false);
  const [searchParamsInput, setSearchParamsInput] = useState("");
  const initialRef = useRef(true);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchUrlParams = Object.fromEntries(new URLSearchParams(searchParams));
  const [value] = useDebounce(searchParamsInput, 500);
  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    return `${formattedDay}-${formattedMonth}-${year}`;
  }

  const prevQry: any = {
    ...searchUrlParams,
  };
  const queryStr: any = {
    ...searchUrlParams,
    date: formatDate(value),
  };
  const prevQueryString = Object.keys(prevQry)
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(queryStr[key])
    )
    .join("&");
  const queryString = Object.keys(queryStr)
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(queryStr[key])
    )
    .join("&");

  useEffect(() => {
    if (initialRef.current) {
      initialRef.current = false;
      return;
    }
    if (!value) {
      router.push(`${pathname}?${prevQueryString}`);
    } else {
      router.push(`${pathname}?${queryString}`);
    }
  }, [value, router, pathname, queryString, prevQueryString]);

  return (
    <div
      onFocus={() => setOnFocusFilterInput(true)}
      onBlur={() => setOnFocusFilterInput(false)}
      className={`rounded-xl pr-4 py-2 text-lg border transition-all duration-500 w-full flex items-center ${
        state.theme.theme === "LIGHT"
          ? `${
              onFocusFilterInput
                ? "border-blue-600 ring-4 ring-blue-100 "
                : "bg-white border-gray-300"
            }`
          : `${
              onFocusFilterInput
                ? "border-blue-600 ring-4 ring-blue-950 bg-stone-950"
                : "bg-stone-950 border-stone-800"
            }`
      }`}
    >
      <p className="px-2">
        <MagnifyingGlassIcon className="h5 w-5" />
      </p>

      <input
        onChange={(e) => setSearchParamsInput(e.target.value)}
        value={searchParamsInput}
        type={"datetime-local"}
        placeholder={`write query for course code`}
        className={`outline-none w-full ${
          state.theme.theme === "LIGHT"
            ? `transition-all duration-500  ${
                onFocusFilterInput
                  ? "placeholder:text-gray-400 bg-white"
                  : "bg-white placeholder:text-blue-500 "
              }`
            : `transition-all duration-500  ${
                onFocusFilterInput
                  ? "placeholder:hidden placeholder:text-gray-400 bg-stone-950"
                  : "placeholder:text-blue-500 bg-stone-950"
              }`
        }`}
      />
    </div>
  );
}
