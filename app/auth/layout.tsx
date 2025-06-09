import React from "react";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <section className="h-svh w-full p-4 flex">
      <section className="w-[50%] h-full bg-amber-200 rounded-2xl"></section>
      <section className="w-[50%] h-full">{children}</section>
    </section>
  );
}
