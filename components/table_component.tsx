import React from "react";

interface TableProps<T> {
  columns: string[];
  data: T[];
  userRole: "TEACHER" | "STUDENT";
  isSummary: boolean;
  checkResult?: (data: unknown) => void;
}

const TableComponent = <T extends Record<string, unknown>>({
  columns,
  data,
  userRole,
  isSummary,
  checkResult,
}: TableProps<T>) => {
  const handleView = (row: T) => {
    console.log("View:", row);
    // Add navigation or modal logic here
  };

  const handleEdit = (row: T) => {
    console.log("Edit:", row);
    // Add edit logic here
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                className="px-4 py-2 text-left border-b border-gray-300"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50">
              {columns.map((col) => (
                <td key={col} className="px-4 py-2 border-b border-gray-200">
                  {col === "Actions" ? (
                    <div className="flex gap-2">
                      {(isSummary == true || userRole === "TEACHER") && (
                        <button
                          title="View"
                          onClick={
                            userRole === "TEACHER"
                              ? () => handleView(row)
                              : () => checkResult!(row)
                          }
                          className="text-blue-600 hover:underline"
                        >
                          👁️
                        </button>
                      )}
                      {userRole === "TEACHER" && (
                        <button
                          title="Edit"
                          onClick={() => handleEdit(row)}
                          className="text-green-600 hover:underline"
                        >
                          ✏️
                        </button>
                      )}
                    </div>
                  ) : (
                    String(row[col as keyof T] ?? "")
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
