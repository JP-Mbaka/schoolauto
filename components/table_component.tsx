import React, { useState } from "react";
import EditModal from "./edit_modal";

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
  const [viewModalData, setViewModalData] = useState<T | null>(null);
  const [editModalData, setEditModalData] = useState<T | null>(null);
  const [tableData, setTableData] = useState<T[]>(data);

  const handleView = (row: T) => {
    setViewModalData(row);
  };

  const handleEdit = (row: T) => {
    setEditModalData(row);
  };

  const handleEditComplete = (updatedRow: T) => {
    const updatedData = tableData.map((item) =>
      item.id === updatedRow.id ? updatedRow : item
    );
    setTableData(updatedData);
    setEditModalData(null);
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
      {/* View Modal */}
      {viewModalData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">View Details</h2>
            <ul className="text-sm">
              {Object.entries(viewModalData).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong> {String(value)}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setViewModalData(null)}
              className="mt-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editModalData && (
        <EditModal
          data={editModalData}
          onClose={() => setEditModalData(null)}
          onSave={handleEditComplete}
        />
      )}
    </div>
  );
};

export default TableComponent;
