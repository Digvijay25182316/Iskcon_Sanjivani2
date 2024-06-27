import { NextRequest, NextResponse } from "next/server";
import { SERVER_ENDPOINT } from "@/ConfigFetch";
import { cookies } from "next/headers";
import { decrypt } from "@/Utils/helpers/auth";

export async function POST(req: NextRequest, res: NextResponse) {
  const header = new Headers();
  const cookiesValue = cookies().get("AUTHRES")?.value;
  const Parsedcookies = cookiesValue && JSON.parse(cookiesValue);
  if (!Parsedcookies) {
    throw new Error("Please login to access");
  }
  const buffer = Buffer.from(decrypt(Parsedcookies.buf).toString()).toString(
    "base64"
  );
  header.append("Content-Type", "application/json");
  header.append("Authorization", `Basic ${buffer}`);
  try {
    const {
      code,
      name,
      description,
      sessionName,
      sessionDescription,
      sessionCode,
      durationInMinutes,
    } = await req.json();

    const course = {
      code,
      name,
      description,
    };
    const responseCourse = await fetch(`${SERVER_ENDPOINT}/course/create`, {
      method: "POST",
      headers: header,
      body: JSON.stringify(course),
    });

    if (responseCourse.ok) {
      const session = {
        code: sessionCode,
        name: sessionName,
        description: sessionDescription,
        courseCode: code,
        durationInMinutes,
      };
      const responseSession = await fetch(`${SERVER_ENDPOINT}/session/create`, {
        method: "POST",
        headers: header,
        body: JSON.stringify(session),
      });
      console.log("session" + responseSession.status);

      if (responseSession.ok) {
        return NextResponse.json(
          { message: "session stored successfully" },
          { status: responseSession.status }
        );
      } else {
        const errorData = await responseSession.json();
        console.log(errorData);
        return NextResponse.json(
          { message: "session already exists" },
          { status: responseSession.status }
        );
      }
    } else {
      if (responseCourse.status === 409) {
        const session = {
          code: sessionCode,
          name: sessionName,
          description: sessionDescription,
          courseCode: code,
          durationInMinutes: durationInMinutes,
        };
        console.log(session);
        const responseSession = await fetch(
          `${SERVER_ENDPOINT}/session/create`,
          {
            method: "POST",
            headers: header,
            body: JSON.stringify(session),
          }
        );
        console.log(responseSession.status);
        if (responseSession.ok) {
          return NextResponse.json(
            { message: "session stored successfully" },
            { status: responseSession.status }
          );
        } else {
          const errorData = await responseSession.json();
          console.log(errorData);
          return NextResponse.json(
            { message: "session already exists" },
            { status: responseSession.status }
          );
        }
      }
    }
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || error.title },
      { status: 500 }
    );
  }
}
