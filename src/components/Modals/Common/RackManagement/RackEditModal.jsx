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












import React, { useEffect, useState } from "react";
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
import { fetchHubsByDataCenter, fetchSensorsByHub } from "../../../../slices/hubSlice"; // <-- changed import

export default function RackEditModal({ open, handleClose, rack }) {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.rack);
//   const { hubs, sensors } = useSelector((state) => state.hub); // <- use hub.sensors

const { hubs = [], sensors = [] } = useSelector(
  (state) => state.hub || {}
);



  const [formData, setFormData] = useState({
    name: "",
    hubId: "",
    sensorIds: [],
    row: "",
    col: "",
    conditions: [],
  });

  /* -------------------------------
     Sync rack data on open
  ------------------------------- */
  useEffect(() => {
    if (!open || !rack) return;

    const hubId = rack.hub?.id || "";

    setFormData({
      name: rack.name || "",
      hubId,
      sensorIds: rack.sensors?.map((s) => s._id) || [],
      row: rack.row || "",
      col: rack.col || "",
      conditions: rack.conditions || [],
    });

    if (rack.dataCenter?.id) {
      dispatch(fetchHubsByDataCenter(rack.dataCenter.id));
    }

    if (hubId) {
      dispatch(fetchSensorsByHub(hubId)); // <- now from hubSlice
    }
  }, [open, rack, dispatch]);

  /* -------------------------------
     Hub change → reload sensors
  ------------------------------- */
  useEffect(() => {
    if (!formData.hubId) return;

    dispatch(fetchSensorsByHub(formData.hubId));
    setFormData((p) => ({ ...p, sensorIds: [] }));
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
          payload: formData,
        })
      ).unwrap();

      Swal.fire("Success", "Rack updated successfully.", "success");
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
          borderRadius: "8px",
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
          onChange={(e) =>
            setFormData((p) => ({ ...p, hubId: e.target.value }))
          }
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
          getOptionLabel={(o) => o.sensorName}
          value={sensors.filter((s) =>
            formData.sensorIds.includes(s._id)
          )}
          onChange={(_, values) =>
            setFormData((p) => ({
              ...p,
              sensorIds: values.map((v) => v._id),
            }))
          }
          renderInput={(params) => (
            <TextField {...params} label="Sensors" margin="normal" />
          )}
        />

        <Stack direction="row" spacing={2} mt={2}>
          <InputField
            label="Row"
            name="row"
            type="number"
            value={formData.row}
            onchange={onchange}
          />
          <InputField
            label="Column"
            name="col"
            type="number"
            value={formData.col}
            onchange={onchange}
          />
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
