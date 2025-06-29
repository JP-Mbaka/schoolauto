import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const navItems = [
    { label: "Records", link: "/records" },
    { label: "Payment", link: "/payments" },
    { label: "Users", link: "/users" },
    { label: "Subjects", link: "/courses" },
    { label: "Lessons", link: "/lessons" },
  ];

  return (
    <section className="flex w-full h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="not-printable print:hidden w-64 max-sm:hidden bg-white shadow-md flex flex-col">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 bg-blue-600 py-4 text-white text-lg font-semibold">
          <Image src="/logo.jpg" alt="School logo" width={40} height={40} />
          <span>Auto Primary School</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-8">
          {navItems.map((item, index) => (
            <Link key={item.link} href={item.link}>
              <div
                className={`${
                  index === 0 ? "border-y-2" : "border-b-2"
                } border-blue-600 px-6 py-3 text-blue-600 hover:bg-blue-600 hover:text-white cursor-pointer transition-all`}
              >
                {item.label}
              </div>
            </Link>
          ))}
        </nav>

        {/* Footer button */}
        <div className="p-6">
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-white hover:text-blue-600 border border-blue-600 transition-all">
            Invite +
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex flex-col flex-1 overflow-auto border-l">
        {/* Mobile logo */}
        <div className="sm:hidden flex items-center justify-center gap-2 bg-blue-600 py-3 text-white font-semibold">
          <Image src="/logo.jpg" alt="School logo" width={40} height={40} />
          <span>Auto Primary School</span>
        </div>

        {/* Header */}
        <div className="not-printable print:hidden bg-blue-600 text-white px-6 py-4 flex items-center justify-between">
          <h1 className="text-sm italic">
            {`Live as if you were to die tomorrow. Learn as if you were to live forever.`}
          </h1>
          <span className="hidden sm:block font-medium">Odunayo</span>
        </div>

        {/* Children Content */}
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </main>
    </section>
  );
}
