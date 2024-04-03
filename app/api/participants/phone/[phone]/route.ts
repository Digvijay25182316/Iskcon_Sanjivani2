import { SERVER_ENDPOINT } from "@/ConfigFetch";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { phone: string } }
) {
  try {
    const response = await fetch(
      `${SERVER_ENDPOINT}/participant/phone/${params.phone}`
    );
    if (response.ok) {
      const responseData = await response.json();
      return NextResponse.json({ content: responseData }, { status: 200 });
    } else {
      const errorData = await response.json();

      return NextResponse.json({ message: errorData }, { status: 200 });
    }
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "something unexpected happened" },
      { status: 500 }
    );
  }
}
