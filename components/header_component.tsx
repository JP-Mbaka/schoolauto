import React, { useState } from "react";
import { Button } from "./ui/button";
import SimpleModal from "./create_user_modal";

interface HeaderProps {
  userRole: string;
  title: string;
  action: string;
}

const Header: React.FC<HeaderProps> = ({ userRole, title, action }) => {
  const [open, setOpen] = useState(false);

  const handleUserCreate = (user: {
    name: string;
    email: string;
    password: string;
  }) => {
    console.log("New user created:", user);
    // send to backend...
  };
  return (
    <div className="not-printable print:hidden bg-white py-4 px-12 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-semibold">
          {title == "records"
            ? userRole === "teacher"
              ? "Records"
              : "Result"
            : title}
        </h1>
      </div>
      <div
        onClick={() => setOpen(true)}
        className=" bg-blue-600 px-4 py-2 text-white hover:bg-amber-300 hover:text-black rounded-sm cursor-pointer transition-colors duration-200"
      >
        <Button> {action}</Button>

        <SimpleModal
          open={open}
          onClose={() => setOpen(false)}
          onSubmit={handleUserCreate}
        />
      </div>
    </div>
  );
};

export default Header;
