// ActionButtons.jsx

import React from "react";
import { Pencil, Trash } from "lucide-react";

/**
 * ActionButtons
 * - onEdit(item) / onDelete(item)
 * - small, consistent UI for all lists
 */
const ActionButtons = ({ onEdit, onDelete, item }) => {
  return (
    <div className="flex justify-center gap-2 sm:gap-3" onClick={(e) => e.stopPropagation()}>
      <button
        onClick={() => onEdit?.(item)}
        className="rounded-full border border-green-500/50 bg-white flex items-center justify-center hover:bg-green-50 p-[6px]"
      >
        <Pencil className="text-green-600" size={16} />
      </button>

      <button
        onClick={() => onDelete?.(item)}
        className="rounded-full border border-red-500/50 bg-white flex items-center justify-center hover:bg-red-50 p-[6px]"
      >
        <Trash className="text-red-600" size={16} />
      </button>
    </div>
  );
};

export default ActionButtons;
