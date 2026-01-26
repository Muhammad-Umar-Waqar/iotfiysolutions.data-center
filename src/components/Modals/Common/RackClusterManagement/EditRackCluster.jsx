import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  Stack,
  MenuItem,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import { updateRackCluster } from "../../../../slices/rackClusterSlice";
// import { fetchAckits } from "../../../slices/ackitSlice";

import { fetchRacksByDataCenterId } from "../../../../slices/rackSlice";
import { useInstallation } from "../../../../contexts/InstallationContext";
import { fetchAllAckits } from "../../../../slices/ackitSlice";


export default function EditRackCluster({ open, handleClose, cluster }) {
  const dispatch = useDispatch();

  const { selectedDataCenter } = useInstallation();

  const { ackits } = useSelector((s) => s.ackit);
  const { racks } = useSelector((s) => s.rack);
  const { loading } = useSelector((s) => s.rackCluster);

  const [name, setName] = useState("");
  const [ackitId, setAckitId] = useState("");
  const [selectedRacks, setSelectedRacks] = useState([]);

  /* -------------------------
     Prefill on open
  -------------------------- */
  // useEffect(() => {
  //   if (!open || !selectedRackCluster) return;

  //   setName(selectedRackCluster.name || "");
  //   setAckitId(selectedRackCluster.ackitId || "");
  //   setSelectedRacks(
  //     (selectedRackCluster.racks || []).map((r) => r._id)
  //   );

  //   dispatch(fetchAllAckits());
  //   dispatch(fetchRacksByDataCenterId(selectedDataCenter._id));
  // }, [open, selectedRackCluster, selectedDataCenter, dispatch]);



  useEffect(() => {
  if (!open || !cluster) return;

  setName(cluster.name || "");
  setAckitId(cluster.ackitId || "");
  setSelectedRacks((cluster.racks || []).map(r => r._id));

  dispatch(fetchAllAckits());

  if (selectedDataCenter?._id) {
    dispatch(fetchRacksByDataCenterId(selectedDataCenter._id));
  }
}, [open, cluster, selectedDataCenter, dispatch]);



  /* -------------------------
     Update handler
  -------------------------- */
  const handleUpdate = async () => {
    if (!name.trim()) {
      return Swal.fire("Missing", "Cluster name is required", "warning");
    }

    if (!ackitId) {
      return Swal.fire("Missing", "Please select an Ackit", "warning");
    }

    if (selectedRacks.length === 0) {
      return Swal.fire("Missing", "Select at least one rack", "warning");
    }

    try {
      await dispatch(
        updateRackCluster({
          id: cluster._id,
          payload: {
            name: name.trim(),
            ackitId,
            racks: selectedRacks,
            dataCenterId: selectedDataCenter._id,
          },
        })
      ).unwrap();

      Swal.fire("Updated", "Rack Cluster updated successfully", "success");
      handleClose();
    } catch (err) {
      Swal.fire("Error", err || "Update failed", "error");
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: 520 },
          bgcolor: "background.paper",
          borderRadius: 2,
          p: 3,
        }}
      >
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Edit Rack Cluster
        </Typography>

        {/* Cluster Name */}
        <TextField
          label="Cluster Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
        />

        {/* Ackit */}
        <TextField
          select
          label="Ackit"
          fullWidth
          value={ackitId}
          onChange={(e) => setAckitId(e.target.value)}
          margin="normal"
        >
          {ackits.map((a) => (
            <MenuItem key={a._id} value={a._id}>
              {a.name}
            </MenuItem>
          ))}
        </TextField>

        {/* Racks */}
        <TextField
          select
          label="Racks"
          fullWidth
          SelectProps={{ multiple: true }}
          value={selectedRacks}
          onChange={(e) => setSelectedRacks(e.target.value)}
          margin="normal"
        >
          {racks.map((r) => (
            <MenuItem key={r._id} value={r._id}>
              {r.name}
            </MenuItem>
          ))}
        </TextField>

        <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3}>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handleUpdate}
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
