// ManagementListShell.jsx

import React from "react";

/**
 * ManagementListShell
 * - columns: JSX <th> elements (one <tr> worth)
 * - children: <tr> rows (table body)
 * - optional className for outer container
 *
 * Important: parent must provide sizing: shell uses flex + min-h-0 to allow inner scroll.
 */
const ManagementListShell = ({ columns, children, className = "" }) => {
  return (
    <div className={`bg-white w-full flex flex-col min-h-0 border border-[#E5E7EB] ${className}`}>
      {/* Header (sticky) */}
      <div className="overflow-x-auto">
        <table className="w-full table-fixed text-left">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>{columns}</tr>
          </thead>
        </table>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto min-h-0">
        <table className="w-full table-fixed text-left">
          <tbody>{children}</tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagementListShell;
