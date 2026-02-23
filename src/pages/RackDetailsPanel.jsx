
import * as React from "react";
import {
  Box,
  Typography,
  Chip,
  Stack,
  Select,
  MenuItem,
  Divider,
} from "@mui/material";

export default function RackDetailsPanel({ rack }) {
  const [sensorId, setSensorId] = React.useState("");

  React.useEffect(() => {
    if (rack?.sensors?.length) {
      setSensorId(rack.sensors[0]._id);
    }
  }, [rack]);

  if (!rack) {
    return (
      <Box p={2}>
        <Typography variant="body2" color="text.secondary">
          Select a rack to view details
        </Typography>
      </Box>
    );
  }

  const {
    name,
    hub,
    row,
    col,
    tempV,
    humiV,
    tempA,
    humiA,
    sensors = [],
    sensorValues = [],
  } = rack;

  const selectedSensorValue = sensorValues.find(
    (sv) => sv.sensorId === sensorId
  );

  return (
    <Box
      p={2.5}
      sx={{
        borderRadius: 2,
        // border: "1px solid",
        borderColor: "divider",
        backgroundColor: " #ffffffc5",

        // #078d860c
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-start">
      <img src="/Server.svg" className="w-auto h-[5rem]" alt="" />
      <Stack>
        <Typography fontWeight={400}>{name?.charAt(0).toUpperCase() + name.slice(1)}</Typography>
        <Typography variant="caption" color="text.secondary">
          {hub?.name} • {row?.toUpperCase()} / {col?.toUpperCase()}
        </Typography>
      </Stack>
      </div>

      <Divider sx={{ my: 1.5 }} />

      {/* Rack Level Values */}
      <Stack direction="row" spacing={1}>
  
          <div className="w-full grid grid-cols-3 place-items-center  gap-3 md:gap-5 ">
        {/* <div> */}
        {/* </div> */}
        <div className="flex items-end justify-center">
          <img src="/yellow-alert.svg" className="w-auto h-[1.5rem]" alt="" />
          <span className=" font-bold text-xs text-black">Status</span>
        </div>
        <div className={`icon-number-align border border-1 rounded-sm p-1 w-full  ${tempA ? "border-yellow-600" : "border-gray-400"}`}>
          <img src="/card-humidity-icon.svg" alt="Alert" className="w-6 h-6  " />
          <span className="text-[#1E293B] res-text ">{tempA ? "Alert Detected" : "Not Detected"}</span>
        </div>
        <div className={`icon-number-align border border-1 rounded-sm p-1 w-full  ${humiA ? "border-red-500" : "border-gray-400"}`}>
          <img src="/temperature-icon.svg" alt="Alert" className="w-6 h-6  " />
          <span className="text-[#1E293B] res-text ">{humiA ? "Alert Detected" : "Not Detected"}</span>
        </div>
      </div>
      </Stack>

      <Divider sx={{ my: 1.5 }} />

      {/* Sensor Selector */}
      <Stack spacing={0.5}>
        <Typography variant="caption" color="text.secondary">
          Sensor
        </Typography>

        <Select
          size="small"
          value={sensorId}
          onChange={(e) => setSensorId(e.target.value)}
        >
          {sensors.map((s) => (
            <MenuItem key={s._id._id} value={s._id._id}>
              {s.name}
            </MenuItem>
          ))}
        </Select>
      </Stack>

      {/* Sensor Values */}
      {selectedSensorValue ? (
        <Stack direction="row" spacing={1} mt={1.5}>
          <Chip
            size="small"
            variant="outlined"
            label={`Temp: ${selectedSensorValue.temperature ?? "N/A"}°C`}
          />
          <Chip
            size="small"
            variant="outlined"
            label={`Humidity: ${selectedSensorValue.humidity ?? "N/A"}%`}
          />
        </Stack>
      ) : (
        <Typography variant="caption" color="text.secondary" mt={1}>
          sensor data is not available
        </Typography>
      )}
    </Box>
  );
}






