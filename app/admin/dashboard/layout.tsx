import type { Metadata } from "next";
import "./../globals.css";

import { cookies } from "next/headers";
import React from "react";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  chantinganalytics,
  chantingroundwise,
}: {
  chantinganalytics: React.ReactNode;
  chantingroundwise: React.ReactNode;
}) {
  const authres: any = cookies().get("AUTHRES");

  return (
    <section className="flex flex-wrap gap-5 p-5">
      {chantinganalytics}
      {chantingroundwise}
    </section>
  );
}
