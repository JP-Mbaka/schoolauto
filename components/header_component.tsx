import React from "react";

function Header() {
  return (
    <div className="bg-white py-4 px-12 flex justify-between">
      <div className="">
        <h1 className="text-2xl font-semibold">Records</h1>
        <h1></h1>
      </div>
      <div className="bg-blue-600 px-4 py-2 hover:bg-amber-300 rounded-sm cursor-pointer">
        Create
      </div>
    </div>
  );
}

export default Header;
