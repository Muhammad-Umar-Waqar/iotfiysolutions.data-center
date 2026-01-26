

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import InputField from "../../Inputs/InputField";
import { Box as BoxIcon } from "lucide-react";

export default function DeleteModal({
  open,
  handleClose,
  handleDelete,
  itemName,
  itemLabel = "Item",
  itemId,
}) {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: 400 },
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: { xs: 3, sm: 4 },
        }}
      >
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Confirm Delete
        </Typography>

        <InputField
          label={`${itemLabel} Name`}
          id="item_name"
          name="item_name"
          type="text"
          value={itemName}
          placeholder={`${itemLabel} Name`}
          icon={<BoxIcon size={18} className="text-gray-400" />}
          fullWidth
          disabled
        />

        <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3}>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button onClick={() => handleDelete(itemId)} variant="contained" color="error">
            Delete
          </Button>
          
        </Stack>
      </Box>
    </Modal>
  );
}
