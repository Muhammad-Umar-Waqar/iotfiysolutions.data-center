// // RackEditModal.jsx

// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Button,
//   Typography,
//   Modal,
//   Stack,
//   TextField,
//   MenuItem,
//   Autocomplete,
// } from "@mui/material";
// import { Cpu } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import Swal from "sweetalert2";

// import InputField from "../../../Inputs/InputField";
// import { updateRack } from "../../../../slices/rackSlice";
// import { fetchHubsByDataCenter } from "../../../../slices/hubSlice";

// export default function RackEditModal({ open, handleClose, rack }) {
//   const dispatch = useDispatch();

//   const { loading } = useSelector((state) => state.rack);
//   const { hubs } = useSelector((state) => state.hub);
//   const [selectedHubId, setSelectedHubId] = useState("");
//     const { sensors } = useSelector((state) => state.sensor);

//   const [formData, setFormData] = useState({
//     name: "",
//     hubId: "",
//     sensorIds: [],
//     row: "",
//     col: "",
//     conditions: [],
//   });

//   /* -------------------------------
//      Sync rack data on open
//   ------------------------------- */
//   useEffect(() => {
//     if (!open || !rack) return;

//     setFormData({
//       name: rack.name || "",
//       hubId: rack.hub?.id || "",
//       sensorIds: rack.sensors?.map((s) => s._id) || [],
//       row: rack.row || "",
//       col: rack.col || "",
//       conditions: rack.conditions || [],
//     });

//     if (rack.dataCenter?.id) {
//       dispatch(fetchHubsByDataCenter(rack.dataCenter.id));
//     }
//   }, [open, rack, dispatch]);

//   const onchange = (e) => {
//     const { name, value } = e.target;
//     setFormData((p) => ({ ...p, [name]: value }));
//   };

//   /* -------------------------------
//      Update handler
//   ------------------------------- */
//   const onUpdate = async () => {
//     if (!formData.name.trim()) {
//       return Swal.fire("Warning", "Rack name is required.", "warning");
//     }

//     if (!formData.hubId) {
//       return Swal.fire("Warning", "Hub is required.", "warning");
//     }

//     try {
//       await dispatch(
//         updateRack({
//           id: rack._id,
//           payload: {
//             ...formData,
//           },
//         })
//       ).unwrap();

//       Swal.fire("Success", "Rack updated successfully.", "success");
//       handleClose();
//     } catch (err) {
//       Swal.fire("Error", err || "Unable to update Rack.", "error");
//     }
//   };


//   useEffect(() => {
//   if (selectedHubId) {
//     dispatch(fetchSensorsByHub(selectedHubId));
//     setFormData((p) => ({ ...p, sensorIds: [] }));
//   }
// }, [selectedHubId, dispatch]);


//   return (
//     <Modal open={!!open} onClose={handleClose}>
//       <Box
//         sx={{
//           position: "absolute",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           width: { xs: "90%", sm: 520 },
//           bgcolor: "background.paper",
//           borderRadius: "8px",
//           boxShadow: 24,
//           p: { xs: 2, sm: 4 },
//         }}
//       >
//         <Typography variant="h6" fontWeight="bold" mb={2}>
//           Edit Rack
//         </Typography>

//         <InputField
//           label="Rack Name"
//           id="rack_name"
//           name="name"
//           type="text"
//           value={formData.name}
//           onchange={onchange}
//           placeholder="Rack Name"
//           icon={<Cpu size={18} />}
//         />

//         {/* <TextField
//           select
//           label="Hub"
//           value={formData.hubId}
//           onChange={(e) =>
//             setFormData((p) => ({ ...p, hubId: e.target.value }))
//           }
//           fullWidth
//           margin="normal"
//         >
//           {hubs.map((hub) => (
//             <MenuItem key={hub._id} value={hub._id}>
//               {hub.name}
//             </MenuItem>
//           ))}
//         </TextField> */}
      
      
//         <TextField
//           select
//           label="Hub"
//           value={selectedHubId}
//            onChange={(e) => setSelectedHubId(e.target.value)}
//           fullWidth
//           margin="normal"
//         >
//           {hubs.map((hub) => (
//             <MenuItem key={hub._id} value={hub._id}>
//               {hub.name}
//             </MenuItem>
//           ))}
//         </TextField>



//                 <Autocomplete
//         multiple
//         options={sensors}
//         getOptionLabel={(o) => o.sensorName}
//         value={sensors.filter(s =>
//             formData.sensorIds.includes(s._id)
//         )}
//         onChange={(_, values) =>
//             setFormData(p => ({
//             ...p,
//             sensorIds: values.map(v => v._id)
//             }))
//         }
//         />


//         <Stack direction="row" spacing={2} mt={2}>
//           <InputField
//             label="Row"
//             name="row"
//             type="number"
//             value={formData.row}
//             onchange={onchange}
//           />
//           <InputField
//             label="Column"
//             name="col"
//             type="number"
//             value={formData.col}
//             onchange={onchange}
//           />
//         </Stack>

//         <Stack
//           direction={{ xs: "column", sm: "row" }}
//           spacing={2}
//           justifyContent="flex-end"
//           mt={3}
//         >
//           <Button variant="outlined" onClick={handleClose}>
//             Cancel
//           </Button>
//           <Button
//             variant="contained"
//             onClick={onUpdate}
//             disabled={loading.update}
//           >
//             {loading.update ? "Updating..." : "Update"}
//           </Button>
//         </Stack>
//       </Box>
//     </Modal>
//   );
// }










// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Button,
//   Typography,
//   Modal,
//   Stack,
//   TextField,
//   MenuItem,
//   Autocomplete,
// } from "@mui/material";
// import { Cpu } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import Swal from "sweetalert2";

// import InputField from "../../../Inputs/InputField";
// import { updateRack } from "../../../../slices/rackSlice";
// import { fetchHubsByDataCenter } from "../../../../slices/hubSlice";
// import { fetchSensorsByHub } from "../../../../slices/sensorSlice";

// export default function RackEditModal({ open, handleClose, rack }) {
//   const dispatch = useDispatch();

//   const { loading } = useSelector((state) => state.rack);
//   const { hubs } = useSelector((state) => state.hub);
//   const { sensors } = useSelector((state) => state.sensor);

//   const [formData, setFormData] = useState({
//     name: "",
//     hubId: "",
//     sensorIds: [],
//     row: "",
//     col: "",
//     conditions: [],
//   });

//   /* -------------------------------
//      Sync rack data on open
//   ------------------------------- */
//   useEffect(() => {
//     if (!open || !rack) return;

//     const hubId = rack.hub?.id || "";

//     setFormData({
//       name: rack.name || "",
//       hubId,
//       sensorIds: rack.sensors?.map((s) => s._id) || [],
//       row: rack.row || "",
//       col: rack.col || "",
//       conditions: rack.conditions || [],
//     });

//     if (rack.dataCenter?.id) {
//       dispatch(fetchHubsByDataCenter(rack.dataCenter.id));
//     }

//     if (hubId) {
//       dispatch(fetchSensorsByHub(hubId));
//     }
//   }, [open, rack, dispatch]);

//   /* -------------------------------
//      Hub change → reload sensors
//   ------------------------------- */
//   useEffect(() => {
//     if (!formData.hubId) return;

//     dispatch(fetchSensorsByHub(formData.hubId));
//     setFormData((p) => ({ ...p, sensorIds: [] }));
//   }, [formData.hubId, dispatch]);












// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Button,
//   Typography,
//   Modal,
//   Stack,
//   TextField,
//   MenuItem,
//   Autocomplete,
// } from "@mui/material";
// import { Cpu } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import Swal from "sweetalert2";

// import InputField from "../../../Inputs/InputField";
// import { updateRack } from "../../../../slices/rackSlice";
// import { fetchHubsByDataCenter, fetchSensorsByHub } from "../../../../slices/hubSlice"; // <-- changed import

// export default function RackEditModal({ open, handleClose, rack }) {
//   const dispatch = useDispatch();

//   const { loading } = useSelector((state) => state.rack);
// //   const { hubs, sensors } = useSelector((state) => state.hub); // <- use hub.sensors

// const { hubs = [], sensors = [] } = useSelector(
//   (state) => state.hub || {}
// );



//   const [formData, setFormData] = useState({
//     name: "",
//     hubId: "",
//     sensorIds: [],
//     row: "",
//     col: "",
//     conditions: [],
//   });

//   /* -------------------------------
//      Sync rack data on open
//   ------------------------------- */
//   useEffect(() => {
//     if (!open || !rack) return;

//     const hubId = rack.hub?.id || "";

//     setFormData({
//       name: rack.name || "",
//       hubId,
//       sensorIds: rack.sensors?.map((s) => s._id) || [],
//       row: rack.row || "",
//       col: rack.col || "",
//       conditions: rack.conditions || [],
//     });

//     if (rack.dataCenter?.id) {
//       dispatch(fetchHubsByDataCenter(rack.dataCenter.id));
//     }

//     if (hubId) {
//       dispatch(fetchSensorsByHub(hubId)); // <- now from hubSlice
//     }
//   }, [open, rack, dispatch]);

//   /* -------------------------------
//      Hub change → reload sensors
//   ------------------------------- */
//   useEffect(() => {
//     if (!formData.hubId) return;

//     dispatch(fetchSensorsByHub(formData.hubId));
//     setFormData((p) => ({ ...p, sensorIds: [] }));
//   }, [formData.hubId, dispatch]);

//   const onchange = (e) => {
//     const { name, value } = e.target;
//     setFormData((p) => ({ ...p, [name]: value }));
//   };

//   /* -------------------------------
//      Update handler
//   ------------------------------- */
//   const onUpdate = async () => {
//     if (!formData.name.trim()) {
//       return Swal.fire("Warning", "Rack name is required.", "warning");
//     }

//     if (!formData.hubId) {
//       return Swal.fire("Warning", "Hub is required.", "warning");
//     }

//     try {
//       await dispatch(
//         updateRack({
//           id: rack._id,
//           payload: formData,
//         })
//       ).unwrap();

//       Swal.fire("Success", "Rack updated successfully.", "success");
//       handleClose();
//     } catch (err) {
//       Swal.fire("Error", err || "Unable to update Rack.", "error");
//     }
//   };

//   return (
//     <Modal open={!!open} onClose={handleClose}>
//       <Box
//         sx={{
//           position: "absolute",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           width: { xs: "90%", sm: 520 },
//           bgcolor: "background.paper",
//           borderRadius: "8px",
//           boxShadow: 24,
//           p: { xs: 2, sm: 4 },
//         }}
//       >
//         <Typography variant="h6" fontWeight="bold" mb={2}>
//           Edit Rack
//         </Typography>

//         <InputField
//           label="Rack Name"
//           name="name"
//           value={formData.name}
//           onchange={onchange}
//           placeholder="Rack Name"
//           icon={<Cpu size={18} />}
//         />

//         <TextField
//           select
//           label="Hub"
//           value={formData.hubId}
//           onChange={(e) =>
//             setFormData((p) => ({ ...p, hubId: e.target.value }))
//           }
//           fullWidth
//           margin="normal"
//         >
//           {hubs.map((hub) => (
//             <MenuItem key={hub._id} value={hub._id}>
//               {hub.name}
//             </MenuItem>
//           ))}
//         </TextField>

//         <Autocomplete
//           multiple
//           options={sensors}
//           getOptionLabel={(o) => o.sensorName}
//           value={sensors.filter((s) =>
//             formData.sensorIds.includes(s._id)
//           )}
//           onChange={(_, values) =>
//             setFormData((p) => ({
//               ...p,
//               sensorIds: values.map((v) => v._id),
//             }))
//           }
//           renderInput={(params) => (
//             <TextField {...params} label="Sensors" margin="normal" />
//           )}
//         />

//         <Stack direction="row" spacing={2} mt={2}>
//           <InputField
//             label="Row"
//             name="row"
//             type="number"
//             value={formData.row}
//             onchange={onchange}
//           />
//           <InputField
//             label="Column"
//             name="col"
//             type="number"
//             value={formData.col}
//             onchange={onchange}
//           />
//         </Stack>

//         <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3}>
//           <Button variant="outlined" onClick={handleClose}>
//             Cancel
//           </Button>
//           <Button variant="contained" onClick={onUpdate} disabled={loading.update}>
//             {loading.update ? "Updating..." : "Update"}
//           </Button>
//         </Stack>
//       </Box>
//     </Modal>
//   );
// }


















// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Button,
//   Typography,
//   Modal,
//   Stack,
//   TextField,
//   MenuItem,
//   Autocomplete,
// } from "@mui/material";
// import { Cpu } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import Swal from "sweetalert2";

// import InputField from "../../../Inputs/InputField";
// import { updateRack } from "../../../../slices/rackSlice";
// import { fetchHubsByDataCenter, fetchSensorsByHub } from "../../../../slices/hubSlice";

// const TOTAL_SLOTS = 25;

// export default function RackEditModal({ open, handleClose, rack }) {
//   const dispatch = useDispatch();

//   const { loading } = useSelector((state) => state.rack);
//   const { hubs = [], sensors = [] } = useSelector((state) => state.hub || {});

//   /* -------------------------------
//      Local state
//   ------------------------------- */
//   const [formData, setFormData] = useState({
//     name: "",
//     hubId: "",
//     sensorIds: [],
//     row: "",
//     col: "",
//     conditions: [],
//   });

//   const [occupancy, setOccupancy] = useState({});
//   const [loadingOccupancy, setLoadingOccupancy] = useState(false);

//   const allRows = Array.from({ length: TOTAL_SLOTS }, (_, i) => i + 1);
//   const allCols = Array.from({ length: TOTAL_SLOTS }, (_, i) => i + 1);

//   /* -------------------------------
//      Fetch occupancy
//   ------------------------------- */
//   const fetchOccupancy = async (dataCenterId) => {
//     if (!dataCenterId) return;

//     setLoadingOccupancy(true);
//     try {
//       const token = localStorage.getItem("token");

//       const res = await fetch(
//         `${import.meta.env.VITE_BACKEND_API || "http://localhost:5050"}/rack/row-col/${dataCenterId}`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: token ? `Bearer ${token}` : "",
//           },
//           credentials: "include",
//         }
//       );

//       const result = await res.json();
//       if (!res.ok) throw new Error(result?.message);

//       const map = {};
//       (result.data || []).forEach((r) => {
//         const rowNum = Number(String(r.row).replace(/^r/, ""));
//         map[rowNum] = new Set(
//           (r.colsBooked || []).map((c) =>
//             Number(String(c).replace(/^c/, ""))
//           )
//         );
//       });

//       // 🔑 Free current rack's own slot
//       if (rack?.row && rack?.col) {
//         const r = Number(String(rack.row).replace(/^r/, ""));
//         const c = Number(String(rack.col).replace(/^c/, ""));
//         map[r]?.delete(c);
//       }

//       setOccupancy(map);
//     } catch (err) {
//       console.error(err);
//       setOccupancy({});
//     } finally {
//       setLoadingOccupancy(false);
//     }
//   };

//   /* -------------------------------
//      Sync rack data on open
//   ------------------------------- */
//   useEffect(() => {
//     if (!open || !rack) return;

//     const hubId = rack.hub?.id || "";

//     setFormData({
//       name: rack.name || "",
//       hubId,
//       sensorIds: rack.sensors?.map((s) => s._id) || [],
//       row: Number(String(rack.row).replace(/^r/, "")) || "",
//       col: Number(String(rack.col).replace(/^c/, "")) || "",
//       conditions: rack.conditions || [],
//     });

//     if (rack.dataCenter?.id) {
//       dispatch(fetchHubsByDataCenter(rack.dataCenter.id));
//       fetchOccupancy(rack.dataCenter.id);
//     }

//     if (hubId) {
//       dispatch(fetchSensorsByHub(hubId));
//     }
//   }, [open, rack, dispatch]);

//   /* -------------------------------
//      Hub change → reload sensors
//   ------------------------------- */
//   useEffect(() => {
//     if (!formData.hubId) return;

//     dispatch(fetchSensorsByHub(formData.hubId));
//     setFormData((p) => ({ ...p, sensorIds: [] }));
//   }, [formData.hubId, dispatch]);

//   const onchange = (e) => {
//     const { name, value } = e.target;
//     setFormData((p) => ({ ...p, [name]: value }));
//   };

//   /* -------------------------------
//      Update handler
//   ------------------------------- */
//   const onUpdate = async () => {
//     if (!formData.name.trim()) {
//       return Swal.fire("Warning", "Rack name is required.", "warning");
//     }

//     if (!formData.hubId) {
//       return Swal.fire("Warning", "Hub is required.", "warning");
//     }

//     try {
//       await dispatch(
//         updateRack({
//           id: rack._id,
//           payload: {
//             ...formData,
//             row: `r${formData.row}`,
//             col: `c${formData.col}`,
//           },
//         })
//       ).unwrap();

//       Swal.fire("Success", "Rack updated successfully.", "success");
//       handleClose();
//     } catch (err) {
//       Swal.fire("Error", err || "Unable to update Rack.", "error");
//     }
//   };

//   return (
//     <Modal open={!!open} onClose={handleClose}>
//       <Box
//         sx={{
//           position: "absolute",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           width: { xs: "90%", sm: 520 },
//           bgcolor: "background.paper",
//           borderRadius: 2,
//           boxShadow: 24,
//           p: { xs: 2, sm: 4 },
//         }}
//       >
//         <Typography variant="h6" fontWeight="bold" mb={2}>
//           Edit Rack
//         </Typography>

//         <InputField
//           label="Rack Name"
//           name="name"
//           value={formData.name}
//           onchange={onchange}
//           placeholder="Rack Name"
//           icon={<Cpu size={18} />}
//         />

//         <TextField
//           select
//           label="Hub"
//           value={formData.hubId}
//           onChange={(e) =>
//             setFormData((p) => ({ ...p, hubId: e.target.value }))
//           }
//           fullWidth
//           margin="normal"
//         >
//           {hubs.map((hub) => (
//             <MenuItem key={hub._id} value={hub._id}>
//               {hub.name}
//             </MenuItem>
//           ))}
//         </TextField>

//         <Autocomplete
//           multiple
//           options={sensors}
//           getOptionLabel={(o) => o.sensorName}
//           value={sensors.filter((s) =>
//             formData.sensorIds.includes(s._id)
//           )}
//           onChange={(_, values) =>
//             setFormData((p) => ({
//               ...p,
//               sensorIds: values.map((v) => v._id),
//             }))
//           }
//           renderInput={(params) => (
//             <TextField {...params} label="Sensors" margin="normal" />
//           )}
//         />

//         {/* Row / Column selectors */}
//         <Stack direction="row" spacing={2} mt={2}>
//           <TextField
//             select
//             label="Row"
//             value={formData.row}
//             onChange={(e) =>
//               setFormData((p) => ({ ...p, row: e.target.value, col: "" }))
//             }
//             fullWidth
//           >
//             {allRows.map((r) => {
//               const full =
//                 occupancy[r] && occupancy[r].size >= TOTAL_SLOTS;
//               return (
//                 <MenuItem key={r} value={r} disabled={full}>
//                   Row {r} {full ? "— full" : ""}
//                 </MenuItem>
//               );
//             })}
//           </TextField>

//           <TextField
//             select
//             label="Column"
//             value={formData.col}
//             disabled={!formData.row}
//             onChange={(e) =>
//               setFormData((p) => ({ ...p, col: e.target.value }))
//             }
//             fullWidth
//           >
//             {!formData.row && (
//               <MenuItem value="">Select row first</MenuItem>
//             )}

//             {formData.row &&
//               allCols.map((c) => {
//                 const booked =
//                   occupancy[formData.row]?.has(c);
//                 return (
//                   <MenuItem key={c} value={c} disabled={booked}>
//                     Column {c} {booked ? "— occupied" : ""}
//                   </MenuItem>
//                 );
//               })}
//           </TextField>
//         </Stack>

//         <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3}>
//           <Button variant="outlined" onClick={handleClose}>
//             Cancel
//           </Button>
//           <Button
//             variant="contained"
//             onClick={onUpdate}
//             disabled={loading.update}
//           >
//             {loading.update ? "Updating..." : "Update"}
//           </Button>
//         </Stack>
//       </Box>
//     </Modal>
//   );
// }








// src/components/Modals/Common/RackManagement/RackEditModal.jsx
// import React, { useEffect, useState, useRef } from "react";
// import {
//   Box,
//   Button,
//   Typography,
//   Modal,
//   Stack,
//   TextField,
//   MenuItem,
//   Autocomplete,
// } from "@mui/material";
// import { Cpu } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import Swal from "sweetalert2";

// import InputField from "../../../Inputs/InputField";
// import { updateRack } from "../../../../slices/rackSlice";
// import { fetchHubsByDataCenter, fetchSensorsByHub } from "../../../../slices/hubSlice";

// const TOTAL_SLOTS = 25;

// export default function RackEditModal({ open, handleClose, rack }) {
//   const dispatch = useDispatch();

//   const { loading } = useSelector((state) => state.rack || {});
//   const { hubs = [], sensors = [] } = useSelector((state) => state.hub || {});

//   /* -------------------------------
//      Local state
//   ------------------------------- */
//   const [formData, setFormData] = useState({
//     name: "",
//     hubId: "",
//     sensorIds: [],
//     row: "",
//     col: "",
//     conditions: [],
//   });

//   const [occupancy, setOccupancy] = useState({});
//   const [loadingOccupancy, setLoadingOccupancy] = useState(false);

//   const allRows = Array.from({ length: TOTAL_SLOTS }, (_, i) => i + 1);
//   const allCols = Array.from({ length: TOTAL_SLOTS }, (_, i) => i + 1);

//   // track previous hub id to detect user-driven changes vs initial programmatic set
//   const prevHubRef = useRef(null);

//   // console.log("In Rack Edit Modal:", hubs);


//   /* -------------------------------
//      Fetch occupancy
//   ------------------------------- */
//   const fetchOccupancy = async (dataCenterId) => {
//     if (!dataCenterId) return;

//     setLoadingOccupancy(true);
//     try {
//       const token = localStorage.getItem("token");

//       const res = await fetch(
//         `${import.meta.env.VITE_BACKEND_API}/rack/row-col/${dataCenterId}`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: token ? `Bearer ${token}` : "",
//           },
//           credentials: "include",
//         }
//       );


//       const result = await res.json();
      
//       console.log("Result>Fetch>Occupany", result);

//       if (!res.ok) throw new Error(result?.message || "Failed to fetch occupancy");

//       const map = {};
//       (result.data || []).forEach((r) => {
//         const rowNum = Number(String(r.row).replace(/^r/, ""));
//         map[rowNum] = new Set(
//           (r.colsBooked || []).map((c) =>
//             Number(String(c).replace(/^c/, ""))
//           )
//         );
//       });

//       // 🔑 Free current rack's own slot (so edit doesn't mark its own slot occupied)
//       if (rack?.row && rack?.col) {
//         const r = Number(String(rack.row).replace(/^r/, ""));
//         const c = Number(String(rack.col).replace(/^c/, ""));
//         map[r]?.delete(c);
//       }

//       setOccupancy(map);
//     } catch (err) {
//       console.error(err);
//       setOccupancy({});
//     } finally {
//       setLoadingOccupancy(false);
//     }
//   };

//   /* -------------------------------
//      Sync rack data on open (initial load)
//      - populate formData with rack values
//      - fetch hubs + occupancy + sensors for the rack's hub
//      - set prevHubRef so initial hub change doesn't clear sensorIds
//   ------------------------------- */
//   useEffect(() => {
//     if (!open || !rack) return;
//     console.log("rack_in_useEff", rack);
//     const hubId = rack.hub?.id?._id ?? rack.hub?._id ?? rack.hubId ?? "";

    

//     setFormData({
//       name: rack.name || "",
//       hubId,
//       sensorIds: Array.isArray(rack.sensors) ? rack.sensors.map((s) => s._id) : [],
//       row: rack.row ? Number(String(rack.row).replace(/^r/, "")) : "",
//       col: rack.col ? Number(String(rack.col).replace(/^c/, "")) : "",
//       conditions: rack.conditions || [],
//     });

//     // set prevHubRef to the rack's hub so our hub-change effect knows this is the initial programmatic value
//     prevHubRef.current = hubId;


//     console.log("FormData>", formData);
//     // fetch hubs for data center and occupancy
//     const dcId = rack.dataCenter?.id._id ?? rack.dataCenter?._id ?? rack.dataCenterId ?? null;
//     console.log("dcId>>", dcId);

//     if (dcId) {
//       dispatch(fetchHubsByDataCenter(dcId));
//       fetchOccupancy(dcId);
//     }

//     // fetch sensors for the hub (if exists)
//     if (hubId) {
//       dispatch(fetchSensorsByHub(hubId));
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [open, rack, dispatch]);

//   /* -------------------------------
//      Hub change → reload sensors
//      - Only clear sensorIds when hub actually changed from previous value
//        (this avoids wiping default sensors on initial load)
//   ------------------------------- */
//   useEffect(() => {
//     const hubId = formData.hubId;
//     if (!hubId) return;

//     // always fetch sensors for whichever hubId is active
//     dispatch(fetchSensorsByHub(hubId));

//     // Clear sensors only when user changed hub (i.e. hubId differs from prevHubRef)
//     // prevHubRef is initialized in the "sync on open" effect above.
//     if (prevHubRef.current && String(prevHubRef.current) !== String(hubId)) {
//       setFormData((p) => ({ ...p, sensorIds: [] }));
//     }

//     // update prevHubRef to current hubId for subsequent changes
//     prevHubRef.current = hubId;
//   }, [formData.hubId, dispatch]);

//   const onchange = (e) => {
//     const { name, value } = e.target;
//     setFormData((p) => ({ ...p, [name]: value }));
//   };

//   /* -------------------------------
//      Update handler
//   ------------------------------- */
//   const onUpdate = async () => {
//     if (!formData.name.trim()) {
//       return Swal.fire("Warning", "Rack name is required.", "warning");
//     }

//     if (!formData.hubId) {
//       return Swal.fire("Warning", "Hub is required.", "warning");
//     }

//     try {
//       await dispatch(
//         updateRack({
//           id: rack._id,
//           payload: {
//             ...formData,
//             row: `r${formData.row}`,
//             col: `c${formData.col}`,
//           },
//         })
//       ).unwrap();

//       Swal.fire("Success", "Rack updated successfully.", "success");
//       handleClose();
//     } catch (err) {
//       Swal.fire("Error", err || "Unable to update Rack.", "error");
//     }
//   };

//   return (
//     <Modal open={!!open} onClose={handleClose}>
//       <Box
//         sx={{
//           position: "absolute",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           width: { xs: "90%", sm: 520 },
//           bgcolor: "background.paper",
//           borderRadius: 2,
//           boxShadow: 24,
//           p: { xs: 2, sm: 4 },
//         }}
//       >
//         <Typography variant="h6" fontWeight="bold" mb={2}>
//           Edit Rack
//         </Typography>

//         <InputField
//           label="Rack Name"
//           name="name"
//           value={formData.name}
//           onchange={onchange}
//           placeholder="Rack Name"
//           icon={<Cpu size={18} />}
//         />

//         <TextField
//           select
//           label="Hub"
//           value={formData.hubId}
//           onChange={(e) =>
//             setFormData((p) => ({ ...p, hubId: e.target.value }))
//           }
//           fullWidth
//           margin="normal"
//         >
//           {hubs.map((hub) => (
//             <MenuItem key={hub._id} value={hub._id}>
//               {hub.name}
//             </MenuItem>
//           ))}
//         </TextField>

//         <Autocomplete
//           multiple
//           options={sensors}
//           getOptionLabel={(o) => o.sensorName || ""}
//           isOptionEqualToValue={(option, value) => {
//             // defensive: compare by _id when possible
//             if (!option || !value) return false;
//             return String(option._id) === String(value._id);
//           }}
//           value={sensors.filter((s) => formData.sensorIds.includes(s._id))}
//           onChange={(_, values) =>
//             setFormData((p) => ({
//               ...p,
//               sensorIds: values.map((v) => v._id),
//             }))
//           }
//           renderInput={(params) => (
//             <TextField {...params} label="Sensors" margin="normal" />
//           )}
//         />

//         {/* Row / Column selectors */}
//         <Stack direction="row" spacing={2} mt={2}>
//           <TextField
//             select
//             label="Row"
//             value={formData.row}
//             onChange={(e) =>
//               setFormData((p) => ({ ...p, row: e.target.value, col: "" }))
//             }
//             fullWidth
//           >
//             {allRows.map((r) => {
//               const full = occupancy[r] && occupancy[r].size >= TOTAL_SLOTS;
//               return (
//                 <MenuItem key={r} value={r} disabled={full}>
//                   Row {r} {full ? "— full" : ""}
//                 </MenuItem>
//               );
//             })}
//           </TextField>

//           <TextField
//             select
//             label="Column"
//             value={formData.col}
//             disabled={!formData.row}
//             onChange={(e) =>
//               setFormData((p) => ({ ...p, col: e.target.value }))
//             }
//             fullWidth
//           >
//             {!formData.row && <MenuItem value="">Select row first</MenuItem>}

//             {formData.row &&
//               allCols.map((c) => {
//                 const booked = occupancy[formData.row]?.has(c);
//                 return (
//                   <MenuItem key={c} value={c} disabled={booked}>
//                     Column {c} {booked ? "— occupied" : ""}
//                   </MenuItem>
//                 );
//               })}
//           </TextField>
//         </Stack>

//         <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3}>
//           <Button variant="outlined" onClick={handleClose}>
//             Cancel
//           </Button>
//           <Button
//             variant="contained"
//             onClick={onUpdate}
//             disabled={loading.update}
//           >
//             {loading.update ? "Updating..." : "Update"}
//           </Button>
//         </Stack>
//       </Box>
//     </Modal>
//   );
// }













// // src/components/Modals/Common/RackManagement/RackEditModal.jsx
// import React, { useEffect, useState, useRef } from "react";
// import {
//   Box,
//   Button,
//   Typography,
//   Modal,
//   Stack,
//   TextField,
//   MenuItem,
//   Autocomplete,
// } from "@mui/material";
// import { Cpu } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import Swal from "sweetalert2";

// import InputField from "../../../Inputs/InputField";
// import { updateRack } from "../../../../slices/rackSlice";
// import { fetchHubsByDataCenter, fetchSensorsByHub } from "../../../../slices/hubSlice";

// const TOTAL_SLOTS = 25;

// export default function RackEditModal({ open, handleClose, rack }) {
//   const dispatch = useDispatch();

//   const { loading } = useSelector((state) => state.rack || {});
//   const { hubs = [], sensors = [] } = useSelector((state) => state.hub || {});

//   /* -------------------------------
//      Local state
//   ------------------------------- */
//   const [formData, setFormData] = useState({
//     name: "",
//     hubId: "",
//     sensorIds: [],
//     row: "",
//     col: "",
//     conditions: [],
//   });

//   const [occupancy, setOccupancy] = useState({});
//   const [loadingOccupancy, setLoadingOccupancy] = useState(false);

//   const allRows = Array.from({ length: TOTAL_SLOTS }, (_, i) => i + 1);
//   const allCols = Array.from({ length: TOTAL_SLOTS }, (_, i) => i + 1);

//   // track previous hub id to detect user-driven changes vs initial programmatic set
//   const prevHubRef = useRef(null);

//   /* -------------------------------
//      Fetch occupancy
//   ------------------------------- */
//   const fetchOccupancy = async (dataCenterId) => {
//     if (!dataCenterId) return;

//     setLoadingOccupancy(true);
//     try {
//       const token = localStorage.getItem("token");

//       const res = await fetch(
//         `${import.meta.env.VITE_BACKEND_API || "http://localhost:5050"}/rack/row-col/${dataCenterId}`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: token ? `Bearer ${token}` : "",
//           },
//           credentials: "include",
//         }
//       );

//       const result = await res.json();
//       if (!res.ok) throw new Error(result?.message || "Failed to fetch occupancy");

//       const map = {};
//       (result.data || []).forEach((r) => {
//         const rowNum = Number(String(r.row).replace(/^r/, ""));
//         map[rowNum] = new Set(
//           (r.colsBooked || []).map((c) =>
//             Number(String(c).replace(/^c/, ""))
//           )
//         );
//       });

//       // 🔑 Free current rack's own slot (so edit doesn't mark its own slot occupied)
//       if (rack?.row && rack?.col) {
//         const r = Number(String(rack.row).replace(/^r/, ""));
//         const c = Number(String(rack.col).replace(/^c/, ""));
//         map[r]?.delete(c);
//       }

//       setOccupancy(map);
//     } catch (err) {
//       console.error(err);
//       setOccupancy({});
//     } finally {
//       setLoadingOccupancy(false);
//     }
//   };

//   /* -------------------------------
//      Sync rack data on open (initial load)
//      - populate formData with rack values
//      - fetch hubs + occupancy + sensors for the rack's hub
//      - set prevHubRef so initial hub change doesn't clear sensorIds
//   ------------------------------- */
//   useEffect(() => {
//     if (!open || !rack) return;

//     const hubId = rack.hub?.id ?? rack.hub?._id ?? rack.hubId ?? "";

//     setFormData({
//       name: rack.name || "",
//       hubId,
//       sensorIds: Array.isArray(rack.sensors) ? rack.sensors.map((s) => s._id) : [],
//       row: rack.row ? Number(String(rack.row).replace(/^r/, "")) : "",
//       col: rack.col ? Number(String(rack.col).replace(/^c/, "")) : "",
//       conditions: rack.conditions || [],
//     });

//     // set prevHubRef to the rack's hub so our hub-change effect knows this is the initial programmatic value
//     prevHubRef.current = hubId;

//     // fetch hubs for data center and occupancy
//     const dcId = rack.dataCenter?.id ?? rack.dataCenter?._id ?? rack.dataCenterId ?? null;
//     if (dcId) {
//       dispatch(fetchHubsByDataCenter(dcId));
//       fetchOccupancy(dcId);
//     }

//     // fetch sensors for the hub (if exists)
//     if (hubId) {
//       dispatch(fetchSensorsByHub(hubId));
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [open, rack, dispatch]);

//   /* -------------------------------
//      Hub change → reload sensors
//      - Only clear sensorIds when hub actually changed from previous value
//        (this avoids wiping default sensors on initial load)
//   ------------------------------- */
//   useEffect(() => {
//     const hubId = formData.hubId;
//     if (!hubId) return;

//     // always fetch sensors for whichever hubId is active
//     dispatch(fetchSensorsByHub(hubId));

//     // Clear sensors only when user changed hub (i.e. hubId differs from prevHubRef)
//     // prevHubRef is initialized in the "sync on open" effect above.
//     if (prevHubRef.current && String(prevHubRef.current) !== String(hubId)) {
//       setFormData((p) => ({ ...p, sensorIds: [] }));
//     }

//     // update prevHubRef to current hubId for subsequent changes
//     prevHubRef.current = hubId;
//   }, [formData.hubId, dispatch]);

//   const onchange = (e) => {
//     const { name, value } = e.target;
//     setFormData((p) => ({ ...p, [name]: value }));
//   };

//   /* -------------------------------
//      Update handler
//   ------------------------------- */
//   const onUpdate = async () => {
//     if (!formData.name.trim()) {
//       return Swal.fire("Warning", "Rack name is required.", "warning");
//     }

//     if (!formData.hubId) {
//       return Swal.fire("Warning", "Hub is required.", "warning");
//     }

//     try {
//       await dispatch(
//         updateRack({
//           id: rack._id,
//           payload: {
//             ...formData,
//             row: `r${formData.row}`,
//             col: `c${formData.col}`,
//           },
//         })
//       ).unwrap();

//       Swal.fire("Success", "Rack updated successfully.", "success");
//       handleClose();
//     } catch (err) {
//       Swal.fire("Error", err || "Unable to update Rack.", "error");
//     }
//   };

//   return (
//     <Modal open={!!open} onClose={handleClose}>
//       <Box
//         sx={{
//           position: "absolute",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           width: { xs: "90%", sm: 520 },
//           bgcolor: "background.paper",
//           borderRadius: 2,
//           boxShadow: 24,
//           p: { xs: 2, sm: 4 },
//         }}
//       >
//         <Typography variant="h6" fontWeight="bold" mb={2}>
//           Edit Rack
//         </Typography>

//         <InputField
//           label="Rack Name"
//           name="name"
//           value={formData.name}
//           onchange={onchange}
//           placeholder="Rack Name"
//           icon={<Cpu size={18} />}
//         />

//         <TextField
//           select
//           label="Hub"
//           value={formData.hubId}
//           onChange={(e) =>
//             setFormData((p) => ({ ...p, hubId: e.target.value }))
//           }
//           fullWidth
//           margin="normal"
//         >
//           {hubs.map((hub) => (
//             <MenuItem key={hub._id} value={hub._id}>
//               {hub.name}
//             </MenuItem>
//           ))}
//         </TextField>

//         <Autocomplete
//           multiple
//           options={sensors}
//           getOptionLabel={(o) => o.sensorName || ""}
//           isOptionEqualToValue={(option, value) => {
//             // defensive: compare by _id when possible
//             if (!option || !value) return false;
//             return String(option._id) === String(value._id);
//           }}
//           value={sensors.filter((s) => formData.sensorIds.includes(s._id))}
//           onChange={(_, values) =>
//             setFormData((p) => ({
//               ...p,
//               sensorIds: values.map((v) => v._id),
//             }))
//           }
//           renderInput={(params) => (
//             <TextField {...params} label="Sensors" margin="normal" />
//           )}
//         />

//         {/* Row / Column selectors */}
//         <Stack direction="row" spacing={2} mt={2}>
//           <TextField
//             select
//             label="Row"
//             value={formData.row}
//             onChange={(e) =>
//               setFormData((p) => ({ ...p, row: e.target.value, col: "" }))
//             }
//             fullWidth
//           >
//             {allRows.map((r) => {
//               const full = occupancy[r] && occupancy[r].size >= TOTAL_SLOTS;
//               return (
//                 <MenuItem key={r} value={r} disabled={full}>
//                   Row {r} {full ? "— full" : ""}
//                 </MenuItem>
//               );
//             })}
//           </TextField>

//           <TextField
//             select
//             label="Column"
//             value={formData.col}
//             disabled={!formData.row}
//             onChange={(e) =>
//               setFormData((p) => ({ ...p, col: e.target.value }))
//             }
//             fullWidth
//           >
//             {!formData.row && <MenuItem value="">Select row first</MenuItem>}

//             {formData.row &&
//               allCols.map((c) => {
//                 const booked = occupancy[formData.row]?.has(c);
//                 return (
//                   <MenuItem key={c} value={c} disabled={booked}>
//                     Column {c} {booked ? "— occupied" : ""}
//                   </MenuItem>
//                 );
//               })}
//           </TextField>
//         </Stack>

//         <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3}>
//           <Button variant="outlined" onClick={handleClose}>
//             Cancel
//           </Button>
//           <Button
//             variant="contained"
//             onClick={onUpdate}
//             disabled={loading.update}
//           >
//             {loading.update ? "Updating..." : "Update"}
//           </Button>
//         </Stack>
//       </Box>
//     </Modal>
//   );
// }
























// /* ======================================================
//    src/components/Modals/Common/RackManagement/RackEditModal.jsx
//    ====================================================== */
// import React, { useEffect, useState, useRef } from "react";
// import {
//   Box,
//   Button,
//   Typography,
//   Modal,
//   Stack,
//   TextField,
//   MenuItem,
//   Autocomplete,
// } from "@mui/material";
// import { Cpu } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import Swal from "sweetalert2";

// import InputField from "../../../Inputs/InputField";
// import { updateRack } from "../../../../slices/rackSlice";
// import { fetchHubsByDataCenter, fetchSensorsByHub } from "../../../../slices/hubSlice";

// const TOTAL_SLOTS = 25;

// // reuse same id extractor here
// const extractIdLocal = (v) => {
//   if (v === null || v === undefined) return null;
//   if (typeof v === "string" || typeof v === "number") return v;
//   if (typeof v === "object") {
//     if (v._id) return v._id;
//     if (v.id) return extractIdLocal(v.id);
//   }
//   return null;
// };

// export default function RackEditModal({ open, handleClose, rack }) {
//   const dispatch = useDispatch();

//   const { loading } = useSelector((state) => state.rack || {});
//   const { hubs = [], sensors = [] } = useSelector((state) => state.hub || {});

//   /* -------------------------------
//      Local state
//   ------------------------------- */
//   const [formData, setFormData] = useState({
//     name: "",
//     hubId: "",
//     sensorIds: [],
//     row: "",
//     col: "",
//     conditions: [],
//   });

//   const [occupancy, setOccupancy] = useState({});
//   const [loadingOccupancy, setLoadingOccupancy] = useState(false);

//   const allRows = Array.from({ length: TOTAL_SLOTS }, (_, i) => i + 1);
//   const allCols = Array.from({ length: TOTAL_SLOTS }, (_, i) => i + 1);

//   // track previous hub id to detect user-driven changes vs initial programmatic set
//   const prevHubRef = useRef(null);

//   /* -------------------------------
//      Fetch occupancy
//   ------------------------------- */
//   const fetchOccupancy = async (dataCenterId) => {
//     if (!dataCenterId) return;

//     setLoadingOccupancy(true);
//     try {
//       const token = localStorage.getItem("token");

//       const res = await fetch(
//         `${import.meta.env.VITE_BACKEND_API || "http://localhost:5050"}/rack/row-col/${dataCenterId}`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: token ? `Bearer ${token}` : "",
//           },
//           credentials: "include",
//         }
//       );

//       const result = await res.json();
//       if (!res.ok) throw new Error(result?.message || "Failed to fetch occupancy");

//       const map = {};
//       (result.data || []).forEach((r) => {
//         const rowNum = Number(String(r.row).replace(/^r/, ""));
//         map[rowNum] = new Set(
//           (r.colsBooked || []).map((c) =>
//             Number(String(c).replace(/^c/, ""))
//           )
//         );
//       });

//       // 🔑 Free current rack's own slot (so edit doesn't mark its own slot occupied)
//       if (rack?.row && rack?.col) {
//         const r = Number(String(rack.row).replace(/^r/, ""));
//         const c = Number(String(rack.col).replace(/^c/, ""));
//         map[r]?.delete(c);
//       }

//       setOccupancy(map);
//     } catch (err) {
//       console.error(err);
//       setOccupancy({});
//     } finally {
//       setLoadingOccupancy(false);
//     }
//   };

//   /* -------------------------------
//      Sync rack data on open (initial load)
//      - populate formData with rack values
//      - fetch hubs + occupancy + sensors for the rack's hub
//      - set prevHubRef so initial hub change doesn't clear sensorIds
//   ------------------------------- */
//   useEffect(() => {
//     if (!open || !rack) return;

//     // use extractor to get primitive hub id
//     const hubId = extractIdLocal(rack.hub) ?? extractIdLocal(rack.hub?.id) ?? extractIdLocal(rack.hubId) ?? "";

//     setFormData({
//       name: rack.name || "",
//       hubId: hubId || "",
//       // sensors can be either array of objects or ids
//       sensorIds: Array.isArray(rack.sensors) ? rack.sensors.map((s) => extractIdLocal(s) ?? s) : [],
//       row: rack.row ? Number(String(rack.row).replace(/^r/, "")) : "",
//       col: rack.col ? Number(String(rack.col).replace(/^c/, "")) : "",
//       conditions: rack.conditions || [],
//     });

//     // set prevHubRef to the rack's hub so our hub-change effect knows this is the initial programmatic value
//     prevHubRef.current = hubId || "";

//     // fetch hubs for data center and occupancy
//     const dcId = extractIdLocal(rack.dataCenter) ?? extractIdLocal(rack.dataCenter?.id) ?? extractIdLocal(rack.dataCenterId) ?? null;
//     if (dcId) {
//       dispatch(fetchHubsByDataCenter(dcId));
//       fetchOccupancy(dcId);
//     }

//     // fetch sensors for the hub (if exists)
//     if (hubId) {
//       dispatch(fetchSensorsByHub(hubId));
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [open, rack, dispatch]);

//   /* -------------------------------
//      Hub change → reload sensors
//      - Only clear sensorIds when hub actually changed from previous value
//        (this avoids wiping default sensors on initial load)
//   ------------------------------- */
//   useEffect(() => {
//     const hubId = formData.hubId;
//     if (!hubId) return;
//     console.log("HUBID>>>", hubId);

//     // always fetch sensors for whichever hubId is active
//     dispatch(fetchSensorsByHub(hubId));



//     // Clear sensors only when user changed hub (i.e. hubId differs from prevHubRef)
//     // prevHubRef is initialized in the "sync on open" effect above.
//     if (prevHubRef.current && String(prevHubRef.current) !== String(hubId)) {
//       setFormData((p) => ({ ...p, sensorIds: [] }));
//     }

//     // update prevHubRef to current hubId for subsequent changes
//     prevHubRef.current = hubId;
//   }, [formData.hubId, dispatch]);

//   const onchange = (e) => {
//     const { name, value } = e.target;
//     setFormData((p) => ({ ...p, [name]: value }));
//   };

//   /* -------------------------------
//      Update handler
//   ------------------------------- */
//   const onUpdate = async () => {
//     if (!formData.name.trim()) {
//       return Swal.fire("Warning", "Rack name is required.", "warning");
//     }

//     if (!formData.hubId) {
//       return Swal.fire("Warning", "Hub is required.", "warning");
//     }

//     try {
//       await dispatch(
//         updateRack({
//           id: rack._id,
//           payload: {
//             ...formData,
//             row: `r${formData.row}`,
//             col: `c${formData.col}`,
//           },
//         })
//       ).unwrap();

//       Swal.fire("Success", "Rack updated successfully.", "success");
//       handleClose();
//     } catch (err) {
//       Swal.fire("Error", err || "Unable to update Rack.", "error");
//     }
//   };

//   return (
//     <Modal open={!!open} onClose={handleClose}>
//       <Box
//         sx={{
//           position: "absolute",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           width: { xs: "90%", sm: 520 },
//           bgcolor: "background.paper",
//           borderRadius: 2,
//           boxShadow: 24,
//           p: { xs: 2, sm: 4 },
//         }}
//       >
//         <Typography variant="h6" fontWeight="bold" mb={2}>
//           Edit Rack
//         </Typography>

//         <InputField
//           label="Rack Name"
//           name="name"
//           value={formData.name}
//           onchange={onchange}
//           placeholder="Rack Name"
//           icon={<Cpu size={18} />}
//         />

//         <TextField
//           select
//           label="Hub"
//           value={formData.hubId}
//           onChange={(e) =>
//             setFormData((p) => ({ ...p, hubId: e.target.value }))
//           }
//           fullWidth
//           margin="normal"
//         >
//           {hubs.map((hub) => (
//             <MenuItem key={hub._id} value={hub._id}>
//               {hub.name}
//             </MenuItem>
//           ))}
//         </TextField>

//         <Autocomplete
//           multiple
//           options={sensors}
//           getOptionLabel={(o) => o.sensorName || ""}
//           isOptionEqualToValue={(option, value) => {
//             // defensive: compare by _id when possible
//             if (!option || !value) return false;
//             return String(option._id) === String(value._id);
//           }}
//           value={sensors.filter((s) => formData.sensorIds.includes(s._id))}
//           onChange={(_, values) =>
//             setFormData((p) => ({
//               ...p,
//               sensorIds: values.map((v) => v._id),
//             }))
//           }
//           renderInput={(params) => (
//             <TextField {...params} label="Sensors" margin="normal" />
//           )}
//         />

//         {/* Row / Column selectors */}
//         <Stack direction="row" spacing={2} mt={2}>
//           <TextField
//             select
//             label="Row"
//             value={formData.row}
//             onChange={(e) =>
//               setFormData((p) => ({ ...p, row: e.target.value, col: "" }))
//             }
//             fullWidth
//           >
//             {allRows.map((r) => {
//               const full = occupancy[r] && occupancy[r].size >= TOTAL_SLOTS;
//               return (
//                 <MenuItem key={r} value={r} disabled={full}>
//                   Row {r} {full ? "— full" : ""}
//                 </MenuItem>
//               );
//             })}
//           </TextField>

//           <TextField
//             select
//             label="Column"
//             value={formData.col}
//             disabled={!formData.row}
//             onChange={(e) =>
//               setFormData((p) => ({ ...p, col: e.target.value }))
//             }
//             fullWidth
//           >
//             {!formData.row && <MenuItem value="">Select row first</MenuItem>}

//             {formData.row &&
//               allCols.map((c) => {
//                 const booked = occupancy[formData.row]?.has(c);
//                 return (
//                   <MenuItem key={c} value={c} disabled={booked}>
//                     Column {c} {booked ? "— occupied" : ""}
//                   </MenuItem>
//                 );
//               })}
//           </TextField>
//         </Stack>

//         <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3}>
//           <Button variant="outlined" onClick={handleClose}>
//             Cancel
//           </Button>
//           <Button
//             variant="contained"
//             onClick={onUpdate}
//             disabled={loading.update}
//           >
//             {loading.update ? "Updating..." : "Update"}
//           </Button>
//         </Stack>
//       </Box>
//     </Modal>
//   );
// }





















// src/components/Modals/Common/RackManagement/RackEditModal.jsx
import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  Stack,
  TextField,
  MenuItem,
  Autocomplete,
} from "@mui/material";
import { Cpu } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import InputField from "../../../Inputs/InputField";
import { updateRack } from "../../../../slices/rackSlice";
import { fetchHubsByDataCenter, fetchSensorsByHub } from "../../../../slices/hubSlice";

const TOTAL_SLOTS = 25;

/**
 * Fully recursive id extractor.
 * - Accepts string/number primitives.
 * - Unwraps v._id and v.id recursively until primitive found.
 * - Returns null when none found.
 */
const extractIdLocal = (v) => {
  if (v === null || v === undefined) return null;
  if (typeof v === "string" || typeof v === "number") return String(v);
  if (typeof v === "object") {
    // if _id exists, unwrap recursively (handles nested objects)
    if (v._id !== undefined && v._id !== null) return extractIdLocal(v._id);
    if (v.id !== undefined && v.id !== null) return extractIdLocal(v.id);
  }
  return null;
};

export default function RackEditModal({ open, handleClose, rack, onUpdated }) {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.rack || {});
  const { hubs = [], sensors = [] } = useSelector((state) => state.hub || {});

  /* -------------------------------
     Local state
  ------------------------------- */
  const [formData, setFormData] = useState({
    name: "",
    hubId: "",
    sensorIds: [],
    row: "",
    col: "",
    conditions: [],
  });

  const [occupancy, setOccupancy] = useState({});
  const [loadingOccupancy, setLoadingOccupancy] = useState(false);

  const allRows = Array.from({ length: TOTAL_SLOTS }, (_, i) => i + 1);
  const allCols = Array.from({ length: TOTAL_SLOTS }, (_, i) => i + 1);

  // track previous hub id to detect user-driven changes vs initial programmatic set
  const prevHubRef = useRef(null);

  /* -------------------------------
     Fetch occupancy
  ------------------------------- */
  const fetchOccupancy = async (dataCenterId) => {
    if (!dataCenterId) return;

    setLoadingOccupancy(true);
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_API || "http://localhost:5050"}/rack/row-col/${dataCenterId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
          credentials: "include",
        }
      );

      const result = await res.json();
      if (!res.ok) throw new Error(result?.message || "Failed to fetch occupancy");

      const map = {};
      (result.data || []).forEach((r) => {
        const rowNum = Number(String(r.row).replace(/^r/, ""));
        map[rowNum] = new Set(
          (r.colsBooked || []).map((c) => Number(String(c).replace(/^c/, "")))
        );
      });

      // Free current rack's own slot (so edit doesn't mark its own slot occupied)
      if (rack?.row && rack?.col) {
        const r = Number(String(rack.row).replace(/^r/, ""));
        const c = Number(String(rack.col).replace(/^c/, ""));
        map[r]?.delete(c);
      }

      setOccupancy(map);
    } catch (err) {
      console.error(err);
      setOccupancy({});
    } finally {
      setLoadingOccupancy(false);
    }
  };

  /* -------------------------------
     Sync rack data on open (initial load)
     - populate formData with rack values
     - fetch hubs + occupancy + sensors for the rack's hub
     - set prevHubRef so initial hub change doesn't clear sensorIds
  ------------------------------- */
  useEffect(() => {
    if (!open || !rack) return;

    // compute hub id (primitive string) safely
    const hubId = extractIdLocal(rack.hub) ?? extractIdLocal(rack.hub?.id) ?? extractIdLocal(rack.hubId) ?? "";

    // compute sensorIds as array of primitive strings
    const rackSensorIds = Array.isArray(rack.sensors)
      ? rack.sensors
          .map((s) => {
            // sensor entry might be: { _id: '...', name } OR { _id: { _id: '...' }, name } OR just an id
            // try common shapes:
            if (s == null) return null;
            // If sensor object has an _id property which may be nested object, unwrap:
            const idFrom_s = extractIdLocal(s._id ?? s.id ?? s);
            return idFrom_s;
          })
          .filter(Boolean) // remove null/undefined
      : [];

    setFormData({
      name: rack.name || "",
      hubId: hubId || "",
      sensorIds: rackSensorIds,
      row: rack.row ? Number(String(rack.row).replace(/^r/, "")) : "",
      col: rack.col ? Number(String(rack.col).replace(/^c/, "")) : "",
      conditions: rack.conditions || [],
    });

    // set prevHubRef to the rack's hub so our hub-change effect knows this is the initial programmatic value
    prevHubRef.current = hubId || "";

    // fetch hubs for data center and occupancy
    const dcId =
      extractIdLocal(rack.dataCenter) ??
      extractIdLocal(rack.dataCenter?.id) ??
      extractIdLocal(rack.dataCenterId) ??
      null;
    if (dcId) {
      dispatch(fetchHubsByDataCenter(dcId));
      fetchOccupancy(dcId);
    }

    // fetch sensors for the hub (if exists)
    if (hubId) {
      dispatch(fetchSensorsByHub(hubId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, rack, dispatch]);

  /* -------------------------------
     Hub change → reload sensors
     - Only clear sensorIds when hub actually changed from previous value
       (this avoids wiping default sensors on initial load)
  ------------------------------- */
  useEffect(() => {
    const hubId = formData.hubId;
    if (!hubId) return;

    // always fetch sensors for whichever hubId is active
    dispatch(fetchSensorsByHub(hubId));

    // Clear sensors only when user changed hub (i.e. hubId differs from prevHubRef)
    if (prevHubRef.current && String(prevHubRef.current) !== String(hubId)) {
      setFormData((p) => ({ ...p, sensorIds: [] }));
    }

    // update prevHubRef to current hubId for subsequent changes
    prevHubRef.current = hubId;
  }, [formData.hubId, dispatch]);

  const onchange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  /* -------------------------------
     Update handler
  ------------------------------- */
  const onUpdate = async () => {
    if (!formData.name.trim()) {
      return Swal.fire("Warning", "Rack name is required.", "warning");
    }

    if (!formData.hubId) {
      return Swal.fire("Warning", "Hub is required.", "warning");
    }

    try {
      await dispatch(
        updateRack({
          id: rack._id,
          payload: {
            ...formData,
            row: `r${formData.row}`,
            col: `c${formData.col}`,
          },
        })
      ).unwrap();

      Swal.fire("Success", "Rack updated successfully.", "success");
      onUpdated?.();
      handleClose();
    } catch (err) {
      Swal.fire("Error", err || "Unable to update Rack.", "error");
    }
  };

  return (
    <Modal open={!!open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: 520 },
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: { xs: 2, sm: 4 },
        }}
      >
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Edit Rack
        </Typography>

        <InputField
          label="Rack Name"
          name="name"
          value={formData.name}
          onchange={onchange}
          placeholder="Rack Name"
          icon={<Cpu size={18} />}
        />

        <TextField
          select
          label="Hub"
          value={formData.hubId}
          onChange={(e) => setFormData((p) => ({ ...p, hubId: e.target.value }))}
          fullWidth
          margin="normal"
        >
          {hubs.map((hub) => (
            <MenuItem key={hub._id} value={hub._id}>
              {hub.name}
            </MenuItem>
          ))}
        </TextField>

        <Autocomplete
          multiple
          options={sensors}
          getOptionLabel={(o) => o.sensorName || ""}
          isOptionEqualToValue={(option, value) => {
            // defensive: compare by _id when possible
            if (!option || !value) return false;
            return String(option._id) === String(value._id);
          }}
          // value: pick options whose _id exists in formData.sensorIds (compare as strings)
          value={sensors.filter((s) => formData.sensorIds.map(String).includes(String(s._id)))}
          onChange={(_, values) =>
            setFormData((p) => ({
              ...p,
              sensorIds: values.map((v) => String(v._id)),
            }))
          }
          renderInput={(params) => <TextField {...params} label="Sensors" margin="normal" />}
        />

        {/* Row / Column selectors */}
        <Stack direction="row" spacing={2} mt={2}>
          <TextField
            select
            label="Row"
            value={formData.row}
            onChange={(e) => setFormData((p) => ({ ...p, row: e.target.value, col: "" }))}
            fullWidth
          >
            {allRows.map((r) => {
              const full = occupancy[r] && occupancy[r].size >= TOTAL_SLOTS;
              return (
                <MenuItem key={r} value={r} disabled={full}>
                  Row {r} {full ? "— full" : ""}
                </MenuItem>
              );
            })}
          </TextField>

          <TextField
            select
            label="Column"
            value={formData.col}
            disabled={!formData.row}
            onChange={(e) => setFormData((p) => ({ ...p, col: e.target.value }))}
            fullWidth
          >
            {!formData.row && <MenuItem value="">Select row first</MenuItem>}

            {formData.row &&
              allCols.map((c) => {
                const booked = occupancy[formData.row]?.has(c);
                return (
                  <MenuItem key={c} value={c} disabled={booked}>
                    Column {c} {booked ? "— occupied" : ""}
                  </MenuItem>
                );
              })}
          </TextField>
        </Stack>

        <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3}>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={onUpdate} disabled={loading.update}>
            {loading.update ? "Updating..." : "Update"}
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}