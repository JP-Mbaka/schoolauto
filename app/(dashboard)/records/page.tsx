"use client";
import Dropdown from "@/components/custom_dropdown";
import StatusFooter from "@/components/footer_component";
import Header from "@/components/header_component";
import TableComponent from "@/components/table_component";
import React, { useEffect, useState } from "react";
import ResultCard from "../../../components/result_card";
import { sampleData } from "@/helper/data";
import { exportToExcel } from "@/helper/other";
import { createAccountResponse, SummaryRow } from "@/types";
import { dataSubjects, records } from "@/data";

function Amin() {
  const [currentUser, setCurrentUser] = useState<createAccountResponse>();
  const [isSummary, setIsSummary] = useState(true);
  const [level, setLevel] = useState("");
  const [session, setSession] = useState("2024/2025");
  const [selected, setSelected] = useState("");

  useEffect(() => {
    setCurrentUser({
      success: true,
      data: {
        activation_token: "",
        message: "",
        user: {
          user_uuid: "stu001",
          email: "mbakajohpaul@gmail.com",
          role: "TEACHER",
          status: "active",
          salutation: "Master",
          first_name: "JohnPaul",
          last_name: "Mbaka",
          phone: "+2349133950084",
          profile_picture: "",
          student_id: "stu001",
          teacher_id: 0,
          currentLevel: "SS1",
          gender: "Male",
          email_verified: false,
          last_login: "",
          created_by: "",
          created_at: "",
          updated_at: "",
          updated_by: "",
        },
      },
    });
    if (currentUser?.data.user.role === "TEACHER") {
      setIsSummary(false); // teacher sees detailed records by default
    } else {
      setIsSummary(true); // students see summary by default
    }
  }, [currentUser]);

  const handlePrint = () => {
    window.print(); // Will only print what's visible in print media
  };

  type TableRow = Record<string, unknown>;

  const fetchUserSummary = (userId: string): SummaryRow[] => {
    const userRecords = records.filter((record) => record.userId === userId);

    let serial = 1;

    return userRecords.flatMap((record) =>
      record.subjects.map((subject) => ({
        "S/N": serial++,
        Term: subject.term,
        Level: subject.level,
        Session: record.session, // ✅ Match the type exactly
        Avg: subject.gradeAverage,
        Position: subject.position,
      }))
    );
  };

  const fetchRecords = (
    selectedUserId: string,
    selectedLevel: string,
    selectedSession: string
  ): TableRow[] => {
    return records
      .filter(
        (record) =>
          record.userId === selectedUserId && record.session === selectedSession
      )
      .flatMap((record) =>
        record.subjects
          .filter((subject) => subject.level === selectedLevel)
          .map((subject) => {
            const caScores: Record<string, number> = {};
            subject.ca.forEach((ca, idx) => {
              caScores[`CA${idx + 1}`] = ca.score;
            });

            const matchedSubject = dataSubjects.find(
              (sub) => sub.subjectId === subject.subjectId
            );

            return {
              Subject: matchedSubject?.subjectTitle || "Unknown Subject",
              ...caScores,
              EXAM: subject.exam.score,
              AVERAGE: subject.gradeAverage,
              POSITION: subject.position,
            };
          })
      );
  };
  const isSummaryRow = (val: unknown): val is SummaryRow => {
    if (typeof val !== "object" || val === null) return false;

    const obj = val as Record<string, unknown>;
    return (
      typeof obj["S/N"] === "number" &&
      typeof obj.Term === "number" &&
      typeof obj.Level === "string" &&
      typeof obj.Avg === "number" &&
      typeof obj.Position === "number"
    );
  };

  const resultChecker = (val: unknown) => {
    if (!isSummaryRow(val)) {
      console.error("Invalid summary row:", val);
      return;
    }

    setIsSummary(false);
    setLevel(val.Level);
    setSession(val.Session ?? "");
    console.log(val);
  };

  const closeReultChecker = () => {
    setIsSummary(true);
  };

  const generatedData = isSummary
    ? fetchUserSummary(currentUser?.data.user.user_uuid ?? "")
    : fetchRecords(currentUser?.data.user.user_uuid ?? "", level, session);
  const columnsKey =
    generatedData.length > 0 ? Object.keys(generatedData[0]) : [];

  if (isSummary) {
    columnsKey.push("Actions");
  }
  return (
    <div className="h-full w-full bg-slate-100 flex flex-col">
      {isSummary ? (
        <>
          <TableComponent
            columns={columnsKey}
            data={fetchUserSummary(currentUser?.data.user.user_uuid ?? "")}
            userRole={
              currentUser?.data.user.role == "STUDENT" ? "STUDENT" : "TEACHER"
            }
            isSummary={isSummary}
            checkResult={(val) => resultChecker(val)} // ✅ just pass it directly
          />
        </>
      ) : (
        <>
          <Header
            userRole={currentUser?.data.user.role ?? ""}
            title="Records"
            actionTitle="Create"
          />
          <div className="not-printable print:hidden flex-1 bg-slate-100 px-12 py-6">
            <div className="bg-white h-auto w-auto rounded-sm px-4 py-6">
              <div className="flex justify-between items-center mb-2">
                <>
                  {" "}
                  {currentUser?.data.user.role == "TEACHER" ? (
                    <Dropdown
                      label="Select Class"
                      options={["Primary 1", "Primary 2", "Primary 3"]}
                      value={selected}
                      onChange={setSelected}
                    />
                  ) : (
                    <div></div>
                  )}
                  {currentUser?.data.user.role == "TEACHER" ? (
                    <Dropdown
                      label="Select Term"
                      options={["1st Term", "2nd Term", "3rd Term"]}
                      value={selected}
                      onChange={setSelected}
                    />
                  ) : (
                    <div></div>
                  )}
                  {currentUser?.data.user.role == "TEACHER" ? (
                    <Dropdown
                      label="Select Session"
                      options={["2023/2024", "2024/2025", "2025/2026"]}
                      value={selected}
                      onChange={setSelected}
                    />
                  ) : (
                    <div></div>
                  )}
                  {currentUser?.data.user.role == "TEACHER" ? (
                    <Dropdown
                      label="Select Subject"
                      options={["English", "Mathematics", "Chemistry"]}
                      value={selected}
                      onChange={setSelected}
                    />
                  ) : (
                    <div></div>
                  )}
                </>

                <div className="flex space-x-2">
                  {currentUser?.data.user.role != "TEACHER" && (
                    <div
                      onClick={closeReultChecker}
                      className="cursor-pointer px-4 py-2 bg-red-500 text-slate-100"
                    >
                      Close
                    </div>
                  )}
                  <div
                    onClick={handlePrint}
                    className="cursor-pointer px-4 py-2 bg-green-400 "
                  >
                    Print
                  </div>
                  <div
                    onClick={() => exportToExcel(sampleData, "student-results")}
                    className="cursor-pointer px-4 py-2 bg-blue-300 text-slate-100"
                  >
                    Export
                  </div>
                </div>
              </div>
              <div>
                <TableComponent
                  columns={columnsKey}
                  data={fetchRecords(
                    currentUser?.data.user.user_uuid ?? "",
                    level,
                    session
                  )}
                  userRole={
                    currentUser?.data.user.role == "STUDENT"
                      ? "STUDENT"
                      : "TEACHER"
                  }
                  isSummary={isSummary}
                />
              </div>
            </div>
          </div>
          {/* <Footer /> */}
          {currentUser?.data.user.role == "TEACHER" && (
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
        </>
      )}
    </div>
  );
}

export default Amin;
