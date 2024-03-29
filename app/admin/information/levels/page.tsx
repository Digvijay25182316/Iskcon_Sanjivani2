import { SERVER_ENDPOINT } from "@/ConfigFetch";
import Levels from "@/components/Modules/Information/levels/Levels";
import React from "react";

// // Define the Content type, which wraps the actual data returned from the server
// interface Content<T> {
//   content: T;
// }

// // Define the Message type, which represents an error message
// interface Message {
//   message: string;
// }

// // Union type representing both success and error responses

// export async function getLevels() {
//   try {
//     const response = await fetch(`${SERVER_ENDPOINT}/level/`);
//     if (response.ok) {
//       const responseData: LevelsData[] = await response.json();
//       return { content: responseData }; // Content<LevelsData>
//     } else {
//       const errorData = await response.json();
//       return { message: errorData.message || errorData.title }; // Message
//     }
//   } catch (error: any) {
//     return { message: error.message || "Unexpected exception occurred" }; // Message
//   }
// }

async function page() {
  // const levels: any = await getLevels();

  return (
    <div className="w-full">
      <Levels />
    </div>
  );
}

export default page;
