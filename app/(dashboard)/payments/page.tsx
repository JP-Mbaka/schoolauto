"use client";
import Dropdown from "@/components/custom_dropdown";
import Header from "@/components/header_component";
import TableComponent from "@/components/table_component";
import React, { useEffect, useState } from "react";

function Payments() {
  const [userRole, setUserRole] = useState("");
  const [selected, setSelected] = useState("");

  useEffect(() => {
    setUserRole("teacher");
  }, []);
  return (
    <div className="h-full w-full bg-slate-100 flex flex-col">
      <Header userRole={userRole} title="Payments" />
      <div className="flex-1 bg-slate-100 px-12 py-6">
        <div className="bg-white h-auto w-auto rounded-sm px-4 py-6">
          <div className="flex justify-between items-center mb-2">
            <Dropdown
              label="Select Class"
              options={["Primary 1", "Primary 2", "Primary 3"]}
              value={selected}
              onChange={setSelected}
            />

            {/* <p className="mt-4 text-sm text-gray-600">
                  Selected: {selected}
                </p> */}

            <div className="flex space-x-2">
              <div className="px-4 py-2 bg-green-400">Print</div>
              <div className="px-4 py-2 bg-blue-300">Export</div>
            </div>
          </div>
          <div>
            <TableComponent
              columns={["Name", "Age", "Email"]}
              data={[
                { Name: "Alice", Age: 24, Email: "alice@example.com" },
                { Name: "Bob", Age: 30, Email: "bob@example.com" },
                { Name: "Charlie", Age: 22, Email: "charlie@example.com" },
              ]}
            />
          </div>
        </div>
        <div></div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default Payments;
