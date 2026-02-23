
// Add/replace inside src/pages/RackManagement/AddRack.jsx
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Autocomplete, TextField, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import InputField from "../../components/Inputs/InputField";
import { createRack, fetchRacksByDataCenterId } from "../../slices/rackSlice";
import { fetchHubsByDataCenter } from "../../slices/hubSlice";
import { useInstallation } from "../../contexts/InstallationContext";

// ... other imports / constants unchanged

const TOTAL = 25; // 25 rows and 25 cols

const AddRack = ({ disabled = false, onNext, onBack }) => {
  const dispatch = useDispatch();
  const { selectedDataCenter, selectedHub, setSelectedHub, selectedRack, setSelectedRack } = useInstallation();
  const { loading = {} } = useSelector((state) => state.rack || {});
  const { hubs = [] } = useSelector((state) => state.hub || {});

  // form state
  const [formData, setFormData] = useState({
    name: "",
    hubId: "",
    sensorIds: [],
    row: "",
    col: "",
    conditions: [
      { type: "temp", operator: ">", value: 0 },
      { type: "humidity", operator: ">", value: 0 },
    ],
  });

  // occupancy state: map rowNumber -> Set(columnNumbersBooked)
  const [occupancy, setOccupancy] = useState({});
  const [loadingOccupancy, setLoadingOccupancy] = useState(false);
  const [occupancyError, setOccupancyError] = useState(null);
  const [loadingFormSubmit, setLoadingFormSubmit] = useState(false);

  useEffect(() => {
    if (selectedDataCenter?._id) {
      // fetch hubs for UI
      dispatch(fetchHubsByDataCenter(selectedDataCenter._id));
      // fetch occupancy
      fetchOccupancy(selectedDataCenter._id);
    } else {
      setOccupancy({});
    }
  }, [selectedDataCenter, dispatch]);

  // fetch occupancy helper
  const fetchOccupancy = async (dataCenterId) => {
    if (!dataCenterId) return;
    setLoadingOccupancy(true);
    setOccupancyError(null);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_BACKEND_API || "http://localhost:5050"}/rack/row-col/${dataCenterId}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      const payload = await res.json();
      if (!res.ok) {
        throw new Error(payload.message || "Failed to fetch occupancy");
      }

      // payload.data is [{ row: 'r1', colsBooked: ['c1','c2', ...] }, ...]
      const map = {};
      (payload.data || []).forEach((r) => {
        const rowNum = parseInt(r.row.slice(1), 10); // 'r3' -> 3
        map[rowNum] = new Set((r.colsBooked || []).map((c) => parseInt(c.slice(1), 10)));
      });
      setOccupancy(map);
    } catch (err) {
      setOccupancyError(err.message || "Network error");
      setOccupancy({});
    } finally {
      setLoadingOccupancy(false);
    }
  };

  // helpers to compute UI lists
  const allRows = Array.from({ length: TOTAL }, (_, i) => i + 1);
  const allCols = Array.from({ length: TOTAL }, (_, i) => i + 1);

  const isRowFull = (rowNum) => {
    const set = occupancy[rowNum];
    return set && set.size >= TOTAL;
  };

  const getFreeColsForRow = (rowNum) => {
    const booked = occupancy[rowNum] || new Set();
    return allCols.filter((c) => !booked.has(c));
  };

  // form helpers
  const onchange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const onHubChange = (_, value) => {
    setFormData((p) => ({ ...p, hubId: value?._id || "", sensorIds: [] }));
    if (value) setSelectedHub(value);
  };

  // main submit (with pre-create occupancy re-check)
  const handleSaveAndNext = async () => {
    // CASE: existing rack selected (and form empty) → next
    const hasFormValue = Boolean(
      (formData.name || "").trim() ||
        formData.hubId ||
        formData.row ||
        formData.col ||
        (formData.sensorIds && formData.sensorIds.length > 0)
    );

    const formValid =
      (formData.name || "").trim() &&
      formData.hubId &&
      formData.row &&
      formData.col &&
      formData.sensorIds &&
      formData.sensorIds.length > 0;

    const canProceed = Boolean(selectedRack || formValid);

    if (!hasFormValue && selectedRack) {
      onNext?.();
      return;
    }

    if (hasFormValue) {
      if (!formValid) {
        return Swal.fire({
          icon: "warning",
          title: "Missing fields",
          text: "Please fill required fields: name, hub, row, column and at least one sensor.",
        });
      }

      if (!selectedDataCenter?._id) {
        return Swal.fire({
          icon: "warning",
          title: "Missing Data Center",
          text: "Please select a Data Center before creating a Rack.",
        });
      }

      setLoadingFormSubmit(true);

      try {
        // Re-check occupancy right before creating to avoid race
        await fetchOccupancy(selectedDataCenter._id); // refresh occupancy state

        const chosenRow = Number(formData.row); // numeric
        const chosenCol = Number(formData.col);
        const bookedSet = occupancy[chosenRow] || new Set();
        if (bookedSet.has(chosenCol)) {
          // column already taken — refresh and inform user
          Swal.fire({
            icon: "error",
            title: "Slot taken",
            text: `Row ${chosenRow} Column ${chosenCol} was just taken. Please choose another free slot.`,
          });
          // re-fetch to show updated UI
          await fetchOccupancy(selectedDataCenter._id);
          return;
        }

        // payload conversion to rN / cN happens server-side on your current code,
        // but to be explicit we send numbers and convert here:
        const payload = {
          dataCenterId: selectedDataCenter._id,
          ...formData,
          row: `r${formData.row}`,
          col: `c${formData.col}`,
        };

        const createdRack = await dispatch(createRack(payload)).unwrap();

        // set selected rack and proceed
        setSelectedRack(createdRack);

        Swal.fire({
          icon: "success",
          title: "Rack created",
          text: `Rack "${createdRack.name}" added successfully.`,
          timer: 1200,
          showConfirmButton: false,
        });

        dispatch(fetchRacksByDataCenterId(selectedDataCenter._id));
        onNext?.();
        return;
      } catch (err) {
        // creation failed — show server message
        Swal.fire({
          icon: "error",
          title: "Create failed",
          text: err || "Unable to create Rack.",
        });
        return; // do NOT proceed
      } finally {
        setLoadingFormSubmit(false);
      }
    }

    // fallback
    Swal.fire({
      icon: "warning",
      title: "Missing data",
      text: "Please select a rack from the list or enter the rack details.",
    });
  };

  // JSX: replace previous numeric InputFields for row/col with selects
  return (
    <div className="h-full p-5 AddingPage rounded-xl lg:rounded-l-none lg:rounded-r-xl shadow-sm w-full flex flex-col justify-between bg-[#EEF3F9] border border-[#E5E7EB]">
      <div className="flex-1 flex flex-col justify-center">
        <h2 className="data-center-add-title font-semibold mb-1 text-center">Add Rack</h2>

        <p className="data-center-add-subtitle text-gray-500 mb-6 text-center">
          {selectedDataCenter ? `Adding Rack to "${selectedDataCenter.name}"` : "Select a Data Center to add a Rack"}
        </p>

        <div className="data-center-add-form space-y-4 max-w-sm mx-auto w-full">
          <InputField
            id="name"
            name="name"
            label="Rack Name"
            type="text"
            value={formData.name}
            onchange={onchange}
            placeholder="Enter rack name"
            disabled={!selectedDataCenter}
          />

          {/* Hub Autocomplete */}
          <div>
            <Autocomplete
              options={hubs}
              getOptionLabel={(option) => option.name || ""}
              value={hubs.find((h) => h._id === formData.hubId) || null}
              onChange={onHubChange}
              disabled={!selectedDataCenter}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Search Hub"
                  size="small"
                  sx={{ backgroundColor: "white", borderRadius: "8px", "& .MuiOutlinedInput-root": { backgroundColor: "white" } }}
                />
              )}
            />
          </div>

          {/* Sensors Autocomplete */}
          {formData.hubId && selectedHub?.sensors && (
            <div>
              <Autocomplete
                multiple
                options={selectedHub.sensors}
                getOptionLabel={(option) => option.sensorName || ""}
                value={selectedHub.sensors.filter((s) => formData.sensorIds.includes(s._id))}
                onChange={(_, values) =>
                  setFormData((p) => ({
                    ...p,
                    sensorIds: values.map((v) => v._id),
                  }))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Search Sensors"
                    size="small"
                    sx={{ backgroundColor: "white", borderRadius: "8px", "& .MuiOutlinedInput-root": { backgroundColor: "white" } }}
                  />
                )}
              />
            </div>
          )}

          {/* Row Select */}
          <div>
            <FormControl size="small" fullWidth sx={{ backgroundColor: "white", borderRadius: "8px" }}>
              <InputLabel id="row-label">Row</InputLabel>
              <Select
                labelId="row-label"
                label="Row"
                name="row"
                value={formData.row || ""}
                onChange={(e) => setFormData((p) => ({ ...p, row: e.target.value }))}
                disabled={!formData.hubId || !selectedDataCenter}
                sx={{ backgroundColor: "white" }}
              >
              {loadingOccupancy && <MenuItem value="">Loading...</MenuItem>}
              {/* {!loadingOccupancy &&
                allRows.map((r) => (
                  <MenuItem key={r} value={r} disabled={isRowFull(r)}>
                    Row {r} {isRowFull(r) ? "— full" : ""}
                  </MenuItem>
                ))} */}

                {!loadingOccupancy &&
                [...allRows]
                  .sort((a, b) => {
                    const aFull = isRowFull(a);
                    const bFull = isRowFull(b);
                    return aFull === bFull ? a - b : aFull ? 1 : -1;
                  })
                  .map((r) => (
                    <MenuItem key={r} value={r} disabled={isRowFull(r)}>
                      Row {r} {isRowFull(r) ? "— full" : ""}
                    </MenuItem>
              ))}

            </Select>
          </FormControl>
        </div>

        {/* Column Select */}
        <div>
          <FormControl size="small" fullWidth sx={{ backgroundColor: "white", borderRadius: "8px" }}>
            <InputLabel id="col-label">Column</InputLabel>
            <Select
              labelId="col-label"
              label="Column"
              name="col"
              value={formData.col || ""}
              onChange={(e) => setFormData((p) => ({ ...p, col: e.target.value }))}
              disabled={!formData.row || !formData.hubId || !selectedDataCenter}
              sx={{ backgroundColor: "white" }}
            >
              {!formData.row && <MenuItem value="">Select Row first</MenuItem>}
              {formData.row && loadingOccupancy && <MenuItem value="">Loading...</MenuItem>}
              {/* {formData.row &&
                !loadingOccupancy &&
                getFreeColsForRow(Number(formData.row)).map((c) => (
                  <MenuItem key={c} value={c}>
                    Column {c}
                  </MenuItem>
                ))} */}

                {formData.row &&
  !loadingOccupancy &&
  (() => {
    const rowNum = Number(formData.row);
    const booked = occupancy[rowNum] || new Set();

    return [...allCols]
      .sort((a, b) => {
        const aBooked = booked.has(a);
        const bBooked = booked.has(b);
        return aBooked === bBooked ? a - b : aBooked ? 1 : -1;
      })
      .map((c) => (
        <MenuItem key={c} value={c} disabled={booked.has(c)}>
          Column {c} {booked.has(c) ? "— occupied" : ""}
        </MenuItem>
      ));
  })()}



              {formData.row && !loadingOccupancy && getFreeColsForRow(Number(formData.row)).length === 0 && (
                <MenuItem value="" disabled>
                  No free columns in this row
                </MenuItem>
              )}
            </Select>
          </FormControl>
        </div>
  

          {/* Conditions unchanged... */}
        </div>
      </div>

      {/* Footer: Back / Save & Next */}
      <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between items-center">
        <button
          type="button"
          onClick={() => onBack?.()}
          className="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
        >
          ← Back
        </button>

        <button
          type="button"
          onClick={handleSaveAndNext}
          disabled={
            (!selectedRack && !(formData.name && formData.hubId && formData.row && formData.col && formData.sensorIds.length > 0)) ||
            loadingFormSubmit ||
            loading?.submit ||
            disabled
          }
          className={`px-6 py-2 rounded-md text-white font-semibold ${
            !loadingFormSubmit && !disabled ? "bg-[#1E64D9] hover:bg-[#1557C7]" : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {loadingFormSubmit ? "Saving..." : (formData.name || formData.row || formData.col) ? "Save & Next → AC Kits" : "Next → AC Kits"}
        </button>
      </div>
    </div>
  );
};

export default AddRack;
