"use client";

import { dataSubjects } from "@/data";
import { useRef, useState } from "react";
import { HiCheckCircle } from "react-icons/hi"; // You can use any SVG or icon

export default function TextScrollCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null); // Track active box

  const scroll = (direction: string) => {
    const container = scrollRef.current;
    if (container) {
      container.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  };
  const items = dataSubjects.map((subject) => ({
    title: subject.subjectTitle,
    subtitle: `${subject.subjectTitle} (${subject.subjectId})`,
  }));

  return (
    <div className="relative w-full py-10">
      {/* Left Arrow */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow"
      >
        ◀
      </button>

      {/* Scrollable Row */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto space-x-4 scroll-smooth no-scrollbar px-10"
      >
        {items.map((n, index) => {
          const isActive = activeIndex === index;

          return (
            <div
              key={n.title}
              onClick={() => setActiveIndex(index)}
              className={`min-w-[250px] h-50 rounded-lg flex flex-col items-center justify-center cursor-pointer border-4 transition-all duration-200 ${
                isActive
                  ? "border-yellow-500 bg-yellow-50"
                  : "border-blue-300 bg-blue-100"
              }`}
            >
              {/* Icon */}
              <HiCheckCircle
                size={32}
                className={`mb-2 ${
                  isActive ? "text-yellow-500" : "text-blue-500"
                }`}
              />
              {/* Title */}
              <p
                className={`font-semibold text-center ${
                  isActive ? "text-yellow-600" : "text-blue-800"
                }`}
              >
                <h1>{n.title}</h1>
                <p>{n.subtitle}</p>
              </p>
            </div>
          );
        })}
      </div>

      {/* Right Arrow */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow"
      >
        ▶
      </button>
    </div>
  );
}
