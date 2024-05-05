import { SERVER_ENDPOINT } from "@/ConfigFetch";
import { decrypt } from "@/Utils/helpers/auth";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const { email, password, role } = await req.json();
  const header = new Headers();
  const cookiesValue = cookies().get("AUTHRES")?.value;
  const ROLE = cookiesValue && JSON.parse(cookiesValue);
  const buffer = Buffer.from(decrypt(ROLE.buf).toString()).toString("base64");
  header.append("Content-Type", "application/json");
  header.append("Authorization", `Basic ${buffer}`);
  const formData = { email, password, role };
  try {
    const response = await fetch(`${SERVER_ENDPOINT}/auth/register`, {
      method: "POST",
      headers: header,
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      const responseData = await response.json();
      return NextResponse.json(
        { message: responseData.message },
        { status: response.status }
      );
    } else {
      if (response.status === 401) {
        return NextResponse.json(
          { message: "you dont have access to this resource" },
          { status: response.status }
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
      { message: error.message || error.title || "something bad happened" },
      { status: 500 }
    );
  }
}
