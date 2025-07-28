import React, { useState } from "react";
import { Button } from "./ui/button";
import SimpleModal from "./create_user_modal";
import { createAccountSchema, gradesType } from "@/types";
import z from "zod";
import { createUserAccount } from "@/action/auth_action";
import { CreateRecordModal } from "./create_modal_record";
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
  //User
  const [openUserModal, setOpenUserModal] = useState(false);
  //RECORDS
  const [records, setRecords] = useState<gradesType[]>([]);
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);

  const addRecord = (record: gradesType) =>
    setRecords((prev) => [...prev, record]);
  // const importRecords = (data: gradesType[]) =>
  //   setRecords((prev) => [...prev, ...data]);

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
          {title == "Records"
            ? userRole != "teacher"
              ? "Records"
              : "Result"
            : title}
        </h1>
      </div>
      <div>
        <Button
          onClick={() =>
            title == "Records"
              ? setIsRecordModalOpen(true)
              : setOpenUserModal(true)
          }
          className="bg-blue-600 hover:bg-amber-300 hover:text-black cursor-pointer transition-colors duration-200"
        >
          {" "}
          {actionTitle}
        </Button>

        {/* //CREATE USER MODAL */}
        <SimpleModal
          open={openUserModal}
          onClose={() => setOpenUserModal(false)}
          onSubmit={handleUserCreate}
        />
      </div>
      {/* //CREATE RECORD MODAL */}
      {records.length > 0 && <></>}
      <CreateRecordModal
        isOpen={isRecordModalOpen}
        onClose={() => setIsRecordModalOpen(false)}
        onCreate={() => addRecord}
      />
    </div>
  );
};

export default Header;
