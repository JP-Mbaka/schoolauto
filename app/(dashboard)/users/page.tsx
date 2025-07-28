"use client";
import { getData } from "@/action/api_fetch";
import Dropdown from "@/components/custom_dropdown";
import Header from "@/components/header_component";
import LoadingSimpleModal from "@/components/loading";
import TableComponent from "@/components/table_component";
// import { showNotification } from "@/components/popupAlert";
import { sampleData } from "@/helper/data";
import { exportToExcel } from "@/helper/other";
import React, { useEffect, useState } from "react";

function Users() {
  const [userRole, setUserRole] = useState("");
  const [selected, setSelected] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("Execution started");
    setUserRole("teacher");

    fetchStudents();
  }, []);
  const handlePrint = () => {
    window.print(); // Will only print what's visible in print media
  };
  const fetchStudents = async () => {
    console.log("Execution started in fetchStudents");
    try {
      const response = await getData("auth/users?page=1&limit=10&role=STUDENT");
      setUsers(response.data); // adjust if your API wraps data
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else if (typeof err === "string") {
        setError(err);
      } else {
        setError("Something went wrong");
      }
      console.log(`Testing testing: ${error}`);
      // const errorMessage = interpretError(error);
      // showNotification(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const columnsKey = users.length > 0 ? Object.keys(users[0]) : [];
  return (
    <div className="h-full w-full bg-slate-100 flex flex-col">
      <Header userRole={userRole} title="All Users" actionTitle="Invite User" />
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
            <TableComponent
              columns={columnsKey}
              data={users}
              userRole={"TEACHER"}
              isSummary={false}
            />
          </div>
        </div>
        <div></div>
      </div>
      {/* <Footer /> */}
      <LoadingSimpleModal
        open={loading}
        onClose={function (): void {
          setLoading(false);
        }}
      />
    </div>
  );
}

export default Users;
