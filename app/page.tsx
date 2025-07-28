import TextScrollCarousel from "@/components/text_carousel";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div className="flex w-full h-screen">
        <div className="flex-3/5 bg-pink-50 bg-opacity-35">
          <ul className="flex space-x-6 justify-center font-bold p-5 m-10">
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
          <div className="font-bold pt-25 left-1/6 relative">
            {" "}
            <span className="text-amber-300">*</span> 30 Days free trial
          </div>
          <p className="font-bold text-blue-600 left-1/6 relative text-7xl">
            Build Your Skills
          </p>
          <p className="font-bold text-blue-600 left-1/6 relative text-7xl p-2">
            on the{" "}
            <span className="bg-amber-300 rounded-lg px-4 text-white">
              Best
            </span>
          </p>
          <p className="font-bold text-blue-600 left-1/6 relative text-7xl">
            Platform
          </p>
          <p className="font-bold left-1/6 relative">
            Find Unlimited Courses That Matches Your Niche to Hasten the
          </p>
          <p className="font-bold left-1/6 relative">
            Process Of Developing Your Skills
          </p>
          <div className="flex left-1/6 relative mt-8">
            <button className="border-0 text-white rounded-lg bg-blue-600 px-6 py-2">
              Get Started
            </button>
            <p className="font-bold px-12">Video Play</p>
          </div>
        </div>
        <div className="flex-2/5 bg-blue-600">
          <button className="border-1 text-white m-10 rounded-lg px-6 py-2 ">
            Log In
          </button>
          <button className="border-1 text-blue-600 m-2 rounded-lg px-6 py-2 bg-amber-300">
            Register
          </button>
        </div>
        <div className=" h-2/3 w-3xl absolute z-20 top-1/4 left-2/5 rounded-2xl">
          <Image src={"/girl.png"} alt="" fill className="rounded-2xl" />
        </div>
      </div>

      <div className="w-full h-screen bg-white">
        <p className="font-bold pt-25 text-center">
          <span className="text-amber-300">*</span> Course Categories
        </p>
        <p className="font-bold text-6xl text-center pt-4">
          Explore our Course Categories
        </p>
        <p className="font-bold text-center pt-4">
          For everyone of you we offer a variety of distinctive benefits.
        </p>
        <div className="px-24">
          <TextScrollCarousel />
        </div>
      </div>
    </div>
  );
}
