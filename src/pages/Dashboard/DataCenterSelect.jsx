// // src/components/DataCenterSelect.jsx (adapted)
// import React, { useEffect, useState, useRef } from "react";
// import { useSelector } from "react-redux";

// export default function DataCenterSelect({ value = "", onChange, className = "" }) {
//   // const {  = [], loading } = useSelector((s) => s.DataCenter || {});
//   const { DataCenters = [], loading = {} } = useSelector((s) => s.DataCenter || {});
//   const isLoading = Boolean(loading.fetch || loading.fetchAll);


//   const [selected, setSelected] = useState(value ?? "");
//   const [open, setOpen] = useState(false);
//   const ref = useRef(null);

//   useEffect(() => setSelected(value ?? ""), [value]);
//   useEffect(() => {
//     function outside(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
//     document.addEventListener("mousedown", outside);
//     return () => document.removeEventListener("mousedown", outside);
//   }, []);

//   useEffect(() => {
//     // if parent didn't set value and list loaded, pick nothing here (Dashboard orchestration picks)
//     if ((!selected || selected === "") && DataCenters && DataCenters.length > 0 && value === undefined) {
//       // do nothing — let orchestration pick. (We purposely avoid auto-select here)
//     }
//   }, [DataCenters]);

//   const handleSelect = (id) => {
//     setSelected(String(id));
//     if (typeof onChange === "function") onChange(String(id));
//     setOpen(false);
//   };

//   const selectedLabel = isLoading ? "Loading..." : (DataCenters.find(d => String(d._id) === String(selected))?.name || "Data Center");

//   return (
//     <div className={className} ref={ref}>
//       <div role="button" onClick={() => setOpen((s) => !s)} className="px-4 py-2 border rounded-full bg-white cursor-pointer">
//         <span className="truncate">{selectedLabel}</span>
//       </div>

//       {open && (
//         <div className="absolute z-20 mt-2 w-full bg-white border rounded-md shadow-lg max-h-56 overflow-auto">
//           {DataCenters && DataCenters.length > 0 ? DataCenters.map((d) => {
//             const id = String(d._id);
//             return <div key={id} onClick={() => handleSelect(id)} className={`px-4 py-2 cursor-pointer ${selected === id ? "bg-gray-50" : ""}`}>{d.name || id}</div>;
//           }) : <div className="px-4 py-2 text-sm text-gray-500">No Data Centers</div>}
//         </div>
//       )}
//     </div>
//   );
// }







// // src/components/DataCenterSelect.jsx
// import * as React from "react";
// import { useSelector } from "react-redux";
// import FormControl from "@mui/material/FormControl";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import Select from "@mui/material/Select";
// import CircularProgress from "@mui/material/CircularProgress";

// export default function DataCenterSelect({
//   value = "",
//   onChange,
//   label = "Data Center",
//   className = "",
//   size = "small",
// }) {
//   const { DataCenters = [], loading = {} } = useSelector(
//     (s) => s.DataCenter || {}
//   );

//   const isLoading = Boolean(loading.fetch || loading.fetchAll);

//   return (
//     <FormControl
//       size={size}
//       className={className}
//       fullWidth
//       disabled={isLoading}
//     >
//       <InputLabel id="datacenter-select-label">
//         {label}
//       </InputLabel>

//       <Select
//         labelId="datacenter-select-label"
//         value={value || ""}
//         label={label}
//         onChange={(e) => {
//           if (typeof onChange === "function") {
//             onChange(String(e.target.value));
//           }
//         }}
//         renderValue={(selected) => {
//           if (!selected) return isLoading ? "Loading..." : "Select Data Center";
//           const dc = DataCenters.find(
//             (d) => String(d._id) === String(selected)
//           );
//           return dc?.name || "Select Data Center";
//         }}
//       >
//         {isLoading && (
//           <MenuItem disabled>
//             <CircularProgress size={16} className="mr-2" />
//             Loading...
//           </MenuItem>
//         )}

//         {!isLoading && DataCenters.length === 0 && (
//           <MenuItem disabled>No Data Centers</MenuItem>
//         )}

//         {!isLoading &&
//           DataCenters.map((dc) => (
//             <MenuItem key={dc._id} value={String(dc._id)}>
//               {dc.name}
//             </MenuItem>
//           ))}
//       </Select>
//     </FormControl>
//   );
// }








// // src/components/DataCenterSelect.jsx
// import * as React from "react";
// import { useSelector } from "react-redux";
// import FormControl from "@mui/material/FormControl";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import Select from "@mui/material/Select";
// import CircularProgress from "@mui/material/CircularProgress";

// export default function DataCenterSelect({
//   value = "",
//   onChange,
//   label = "Data Center",
//   className = "",
//   size = "small",
// }) {
//   const { DataCenters = [], loading = {} } = useSelector(
//     (s) => s.DataCenter || {}
//   );

//   const isLoading = Boolean(loading.fetch || loading.fetchAll);

//   return (
//     <FormControl
//       size={size}
//       fullWidth
//       className={className}
//       disabled={isLoading}
//       // sx={{
//       //   "& .MuiOutlinedInput-root": {
//       //     borderRadius: "24px", // 👈 rounded-3xl
//       //   },
//       // }}

//       sx={{
//         "& .MuiOutlinedInput-root": {
//           borderRadius: "24px", // match DataCenterSelect rounded
//         },
//       }}
//     >
//       <InputLabel id="datacenter-select-label">
//         {label}
//       </InputLabel>

//       <Select
//         labelId="datacenter-select-label"
//         value={value || ""}
//         label={label}
//         onChange={(e) => onChange?.(String(e.target.value))}
//         renderValue={(selected) => {
//           if (!selected) return isLoading ? "Loading..." : "Select Data Center";
//           const dc = DataCenters.find(
//             (d) => String(d._id) === String(selected)
//           );
//           return dc?.name || "Select Data Center";
//         }}

//         sx={{
//           "& .MuiOutlinedInput-root": {
//             borderRadius: "24px", // match DataCenterSelect rounded
//           },
//         }}



//         MenuProps={{
//           PaperProps: {
//             sx: {
//               borderRadius: "16px",
//               mt: 1,
//               maxHeight: "37vh",
//             },
//           },
//         }}
//       >
//         {isLoading && (
//           <MenuItem disabled>
//             <CircularProgress size={16} sx={{ mr: 1 }} />
//             Loading...
//           </MenuItem>
//         )}

//         {!isLoading && DataCenters.length === 0 && (
//           <MenuItem disabled>No Data Centers</MenuItem>
//         )}

//         {!isLoading &&
//           DataCenters.map((dc) => (
//             <MenuItem key={dc._id} value={String(dc._id)}>
//               {dc.name}
//             </MenuItem>
//           ))}
//       </Select>
//     </FormControl>
//   );
// }





// // src/components/DataCenterSelect.jsx
// import * as React from "react";
// import { useSelector } from "react-redux";

// import FormControl from "@mui/material/FormControl";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import Select from "@mui/material/Select";
// import CircularProgress from "@mui/material/CircularProgress";
// import { useStore } from "../../contexts/storecontexts";

// export default function DataCenterSelect({
//   value = "",
//   onChange,
//   label = "Data Center",
//   className = "",
//   size = "small",
// }) {
//   const { DataCenters = [], loading = {} } = useSelector((s) => s.DataCenter || {});
//   const { user: currentUser } = useStore();

//   const isLoading = Boolean(loading.fetch || loading.fetchAll);

//   // helper - compute option id & label robustly
//   const getOptionId = (dc) => {
//     if (!dc) return "";
//     // manager/user should prefer nested dataCenterId
//     if (currentUser?.role === "manager" || currentUser?.role === "user") {
//       // nested populated object
//       if (dc.dataCenterId && typeof dc.dataCenterId === "object") return dc.dataCenterId._id || dc.dataCenterId.id || "";
//       // nested string id
//       if (dc.dataCenterId && typeof dc.dataCenterId === "string") return dc.dataCenterId;
//       // fallback to top-level
//       return dc._id || "";
//     }
//     // admin: prefer top-level _id (full datacenter objects)
//     return dc._id || (dc.dataCenterId && (dc.dataCenterId._id || dc.dataCenterId)) || "";
//   };

//   const getOptionName = (dc) => {
//     if (!dc) return "";
//     return (dc.dataCenterId && (dc.dataCenterId.name || dc.name)) || dc.name || "";
//   };

//   // normalized options array
//   const options = React.useMemo(() => {
//     if (!Array.isArray(DataCenters)) return [];
//     const map = new Map();
//     return DataCenters.map((dc) => {
//       const id = getOptionId(dc);
//       const name = getOptionName(dc);
//       if (!id) return null;
//       if (map.has(id)) return null;
//       map.set(id, true);
//       return { id, name };
//     }).filter(Boolean);
//   }, [DataCenters, currentUser]);

//   return (
//     <FormControl
//       size={size}
//       fullWidth
//       className={className}
//       disabled={isLoading}
//     >
//       <InputLabel id="datacenter-select-label">{label}</InputLabel>

//       <Select
//         labelId="datacenter-select-label"
//         value={value || ""}
//         label={label}
//         onChange={(e) => onChange?.(String(e.target.value))}
//         renderValue={(selected) => {
//           if (!selected) return isLoading ? "Loading..." : "Select Data Center";
//           const found = options.find((o) => String(o.id) === String(selected));
//           return found?.name || "Select Data Center";
//         }}
//         MenuProps={{
//           PaperProps: { sx: { borderRadius: "24px", mt: 1, maxHeight: "37vh" } },
//         }}
//         sx={{ "& .MuiOutlinedInput-root": { borderRadius: "24px" } }}
//       >
//         {isLoading && (
//           <MenuItem disabled>
//             <CircularProgress size={16} sx={{ mr: 1 }} />
//             Loading...
//           </MenuItem>
//         )}

//         {!isLoading && options.length === 0 && <MenuItem disabled>No Data Centers</MenuItem>}

//         {!isLoading &&
//           options.map((opt) => (
//             <MenuItem key={opt.id} value={String(opt.id)}>
//               {opt.name}
//             </MenuItem>
//           ))}
//       </Select>
//     </FormControl>
//   );
// }









// src/components/DataCenterSelect.jsx
import * as React from "react";
import { useSelector } from "react-redux";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import CircularProgress from "@mui/material/CircularProgress";
import { useStore } from "../../contexts/storecontexts";

export default function DataCenterSelect({
  value = "",
  onChange,
  label = "Data Center",
  className = "",
  size = "small",
}) {
  const { DataCenters = [], loading = {} } = useSelector((s) => s.DataCenter || {});
  const { user: currentUser } = useStore();

  const isLoading = Boolean(loading.fetch || loading.fetchAll);

  // helper - compute option id & label robustly
  const getOptionId = (dc) => {
    if (!dc) return "";
    // manager/user should prefer nested dataCenterId
    if (currentUser?.role === "manager" || currentUser?.role === "user") {
      // nested populated object
      if (dc.dataCenterId && typeof dc.dataCenterId === "object") return dc.dataCenterId._id || dc.dataCenterId.id || "";
      // nested string id
      if (dc.dataCenterId && typeof dc.dataCenterId === "string") return dc.dataCenterId;
      // fallback to top-level
      return dc._id || "";
    }
    // admin: prefer top-level _id (full datacenter objects)
    return dc._id || (dc.dataCenterId && (dc.dataCenterId._id || dc.dataCenterId)) || "";
  };

  const getOptionName = (dc) => {
    if (!dc) return "";
    return (dc.dataCenterId && (dc.dataCenterId.name || dc.name)) || dc.name || "";
  };

  // normalized options array
  const options = React.useMemo(() => {
    if (!Array.isArray(DataCenters)) return [];
    const map = new Map();
    return DataCenters.map((dc) => {
      const id = getOptionId(dc);
      const name = getOptionName(dc);
      if (!id) return null;
      if (map.has(id)) return null;
      map.set(id, true);
      return { id, name };
    }).filter(Boolean);
  }, [DataCenters, currentUser]);

  return (
    <FormControl size={size} fullWidth className={className} disabled={isLoading}>
      <InputLabel id="datacenter-select-label">{label}</InputLabel>

      {/* <Select
        labelId="datacenter-select-label"
        value={value || ""}
        label={label}
        onChange={(e) => onChange?.(String(e.target.value))}
        renderValue={(selected) => {
          if (!selected) return isLoading ? "Loading..." : "Select Data Center";
          const found = options.find((o) => String(o.id) === String(selected));
          return found?.name || "Select Data Center";
        }}
        MenuProps={{
          PaperProps: { sx: { borderRadius: "16px", mt: 1, maxHeight: "37vh" } },
        }}
        sx={{ "& .MuiOutlinedInput-root": { borderRadius: "24px" } }}
      > */}

      <Select
  labelId="datacenter-select-label"
  value={value || ""}
  label={label}
  onChange={(e) => onChange?.(String(e.target.value))}
  renderValue={(selected) => {
    if (!selected) return isLoading ? "Loading..." : "Select Data Center";
    const found = options.find((o) => String(o.id) === String(selected));
    return found?.name || "Select Data Center";
  }}
  MenuProps={{
    PaperProps: { sx: { borderRadius: "24px", mt: 1, maxHeight: "37vh" } },
  }}
  sx={{
    "& .MuiOutlinedInput-notchedOutline": {
      borderRadius: "24px",
    },
  }}
>
        {isLoading && (
          <MenuItem disabled>
            <CircularProgress size={16} sx={{ mr: 1 }} />
            Loading...
          </MenuItem>
        )}

        {!isLoading && options.length === 0 && <MenuItem disabled>No Data Centers</MenuItem>}

        {!isLoading &&
          options.map((opt) => (
            <MenuItem key={opt.id} value={String(opt.id)}>
              {opt.name}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}
