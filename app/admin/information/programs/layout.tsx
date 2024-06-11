import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Programs",
  description: "Generated by sanjivanipune.com",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div>
        {children}
      </div>
  );
}