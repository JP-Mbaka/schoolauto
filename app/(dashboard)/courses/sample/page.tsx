import React, { forwardRef } from "react";

const ResultCard = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} className="p-6 bg-white w-full max-w-2xl mx-auto print:p-0">
      <h1 className="text-xl font-bold mb-4">Student Result</h1>
      <p>
        <strong>Name:</strong> John Doe
      </p>
      <p>
        <strong>Class:</strong> JSS 2
      </p>
      <p>
        <strong>Term:</strong> First Term
      </p>
      <p>
        <strong>Session:</strong> 2024/2025
      </p>

      <table className="mt-4 w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Subject</th>
            <th className="border p-2">Score</th>
            <th className="border p-2">Grade</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-2">Math</td>
            <td className="border p-2">85</td>
            <td className="border p-2">A</td>
          </tr>
          <tr>
            <td className="border p-2">English</td>
            <td className="border p-2">78</td>
            <td className="border p-2">B</td>
          </tr>
          <tr>
            <td className="border p-2">Science</td>
            <td className="border p-2">91</td>
            <td className="border p-2">A</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
});

// ✅ Set a display name for easier debugging
ResultCard.displayName = "ResultCard";

export default ResultCard;
