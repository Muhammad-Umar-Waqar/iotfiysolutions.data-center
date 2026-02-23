
import * as React from "react";
import {
  Box,
  Typography,
  Chip,
  Stack,
  Select,
  MenuItem,
  Divider,
  Skeleton,
} from "@mui/material";

export default function RackDetailsPanel({ rack }) {
  const [sensorId, setSensorId] = React.useState("");

  React.useEffect(() => {
    // Reset sensorId when rack changes
    setSensorId("");
    
    // Set first sensor as default when rack has sensors
    if (rack?.sensors?.length > 0) {
      // Handle both nested (_id._id) and flat (_id) sensor structures
      const firstSensor = rack.sensors[0];
      const sensorIdValue = firstSensor._id?._id || firstSensor._id || null;
      
      if (sensorIdValue) {
        setSensorId(String(sensorIdValue));
      }
    }
  }, [rack]);

  if (!rack) {
    return (
      <Box
        p={2.5}
        sx={{
          borderRadius: 2,
          borderColor: "divider",
          backgroundColor: " #ffffffc5",
        }}
      >
        {/* Header Skeleton */}
        <div className="flex items-center justify-start">
          <Skeleton variant="rectangular" width={80} height={80} sx={{ borderRadius: 1 }} />
          <Stack spacing={0.5} sx={{ ml: 2, flex: 1 }}>
            <Skeleton variant="text" width={120} height={24} />
            <Skeleton variant="text" width={150} height={20} />
          </Stack>
        </div>

        <Divider sx={{ my: 1.5 }} />

        {/* Status Section Skeleton */}
        <Stack direction="row" spacing={1}>
          <div className="w-full grid grid-cols-3 place-items-center gap-3 md:gap-5">
            <div className="flex items-end justify-center">
              <Skeleton variant="rectangular" width={24} height={24} sx={{ borderRadius: 0.5 }} />
              <Skeleton variant="text" width={50} height={16} sx={{ ml: 0.5 }} />
            </div>
            <div className="border border-gray-300 rounded-sm p-1 w-full">
              <Skeleton variant="rectangular" width="100%" height={40} sx={{ borderRadius: 0.5 }} />
            </div>
            <div className="border border-gray-300 rounded-sm p-1 w-full">
              <Skeleton variant="rectangular" width="100%" height={40} sx={{ borderRadius: 0.5 }} />
            </div>
          </div>
        </Stack>

        <Divider sx={{ my: 1.5 }} />

        {/* Sensor Selector Skeleton */}
        <Stack spacing={0.5}>
          <Skeleton variant="text" width={60} height={16} />
          <Skeleton variant="rectangular" width="100%" height={40} sx={{ borderRadius: 1 }} />
        </Stack>

        {/* Sensor Values Skeleton */}
        <Stack direction="row" spacing={1} mt={1.5}>
          <Skeleton variant="rounded" width={120} height={32} />
          <Skeleton variant="rounded" width={120} height={32} />
        </Stack>
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

  // Find selected sensor value - handle both string and ObjectId comparisons
  const selectedSensorValue = sensorValues.find((sv) => {
    if (!sv.sensorId || !sensorId) return false;
    // Compare as strings to handle ObjectId vs string mismatches
    return String(sv.sensorId) === String(sensorId);
  });

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
          {sensors.map((s) => {
            // Handle both nested (_id._id) and flat (_id) sensor structures
            const sensorIdValue = s._id?._id || s._id;
            const sensorName = s.name || s.sensorName || "Unknown Sensor";
            
            return (
              <MenuItem key={sensorIdValue} value={String(sensorIdValue)}>
                {sensorName}
              </MenuItem>
            );
          })}
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






