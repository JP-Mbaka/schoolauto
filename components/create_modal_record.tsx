import React, { useState } from "react";

interface CA {
  score: number;
  total: number;
  title: string;
}

interface Exam {
  score: number;
  total: number;
  title: string;
}

interface Subject {
  ca: CA[];
  exam: Exam;
  gradeAverage: number;
  position: number;
  highestGrade: number;
  lowestGrade: number;
  term: number;
  level: string;
  session: string;
  subjectId: string;
}

interface GradeRecord {
  gradeId: string;
  userId: string;
  subjects: Subject[];
  studentTotal: number;
  classAverage: number;
  classPosition: number;
  session: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: GradeRecord) => void;
}

export const CreateRecordModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const [form, setForm] = useState({
    session: "",
    level: "",
    term: 1,
    subjectId: "",
    examScore: "",
    examTotal: "",
    ca: [{ score: "", total: "" }],
  });

  const updateCA = (index: number, key: "score" | "total", value: string) => {
    const updatedCA = [...form.ca];
    updatedCA[index][key] = value;
    setForm({ ...form, ca: updatedCA });
  };

  const addCAField = () =>
    setForm({ ...form, ca: [...form.ca, { score: "", total: "" }] });

  const handleSubmit = () => {
    if (
      !form.session ||
      !form.level ||
      !form.subjectId ||
      !form.examScore ||
      !form.examTotal
    )
      return alert("Fill all fields");

    const newRecord: GradeRecord = {
      gradeId: "grd" + Date.now(),
      userId: "stu001",
      subjects: [
        {
          ca: form.ca.map((c, i) => ({
            score: Number(c.score),
            total: Number(c.total),
            title: `CA${i + 1}`,
          })),
          exam: {
            score: Number(form.examScore),
            total: Number(form.examTotal),
            title: "exam",
          },
          gradeAverage: 0,
          position: 0,
          highestGrade: 0,
          lowestGrade: 0,
          term: form.term,
          level: form.level,
          session: form.session,
          subjectId: form.subjectId,
        },
      ],
      studentTotal: 0,
      classAverage: 0,
      classPosition: 0,
      session: form.session,
    };

    onCreate(newRecord);
    setForm({
      session: "",
      level: "",
      term: 1,
      subjectId: "",
      examScore: "",
      examTotal: "",
      ca: [{ score: "", total: "" }],
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-[350px] max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">Create Grade Record</h2>

        <input
          className="w-full border rounded px-2 py-1 mb-2"
          placeholder="Session (e.g. 2024/2025)"
          value={form.session}
          onChange={(e) => setForm({ ...form, session: e.target.value })}
        />

        <input
          className="w-full border rounded px-2 py-1 mb-2"
          placeholder="Level (e.g. SS1)"
          value={form.level}
          onChange={(e) => setForm({ ...form, level: e.target.value })}
        />

        <input
          className="w-full border rounded px-2 py-1 mb-2"
          placeholder="Subject ID (e.g. MTH100)"
          value={form.subjectId}
          onChange={(e) => setForm({ ...form, subjectId: e.target.value })}
        />

        <input
          type="number"
          className="w-full border rounded px-2 py-1 mb-2"
          placeholder="Term (1, 2, or 3)"
          value={form.term}
          onChange={(e) =>
            setForm({ ...form, term: parseInt(e.target.value) || 1 })
          }
        />

        <div className="mb-4">
          <h3 className="font-semibold mb-1">CA Scores</h3>
          {form.ca.map((c, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                className="w-1/2 border rounded px-2 py-1"
                placeholder={`CA${index + 1} Score`}
                value={c.score}
                onChange={(e) => updateCA(index, "score", e.target.value)}
              />
              <input
                className="w-1/2 border rounded px-2 py-1"
                placeholder="Total"
                value={c.total}
                onChange={(e) => updateCA(index, "total", e.target.value)}
              />
            </div>
          ))}
          <button
            onClick={addCAField}
            className="text-blue-500 text-sm underline mb-2"
          >
            + Add CA
          </button>
        </div>

        <h3 className="font-semibold mb-1">Exam</h3>
        <div className="flex gap-2 mb-4">
          <input
            className="w-1/2 border rounded px-2 py-1"
            placeholder="Exam Score"
            value={form.examScore}
            onChange={(e) => setForm({ ...form, examScore: e.target.value })}
          />
          <input
            className="w-1/2 border rounded px-2 py-1"
            placeholder="Total"
            value={form.examTotal}
            onChange={(e) => setForm({ ...form, examTotal: e.target.value })}
          />
        </div>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1 border rounded">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};
