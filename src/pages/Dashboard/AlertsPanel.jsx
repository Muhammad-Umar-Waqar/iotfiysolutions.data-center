// // AlertsPanel.jsx
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import AlertList from "./AlertList";
// import { useStore } from "../../contexts/storecontexts";
// import { fetchAlertsByOrg } from "../../slices/alertsSlice";

// export default function AlertsPanel({ organizationId = null, pollInterval = null }) {
//   const dispatch = useDispatch();
//   const { user, getToken } = useStore();
//   const token = getToken();
//   const orgId = organizationId || user?.organization || null;

//   const orgAlerts = useSelector((s) =>
//     orgId ? s.alerts?.byOrg?.[orgId] ?? { venues: [], loading: false, error: null } : { venues: [], loading: false, error: null }
//   );

//   useEffect(() => {
//     if (!orgId) return;
//     dispatch(fetchAlertsByOrg(orgId, token));
//   }, [orgId, dispatch]);

//   useEffect(() => {
//     if (!orgId || !pollInterval) return;
//     const id = setInterval(() => {
//       dispatch(fetchAlertsByOrg(orgId, token));
//     }, pollInterval);
//     return () => clearInterval(id);
//   }, [orgId, pollInterval, dispatch]);

//   const venues = orgAlerts?.venues || [];

//   console.log("venues>", venues);

//    const maintenanceItems = venues.map((v) => ({
//     id: v.venueId,
//     name: v.venueName,
//     devices: v.refrigeratorAlertCount || 0,
//     nestedItems: (v.refrigeratorAlertDevices || []).map((d) => ({ id: d.id, name: d.name, date: d.date })),
//   }));


//   const batteryItems = venues.map((v) => ({
//     id: v.venueId,
//     name: v.venueName,
//     devices: v.batteryAlertCount || 0,
//     nestedItems: (v.batteryAlertDevices || []).map((d) => ({ id: d.id, name: d.name, date: d.date })),
//   }));

//   return (
//     <div className="flex-shrink-0 mb-16 md:mb-auto">
//     {/* <div className="h-full flex flex-col"> */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* <div className="p-2 md:p-4 " style={{ backgroundColor: "#07518D12", borderRadius: "20px" }}> */}
//         <div className="p-2 md:p-4 " style={{ backgroundColor: "#07518D12", borderRadius: "20px" }}>
//           <AlertList title="Refrigerator Alert" iconSrc="/freezer-alert-icon.png" 
//           items={maintenanceItems} />
//         </div>
//         <div className="p-2 md:p-4 " style={{ backgroundColor: "#07518D12", borderRadius: "20px" }}>
//           <AlertList title="Battery Alert" items={batteryItems}  iconSrc="/low-battery-icon.png"  />
//         </div>
//       </div>
//     </div>
//   );
// }









// // src/pages/AlertsPanel.jsx
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import AlertList from "./AlertList";
// // import { fetchAlertsByDataCenter, fetchAlertsByRackCluster
// // fetchAlertsByDataCenter

// import "../../styles/pages/Dashboard/dashboard-styles.css";
// import { useStore } from "../../contexts/storecontexts";
// import { fetchAlertsByDataCenter, fetchAlertsByRackCluster } from "../../slices/alertsSlice";

// export default function AlertsPanel({ dataCenterId = null, rackClusterId = null, pollInterval = null }) {
//   const dispatch = useDispatch();
//   const { user } = useStore();

//   const ui = useSelector((s) => s.ui || {});
//   const effectiveDc = dataCenterId || ui.selectedDataCenterId || null;
//   const effectiveCluster = rackClusterId || ui.selectedRackClusterId || null;


// const isInitialAlertsLoad = useMemo(() => {
//   if (rackClusterId) {
//     return !ui.contextHasFetched?.cluster?.[rackClusterId];
//   }
//   if (dataCenterId) {
//     return !ui.contextHasFetched?.dc?.[dataCenterId];
//   }
//   return true;
// }, [rackClusterId, dataCenterId, ui.contextHasFetched]);


// // choose source: cluster takes precedence
//   const alertsState = useSelector((s) => {
//     if (effectiveCluster) return s.alerts?.byRackCluster?.[effectiveCluster] ?? { loading: false, error: null, racks: [] };
//     if (effectiveDc) return s.alerts?.byDataCenter?.[effectiveDc] ?? { loading: false, error: null, racks: [] };
//     return { loading: false, error: null, racks: [] };
//   });

//   // const alertsState = useSelector((s) => {
//   // if (effectiveCluster)
//   //   return s.alerts?.byRackCluster?.[effectiveCluster] ?? { loading: false, racks: [] };
//   // if (effectiveDc)
//   //   return s.alerts?.byDataCenter?.[effectiveDc] ?? { loading: false, racks: [] };
//   // return { loading: false, racks: [] };
// // });


//   const loading = Boolean(alertsState?.loading);
//   const racks = Array.isArray(alertsState?.racks) ? alertsState.racks : [];

//   // fetch on mount / on selection change (cluster > dc)
//   useEffect(() => {
//     if (effectiveCluster) {
//       dispatch(fetchAlertsByRackCluster(effectiveCluster));
//     } else if (effectiveDc) {
//       dispatch(fetchAlertsByDataCenter(effectiveDc));
//     }
//     // omit dispatch from deps intentionally; selection changes should trigger rerun
//   }, [effectiveDc, effectiveCluster, dispatch]);

//   // polling (do not show skeleton during polling; just refresh data)
//   useEffect(() => {
//     if (!pollInterval) return;
//     const id = setInterval(() => {
//       if (effectiveCluster) dispatch(fetchAlertsByRackCluster(effectiveCluster));
//       else if (effectiveDc) dispatch(fetchAlertsByDataCenter(effectiveDc));
//     }, pollInterval);
//     return () => clearInterval(id);
//   }, [effectiveDc, effectiveCluster, pollInterval, dispatch]);

//   // skeleton rule: show skeletons only if UI is in initialContextLoad AND current alerts are loading
//   const showSkeleton = ui.isInitialContextLoad && loading;

//   // map API racks -> maintenanceItems + batteryItems
//   const maintenanceItems = racks.map((r) => {
//     const id = r.rackId ?? r._id ?? r.rackId;
//     const name = r.rackName ?? r.rackName ?? r.rackName ?? `Rack ${id}`;
//     const devices = r.totalAlerts ?? ((r.tempA ? 1 : 0) + (r.humiA ? 1 : 0) || 0);
//     const nestedItems = (r.sensors || []).map((s, idx) => ({
//       id: `${id}-${s.sensorName ?? idx}`,
//       name: s.sensorName ?? s.name ?? `Sensor ${idx + 1}`,
//       date: s.updatedAt ? new Date(s.updatedAt).toLocaleString() : undefined,
//     }));
//     return { id, name, devices, nestedItems };
//   });

//   const batteryItems = racks.map((r) => {
//     // your backend doesn't currently return battery alerts in the sample controller,
//     // but keep mapping flexible if payload includes battery counts/devices.
//     const id = r.rackId ?? r._id ?? r.rackId;
//     const name = r.rackName ?? r.rackName ?? r.rackName ?? `Rack ${id}`;
//     const devices = r.batteryAlertCount ?? 0;
//     const nestedItems = (r.batteryAlertDevices || []).map((d) => ({
//       id: d.id ?? `${id}-${d.name}`,
//       name: d.name ?? d.deviceId ?? "Device",
//       date: d.date ?? undefined,
//     }));
//     return { id, name, devices, nestedItems };
//   });

//   // simple skeleton markup for the lists (small placeholders)
//   const SkeletonList = () => (
//     <div className="space-y-2">
//       {Array.from({ length: 4 }).map((_, i) => (
//         <div key={i} className="h-8 bg-gray-200 rounded animate-pulse" />
//       ))}
//     </div>
//   );

//   return (
//     <div className="flex-shrink-0 mb-16 md:mb-auto">
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="p-2 md:p-4" style={{ backgroundColor: "#07518D12", borderRadius: 20 }}>
//           {showSkeleton ? (
//             <SkeletonList />
//           ) : (
//             <AlertList
//               title={effectiveCluster ? `Refrigerator Alerts — Cluster` : `Refrigerator Alerts`}
//               iconSrc="/freezer-alert-icon.png"
//               items={maintenanceItems}
//             />
//           )}
//         </div>

//         <div className="p-2 md:p-4" style={{ backgroundColor: "#07518D12", borderRadius: 20 }}>
//           {showSkeleton ? (
//             <SkeletonList />
//           ) : (
//             <AlertList
//               title={effectiveCluster ? `Battery Alerts — Cluster` : `Battery Alerts`}
//               iconSrc="/low-battery-icon.png"
//               items={batteryItems}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }







// src/pages/AlertsPanel.jsx
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import AlertList from "./AlertList";
import "../../styles/pages/Dashboard/dashboard-styles.css";
import { useStore } from "../../contexts/storecontexts";
import {
  fetchAlertsByDataCenter,
  fetchAlertsByRackCluster,
} from "../../slices/alertsSlice";
import { markContextFetched } from "../../slices/uiSlice";

export default function AlertsPanel({
  dataCenterId = null,
  rackClusterId = null,
  pollInterval = null,
}) {
  const dispatch = useDispatch();
  const { user } = useStore();

  const ui = useSelector((s) => s.ui || {});
  const effectiveDc = dataCenterId || ui.selectedDataCenterId || null;
  const effectiveCluster = rackClusterId || ui.selectedRackClusterId || null;

  /* ----------------------------------------
   * INITIAL LOAD DECISION (CRITICAL LOGIC)
   * -------------------------------------- */
  const isInitialAlertsLoad = useMemo(() => {
    if (effectiveCluster) {
      return !ui.contextHasFetched?.cluster?.[effectiveCluster];
    }
    if (effectiveDc) {
      return !ui.contextHasFetched?.dc?.[effectiveDc];
    }
    return true;
  }, [effectiveCluster, effectiveDc, ui.contextHasFetched]);

  /* ----------------------------------------
   * SELECT ALERT SOURCE (cluster > dc)
   * -------------------------------------- */
  const alertsState = useSelector((s) => {
    if (effectiveCluster) {
      return (
        s.alerts?.byRackCluster?.[effectiveCluster] ?? {
          loading: false,
          racks: [],
        }
      );
    }
    if (effectiveDc) {
      return (
        s.alerts?.byDataCenter?.[effectiveDc] ?? {
          loading: false,
          racks: [],
        }
      );
    }
    return { loading: false, racks: [] };
  });

  const loading = Boolean(alertsState?.loading);
  const racks = Array.isArray(alertsState?.racks) ? alertsState.racks : [];

  /* ----------------------------------------
   * FETCH ON MOUNT / DC / CLUSTER CHANGE
   * -------------------------------------- */
  useEffect(() => {
    if (effectiveCluster) {
      dispatch(fetchAlertsByRackCluster(effectiveCluster));
    } else if (effectiveDc) {
      dispatch(fetchAlertsByDataCenter(effectiveDc));
    }
  }, [effectiveCluster, effectiveDc, dispatch]);

  /* ----------------------------------------
   * POLLING (NO SKELETONS HERE)
   * -------------------------------------- */
  useEffect(() => {
    if (!pollInterval) return;

    const id = setInterval(() => {
      if (effectiveCluster) {
        dispatch(fetchAlertsByRackCluster(effectiveCluster));
      } else if (effectiveDc) {
        dispatch(fetchAlertsByDataCenter(effectiveDc));
      }
    }, pollInterval);

    return () => clearInterval(id);
  }, [effectiveCluster, effectiveDc, pollInterval, dispatch]);

  /* ----------------------------------------
   * MARK CONTEXT AS FETCHED (LOCK SKELETONS)
   * -------------------------------------- */
  useEffect(() => {
    if (loading) return;

    if (effectiveCluster) {
      dispatch(markContextFetched({ kind: "cluster", id: effectiveCluster }));
    } else if (effectiveDc) {
      dispatch(markContextFetched({ kind: "dc", id: effectiveDc }));
    }
  }, [loading, effectiveCluster, effectiveDc, dispatch]);

  /* ----------------------------------------
   * SKELETON RULE
   * -------------------------------------- */
  const showSkeleton = isInitialAlertsLoad && loading;

  /* ----------------------------------------
   * MAP DATA
   * -------------------------------------- */
  const maintenanceItems = racks.map((r) => {
    const id = r.rackId ?? r._id;
    const name = r.rackName ?? `Rack ${id}`;
    const devices =
      r.totalAlerts ??
      ((r.tempA ? 1 : 0) + (r.humiA ? 1 : 0) || 0);

    const nestedItems = (r.sensors || []).map((s, idx) => ({
      id: `${id}-${idx}`,
      name: s.sensorName ?? `Sensor ${idx + 1}`,
      date: s.updatedAt
        ? new Date(s.updatedAt).toLocaleString()
        : undefined,
    }));

    return { id, name, devices, nestedItems };
  });

  const batteryItems = racks.map((r) => {
    const id = r.rackId ?? r._id;
    const name = r.rackName ?? `Rack ${id}`;
    const devices = r.batteryAlertCount ?? 0;

    const nestedItems = (r.batteryAlertDevices || []).map((d, idx) => ({
      id: `${id}-b-${idx}`,
      name: d.name ?? "Device",
      date: d.date,
    }));

    return { id, name, devices, nestedItems };
  });

  const SkeletonList = () => (
    <div className="space-y-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="h-8 bg-gray-200 rounded animate-pulse"
        />
      ))}
    </div>
  );

  /* ----------------------------------------
   * RENDER
   * -------------------------------------- */
  return (
    <div className="flex-shrink-0 mb-16 md:mb-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div
          className="p-2 md:p-4"
          style={{ backgroundColor: "#07518D12", borderRadius: 20 }}
        >
          {showSkeleton ? (
            <SkeletonList />
          ) : (
            <AlertList
              title={
                effectiveCluster
                  ? "Refrigerator Alerts — Cluster"
                  : "Refrigerator Alerts"
              }
              iconSrc="/freezer-alert-icon.png"
              items={maintenanceItems}
            />
          )}
        </div>

        <div
          className="p-2 md:p-4"
          style={{ backgroundColor: "#07518D12", borderRadius: 20 }}
        >
          {showSkeleton ? (
            <SkeletonList />
          ) : (
            <AlertList
              title={
                effectiveCluster
                  ? "Battery Alerts — Cluster"
                  : "Battery Alerts"
              }
              iconSrc="/low-battery-icon.png"
              items={batteryItems}
            />
          )}
        </div>
      </div>
    </div>
  );
}
