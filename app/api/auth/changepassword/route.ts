import { SERVER_ENDPOINT } from "@/ConfigFetch";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const header = new Headers();
  const cookiesValue = cookies().get("ROLE")?.value;
  const ROLE = cookiesValue ? JSON.parse(cookiesValue) : "";
  header.append("Content-Type", "application/json");
  header.append("Authorization", `Basic ${ROLE.buf}`);

  try {
    const { password } = await req.json();
    if (ROLE === "") {
      return NextResponse.json(
        { message: "you are not authenticated" },
        { status: 401 }
      );
    }
    if (ROLE.name === "ROLE_ADMIN") {
      const response = await fetch(
        `${SERVER_ENDPOINT}/auth/admin/changePassword`
      );
      if (response.ok) {
        const responseData = await response.json();
        return NextResponse.json(
          { message: "changed password successfully" },
          { status: 200 }
        );
      } else {
        const errorData = await response.json();
        return NextResponse.json(
          { message: errorData.message },
          { status: response.status }
        );
      }
    } else {
      const response = await fetch(
        `${SERVER_ENDPOINT}/auth/user/changePassword`
      );
      if (response.ok) {
        const responseData = await response.json();
        return NextResponse.json(
          { message: "changed password successfully" },
          { status: 200 }
        );
      } else {
        const errorData = await response.json();
        return NextResponse.json(
          { message: errorData.message },
          { status: response.status }
        );
      }
    }
    return NextResponse.json({ message: "majama" }, { status: 500 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
