"use server";
import { decrypt } from "@/Utils/helpers/auth";
import { cookies, headers } from "next/headers";

export async function POST(formData: FormData, url: string) {
  const header = new Headers();
  header.append("Content-Type", "application/json");

  try {
    const response = await fetch(`${url}`, {
      method: "POST",
      headers: header,
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      const responseData = await response.json();

      return { message: responseData.message };
    } else {
      if (response.status === 409) {
        throw new Error("This Entry Already exists");
      }
      if (response.status === 401) {
        throw new Error("Request is unauthorized");
      }
      const errorData = await response.json();
      throw new Error(errorData.message || errorData.title);
    }
  } catch (error: any) {
    throw new Error(error.message || "Unexpected exception occured");
  }
}

export async function POSTADMIN(formData: FormData, url: string) {
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
    const response = await fetch(`${url}`, {
      method: "POST",
      headers: header,
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      const responseData = await response.json();

      return { message: responseData.message };
    } else {
      if (response.status === 409) {
        throw new Error("This Entry Already exists");
      }
      if (response.status === 401) {
        throw new Error("Request is unauthorized");
      }
      const errorData = await response.json();
      throw new Error(errorData.message || errorData.title);
    }
  } catch (error: any) {
    throw new Error(error.message || "Unexpected exception occured");
  }
}

export async function LOGOUT() {
  try {
    cookies().delete("AUTHRES");
    return { message: "loggedout successfully" };
  } catch (error: any) {
    throw new Error(error.message || "Unexpected exception occured");
  }
}
