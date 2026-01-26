// ManagementSplitLayout.jsx

import React from "react";

/**
 * ManagementSplitLayout
 * - EXACT SAME UI behavior as DataCenterStep
 * - No business logic inside
 */
const ManagementSplitLayout = ({ ListComponent, FormComponent }) => {
  return (
    <div className="h-auto lg:h-full flex flex-col gap-4">
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 h-full">
        {/* LEFT: List */}
        <div className="w-full h-full">
          {ListComponent}
        </div>

        {/* RIGHT: Add / Edit */}
        <div className="w-full h-full">
          {FormComponent}
        </div>
      </div>
    </div>
  );
};

export default ManagementSplitLayout;
