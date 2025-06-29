// import React from "react";

// function Footer() {
//   return (
//     <div className="bg-white py-4 px-12 flex justify-between">
//       <div className="">
//         <h1 className="text-2xl font-semibold">Records</h1>
//         <h1></h1>
//       </div>
//       <div className="bg-blue-600 px-4 py-2 hover:bg-amber-300 rounded-sm cursor-pointer">
//         Create
//       </div>
//     </div>
//   );
// }

// export default Footer;

import React from "react";

interface StatusFooterProps {
  session: string;
  term: string;
  classAverage: number;
  year: string;
  averageStudents: number;
  totalStudents: number;
  noCA: number;
  noExam: number;
  failedStudents: number;
}

const StatusFooter: React.FC<StatusFooterProps> = ({
  session,
  term,
  classAverage,
  year,
  averageStudents,
  totalStudents,
  noCA,
  noExam,
  failedStudents,
}) => {
  const itemClass = "flex flex-col text-sm text-gray-700";
  const labelClass = "font-semibold text-gray-500";
  const valueClass = "text-blue-700";

  return (
    <div className="w-full bg-white border-t border-gray-300 px-4 py-3 mt-6 rounded-sm shadow-sm">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-2 gap-x-6">
        <div className={itemClass}>
          <span className={labelClass}>Session</span>
          <span className={valueClass}>{session}</span>
        </div>
        <div className={itemClass}>
          <span className={labelClass}>Term</span>
          <span className={valueClass}>{term}</span>
        </div>
        <div className={itemClass}>
          <span className={labelClass}>Year</span>
          <span className={valueClass}>{year}</span>
        </div>
        <div className={itemClass}>
          <span className={labelClass}>Class Average</span>
          <span className={valueClass}>{classAverage}</span>
        </div>
        <div className={itemClass}>
          <span className={labelClass}>Average Students</span>
          <span className={valueClass}>{averageStudents}</span>
        </div>
        <div className={itemClass}>
          <span className={labelClass}>Total Students</span>
          <span className={valueClass}>{totalStudents}</span>
        </div>
        <div className={itemClass}>
          <span className={labelClass}>No CA</span>
          <span className={valueClass}>{noCA}</span>
        </div>
        <div className={itemClass}>
          <span className={labelClass}>No Exam</span>
          <span className={valueClass}>{noExam}</span>
        </div>
        <div className={itemClass}>
          <span className={labelClass}>Failed Students</span>
          <span className={valueClass}>{failedStudents}</span>
        </div>
      </div>
    </div>
  );
};

export default StatusFooter;
