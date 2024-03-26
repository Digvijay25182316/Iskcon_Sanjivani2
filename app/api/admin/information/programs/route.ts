import { SERVER_ENDPOINT } from "@/ConfigFetch";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const response = await fetch(`${SERVER_ENDPOINT}/program/`);
    if (response.ok) {
      const responseData = await response.json();
      return NextResponse.json({ content: responseData }, { status: 200 });
    } else {
      const errorData = await response.json();
      return NextResponse.json(
        { message: errorData.message || errorData.title },
        { status: response.status }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message || error.title }, {});
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  try {
    const body = await req.json();
    const response = await fetch(`${SERVER_ENDPOINT}/program/create`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });
    if (response.ok) {
      const responseData = await response.json();
      return NextResponse.json(
        { message: responseData.message },
        { status: response.status }
      );
    } else {
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
