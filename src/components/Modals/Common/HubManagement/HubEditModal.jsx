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
import { fetchAllDataCenters, fetchDataCentersByUser } from "../../../../slices/DataCenterSlice";
import { useStore } from "../../../../contexts/storecontexts";

export default function HubEditModal({
  open,
  handleClose,
  hubId,
  hubName = "",
  hubDataCenterId, // 👈 pass this from HubList
  handleEdit, // 👈 optional callback to notify parent of update
}) {
  const dispatch = useDispatch();
  const { user: currentUser } = useStore();

  const { loading } = useSelector((state) => state.hub);
  const { DataCenters } = useSelector((state) => state.DataCenter);

  const [name, setName] = React.useState("");
  const [dataCenterId, setDataCenterId] = React.useState("");

  /* ------------------------------------
     Helper functions (same as DataCenterSelect)
  ------------------------------------ */
  const getOptionId = React.useCallback((dc) => {
    if (!dc) return "";
    // manager/user should prefer nested dataCenterId
    if (currentUser?.role === "manager" || currentUser?.role === "user") {
      // nested populated object
      if (dc.dataCenterId && typeof dc.dataCenterId === "object") {
        return dc.dataCenterId._id || dc.dataCenterId.id || "";
      }
      // nested string id
      if (dc.dataCenterId && typeof dc.dataCenterId === "string") {
        return dc.dataCenterId;
      }
      // fallback to top-level
      return dc._id || "";
    }
    // admin: prefer top-level _id (full datacenter objects)
    return dc._id || (dc.dataCenterId && (dc.dataCenterId._id || dc.dataCenterId)) || "";
  }, [currentUser?.role]);

  const getOptionName = React.useCallback((dc) => {
    if (!dc) return "";
    return (dc.dataCenterId && (dc.dataCenterId.name || dc.name)) || dc.name || "";
  }, []);

  // Normalized options array (same logic as DataCenterSelect)
  const dataCenterOptions = React.useMemo(() => {
    if (!Array.isArray(DataCenters)) return [];
    const map = new Map();
    return DataCenters.map((dc) => {
      const id = getOptionId(dc);
      const name = getOptionName(dc);
      if (!id) return null;
      if (map.has(id)) return null; // deduplicate
      map.set(id, true);
      return { id, name };
    }).filter(Boolean);
  }, [DataCenters, getOptionId, getOptionName]);

  /* ------------------------------------
     Fetch datacenters based on user role (same as Dashboard)
  ------------------------------------ */
  React.useEffect(() => {
    if (!open || !currentUser?._id) return;

    if (currentUser.role === "admin") {
      dispatch(fetchAllDataCenters());
    } else {
      dispatch(fetchDataCentersByUser(currentUser._id));
    }
  }, [open, currentUser?._id, currentUser?.role, dispatch]);

  /* ------------------------------------
     Sync data when modal opens
  ------------------------------------ */
  React.useEffect(() => {
    if (!open) return;
    setName(hubName || "");
    // Set initial dataCenterId - will be normalized when DataCenters load
    setDataCenterId(hubDataCenterId || "");
  }, [open, hubName, hubDataCenterId]);

  /* ------------------------------------
     Normalize dataCenterId when DataCenters are loaded
  ------------------------------------ */
  React.useEffect(() => {
    if (!open || !hubDataCenterId || DataCenters.length === 0) return;

    // Find the matching data center and use its normalized ID
    const currentDc = DataCenters.find((dc) => {
      const dcId = getOptionId(dc);
      // Compare with hubDataCenterId (could be string or ObjectId)
      return String(dcId) === String(hubDataCenterId);
    });
    
    if (currentDc) {
      const normalizedId = String(getOptionId(currentDc));
      setDataCenterId(normalizedId);
      return;
    }
    
    // If not found in list, try to match by checking all possible ID formats
    const found = DataCenters.find((dc) => {
      return (
        String(dc._id) === String(hubDataCenterId) ||
        String(dc.dataCenterId?._id || dc.dataCenterId) === String(hubDataCenterId)
      );
    });
    if (found) {
      setDataCenterId(String(getOptionId(found)));
    }
  }, [open, hubDataCenterId, DataCenters, getOptionId]);

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

      // Call parent callback if provided (passes id, name, and new dataCenterId)
      // Parent will handle success/error messages
      if (handleEdit && typeof handleEdit === "function") {
        handleEdit(hubId, trimmedName, dataCenterId);
      } else {
        // If no callback, show success message here
        Swal.fire({
          icon: "success",
          title: "Hub updated",
          text: `Hub "${trimmedName}" updated successfully.`,
        });
      }

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
          value={dataCenterId || ""}
          onChange={(e) => setDataCenterId(e.target.value)}
          fullWidth
          margin="normal"
          disabled={loading.update || dataCenterOptions.length === 0}
        >
          {dataCenterOptions.length === 0 ? (
            <MenuItem disabled>No Data Centers found</MenuItem>
          ) : (
            dataCenterOptions.map((opt) => (
              <MenuItem key={opt.id} value={String(opt.id)}>
                {opt.name}
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
