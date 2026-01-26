// AcKitManagement/AckitEditModal.jsx

// src/components/Modals/Common/AckitEditModal.jsx
import React, { useEffect, useState } from "react";
import { Box, Button, Typography, Modal, Stack } from "@mui/material";
import InputField from "../../../Inputs/InputField";
import { useDispatch, useSelector } from "react-redux";
import { updateAckit, fetchAllAckits } from "../../../../slices/ackitSlice";
import Swal from "sweetalert2";

export default function AckitEditModal({ open, handleClose, ackit }) {
  const dispatch = useDispatch();
  const { loading = {} } = useSelector((s) => s.ackit || {});
  const [name, setName] = useState("");
  const [condition, setCondition] = useState({ type: "temp", operator: ">", value: 0 });

  useEffect(() => {
    if (!open || !ackit) return;
    setName(ackit.name || "");
    setCondition(ackit.condition || { type: "temp", operator: ">", value: 0 });
  }, [open, ackit]);

  const onUpdate = async () => {
    if (!name.trim()) {
      return Swal.fire("Warning", "Name is required", "warning");
    }
    if (condition.value === "" || condition.value === null) {
      return Swal.fire("Warning", "Condition value is required", "warning");
    }

    try {
      await dispatch(updateAckit({ id: ackit._id, payload: { name: name.trim(), condition } })).unwrap();
      Swal.fire("Success", "AC Kit updated", "success");
      dispatch(fetchAllAckits());
      handleClose();
    } catch (err) {
      Swal.fire("Error", err || "Unable to update", "error");
    }
  };

  return (
    <Modal open={!!open} onClose={handleClose}>
      <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: { xs: "90%", sm: 520 }, bgcolor: "background.paper", borderRadius: 2, boxShadow: 24, p: { xs: 2, sm: 4 } }}>
        <Typography variant="h6" fontWeight="bold" mb={2}>Edit AC Kit</Typography>

        <InputField label="Name" id="ackit_edit_name" name="ackit_edit_name" type="text" value={name} onchange={(e) => setName(e.target.value)} />

        <div style={{ marginTop: 12 }}>
          <label className="block mb-1 font-medium text-gray-700">Condition</label>
          <div className="flex items-center gap-2">
            <select value={condition.type} onChange={(e) => setCondition((p) => ({ ...p, type: e.target.value }))} className="border border-gray-300 rounded-md px-2 py-1">
              <option value="temp">Temperature</option>
              <option value="humidity">Humidity</option>
            </select>

            <select value={condition.operator} onChange={(e) => setCondition((p) => ({ ...p, operator: e.target.value }))} className="border border-gray-300 rounded-md px-2 py-1">
              <option value=">">&gt;</option>
              <option value="<">&lt;</option>
            </select>

            <input type="number" value={condition.value} onChange={(e) => setCondition((p) => ({ ...p, value: Number(e.target.value) }))} className="border border-gray-300 rounded-md px-2 py-1 w-28" />
          </div>
        </div>

        <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3}>
          <Button onClick={handleClose} variant="outlined">Cancel</Button>
          <Button variant="contained" onClick={onUpdate} disabled={loading.update}>{loading.update ? "Updating..." : "Update"}</Button>
        </Stack>
      </Box>
    </Modal>
  );
}
