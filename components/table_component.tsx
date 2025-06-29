import React, { useState, useMemo } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

interface TableProps<T> {
  columns: string[];
  data: T[];
}

function TableComponent<T extends Record<string, unknown>>({
  columns,
  data,
}: TableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T;
    direction: "asc" | "desc";
  } | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // 🔎 Filter
  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    const lowerSearch = searchTerm.toLowerCase();

    return data.filter((row) =>
      columns.some((col) => {
        const val = row[col as keyof T];
        return val?.toString().toLowerCase().includes(lowerSearch);
      })
    );
  }, [data, searchTerm, columns]);

  // ↕️ Sort
  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;

    const sorted = [...filteredData].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];

      if (aVal === undefined || bVal === undefined) return 0;

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
      }

      return (
        String(aVal).localeCompare(String(bVal)) *
        (sortConfig.direction === "asc" ? 1 : -1)
      );
    });

    return sorted;
  }, [filteredData, sortConfig]);

  // 📄 Pagination
  const totalEntries = sortedData.length;
  const totalPages = Math.ceil(totalEntries / rowsPerPage);
  const startIdx = (currentPage - 1) * rowsPerPage;
  const endIdx = Math.min(startIdx + rowsPerPage, totalEntries);
  const paginatedData = sortedData.slice(startIdx, endIdx);

  const toggleSort = (column: keyof T) => {
    setSortConfig((prev) => {
      if (prev?.key === column) {
        return {
          key: column,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key: column, direction: "asc" };
    });
  };

  return (
    <div className="w-full">
      {/* Search Input */}
      <div className="mb-4 flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Showing {startIdx + 1} to {endIdx} of {totalEntries} entries
        </div>
        <input
          type="text"
          placeholder="Search..."
          className="w-64 p-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // reset to page 1 on search
          }}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-100 text-left">
            <tr>
              {columns.map((col) => (
                <th
                  key={col}
                  className="px-4 py-2 border-b border-gray-300 font-semibold cursor-pointer select-none"
                  onClick={() => toggleSort(col as keyof T)}
                >
                  <div className="flex items-center gap-1">
                    {col}
                    {sortConfig?.key === col &&
                      (sortConfig.direction === "asc" ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      ))}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-4 text-center text-gray-500"
                >
                  No data available
                </td>
              </tr>
            ) : (
              paginatedData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  {columns.map((col) => (
                    <td
                      key={col}
                      className="px-4 py-2 border-b border-gray-200"
                    >
                      {String(row[col as keyof T] ?? "")}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-end items-center gap-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-1 border border-gray-300 bg-white rounded hover:bg-gray-50 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-1 border border-gray-300 bg-white rounded hover:bg-gray-50 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default TableComponent;
