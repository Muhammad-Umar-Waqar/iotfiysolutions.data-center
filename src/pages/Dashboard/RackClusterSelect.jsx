// // src/components/RackClusterSelect.jsx
// import React, { useEffect, useState, useRef } from "react";
// import { useSelector } from "react-redux";

// export default function RackClusterSelect({ value = "", onChange, className = "", disabled = false }) {
//   // const { clusters = [], loading } = useSelector((s) => s.rackCluster || {});

// const { clusters = [], loading = {} } = useSelector((s) => s.rackCluster || {});
// const isLoading = Boolean(loading.fetch || loading.fetchByDc);

// const [selected, setSelected] = useState(value ?? "");
//   const [open, setOpen] = useState(false);
//   const ref = useRef(null);

//   useEffect(() => setSelected(value ?? ""), [value]);

//   useEffect(() => {
//     function outside(e) {
//       if (ref.current && !ref.current.contains(e.target)) setOpen(false);
//     }
//     document.addEventListener("mousedown", outside);
//     return () => document.removeEventListener("mousedown", outside);
//   }, []);

//   const handleSelect = (id) => {
//     setSelected(id);
//     setOpen(false);
//     if (typeof onChange === "function") onChange(id);
//   };

//   // const label = loading ? "Loading clusters..." : (clusters.find((c) => String(c._id) === String(selected))?.name || "Rack Cluster");

//   const label = isLoading
//   ? "Loading clusters..."
//   : clusters.find((c) => String(c._id) === String(selected))?.name || "Rack Cluster";

  
//   return (
//     <div className={className} ref={ref}>
//       <div className="relative">
//         <div
//           role="button"
//           onClick={() => !disabled && setOpen((s) => !s)}
//           className={`px-4 py-2 border cursor-pointer bg-white select-none rounded-full ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
//         >
//           <span className="truncate">{label}</span>
//         </div>

//         {open && (
//           <div className="absolute z-20 mt-2 w-full bg-white border rounded-md shadow-lg max-h-56 overflow-auto">
//             {isLoading  ? (
//               <div className="px-4 py-3 text-sm text-gray-500">Loading...</div>
//             ) : clusters && clusters.length > 0 ? (
//               clusters.map((c) => {
//                 const id = String(c._id);
//                 return (
//                   <div key={id} onClick={() => handleSelect(id)} className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${selected === id ? "bg-gray-50" : ""}`}>
//                     <div className="truncate">{c.name || id}</div>
//                   </div>
//                 );
//               })
//             ) : (
//               <div className="px-4 py-3 text-sm text-gray-500">No clusters</div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }









// src/components/RackClusterSelect.jsx
import * as React from "react";
import { useSelector } from "react-redux";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import CircularProgress from "@mui/material/CircularProgress";

export default function RackClusterSelect({
  value = "",
  onChange,
  label = "Rack Cluster",
  className = "",
  size = "small",
  disabled = false,
}) {
  const { clusters = [], loading = {} } = useSelector(
    (s) => s.rackCluster || {}
  );

  const isLoading = Boolean(loading.fetch || loading.fetchByDc);

  return (
    <FormControl
      size={size}
      fullWidth
      className={className}
      disabled={disabled || isLoading}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "24px", // match DataCenterSelect rounded
        },
      }}
    >
      <InputLabel id="rackcluster-select-label">
        {label}
      </InputLabel>

      <Select
        labelId="rackcluster-select-label"
        value={value || ""}
        label={label}
        onChange={(e) => onChange?.(String(e.target.value))}
        renderValue={(selected) => {
          if (!selected)
            return isLoading
              ? "Loading..."
              : "Select Rack Cluster";

          const cluster = clusters.find(
            (c) => String(c._id) === String(selected)
          );

          return cluster?.name || "Select Rack Cluster";
        }}

        MenuProps={{
          PaperProps: {
            sx: {
              borderRadius: "16px",
              mt: 1,
              maxHeight: "37vh",
            },
          },
        }}
      >
        {isLoading && (
          <MenuItem disabled>
            <CircularProgress size={16} sx={{ mr: 1 }} />
            Loading...
          </MenuItem>
        )}

        {!isLoading && clusters.length === 0 && (
          <MenuItem disabled>No Clusters</MenuItem>
        )}

        {!isLoading &&
          clusters.map((c) => (
            <MenuItem key={c._id} value={String(c._id)}>
              {c.name}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}