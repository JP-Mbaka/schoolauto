"use client";
import Dropdown from "@/components/custom_dropdown";
import StatusFooter from "@/components/footer_component";
import Header from "@/components/header_component";
import TableComponent from "@/components/table_component";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ResultCard from "../../../components/result_card";
import { sampleData } from "@/helper/data";
import { exportToExcel } from "@/helper/other";
import { createAccountResponse, SummaryRow } from "@/types";
import { dataSubjects, records, users } from "@/data";

function Amin() {
  const [currentUser, setCurrentUser] = useState<createAccountResponse>();
  const [isSummary, setIsSummary] = useState(true);
  const [level, setLevel] = useState("");
  const [session, setSession] = useState("2024/2025");
  const [subject, setSubject] = useState("");
  const [term, setTerm] = useState("");
  const [tableData, setTableData] = useState<TableRow[]>([]);
  const hasSetSummary = useRef(false);
  // Set the current user only once
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
  }, []); // Only run once

  // Handle isSummary logic after user is set
  useEffect(() => {
    if (!hasSetSummary.current && currentUser?.data?.user?.role) {
      setIsSummary(currentUser.data.user.role !== "TEACHER"); // Students get true, Teachers false
      hasSetSummary.current = true;
    }
  }, [currentUser]);

  const handlePrint = () => {
    window.print(); // Will only print what's visible in print media
  };

  type TableRow = Record<string, unknown>;

  const fetchTeachersRecords = useCallback((): TableRow[] => {
    const matchedSubject = dataSubjects.find(
      (sub) => sub.subjectTitle === subject && sub.level === level
    );

    return records
      .filter((record) => record.session === session)
      .flatMap((record) =>
        record.subjects
          .filter(
            (subjectItem) =>
              subjectItem.level === level &&
              subjectItem.term.toString() === term &&
              subjectItem.subjectId === matchedSubject?.subjectId
          )
          .map((subjectItem) => {
            const caScores: Record<string, number> = {};
            subjectItem.ca.forEach((ca, idx) => {
              caScores[`CA${idx + 1}`] = ca.score;
            });

            const matchedUser = users.find(
              (user) => user.data.user.user_uuid === record.userId
            );

            return {
              Subject:
                matchedUser?.data.user.last_name +
                  " " +
                  matchedUser?.data.user.first_name || "Unknown Subject",
              ...caScores,
              EXAM: subjectItem.exam.score,
              AVERAGE: subjectItem.gradeAverage,
              POSITION: subjectItem.position,
            };
          })
      );
  }, [session, term, subject, level]);
  useEffect(() => {
    if (session && term && subject && level) {
      const data = fetchTeachersRecords();
      setTableData(data);
    }
  }, [fetchTeachersRecords, session, term, subject, level]);

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

  const generatedData =
    currentUser?.data.user.role == "TEACHER"
      ? fetchTeachersRecords()
      : isSummary
      ? fetchUserSummary(currentUser?.data.user.user_uuid ?? "")
      : fetchRecords(currentUser?.data.user.user_uuid ?? "", level, session);
  const columnsKey =
    generatedData.length > 0 ? Object.keys(generatedData[0]) : [];

  if (isSummary || currentUser?.data.user.role == "TEACHER") {
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
                      options={["SS1", "SS2", "SS3"]} //["Primary 1", "Primary 2", "Primary 3"]
                      value={level}
                      onChange={setLevel}
                    />
                  ) : (
                    <div></div>
                  )}
                  {currentUser?.data.user.role == "TEACHER" ? (
                    <Dropdown
                      label="Select Term"
                      options={["1", "2", "3", "4"]} //["1st Term", "2nd Term", "3rd Term"]
                      value={term}
                      onChange={setTerm}
                    />
                  ) : (
                    <div></div>
                  )}
                  {currentUser?.data.user.role == "TEACHER" ? (
                    <Dropdown
                      label="Select Session"
                      options={["2023/2024", "2024/2025", "2025/2026"]}
                      value={session}
                      onChange={setSession}
                    />
                  ) : (
                    <div></div>
                  )}
                  {currentUser?.data.user.role == "TEACHER" ? (
                    <Dropdown
                      label="Select Subject"
                      options={["English Language", "Mathematics", "Chemistry"]}
                      value={subject}
                      onChange={setSubject}
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
                {currentUser?.data.user.role == "TEACHER" ? (
                  <TableComponent
                    columns={columnsKey}
                    data={tableData}
                    userRole={
                      currentUser?.data.user.role == "TEACHER"
                        ? "TEACHER"
                        : "STUDENT"
                    }
                    isSummary={isSummary}
                  />
                ) : (
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
                )}
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
