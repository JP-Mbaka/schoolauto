import React from "react";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <section className="w-full flex h-screen">
      <div className="flex-1 flex flex-col max-sm:hidden">
        {/* Logo and Title */}
        <div className="w-full flex items-center space-x-2 py-3.5 justify-center bg-blue-600">
          <Image src="/logo.jpg" alt="School logo" width={45} height={50} />
          <p>Auto Primary School</p>
        </div>
        <div className="flex-3/5 pt-12 ">
          <div className="border-y-2 border-y-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white hover:cursor-pointer px-12 py-4">
            Records
          </div>
          <div className="border-b-2 border-b-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white hover:cursor-pointer px-12 py-4">
            Payment
          </div>
          <div className="border-b-2 border-b-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white hover:cursor-pointer px-12 py-4">
            Users
          </div>
          <div className="border-b-2 border-b-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white hover:cursor-pointer px-12 py-4">
            Courses
          </div>
          <div className="border-b-2 border-b-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white hover:cursor-pointer px-12 py-4">
            Lessons
          </div>
        </div>
        <div className="flex-1/5 flex flex-col justify-end">
          <div className="bg-blue-600 text-white hover:bg-white hover:text-blue-600 hover:cursor-pointer px-12 py-4">
            Invite +
          </div>
        </div>
      </div>
      <div className="flex-6 bg-yellow-400  flex flex-col ">
        {" "}
        {/* Logo and Title */}
        <div className="hidden w-full max-sm:flex items-center space-x-2 py-3.5 justify-center bg-blue-600">
          <Image src="/logo.jpg" alt="School logo" width={45} height={50} />
          <p>Auto Primary School</p>
        </div>
        <div className="bg-red-400 flex-1 flex items-center justify-between px-12">
          <h1>
            {
              '"Live as if you were to die tomorrow. Learn as if you were to live forever"'
            }
          </h1>
          <div className="max-sm:hidden">Odunayo</div>
        </div>
        <div className="bg-green-500 flex-12">{children}</div>
      </div>
    </section>
  );
}
