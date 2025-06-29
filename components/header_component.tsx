import React from "react";

interface HeaderProps {
  userRole: string;
  title: string;
}

const Header: React.FC<HeaderProps> = ({ userRole, title }) => {
  return (
    <div className="bg-white py-4 px-12 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-semibold">
          {title == "records"
            ? userRole === "teacher"
              ? "Records"
              : "Result"
            : title}
        </h1>
      </div>
      <div className="bg-blue-600 px-4 py-2 text-white hover:bg-amber-300 hover:text-black rounded-sm cursor-pointer transition-colors duration-200">
        {title == "records" ? "Create" : "Make Payment"}
      </div>
    </div>
  );
};

export default Header;
