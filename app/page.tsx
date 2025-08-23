import TextScrollCarousel from "@/components/text_carousel";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section className="flex flex-row w-full h-screen">
        <nav className="flex absolute">
          <ul className="flex space-x-6 font-bold p-5 m-10">
            <li className="hover:text-amber-300 cursor-pointer active:text-blue-600">
              Home
            </li>
            <li className="hover:text-amber-300 cursor-pointer active:text-blue-600">
              About Us
            </li>
            <li className="hover:text-amber-300 cursor-pointer active:text-blue-600">
              Course
            </li>
            <li className="hover:text-amber-300 cursor-pointer active:text-blue-600">
              Blog
            </li>
            <li className="hover:text-amber-300 cursor-pointer active:text-blue-600">
              Contact Us
            </li>
          </ul>
        </nav>
        <div className="flex-3/5 bg-pink-50 bg-opacity-35">
          <div className="font-bold pt-80 left-32 relative">
            {" "}
            <span className="text-amber-300">*</span> 30 Days free trial
          </div>
          <p className=" font-bold text-blue-600 left-32 relative lg:text-7xl md:text-5xl">
            Build Your Skills
          </p>
          <p className="font-bold text-blue-600 left-30 relative lg:text-7xl p-2 md:text-5xl">
            on the{" "}
            <span className="bg-amber-300 rounded-lg px-4 text-white">
              Best
            </span>
          </p>
          <p className="font-bold text-blue-600 left-32 relative lg:text-7xl md:text-5xl">
            Platform
          </p>
          <p className="font-bold left-32 relative">
            Find Unlimited Courses That Matches Your Niche to
          </p>
          <p className="font-bold left-32 relative">
            Hasten the Process Of Developing Your Skills
          </p>
          <div className="flex left-32 relative mt-8">
            <Link
              href={"https://speed-pi-murex.vercel.app"}
              className="border-0 text-white rounded-lg bg-blue-600 px-6 py-2 cursor-pointer"
            >
              Get Started
            </Link>
          </div>
        </div>
        <div className="flex-2/5 bg-blue-600">
          <div className="mt-12">
            <Link
              href={"https://speed-pi-murex.vercel.app/login"}
              className="ml-12 invisible border-1 text-white m-10 rounded-lg px-6 py-2  cursor-pointer"
            >
              Log In
            </Link>{" "}
            <Link
              href={"https://speed-pi-murex.vercel.app/login"}
              className="border-1 text-white m-10 rounded-lg px-6 py-2  cursor-pointer"
            >
              Log In
            </Link>
            <Link
              href={"https://speed-pi-murex.vercel.app/register"}
              className="border-1 text-blue-600 m-10 rounded-lg px-6 py-2 bg-amber-300 cursor-pointer"
            >
              Register
            </Link>
          </div>
        </div>
      </section>
      <div className=" max-lg:hidden  w-3xl absolute z-20 top-1/4 left-2/5 rounded-2x max-md h-3/6">
        <Image src={"/girl.png"} alt="" fill className="rounded-2xl" />
      </div>
      <div className="w-full h-3/4 bg-white">
        <p className="font-bold pt-25 text-center">
          <span className="text-amber-300">*</span> Course Categories
        </p>
        <p className="font-bold text-blue-600 lg:text-7xl md:text-5xl text-center pt-4">
          Explore our Course Categories
        </p>
        <p className="font-bold text-center pt-4">
          For everyone of you we offer a variety of distinctive benefits.
        </p>
        <div className="px-24">
          <TextScrollCarousel />
        </div>
      </div>
      <div className="bg-blue-600 flex w-full justify-center py-10">
        <p className="text-white pr-10 lg:text-5xl md:text-3xl">260k+</p>
        <p className="text-white pr-10 lg:text-5xl md:text-3xl">24+</p>
        <p className="text-white pr-10 lg:text-5xl md:text-3xl">550+</p>
        <p className="text-white pr-10 lg:text-5xl md:text-3xl">2M+</p>
      </div>
      <div className="w-full h-2/3 flex justify-center">
        <div className=" relative w-xl max- h-96 mt-25 mb-25">
          <Image src={"/girl.png"} alt="" fill className="rounded-lg" />
        </div>
        <div className="flex justify-center items-center">
          <div>
            <p className="font-bold ml-10">
              <span className="text-amber-300">*</span> About Us
            </p>
            <p className="font-bold ml-10 text-4xl py-4 w-2/3">
              {"Educate The Populace to\nAdvance The Nation"}
            </p>
            <p className="font-bold ml-10 py-1/2">
              This can be accomplished by highlighting any awards or
              recognitions
              <p>
                {" "}
                that the company has received as well as any partnerships or
              </p>
              <p>
                {" "}
                collaborations that has turned with other industry loaders.
              </p>
            </p>
            <p className="font-bold ml-10 py-3">
              This information can help potential customers feel more confident
              in
              <p>the LMS and its ability to meet their needs.</p>
            </p>
            <div className="grid-cols-2 grid space-y-5 ml-10">
              {[
                "Unique Support System",
                "Life Time Support",
                "Get Certificate",
                "Accounting instructor",
              ].map((n, index) => (
                <Link
                  href={"https://speed-pi-murex.vercel.app/register"}
                  key={index}
                  className="flex gap-5 items-center cursor-pointer"
                >
                  <div className="h-5 w-5 bg-blue-600 p-0.5 flex justify-center items-center rounded-full">
                    <div className="h-2 w-2 bg-amber-50 rounded-full"></div>
                  </div>
                  <span>{n}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-blue-600 text-white text-center py-4">
        <p className="font-bold">Group 11</p>
        <p>Course Code: CSC320</p>
        <p>Course Title: Software Laboratory</p>
      </footer>
    </main>
  );
}
