// // After Polling Work and trying to show only changed fields not the reload of all devices
// // src/pages/Dashboard.jsx
// import React, { useState, useEffect, useMemo } from "react"
// import FreezerDeviceCard from "./FreezerDeviceCard"
// import OrganizationSelect from "./OrganizationSelect"
// import VenueSelect from "./VenueSelect"
// import AlertsPanel from "./AlertsPanel"
// import "../../styles/pages/Dashboard/dashboard-styles.css"
// import "../../styles/pages/Dashboard/freezer-cards-responsive.css"
// import { useStore } from "../../contexts/storecontexts"
// import { useLocation, useNavigate } from "react-router-dom"
// import DashboardRightPanel from "../../components/DashboardRightPanel"
// import { Drawer, useMediaQuery } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchOrganizationByUserID } from "../../slices/OrganizationSlice";
// import DeviceSkeleton from "./DeviceSkeleton"


// const mockFreezerDevices = [
// ]

// const BASE = import.meta.env.VITE_BACKEND_API || "http://localhost:5050"

// export default function Dashboard() {
//   // -------------------------
//   // top-level hooks (always called, stable order)
//   // -------------------------
//  const { user, getToken } = useStore()
//   const location = useLocation()
//   const navigate = useNavigate()

//   const token = getToken();
//   // -------------------------
//   // minimal state for UI
//   // -------------------------
//   const [organizations, setOrganizations] = useState([]);
//   const [freezerDevices, setFreezerDevices] = useState(mockFreezerDevices);
//   const [selectedFreezerDeviceId, setSelectedFreezerDeviceId] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedOrgId, setSelectedOrgId] = useState("");
//   const [selectedVenueId, setSelectedVenueId] = useState("");
//   const [orgNameForTop, setOrgNameForTop] = useState();
//   const [open, setOpen] = React.useState(false);
//   const isDesktop = useMediaQuery("(min-width:768px)");
//   const isDesktopForIcon = useMediaQuery("(min-width:760px)");
//   // add near the top of the component:
//   const autoSelectedForVenueRef = React.useRef({}); // keys: venueId -> true
//   // const [freezerDevicesLoading, setFreezerDevicesLoading] = useState(false);
//   // const [hasFetchedForVenue, setHasFetchedForVenue] = useState(true);
// const [isInitialDevicesLoad, setIsInitialDevicesLoad] = useState(true);
// const [isContextChanging, setIsContextChanging] = useState(false);

//   // -------------------------
//   // helpers (pure utility, no hooks inside)
//   // -------------------------
//   const getAllDevicesInOrganization = (org) => {
//     let devices = [...(org.devices || [])]
//     if (org.subOrganizations) {
//       org.subOrganizations.forEach((subOrg) => {
//         devices = devices.concat(getAllDevicesInOrganization(subOrg))
//       })
//     }
//     return devices
//   }
  

//   const findOrganizationById = (orgs, id) => {
//     for (const org of orgs) {
//       if (String(org.id) === String(id) || String(org._id) === String(id)) return org
//       if (org.subOrganizations) {
//         const found = findOrganizationById(org.subOrganizations, id)
//         if (found) return found
//       }
//     }
//     return null
//   }

//   // -------------------------
//   // derived data (no useEffect)
//   // -------------------------
//   const selectedOrganizationData = useMemo(() => {
//     if (!selectedOrgId || organizations.length === 0) return null
//     const org = findOrganizationById(organizations, selectedOrgId)
//     if (!org) return null
//     const allDevices = getAllDevicesInOrganization(org)
//     return {
//       organizationName: org.name || org.organization_name || selectedOrgId,
//       deviceCount: allDevices.length,
//     }
//   }, [selectedOrgId, organizations])

//   // -------------------------
//   // EFFECT #1: fetchOrganizations on mount (keeps your placeholder behavior)
//   // -------------------------
//   useEffect(() => {
//     const fetchOrganizations = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const mockOrgs = []
//         setOrganizations(mockOrgs);
//       } catch (err) {
//         setError(err.message || "Failed to load organizations")
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchOrganizations()
//   }, [])



// const dispatch = useDispatch();


// // -------------------------
// // determine polling interval
// // -------------------------
// const getPollingInterval = () => {
//   if (!user?.timer) return 5 * 60 * 1000; // default 5 minutes

//   const match = /^(\d+)(s|m)$/.exec(user.timer.trim());
//   if (!match) return 5 * 60 * 1000; // fallback if invalid format

//   const value = parseInt(match[1], 10);
//   const unit = match[2];

//   if (unit === "s") {
//     return Math.min(Math.max(value, 0), 60) * 1000; // 0-60s
//   } else if (unit === "m") {
//     return Math.min(Math.max(value, 0), 60) * 60 * 1000; // 0-60m
//   }

//   return 5 * 60 * 1000; // fallback
// }

// const POLL_MS = getPollingInterval();



// useEffect(() => {
//   if (user?.role !== "admin" && user?._id) {
//     dispatch(fetchOrganizationByUserID(user._id))
//       .unwrap()
//       .then((org) => {
//         console.log("Organization object:", org); // this is your actual organization
//         setOrgNameForTop(org?.name); 
//       })
//       .catch((err) => {
//         console.log("Failed to fetch organization:", err);
//       });
//   }
// }, [dispatch, user]);



// useEffect(() => {
//   const sp = new URLSearchParams(location.search)
//   const venueFromUrl = sp.get("venue") || ""

//   if (venueFromUrl === selectedVenueId) return

//   setIsContextChanging(true);   // 🔥 ADD THIS

//   if (!venueFromUrl) {
//     setSelectedVenueId("")
//   } else {
//     setSelectedVenueId(venueFromUrl)
//   }
// }, [location.search])


// useEffect(() => {


//  if (!selectedVenueId) {
//    setFreezerDevices([]);
//    setSelectedFreezerDeviceId(null);
//    autoSelectedForVenueRef.current = {};
//    // no venue -> no loading; mark fetch as completed so spinner stops
//   //  setFreezerDevicesLoading(false);
//   //  setHasFetchedForVenue(true);
//    return;
//  }

// // IMPORTANT FIX:
// // setFreezerDevicesLoading(true);

//   let mounted = true;
//   let intervalId = null;
//   const controller = new AbortController();
//   const signal = controller.signal;

//   const fetchDevices = async (isPolling = false) => {
//     // setFreezerDevicesLoading(true);
//     try {
//       const res = await fetch(`${BASE}/device/device-by-venue/${selectedVenueId}`, {
//         method: "GET",
//         credentials: "include",
//         signal,
//         headers: {
//           "Content-Type": "application/json",
//           ...(token ? { Authorization: `Bearer ${token}` } : {}),
//         },
//       });

//       // if the request was aborted this will throw and be caught below
//       const data = await res.json();

//       if (!mounted) return;

//       if (res.ok) {
//         const devices = Array.isArray(data.devices)
//           ? data.devices
//           : (data.devices ? [data.devices] : []);

//         // setFreezerDevices(devices || []);
//         console.log("devices>", devices)

//         setFreezerDevices((prevDevices) => {
//   const prevMap = new Map(
//     prevDevices.map(d => [
//       String(d._id ?? d.id ?? d.deviceId),
//       d
//     ])
//   );

//   return devices.map((newDevice) => {
//     const id = String(newDevice._id ?? newDevice.id ?? newDevice.deviceId);
//     const oldDevice = prevMap.get(id);

//     // New device → add
//     if (!oldDevice) return newDevice;

//     console.log("newDevice>", newDevice)

//     // Merge only changed fields
//     return {
//       ...oldDevice,

//       espAmbient :
//         newDevice.espAmbient ?? oldDevice.espAmbient,

//       espFreezer:
//         newDevice.espFreezer ?? oldDevice.espFreezer,
        
//       batteryAlert:
//         newDevice.batteryAlert ?? oldDevice.batteryAlert,

//       refrigeratorAlert:
//         newDevice.refrigeratorAlert ?? oldDevice.refrigeratorAlert,

//       lastUpdateTime:
//         newDevice.lastUpdateTime ?? oldDevice.lastUpdateTime,
//     };
//   });
// });


//         // Auto-select first device ONLY ON DESKTOP and only once per venue load
//         if (isDesktop && devices && devices.length > 0) {
//           // hasn't been auto-selected yet for this venue?
//           if (!autoSelectedForVenueRef.current[selectedVenueId]) {
//             const firstId = devices[0]._id ?? devices[0].id ?? devices[0].deviceId;
//             if (firstId) {
//               setSelectedFreezerDeviceId(String(firstId));
//               // mark that we auto-selected for this venue so we don't repeat
//               autoSelectedForVenueRef.current[selectedVenueId] = true;
//             }
//           }
//         }

//         // If mobile (<768px), ensure no auto-selection
//        if (!isDesktop && !isPolling) {
//           setSelectedFreezerDeviceId(null);
//         }

//       } else {
//         // error response
//         setFreezerDevices([]);
//         setSelectedFreezerDeviceId(null);
//         console.error("Device fetch error:", data?.message);
//       }
//     } catch (err) {
//       if (!mounted) return;
//       if (err.name === "AbortError") {
//         // request was aborted — no-op
//         return;
//       }
//       console.error("Device fetch error:", err);
//       setFreezerDevices([]);
//       setSelectedFreezerDeviceId(null);
//     } finally{
//       // setFreezerDevicesLoading(false);
//       // setHasFetchedForVenue(true);
//        if (!isPolling) {
//     setIsInitialDevicesLoad(false);
//     setIsContextChanging(false);
//   }
//     }
//   };

//   fetchDevices(false); // initial / venue change fetch

//   intervalId = setInterval(() => {
//     fetchDevices(true); // polling fetch
//   }, POLL_MS);

//   return () => {
//     mounted = false;
//     if (intervalId) clearInterval(intervalId);
//     controller.abort(); // cancel pending fetch
//   };
//   // intentionally not including selectedFreezerDeviceId to avoid effect loop when we set it
// }, [selectedVenueId, token, isDesktop]);

//   // -------------------------
//   // simple handlers (kept minimal)
//   // -------------------------

//   //  const toggleDrawer = (newOpen) => () => {
//   //   setOpen(newOpen);
//   // };


//   const handleFreezerDeviceSelect = (deviceId) => {
//     console.log("Card Selected")
//     setSelectedFreezerDeviceId(deviceId)
//   if (!isDesktop) setOpen(true) 
//   }



//   const onOrganizationChange = (id) => {
  
//      const orgId = id || user?.organization;
    
//   // If org hasn't changed, don't clear the venue or modify URL
//   if (orgId && String(orgId) === String(selectedOrgId)) {
//     return;
//   }

//   // Show loading and mark venue-fetch as not-done for the new org
//   // setHasFetchedForVenue(false);
//   // setFreezerDevicesLoading(true);
//     setIsContextChanging(true);  
//     setSelectedOrgId(id || user?.organization)
//     setSelectedVenueId("")
//     // remove ?venue from URL
//     const sp = new URLSearchParams(location.search)
//     if (sp.get("venue")) {
//       sp.delete("venue")
//       navigate(location.pathname + (sp.toString() ? `?${sp.toString()}` : ""), { replace: true })
//     }
//   }

//   const onVenueChange = (id) => {
//   if (String(id) === String(selectedVenueId)) return;
//     // console.log("id>", id, "venueId>", id)
//   setIsContextChanging(true);   // 🔥 ADD THIS

//   setSelectedVenueId(id)
//   const basePath = location.pathname.split("?")[0]
//   if (id) navigate(`${basePath}?venue=${id}`, { replace: false })
//   else navigate(basePath, { replace: false })
// }

// const clearSelectedDevice = () => {
//   setSelectedFreezerDeviceId(null);
//   setOpen(false); // also close drawer on mobile
// };

  

//   // -------------------------
//   // render states for loading / error
//   // -------------------------
//   if (loading) {
//     return (
//       <div className="flex w-full flex-row h-full bg-gray-100 font-inter rounded-md overflow-hidden">
//         <div className="flex justify-center items-center w-full h-64">
//           {/* <div className="text-lg text-gray-600">Loading organizations...</div> */}
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="flex w-full flex-row h-full font-inter rounded-md bg-[#F5F6FA]">
//       {/* Main Content Area */}
//       {/* <div className="flex-1 min-w-0 space-y-4 overflow-y-auto custom-scrollbar dashboard-main-content bg-white shadow-sm border border-[#E5E7EB]/30 p-3 lg:py-none lg:px-3"> */}
        
//         <div className="flex-1 min-w-0 space-y-4 overflow-y-auto custom-scrollbar dashboard-main-content bg-white shadow-sm border border-[#E5E7EB]/30 p-3 lg:py-none lg:px-3  ">
      
//           <>
//             {/* Header */}
//             <div className="flex justify-between items-center ">
//               {
//                 !isDesktopForIcon &&  <img src="/logo-half.png" alt="IOTFIY LOGO" className="w-auto h-[40px]" />
//               }
              

//               <div className=" sm:w-[25rem] md:w-[13rem] lg:w-[20rem] xl:w-[25rem]">
//                 {/* <p className="text-sm text-[#64748B] min-w-[250px] font-medium">Organization</p> */}
//                 {user?.role === "admin" ? (
//                   <OrganizationSelect
//                     value={selectedOrgId}
//                     onChange={onOrganizationChange}
//                     className="mt-1"
//                   />
//                 ): <>
//                   <p className="text-gray-500">Organization</p>
//                   <h3 className="text-gray-700 font-bold capitalize">{orgNameForTop || ""}</h3>
//                 </>} 
//               </div>

//               <div className="flex items-center ml-5 sm:ml-auto ">
//                 <VenueSelect
//                   organizationId={selectedOrgId || user?.organization}
//                   value={selectedVenueId}
//                   onChange={onVenueChange}
//                   className=""
//                   excludeFirstN={user?.role === "user" ? 3 : 0}
//                 />
//               </div>            
//             </div>



// {/* Freezer Device Cards area */}
// <div className="flex-1 min-h-[8rem]">
//   {/* <div className="freezer-cards-container custom-scrollbar  "> */}
//    <div
//   className={`freezer-cards-container custom-scrollbar hide-scrollbar
//     ${freezerDevices.length === 0 && !isInitialDevicesLoad && !isContextChanging
//       ? "no-scroll"
//       : ""}
//   `}
// >
//     {(isInitialDevicesLoad || isContextChanging) ? (
// //  <div className="freezer-cards-grid freezer-cards-container">
//  <div className="freezer-cards-grid  ">
//     {Array.from({ length: 4 }).map((_, index) => (
//       <DeviceSkeleton key={index} />
//     ))}
//   </div>
//     ) : freezerDevices.length === 0 ? (
//       // No devices state (only shown when not loading)
//       // <div className="flex flex-col items-center justify-center min-h-full h-full text-[#64748B] ">
//         <div className="freezer-empty-state text-[#64748B]">
//   <div className="flex flex-col items-center">
//         <svg className="w-16 h-16 mb-4 text-[#E2E8F0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//         </svg>
//         <p className="text-lg font-medium">No Freezer Devices Found</p>
//         <p className="text-sm">Add some freezer devices to get started</p>
//       </div>
//       </div>
//     ) : (
//       // Devices present
//       // <div className="freezer-cards-grid freezer-cards-container">
//       <div className="freezer-cards-grid ">
//         {freezerDevices.map((device) => (
//           <FreezerDeviceCard
//             key={device._id ?? device.id}
//             deviceId={device.deviceId}
//             // ambientTemperature={device?.AmbientData?.temperature ?? device.ambientTemperature}
//             // freezerTemperature={device?.FreezerData?.temperature ?? device.freezerTemperature}
//             ambientTemperature={device?.espAmbient}
//             freezerTemperature={device?.espFreezer}
//             batteryLow={device?.batteryAlert ?? false}
//             refrigeratorAlert={device?.refrigeratorAlert ?? false}
//             onCardSelect={() => handleFreezerDeviceSelect(device._id ?? device.id)}
//             isSelected={(device._id ?? device.id) === selectedFreezerDeviceId}
//             espHumidity={device?.espHumidity}
//             espTemprature={device?.espTemprature}
//             humidityAlert={device?.humidityAlert}
//             odourAlert={device?.odourAlert}
//             temperatureAlert={device?.temperatureAlert}
//             espOdour={device?.espOdour}
//           />
//         ))}
//       </div>
//     )}
//   </div>
// </div>

//             <AlertsPanel organizationId={selectedOrgId} pollInterval={POLL_MS} />
//             {/* <AlertsPanel organizationId={selectedOrgId} pollInterval={2 * 1000} /> */}
//           </>
//         {/* )} */}

//       </div>

// {isDesktop ? (
//         <DashboardRightPanel
//       freezerDevices={freezerDevices}
//       selectedFreezerDeviceId={selectedFreezerDeviceId}
//       selectedOrgId={selectedOrgId}
      
//     />  
//     ) : (
//       <Drawer open={open} onClose={clearSelectedDevice} anchor="right">
//         <DashboardRightPanel
//       freezerDevices={freezerDevices}
//       selectedFreezerDeviceId={selectedFreezerDeviceId}
//       selectedOrgId={selectedOrgId}
//       closeIcon={true}
//       //  onClose={toggleDrawer(false)}
//        onClose={clearSelectedDevice}
//     />
//       </Drawer>
//     )}
//     </div>
//   )
// }

















// // src/pages/Dashboard.jsx
// import React, { useEffect, useMemo, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useStore } from "../../contexts/storecontexts";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useMediaQuery, Drawer } from "@mui/material";

// import DataCenterSelect from "./DataCenterSelect"; // new / adapted from OrganizationSelect
// import RackClusterSelect from "./RackClusterSelect"; // replaces VenueSelect
// import DashboardRightPanel from "../../components/DashboardRightPanel";
// import AlertsPanel from "../../components/DashboardRightPanel";

// import { fetchAllDataCenters, fetchDataCentersByUser } from "../../slices/dataCenterSlice";
// import { fetchRackClustersByDataCenter } from "../../slices/rackClusterSlice";
// import { fetchRacksByDataCenter, fetchRacksByCluster, fetchRackById } from "../../slices/rackSlice";
// import { setSelectedDataCenterId, setSelectedRackClusterId, setSelectedRackId, markContextFetched, markAutoSelectedRack } from "../../slices/uiSlice";

// // keep your skeleton & card components
// import FreezerDeviceCard from "./FreezerDeviceCard";
// import DeviceSkeleton from "./DeviceSkeleton";

// export default function Dashboard() {
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { user, getToken } = useStore();
//   const isDesktop = useMediaQuery("(min-width:768px)");

//   // Redux slices
//   const dataCenters = useSelector((s) => s.DataCenter?.DataCenters || []);
//   const dcLoading = useSelector((s) => s.DataCenter?.loading?.fetch);
//   const clusters = useSelector((s) => s.rackCluster?.clusters || []);
//   const racksState = useSelector((s) => s.racks || {});
//   const ui = useSelector((s) => s.ui || {});

//   const selectedDcId = ui.selectedDataCenterId;
//   const selectedClusterId = ui.selectedRackClusterId;
//   const selectedRackId = ui.selectedRackId;

//   const racksForDc = (selectedDcId && racksState.byDataCenter[selectedDcId]) ? racksState.byDataCenter[selectedDcId].map(id => racksState.byId[id]) : [];
//   const racksForCluster = (selectedClusterId && racksState.byCluster[selectedClusterId]) ? racksState.byCluster[selectedClusterId].map(id => racksState.byId[id]) : [];

//   // decide active racks list (cluster has priority)
//   const activeRacks = selectedClusterId ? racksForCluster : racksForDc;

//   // Token & polling interval
//   const token = getToken();
//   const POLL_MS = (user && user.timer) ? (() => {
//     const match = /^(\d+)(s|m)$/.exec(user.timer.trim());
//     if (!match) return 5 * 60 * 1000;
//     const value = parseInt(match[1], 10);
//     return match[2] === "s" ? Math.min(Math.max(value, 1), 60) * 1000 : Math.min(Math.max(value, 1), 60) * 60 * 1000;
//   })() : 5 * 60 * 1000;

//   const pollRef = useRef(null);

//   // 1) On mount or when user becomes available: fetch datacenters based on role
//   useEffect(() => {
//     if (!user || !user._id) return;

//     if (user.role === "admin") {
//       dispatch(fetchAllDataCenters());
//     } else {
//       dispatch(fetchDataCentersByUser(user._id));
//     }
//   }, [user?._id, user?.role, dispatch]);

//   // 2) When DataCenters finish loading, resolve default selectedDataCenterId
//   useEffect(() => {
//     if (!dataCenters || dataCenters.length === 0) return;
//     // If selection already exists and is valid, keep it
//     if (selectedDcId && dataCenters.find((d) => String(d._id) === String(selectedDcId))) return;

//     // Try URL param first
//     const sp = new URLSearchParams(location.search);
//     const urlDc = sp.get("dc");
//     const urlMatches = urlDc && dataCenters.find((d) => String(d._id) === String(urlDc));
//     const pick = urlMatches ? urlMatches._id : dataCenters[0]._id;
//     dispatch(setSelectedDataCenterId(String(pick)));
//   }, [dataCenters, selectedDcId, location.search, dispatch]);

//   // 3) When selectedDcId changes: fetch clusters, racks, alerts, means
//   useEffect(() => {
//     if (!selectedDcId) return;

//     // fetch clusters (fill rackClusterSlice)
//     dispatch(fetchRackClustersByDataCenter(selectedDcId));

//     // fetch racks by DC
//     dispatch(fetchRacksByDataCenter(selectedDcId))
//       .unwrap?.()
//       .catch(()=>{}); // swallow here; ui slice will manage errors/flags

//     // mark this context fetched (uiSlice) once fulfilled by the racks thunk
//     // We'll mark context fetched when racks thunk resolves — use another effect to watch racksState.byDataCenter
//   }, [selectedDcId, dispatch]);

//   // 4) When racks for DC arrive, auto-select first rack (desktop only), mark fetched
//   useEffect(() => {
//     if (!selectedDcId) return;
//     const list = racksState.byDataCenter[selectedDcId] || [];
//     if (!list || list.length === 0) {
//       // mark fetched (no racks)
//       dispatch(markContextFetched({ kind: "dc", id: selectedDcId }));
//       return;
//     }
//     // if we already auto-selected for this DC, skip
//     if (ui.autoSelectedRackForContext?.dc?.[selectedDcId]) {
//       // still mark fetched
//       dispatch(markContextFetched({ kind: "dc", id: selectedDcId }));
//       return;
//     }
//     // auto-select first rack (desktop)
//     const firstId = list[0];
//     if (firstId) {
//       if (isDesktop) {
//         dispatch(setSelectedRackId(String(firstId)));
//         // load full rack details
//         dispatch(fetchRackById(String(firstId)));
//         dispatch(markAutoSelectedRack({ kind: "dc", id: selectedDcId }));
//       } else {
//         // on mobile, don't auto-select; still mark fetched
//       }
//     }
//     dispatch(markContextFetched({ kind: "dc", id: selectedDcId }));
//   }, [racksState.byDataCenter, selectedDcId, ui.autoSelectedRackForContext, isDesktop, dispatch]);

//   // 5) When user selects a cluster (explicit) the Dashboard should handle fetching cluster racks
//   // (the selection component will dispatch setSelectedRackClusterId; watch that)
//   useEffect(() => {
//     if (!selectedClusterId) return;
//     dispatch(fetchRacksByCluster(selectedClusterId))
//       .unwrap?.()
//       .catch(()=>{});
//     // mark fetched after racks for cluster appear (separate effect below)
//   }, [selectedClusterId, dispatch]);

//   // 6) When racks for cluster arrive, auto-select first rack of cluster if not already done
//   useEffect(() => {
//     if (!selectedClusterId) return;
//     const list = racksState.byCluster[selectedClusterId] || [];
//     if (!list || list.length === 0) {
//       dispatch(markContextFetched({ kind: "cluster", id: selectedClusterId }));
//       return;
//     }
//     if (ui.autoSelectedRackForContext?.cluster?.[selectedClusterId]) {
//       dispatch(markContextFetched({ kind: "cluster", id: selectedClusterId }));
//       return;
//     }
//     const firstId = list[0];
//     if (firstId) {
//       if (isDesktop) {
//         dispatch(setSelectedRackId(String(firstId)));
//         dispatch(fetchRackById(String(firstId)));
//         dispatch(markAutoSelectedRack({ kind: "cluster", id: selectedClusterId }));
//       }
//     }
//     dispatch(markContextFetched({ kind: "cluster", id: selectedClusterId }));
//   }, [racksState.byCluster, selectedClusterId, ui.autoSelectedRackForContext, isDesktop, dispatch]);

//   // 7) When selectedRackId changes (user or auto), fetch full rack details
//   useEffect(() => {
//     if (!selectedRackId) return;
//     // ensure rack details present
//     dispatch(fetchRackById(selectedRackId)).catch(()=>{});
//   }, [selectedRackId, dispatch]);

//   // 8) Polling: re-fetch active context periodically (only the active context)
//   useEffect(() => {
//     if (!selectedDcId) return;
//     // cleanup old interval
//     if (pollRef.current) {
//       clearInterval(pollRef.current);
//       pollRef.current = null;
//     }

//     const doPoll = () => {
//       if (selectedClusterId) {
//         dispatch(fetchRacksByCluster(selectedClusterId));
//         // optionally fetch cluster mean & cluster alerts (dispatch existing thunks)
//       } else {
//         dispatch(fetchRacksByDataCenter(selectedDcId));
//         // optionally fetch DC-level means & alerts
//       }
//     };

//     // initial poll tick is after POLL_MS
//     pollRef.current = setInterval(doPoll, POLL_MS);
//     return () => {
//       if (pollRef.current) clearInterval(pollRef.current);
//     };
//   }, [selectedDcId, selectedClusterId, POLL_MS, dispatch]);

//   // Helpers for UI interactions
//   const onDataCenterChange = (dcId) => {
//     if (!dcId) return;
//     // change DC in UI (this will trigger downstream fetches)
//     dispatch(setSelectedDataCenterId(dcId));
//     // sync URL param
//     const sp = new URLSearchParams(location.search);
//     sp.set("dc", dcId);
//     navigate(`${location.pathname}?${sp.toString()}`, { replace: true });
//   };

//   const onClusterChange = (clusterId) => {
//     // user-driven only
//     if (!clusterId) {
//       dispatch(setSelectedRackClusterId(null));
//       return;
//     }
//     dispatch(setSelectedRackClusterId(clusterId));
//     // sync cluster param optionally
//     const sp = new URLSearchParams(location.search);
//     sp.set("cluster", clusterId);
//     navigate(`${location.pathname}?${sp.toString()}`, { replace: true });
//   };

//   const onRackCardClick = (rackId) => {
//     dispatch(setSelectedRackId(rackId));
//   };

//   // UI data for cards: use activeRacks (derived)
//   const deviceCards = activeRacks || [];

//   // Render
//   return (
//     <div className="flex w-full h-full">
//       <div className="flex-1 p-3 bg-white rounded-md">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-4">
//           <div className="w-[60%]">
//             <DataCenterSelect value={selectedDcId} onChange={onDataCenterChange} />
//           </div>

//           <div className="w-[30%]">
//             <RackClusterSelect value={selectedClusterId} onChange={onClusterChange} disabled={!selectedDcId} />
//           </div>
//         </div>

//         {/* Cards area */}
//         <div className="min-h-[8rem]">
//           <div className="freezer-cards-container">
//             {(!deviceCards || deviceCards.length === 0) ? (
//               // show skeleton only during initial context load
//               ui.isInitialContextLoad ? (
//                 <div className="freezer-cards-grid">
//                   {Array.from({ length: 4 }).map((_, i) => <DeviceSkeleton key={i} />)}
//                 </div>
//               ) : (
//                 <div className="freezer-empty-state text-gray-500">
//                   <div>No racks found</div>
//                 </div>
//               )
//             ) : (
//               <div className="freezer-cards-grid">
//                 {deviceCards.map((device) => (
//                   <FreezerDeviceCard
//                     key={device._id}
//                     deviceId={device._id}
//                     ambientTemperature={device.tempA ?? device.tempV}
//                     freezerTemperature={device.tempV}
//                     onCardSelect={() => onRackCardClick(device._id)}
//                     isSelected={String(device._id) === String(selectedRackId)}
//                     // pass other props...
//                   />
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         <AlertsPanel dataCenterId={selectedDcId} rackClusterId={selectedClusterId} pollInterval={POLL_MS} />
//       </div>

//       {/* Right panel */}
//       {isDesktop ? (
//         <DashboardRightPanel selectedRackId={selectedRackId} selectedDataCenterId={selectedDcId} selectedRackClusterId={selectedClusterId} />
//       ) : (
//         <Drawer anchor="right" open={false}>
//           <DashboardRightPanel selectedRackId={selectedRackId} selectedDataCenterId={selectedDcId} selectedRackClusterId={selectedClusterId} />
//         </Drawer>
//       )}
//     </div>
//   );
// }










// // src/pages/Dashboard.jsx
// import { useEffect, useMemo, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useStore } from "../../contexts/storecontexts";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useMediaQuery, Drawer } from "@mui/material";
// import "../../styles/pages/Dashboard/dashboard-styles.css"
// import "../../styles/pages/Dashboard/freezer-cards-responsive.css"
// import DataCenterSelect from "./DataCenterSelect";
// import RackClusterSelect from "./RackClusterSelect";
// import AlertsPanel from "./AlertsPanel";
// import DashboardRightPanel from "../../components/components/DashboardRightPanel";

// import FreezerDeviceCard from "./FreezerDeviceCard";
// import DeviceSkeleton from "./DeviceSkeleton";

// import { fetchAllDataCenters, fetchDataCentersByUser } from "../../slices/DataCenterSlice";
// import { fetchRackClustersByDataCenter } from "../../slices/rackClusterSlice";
// import { fetchRacksByDataCenterId, fetchRacksByClusterId, fetchRackById } from "../../slices/rackSlice";
// import {
//   setSelectedDataCenterId,
//   setSelectedRackClusterId,
//   setSelectedRackId,
//   markContextFetched,
//   markAutoSelectedRack,
// } from "../../slices/uiSlice";

// const POLL_MS_DEFAULT = 5 * 60 * 1000; // fallback 5 minutes 

// export default function Dashboard() {
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { user } = useStore();
//   const isDesktop = useMediaQuery("(min-width:768px)");
//   const [drawerOpen, setDrawerOpen] = useState(false);

//   const pollRef = useRef(null);

//   // Redux slices
//   const dataCenters = useSelector((s) => s.DataCenter?.DataCenters || []);
//   const dcLoading = useSelector((s) => s.DataCenter?.loading?.fetch);
//   const clusters = useSelector((s) => s.rackCluster?.clusters || []);
//   const rackState = useSelector((s) => s.rack || { racks: [], loading: {} });
//   const ui = useSelector((s) => s.ui || {});
//   console.log("UISlice", ui);
//   const selectedDcId = ui.selectedDataCenterId;
//   const selectedClusterId = ui.selectedRackClusterId;
//   const selectedRackId = ui.selectedRackId;

//   const activeRacks = Array.isArray(rackState.racks) ? rackState.racks : [];
//   console.log("Active RACKS:", activeRacks)
//   // compute POLL_MS from user.timer or fallback
//   const POLL_MS = useMemo(() => {
//     try {
//       if (!user?.timer) return POLL_MS_DEFAULT;
//       const m = /^(\d+)(s|m)$/.exec(String(user.timer).trim());
//       if (!m) return POLL_MS_DEFAULT;
//       const v = Math.max(1, Math.min(60, parseInt(m[1], 10)));
//       return m[2] === "s" ? v * 1000 : v * 60 * 1000;
//     } catch {
//       return POLL_MS_DEFAULT;
//     }
//   }, [user?.timer]);

//   // ---------- 1) Fetch DataCenters on login (role-aware) ----------
//   // useEffect(() => {
//   //   if (!user || !user._id) return;
//   //   if (user.role === "admin") {
//   //     dispatch(fetchAllDataCenters());
//   //   } else {
//   //     dispatch(fetchDataCentersByUser(user._id));
//   //   }
//   // }, [user?.role, user?._id, dispatch]);

//   // ---------- 2) Resolve default DataCenter when list is available ----------
//   useEffect(() => {
//     if (!dataCenters || dataCenters.length === 0) return;

//     // if selection already valid, keep it
//     if (selectedDcId && dataCenters.find((d) => String(d._id) === String(selectedDcId))) return;

//     // prefer URL param ?dc=...
//     const sp = new URLSearchParams(location.search);
//     const urlDc = sp.get("dc");
//     const found = urlDc && dataCenters.find((d) => String(d._1 ?? d._id) === String(urlDc)); // defensive
//     const chosen = found ? found._id : dataCenters[0]._id;

//     dispatch(setSelectedDataCenterId(String(chosen)));
//     // push URL param so refresh/deep link works
//     sp.set("dc", String(chosen));
//     navigate(`${location.pathname}?${sp.toString()}`, { replace: true });
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [dataCenters, dispatch]); // intentionally minimal deps; selection is idempotent

//   // ---------- 3) When selected DC changes: fetch clusters and racks by DC ----------
//   useEffect(() => {
//     if (!selectedDcId) return;

//     dispatch(fetchRackClustersByDataCenter(selectedDcId));
//     dispatch(fetchRacksByDataCenterId(selectedDcId));
//     // we rely on rackState.racks update to mark context fetched and auto-select rack
//   }, [selectedDcId, dispatch]);

//   // Fetch racks according to active context
//   useEffect(() => {
//     // if no DC selected, nothing to do
//     if (!selectedDcId) return;

//     // Only fetch by cluster if cluster is selected
//     if (selectedClusterId) {
//       dispatch(fetchRacksByClusterId(selectedClusterId));
//     } else {
//       dispatch(fetchRacksByDataCenterId(selectedDcId));
//     }
//   },
//     // only trigger after both selectedDcId and selectedClusterId are restored
//     [selectedDcId, selectedClusterId, dispatch]);


//   // ---------- Restore cluster selection from URL ----------
//   useEffect(() => {
//     if (!clusters || clusters.length === 0) return;

//     const sp = new URLSearchParams(location.search);
//     const urlCluster = sp.get("cluster");

//     if (urlCluster && clusters.find(c => String(c._id) === String(urlCluster))) {
//       dispatch(setSelectedRackClusterId(urlCluster));
//     }
//   }, [clusters, location.search, dispatch]);

//   // ---------- 4) When cluster is selected by user: fetch racks by cluster ----------
//   // useEffect(() => {
//   //   if (!selectedClusterId) return;
//   //   dispatch(fetchRacksByClusterId(selectedClusterId));
//   //   // rackState.racks will be updated by thunk (same state.rack.racks)
//   // }, [selectedClusterId, dispatch]);

//   // 🔁 Fetch racks ONLY from active context
//   // useEffect(() => {
//   //   if (!selectedDcId) return;

//   //   if (selectedClusterId) {
//   //     // Cluster is active → fetch cluster racks
//   //     dispatch(fetchRacksByClusterId(selectedClusterId));
//   //   } else {
//   //     // No cluster → fetch DC racks
//   //     dispatch(fetchRacksByDataCenterId(selectedDcId));
//   //   }
//   // }, [selectedDcId, selectedClusterId, dispatch]);


//   // ---------- 5) When rack list changes (either DC-level or cluster-level), auto-select first rack once ----------
//   useEffect(() => {
//     const list = Array.isArray(rackState.racks) ? rackState.racks : [];

//     // mark fetched even if empty
//     const markFetchedForCurrent = () => {
//       if (selectedClusterId) dispatch(markContextFetched({ kind: "cluster", id: selectedClusterId }));
//       else if (selectedDcId) dispatch(markContextFetched({ kind: "dc", id: selectedDcId }));
//     };

//     if (!selectedDcId && !selectedClusterId) {
//       // nothing to do
//       return;
//     }

//     if (!list || list.length === 0) {
//       markFetchedForCurrent();
//       return;
//     }

//     // if selectedRackId already valid inside list, keep it and mark fetched
//     if (selectedRackId && list.find((r) => String(r._id) === String(selectedRackId))) {
//       markFetchedForCurrent();
//       return;
//     }

//     // check if we already auto-selected for this context
//     const alreadyAutoSelected = selectedClusterId
//       ? Boolean(ui.autoSelectedRackForContext?.cluster?.[selectedClusterId])
//       : Boolean(ui.autoSelectedRackForContext?.dc?.[selectedDcId]);

//     if (alreadyAutoSelected) {
//       markFetchedForCurrent();
//       return;
//     }

//     // auto-select first rack only on desktop
//     if (isDesktop) {
//       const first = list[0];
//       if (first && first._id) {
//         dispatch(setSelectedRackId(String(first._id)));
//         dispatch(fetchRackById(String(first._id)));
//         // mark auto-select for the context
//         if (selectedClusterId) dispatch(markAutoSelectedRack({ kind: "cluster", id: selectedClusterId }));
//         else dispatch(markAutoSelectedRack({ kind: "dc", id: selectedDcId }));
//       }
//     }

//     markFetchedForCurrent();
//   }, [
//     rackState.racks,
//     selectedDcId,
//     selectedClusterId,
//     selectedRackId,
//     ui.autoSelectedRackForContext,
//     isDesktop,
//     dispatch,
//   ]);

//   // ---------- 6) When selected rack changes → ensure full details are loaded ----------
//   useEffect(() => {
//     if (!selectedRackId) return;
//     dispatch(fetchRackById(selectedRackId));
//   }, [selectedRackId, dispatch]);

//   // ---------- 7) Polling: re-fetch only the active context (DC or cluster) ----------
//   useEffect(() => {
//     // clear previous
//     if (pollRef.current) {
//       clearInterval(pollRef.current);
//       pollRef.current = null;
//     }
//     if (!selectedDcId) return;

//     const doPoll = () => {
//       if (selectedClusterId) {
//         dispatch(fetchRacksByClusterId(selectedClusterId));
//       } else {
//         dispatch(fetchRacksByDataCenterId(selectedDcId));
//       }
//       // Alerts and cluster-means polling can be added here (dispatch thunks)
//     };

//     // start poll
//     pollRef.current = setInterval(doPoll, POLL_MS);
//     return () => {
//       if (pollRef.current) clearInterval(pollRef.current);
//       pollRef.current = null;
//     };
//   }, [selectedDcId, selectedClusterId, POLL_MS, dispatch]);

//   // ---------- UI handlers ----------
//   const handleDataCenterChange = (dcId) => {
//     if (!dcId) return;
//     dispatch(setSelectedDataCenterId(dcId));
//     // update url
//     const sp = new URLSearchParams(location.search);
//     sp.set("dc", dcId);
//     // keep cluster param cleared when DC changed
//     sp.delete("cluster");
//     navigate(`${location.pathname}?${sp.toString()}`, { replace: true });
//   };

//   const handleClusterChange = (clusterId) => {
//     // user-driven only
//     dispatch(setSelectedRackClusterId(clusterId));
//     const sp = new URLSearchParams(location.search);
//     if (clusterId) sp.set("cluster", clusterId);
//     else sp.delete("cluster");
//     navigate(`${location.pathname}?${sp.toString()}`, { replace: true });
//   };

//   const onCardSelect = (rackId) => {
//     dispatch(setSelectedRackId(rackId));
//     if (!isDesktop) setDrawerOpen(true);
//   };

//   const clearSelectedRack = () => {
//     dispatch(setSelectedRackId(null));
//     setDrawerOpen(false);
//   };

//   //   useEffect(() => {
//   //   if (!selectedDcId) return;
//   //   if (!clusters || clusters.length === 0) return;
//   //   if (selectedClusterId) return;

//   //   dispatch(setSelectedRackClusterId(String(clusters[0]._id)));
//   // }, [clusters, selectedDcId, selectedClusterId, dispatch]);


//   // ---------- Render logic ----------
//   const showSkeleton = ui.isInitialContextLoad;
//   const noRacks = !activeRacks || activeRacks.length === 0;

//   return (
//     <div className="flex w-full flex-row h-full font-inter rounded-md bg-[#F5F6FA]">
//       <div className="flex-1 min-w-0 space-y-4 overflow-y-auto custom-scrollbar dashboard-main-content bg-white shadow-sm border border-[#E5E7EB]/30 p-3 lg:py-none lg:px-3">
//         {/* Header */}


//         <div className="flex justify-between items-center">

//           {/* <div className="sm:w-[25rem] md:w-[13rem] lg:w-[20rem] xl:w-[23rem]">
//           <DataCenterSelect value={selectedDcId || ""} onChange={handleDataCenterChange} className="mt-1" />
//         </div>

//         <div className="sm:w-[25rem] md:w-[13rem] lg:w-[20rem] xl:w-[23rem]">
//           <RackClusterSelect
//             value={selectedClusterId || ""}
//             onChange={handleClusterChange}
//             disabled={!selectedDcId}
//             className=""
//           />
//         </div> */}

//           {
//             !isDesktop && <div>
//               <img src="/logo-half.png" alt="LOGO" className="w-auto h-[40px]" />
//             </div>
//           }
//           <div className="flex-1 min-w-[6rem] max-w-[10rem] lg:min-w-[11rem]  lg:max-w-[10rem] xl:max-w-[20rem]  ">
//             <DataCenterSelect
//               value={selectedDcId || ""}
//               onChange={handleDataCenterChange}
//             />
//           </div>

//           <div className="flex-1 min-w-[6rem] max-w-[10rem] lg:min-w-[11rem]  lg:max-w-[10rem] xl:max-w-[20rem]  ">
//             <RackClusterSelect
//               value={selectedClusterId || ""}
//               onChange={handleClusterChange}
//               disabled={!selectedDcId}
//             />
//           </div>
//         </div>

//         {/* Cards area */}
//         <div className="flex-1 min-h-[8rem]">
//           <div className={`freezer-cards-container custom-scrollbar hide-scrollbar ${noRacks && !showSkeleton ? "no-scroll" : ""}`}>
//             {showSkeleton ? (
//               <div className="freezer-cards-grid">
//                 {Array.from({ length: 4 }).map((_, i) => <DeviceSkeleton key={i} />)}
//               </div>
//             ) : noRacks ? (
//               <div className="freezer-empty-state text-[#64748B]">
//                 <div className="flex flex-col items-center">
//                   <svg className="w-16 h-16 mb-4 text-[#E2E8F0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                   </svg>
//                   <p className="text-lg font-medium">No racks found</p>
//                   <p className="text-sm">Add racks to this Data Center or select another Data Center</p>
//                 </div>
//               </div>
//             ) : (
//               <div className="freezer-cards-grid">
//                 {activeRacks.map((rack) => (
//                   <FreezerDeviceCard
//                     key={rack?._id}
//                     deviceId={rack?.name}
//                     ambientTemperature={rack.tempA ?? rack.tempV}
//                     freezerTemperature={rack.tempV}
//                     batteryLow={rack?.batteryAlert ?? false}
//                     refrigeratorAlert={rack?.refrigeratorAlert ?? false}
//                     onCardSelect={() => onCardSelect(rack?._id)}
//                     isSelected={String(rack?._id) === String(selectedRackId)}
//                     espHumidity={rack.humiA ?? rack?.humiV}
//                     humidityAlert={rack?.humidityAlert}
//                   />
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         <AlertsPanel dataCenterId={selectedDcId} rackClusterId={selectedClusterId} pollInterval={POLL_MS} />
//       </div>

//       {isDesktop ? (
//         <DashboardRightPanel selectedRackId={selectedRackId} selectedDataCenterId={selectedDcId} selectedRackClusterId={selectedClusterId} />
//       ) : (
//         <Drawer open={drawerOpen} onClose={clearSelectedRack} anchor="right">
//           <DashboardRightPanel selectedRackId={selectedRackId} selectedDataCenterId={selectedDcId} selectedRackClusterId={selectedClusterId} closeIcon onClose={clearSelectedRack} />
//         </Drawer>
//       )}
//     </div>
//   );
// }

















// // Working fine





// // src/pages/Dashboard.jsx
// import { useEffect, useMemo, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useStore } from "../../contexts/storecontexts";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useMediaQuery, Drawer } from "@mui/material";
// import "../../styles/pages/Dashboard/dashboard-styles.css"
// import "../../styles/pages/Dashboard/freezer-cards-responsive.css"
// import DataCenterSelect from "./DataCenterSelect";
// import RackClusterSelect from "./RackClusterSelect";
// import AlertsPanel from "./AlertsPanel";
// import DashboardRightPanel from "../../components/components/DashboardRightPanel";
// import { Table, LayoutGrid } from "lucide-react";
// import FreezerDeviceCard from "./FreezerDeviceCard";
// import DeviceSkeleton from "./DeviceSkeleton";
// import TabularView from "../../components/TabularView"


// import { fetchAllDataCenters, fetchDataCentersByUser } from "../../slices/DataCenterSlice";
// import { fetchRackClustersByDataCenter } from "../../slices/rackClusterSlice";
// import { fetchRacksByDataCenterId, fetchRacksByClusterId, fetchRackById } from "../../slices/rackSlice";
// import {
//   setSelectedDataCenterId,
//   setSelectedRackClusterId,
//   setSelectedRackId,
//   markContextFetched,
//   markAutoSelectedRack,
// } from "../../slices/uiSlice";

// const POLL_MS_DEFAULT = 5 * 60 * 1000; // fallback 5 minutes 

// export default function Dashboard() {
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { user } = useStore();
//   const isDesktop = useMediaQuery("(min-width:768px)");
//   const [drawerOpen, setDrawerOpen] = useState(false);
// const [viewMode, setViewMode] = useState("cards"); // "cards" | "table"

//   const pollRef = useRef(null);

//   // Redux slices
//   const dataCenters = useSelector((s) => s.DataCenter?.DataCenters || []);
//   const dcLoading = useSelector((s) => s.DataCenter?.loading?.fetch);
//   const clusters = useSelector((s) => s.rackCluster?.clusters || []);
//   const rackState = useSelector((s) => s.rack || { racks: [], loading: {} });
//   const ui = useSelector((s) => s.ui || {});
//   console.log("UISlice", ui);
//   const selectedDcId = ui.selectedDataCenterId;
//   const selectedClusterId = ui.selectedRackClusterId;
//   const selectedRackId = ui.selectedRackId;

//   const activeRacks = Array.isArray(rackState.racks) ? rackState.racks : [];
//   console.log("Active RACKS:", activeRacks)
//   // compute POLL_MS from user.timer or fallback
//   const POLL_MS = useMemo(() => {
//     try {
//       if (!user?.timer) return POLL_MS_DEFAULT;
//       const m = /^(\d+)(s|m)$/.exec(String(user.timer).trim());
//       if (!m) return POLL_MS_DEFAULT;
//       const v = Math.max(1, Math.min(60, parseInt(m[1], 10)));
//       return m[2] === "s" ? v * 1000 : v * 60 * 1000;
//     } catch {
//       return POLL_MS_DEFAULT;
//     }
//   }, [user?.timer]);

//   // ---------- 2) Resolve default DataCenter when list is available ----------
//   useEffect(() => {
//     if (!dataCenters || dataCenters.length === 0) return;

//     // if selection already valid, keep it
//     if (selectedDcId && dataCenters.find((d) => String(d._id) === String(selectedDcId))) return;

//     // prefer URL param ?dc=...
//     const sp = new URLSearchParams(location.search);
//     const urlDc = sp.get("dc");
//     const found = urlDc && dataCenters.find((d) => String(d._1 ?? d._id) === String(urlDc)); // defensive
//     const chosen = found ? found._id : dataCenters[0]._id;

//     dispatch(setSelectedDataCenterId(String(chosen)));
//     // push URL param so refresh/deep link works
//     sp.set("dc", String(chosen));
//     navigate(`${location.pathname}?${sp.toString()}`, { replace: true });
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [dataCenters, dispatch]); // intentionally minimal deps; selection is idempotent

//   // ---------- 3) When selected DC changes: fetch clusters and racks by DC ----------
//   useEffect(() => {
//     if (!selectedDcId) return;

//     dispatch(fetchRackClustersByDataCenter(selectedDcId));
//     dispatch(fetchRacksByDataCenterId(selectedDcId));
//     // we rely on rackState.racks update to mark context fetched and auto-select rack
//   }, [selectedDcId, dispatch]);

//   // Fetch racks according to active context
//   useEffect(() => {
//     // if no DC selected, nothing to do
//     if (!selectedDcId) return;

//     // Only fetch by cluster if cluster is selected
//     if (selectedClusterId) {
//       dispatch(fetchRacksByClusterId(selectedClusterId));
//     } else {
//       dispatch(fetchRacksByDataCenterId(selectedDcId));
//     }
//   },
//     // only trigger after both selectedDcId and selectedClusterId are restored
//     [selectedDcId, selectedClusterId, dispatch]);


//   // ---------- Restore cluster selection from URL ----------
//   useEffect(() => {
//     if (!clusters || clusters.length === 0) return;

//     const sp = new URLSearchParams(location.search);
//     const urlCluster = sp.get("cluster");

//     if (urlCluster && clusters.find(c => String(c._id) === String(urlCluster))) {
//       dispatch(setSelectedRackClusterId(urlCluster));
//     }
//   }, [clusters, location.search, dispatch]);


//   // ---------- 5) When rack list changes (either DC-level or cluster-level), auto-select first rack once ----------
//   useEffect(() => {
//     const list = Array.isArray(rackState.racks) ? rackState.racks : [];

//     // mark fetched even if empty
//     const markFetchedForCurrent = () => {
//       if (selectedClusterId) dispatch(markContextFetched({ kind: "cluster", id: selectedClusterId }));
//       else if (selectedDcId) dispatch(markContextFetched({ kind: "dc", id: selectedDcId }));
//     };

//     if (!selectedDcId && !selectedClusterId) {
//       // nothing to do
//       return;
//     }

//     if (!list || list.length === 0) {
//       markFetchedForCurrent();
//       return;
//     }

//     // if selectedRackId already valid inside list, keep it and mark fetched
//     if (selectedRackId && list.find((r) => String(r._id) === String(selectedRackId))) {
//       markFetchedForCurrent();
//       return;
//     }

//     // check if we already auto-selected for this context
//     const alreadyAutoSelected = selectedClusterId
//       ? Boolean(ui.autoSelectedRackForContext?.cluster?.[selectedClusterId])
//       : Boolean(ui.autoSelectedRackForContext?.dc?.[selectedDcId]);

//     if (alreadyAutoSelected) {
//       markFetchedForCurrent();
//       return;
//     }

//     // auto-select first rack only on desktop
//     if (isDesktop) {
//       const first = list[0];
//       if (first && first._id) {
//         dispatch(setSelectedRackId(String(first._id)));
//         dispatch(fetchRackById(String(first._id)));
//         // mark auto-select for the context
//         if (selectedClusterId) dispatch(markAutoSelectedRack({ kind: "cluster", id: selectedClusterId }));
//         else dispatch(markAutoSelectedRack({ kind: "dc", id: selectedDcId }));
//       }
//     }

//     markFetchedForCurrent();
//   }, [
//     rackState.racks,
//     selectedDcId,
//     selectedClusterId,
//     selectedRackId,
//     ui.autoSelectedRackForContext,
//     isDesktop,
//     dispatch,
//   ]);

//   // ---------- 6) When selected rack changes → ensure full details are loaded ----------
//   useEffect(() => {
//     if (!selectedRackId) return;
//     dispatch(fetchRackById(selectedRackId));
//   }, [selectedRackId, dispatch]);

//   // ---------- 7) Polling: re-fetch only the active context (DC or cluster) ----------
//   useEffect(() => {
//     // clear previous
//     if (pollRef.current) {
//       clearInterval(pollRef.current);
//       pollRef.current = null;
//     }
//     if (!selectedDcId) return;

//     const doPoll = () => {
//       if (selectedClusterId) {
//         dispatch(fetchRacksByClusterId(selectedClusterId));
//       } else {
//         dispatch(fetchRacksByDataCenterId(selectedDcId));
//       }
//       // Alerts and cluster-means polling can be added here (dispatch thunks)
//     };

//     // start poll
//     pollRef.current = setInterval(doPoll, POLL_MS);
//     return () => {
//       if (pollRef.current) clearInterval(pollRef.current);
//       pollRef.current = null;
//     };
//   }, [selectedDcId, selectedClusterId, POLL_MS, dispatch]);

//   // ---------- UI handlers ----------
//   const handleDataCenterChange = (dcId) => {
//     if (!dcId) return;
//     dispatch(setSelectedDataCenterId(dcId));
//     // update url
//     const sp = new URLSearchParams(location.search);
//     sp.set("dc", dcId);
//     // keep cluster param cleared when DC changed
//     sp.delete("cluster");
//     navigate(`${location.pathname}?${sp.toString()}`, { replace: true });
//   };

//   const handleClusterChange = (clusterId) => {
//     // user-driven only
//     dispatch(setSelectedRackClusterId(clusterId));
//     const sp = new URLSearchParams(location.search);
//     if (clusterId) sp.set("cluster", clusterId);
//     else sp.delete("cluster");
//     navigate(`${location.pathname}?${sp.toString()}`, { replace: true });
//   };

//   const onCardSelect = (rackId) => {
//     dispatch(setSelectedRackId(rackId));
//     if (!isDesktop) setDrawerOpen(true);
//   };

//   const clearSelectedRack = () => {
//     dispatch(setSelectedRackId(null));
//     setDrawerOpen(false);
//   };


//   // ---------- Render logic ----------
//   const showSkeleton = ui.isInitialContextLoad;
//   const noRacks = !activeRacks || activeRacks.length === 0;

//   return (
//     <div className="flex w-full flex-row h-full font-inter rounded-md bg-[#F5F6FA]">
//       <div className="flex-1 min-w-0 space-y-4 overflow-y-auto custom-scrollbar dashboard-main-content bg-white shadow-sm border border-[#E5E7EB]/30 p-3 lg:py-none lg:px-3">
//         {/* Header */}
//         <div className="flex justify-between items-center">
//           {
//             !isDesktop && <div>
//               <img src="/logo-half.png" alt="LOGO" className="w-auto h-[40px]" />
//             </div>
//           }
//           <div className="flex-1 min-w-[6rem] max-w-[10rem] lg:min-w-[11rem]  lg:max-w-[10rem] xl:max-w-[20rem]  ">
//             <DataCenterSelect
//               value={selectedDcId || ""}
//               onChange={handleDataCenterChange}
//             />
//           </div>

//           <div className="flex-1 min-w-[6rem] max-w-[10rem] lg:min-w-[11rem]  lg:max-w-[10rem] xl:max-w-[20rem]  ">
//             <RackClusterSelect
//               value={selectedClusterId || ""}
//               onChange={handleClusterChange}
//               disabled={!selectedDcId}
//             />
//           </div>



//         </div>

//           {/* <TabularView
//             racks={activeRacks}
//             selectedRackId={selectedRackId}
//             onSelect={(id) => dispatch(setSelectedRackId(id))}
//           /> */}
//         {/* Cards area */}
//         {/* <div className="flex-1 min-h-[8rem]">
//           <div className={`freezer-cards-container custom-scrollbar hide-scrollbar ${noRacks && !showSkeleton ? "no-scroll" : ""}`}>
//             {showSkeleton ? (
//               <div className="freezer-cards-grid">
//                 {Array.from({ length: 4 }).map((_, i) => <DeviceSkeleton key={i} />)}
//               </div>
//             ) : noRacks ? (
//               <div className="freezer-empty-state text-[#64748B]">
//                 <div className="flex flex-col items-center">
//                   <svg className="w-16 h-16 mb-4 text-[#E2E8F0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                   </svg>
//                   <p className="text-lg font-medium">No racks found</p>
//                   <p className="text-sm">Add racks to this Data Center or select another Data Center</p>
//                 </div>
//               </div>
//             ) : (
//               <div className="freezer-cards-grid">
//                 {activeRacks.map((rack) => (
//                   <FreezerDeviceCard */}
//                   <div className="flex-1 min-h-[8rem] bg-[#07518d1d]   rounded-4xl relative ">
                    
//           <div className="absolute right-5">

//             {/* toggle icon */}
//             <button
//               onClick={() => setViewMode(viewMode === "cards" ? "table" : "cards")}
//               className="p-2 rounded hover:bg-gray-100"
//               title={viewMode === "cards" ? "Show Table View" : "Show Card View"}
//             >
//               {viewMode === "cards" ? (
//                 <LayoutGrid className="w-auto h-[2rem] text-blue-400 z-44"/>   // tabular icon
//               ) : (
//                 <i className="fa-solid fa-border-all"></i> // card icon
//               )}
//             </button>
//           </div>
          
//                     {viewMode === "table" ? (
//                     <TabularView
//                     racks={activeRacks}
//                     selectedRackId={selectedRackId}
//                     onSelect={(id) => dispatch(setSelectedRackId(id))}
//                     />
//                     ) : (
//                     <div className={`freezer-cards-container custom-scrollbar hide-scrollbar ${noRacks && !showSkeleton ? "no-scroll" : ""}`}>
//                     {showSkeleton ? (
//                     <div className="freezer-cards-grid">
//                     {Array.from({ length: 4 }).map((_, i) => <DeviceSkeleton key={i} />)}
//                     </div>
//                     ) : noRacks ? (
//                     // <EmptyRackState />
//                     <></>
//                     ) : (
//                     <div className="freezer-cards-grid">
//                     {activeRacks.map((rack) => (
//                     <FreezerDeviceCard
//                     key={rack?._id}
//                     deviceId={rack?.name}
//                     ambientTemperature={rack.tempV}
//                     freezerTemperature={rack.humiV}
//                     batteryLow={rack?.humiA ?? false}
//                     refrigeratorAlert={rack?.tempA ?? false}
//                     onCardSelect={() => onCardSelect(rack?._id)}
//                     isSelected={String(rack?._id) === String(selectedRackId)}
//                     espHumidity={rack.humiA ?? rack?.humiV}
//                     humidityAlert={rack?.humidityAlert}
//               />
//             ))}
//             </div>
//             )}
//             </div>
//             )}
//             </div>

//         <AlertsPanel dataCenterId={selectedDcId} rackClusterId={selectedClusterId} pollInterval={POLL_MS} />
//       </div>

//       {isDesktop ? (
//         <DashboardRightPanel selectedRackId={selectedRackId} selectedDataCenterId={selectedDcId} selectedRackClusterId={selectedClusterId} />
//       ) : (
//         <Drawer open={drawerOpen} onClose={clearSelectedRack} anchor="right">
//           <DashboardRightPanel selectedRackId={selectedRackId} selectedDataCenterId={selectedDcId} selectedRackClusterId={selectedClusterId} closeIcon onClose={clearSelectedRack} />
//         </Drawer>
//       )}
//     </div>
//   );
// }





// Working fine
// src/pages/Dashboard.jsx
// import { useEffect, useMemo, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useStore } from "../../contexts/storecontexts";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useMediaQuery, Drawer } from "@mui/material";
// import "../../styles/pages/Dashboard/dashboard-styles.css"
// import "../../styles/pages/Dashboard/freezer-cards-responsive.css"
// import DataCenterSelect from "./DataCenterSelect";
// import RackClusterSelect from "./RackClusterSelect";
// import AlertsPanel from "./AlertsPanel";
// import DashboardRightPanel from "../../components/components/DashboardRightPanel";
// import { Table, LayoutGrid, CreditCard } from "lucide-react";
// import FreezerDeviceCard from "./FreezerDeviceCard";
// import DeviceSkeleton from "./DeviceSkeleton";
// import TabularView from "../../components/TabularView";


// import { fetchAllDataCenters, fetchDataCentersByUser } from "../../slices/DataCenterSlice";
// import { fetchRackClustersByDataCenter } from "../../slices/rackClusterSlice";
// import { fetchRacksByDataCenterId, fetchRacksByClusterId, fetchRackById } from "../../slices/rackSlice";
// import {
//   setSelectedDataCenterId,
//   setSelectedRackClusterId,
//   setSelectedRackId,
//   markContextFetched,
//   markAutoSelectedRack,
// } from "../../slices/uiSlice";

// const POLL_MS_DEFAULT = 5 * 60 * 1000; // fallback 5 minutes 

// export default function Dashboard() {
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { user } = useStore();
//   const isDesktop = useMediaQuery("(min-width:768px)");
//   const [drawerOpen, setDrawerOpen] = useState(false);
// const [viewMode, setViewMode] = useState("cards"); // "cards" | "table"

//   const pollRef = useRef(null);

//   // Redux slices
//   const dataCenters = useSelector((s) => s.DataCenter?.DataCenters || []);
//   const dcLoading = useSelector((s) => s.DataCenter?.loading?.fetch);
//   const clusters = useSelector((s) => s.rackCluster?.clusters || []);
//   const rackState = useSelector((s) => s.rack || { racks: [], loading: {} });
//   const ui = useSelector((s) => s.ui || {});
//   console.log("UISlice", ui);
//   const selectedDcId = ui.selectedDataCenterId;
//   const selectedClusterId = ui.selectedRackClusterId;
//   const selectedRackId = ui.selectedRackId;

//   const activeRacks = Array.isArray(rackState.racks) ? rackState.racks : [];
//   console.log("Active RACKS:", activeRacks)
//   // compute POLL_MS from user.timer or fallback
//   const POLL_MS = useMemo(() => {
//     try {
//       if (!user?.timer) return POLL_MS_DEFAULT;
//       const m = /^(\d+)(s|m)$/.exec(String(user.timer).trim());
//       if (!m) return POLL_MS_DEFAULT;
//       const v = Math.max(1, Math.min(60, parseInt(m[1], 10)));
//       return m[2] === "s" ? v * 1000 : v * 60 * 1000;
//     } catch {
//       return POLL_MS_DEFAULT;
//     }
//   }, [user?.timer]);



//   useEffect(() => {
//   if (!user?._id) return;

//   if (user.role === "admin") {
//     dispatch(fetchAllDataCenters());
//   } else {
//     dispatch(fetchDataCentersByUser(user._id));
//   }
// }, [user?._id, user?.role, dispatch]);


//   // ---------- 2) Resolve default DataCenter when list is available ----------
//   useEffect(() => {
//     if (!dataCenters || dataCenters.length === 0) return;

//     // if selection already valid, keep it
//     if (selectedDcId && dataCenters.find((d) => String(d._id) === String(selectedDcId))) return;

//     // prefer URL param ?dc=...
//     const sp = new URLSearchParams(location.search);
//     const urlDc = sp.get("dc");
//     const found = urlDc && dataCenters.find((d) => String(d._1 ?? d._id) === String(urlDc)); // defensive
//     const chosen = found ? found._id : dataCenters[0]._id;

//     dispatch(setSelectedDataCenterId(String(chosen)));
//     // push URL param so refresh/deep link works
//     sp.set("dc", String(chosen));
//     navigate(`${location.pathname}?${sp.toString()}`, { replace: true });
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [dataCenters, dispatch]); // intentionally minimal deps; selection is idempotent

//   // ---------- 3) When selected DC changes: fetch clusters and racks by DC ----------
//   // useEffect(() => {
//   //   if (!selectedDcId) return;

//   //   dispatch(fetchRackClustersByDataCenter(selectedDcId));
//   //   dispatch(fetchRacksByDataCenterId(selectedDcId));
//   //   // we rely on rackState.racks update to mark context fetched and auto-select rack
//   // }, [selectedDcId, dispatch]);


//   useEffect(() => {
//   if (!selectedDcId) return;

//   // If URL contains a cluster param, avoid fetching DC-level racks
//   const sp = new URLSearchParams(location.search);
//   const urlCluster = sp.get("cluster");

//   // Always fetch clusters (we need them to restore the cluster selection)
//   dispatch(fetchRackClustersByDataCenter(selectedDcId));

//   // Only fetch DC-level racks immediately when there is no cluster in the URL.
//   // If a cluster is present we'll wait for the cluster-restore logic to trigger the cluster fetch.
//   if (!urlCluster) {
//     dispatch(fetchRacksByDataCenterId(selectedDcId));
//   }

// }, [selectedDcId, dispatch, location.search]);



//   // Fetch racks according to active context
//   useEffect(() => {
//     // if no DC selected, nothing to do
//     if (!selectedDcId) return;

//     // Only fetch by cluster if cluster is selected
//     if (selectedClusterId) {
//       dispatch(fetchRacksByClusterId(selectedClusterId));
//     } else {
//       dispatch(fetchRacksByDataCenterId(selectedDcId));
//     }
//   },
//     // only trigger after both selectedDcId and selectedClusterId are restored
//     [selectedDcId, selectedClusterId, dispatch]);


//   // // ---------- Restore cluster selection from URL ----------
//   // useEffect(() => {
//   //   if (!clusters || clusters.length === 0) return;

//   //   const sp = new URLSearchParams(location.search);
//   //   const urlCluster = sp.get("cluster");

//   //   if (urlCluster && clusters.find(c => String(c._id) === String(urlCluster))) {
//   //     dispatch(setSelectedRackClusterId(urlCluster));
//   //   }
//   // }, [clusters, location.search, dispatch]);


//   useEffect(() => {
//   // Wait until clusters for the selected DC have been loaded (could be empty)
//   if (!clusters) return;

//   const sp = new URLSearchParams(location.search);
//   const urlCluster = sp.get("cluster");

//   if (!urlCluster) {
//     // No cluster param — nothing to restore; ensure DC-level racks are loaded
//     if (selectedDcId) dispatch(fetchRacksByDataCenterId(selectedDcId));
//     return;
//   }

//   // If cluster exists in loaded clusters, restore selection
//   const found = clusters.find((c) => String(c._id) === String(urlCluster));
//   if (found) {
//     dispatch(setSelectedRackClusterId(urlCluster));
//     return;
//   }

//   // urlCluster exists but not found in clusters -> fallback to DC-level racks
//   // (this covers cases where the URL had an invalid/old cluster id)
//   if (selectedDcId) {
//     dispatch(fetchRacksByDataCenterId(selectedDcId));
//   }
// }, [clusters, location.search, dispatch, selectedDcId]);



//   // ---------- 5) When rack list changes (either DC-level or cluster-level), auto-select first rack once ----------
//   useEffect(() => {
//     const list = Array.isArray(rackState.racks) ? rackState.racks : [];

//     // mark fetched even if empty
//     const markFetchedForCurrent = () => {
//       if (selectedClusterId) dispatch(markContextFetched({ kind: "cluster", id: selectedClusterId }));
//       else if (selectedDcId) dispatch(markContextFetched({ kind: "dc", id: selectedDcId }));
//     };

//     if (!selectedDcId && !selectedClusterId) {
//       // nothing to do
//       return;
//     }

//     if (!list || list.length === 0) {
//       markFetchedForCurrent();
//       return;
//     }

//     // if selectedRackId already valid inside list, keep it and mark fetched
//     if (selectedRackId && list.find((r) => String(r._id) === String(selectedRackId))) {
//       markFetchedForCurrent();
//       return;
//     }

//     // check if we already auto-selected for this context
//     const alreadyAutoSelected = selectedClusterId
//       ? Boolean(ui.autoSelectedRackForContext?.cluster?.[selectedClusterId])
//       : Boolean(ui.autoSelectedRackForContext?.dc?.[selectedDcId]);

//     if (alreadyAutoSelected) {
//       markFetchedForCurrent();
//       return;
//     }

//     // auto-select first rack only on desktop
//     if (isDesktop) {
//       const first = list[0];
//       if (first && first._id) {
//         dispatch(setSelectedRackId(String(first._id)));
//         dispatch(fetchRackById(String(first._id)));
//         // mark auto-select for the context
//         if (selectedClusterId) dispatch(markAutoSelectedRack({ kind: "cluster", id: selectedClusterId }));
//         else dispatch(markAutoSelectedRack({ kind: "dc", id: selectedDcId }));
//       }
//     }

//     markFetchedForCurrent();
//   }, [
//     rackState.racks,
//     selectedDcId,
//     selectedClusterId,
//     selectedRackId,
//     ui.autoSelectedRackForContext,
//     isDesktop,
//     dispatch,
//   ]);

//   // ---------- 6) When selected rack changes → ensure full details are loaded ----------
//   useEffect(() => {
//     if (!selectedRackId) return;
//     dispatch(fetchRackById(selectedRackId));
//   }, [selectedRackId, dispatch]);

//   // ---------- 7) Polling: re-fetch only the active context (DC or cluster) ----------
//   useEffect(() => {
//     // clear previous
//     if (pollRef.current) {
//       clearInterval(pollRef.current);
//       pollRef.current = null;
//     }
//     if (!selectedDcId) return;

//     const doPoll = () => {
//       if (selectedClusterId) {
//         dispatch(fetchRacksByClusterId(selectedClusterId));
//       } else {
//         dispatch(fetchRacksByDataCenterId(selectedDcId));
//       }
//       // Alerts and cluster-means polling can be added here (dispatch thunks)
//     };

//     // start poll
//     pollRef.current = setInterval(doPoll, POLL_MS);
//     return () => {
//       if (pollRef.current) clearInterval(pollRef.current);
//       pollRef.current = null;
//     };
//   }, [selectedDcId, selectedClusterId, POLL_MS, dispatch]);

//   // ---------- UI handlers ----------
//   const handleDataCenterChange = (dcId) => {
//     if (!dcId) return;
//     dispatch(setSelectedDataCenterId(dcId));
//     // update url
//     const sp = new URLSearchParams(location.search);
//     sp.set("dc", dcId);
//     // keep cluster param cleared when DC changed
//     sp.delete("cluster");
//     navigate(`${location.pathname}?${sp.toString()}`, { replace: true });
//   };

//   const handleClusterChange = (clusterId) => {
//     // user-driven only
//     dispatch(setSelectedRackClusterId(clusterId));
//     const sp = new URLSearchParams(location.search);
//     if (clusterId) sp.set("cluster", clusterId);
//     else sp.delete("cluster");
//     navigate(`${location.pathname}?${sp.toString()}`, { replace: true });
//   };

//   const onCardSelect = (rackId) => {
//     dispatch(setSelectedRackId(rackId));
//     if (!isDesktop) setDrawerOpen(true);
//   };

//   const clearSelectedRack = () => {
//     dispatch(setSelectedRackId(null));
//     setDrawerOpen(false);
//   };


//   // ---------- Render logic ----------
//   const showSkeleton = ui.isInitialContextLoad;
//   const noRacks = !activeRacks || activeRacks.length === 0;

//   return (
//     <div className="flex w-full flex-row h-full font-inter rounded-md bg-[#F5F6FA]">
//       <div className="flex-1 min-w-0 space-y-4 overflow-y-auto custom-scrollbar dashboard-main-content bg-white shadow-sm border border-[#E5E7EB]/30 p-3 lg:py-none lg:px-3">
//         {/* Header */}
//         <div className="flex justify-between items-center">
//           {
//             !isDesktop && <div>
//               <img src="/logo-half.png" alt="LOGO" className="w-auto h-[40px]" />
//             </div>
//           }
//           <div className="flex-1 min-w-[6rem] max-w-[10rem] lg:min-w-[11rem]  lg:max-w-[10rem] xl:max-w-[20rem]  ">
//             <DataCenterSelect
//               value={selectedDcId || ""}
//               onChange={handleDataCenterChange}
//             />
//           </div>

//           <div className="flex-1 min-w-[6rem] max-w-[10rem] lg:min-w-[11rem]  lg:max-w-[10rem] xl:max-w-[20rem]  ">
//             <RackClusterSelect
//               value={selectedClusterId || ""}
//               onChange={handleClusterChange}
//               disabled={!selectedDcId}
//             />
//           </div>

//  <div className="">

//             {/* toggle icon */}
//             <button
//               onClick={() => setViewMode(viewMode === "cards" ? "table" : "cards")}
//               className="p-2 rounded hover:bg-gray-100 cursor-pointer"
//               title={viewMode === "cards" ? "Show Table View" : "Show Card View"}
//             >
//               {viewMode === "cards" ? (
//                 <LayoutGrid className="w-auto h-[2rem] text-blue-400 z-44"/>   // tabular icon
//               ) : (
//                 <CreditCard className="w-auto h-[2rem] text-blue-400 z-44" /> // card icon
//               )}
//             </button>
//           </div>

//         </div>

     
//                   <div className=" rack-view-container flex-1 min-h-full bg-[#07518d1d]   rounded-4xl relative ">
                    
         
          
//                     {viewMode === "table" ? (
//                     <TabularView
//                     racks={activeRacks}
//                     selectedRackId={selectedRackId}
//                     onSelect={(id) => dispatch(setSelectedRackId(id))}
//                     />
//                     ) : (
//                     <div className={`freezer-cards-container custom-scrollbar hide-scrollbar ${noRacks && !showSkeleton ? "no-scroll" : ""}`}>
//                     {showSkeleton ? (
//                     <div className="freezer-cards-grid">
//                     {Array.from({ length: 4 }).map((_, i) => <DeviceSkeleton key={i} />)}
//                     </div>
//                     ) : noRacks ? (
//                     // <EmptyRackState />
//                     <></>
//                     ) : (
//                     <div className="freezer-cards-grid">
//                     {activeRacks.map((rack) => (
//                     <FreezerDeviceCard
//                     key={rack?._id}
//                     deviceId={rack?.name}
//                     ambientTemperature={rack.tempV}
//                     freezerTemperature={rack.humiV}
//                     batteryLow={rack?.humiA ?? false}
//                     refrigeratorAlert={rack?.tempA ?? false}
//                     onCardSelect={() => onCardSelect(rack?._id)}
//                     isSelected={String(rack?._id) === String(selectedRackId)}
//                     espHumidity={rack.humiA ?? rack?.humiV}
//                     humidityAlert={rack?.humidityAlert}
//               />
//             ))}
//             </div>
//             )}
//             </div>
//             )}
//             </div>

//         <AlertsPanel dataCenterId={selectedDcId} rackClusterId={selectedClusterId} pollInterval={POLL_MS} />
//       </div>

//       {isDesktop ? (
//         <DashboardRightPanel selectedRackId={selectedRackId} selectedDataCenterId={selectedDcId} selectedRackClusterId={selectedClusterId} />
//       ) : (
//         <Drawer open={drawerOpen} onClose={clearSelectedRack} anchor="right">
//           <DashboardRightPanel selectedRackId={selectedRackId} selectedDataCenterId={selectedDcId} selectedRackClusterId={selectedClusterId} closeIcon onClose={clearSelectedRack} />
//         </Drawer>
//       )}
//     </div>
//   );
// }















// // Working fine Maybe the above will working fine
// // src/pages/Dashboard.jsx
// import { useEffect, useMemo, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useStore } from "../../contexts/storecontexts";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useMediaQuery, Drawer } from "@mui/material";
// import "../../styles/pages/Dashboard/dashboard-styles.css"
// import "../../styles/pages/Dashboard/freezer-cards-responsive.css"
// import DataCenterSelect from "./DataCenterSelect";
// import RackClusterSelect from "./RackClusterSelect";
// import AlertsPanel from "./AlertsPanel";
// import DashboardRightPanel from "../../components/components/DashboardRightPanel";
// import { Table, LayoutGrid, CreditCard } from "lucide-react";
// import FreezerDeviceCard from "./FreezerDeviceCard";
// import DeviceSkeleton from "./DeviceSkeleton";
// import TabularView from "../../components/TabularView";


// import { fetchAllDataCenters, fetchDataCentersByUser } from "../../slices/DataCenterSlice";
// import { fetchRackClustersByDataCenter } from "../../slices/rackClusterSlice";
// import { fetchRacksByDataCenterId, fetchRacksByClusterId, fetchRackById } from "../../slices/rackSlice";
// import {
//   setSelectedDataCenterId,
//   setSelectedRackClusterId,
//   setSelectedRackId,
//   markContextFetched,
//   markAutoSelectedRack,
// } from "../../slices/uiSlice";

// const POLL_MS_DEFAULT = 5 * 60 * 1000; // fallback 5 minutes 

// export default function Dashboard() {
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { user } = useStore();
//   const isDesktop = useMediaQuery("(min-width:768px)");
//   const [drawerOpen, setDrawerOpen] = useState(false);
// const [viewMode, setViewMode] = useState("cards"); // "cards" | "table"

//   const pollRef = useRef(null);

//   // Redux slices
//   const dataCenters = useSelector((s) => s.DataCenter?.DataCenters || []);
//   const dcLoading = useSelector((s) => s.DataCenter?.loading?.fetch);
//   const clusters = useSelector((s) => s.rackCluster?.clusters || []);
//   const rackState = useSelector((s) => s.rack || { racks: [], loading: {} });
//   const ui = useSelector((s) => s.ui || {});
//   console.log("UISlice", ui);
//   const selectedDcId = ui.selectedDataCenterId;
//   const selectedClusterId = ui.selectedRackClusterId;
//   const selectedRackId = ui.selectedRackId;

//   const activeRacks = Array.isArray(rackState.racks) ? rackState.racks : [];
//   console.log("Active RACKS:", activeRacks)
//   // compute POLL_MS from user.timer or fallback
//   const POLL_MS = useMemo(() => {
//     try {
//       if (!user?.timer) return POLL_MS_DEFAULT;
//       const m = /^(\d+)(s|m)$/.exec(String(user.timer).trim());
//       if (!m) return POLL_MS_DEFAULT;
//       const v = Math.max(1, Math.min(60, parseInt(m[1], 10)));
//       return m[2] === "s" ? v * 1000 : v * 60 * 1000;
//     } catch {
//       return POLL_MS_DEFAULT;
//     }
//   }, [user?.timer]);

  
// // resolve "real" datacenter id expected by backend (DataCenterModel._id)
// const getEffectiveDataCenterId = (maybeAssignedId) => {
//   if (!maybeAssignedId) return null;
//   // find selected item in DataCenters array
//   const item = dataCenters.find((d) => String(d._id) === String(maybeAssignedId));
//   if (!item) return maybeAssignedId; // fallback (maybe it's already the real id)
//   // if it's an assignment object that contains dataCenterId, use its nested _id
//   if (item.dataCenterId && (item.dataCenterId._id || item.dataCenterId)) {
//     return String(item.dataCenterId._id ?? item.dataCenterId);
//   }
//   // otherwise item._id is already the real datacenter id (admin case)
//   return String(item._id);
// };




//   useEffect(() => {
//   if (!user?._id) return;

//   if (user.role === "admin") {
//     dispatch(fetchAllDataCenters());
//   } else {
//     dispatch(fetchDataCentersByUser(user._id));
//   }
// }, [user?._id, user?.role, dispatch]);


//   // ---------- 2) Resolve default DataCenter when list is available ----------
//   useEffect(() => {
//     if (!dataCenters || dataCenters.length === 0) return;

//     // if selection already valid, keep it
//     if (selectedDcId && dataCenters.find((d) => String(d._id) === String(selectedDcId))) return;

//     // prefer URL param ?dc=...
//     const sp = new URLSearchParams(location.search);
//     const urlDc = sp.get("dc");
//     const found = urlDc && dataCenters.find((d) => String(d._1 ?? d._id) === String(urlDc)); // defensive
//     const chosen = found ? found._id : dataCenters[0]._id;

//     dispatch(setSelectedDataCenterId(String(chosen)));
//     // push URL param so refresh/deep link works
//     sp.set("dc", String(chosen));
//     navigate(`${location.pathname}?${sp.toString()}`, { replace: true });
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [dataCenters, dispatch]); // intentionally minimal deps; selection is idempotent

//   // ---------- 3) When selected DC changes: fetch clusters and racks by DC ----------
//   // useEffect(() => {
//   //   if (!selectedDcId) return;

//   //   dispatch(fetchRackClustersByDataCenter(selectedDcId));
//   //   dispatch(fetchRacksByDataCenterId(selectedDcId));
//   //   // we rely on rackState.racks update to mark context fetched and auto-select rack
//   // }, [selectedDcId, dispatch]);


// //   useEffect(() => {
// //   if (!selectedDcId) return;

// //   // If URL contains a cluster param, avoid fetching DC-level racks
// //   const sp = new URLSearchParams(location.search);
// //   const urlCluster = sp.get("cluster");

// //   // Always fetch clusters (we need them to restore the cluster selection)
// //   dispatch(fetchRackClustersByDataCenter(selectedDcId));

// //   // Only fetch DC-level racks immediately when there is no cluster in the URL.
// //   // If a cluster is present we'll wait for the cluster-restore logic to trigger the cluster fetch.
// //   if (!urlCluster) {
// //     dispatch(fetchRacksByDataCenterId(selectedDcId));
// //   }

// // }, [selectedDcId, dispatch, location.search]);



// useEffect(() => {
//   if (!selectedDcId) return;

//   const sp = new URLSearchParams(location.search);
//   const urlCluster = sp.get("cluster");

//   const realDcId = getEffectiveDataCenterId(selectedDcId);
//   if (!realDcId) return;

//   // fetch clusters for the real data center id
//   dispatch(fetchRackClustersByDataCenter(realDcId));

//   // fetch DC-level racks only when no cluster param
//   if (!urlCluster) {
//     dispatch(fetchRacksByDataCenterId(realDcId));
//   }
// }, [selectedDcId, dispatch, location.search, /* add dataCenters so helper sees latest list */ dataCenters]);


//   // Fetch racks according to active context
//   useEffect(() => {
//     // if no DC selected, nothing to do
//     if (!selectedDcId) return;

//     // Only fetch by cluster if cluster is selected
//     // if (selectedClusterId) {
//     //   dispatch(fetchRacksByClusterId(selectedClusterId));
//     // } else {
//     //   dispatch(fetchRacksByDataCenterId(selectedDcId));
//     // }

//     if (selectedClusterId) {
//   dispatch(fetchRacksByClusterId(selectedClusterId));
// } else {
//   const realDcId = getEffectiveDataCenterId(selectedDcId);
//   if (realDcId) dispatch(fetchRacksByDataCenterId(realDcId));
// }

//   },
//     // only trigger after both selectedDcId and selectedClusterId are restored
//     [selectedDcId, selectedClusterId, dispatch]);


//   // // ---------- Restore cluster selection from URL ----------
//   // useEffect(() => {
//   //   if (!clusters || clusters.length === 0) return;

//   //   const sp = new URLSearchParams(location.search);
//   //   const urlCluster = sp.get("cluster");

//   //   if (urlCluster && clusters.find(c => String(c._id) === String(urlCluster))) {
//   //     dispatch(setSelectedRackClusterId(urlCluster));
//   //   }
//   // }, [clusters, location.search, dispatch]);


//   useEffect(() => {
//   // Wait until clusters for the selected DC have been loaded (could be empty)
//   if (!clusters) return;

//   const sp = new URLSearchParams(location.search);
//   const urlCluster = sp.get("cluster");

//   if (!urlCluster) {
//     // No cluster param — nothing to restore; ensure DC-level racks are loaded
//     if (selectedDcId) dispatch(fetchRacksByDataCenterId(selectedDcId));
//     return;
//   }

//   // If cluster exists in loaded clusters, restore selection
//   const found = clusters.find((c) => String(c._id) === String(urlCluster));
//   if (found) {
//     dispatch(setSelectedRackClusterId(urlCluster));
//     return;
//   }

//   // urlCluster exists but not found in clusters -> fallback to DC-level racks
//   // (this covers cases where the URL had an invalid/old cluster id)
//   if (selectedDcId) {
//     dispatch(fetchRacksByDataCenterId(selectedDcId));
//   }
// }, [clusters, location.search, dispatch, selectedDcId]);



//   // ---------- 5) When rack list changes (either DC-level or cluster-level), auto-select first rack once ----------
//   useEffect(() => {
//     const list = Array.isArray(rackState.racks) ? rackState.racks : [];

//     // mark fetched even if empty
//     const markFetchedForCurrent = () => {
//       if (selectedClusterId) dispatch(markContextFetched({ kind: "cluster", id: selectedClusterId }));
//       else if (selectedDcId) dispatch(markContextFetched({ kind: "dc", id: selectedDcId }));
//     };

//     if (!selectedDcId && !selectedClusterId) {
//       // nothing to do
//       return;
//     }

//     if (!list || list.length === 0) {
//       markFetchedForCurrent();
//       return;
//     }

//     // if selectedRackId already valid inside list, keep it and mark fetched
//     if (selectedRackId && list.find((r) => String(r._id) === String(selectedRackId))) {
//       markFetchedForCurrent();
//       return;
//     }

//     // check if we already auto-selected for this context
//     const alreadyAutoSelected = selectedClusterId
//       ? Boolean(ui.autoSelectedRackForContext?.cluster?.[selectedClusterId])
//       : Boolean(ui.autoSelectedRackForContext?.dc?.[selectedDcId]);

//     if (alreadyAutoSelected) {
//       markFetchedForCurrent();
//       return;
//     }

//     // auto-select first rack only on desktop
//     if (isDesktop) {
//       const first = list[0];
//       if (first && first._id) {
//         dispatch(setSelectedRackId(String(first._id)));
//         dispatch(fetchRackById(String(first._id)));
//         // mark auto-select for the context
//         if (selectedClusterId) dispatch(markAutoSelectedRack({ kind: "cluster", id: selectedClusterId }));
//         else dispatch(markAutoSelectedRack({ kind: "dc", id: selectedDcId }));
//       }
//     }

//     markFetchedForCurrent();
//   }, [
//     rackState.racks,
//     selectedDcId,
//     selectedClusterId,
//     selectedRackId,
//     ui.autoSelectedRackForContext,
//     isDesktop,
//     dispatch,
//   ]);

//   // ---------- 6) When selected rack changes → ensure full details are loaded ----------
//   useEffect(() => {
//     if (!selectedRackId) return;
//     dispatch(fetchRackById(selectedRackId));
//   }, [selectedRackId, dispatch]);

//   // ---------- 7) Polling: re-fetch only the active context (DC or cluster) ----------
//   useEffect(() => {
//     // clear previous
//     if (pollRef.current) {
//       clearInterval(pollRef.current);
//       pollRef.current = null;
//     }
//     if (!selectedDcId) return;

//     const doPoll = () => {
//       if (selectedClusterId) {
//         dispatch(fetchRacksByClusterId(selectedClusterId));
//       } else {
//         dispatch(fetchRacksByDataCenterId(selectedDcId));
//       }
//       // Alerts and cluster-means polling can be added here (dispatch thunks)
//     };

//     // start poll
//     pollRef.current = setInterval(doPoll, POLL_MS);
//     return () => {
//       if (pollRef.current) clearInterval(pollRef.current);
//       pollRef.current = null;
//     };
//   }, [selectedDcId, selectedClusterId, POLL_MS, dispatch]);

//   // ---------- UI handlers ----------
//   const handleDataCenterChange = (dcId) => {
//     if (!dcId) return;
//     dispatch(setSelectedDataCenterId(dcId));
//     // update url
//     const sp = new URLSearchParams(location.search);
//     sp.set("dc", dcId);
//     // keep cluster param cleared when DC changed
//     sp.delete("cluster");
//     navigate(`${location.pathname}?${sp.toString()}`, { replace: true });
//   };

//   const handleClusterChange = (clusterId) => {
//     // user-driven only
//     dispatch(setSelectedRackClusterId(clusterId));
//     const sp = new URLSearchParams(location.search);
//     if (clusterId) sp.set("cluster", clusterId);
//     else sp.delete("cluster");
//     navigate(`${location.pathname}?${sp.toString()}`, { replace: true });
//   };

//   const onCardSelect = (rackId) => {
//     dispatch(setSelectedRackId(rackId));
//     if (!isDesktop) setDrawerOpen(true);
//   };

//   const clearSelectedRack = () => {
//     dispatch(setSelectedRackId(null));
//     setDrawerOpen(false);
//   };


//   // ---------- Render logic ----------
//   const showSkeleton = ui.isInitialContextLoad;
//   const noRacks = !activeRacks || activeRacks.length === 0;

//   return (
//     <div className="flex w-full flex-row h-full font-inter rounded-md bg-[#F5F6FA]">
//       <div className="flex-1 min-w-0 space-y-4 overflow-y-auto custom-scrollbar dashboard-main-content bg-white shadow-sm border border-[#E5E7EB]/30 p-3 lg:py-none lg:px-3">
//         {/* Header */}
//         <div className="flex justify-between items-center">
//           {
//             !isDesktop && <div>
//               <img src="/logo-half.png" alt="LOGO" className="w-auto h-[40px]" />
//             </div>
//           }
//           <div className="flex-1 min-w-[6rem] max-w-[10rem] lg:min-w-[11rem]  lg:max-w-[10rem] xl:max-w-[20rem]  ">
//             <DataCenterSelect
//               value={selectedDcId || ""}
//               onChange={handleDataCenterChange}
//             />
//           </div>

//           <div className="flex-1 min-w-[6rem] max-w-[10rem] lg:min-w-[11rem]  lg:max-w-[10rem] xl:max-w-[20rem]  ">
//             <RackClusterSelect
//               value={selectedClusterId || ""}
//               onChange={handleClusterChange}
//               disabled={!selectedDcId}
//             />
//           </div>

//  <div className="">

//             {/* toggle icon */}
//             <button
//               onClick={() => setViewMode(viewMode === "cards" ? "table" : "cards")}
//               className="p-2 rounded hover:bg-gray-100 cursor-pointer"
//               title={viewMode === "cards" ? "Show Table View" : "Show Card View"}
//             >
//               {viewMode === "cards" ? (
//                 <LayoutGrid className="w-auto h-[2rem] text-blue-400 z-44"/>   // tabular icon
//               ) : (
//                 <CreditCard className="w-auto h-[2rem] text-blue-400 z-44" /> // card icon
//               )}
//             </button>
//           </div>

//         </div>

     
//                   <div className=" rack-view-container flex-1 min-h-full bg-[#07518d1d]   rounded-4xl relative ">
                    
         
          
//                     {viewMode === "table" ? (
//                     <TabularView
//                     racks={activeRacks}
//                     selectedRackId={selectedRackId}
//                     onSelect={(id) => dispatch(setSelectedRackId(id))}
//                     />
//                     ) : (
//                     <div className={`freezer-cards-container custom-scrollbar hide-scrollbar ${noRacks && !showSkeleton ? "no-scroll" : ""}`}>
//                     {showSkeleton ? (
//                     <div className="freezer-cards-grid">
//                     {Array.from({ length: 4 }).map((_, i) => <DeviceSkeleton key={i} />)}
//                     </div>
//                     ) : noRacks ? (
//                     // <EmptyRackState />
//                     <></>
//                     ) : (
//                     <div className="freezer-cards-grid">
//                     {activeRacks.map((rack) => (
//                     <FreezerDeviceCard
//                     key={rack?._id}
//                     deviceId={rack?.name}
//                     ambientTemperature={rack.tempV}
//                     freezerTemperature={rack.humiV}
//                     batteryLow={rack?.humiA ?? false}
//                     refrigeratorAlert={rack?.tempA ?? false}
//                     onCardSelect={() => onCardSelect(rack?._id)}
//                     isSelected={String(rack?._id) === String(selectedRackId)}
//                     espHumidity={rack.humiA ?? rack?.humiV}
//                     humidityAlert={rack?.humidityAlert}
//               />
//             ))}
//             </div>
//             )}
//             </div>
//             )}
//             </div>

//         <AlertsPanel dataCenterId={selectedDcId} rackClusterId={selectedClusterId} pollInterval={POLL_MS} />
//       </div>

//       {isDesktop ? (
//         <DashboardRightPanel selectedRackId={selectedRackId} selectedDataCenterId={selectedDcId} selectedRackClusterId={selectedClusterId} />
//       ) : (
//         <Drawer open={drawerOpen} onClose={clearSelectedRack} anchor="right">
//           <DashboardRightPanel selectedRackId={selectedRackId} selectedDataCenterId={selectedDcId} selectedRackClusterId={selectedClusterId} closeIcon onClose={clearSelectedRack} />
//         </Drawer>
//       )}
//     </div>
//   );
// }











// // Working fine Maybe the above will working fine
// // src/pages/Dashboard.jsx
// import { useEffect, useMemo, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useStore } from "../../contexts/storecontexts";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useMediaQuery, Drawer } from "@mui/material";
// import "../../styles/pages/Dashboard/dashboard-styles.css"
// import "../../styles/pages/Dashboard/freezer-cards-responsive.css"
// import DataCenterSelect from "./DataCenterSelect";
// import RackClusterSelect from "./RackClusterSelect";
// import AlertsPanel from "./AlertsPanel";
// import DashboardRightPanel from "../../components/components/DashboardRightPanel";
// import { Table, LayoutGrid, CreditCard } from "lucide-react";
// import FreezerDeviceCard from "./FreezerDeviceCard";
// import DeviceSkeleton from "./DeviceSkeleton";
// import TabularView from "../../components/TabularView";


// import { fetchAllDataCenters, fetchDataCentersByUser } from "../../slices/DataCenterSlice";
// import { fetchRackClustersByDataCenter } from "../../slices/rackClusterSlice";
// import { fetchRacksByDataCenterId, fetchRacksByClusterId, fetchRackById } from "../../slices/rackSlice";
// import {
//   setSelectedDataCenterId,
//   setSelectedRackClusterId,
//   setSelectedRackId,
//   markContextFetched,
//   markAutoSelectedRack,
// } from "../../slices/uiSlice";

// const POLL_MS_DEFAULT = 5 * 60 * 1000; // fallback 5 minutes 

// export default function Dashboard() {
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { user } = useStore();
//   const isDesktop = useMediaQuery("(min-width:768px)");
//   const [drawerOpen, setDrawerOpen] = useState(false);
// const [viewMode, setViewMode] = useState("cards"); // "cards" | "table"

//   const pollRef = useRef(null);

//   // Redux slices
//   const dataCenters = useSelector((s) => s.DataCenter?.DataCenters || []);
//   const dcLoading = useSelector((s) => s.DataCenter?.loading?.fetch);
//   const clusters = useSelector((s) => s.rackCluster?.clusters || []);
//   const rackState = useSelector((s) => s.rack || { racks: [], loading: {} });
//   const ui = useSelector((s) => s.ui || {});
//   console.log("UISlice", ui);
//   const selectedDcId = ui.selectedDataCenterId;
//   const selectedClusterId = ui.selectedRackClusterId;
//   const selectedRackId = ui.selectedRackId;

//   const activeRacks = Array.isArray(rackState.racks) ? rackState.racks : [];
//   console.log("Active RACKS:", activeRacks)
//   // compute POLL_MS from user.timer or fallback
//   const POLL_MS = useMemo(() => {
//     try {
//       if (!user?.timer) return POLL_MS_DEFAULT;
//       const m = /^(\d+)(s|m)$/.exec(String(user.timer).trim());
//       if (!m) return POLL_MS_DEFAULT;
//       const v = Math.max(1, Math.min(60, parseInt(m[1], 10)));
//       return m[2] === "s" ? v * 1000 : v * 60 * 1000;
//     } catch {
//       return POLL_MS_DEFAULT;
//     }
//   }, [user?.timer]);

  
// // resolve "real" datacenter id expected by backend (DataCenterModel._id)
// // const getEffectiveDataCenterId = (maybeAssignedId) => {
// //   if (!maybeAssignedId) return null;
// //   // find selected item in DataCenters array
// //   const item = dataCenters.find((d) => String(d._id) === String(maybeAssignedId));
// //   if (!item) return maybeAssignedId; // fallback (maybe it's already the real id)
// //   // if it's an assignment object that contains dataCenterId, use its nested _id
// //   if (item.dataCenterId && (item.dataCenterId._id || item.dataCenterId)) {
// //     return String(item.dataCenterId._id ?? item.dataCenterId);
// //   }
// //   // otherwise item._id is already the real datacenter id (admin case)
// //   return String(item._id);
// // };




// // getEffectiveDataCenterId 

// const getEffectiveDataCenterId = (maybeAssignedId) => {
//   if (!maybeAssignedId) return null;

//   const item = dataCenters.find((d) => String(d._id) === String(maybeAssignedId));
//   if (!item) return maybeAssignedId; // fallback, maybe real ID already

//   // role-based logic: user/manager -> dataCenterId, admin -> _id
//   if (user?.role === "user" || user?.role === "manager") {
//     return String(item.dataCenterId?._id ?? item.dataCenterId);
//   }

//   // admin case
//   return String(item._id);
// };



// const realDcId  = getEffectiveDataCenterId(selectedDcId);


//   useEffect(() => {
//   if (!user?._id) return;

//   if (user.role === "admin") {
//     dispatch(fetchAllDataCenters());
//   } else {
//     dispatch(fetchDataCentersByUser(user._id));
//   }
// }, [user?._id, user?.role, dispatch]);


//   // ---------- 2) Resolve default DataCenter when list is available ----------
//   // useEffect(() => {
//   //   if (!dataCenters || dataCenters.length === 0) return;

//   //   // if selection already valid, keep it
//   //   if (selectedDcId && dataCenters.find((d) => String(d._id) === String(selectedDcId))) return;

//   //   // prefer URL param ?dc=...
//   //   const sp = new URLSearchParams(location.search);
//   //   const urlDc = sp.get("dc");
//   //   const found = urlDc && dataCenters.find((d) => String(d._1 ?? d._id) === String(urlDc)); // defensive
//   //   const chosen = found ? found._id : dataCenters[0]._id;

//   //   dispatch(setSelectedDataCenterId(String(chosen)));
//   //   // push URL param so refresh/deep link works
//   //   sp.set("dc", String(chosen));
//   //   navigate(`${location.pathname}?${sp.toString()}`, { replace: true });
//   //   // eslint-disable-next-line react-hooks/exhaustive-deps
//   // }, [dataCenters, dispatch]); // intentionally minimal deps; selection is idempotent




//   // ---------- 2) Resolve default DataCenter when list is available ----------
// useEffect(() => {
//   if (!dataCenters || dataCenters.length === 0) return;

//   // if selection already valid, keep it (compare to both top-level and nested ids)
//   if (selectedDcId) {
//     const stillValid = dataCenters.some(
//       (d) =>
//         String(d._id) === String(selectedDcId) ||
//         String(d?.dataCenterId?._id || d?.dataCenterId) === String(selectedDcId)
//     );
//     if (stillValid) return;
//   }

//   const sp = new URLSearchParams(location.search);
//   const urlDc = sp.get("dc");

//   // find item by top-level or nested id
//   const found = urlDc
//     ? dataCenters.find(
//         (d) =>
//           String(d._id) === String(urlDc) ||
//           String(d?.dataCenterId?._id || d?.dataCenterId) === String(urlDc)
//       )
//     : null;

//   // choose first option's effective id if url not found
//   const pick = found
//     ? // compute option id for selection (role-aware)
//       (user?.role === "admin" ? found._id : (found.dataCenterId?._id || found.dataCenterId || found._id))
//     : // fallback to first loaded option (role-aware)
//       (user?.role === "admin"
//         ? dataCenters[0]._id
//         : (dataCenters[0]?.dataCenterId?._id || dataCenters[0]?.dataCenterId || dataCenters[0]._id));

//   if (!pick) return;

//   dispatch(setSelectedDataCenterId(String(pick)));
//   sp.set("dc", String(pick));
//   navigate(`${location.pathname}?${sp.toString()}`, { replace: true });
//   // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [dataCenters, dispatch]);




//   // ---------- 3) When selected DC changes: fetch clusters and racks by DC ----------
//   // useEffect(() => {
//   //   if (!selectedDcId) return;

//   //   dispatch(fetchRackClustersByDataCenter(selectedDcId));
//   //   dispatch(fetchRacksByDataCenterId(selectedDcId));
//   //   // we rely on rackState.racks update to mark context fetched and auto-select rack
//   // }, [selectedDcId, dispatch]);


// //   useEffect(() => {
// //   if (!selectedDcId) return;

// //   // If URL contains a cluster param, avoid fetching DC-level racks
// //   const sp = new URLSearchParams(location.search);
// //   const urlCluster = sp.get("cluster");

// //   // Always fetch clusters (we need them to restore the cluster selection)
// //   dispatch(fetchRackClustersByDataCenter(selectedDcId));

// //   // Only fetch DC-level racks immediately when there is no cluster in the URL.
// //   // If a cluster is present we'll wait for the cluster-restore logic to trigger the cluster fetch.
// //   if (!urlCluster) {
// //     dispatch(fetchRacksByDataCenterId(selectedDcId));
// //   }

// // }, [selectedDcId, dispatch, location.search]);



// useEffect(() => {
//   if (!selectedDcId) return;

//   const sp = new URLSearchParams(location.search);
//   const urlCluster = sp.get("cluster");

//   const realDcId = getEffectiveDataCenterId(selectedDcId);
//   if (!realDcId) return;

//   // fetch clusters for the real data center id
//   dispatch(fetchRackClustersByDataCenter(realDcId));

//   // fetch DC-level racks only when no cluster param
//   if (!urlCluster) {
//     dispatch(fetchRacksByDataCenterId(realDcId));
//   }
// }, [selectedDcId, dispatch, location.search, /* add dataCenters so helper sees latest list */ dataCenters]);


//   // Fetch racks according to active context
//   useEffect(() => {
//     // if no DC selected, nothing to do
//     if (!selectedDcId) return;

//     // Only fetch by cluster if cluster is selected
//     // if (selectedClusterId) {
//     //   dispatch(fetchRacksByClusterId(selectedClusterId));
//     // } else {
//     //   dispatch(fetchRacksByDataCenterId(selectedDcId));
//     // }

//     if (selectedClusterId) {
//   dispatch(fetchRacksByClusterId(selectedClusterId));
// } else {
//   const realDcId = getEffectiveDataCenterId(selectedDcId);
//   if (realDcId) dispatch(fetchRacksByDataCenterId(realDcId));
// }

//   },
//     // only trigger after both selectedDcId and selectedClusterId are restored
//     [selectedDcId, selectedClusterId, dispatch]);


//   // // ---------- Restore cluster selection from URL ----------
//   // useEffect(() => {
//   //   if (!clusters || clusters.length === 0) return;

//   //   const sp = new URLSearchParams(location.search);
//   //   const urlCluster = sp.get("cluster");

//   //   if (urlCluster && clusters.find(c => String(c._id) === String(urlCluster))) {
//   //     dispatch(setSelectedRackClusterId(urlCluster));
//   //   }
//   // }, [clusters, location.search, dispatch]);


//   useEffect(() => {
//   // Wait until clusters for the selected DC have been loaded (could be empty)
//   if (!clusters) return;

//   const sp = new URLSearchParams(location.search);
//   const urlCluster = sp.get("cluster");

//   if (!urlCluster) {
//     // No cluster param — nothing to restore; ensure DC-level racks are loaded
//     // if (selectedDcId) dispatch(fetchRacksByDataCenterId(selectedDcId));
//     if (selectedDcId) dispatch(fetchRacksByDataCenterId(realDcId));
//     return;
//   }

//   // If cluster exists in loaded clusters, restore selection
//   const found = clusters.find((c) => String(c._id) === String(urlCluster));
//   if (found) {
//     dispatch(setSelectedRackClusterId(urlCluster));
//     return;
//   }

//   // urlCluster exists but not found in clusters -> fallback to DC-level racks
//   // (this covers cases where the URL had an invalid/old cluster id)
//   if (selectedDcId) {
//     dispatch(fetchRacksByDataCenterId(realDcId));
//   }
// }, [clusters, location.search, dispatch, selectedDcId]);



//   // ---------- 5) When rack list changes (either DC-level or cluster-level), auto-select first rack once ----------
//   useEffect(() => {
//     const list = Array.isArray(rackState.racks) ? rackState.racks : [];

//     // mark fetched even if empty
//     const markFetchedForCurrent = () => {
//       if (selectedClusterId) dispatch(markContextFetched({ kind: "cluster", id: selectedClusterId }));
//       else if (selectedDcId) dispatch(markContextFetched({ kind: "dc", id: selectedDcId }));
//     };

//     if (!selectedDcId && !selectedClusterId) {
//       // nothing to do
//       return;
//     }

//     if (!list || list.length === 0) {
//       markFetchedForCurrent();
//       return;
//     }

//     // if selectedRackId already valid inside list, keep it and mark fetched
//     if (selectedRackId && list.find((r) => String(r._id) === String(selectedRackId))) {
//       markFetchedForCurrent();
//       return;
//     }

//     // check if we already auto-selected for this context
//     const alreadyAutoSelected = selectedClusterId
//       ? Boolean(ui.autoSelectedRackForContext?.cluster?.[selectedClusterId])
//       : Boolean(ui.autoSelectedRackForContext?.dc?.[selectedDcId]);

//     if (alreadyAutoSelected) {
//       markFetchedForCurrent();
//       return;
//     }

//     // auto-select first rack only on desktop
//     if (isDesktop) {
//       const first = list[0];
//       if (first && first._id) {
//         dispatch(setSelectedRackId(String(first._id)));
//         dispatch(fetchRackById(String(first._id)));
//         // mark auto-select for the context
//         if (selectedClusterId) dispatch(markAutoSelectedRack({ kind: "cluster", id: selectedClusterId }));
//         else dispatch(markAutoSelectedRack({ kind: "dc", id: selectedDcId }));
//       }
//     }

//     markFetchedForCurrent();
//   }, [
//     rackState.racks,
//     selectedDcId,
//     selectedClusterId,
//     selectedRackId,
//     ui.autoSelectedRackForContext,
//     isDesktop,
//     dispatch,
//   ]);

//   // ---------- 6) When selected rack changes → ensure full details are loaded ----------
//   useEffect(() => {
//     if (!selectedRackId) return;
//     dispatch(fetchRackById(selectedRackId));
//   }, [selectedRackId, dispatch]);

//   // ---------- 7) Polling: re-fetch only the active context (DC or cluster) ----------
//   useEffect(() => {
//     // clear previous
//     if (pollRef.current) {
//       clearInterval(pollRef.current);
//       pollRef.current = null;
//     }
//     if (!selectedDcId) return;

//     const doPoll = () => {
//       if (selectedClusterId) {
//         dispatch(fetchRacksByClusterId(selectedClusterId));
//       } else {
//         dispatch(fetchRacksByDataCenterId(realDcId));
//       }
//       // Alerts and cluster-means polling can be added here (dispatch thunks)
//     };

//     // start poll
//     pollRef.current = setInterval(doPoll, POLL_MS);
//     return () => {
//       if (pollRef.current) clearInterval(pollRef.current);
//       pollRef.current = null;
//     };
//   }, [selectedDcId, selectedClusterId, POLL_MS, dispatch]);

//   // ---------- UI handlers ----------
//   const handleDataCenterChange = (dcId) => {
//     if (!dcId) return;
//     dispatch(setSelectedDataCenterId(dcId));
//     // update url
//     const sp = new URLSearchParams(location.search);
//     sp.set("dc", dcId);
//     // keep cluster param cleared when DC changed
//     sp.delete("cluster");
//     navigate(`${location.pathname}?${sp.toString()}`, { replace: true });
//   };

//   const handleClusterChange = (clusterId) => {
//     // user-driven only
//     dispatch(setSelectedRackClusterId(clusterId));
//     const sp = new URLSearchParams(location.search);
//     if (clusterId) sp.set("cluster", clusterId);
//     else sp.delete("cluster");
//     navigate(`${location.pathname}?${sp.toString()}`, { replace: true });
//   };

//   const onCardSelect = (rackId) => {
//     dispatch(setSelectedRackId(rackId));
//     if (!isDesktop) setDrawerOpen(true);
//   };

//   const clearSelectedRack = () => {
//     dispatch(setSelectedRackId(null));
//     setDrawerOpen(false);
//   };


//   // ---------- Render logic ----------
//   const showSkeleton = ui.isInitialContextLoad;
//   const noRacks = !activeRacks || activeRacks.length === 0;

//   return (
//     <div className="flex w-full flex-row h-full font-inter rounded-md bg-[#F5F6FA]">
//       <div className="flex-1 min-w-0 space-y-4 overflow-y-auto custom-scrollbar dashboard-main-content bg-white shadow-sm border border-[#E5E7EB]/30 p-3 lg:py-none lg:px-3">
//         {/* Header */}
//         <div className="flex justify-between items-center gap-1">
//           {
//             !isDesktop && <div>
//               <img src="/logo-half.png" alt="LOGO" className="w-auto h-[40px] px-2 " />
//             </div>
//           }
//           <div className="flex-1 min-w-[6rem] max-w-[10rem] lg:min-w-[11rem]  lg:max-w-[10rem] xl:max-w-[20rem]  ">
//             <DataCenterSelect
//               value={selectedDcId || ""}
//               onChange={handleDataCenterChange}
//             />
//           </div>

//           <div className="flex-1 min-w-[6rem] max-w-[10rem] lg:min-w-[11rem]  lg:max-w-[10rem] xl:max-w-[20rem]  ">
//             <RackClusterSelect
//               value={selectedClusterId || ""}
//               onChange={handleClusterChange}
//               disabled={!selectedDcId}
//             />
//           </div>

//  <div className="">

//             {/* toggle icon */}
//             <button
//               onClick={() => setViewMode(viewMode === "cards" ? "table" : "cards")}
//               className="p-2 rounded hover:bg-gray-100 cursor-pointer"
//               title={viewMode === "cards" ? "Show Table View" : "Show Card View"}
//             >
//               {viewMode === "cards" ? (
//                 <LayoutGrid className="w-auto h-[2rem] text-blue-400 z-44"/>   // tabular icon
//               ) : (
//                 <CreditCard className="w-auto h-[2rem] text-blue-400 z-44" /> // card icon
//               )}
//             </button>
//           </div>

//         </div>

     
//                   <div className=" rack-view-container flex-1 min-h-full bg-[#07518d1d]   rounded-4xl relative ">
                    
         
          
//                     {viewMode === "table" ? (
//                     <TabularView
//                     racks={activeRacks}
//                     selectedRackId={selectedRackId}
//                     onSelect={(id) => dispatch(setSelectedRackId(id))}
//                     />
//                     ) : (
//                     <div className={`freezer-cards-container custom-scrollbar hide-scrollbar ${noRacks && !showSkeleton ? "no-scroll" : ""}`}>
//                     {showSkeleton ? (
//                     <div className="freezer-cards-grid">
//                     {Array.from({ length: 4 }).map((_, i) => <DeviceSkeleton key={i} />)}
//                     </div>
//                     ) : noRacks ? (
//                     // <EmptyRackState />
//                     <></>
//                     ) : (
//                     <div className="freezer-cards-grid">
//                     {activeRacks.map((rack) => (
//                     <FreezerDeviceCard
//                     key={rack?._id}
//                     deviceId={rack?.name}
//                     ambientTemperature={rack.tempV}
//                     freezerTemperature={rack.humiV}
//                     batteryLow={rack?.humiA ?? false}
//                     refrigeratorAlert={rack?.tempA ?? false}
//                     onCardSelect={() => onCardSelect(rack?._id)}
//                     isSelected={String(rack?._id) === String(selectedRackId)}
//                     espHumidity={rack.humiA ?? rack?.humiV}
//                     humidityAlert={rack?.humidityAlert}
//               />
//             ))}
//             </div>
//             )}
//             </div>
//             )}
//             </div>

//         <AlertsPanel dataCenterId={selectedDcId} rackClusterId={selectedClusterId} pollInterval={POLL_MS} />
//       </div>

//       {isDesktop ? (
//         <DashboardRightPanel selectedRackId={selectedRackId} selectedDataCenterId={selectedDcId} selectedRackClusterId={selectedClusterId} />
//       ) : (
//         <Drawer open={drawerOpen} onClose={clearSelectedRack} anchor="right">
//           <DashboardRightPanel selectedRackId={selectedRackId} selectedDataCenterId={selectedDcId} selectedRackClusterId={selectedClusterId} closeIcon onClose={clearSelectedRack} />
//         </Drawer>
//       )}
//     </div>
//   );
// }



// Working for Jawwad Rack Select me fix karna ha

// Working fine Maybe the above will working fine
// src/pages/Dashboard.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useStore } from "../../contexts/storecontexts";
import { useLocation, useNavigate } from "react-router-dom";
import { useMediaQuery, Drawer } from "@mui/material";
import "../../styles/pages/Dashboard/dashboard-styles.css"
import "../../styles/pages/Dashboard/freezer-cards-responsive.css"
import DataCenterSelect from "./DataCenterSelect";
import RackClusterSelect from "./RackClusterSelect";
import AlertsPanel from "./AlertsPanel";
import DashboardRightPanel from "../../components/components/DashboardRightPanel";
import { Table, LayoutGrid, CreditCard } from "lucide-react";
import FreezerDeviceCard from "./FreezerDeviceCard";
import DeviceSkeleton from "./DeviceSkeleton";
import TabularView from "../../components/TabularView";


import { fetchAllDataCenters, fetchDataCentersByUser } from "../../slices/DataCenterSlice";
import { fetchRackClustersByDataCenter } from "../../slices/rackClusterSlice";
import { fetchRacksByDataCenterId, fetchRacksByClusterId, fetchRackById } from "../../slices/rackSlice";
import {
  setSelectedDataCenterId,
  setSelectedRackClusterId,
  setSelectedRackId,
  markContextFetched,
  markAutoSelectedRack,
} from "../../slices/uiSlice";

const POLL_MS_DEFAULT = 5 * 60 * 1000; // fallback 5 minutes 

export default function Dashboard() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useStore();
  const isDesktop = useMediaQuery("(min-width:768px)");
  const [drawerOpen, setDrawerOpen] = useState(false);
const [viewMode, setViewMode] = useState("cards"); // "cards" | "table"

  const pollRef = useRef(null);

  // Redux slices
  const dataCenters = useSelector((s) => s.DataCenter?.DataCenters || []);
  const dcLoading = useSelector((s) => s.DataCenter?.loading?.fetch);
  const clusters = useSelector((s) => s.rackCluster?.clusters || []);
  const rackState = useSelector((s) => s.rack || { racks: [], loading: {} });
  const ui = useSelector((s) => s.ui || {});
  console.log("UISlice", ui);
  const selectedDcId = ui.selectedDataCenterId;
  const selectedClusterId = ui.selectedRackClusterId;
  const selectedRackId = ui.selectedRackId;

  console.log("rackState:", rackState)
  const activeRacks = Array.isArray(rackState.racks) ? rackState.racks : [];
  console.log("Active RACKS:", activeRacks)
  // compute POLL_MS from user.timer or fallback
  // const POLL_MS = useMemo(() => {
  //   try {
  //     if (!user?.timer) return POLL_MS_DEFAULT;
  //     const m = /^(\d+)(s|m)$/.exec(String(user.timer).trim());
  //     if (!m) return POLL_MS_DEFAULT;
  //     const v = Math.max(1, Math.min(60, parseInt(m[1], 10)));
  //     return m[2] === "s" ? v * 1000 : v * 60 * 1000;
  //   } catch {
  //     return POLL_MS_DEFAULT;
  //   }
  // }, [user?.timer]);


//   const POLL_MS = useMemo(() => {
//   try {
//     if (!user?.timer) return POLL_MS_DEFAULT; // fallback only when user has no timer
//     const m = /^(\d+)(s|m)$/.exec(String(user.timer).trim());
//     if (!m) return POLL_MS_DEFAULT;
//     const num = parseInt(m[1], 10);
//     if (m[2] === "s") {
//       // allow up to 3600 seconds (1 hour)
//       const seconds = Math.max(1, Math.min(3600, num));
//       return seconds * 1000;
//     } else {
//       // minutes: allow up to 60 minutes
//       const minutes = Math.max(1, Math.min(60, num));
//       return minutes * 60 * 1000;
//     }
//   } catch (err) {
//     console.warn("Failed to parse user.timer", user?.timer, err);
//     return POLL_MS_DEFAULT;
//   }
// }, [user?.timer]);
  
const POLL_MS = useMemo(() => {
  try {
    if (!user?.timer) return POLL_MS_DEFAULT;

    const m = /^(\d+)(s|m)$/.exec(String(user.timer).trim());
    if (!m) return POLL_MS_DEFAULT;

    const num = Math.max(1, parseInt(m[1], 10)); // ✅ minimum only

    if (m[2] === "s") {
      return num * 1000;           // allows 86400s+
    } else {
      return num * 60 * 1000;      // allows large minutes too
    }
  } catch (err) {
    console.warn("Failed to parse user.timer", user?.timer, err);
    return POLL_MS_DEFAULT;
  }
}, [user?.timer]);



// getEffectiveDataCenterId 

const getEffectiveDataCenterId = (maybeAssignedId) => {
  if (!maybeAssignedId) return null;

  const item = dataCenters.find((d) => String(d._id) === String(maybeAssignedId));
  if (!item) return maybeAssignedId; // fallback, maybe real ID already

  // role-based logic: user/manager -> dataCenterId, admin -> _id
  if (user?.role === "user" || user?.role === "manager") {
    return String(item.dataCenterId?._id ?? item.dataCenterId);
  }

  // admin case
  return String(item._id);
};



const realDcId  = getEffectiveDataCenterId(selectedDcId);


  useEffect(() => {
  if (!user?._id) return;

  if (user.role === "admin") {
    dispatch(fetchAllDataCenters());
  } else {
    dispatch(fetchDataCentersByUser(user._id));
  }
}, [user?._id, user?.role, dispatch]);


  // ---------- 2) Resolve default DataCenter when list is available ----------
  // useEffect(() => {
  //   if (!dataCenters || dataCenters.length === 0) return;

  //   // if selection already valid, keep it
  //   if (selectedDcId && dataCenters.find((d) => String(d._id) === String(selectedDcId))) return;

  //   // prefer URL param ?dc=...
  //   const sp = new URLSearchParams(location.search);
  //   const urlDc = sp.get("dc");
  //   const found = urlDc && dataCenters.find((d) => String(d._1 ?? d._id) === String(urlDc)); // defensive
  //   const chosen = found ? found._id : dataCenters[0]._id;

  //   dispatch(setSelectedDataCenterId(String(chosen)));
  //   // push URL param so refresh/deep link works
  //   sp.set("dc", String(chosen));
  //   navigate(`${location.pathname}?${sp.toString()}`, { replace: true });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [dataCenters, dispatch]); // intentionally minimal deps; selection is idempotent




  // ---------- 2) Resolve default DataCenter when list is available ----------
useEffect(() => {
  if (!dataCenters || dataCenters.length === 0) return;

  // if selection already valid, keep it (compare to both top-level and nested ids)
  if (selectedDcId) {
    const stillValid = dataCenters.some(
      (d) =>
        String(d._id) === String(selectedDcId) ||
        String(d?.dataCenterId?._id || d?.dataCenterId) === String(selectedDcId)
    );
    if (stillValid) return;
  }

  const sp = new URLSearchParams(location.search);
  const urlDc = sp.get("dc");

  // find item by top-level or nested id
  const found = urlDc
    ? dataCenters.find(
        (d) =>
          String(d._id) === String(urlDc) ||
          String(d?.dataCenterId?._id || d?.dataCenterId) === String(urlDc)
      )
    : null;

  // choose first option's effective id if url not found
  const pick = found
    ? // compute option id for selection (role-aware)
      (user?.role === "admin" ? found._id : (found.dataCenterId?._id || found.dataCenterId || found._id))
    : // fallback to first loaded option (role-aware)
      (user?.role === "admin"
        ? dataCenters[0]._id
        : (dataCenters[0]?.dataCenterId?._id || dataCenters[0]?.dataCenterId || dataCenters[0]._id));

  if (!pick) return;

  dispatch(setSelectedDataCenterId(String(pick)));
  sp.set("dc", String(pick));
  navigate(`${location.pathname}?${sp.toString()}`, { replace: true });
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [dataCenters, dispatch]);


useEffect(() => {
  if (!selectedDcId) return;

  const sp = new URLSearchParams(location.search);
  const urlCluster = sp.get("cluster");

  const realDcId = getEffectiveDataCenterId(selectedDcId);
  if (!realDcId) return;

  // fetch clusters for the real data center id
  dispatch(fetchRackClustersByDataCenter(realDcId));

  // fetch DC-level racks only when no cluster param
  if (!urlCluster) {
    dispatch(fetchRacksByDataCenterId(realDcId));
  }
}, [selectedDcId, dispatch, location.search, /* add dataCenters so helper sees latest list */ dataCenters]);


  // Fetch racks according to active context
  useEffect(() => {
    // if no DC selected, nothing to do
    if (!selectedDcId) return;

    // Only fetch by cluster if cluster is selected
    // if (selectedClusterId) {
    //   dispatch(fetchRacksByClusterId(selectedClusterId));
    // } else {
    //   dispatch(fetchRacksByDataCenterId(selectedDcId));
    // }

    if (selectedClusterId) {
  dispatch(fetchRacksByClusterId(selectedClusterId));
} else {
  const realDcId = getEffectiveDataCenterId(selectedDcId);
  if (realDcId) dispatch(fetchRacksByDataCenterId(realDcId));
}

  },
    // only trigger after both selectedDcId and selectedClusterId are restored
    [selectedDcId, selectedClusterId, dispatch]);


  // // ---------- Restore cluster selection from URL ----------
  // useEffect(() => {
  //   if (!clusters || clusters.length === 0) return;

  //   const sp = new URLSearchParams(location.search);
  //   const urlCluster = sp.get("cluster");

  //   if (urlCluster && clusters.find(c => String(c._id) === String(urlCluster))) {
  //     dispatch(setSelectedRackClusterId(urlCluster));
  //   }
  // }, [clusters, location.search, dispatch]);


  useEffect(() => {
  // Wait until clusters for the selected DC have been loaded (could be empty)
  if (!clusters) return;

  const sp = new URLSearchParams(location.search);
  const urlCluster = sp.get("cluster");

  if (!urlCluster) {
    // No cluster param — nothing to restore; ensure DC-level racks are loaded
    // if (selectedDcId) dispatch(fetchRacksByDataCenterId(selectedDcId));
    if (selectedDcId) dispatch(fetchRacksByDataCenterId(realDcId));
    return;
  }

  // If cluster exists in loaded clusters, restore selection
  const found = clusters.find((c) => String(c._id) === String(urlCluster));
  if (found) {
    dispatch(setSelectedRackClusterId(urlCluster));
    return;
  }

  // urlCluster exists but not found in clusters -> fallback to DC-level racks
  // (this covers cases where the URL had an invalid/old cluster id)
  if (selectedDcId) {
    dispatch(fetchRacksByDataCenterId(realDcId));
  }
}, [clusters, location.search, dispatch, selectedDcId]);



  // ---------- 5) When rack list changes (either DC-level or cluster-level), auto-select first rack once ----------
  useEffect(() => {
    const list = Array.isArray(rackState.racks) ? rackState.racks : [];

    // mark fetched even if empty
    const markFetchedForCurrent = () => {
      if (selectedClusterId) dispatch(markContextFetched({ kind: "cluster", id: selectedClusterId }));
      else if (selectedDcId) dispatch(markContextFetched({ kind: "dc", id: selectedDcId }));
    };

    if (!selectedDcId && !selectedClusterId) {
      // nothing to do
      return;
    }

    if (!list || list.length === 0) {
      markFetchedForCurrent();
      return;
    }

    // if selectedRackId already valid inside list, keep it and mark fetched
    if (selectedRackId && list.find((r) => String(r._id) === String(selectedRackId))) {
      markFetchedForCurrent();
      return;
    }

    // check if we already auto-selected for this context
    const alreadyAutoSelected = selectedClusterId
      ? Boolean(ui.autoSelectedRackForContext?.cluster?.[selectedClusterId])
      : Boolean(ui.autoSelectedRackForContext?.dc?.[selectedDcId]);

    if (alreadyAutoSelected) {
      markFetchedForCurrent();
      return;
    }

    // auto-select first rack only on desktop
    if (isDesktop) {
      const first = list[0];
      if (first && first._id) {
        dispatch(setSelectedRackId(String(first._id)));
        dispatch(fetchRackById(String(first._id)));
        // mark auto-select for the context
        if (selectedClusterId) dispatch(markAutoSelectedRack({ kind: "cluster", id: selectedClusterId }));
        else dispatch(markAutoSelectedRack({ kind: "dc", id: selectedDcId }));
      }
    }

    markFetchedForCurrent();
  }, [
    rackState.racks,
    selectedDcId,
    selectedClusterId,
    selectedRackId,
    ui.autoSelectedRackForContext,
    isDesktop,
    dispatch,
  ]);

  // ---------- 6) When selected rack changes → ensure full details are loaded ----------
  useEffect(() => {
    if (!selectedRackId) return;
    dispatch(fetchRackById(selectedRackId));
  }, [selectedRackId, dispatch]);

  // ---------- 7) Polling: re-fetch only the active context (DC or cluster) ----------
  // useEffect(() => {
  //   // clear previous
  //   if (pollRef.current) {
  //     clearInterval(pollRef.current);
  //     pollRef.current = null;
  //   }
  //   if (!selectedDcId) return;

  //   const doPoll = () => {
  //     if (selectedClusterId) {
  //       dispatch(fetchRacksByClusterId(selectedClusterId));
  //     } else {
  //       dispatch(fetchRacksByDataCenterId(realDcId));
  //     }
  //     // Alerts and cluster-means polling can be added here (dispatch thunks)
  //   };

  //   // start poll
  //   pollRef.current = setInterval(doPoll, POLL_MS);
  //   return () => {
  //     if (pollRef.current) clearInterval(pollRef.current);
  //     pollRef.current = null;
  //   };
  // }, [selectedDcId, selectedClusterId, POLL_MS, dispatch]);


  // ---------- 7) Polling: re-fetch only the active context (DC or cluster) ----------
useEffect(() => {
  // clear previous
  if (pollRef.current) {
    clearInterval(pollRef.current);
    pollRef.current = null;
  }
  if (!selectedDcId) return;
  if (!POLL_MS) {
    // nothing to poll (explicitly disabled)
    return;
  }

  const doPoll = () => {
    if (selectedClusterId) {
      dispatch(fetchRacksByClusterId(selectedClusterId));
    } else {
      dispatch(fetchRacksByDataCenterId(realDcId));
    }
    // Alerts and cluster-means polling can be added here (dispatch thunks)
  };

  // start poll
  doPoll(); // optionally run once immediately
  pollRef.current = setInterval(doPoll, POLL_MS);
  return () => {
    if (pollRef.current) clearInterval(pollRef.current);
    pollRef.current = null;
  };
}, [selectedDcId, selectedClusterId, POLL_MS, dispatch]);



  // ---------- UI handlers ----------
  const handleDataCenterChange = (dcId) => {
    if (!dcId) return;
    dispatch(setSelectedDataCenterId(dcId));
    // update url
    const sp = new URLSearchParams(location.search);
    sp.set("dc", dcId);
    // keep cluster param cleared when DC changed
    sp.delete("cluster");
    navigate(`${location.pathname}?${sp.toString()}`, { replace: true });
  };

  const handleClusterChange = (clusterId) => {
    // user-driven only
    dispatch(setSelectedRackClusterId(clusterId || null));
    const sp = new URLSearchParams(location.search);
    if (clusterId) sp.set("cluster", clusterId);
    else sp.delete("cluster");
    navigate(`${location.pathname}?${sp.toString()}`, { replace: true });
  };

  const onCardSelect = (rackId) => {
    dispatch(setSelectedRackId(rackId));
    if (!isDesktop) setDrawerOpen(true);
  };

  const clearSelectedRack = () => {
    dispatch(setSelectedRackId(null));
    setDrawerOpen(false);
  };

  console.log("User>>", user);

  // ---------- Render logic ----------
  const showSkeleton = ui.isInitialContextLoad;
  const noRacks = !activeRacks || activeRacks.length === 0;

  return (
    <div className="flex w-full flex-row h-full font-inter rounded-md bg-[#F5F6FA]">
      <div className="flex-1 min-w-0 space-y-4 overflow-y-auto custom-scrollbar dashboard-main-content bg-white shadow-sm border border-[#E5E7EB]/30 p-3 lg:py-none lg:px-3">
        {/* Header */}
        <div className="flex justify-between items-center gap-1">
          {
            !isDesktop && <div>
              <img src="/logo-half.png" alt="LOGO" className="w-auto h-[40px] px-2 " />
            </div>
          }
          <div className="flex-1 min-w-[6rem] max-w-[10rem] lg:min-w-[11rem]  lg:max-w-[10rem] xl:max-w-[20rem]  ">
            <DataCenterSelect
              value={selectedDcId || ""}
              onChange={handleDataCenterChange}
            />
          </div>

          <div className="flex-1 min-w-[6rem] max-w-[10rem] lg:min-w-[11rem]  lg:max-w-[10rem] xl:max-w-[20rem]  ">
            <RackClusterSelect
              value={selectedClusterId || ""}
              onChange={handleClusterChange}
              disabled={!selectedDcId}
            />
          </div>

 <div className="">

            {/* toggle icon */}
            <button
              onClick={() => setViewMode(viewMode === "cards" ? "table" : "cards")}
              className="p-2 rounded hover:bg-gray-100 cursor-pointer"
              title={viewMode === "cards" ? "Show Table View" : "Show Card View"}
            >
              {viewMode === "cards" ? (
                <LayoutGrid className="w-auto h-[2rem] text-blue-400 z-44"/>   // tabular icon
              ) : (
                <CreditCard className="w-auto h-[2rem] text-blue-400 z-44" /> // card icon
              )}
            </button>
          </div>

        </div>

     
                  <div className=" rack-view-container flex-1 min-h-full bg-[#07518d1d]   rounded-4xl relative ">
                    
         
          
                    {viewMode === "table" ? (
                    <TabularView
                    racks={activeRacks}
                    selectedRackId={selectedRackId}
                    onSelect={(id) => dispatch(setSelectedRackId(id))}
                    />
                    ) : (
                    <div className={`freezer-cards-container custom-scrollbar hide-scrollbar ${noRacks && !showSkeleton ? "no-scroll" : ""}`}>
                    {showSkeleton ? (
                    <div className="freezer-cards-grid">
                    {Array.from({ length: 4 }).map((_, i) => <DeviceSkeleton key={i} />)}
                    </div>
                    ) : noRacks ? (
                    // <EmptyRackState />
                    <></>
                    ) : (
                    <div className="freezer-cards-grid">
                    {activeRacks.map((rack) => (
                    <FreezerDeviceCard
                    key={rack?._id}
                    deviceId={rack?.name}
                    ambientTemperature={rack.tempV}
                    freezerTemperature={rack.humiV}
                    batteryLow={rack?.humiA ?? false}
                    refrigeratorAlert={rack?.tempA ?? false}
                    onCardSelect={() => onCardSelect(rack?._id)}
                    isSelected={String(rack?._id) === String(selectedRackId)}
                    espHumidity={rack.humiA ?? rack?.humiV}
                    humidityAlert={rack?.humidityAlert}
              />
            ))}
            </div>
            )}
            </div>
            )}
            </div>

        <AlertsPanel dataCenterId={selectedDcId} rackClusterId={selectedClusterId} 
        
        pollInterval={POLL_MS} />
      </div>

      {isDesktop ? (
        <DashboardRightPanel  pollInterval={POLL_MS} selectedRackId={selectedRackId} selectedDataCenterId={selectedDcId} selectedRackClusterId={selectedClusterId} />
      ) : (
        <Drawer open={drawerOpen} onClose={clearSelectedRack} anchor="right">
          <DashboardRightPanel pollInterval={POLL_MS}  selectedRackId={selectedRackId} selectedDataCenterId={selectedDcId} selectedRackClusterId={selectedClusterId} closeIcon onClose={clearSelectedRack} />
        </Drawer>
      )}
    </div>
  );
}
