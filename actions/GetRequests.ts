"use server";
import { SERVER_ENDPOINT } from "@/ConfigFetch";

export async function GetLevels() {
  try {
    const response = await fetch(`${SERVER_ENDPOINT}/level/`);
    if (response.ok) {
      const responseData = await response.json();
      return { content: responseData };
    } else {
      const errorData = await response.json();
      return { message: errorData.message || errorData.title };
    }
  } catch (error: any) {
    throw { message: error.message || "Unexpected exception occured" };
  }
}
