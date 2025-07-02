import React, { useState } from "react";
import { Button } from "./ui/button";
import SimpleModal from "./create_user_modal";
import { createAccountSchema } from "@/types";
import z from "zod";
import { createUserAccount } from "@/action/auth_action";

interface HeaderProps {
  userRole: string;
  title: string;
  actionTitle: string;
}

const Header: React.FC<HeaderProps> = ({
  userRole,
  title,
  actionTitle: actionTitle,
}) => {
  const [open, setOpen] = useState(false);

  //this function calls the create account
  const handleUserCreate = async (
    user: z.infer<typeof createAccountSchema>
  ) => {
    console.log("New user created:", user);
    // send to backend...
    try {
      const res = await createUserAccount(user);
      console.log("New user created :", res);
    } catch (error) {
      console.log("New user created Error Message:", error);
    } finally {
      //we set loading state
    }
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
      <div>
        <Button
          onClick={() => setOpen(true)}
          className="bg-blue-600 hover:bg-amber-300 hover:text-black cursor-pointer transition-colors duration-200"
        >
          {" "}
          {actionTitle}
        </Button>

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
