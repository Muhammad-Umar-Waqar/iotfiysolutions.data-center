// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// const BASE = import.meta.env.VITE_BACKEND_API || "http://localhost:5050";

// const normalizeVenue = (v = {}) => {
//   const venueId = String(v.venueId ?? v._id ?? (v.venue?._id) ?? "");
//   const venueName = v.venueName ?? v.name ?? (v.venue?.name) ?? "Unknown Venue";

//   const fridgeArr = Array.isArray(v.refrigeratorAlertDevices) ? v.refrigeratorAlertDevices : [];
//   const batteryArr = Array.isArray(v.batteryAlertDevices) ? v.batteryAlertDevices : [];

//   const makeDevice = (d) => ({
//     id: d.deviceId ?? d.id ?? d._id ?? d.name ?? "unknown-id",
//     name: d.name ?? d.deviceId ?? d.id ?? d._id ?? "Unknown Device",
//     date: d.date ?? d.timestamp ?? null,
//     ambient: d.ambient ?? d.AmbientData?.temperature ?? null,
//     freezer: d.freezer ?? d.FreezerData?.temperature ?? null,
//   });
  

//   const refrigeratorAlertDevices = fridgeArr.map(makeDevice);
//   const batteryAlertDevices = batteryArr.map(makeDevice);

//   const refrigeratorAlertCount = Number(v.refrigeratorAlertCount ?? refrigeratorAlertDevices.length ?? 0) || 0;
//   const batteryAlertCount = Number(v.batteryAlertCount ?? batteryAlertDevices.length ?? 0) || 0;
//   const totalAlerts = Number(v.totalAlerts ?? (refrigeratorAlertCount + batteryAlertCount)) || 0;

//   return {
//     venueId,
//     venueName,
//     totalDevices: Number(v.totalDevices ?? 0) || 0,
//     totalAlerts,
//     refrigeratorAlertCount,
//     refrigeratorAlertDevices,
//     batteryAlertCount,
//     batteryAlertDevices,
//   };
// };

// /**
//  * Thunk: fetch alerts for an organization
//  */
// export const fetchAlertsByOrg = createAsyncThunk(
//   "alerts/fetchByOrg",
//   async (organizationId, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await fetch(`${BASE}/alert/${organizationId}`, {
//         method: "GET",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//           ...(token ? { Authorization: `Bearer ${token}` } : {}),
//         },
//       });

//       const data = await res.json();
//       if (!res.ok) return rejectWithValue(data.message || "Failed to fetch alerts");

//       const rawVenues = Array.isArray(data) ? data : data.venues ?? data.payload ?? [];
//       console.log("rawVenes>", rawVenues);
//       return { organizationId, venues: rawVenues };
//     } catch (err) {
//       return rejectWithValue(err.message || "Network error");
//     }
//   }
// );

// const initialState = {
//   byOrg: {},
// };

// const alertsSlice = createSlice({
//   name: "alerts",
//   initialState,
//   reducers: {
//     /**
//      * deviceDataReceived
//      * payload: { organizationId, device }
//      */
//     deviceDataReceived(state, action) {
//       const { organizationId, device } = action.payload || {};
//       if (!organizationId || !device) return;

//       if (!state.byOrg[organizationId]) {
//         state.byOrg[organizationId] = { venues: [], loading: false, error: null, unassigned: [] };
//       }

//       const org = state.byOrg[organizationId];
//       const deviceId = device.deviceId ?? device.id ?? device._id ?? null;
//       if (!deviceId) return;

//       // find venue by venueId or existing device membership
//       let targetIndex = -1;
//       if (device.venueId) {
//         targetIndex = org.venues.findIndex((vv) => String(vv.venueId) === String(device.venueId));
//       }
//       if (targetIndex === -1) {
//         targetIndex = org.venues.findIndex((vv) =>
//           (vv.refrigeratorAlertDevices || []).some((d) => String(d.id) === String(deviceId)) ||
//           (vv.batteryAlertDevices || []).some((d) => String(d.id) === String(deviceId)) 
//         );
//       }

//       const makeDeviceEntry = () => ({
//         id: deviceId,
//         name: device.name ?? deviceId,
//         date: device.timestamp ?? device.date ?? null,
//         ambient: device.ambient ?? device.AmbientData?.temperature ?? null,
//         freezer: device.freezer ?? device.FreezerData?.temperature ?? null,
//       });

//       const updateVenueAlerts = (vv) => {
//        const fridgeDevices = Array.isArray(vv.refrigeratorAlertDevices) ? vv.refrigeratorAlertDevices.slice() : [];
//         const batteryDevices = Array.isArray(vv.batteryAlertDevices) ? vv.batteryAlertDevices.slice() : [];

//         const fridgeIdx = fridgeDevices.findIndex((d) => String(d.id) === String(deviceId));
//         const batteryIdx = batteryDevices.findIndex((d) => String(d.id) === String(deviceId));

//         // refrigerator alert handling
//         const fridgeIsAlert = device.refrigeratorAlert === "ALERT" || device.refrigeratorAlert === true;
//         if (fridgeIsAlert) {
//           const entry = makeDeviceEntry();
//           if (fridgeIdx === -1) fridgeDevices.unshift(entry);
//           else fridgeDevices[fridgeIdx] = { ...fridgeDevices[fridgeIdx], ...entry };
//         } else {
//           // if server cleared, remove
//           if (fridgeIdx !== -1 && device.refrigeratorAlert === false) {
//             fridgeDevices.splice(fridgeIdx, 1);
//           } else if (fridgeIdx !== -1) {
//             // update timestamps/temps even if not changing alert flag
//             fridgeDevices[fridgeIdx] = { ...fridgeDevices[fridgeIdx], ...makeDeviceEntry() };
//           }
//         }

//         // battery alert handling
//         const batteryIsAlert = device.batteryAlert === "LOW" || device.batteryAlert === true;
//         if (batteryIsAlert) {
//           const entry = makeDeviceEntry();
//           if (batteryIdx === -1) batteryDevices.unshift(entry);
//           else batteryDevices[batteryIdx] = { ...batteryDevices[batteryIdx], ...entry };
//         } else {
//           if (batteryIdx !== -1 && device.batteryAlert === false) {
//             batteryDevices.splice(batteryIdx, 1);
//           } else if (batteryIdx !== -1) {
//             batteryDevices[batteryIdx] = { ...batteryDevices[batteryIdx], ...makeDeviceEntry() };
//           }
//         }

//         return {
//           ...vv,
//           refrigeratorAlertDevices: fridgeDevices,
//           refrigeratorAlertCount: fridgeDevices.length,
//           batteryAlertDevices: batteryDevices,
//           batteryAlertCount: batteryDevices.length,
//           totalAlerts: fridgeDevices.length + batteryDevices.length,
//         };
      
//       };

//       if (targetIndex !== -1) {
//         org.venues[targetIndex] = updateVenueAlerts(org.venues[targetIndex]);
//       } else {
//         const entry = makeDeviceEntry();
//         const unassigned = org.unassigned || [];
//         const existingIdx = unassigned.findIndex((u) => u.id === deviceId);
//         if (existingIdx !== -1) {
//           unassigned[existingIdx] = { ...unassigned[existingIdx], ...entry };
//         } else {
//           unassigned.unshift({ id: deviceId, ...entry,  batteryAlert: device.batteryAlert, refrigeratorAlert: device.refrigeratorAlert  });
//         }
//         org.unassigned = unassigned;
//       }
//     },

//     clearOrgAlerts(state, action) {
//       const orgId = action.payload;
//       if (orgId && state.byOrg[orgId]) {
//         delete state.byOrg[orgId];
//       }
//     },

//     upsertVenue(state, action) {
//       const { organizationId, rawVenue } = action.payload || {};
//       if (!organizationId || !rawVenue) return;
//       if (!state.byOrg[organizationId]) state.byOrg[organizationId] = { venues: [], loading: false, error: null, unassigned: [] };
//       const norm = normalizeVenue(rawVenue);
//       const idx = state.byOrg[organizationId].venues.findIndex((v) => v.venueId === norm.venueId);
//       if (idx === -1) state.byOrg[organizationId].venues.unshift(norm);
//       else state.byOrg[organizationId].venues[idx] = norm;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchAlertsByOrg.pending, (state, action) => {
//         const orgId = action.meta.arg;
//         if (!state.byOrg[orgId]) state.byOrg[orgId] = { venues: [], loading: true, error: null, unassigned: [] };
//         else {
//           state.byOrg[orgId].loading = true;
//           state.byOrg[orgId].error = null;
//         }
//       })
//       .addCase(fetchAlertsByOrg.fulfilled, (state, action) => {
//         const { organizationId, venues } = action.payload || {};
//         if (!organizationId) return;
//         const normalized = Array.isArray(venues) ? venues.map(normalizeVenue) : [];
//         state.byOrg[organizationId] = { venues: normalized, loading: false, error: null, unassigned: [] };
//       })
//       .addCase(fetchAlertsByOrg.rejected, (state, action) => {
//         const orgId = action.meta.arg;
//         if (!state.byOrg[orgId]) state.byOrg[orgId] = { venues: [], loading: false, error: action.payload || action.error?.message || "Failed to fetch alerts", unassigned: [] };
//         else {
//           state.byOrg[orgId].loading = false;
//           state.byOrg[orgId].error = action.payload || action.error?.message || "Failed to fetch alerts";
//         }
//       });
//   },
// });

// export const { deviceDataReceived, clearOrgAlerts, upsertVenue } = alertsSlice.actions;
// export default alertsSlice.reducer;


















// New Alert 

// src/slices/alertSlice.js
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// const BASE = import.meta.env.VITE_BACKEND_API || "http://localhost:5050";

// /*
//   Thunks
//   - NOTE: endpoints assumed:
//     GET /alert/datacenter/:dataCenterId
//     GET /alert/rack-cluster/:rackClusterId
// */

// export const fetchAlertsByDataCenter = createAsyncThunk(
//   "alerts/fetchByDataCenter",
//   async (dataCenterId, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return rejectWithValue("No authentication token found");

//       const res = await fetch(`${BASE}/alert/datacenter/${dataCenterId}`, {
//         method: "GET",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await res.json();
//       if (!res.ok) return rejectWithValue(data.message || "Failed to fetch alerts");

//       // backend returns: { dataCenterId, totalRacks, racks: [...] }
//       return {
//         dataCenterId: data.dataCenterId ?? dataCenterId,
//         totalRacks: data.totalRacks ?? (Array.isArray(data.racks) ? data.racks.length : 0),
//         racks: Array.isArray(data.racks) ? data.racks : [],
//       };
//     } catch (err) {
//       return rejectWithValue(err.message || "Network error");
//     }
//   }
// );

// export const fetchAlertsByRackCluster = createAsyncThunk(
//   "alerts/fetchByRackCluster",
//   async (rackClusterId, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return rejectWithValue("No authentication token found");

//       const res = await fetch(`${BASE}/alert/rack-cluster/${rackClusterId}`, {
//         method: "GET",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await res.json();
//       if (!res.ok) return rejectWithValue(data.message || "Failed to fetch cluster alerts");

//       // backend returns: { rackClusterId, rackClusterName, ackitName, dataCenterId, totalRacks, racks }
//       return {
//         rackClusterId: data.rackClusterId ?? rackClusterId,
//         clusterName: data.rackClusterName ?? null,
//         ackitName: data.ackitName ?? null,
//         dataCenterId: data.dataCenterId ?? null,
//         totalRacks: data.totalRacks ?? (Array.isArray(data.racks) ? data.racks.length : 0),
//         racks: Array.isArray(data.racks) ? data.racks : [],
//       };
//     } catch (err) {
//       return rejectWithValue(err.message || "Network error");
//     }
//   }
// );

// /* Slice */
// const initialState = {
//   byDataCenter: {
//     // [dataCenterId]: { loading, error, totalRacks, racks: [...] }
//   },
//   byRackCluster: {
//     // [clusterId]: { loading, error, totalRacks, racks: [...], clusterName, ackitName, dataCenterId }
//   },
// };

// const alertsSlice = createSlice({
//   name: "alerts",
//   initialState,
//   reducers: {
//     // clear cached alerts for a data center
//     clearDataCenterAlerts(state, action) {
//       const dc = action.payload;
//       if (dc && state.byDataCenter[dc]) delete state.byDataCenter[dc];
//     },
//     // clear cached alerts for a cluster
//     clearRackClusterAlerts(state, action) {
//       const id = action.payload;
//       if (id && state.byRackCluster[id]) delete state.byRackCluster[id];
//     },
//     /**
//      * applySensorUpdate:
//      * payload = { target: 'dataCenter'|'cluster', id: <id>, rackId, sensorUpdate: { sensorName, temperature, humidity, updatedAt } }
//      *
//      * This updates the matching sensor entry inside stored racks if present.
//      */
//     applySensorUpdate(state, action) {
//       try {
//         const { target, id, rackId, sensorUpdate } = action.payload || {};
//         if (!target || !id || !rackId || !sensorUpdate) return;

//         const container = target === "cluster" ? state.byRackCluster[id] : state.byDataCenter[id];
//         if (!container || !Array.isArray(container.racks)) return;

//         const rackIndex = container.racks.findIndex((r) => String(r.rackId ?? r._id) === String(rackId));
//         if (rackIndex === -1) return;

//         const rack = container.racks[rackIndex];
//         // Ensure sensors array exists
//         rack.sensors = Array.isArray(rack.sensors) ? rack.sensors : [];

//         // try to find sensor by name
//         const si = rack.sensors.findIndex(s => s.sensorName === sensorUpdate.sensorName);
//         if (si === -1) {
//           // insert new sensor reading at top
//           rack.sensors.unshift(sensorUpdate);
//         } else {
//           // merge
//           rack.sensors[si] = { ...rack.sensors[si], ...sensorUpdate };
//         }

//         // update totals and dominant temp/humi if needed
//         rack.totalSensors = rack.sensors.length;
//         // recalc dominant sensor temp/humi
//         let dominant = null;
//         rack.sensors.forEach(s => {
//           if (!dominant || (s.temperature ?? -Infinity) > (dominant.temperature ?? -Infinity)) dominant = s;
//         });
//         rack.tempV = dominant?.temperature ?? null;
//         rack.humiV = dominant?.humidity ?? null;

//         container.racks[rackIndex] = rack;
//       } catch (e) {
//         // safety: don't throw
//         // console.error("applySensorUpdate error", e);
//       }
//     },
//   },
//   extraReducers: (builder) => {
//     // fetch by datacenter
//     builder
//       .addCase(fetchAlertsByDataCenter.pending, (s, a) => {
//         const dc = a.meta.arg;
//         if (!s.byDataCenter[dc]) s.byDataCenter[dc] = { loading: true, error: null, totalRacks: 0, racks: [] };
//         else {
//           s.byDataCenter[dc].loading = true;
//           s.byDataCenter[dc].error = null;
//         }
//       })
//       .addCase(fetchAlertsByDataCenter.fulfilled, (s, a) => {
//         const payload = a.payload || {};
//         const dc = payload.dataCenterId;
//         s.byDataCenter[dc] = {
//           loading: false,
//           error: null,
//           totalRacks: payload.totalRacks ?? 0,
//           racks: payload.racks ?? [],
//         };
//       })
//       .addCase(fetchAlertsByDataCenter.rejected, (s, a) => {
//         const dc = a.meta.arg;
//         if (!s.byDataCenter[dc]) s.byDataCenter[dc] = { loading: false, error: a.payload || a.error?.message || "Failed to fetch alerts", totalRacks: 0, racks: [] };
//         else {
//           s.byDataCenter[dc].loading = false;
//           s.byDataCenter[dc].error = a.payload || a.error?.message || "Failed to fetch alerts";
//         }
//       });

//     // fetch by rack cluster
//     builder
//       .addCase(fetchAlertsByRackCluster.pending, (s, a) => {
//         const id = a.meta.arg;
//         if (!s.byRackCluster[id]) s.byRackCluster[id] = { loading: true, error: null, totalRacks: 0, racks: [], clusterName: null, ackitName: null, dataCenterId: null };
//         else {
//           s.byRackCluster[id].loading = true;
//           s.byRackCluster[id].error = null;
//         }
//       })
//       .addCase(fetchAlertsByRackCluster.fulfilled, (s, a) => {
//         const payload = a.payload || {};
//         const id = payload.rackClusterId;
//         s.byRackCluster[id] = {
//           loading: false,
//           error: null,
//           totalRacks: payload.totalRacks ?? 0,
//           racks: payload.racks ?? [],
//           clusterName: payload.clusterName ?? null,
//           ackitName: payload.ackitName ?? null,
//           dataCenterId: payload.dataCenterId ?? null,
//         };
//       })
//       .addCase(fetchAlertsByRackCluster.rejected, (s, a) => {
//         const id = a.meta.arg;
//         if (!s.byRackCluster[id]) s.byRackCluster[id] = { loading: false, error: a.payload || a.error?.message || "Failed to fetch cluster alerts", totalRacks: 0, racks: [], clusterName: null, ackitName: null, dataCenterId: null };
//         else {
//           s.byRackCluster[id].loading = false;
//           s.byRackCluster[id].error = a.payload || a.error?.message || "Failed to fetch cluster alerts";
//         }
//       });
//   },
// });

// export const { clearDataCenterAlerts, clearRackClusterAlerts, applySensorUpdate } = alertsSlice.actions;
// export default alertsSlice.reducer;











// // src/slices/alertsSlice.js
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// const BASE = import.meta.env.VITE_BACKEND_API || "http://localhost:5050";

// /*
//   Thunks - NOTE: backend routes are:
//     GET /alert/by-data-center/:dataCenterId
//     GET /alert/by-rack-cluster/:rackClusterId
// */

// export const fetchAlertsByDataCenter = createAsyncThunk(
//   "alerts/fetchByDataCenter",
//   async (dataCenterId, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return rejectWithValue("No authentication token found");

//       const res = await fetch(`${BASE}/alert/by-data-center/${dataCenterId}`, {
//         method: "GET",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await res.json();
//       if (!res.ok) return rejectWithValue(data.message || "Failed to fetch alerts");

//       return {
//         dataCenterId: data.dataCenterId ?? dataCenterId,
//         totalRacks: data.totalRacks ?? (Array.isArray(data.racks) ? data.racks.length : 0),
//         racks: Array.isArray(data.racks) ? data.racks : [],
//       };
//     } catch (err) {
//       return rejectWithValue(err.message || "Network error");
//     }
//   }
// );

// export const fetchAlertsByRackCluster = createAsyncThunk(
//   "alerts/fetchByRackCluster",
//   async (rackClusterId, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return rejectWithValue("No authentication token found");

//       const res = await fetch(`${BASE}/alert/by-rack-cluster/${rackClusterId}`, {
//         method: "GET",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await res.json();
//       if (!res.ok) return rejectWithValue(data.message || "Failed to fetch cluster alerts");

//       return {
//         rackClusterId: data.rackClusterId ?? rackClusterId,
//         clusterName: data.rackClusterName ?? null,
//         ackitName: data.ackitName ?? null,
//         dataCenterId: data.dataCenterId ?? null,
//         totalRacks: data.totalRacks ?? (Array.isArray(data.racks) ? data.racks.length : 0),
//         racks: Array.isArray(data.racks) ? data.racks : [],
//       };
//     } catch (err) {
//       return rejectWithValue(err.message || "Network error");
//     }
//   }
// );

// /* Slice (unchanged behavior, using byDataCenter and byRackCluster caches) */
// const initialState = {
//   byDataCenter: {},
//   byRackCluster: {},
// };

// const alertsSlice = createSlice({
//   name: "alerts",
//   initialState,
//   reducers: {
//     clearDataCenterAlerts(state, action) {
//       const dc = action.payload;
//       if (dc && state.byDataCenter[dc]) delete state.byDataCenter[dc];
//     },
//     clearRackClusterAlerts(state, action) {
//       const id = action.payload;
//       if (id && state.byRackCluster[id]) delete state.byRackCluster[id];
//     },
//     applySensorUpdate(state, action) {
//       try {
//         const { target, id, rackId, sensorUpdate } = action.payload || {};
//         if (!target || !id || !rackId || !sensorUpdate) return;

//         const container = target === "cluster" ? state.byRackCluster[id] : state.byDataCenter[id];
//         if (!container || !Array.isArray(container.racks)) return;

//         const rackIndex = container.racks.findIndex((r) => String(r.rackId ?? r._id) === String(rackId));
//         if (rackIndex === -1) return;

//         const rack = container.racks[rackIndex];
//         rack.sensors = Array.isArray(rack.sensors) ? rack.sensors : [];

//         const si = rack.sensors.findIndex(s => s.sensorName === sensorUpdate.sensorName);
//         if (si === -1) {
//           rack.sensors.unshift(sensorUpdate);
//         } else {
//           rack.sensors[si] = { ...rack.sensors[si], ...sensorUpdate };
//         }

//         rack.totalSensors = rack.sensors.length;

//         let dominant = null;
//         rack.sensors.forEach(s => {
//           if (!dominant || (s.temperature ?? -Infinity) > (dominant.temperature ?? -Infinity)) dominant = s;
//         });
//         rack.tempV = dominant?.temperature ?? null;
//         rack.humiV = dominant?.humidity ?? null;

//         container.racks[rackIndex] = rack;
//       } catch (e) {
//         // do nothing
//       }
//     },
//   },
//   extraReducers: (builder) => {
//     // datacenter
//     builder
//       .addCase(fetchAlertsByDataCenter.pending, (s, a) => {
//         const dc = a.meta.arg;
//         if (!s.byDataCenter[dc]) s.byDataCenter[dc] = { loading: true, error: null, totalRacks: 0, racks: [] };
//         else { s.byDataCenter[dc].loading = true; s.byDataCenter[dc].error = null; }
//       })
//       .addCase(fetchAlertsByDataCenter.fulfilled, (s, a) => {
//         const payload = a.payload || {};
//         const dc = payload.dataCenterId;
//         s.byDataCenter[dc] = {
//           loading: false,
//           error: null,
//           totalRacks: payload.totalRacks ?? 0,
//           racks: payload.racks ?? [],
//         };
//       })
//       .addCase(fetchAlertsByDataCenter.rejected, (s, a) => {
//         const dc = a.meta.arg;
//         if (!s.byDataCenter[dc]) s.byDataCenter[dc] = { loading: false, error: a.payload || a.error?.message || "Failed to fetch alerts", totalRacks: 0, racks: [] };
//         else { s.byDataCenter[dc].loading = false; s.byDataCenter[dc].error = a.payload || a.error?.message || "Failed to fetch alerts"; }
//       });

//     // cluster
//     builder
    
//       .addCase(fetchAlertsByRackCluster.pending, (s, a) => {
//       //   const id = a.meta.arg;
//       //   if (!s.byRackCluster[id]) s.byRackCluster[id] = { loading: true, error: null, totalRacks: 0, racks: [], clusterName: null, ackitName: null, dataCenterId: null };
//       //   else { s.byRackCluster[id].loading = true; s.byRackCluster[id].error = null; }
//       // }

//        const id = action.meta.arg;

//   if (!state.byRackCluster) state.byRackCluster = {};
//   if (!state.byRackCluster[id]) {
//     state.byRackCluster[id] = {
//       loading: true,
//       error: null,
//       racks: [],
//       totalRacks: 0,
//       clusterName: null,
//       ackitName: null,
//       dataCenterId: null,
//     };
//   } else {
//     state.byRackCluster[id].loading = true;
//     state.byRackCluster[id].error = null;
//   }
// }


//     )
//       // .addCase(fetchAlertsByRackCluster.fulfilled, (s, a) => {
//       //   const payload = a.payload || {};
//       //   const id = payload.rackClusterId;
//       //   s.byRackCluster[id] = {
//       //     loading: false,
//       //     error: null,
//       //     totalRacks: payload.totalRacks ?? 0,
//       //     racks: payload.racks ?? [],
//       //     clusterName: payload.clusterName ?? null,
//       //     ackitName: payload.ackitName ?? null,
//       //     dataCenterId: payload.dataCenterId ?? null,
//       //   };
//       // })

//       .addCase(fetchAlertsByRackCluster.fulfilled, (state, action) => {
//   const payload = action.payload;
//   const id = payload.rackClusterId;

//   if (!state.byRackCluster) state.byRackCluster = {};

//   state.byRackCluster[id] = {
//     loading: false,
//     error: null,
//     racks: payload.racks || [],
//     totalRacks: payload.totalRacks || 0,
//     clusterName: payload.clusterName ?? null,
//     ackitName: payload.ackitName ?? null,
//     dataCenterId: payload.dataCenterId ?? null,
//   };
// })

//       // .addCase(fetchAlertsByRackCluster.rejected, (s, a) => {
//       //   const id = a.meta.arg;
//       //   if (!s.byRackCluster[id]) s.byRackCluster[id] = { loading: false, error: a.payload || a.error?.message || "Failed to fetch cluster alerts", totalRacks: 0, racks: [], clusterName: null, ackitName: null, dataCenterId: null };
//       //   else { s.byRackCluster[id].loading = false; s.byRackCluster[id].error = a.payload || a.error?.message || "Failed to fetch cluster alerts"; }
//       // });

//       .addCase(fetchAlertsByRackCluster.rejected, (state, action) => {
//   const id = action.meta.arg;

//   if (!state.byRackCluster) state.byRackCluster = {};

//   if (!state.byRackCluster[id]) {
//     state.byRackCluster[id] = {
//       loading: false,
//       error: action.payload || "Failed to fetch alerts",
//       racks: [],
//       totalRacks: 0,
//     };
//   } else {
//     state.byRackCluster[id].loading = false;
//     state.byRackCluster[id].error = action.payload || "Failed to fetch alerts";
//   }
// })

//   },
// });

// export const { clearDataCenterAlerts, clearRackClusterAlerts, applySensorUpdate } = alertsSlice.actions;
// export default alertsSlice.reducer;




























// src/slices/alertsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE = import.meta.env.VITE_BACKEND_API || "http://localhost:5050";

/*
  Thunks - NOTE: backend routes are:
    GET /alert/by-data-center/:dataCenterId
    GET /alert/by-rack-cluster/:rackClusterId
*/

export const fetchAlertsByDataCenter = createAsyncThunk(
  "alerts/fetchByDataCenter",
  async (dataCenterId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("No authentication token found");

      const res = await fetch(`${BASE}/alert/by-data-center/${dataCenterId}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to fetch alerts");

      return {
        dataCenterId: data.dataCenterId ?? dataCenterId,
        totalRacks: data.totalRacks ?? (Array.isArray(data.racks) ? data.racks.length : 0),
        racks: Array.isArray(data.racks) ? data.racks : [],
      };
    } catch (err) {
      return rejectWithValue(err.message || "Network error");
    }
  }
);

export const fetchAlertsByRackCluster = createAsyncThunk(
  "alerts/fetchByRackCluster",
  async (rackClusterId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("No authentication token found");

      const res = await fetch(`${BASE}/alert/by-rack-cluster/${rackClusterId}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to fetch cluster alerts");

      return {
        rackClusterId: data.rackClusterId ?? rackClusterId,
        clusterName: data.rackClusterName ?? null,
        ackitName: data.ackitName ?? null,
        dataCenterId: data.dataCenterId ?? null,
        totalRacks: data.totalRacks ?? (Array.isArray(data.racks) ? data.racks.length : 0),
        racks: Array.isArray(data.racks) ? data.racks : [],
      };
    } catch (err) {
      return rejectWithValue(err.message || "Network error");
    }
  }
);


/* Thunks omitted here (keep your existing createAsyncThunk definitions) */
/* fetchAlertsByDataCenter and fetchAlertsByRackCluster stay the same */

const initialState = {
  byDataCenter: {},
  byRackCluster: {},
};

const alertsSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {
    clearDataCenterAlerts(state, action) {
      const dc = action.payload;
      if (dc && state.byDataCenter[dc]) delete state.byDataCenter[dc];
    },
    clearRackClusterAlerts(state, action) {
      const id = action.payload;
      if (id && state.byRackCluster[id]) delete state.byRackCluster[id];
    },
    applySensorUpdate(state, action) {
      try {
        const { target, id, rackId, sensorUpdate } = action.payload || {};
        if (!target || !id || !rackId || !sensorUpdate) return;

        const container = target === "cluster" ? state.byRackCluster[id] : state.byDataCenter[id];
        if (!container || !Array.isArray(container.racks)) return;

        const rackIndex = container.racks.findIndex((r) => String(r.rackId ?? r._id) === String(rackId));
        if (rackIndex === -1) return;

        const rack = container.racks[rackIndex];
        rack.sensors = Array.isArray(rack.sensors) ? rack.sensors : [];

        const si = rack.sensors.findIndex(s => s.sensorName === sensorUpdate.sensorName);
        if (si === -1) {
          rack.sensors.unshift(sensorUpdate);
        } else {
          rack.sensors[si] = { ...rack.sensors[si], ...sensorUpdate };
        }

        rack.totalSensors = rack.sensors.length;

        let dominant = null;
        rack.sensors.forEach(s => {
          if (!dominant || (s.temperature ?? -Infinity) > (dominant.temperature ?? -Infinity)) dominant = s;
        });
        rack.tempV = dominant?.temperature ?? null;
        rack.humiV = dominant?.humidity ?? null;

        container.racks[rackIndex] = rack;
      } catch (e) {
        // do nothing
      }
    },
  },
  extraReducers: (builder) => {
    // --- DataCenter handlers (unchanged) ---
    builder
      .addCase(fetchAlertsByDataCenter.pending, (s, a) => {
        const dc = a.meta.arg;
        if (!s.byDataCenter[dc]) s.byDataCenter[dc] = { loading: true, error: null, totalRacks: 0, racks: [] };
        else { s.byDataCenter[dc].loading = true; s.byDataCenter[dc].error = null; }
      })
      .addCase(fetchAlertsByDataCenter.fulfilled, (s, a) => {
        const payload = a.payload || {};
        const dc = payload.dataCenterId;
        s.byDataCenter[dc] = {
          loading: false,
          error: null,
          totalRacks: payload.totalRacks ?? 0,
          racks: payload.racks ?? [],
        };
      })
      .addCase(fetchAlertsByDataCenter.rejected, (s, a) => {
        const dc = a.meta.arg;
        if (!s.byDataCenter[dc]) s.byDataCenter[dc] = { loading: false, error: a.payload || a.error?.message || "Failed to fetch alerts", totalRacks: 0, racks: [] };
        else { s.byDataCenter[dc].loading = false; s.byDataCenter[dc].error = a.payload || a.error?.message || "Failed to fetch alerts"; }
      });

    // --- RackCluster handlers (FIXED) ---
    builder
      .addCase(fetchAlertsByRackCluster.pending, (s, a) => {
        const id = a.meta.arg;
        if (!s.byRackCluster) s.byRackCluster = {};
        if (!s.byRackCluster[id]) {
          s.byRackCluster[id] = {
            loading: true,
            error: null,
            racks: [],
            totalRacks: 0,
            clusterName: null,
            ackitName: null,
            dataCenterId: null,
          };
        } else {
          s.byRackCluster[id].loading = true;
          s.byRackCluster[id].error = null;
        }
      })
      .addCase(fetchAlertsByRackCluster.fulfilled, (s, a) => {
        const payload = a.payload || {};
        const id = payload.rackClusterId ?? a.meta.arg;
        if (!s.byRackCluster) s.byRackCluster = {};
        s.byRackCluster[id] = {
          loading: false,
          error: null,
          racks: payload.racks ?? [],
          totalRacks: payload.totalRacks ?? 0,
          clusterName: payload.clusterName ?? null,
          ackitName: payload.ackitName ?? null,
          dataCenterId: payload.dataCenterId ?? null,
        };
      })
      .addCase(fetchAlertsByRackCluster.rejected, (s, a) => {
        const id = a.meta.arg;
        if (!s.byRackCluster) s.byRackCluster = {};
        if (!s.byRackCluster[id]) {
          s.byRackCluster[id] = {
            loading: false,
            error: a.payload || a.error?.message || "Failed to fetch alerts",
            racks: [],
            totalRacks: 0,
          };
        } else {
          s.byRackCluster[id].loading = false;
          s.byRackCluster[id].error = a.payload || a.error?.message || "Failed to fetch alerts";
        }
      });
  },
});

export const { clearDataCenterAlerts, clearRackClusterAlerts, applySensorUpdate } = alertsSlice.actions;
export default alertsSlice.reducer;