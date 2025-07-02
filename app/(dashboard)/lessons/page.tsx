"use client";
import Dropdown from "@/components/custom_dropdown";
import Header from "@/components/header_component";
import TableComponent from "@/components/table_component";
import { sampleData } from "@/helper/data";
import { exportToExcel } from "@/helper/other";
import React, { useEffect, useState } from "react";

function Payments() {
  const [userRole, setUserRole] = useState("");
  const [selected, setSelected] = useState("");

  useEffect(() => {
    setUserRole("teacher");
  }, []);

  const handlePrint = () => {
    window.print(); // Will only print what's visible in print media
  };
  const columnsKey = sampleData.length > 0 ? Object.keys(sampleData[0]) : [];

  return (
    <div className="h-full w-full bg-slate-100 flex flex-col">
      <Header userRole={userRole} title="Lesson" actionTitle="New Lesson" />
      <div className="flex-1 bg-slate-100 px-12 py-6">
        <div className="bg-white h-auto w-auto rounded-sm px-4 py-6">
          <div className="not-printable print:hidden flex justify-between items-center mb-2">
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
              <div
                onClick={handlePrint}
                className="cursor-pointer px-4 py-2 bg-green-400"
              >
                Print
              </div>
              <div
                onClick={() => exportToExcel(sampleData, "student-results")}
                className="cursor-pointer px-4 py-2 bg-blue-300"
              >
                Export
              </div>
            </div>
          </div>
          <div>
            <TableComponent columns={columnsKey} data={sampleData} />
          </div>
        </div>
        <div></div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default Payments;
