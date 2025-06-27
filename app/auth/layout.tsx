import React from "react";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <section className="h-svh w-full max-md:h-screen max-md:w-auto p-4 max-md:p-0 min-md:flex max-md:relative">
      {/* Left Section with Background Image */}
      <section
        className="w-[50%] h-full bg-[url('/auth.jpg')] bg-cover bg-center min-md:rounded-2xl shadow-2xl
        min-md:flex min-md:flex-col min-md:justify-between 
        max-md:w-full max-md:absolute max-md:z-10"
      >
        {/* Logo and Title */}
        <div className="text-blue-600 flex items-center gap-2.5 font-extrabold min-md:p-10  pt-2.5 text-2xl max-md:justify-center">
          <Image src="/logo.jpg" alt="School logo" width={45} height={50} />
          <p>Auto Primary School</p>
        </div>

        {/* Description Box */}
        {/* <div className="self-center bg-amber-100 w-sm p-8 rounded-sm text-justify max-md:hidden">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
          suscipit beatae repellat mollitia praesentium? Totam magnam hic quia?
          Perspiciatis aut molestias aliquid odio earum magni aperiam veritatis
          ea. Tempora, eius.
        </div> */}

        {/* Arrow Navigation */}
        {/* <div className="self-end flex gap-1.5 p-1 mr-2 mb-2 font-extrabold text-2xl max-md:hidden">
          <div className="bg-white rounded-sm py-2 px-4 hover:text-amber-400 cursor-pointer">
            {"<"}
          </div>
          <div className="bg-white rounded-sm py-2 px-4 hover:text-amber-400 cursor-pointer">
            {">"}
          </div>
        </div> */}
      </section>

      {/* Right Section with Children */}
      <section
        className="w-[50%] h-full max-md:w-auto
    max-md:absolute max-md:inset-0 max-md:z-20 
     max-md:flex max-md:items-center max-md:justify-center 
    rounded-2xl"
      >
        {children}
      </section>
    </section>
  );
}
