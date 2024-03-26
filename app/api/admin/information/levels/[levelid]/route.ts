import { SERVER_ENDPOINT } from "@/ConfigFetch";
import { NextResponse } from "next/server";

export async function GET({ params }: { params: { levelid: string } }) {
  try {
    const response = await fetch(
      `${SERVER_ENDPOINT}/level/id/${params.levelid}`
    );
    if (response.ok) {
      const responseData = await response.json();
      return NextResponse.json(
        { content: responseData },
        { status: response.status }
      );
    } else {
      if (response.status === 409) {
        return NextResponse.json(
          { message: "Data already exists try another value" },
          { status: 409 }
        );
      }
      const errorData = await response.json();
      return NextResponse.json(
        { message: errorData.message || errorData.title },
        { status: response.status }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Unexpected exception occured" },
      { status: 500 }
    );
  }
}
