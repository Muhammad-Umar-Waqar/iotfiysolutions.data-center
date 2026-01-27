// // RackDetailsPanel.jsx

// // src/pages/Dashboard/RackDetailsPanel.jsx
// import React from "react";
// import { IconButton, Skeleton } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// // import QRCode from "../../components/QrCode"
// // import AlertsChart from "./AlertsChart"; 
// import { useMemo } from "react";

// export default function RackDetailsPanel({
//   rack = null,
//   loading = false,
//   noData = false,
//   closeIcon = false,
//   onClose = undefined,
// }) {
//     console.log("Rack>", rack)
//   // helper to show integer part
//   const toInt = (v) => {
//     const n = Number(v);
//     return Number.isFinite(n) ? Math.trunc(n) : null;
//   };

//   const displayFreezerTemp = toInt(rack?.tempV ?? rack?.tempA ?? null);
//   const displayAmbientTemp = toInt(rack?.humiV ?? rack?.humiA ?? null);

//   // last update from sensorValues[0]?.updatedAt (dominant sensor)
//   const lastUpdate = useMemo(() => {
//     if (!rack || !Array.isArray(rack.sensorValues) || rack.sensorValues.length === 0) return null;
//     const latest = rack.sensorValues.reduce((acc, s) => (!acc || new Date(s.updatedAt) > new Date(acc.updatedAt) ? s : acc), null);
//     return latest?.updatedAt ?? null;
//   }, [rack]);

//   const formatLastUpdate = (time) => {
//     if (!time) return null;
//     const d = new Date(time);
//     return d.toLocaleString();
//   };

//   if (loading && !rack) {
//     // small skeleton
//     return (
//       <div className="p-4 space-y-3">
//         <Skeleton variant="text" width={120} height={24} />
//         <div className="flex gap-3">
//           <Skeleton variant="rectangular" width={120} height={96} />
//           <div className="flex-1 space-y-2">
//             <Skeleton variant="text" width="80%" />
//             <Skeleton variant="text" width="60%" />
//             <Skeleton variant="text" width="40%" />
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (noData && !rack) {
//     return (
//       <div className="p-4 text-center text-gray-500">
//         <div className="mb-2">No rack selected</div>
//         <div className="text-sm">Select a rack to view its details</div>
//       </div>
//     );
//   }

//   return (
//     <div className="h-full grid grid-cols-2 justify-start">
//       {/* <div className="w-full rounded-lg p-4 sm:p-3 shadow-sm space-y-3" style={{ backgroundColor: "#07518D12" }}>
//         {closeIcon && (
//           <div className="flex justify-between items-center">
//             <img src="/iotfiy_logo_rpanel.svg" alt="logo" className="h-[30px] w-auto" />
//             <IconButton size="small" onClick={() => typeof onClose === "function" && onClose()}>
//               <CloseIcon />
//             </IconButton>
//           </div>
//         )}

//         <div className="flex justify-between items-center border-b pb-2">
//           <div>
//             <p className="text-sm text-[#64748B]">Rack</p>
//             <h3 className="text-lg font-bold">{rack?.name ?? <Skeleton variant="text" width={100} />}</h3>
//             <p className="text-xs text-gray-500">{rack?.hub?.name ? `Hub: ${rack.hub.name}` : ""}</p>
//           </div>

//           <div className="text-right">
//             <p className="text-xs text-gray-500">Sensors</p>
//             <p className="font-semibold">{Array.isArray(rack?.sensors) ? rack.sensors.length : 0}</p>
//           </div>
//         </div>

//         <div className="relative w-full overflow-hidden">
//           <div className="flex items-center justify-between py-3">
//             <div>
//               <p className="text-sm text-gray-600">Freezer</p>
//               <div className="text-2xl font-bold">{displayFreezerTemp ?? "-" }°C</div>
//             </div>

//             <div>
//               <p className="text-sm text-gray-600">Ambient</p>
//               <div className="text-2xl font-bold">{displayAmbientTemp ?? "-" }%</div>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-3 gap-3">
//           <div className={`p-2 rounded border ${rack?.tempA ? "border-red-500" : "border-gray-300"}`}>
//             <div className="text-xs">Temperature Alert</div>
//             <div className="font-semibold">{rack?.tempA ? "Detected" : "Not Detected"}</div>
//           </div>

//           <div className={`p-2 rounded border ${rack?.humiA ? "border-yellow-600" : "border-gray-300"}`}>
//             <div className="text-xs">Humidity Alert</div>
//             <div className="font-semibold">{rack?.humiA ? "Detected" : "Not Detected"}</div>
//           </div>

//           <div className="p-2 rounded border border-gray-300">
//             <div className="text-xs">Last Update</div>
//             <div className="font-semibold">{lastUpdate ? formatLastUpdate(lastUpdate) : "—"}</div>
//           </div>
//         </div>

       
//         <div className="mt-3">
//           <h4 className="text-sm font-medium mb-2">Sensors</h4>
//           <div className="space-y-2 max-h-[160px] overflow-auto custom-scrollbar pr-2">
//             {rack?.sensorValues && rack.sensorValues.length > 0 ? (
//               rack.sensorValues.map((s, idx) => (
//                 <div key={idx} className="flex justify-between items-center p-2 bg-white rounded border">
//                   <div>
//                     <div className="text-sm font-medium">{s.sensorName ?? `Sensor ${idx + 1}`}</div>
//                     <div className="text-xs text-gray-500">Updated: {s.updatedAt ? new Date(s.updatedAt).toLocaleString() : "—"}</div>
//                   </div>
//                   <div className="text-right">
//                     <div className="text-sm">{s.temperature ?? "-"}°C</div>
//                     <div className="text-sm">{s.humidity ?? "-"}%</div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="text-sm text-gray-500">No sensor readings available</div>
//             )}
//           </div>
//         </div>
//       </div> */}

// <div>
//     sdd
// </div>
//       {/* optional charts area (reuse AlertsChart if you want) */}
//       <div className="">
//         {/* If you have per-rack chart data you can show it here */}
//         <div className="flex flex-col items-center justify-center">
//              <div>
//                 <p className="text-xs text-end">Rack Table</p>
//                 <div className="flex items-center justify-center">
//                     <img src="/Server.svg" alt="Table" className="w-auto h-[3rem]" />
//                     <h1 className="text-lg font-semibold">{rack?.col?.toUpperCase()} {rack?.row?.toUpperCase()}</h1>
//                 </div>
//             </div>
//              <div>
//                 <p className="text-xs text-end">Temperature</p>
//                 <div className="flex items-center justify-center">
//                     <img src="/freezer-graphic.png" alt="Table" className="w-auto h-[3rem]" />
//                     <h1 className="text-lg font-semibold">{rack?.col?.toUpperCase()} {rack?.row?.toUpperCase()}</h1>
//                 </div>
//             </div>
//              <div>
//                 <p className="text-xs text-end">Humidity</p>
//                 <div className="flex items-center justify-center">
//                     <img src="/card-humidity-icon.svg" alt="Table" className="w-auto h-[3rem]" />
//                     <h1 className="text-lg font-semibold">{rack?.col?.toUpperCase()} {rack?.row?.toUpperCase()}</h1>
//                 </div>
//             </div>
//         </div>
//       </div>
//     </div>
//   );
// }





// // src/pages/Dashboard/RackDetailsPanel.jsx
// import React, { useMemo, useState } from "react";
// import { IconButton, Skeleton } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";

// /**
//  * RackDetailsPanel
//  *
//  * Props:
//  *  - rack: object | null        (selected rack object)
//  *  - loading: boolean          (true while fetching)
//  *  - noData: boolean           (true when no rack selected)
//  *  - closeIcon: boolean        (show close button)
//  *  - onClose: function
//  */
// export default function RackDetailsPanel({
//   rack = null,
//   loading = false,
//   noData = false,
//   closeIcon = false,
//   onClose = undefined,
// }) {
//   // helper to show integer part or dash
//   const toInt = (v) => {
//     const n = Number(v);
//     return Number.isFinite(n) ? Math.trunc(n) : "—";
//   };

//   // normalize sensor lists:
//   // - sensors: static list from rack.sensors (may have _id nested as object)
//   // - sensorValues: live readings; each has sensorName, temperature, humidity, updatedAt
//   const sensorsList = Array.isArray(rack?.sensors)
//     ? rack.sensors.map((s) => {
//         // accept both { _id: { _id: '...' } } or { _id: '...' }
//         const id =
//           s?._id && typeof s._id === "object" ? s._id._id ?? s._id : s._id ?? null;
//         return { id, name: s?.name ?? String(id) };
//       })
//     : [];

//   const sensorValues = Array.isArray(rack?.sensorValues) ? rack.sensorValues : [];

//   // compute dominant sensor (latest by updatedAt OR highest temp if no updatedAt)
//   const dominantSensor = useMemo(() => {
//     if (!sensorValues.length) return null;
//     // prefer latest updatedAt; fallback to highest temperature
//     const byDate = [...sensorValues].filter(s => s.updatedAt).sort((a,b) => new Date(b.updatedAt) - new Date(a.updatedAt));
//     if (byDate.length) return byDate[0];
//     return sensorValues.reduce((acc,s) => (!acc || (s.temperature ?? -Infinity) > (acc.temperature ?? -Infinity) ? s : acc), null);
//   }, [sensorValues]);

//   // display top-level values: prefer rack.tempV/humiV then dominant sensor values
//   const displayFreezerTemp = rack?.tempV ?? dominantSensor?.temperature ?? null;
//   const displayAmbientHumi = rack?.humiV ?? dominantSensor?.humidity ?? null;

//   // Last update timestamp (dominant or latest sensor)
//   const lastUpdate = useMemo(() => {
//     if (!sensorValues.length) return null;
//     const latest = sensorValues.reduce((acc, s) => {
//       if (!s?.updatedAt) return acc;
//       if (!acc) return s;
//       return new Date(s.updatedAt) > new Date(acc.updatedAt) ? s : acc;
//     }, null);
//     return latest?.updatedAt ?? null;
//   }, [sensorValues]);

//   const formatLastUpdate = (time) => {
//     if (!time) return "—";
//     try {
//       const d = new Date(time);
//       return d.toLocaleString();
//     } catch {
//       return String(time);
//     }
//   };

//   // sensor selector: choose sensor to show highlighted detail
//   const defaultSelectedSensorId = sensorValues.length ? (sensorValues[0].sensorName ?? null) : (sensorsList[0]?.name ?? null);
//   const [selectedSensorName, setSelectedSensorName] = useState(defaultSelectedSensorId);

//   // helper to find reading for sensor name
//   const findReadingByName = (name) => {
//     if (!name) return null;
//     return sensorValues.find(s => (s.sensorName ?? s.name) === name) || null;
//   };

//   // Loading skeleton UI
//   if (loading && !rack) {
//     return (
//       <div className="p-4 space-y-3">
//         <Skeleton variant="text" width={160} height={28} />
//         <div className="flex gap-3">
//           <Skeleton variant="rectangular" width={140} height={100} />
//           <div className="flex-1 space-y-2">
//             <Skeleton variant="text" width="70%" />
//             <Skeleton variant="text" width="50%" />
//             <Skeleton variant="text" width="30%" />
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (noData && !rack) {
//     return (
//       <div className="p-4 text-center text-gray-500">
//         <div className="mb-2">No rack selected</div>
//         <div className="text-sm">Select a rack to view its details</div>
//       </div>
//     );
//   }

//   // actual UI
//   return (
//     <div className="h-full p-4">
//       {/* Header */}
//       <div className="flex items-start justify-between gap-3 mb-3">
//         <div className="flex-1 min-w-0">
//           <p className="text-xs text-gray-500">Rack</p>
//           <h3 className="text-lg font-bold leading-tight truncate">{rack?.name ?? "—"}</h3>
//           <p className="text-xs text-gray-400">
//             {rack?.hub?.name ? `Hub: ${rack.hub.name}` : "Hub: —"} •{" "}
//             <span className="font-medium">{Array.isArray(rack?.sensors) ? rack.sensors.length : 0}</span>{" "}
//             sensors
//           </p>
//         </div>

//         {closeIcon && (
//           <IconButton size="small" onClick={() => typeof onClose === "function" && onClose()}>
//             <CloseIcon />
//           </IconButton>
//         )}
//       </div>

//       {/* Top metrics (Freezer / Humidity) */}
//       <div className="grid grid-cols-2 gap-3 mb-3">
//         <div className="bg-white rounded-xl shadow-sm border p-4 flex flex-col items-start">
//           <div className="text-sm text-gray-500">Freezer</div>
//           <div className="flex items-end gap-2 mt-2">
//             <img src="/freezer-graphic.png" alt="" className="h-8 w-auto" />
//             <div>
//               <div className="text-2xl font-bold">{displayFreezerTemp !== null ? toInt(displayFreezerTemp) : "—"}°C</div>
//               <div className="text-xs text-gray-400">value</div>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow-sm border p-4 flex flex-col items-start">
//           <div className="text-sm text-gray-500">Ambient</div>
//           <div className="flex items-end gap-2 mt-2">
//             <img src="/card-humidity-icon.svg" alt="" className="h-8 w-auto" />
//             <div>
//               <div className="text-2xl font-bold">{displayAmbientHumi !== null ? toInt(displayAmbientHumi) : "—"}%</div>
//               <div className="text-xs text-gray-400">value</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Alerts + last update */}
//       <div className="flex items-center gap-3 mb-4">
//         <div className={`px-3 py-1 rounded-full text-sm font-semibold ${rack?.tempA ? "bg-red-50 text-red-600 border border-red-100" : "bg-gray-50 text-gray-700 border border-gray-100"}`}>
//           {rack?.tempA ? "Temperature Alert" : "No Temperature Alert"}
//         </div>

//         <div className={`px-3 py-1 rounded-full text-sm font-semibold ${rack?.humiA ? "bg-yellow-50 text-yellow-700 border border-yellow-100" : "bg-gray-50 text-gray-700 border border-gray-100"}`}>
//           {rack?.humiA ? "Humidity Alert" : "No Humidity Alert"}
//         </div>

//         <div className="ml-auto text-xs text-gray-500">
//           Last Update: <span className="font-medium">{lastUpdate ? formatLastUpdate(lastUpdate) : "—"}</span>
//         </div>
//       </div>

//       {/* Sensor selector + highlighted sensor card */}
//       <div className="mb-3">
//         <div className="flex items-center gap-3">
//           <label className="text-sm text-gray-600">Sensor:</label>

//           {sensorValues.length || sensorsList.length ? (
//             <select
//               value={selectedSensorName ?? ""}
//               onChange={(e) => setSelectedSensorName(e.target.value)}
//               className="appearance-none px-3 py-2 border rounded-2xl w-full max-w-xs focus:outline-none focus:ring-1 focus:ring-blue-300"
//             >
//               {/* prefer sensorValues names first (recent readings), then sensorsList names */}
//               {sensorValues.map((sv, idx) => {
//                 const name = sv.sensorName ?? sv.name ?? `Sensor ${idx + 1}`;
//                 return <option key={`sv-${idx}`} value={name}>{name}</option>;
//               })}
//               {sensorValues.length === 0 && sensorsList.map((s) => (
//                 <option key={`s-${s.id ?? s.name}`} value={s.name}>{s.name}</option>
//               ))}
//             </select>
//           ) : (
//             <div className="text-sm text-gray-500">No sensors</div>
//           )}
//         </div>

//         {/* highlighted sensor summary */}
//         {selectedSensorName && (
//           <div className="mt-3 bg-white border rounded-lg p-3 shadow-sm flex items-center justify-between">
//             <div>
//               <div className="text-sm font-medium">{selectedSensorName}</div>
//               <div className="text-xs text-gray-400">Latest reading</div>
//             </div>

//             <div className="text-right">
//               <div className="text-lg font-bold">
//                 {(() => {
//                   const r = findReadingByName(selectedSensorName);
//                   return r && (r.temperature !== undefined && r.temperature !== null) ? `${toInt(r.temperature)}°C` : "—";
//                 })()}
//               </div>
//               <div className="text-sm text-gray-500">
//                 {(() => {
//                   const r = findReadingByName(selectedSensorName);
//                   return r && (r.humidity !== undefined && r.humidity !== null) ? `${toInt(r.humidity)}%` : "—";
//                 })()}
//               </div>
//               <div className="text-xs text-gray-400 mt-1">
//                 {(() => {
//                   const r = findReadingByName(selectedSensorName);
//                   return r?.updatedAt ? new Date(r.updatedAt).toLocaleString() : "No timestamp";
//                 })()}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Sensors list (scrollable) */}
//       <div className="mt-2">
//         <h4 className="text-sm font-medium mb-2">Sensors</h4>

//         <div className="space-y-2 max-h-[180px] overflow-y-auto pr-2">
//           {sensorValues.length ? (
//             sensorValues.map((s, idx) => {
//               const name = s.sensorName ?? s.name ?? `Sensor ${idx + 1}`;
//               return (
//                 <div key={`${name}-${idx}`} className="flex items-center justify-between p-2 bg-white border rounded shadow-sm">
//                   <div>
//                     <div className="text-sm font-medium">{name}</div>
//                     <div className="text-xs text-gray-400">Updated: {s.updatedAt ? new Date(s.updatedAt).toLocaleString() : "—"}</div>
//                   </div>
//                   <div className="text-right">
//                     <div className="text-sm font-semibold">{s.temperature !== undefined && s.temperature !== null ? `${toInt(s.temperature)}°C` : "—"}</div>
//                     <div className="text-sm text-gray-500">{s.humidity !== undefined && s.humidity !== null ? `${toInt(s.humidity)}%` : "—"}</div>
//                   </div>
//                 </div>
//               );
//             })
//           ) : sensorsList.length ? (
//             // no live values, show sensor names with placeholders
//             sensorsList.map((s, idx) => (
//               <div key={`${s.id ?? s.name}-${idx}`} className="flex items-center justify-between p-2 bg-white border rounded shadow-sm">
//                 <div>
//                   <div className="text-sm font-medium">{s.name}</div>
//                   <div className="text-xs text-gray-400">No live reading</div>
//                 </div>
//                 <div className="text-right text-sm text-gray-500">—</div>
//               </div>
//             ))
//           ) : (
//             <div className="text-sm text-gray-500">No sensor readings available</div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }





// import * as React from "react";
// import { Box, Typography, Chip, Stack } from "@mui/material";

// export default function RackDetailsPanel({ rack }) {
//   if (!rack) {
//     return (
//       <Box p={3}>
//         <Typography variant="body2" color="text.secondary">
//           Select a rack to view details
//         </Typography>
//       </Box>
//     );
//   }

//   const { name, hub, row, col, tempV, humiV, tempA, humiA, sensors = [] } = rack;

//   return (
//     <Box p={3} display="flex" flexDirection="column" gap={2}>
//       {/* Header */}
//       <Box>
//         <Typography variant="h6" fontWeight={600}>
//           {name}
//         </Typography>
//         <Typography variant="caption" color="text.secondary">
//           {hub?.name} • {row.toUpperCase()} / {col.toUpperCase()}
//         </Typography>
//       </Box>

//       {/* Values */}
//       <Stack direction="row" spacing={1}>
//         <Chip
//           label={`Temp: ${tempV ?? "N/A"}°C`}
//           color={tempA ? "error" : "default"}
//           size="small"
//         />
//         <Chip
//           label={`Humidity: ${humiV ?? "N/A"}%`}
//           color={humiA ? "warning" : "default"}
//           size="small"
//         />
//       </Stack>

//       {/* Sensors */}
//       <Box>
//         <Typography
//           variant="caption"
//           color="text.secondary"
//           sx={{ mb: 0.5, display: "block" }}
//         >
//           Sensors
//         </Typography>

//         <Stack spacing={0.5}>
//           {sensors.length === 0 ? (
//             <Typography variant="body2" color="text.secondary">
//               No sensors attached
//             </Typography>
//           ) : (
//             sensors.map((s) => (
//               <Typography key={s._id} variant="body2">
//                 • {s.name}
//               </Typography>
//             ))
//           )}
//         </Stack>
//       </Box>
//     </Box>
//   );
// }



// import * as React from "react";
// import {
//   Box,
//   Typography,
//   Chip,
//   Stack,
//   Select,
//   MenuItem,
//   Divider,
// } from "@mui/material";

// export default function RackDetailsPanel({ rack }) {
//   const [selectedSensorId, setSelectedSensorId] = React.useState("");

//   React.useEffect(() => {
//     if (rack?.sensors?.length) {
//       setSelectedSensorId(rack.sensors[0]._id);
//     }
//   }, [rack]);

//   if (!rack) {
//     return (
//       <Box p={3}>
//         <Typography variant="body2" color="text.secondary">
//           Select a rack to view details
//         </Typography>
//       </Box>
//     );
//   }

//   const { name, hub, row, col, sensors = [] } = rack;

//   const selectedSensor =
//     sensors.find((s) => s._id === selectedSensorId) || sensors[0];

//   return (
//     <Box
//       p={2.5}
//       sx={{
//         borderRadius: 2,
//         border: "1px solid",
//         borderColor: "divider",
//         backgroundColor: "background.paper",
//       }}
//     >
//       {/* Header */}
//       <Stack spacing={0.3}>
//         <Typography fontWeight={600}>{name}</Typography>
//         <Typography variant="caption" color="text.secondary">
//           {hub?.name} • {row?.toUpperCase()} / {col?.toUpperCase()}
//         </Typography>
//       </Stack>

//       <Divider sx={{ my: 1.5 }} />

//       {/* Sensor Select */}
//       <Stack spacing={1}>
//         <Typography variant="caption" color="text.secondary">
//           Sensor
//         </Typography>

//         <Select
//           size="small"
//           value={selectedSensorId}
//           onChange={(e) => setSelectedSensorId(e.target.value)}
//           fullWidth
//         >
//           {sensors.map((sensor) => (
//             <MenuItem key={sensor._id} value={sensor._id}>
//               {sensor.name}
//             </MenuItem>
//           ))}
//         </Select>
//       </Stack>

//       {/* Sensor Values */}
//       {selectedSensor ? (
//         <Stack direction="row" spacing={1} mt={2}>
//           <Chip
//             label={`Temp: ${selectedSensor.tempV ?? "N/A"}°C`}
//             size="small"
//             color={selectedSensor.tempA ? "error" : "default"}
//           />
//           <Chip
//             label={`Humidity: ${selectedSensor.humiV ?? "N/A"}%`}
//             size="small"
//             color={selectedSensor.humiA ? "warning" : "default"}
//           />
//         </Stack>
//       ) : (
//         <Typography variant="body2" color="text.secondary" mt={2}>
//           No sensor data available
//         </Typography>
//       )}
//     </Box>
//   );
// }







// import * as React from "react";
// import {
//   Box,
//   Typography,
//   Chip,
//   Stack,
//   Select,
//   MenuItem,
//   Divider,
// } from "@mui/material";

// /* ================= MOCK DATA ================= */

// const mockRack = {
//   _id: "rack_01",
//   name: "rack a1",

//   hub: {
//     _id: "hub_001",
//     name: "Primary Data Center",
//   },

//   row: "r1",
//   col: "c4",

//   tempV: 33.8,
//   humiV: 66,

//   // alerts
//   tempA: true,
//   humiA: false,

//   sensors: [
//     { _id: "sensor_001", name: "Top Sensor" },
//     { _id: "sensor_002", name: "Middle Sensor" },
//     { _id: "sensor_003", name: "Bottom Sensor" },
//   ],

//   sensorValues: [
//     {
//       sensorId: "sensor_001",
//       temperature: 35.4,
//       humidity: 72,
//     },
//     {
//       sensorId: "sensor_002",
//       temperature: 32.1,
//       humidity: 64,
//     },
//     {
//       sensorId: "sensor_003",
//       temperature: 29.9,
//       humidity: 58,
//     },
//   ],
// };

// /* ================= COMPONENT ================= */

// export default function RackDetailsPanel() {
//   const rack = mockRack;
//   const [sensorId, setSensorId] = React.useState("");

//   React.useEffect(() => {
//     if (rack?.sensors?.length) {
//       setSensorId(rack.sensors[0]._id);
//     }
//   }, [rack]);

//   const {
//     name,
//     hub,
//     row,
//     col,
//     tempA,
//     humiA,
//     sensors = [],
//     sensorValues = [],
//   } = rack;

//   const selectedSensorValue = sensorValues.find(
//     (sv) => sv.sensorId === sensorId
//   );

//   return (
//     <Box
//       p={2.5}
//       sx={{
//         borderRadius: 2,
//         borderColor: "divider",
//         backgroundColor: "#ffffffc5",
//       }}
//     >
//       {/* Header */}
//       <div className="flex items-center gap-3">
//         <img src="/Server.svg" className="w-auto h-[5rem]" alt="" />
//         <Stack>
//           <Typography fontWeight={400}>
//             {name.charAt(0).toUpperCase() + name.slice(1)}
//           </Typography>
//           <Typography variant="caption" color="text.secondary">
//             {hub.name} • {row.toUpperCase()} / {col.toUpperCase()}
//           </Typography>
//         </Stack>
//       </div>

//       <Divider sx={{ my: 1.5 }} />

//       {/* Rack Status */}
//       <div className="grid sm:grid-cols-3 place-items-center gap-4">
//         <div className="flex items-end gap-1">
//           <img src="/yellow-alert.svg" className="h-[1.5rem]" alt="" />
//           <span className="font-bold text-xs">Status</span>
//         </div>

//         <div
//           className={`icon-number-align border rounded-sm p-1 w-full ${
//             tempA ? "border-yellow-600" : "border-gray-400"
//           }`}
//         >
//           <img src="/temperature-icon.svg" className="w-6 h-6" />
//           <span className="res-text">
//             {tempA ? "Alert Detected" : "Not Detected"}
//           </span>
//         </div>

//         <div
//           className={`icon-number-align border rounded-sm p-1 w-full ${
//             humiA ? "border-red-500" : "border-gray-400"
//           }`}
//         >
//           <img src="/card-humidity-icon.svg" className="w-6 h-6" />
//           <span className="res-text">
//             {humiA ? "Alert Detected" : "Not Detected"}
//           </span>
//         </div>
//       </div>

//       <Divider sx={{ my: 1.5 }} />

//       {/* Sensor Selector */}
//       <Stack spacing={0.5}>
//         <Typography variant="caption" color="text.secondary">
//           Sensor
//         </Typography>

//         <Select
//           size="small"
//           value={sensorId}
//           onChange={(e) => setSensorId(e.target.value)}
//         >
//           {sensors.map((s) => (
//             <MenuItem key={s._id} value={s._id}>
//               {s.name}
//             </MenuItem>
//           ))}
//         </Select>
//       </Stack>

//       {/* Sensor Values */}
//       {selectedSensorValue ? (
//         <Stack direction="row" spacing={1} mt={1.5}>
//           <Chip
//             size="small"
//             variant="outlined"
//             label={`Temp: ${selectedSensorValue.temperature}°C`}
//           />
//           <Chip
//             size="small"
//             variant="outlined"
//             label={`Humidity: ${selectedSensorValue.humidity}%`}
//           />
//         </Stack>
//       ) : (
//         <Typography variant="caption" color="text.secondary" mt={1}>
//           No live sensor data
//         </Typography>
//       )}
//     </Box>
//   );
// }








// // src/pages/Dashboard/RackDetailsPanel.jsx
// import React, { useMemo } from "react";
// import { IconButton, Skeleton } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";

// /**
//  * RackDetailsPanel
//  * Props:
//  *  - rack (object) : your Rack model instance (may include sensorValues[])
//  *  - loading (bool)
//  *  - noData (bool)
//  *  - closeIcon (bool)
//  *  - onClose (func)
//  */
// export default function RackDetailsPanel({
//   rack = null,
//   loading = false,
//   noData = false,
//   closeIcon = false,
//   onClose = undefined,
// }) {
//   // integer helper
//   const toInt = (v) => {
//     const n = Number(v);
//     return Number.isFinite(n) ? Math.trunc(n) : null;
//   };

//   // Primary displayed values (try multiple fallbacks)
//   const freezerTemp = toInt(rack?.tempV ?? rack?.sensorValues?.[0]?.temperature ?? null);
//   const ambientHumi = toInt(rack?.humiV ?? rack?.sensorValues?.[0]?.humidity ?? null);

//   // last update from sensorValues
//   const lastUpdate = useMemo(() => {
//     if (!rack || !Array.isArray(rack.sensorValues) || rack.sensorValues.length === 0) return null;
//     return rack.sensorValues.reduce((acc, s) => {
//       if (!acc) return s;
//       return new Date(s.updatedAt) > new Date(acc.updatedAt) ? s : acc;
//     }, null)?.updatedAt;
//   }, [rack]);

//   const formatTime = (t) => {
//     if (!t) return "—";
//     const d = new Date(t);
//     return d.toLocaleString();
//   };

//   // Loading skeleton
//   if (loading && !rack) {
//     return (
//       <div className="p-4">
//         <Skeleton variant="rectangular" height={180} className="mb-3" />
//         <Skeleton variant="text" width="40%" />
//         <Skeleton variant="text" width="70%" />
//       </div>
//     );
//   }

//   if (noData && !rack) {
//     return (
//       <div className="p-4 text-center text-gray-500">
//         <div className="mb-2">No rack selected</div>
//         <div className="text-sm">Select a rack to view its details</div>
//       </div>
//     );
//   }

//   // Status badges
//   const tempAlert = Boolean(rack?.tempA);
//   const humiAlert = Boolean(rack?.humiA);

//   return (
//     <div className="h-full flex flex-col gap-4">
//       {/* Top card: Large display */}
//       <div className="flex gap-4 items-stretch">
//         {/* LEFT: Device big card */}
//         <div className="flex-1 rounded-2xl border-2 border-pink-200 bg-white p-4 shadow-sm min-h-[170px]">
//           <div className="flex justify-between items-start">
//             <div>
//               <div className="text-xs text-gray-500">Device ID</div>
//               <div className="text-2xl font-extrabold text-gray-800">{rack?.name ?? "—"}</div>
//             </div>

//             {closeIcon && (
//               <div className="ml-2">
//                 <IconButton size="small" onClick={() => typeof onClose === "function" && onClose()}>
//                   <CloseIcon />
//                 </IconButton>
//               </div>
//             )}
//           </div>

//           <div className="mt-4">
//             {/* Big status badge */}
//             <div
//               className={`inline-flex items-center gap-3 px-6 py-3 rounded-xl border ${
//                 tempAlert ? "bg-red-50 border-red-300" : "bg-green-50 border-green-200"
//               } shadow-sm`}
//               role="status"
//             >
//               {/* thermometer SVG */}
//               <svg className={`w-6 h-6 ${tempAlert ? "text-red-600" : "text-green-600"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor">
//                 <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M14 14.76V3a2 2 0 10-4 0v11.76a4 4 0 104 0z" />
//               </svg>

//               <div className={`${tempAlert ? "text-red-700" : "text-green-700"} font-semibold`}>
//                 {tempAlert ? "Temperature Alert" : "Normal"}
//               </div>
//             </div>
//           </div>

//           {/* bottom bar with small icons */}
//           <div className="mt-6 rounded-b-xl border-t pt-3 flex items-center justify-between bg-[#f7f5f6]/50 px-2">
//             <div className="flex items-center gap-3">
//               <div className="text-xs text-gray-500">Alert</div>
//               <div className="text-sm font-semibold">{tempAlert || humiAlert ? "Detected" : "None"}</div>
//             </div>

//             <div className="flex items-center gap-3">
//               {/* small inline icons (you can replace with svg assets) */}
//               <div className="flex items-center gap-1 text-xs text-gray-500">
//                 <svg className="w-5 h-5 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
//                   <path strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" d="M3 12h18" />
//                 </svg>
//                 <span className="text-xs">Sensors {Array.isArray(rack?.sensors) ? rack.sensors.length : 0}</span>
//               </div>
//               <div className="text-xs text-gray-400">{formatTime(lastUpdate)}</div>
//             </div>
//           </div>
//         </div>

//         {/* RIGHT: compact stats column */}
//         <div className="w-[220px] rounded-2xl border border-gray-200 bg-white p-4 shadow-sm flex flex-col gap-4 justify-between">
//           <div className="flex items-center gap-3">
//             {/* rack icon */}
//             <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
//               <svg className="w-7 h-7 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
//                 <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1.2"></rect>
//                 <path d="M7 7h10M7 11h10M7 15h10" strokeWidth="1" strokeLinecap="round"></path>
//               </svg>
//             </div>
//             <div>
//               <div className="text-xs text-gray-500">Rag Table</div>
//               <div className="text-xl font-bold text-gray-800">{rack?.row?.toUpperCase?.() ?? ""}{rack?.col?.toUpperCase?.() ?? ""}</div>
//             </div>
//           </div>

//           <div className="space-y-3">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 rounded-full bg-[#E6F6FF] flex items-center justify-center">
//                   {/* temp icon */}
//                   <svg className="w-5 h-5 text-[#00A6D6]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
//                     <path d="M12 2v14" strokeWidth="1.5" strokeLinecap="round"></path>
//                     <circle cx="12" cy="18" r="3" strokeWidth="1.2"></circle>
//                   </svg>
//                 </div>
//                 <div>
//                   <div className="text-xs text-gray-500">Temperature</div>
//                   <div className="text-lg font-bold">{freezerTemp ?? "—"}°C</div>
//                 </div>
//               </div>
//             </div>

//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 rounded-full bg-[#FFF5F0] flex items-center justify-center">
//                   {/* humidity icon */}
//                   <svg className="w-5 h-5 text-[#2E9EC8]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
//                     <path d="M12 3c0 0-5 6-5 9a5 5 0 0010 0c0-3-5-9-5-9z" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
//                   </svg>
//                 </div>
//                 <div>
//                   <div className="text-xs text-gray-500">Humidity</div>
//                   <div className="text-lg font-bold">{ambientHumi ?? "—"}%</div>
//                 </div>
//               </div>
//             </div>

//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tempAlert ? "bg-red-50" : "bg-green-50"}`}>
//                   {/* ac icon */}
//                   <svg className={`w-5 h-5 ${tempAlert ? "text-red-600" : "text-green-600"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor">
//                     <path d="M3 12h18" strokeWidth="1.2" strokeLinecap="round"></path>
//                     <path d="M8 8h8M8 16h8" strokeWidth="1"></path>
//                   </svg>
//                 </div>
//                 <div>
//                   <div className="text-xs text-gray-500">AC</div>
//                   <div className={`text-lg font-bold ${tempAlert ? "text-red-600" : "text-green-600"}`}>{tempAlert ? "ON" : "OK"}</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div> {/* end top flex */}

//       {/* Sensors / details panel */}
//       <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
//         <div className="flex items-center justify-between mb-3">
//           <div>
//             <div className="text-sm text-gray-500">Sensors</div>
//             <div className="text-base font-semibold">{Array.isArray(rack?.sensors) ? rack.sensors.length : 0} detected</div>
//           </div>
//           <div className="text-xs text-gray-400">Last: {formatTime(lastUpdate)}</div>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//           {rack?.sensorValues && rack.sensorValues.length > 0 ? (
//             rack.sensorValues.map((s, idx) => {
//               const temp = s.temperature ?? "—";
//               const hum = s.humidity ?? "—";
//               const alertTemp = typeof s.temperature === "number" && rack?.conditions?.some(c => c.type === "temp" && ((c.operator === ">" && s.temperature > c.value) || (c.operator === "<" && s.temperature < c.value)));
//               const alertHumi = typeof s.humidity === "number" && rack?.conditions?.some(c => c.type === "humidity" && ((c.operator === ">" && s.humidity > c.value) || (c.operator === "<" && s.humidity < c.value)));

//               return (
//                 <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
//                   <div>
//                     <div className="text-sm font-medium">{s.sensorName ?? `Sensor ${idx + 1}`}</div>
//                     <div className="text-xs text-gray-400">Updated: {s.updatedAt ? new Date(s.updatedAt).toLocaleTimeString() : "—"}</div>
//                   </div>

//                   <div className="flex items-center gap-4">
//                     <div className="text-right">
//                       <div className={`text-lg font-semibold ${alertTemp ? "text-red-600" : "text-gray-800"}`}>{temp}°C</div>
//                       <div className="text-xs text-gray-500">Temp</div>
//                     </div>

//                     <div className="text-right">
//                       <div className={`text-lg font-semibold ${alertHumi ? "text-yellow-600" : "text-gray-800"}`}>{hum}%</div>
//                       <div className="text-xs text-gray-500">Humi</div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })
//           ) : (
//             <div className="text-sm text-gray-500 col-span-full">No sensor readings available</div>
//           )}
//         </div>
//       </div>

//       {/* Optional charts or actions */}
//       <div className="flex gap-3 items-center">
//         <button className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold">Open Live View</button>
//         <button className="px-4 py-2 rounded-lg bg-white border border-gray-200">Export CSV</button>
//       </div>
//     </div>
//   );
// }








// import * as React from "react";
// import {
//   Box,
//   Typography,
//   Chip,
//   Stack,
//   Select,
//   MenuItem,
//   Divider,
// } from "@mui/material";

// export default function RackDetailsPanel({ rack }) {
//   const [sensorId, setSensorId] = React.useState("");

//   React.useEffect(() => {
//     if (rack?.sensors?.length) {
//       setSensorId(rack.sensors[0]._id);
//     }
//   }, [rack]);

//   if (!rack) {
//     return (
//       <Box p={2}>
//         <Typography variant="body2" color="text.secondary">
//           Select a rack to view details
//         </Typography>
//       </Box>
//     );
//   }

//   const {
//     name,
//     hub,
//     row,
//     col,
//     tempV,
//     humiV,
//     tempA,
//     humiA,
//     sensors = [],
//     sensorValues = [],
//   } = rack;

//   const selectedSensorValue = sensorValues.find(
//     (sv) => sv.sensorId === sensorId
//   );

//   return (
//     <Box
//       p={2.5}
//       sx={{
//         borderRadius: 2,
//         // border: "1px solid",
//         borderColor: "divider",
//         backgroundColor: " #ffffffc5",

//         // #078d860c
//       }}
//     >
//       {/* Header */}
//       <div className="flex items-center justify-start">
//       <img src="/Server.svg" className="w-auto h-[5rem]" alt="" />
//       <Stack>
//         <Typography fontWeight={400}>{name?.charAt(0).toUpperCase() + name.slice(1)}</Typography>
//         <Typography variant="caption" color="text.secondary">
//           {hub?.name} • {row?.toUpperCase()} / {col?.toUpperCase()}
//         </Typography>
//       </Stack>
//       </div>

//       <Divider sx={{ my: 1.5 }} />

//       {/* Rack Level Values */}
//       <Stack direction="row" spacing={1}>
//         {/* <Chip
//           size="small"
//           label={`Temp: ${tempV ?? "N/A"}°C`}
//           color={tempA ? "error" : "default"}
//         />
//         <Chip
//           size="small"
//           label={`Humidity: ${humiV ?? "N/A"}%`}
//           color={humiA ? "warning" : "default"}
//         /> */}

//           <div className="w-full grid grid-cols-3 place-items-center  gap-3 md:gap-5 ">
//         {/* <div> */}
//         {/* </div> */}
//         <div className="flex items-end justify-center">
//           <img src="/yellow-alert.svg" className="w-auto h-[1.5rem]" alt="" />
//           <span className=" font-bold text-xs text-black">Status</span>
//         </div>
//         <div className={`icon-number-align border border-1 rounded-sm p-1 w-full  ${tempA ? "border-yellow-600" : "border-gray-400"}`}>
//           <img src="/card-humidity-icon.svg" alt="Alert" className="w-6 h-6  " />
//           <span className="text-[#1E293B] res-text ">{tempA ? "Alert Detected" : "Not Detected"}</span>
//         </div>
//         <div className={`icon-number-align border border-1 rounded-sm p-1 w-full  ${humiA ? "border-red-500" : "border-gray-400"}`}>
//           <img src="/temperature-icon.svg" alt="Alert" className="w-6 h-6  " />
//           <span className="text-[#1E293B] res-text ">{humiA ? "Alert Detected" : "Not Detected"}</span>
//         </div>
//       </div>
//       </Stack>

//       <Divider sx={{ my: 1.5 }} />

//       {/* Sensor Selector */}
//       <Stack spacing={0.5}>
//         <Typography variant="caption" color="text.secondary">
//           Sensor
//         </Typography>

//         <Select
//           size="small"
//           value={sensorId}
//           onChange={(e) => setSensorId(e.target.value)}
//         >
//           {sensors.map((s) => (
//             <MenuItem key={s._id} value={s._id}>
//               {s.name}
//             </MenuItem>
//           ))}
//         </Select>
//       </Stack>

//       {/* Sensor Values */}
//       {selectedSensorValue ? (
//         <Stack direction="row" spacing={1} mt={1.5}>
//           <Chip
//             size="small"
//             variant="outlined"
//             label={`Temp: ${selectedSensorValue.temperature ?? "N/A"}°C`}
//           />
//           <Chip
//             size="small"
//             variant="outlined"
//             label={`Humidity: ${selectedSensorValue.humidity ?? "N/A"}%`}
//           />
//         </Stack>
//       ) : (
//         <Typography variant="caption" color="text.secondary" mt={1}>
//           sensor data is not availa
//         </Typography>
//       )}
//     </Box>
//   );
// }









import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import {
  Box,
  Typography,
  Chip,
  Stack,
  Select,
  MenuItem,
  Divider,
} from "@mui/material";

import {
  setAcAuto,
  setAcManual,
  fetchRackClusterMean,
} from "../slices/rackClusterSlice";

export default function RackDetailsPanel({ rack, clusterId }) {
  const dispatch = useDispatch();

  /* ------------------ SAFETY ------------------ */
  if (!rack) {
    return (
      <Box p={2}>
        <Typography variant="body2" color="text.secondary">
          Select a rack to view details
        </Typography>
      </Box>
    );
  }

  /* ------------------ OLD RACK DATA ------------------ */
  const {
    name,
    hub,
    row,
    col,
    tempA,
    humiA,
    sensors = [],
    sensorValues = [],
  } = rack;

  const [sensorId, setSensorId] = useState("");

  useEffect(() => {
    if (sensors.length) setSensorId(sensors[0]._id);
  }, [sensors]);

  const selectedSensorValue = sensorValues.find(
    (sv) => sv.sensorId === sensorId
  );

  /* ------------------ AC CONTROL ------------------ */
  const meanDetail = useSelector((s) => s.rackCluster?.meanDetail);
  const acLoading = useSelector((s) => s.rackCluster?.loading?.acControl);

  const [autoEnabled, setAutoEnabled] = useState(false);
  const [manualOn, setManualOn] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!clusterId) return;
    dispatch(fetchRackClusterMean(clusterId));
  }, [clusterId]);

  useEffect(() => {
    setAutoEnabled(!!meanDetail?.acControl?.enabled);
    setManualOn(!!meanDetail?.acControl?.manualStatus);
  }, [meanDetail]);

  const handleAutoToggle = async (e) => {
    const enabled = e.target.checked;
    setBusy(true);
    try {
      await dispatch(setAcAuto({ clusterId, enabled })).unwrap();
      setAutoEnabled(enabled);
      if (enabled) setManualOn(false);
    } catch (err) {
      Swal.fire("Error", String(err), "error");
    } finally {
      setBusy(false);
    }
  };

  const handleManual = async (status) => {
    if (autoEnabled) return;
    setBusy(true);
    try {
      await dispatch(setAcManual({ clusterId, status })).unwrap();
      setManualOn(status);
    } catch (err) {
      Swal.fire("Error", String(err), "error");
    } finally {
      setBusy(false);
    }
  };

  /* ------------------ UI ------------------ */
  return (
    <div className="">
      {/* AC Control */}
      <div className="mb-4 p-3 bg-white  rounded-lg">
        <div className="flex justify-between items-center">
          <Typography fontWeight={600}>AC Control</Typography>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={autoEnabled}
              disabled={busy || acLoading}
              onChange={handleAutoToggle}
            />
            AUTO
          </label>

          <div className="flex gap-1">
            <button
              disabled={autoEnabled}
              onClick={() => handleManual(true)}
              className={`px-3 py-1 rounded ${
                manualOn ? "bg-red-500 text-white" : "border"
              }`}
            >
              ON
            </button>

            <button
              disabled={autoEnabled}
              onClick={() => handleManual(false)}
              className={`px-3 py-1 rounded ${
                !manualOn ? "bg-gray-400 text-white" : "border"
              }`}
            >
              OFF
            </button>
          </div>
        </div>
      </div>

      {/* Existing Rack UI */}
      <Box p={2.5} sx={{ borderRadius: 2, backgroundColor: "#ffffffc5" }}>
        <div className="flex gap-3">
          <img src="/Server.svg" className="h-20" />
          <Stack>
            <Typography>{name}</Typography>
            <Typography variant="caption">
              {hub?.name} • {row}/{col}
            </Typography>
          </Stack>
        </div>

        <Divider sx={{ my: 1.5 }} />

        <Stack spacing={0.5}>
          <Typography variant="caption">Sensor</Typography>
          <Select
            size="small"
            value={sensorId}
            onChange={(e) => setSensorId(e.target.value)}
          >
            {sensors.map((s) => (
              <MenuItem key={s._id} value={s._id}>
                {s.name}
              </MenuItem>
            ))}
          </Select>
        </Stack>

        {selectedSensorValue ? (
          <Stack direction="row" spacing={1} mt={1.5}>
            <Chip label={`Temp: ${selectedSensorValue.temperature}°C`} />
            <Chip label={`Humidity: ${selectedSensorValue.humidity}%`} />
          </Stack>
        ) : (
          <Typography variant="caption" mt={1}>
            Sensor data not available
          </Typography>
        )}
      </Box>
    </div>
  );
}
