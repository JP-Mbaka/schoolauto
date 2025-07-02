import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportToExcel = (jsonData: object[], fileName = "data") => {
  const worksheet = XLSX.utils.json_to_sheet(jsonData);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const data = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(data, `${fileName}.xlsx`);
};

export const parseStringify = (value: unknown) =>
  JSON.parse(JSON.stringify(value));

export function interpretError(error: Error) {
  if (error.message.includes("NetworkError")) {
    return "Network issue detected. Please check your internet connection.";
  }
  if (error.message.includes("500")) {
    return "Server error. Please try again later.";
  }
  if (error.message.includes("404")) {
    return "Requested resource not found.";
  }
  if (error.message.includes("Invalid credentials")) {
    return "Invalid credentials. Please check the email and password.";
  }
  return "An unexpected error occurred. Please try again.";
}
