// // HubManagement/HubEditModal.jsx

// // src/components/Modals/HubManagement/HubEditModal.jsx
// import React from "react";
// import { Box, Button, Typography, Modal, Stack } from "@mui/material";
// import { Box as BoxIcon } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";

// import Swal from "sweetalert2";
// import InputField from "../../../Inputs/InputField";
// import { updateHub } from "../../../../slices/hubSlice";

// export default function HubEditModal({
//   open,
//   handleClose,
//   hubId,
//   hubName = "",
//   handleEdit, // optional callback (kept for compatibility)
// }) {
//   const dispatch = useDispatch();
//   const { loading } = useSelector((state) => state.hub || {});

//   const [name, setName] = React.useState(hubName || "");

//   // Sync input when modal opens or hubName changes
//   React.useEffect(() => {
//     if (open) setName(hubName || "");
//   }, [open, hubName]);

//   const onUpdate = async () => {
//     const trimmed = (name || "").trim();

//     if (!trimmed) {
//       Swal.fire({
//         icon: "warning",
//         title: "Missing field",
//         text: "Hub name is required.",
//       });
//       return;
//     }

//     try {
//       await dispatch(
//         updateHub({
//           hubId,
//           payload: { name: trimmed },
//         })
//       ).unwrap();

//       Swal.fire({
//         icon: "success",
//         title: "Hub updated",
//         text: `Hub "${trimmed}" updated successfully.`,
//       });

//       // optional callback if parent wants extra control
//       handleEdit && handleEdit(hubId, trimmed);

//       handleClose();
//     } catch (err) {
//       Swal.fire({
//         icon: "error",
//         title: "Update failed",
//         text: err || "Unable to update Hub.",
//       });
//       console.error("update hub error:", err);
//     }
//   };

//   return (
//     <Modal open={!!open} onClose={handleClose} aria-labelledby="edit-hub-title">
//       <Box
//         sx={{
//           position: "absolute",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           width: { xs: "90%", sm: 500 },
//           maxWidth: "95%",
//           maxHeight: "90vh",
//           overflowY: "auto",
//           bgcolor: "background.paper",
//           borderRadius: "8px",
//           boxShadow: 24,
//           p: { xs: 2, sm: 4 },
//           outline: "none",
//         }}
//       >
//         <Typography
//           id="edit-hub-title"
//           variant="h6"
//           fontWeight="bold"
//           mb={2}
//         >
//           Edit Hub
//         </Typography>

//         <InputField
//           label="Hub Name"
//           id="hub_name"
//           name="hub_name"
//           type="text"
//           value={name}
//           onchange={(e) => setName(e.target.value)}
//           placeholder="Hub Name"
//           icon={<BoxIcon size={18} className="text-gray-400" />}
//         />

//         <Stack
//           direction={{ xs: "column", sm: "row" }}
//           spacing={2}
//           justifyContent="flex-end"
//           mt={3}
//         >
//           <Button
//             onClick={handleClose}
//             variant="outlined"
//             disabled={loading?.update}
//             fullWidth={{ xs: true, sm: false }}
//           >
//             Cancel
//           </Button>

//           <Button
//             onClick={onUpdate}
//             variant="contained"
//             color="primary"
//             disabled={loading?.update}
//             fullWidth={{ xs: true, sm: false }}
//           >
//             {loading?.update ? "Updating..." : "Update"}
//           </Button>
//         </Stack>
//       </Box>
//     </Modal>
//   );
// }












// src/components/Modals/HubManagement/HubEditModal.jsx
import React from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  Stack,
  MenuItem,
  TextField,
} from "@mui/material";
import { Box as BoxIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import InputField from "../../../Inputs/InputField";
import { updateHub } from "../../../../slices/hubSlice";
import { fetchAllDataCenters } from "../../../../slices/DataCenterSlice";

export default function HubEditModal({
  open,
  handleClose,
  hubId,
  hubName = "",
  hubDataCenterId, // 👈 pass this from HubList
}) {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.hub);
  const { DataCenters } = useSelector((state) => state.DataCenter);

  const [name, setName] = React.useState("");
  const [dataCenterId, setDataCenterId] = React.useState("");

  /* ------------------------------------
     Sync data when modal opens
  ------------------------------------ */
  React.useEffect(() => {
    if (!open) return;

    setName(hubName || "");
    setDataCenterId(hubDataCenterId || "");

    // fetch datacenters only when modal opens
    dispatch(fetchAllDataCenters());
  }, [open, hubName, hubDataCenterId, dispatch]);

  /* ------------------------------------
     Update handler
  ------------------------------------ */
  const onUpdate = async () => {
    const trimmedName = (name || "").trim();

     console.log("data", trimmedName, dataCenterId, hubId);
    if (!trimmedName) {
      Swal.fire({
        icon: "warning",
        title: "Missing field",
        text: "Hub name is required.",
      });
      return;
    }

    if (!dataCenterId) {
      Swal.fire({
        icon: "warning",
        title: "Missing field",
        text: "Please select a Data Center.",
      });
      return;
    }

    try {
      await dispatch(
        updateHub({
          hubId,
          payload: {
            name: trimmedName,
            dataCenterId,
          },
        })
      ).unwrap();

      Swal.fire({
        icon: "success",
        title: "Hub updated",
        text: `Hub "${trimmedName}" updated successfully.`,
      });

      handleClose();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Update failed",
        text: err || "Unable to update Hub.",
      });
    }
  };

  return (
    <Modal open={!!open} onClose={handleClose} aria-labelledby="edit-hub-title">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: 500 },
          maxWidth: "95%",
          bgcolor: "background.paper",
          borderRadius: "8px",
          boxShadow: 24,
          p: { xs: 2, sm: 4 },
          outline: "none",
        }}
      >
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Edit Hub
        </Typography>

        {/* Hub Name */}
        <InputField
          label="Hub Name"
          id="hub_name"
          name="hub_name"
          type="text"
          value={name}
          onchange={(e) => setName(e.target.value)}
          placeholder="Hub Name"
          icon={<BoxIcon size={18} className="text-gray-400" />}
        />

        {/* Data Center Select */}
        {/* <TextField
          select
          label="Data Center"
          value={dataCenterId}
          onChange={(e) => setDataCenterId(e.target.value)}
          fullWidth
          margin="normal"
        >
          {DataCenters.map((dc) => (
            <MenuItem key={dc._id} value={dc._id}>
              {dc.name}
            </MenuItem>
          ))}
        </TextField> */}


                    <TextField
            select
            label="Data Center"
            value={dataCenterId}
            onChange={(e) => setDataCenterId(e.target.value)}
            fullWidth
            margin="normal"
            disabled={loading.update || DataCenters.length === 0}
            >
            {DataCenters.length === 0 ? (
                <MenuItem disabled>No Data Centers found</MenuItem>
            ) : (
                DataCenters.map((dc) => (
                <MenuItem key={dc._id} value={dc._id}>
                    {dc.name}
                </MenuItem>
                ))
            )}
            </TextField>


        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="flex-end"
          mt={3}
        >
          <Button
            onClick={handleClose}
            variant="outlined"
            disabled={loading.update}
          >
            Cancel
          </Button>

          <Button
            onClick={onUpdate}
            variant="contained"
            disabled={loading.update}
          >
            {loading.update ? "Updating..." : "Update"}
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
