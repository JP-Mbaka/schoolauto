"use client";
import StatusFooter from "@/components/footer_component";
import Header from "@/components/header_component";
import TableComponent from "@/components/table_component";
import React from "react";

function Amin() {
  return (
    <div className="h-full w-full bg-slate-100 flex flex-col">
      <Header />
      <div className="flex-1 bg-slate-100 px-12 py-6">
        <div className="bg-white h-auto w-auto rounded-sm px-4 py-6">
          <div className="flex justify-between items-center mb-2">
            <div>
              <h1>Select Class Name</h1>
              {/* //Drop Down List */}
            </div>
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
    </div>
  );
}

export default Amin;
