"use client";
import Dropdown from "@/components/custom_dropdown";
import StatusFooter from "@/components/footer_component";
import Header from "@/components/header_component";
import TableComponent from "@/components/table_component";
import React, { useEffect, useState } from "react";
import ResultCard from "../../../components/result_card";
import { sampleData } from "@/helper/data";
import { exportToExcel } from "@/helper/other";

function Amin() {
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
      <Header userRole={userRole} title="Records" actionTitle="Create" />
      <div className="not-printable print:hidden flex-1 bg-slate-100 px-12 py-6">
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
      </div>
      {/* <Footer /> */}
      {userRole == "teacher" && (
        <StatusFooter
          session="2024/2025"
          term="Second"
          year="JSS 2"
          classAverage={72.5}
          averageStudents={15}
          totalStudents={30}
          noCA={2}
          noExam={1}
          failedStudents={3}
        />
      )}
      <div className="hidden print:block">
        <ResultCard />
      </div>
    </div>
  );
}

export default Amin;
