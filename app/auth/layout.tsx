import React from "react";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <section className="h-svh w-full p-4 flex">
      <section
        className="w-[50%] h-full bg-[url('/3337171.jpg')] bg-cover bg-center rounded-2xl shadow-2xl
      flex flex-col justify-between"
      >
        <div className="text-amber-100 flex items-center gap-2.5 font-extrabold p-10 text-2xl">
          <Image src={"/logo.jpg"} alt="School logo" width={45} height={50} />
          <p> Auto Primary School</p>
        </div>
        <div className="self-center bg-amber-100 w-sm p-8 rounded-sm text-justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
          suscipit beatae repellat mollitia praesentium? Totam magnam hic quia?
          Perspiciatis aut molestias aliquid odio earum magni aperiam veritatis
          ea. Tempora, eius.
        </div>
        <div className="self-end flex gap-1.5 p-1 mr-2 mb-2 font-extrabold text-2xl ">
          <div className="bg-white  rounded-sm py-2 px-4 hover:text-amber-400 cursor-pointer">
            {"<"}
          </div>
          <div className="bg-white  rounded-sm py-2 px-4 hover:text-amber-400 cursor-pointer">
            {">"}
          </div>
        </div>
      </section>
      <section className="w-[50%] h-full">{children}</section>
    </section>
  );
}
