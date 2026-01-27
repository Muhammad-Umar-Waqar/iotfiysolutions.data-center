// // src/components/DashboardRightPanel.jsx
// import React, { useEffect, useMemo } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useStore } from "../../contexts/storecontexts";
// import {
//   fetchRackClusterMeansByDc,
//   fetchRackClusterMean,
// } from "../../slices/rackClusterSlice";
// import { fetchRackById } from "../../slices/rackSlice";
// import { setSelectedRackId, markContextFetched, setSelectedRackClusterId } from "../../slices/uiSlice";
// import RackDetailsPanel from "../../pages/RackDetailsPanel";  // new component (see below)

// export default function DashboardRightPanel({
//   selectedRackId = null,
//   selectedDataCenterId = null,
//   selectedRackClusterId = null,
//   closeIcon = false,
//   onClose = undefined,
//   className = "",
// }) {
//   const dispatch = useDispatch();
//   const { user } = useStore();

//   // rack cluster means list + single-mean detail from slice
//   const meansList = useSelector((s) => s.rackCluster?.meansList || []);
//   const meansLoading = useSelector((s) => s.rackCluster?.loading?.means);
//   const meanDetail = useSelector((s) => s.rackCluster?.meanDetail);
//   const meanLoading = useSelector((s) => s.rackCluster?.loading?.mean);

//   // rack state (list or single detail)
//   const rackState = useSelector((s) => s.rack || { racks: [], loading: {} });
//   const racks = Array.isArray(rackState.racks) ? rackState.racks : [];
//   const rackLoading = rackState.loading?.fetch;

//   const ui = useSelector((s) => s.ui || {});
//   const effectiveDc = selectedDataCenterId || ui.selectedDataCenterId || null;
//   const effectiveCluster = selectedRackClusterId || ui.selectedRackClusterId || null;

//   // Determine whether we should show skeletons (ONLY when first time fetch for context)
//   const meansContextNotFetched = effectiveCluster
//     ? !ui.contextHasFetched?.cluster?.[effectiveCluster]
//     : effectiveDc
//     ? !ui.contextHasFetched?.dc?.[effectiveDc]
//     : true;

//   // show skeleton only for initial (first) fetch of the context & while loading
//   const showMeansSkeleton = Boolean(meansContextNotFetched && (meansLoading || meanLoading));

//   // --- Fetch means list or single cluster mean on selection changes ---
//   useEffect(() => {
//     if (!effectiveDc && !effectiveCluster) return;

//     if (effectiveCluster) {
//       // when cluster selected we prefer to load single-mean detail
//       dispatch(fetchRackClusterMean(effectiveCluster));
//     } else {
//       dispatch(fetchRackClusterMeansByDc(effectiveDc));
//     }
//   }, [effectiveDc, effectiveCluster, dispatch]);

//   // When means finish loading, mark context fetched so skeletons stop showing next time
//   useEffect(() => {
//     // if means finished loading for DC
//     if (!meansLoading && !meanLoading) {
//       if (effectiveCluster) {
//         dispatch(markContextFetched({ kind: "cluster", id: effectiveCluster }));
//       } else if (effectiveDc) {
//         dispatch(markContextFetched({ kind: "dc", id: effectiveDc }));
//       }
//     }
//   }, [meansLoading, meanLoading, effectiveCluster, effectiveDc, dispatch]);

//   // Ensure a selected rack exists in the right-panel: pick first rack if none selected
//   useEffect(() => {
//     if (!selectedRackId) {
//       // find first rack in current rack list (racks are already filtered by dashboard context)
//       const first = racks && racks.length > 0 ? racks[0] : null;
//       if (first && first._id) {
//         dispatch(setSelectedRackId(String(first._id)));
//       }
//     }
//   }, [racks, selectedRackId, dispatch]);

//   // Ensure full rack details loaded if a rack is selected (find in racks; if not present, fetch it)
//   const selectedRack = useMemo(() => {
//     if (!selectedRackId) return null;
//     return racks.find((r) => String(r._id) === String(selectedRackId)) || null;
//   }, [racks, selectedRackId]);

//   useEffect(() => {
//     if (!selectedRackId) return;
//     if (!selectedRack) {
//       // fallback: fetch single rack details (this will put it into rackState via your fetchRackById thunk)
//       dispatch(fetchRackById(selectedRackId));
//     }
//   }, [selectedRackId, selectedRack, dispatch]);

//   // top list click handler (optional: allow user to click cluster in right panel to select it)
//   const handleClusterClick = (clusterId) => {
//     // selecting cluster -> update UI selection (this will cause dashboard to fetch racks by cluster)
//     // you may also want to update URL elsewhere; Dashboard's handlers already handle that when RackClusterSelect used.
//     dispatch(setSelectedRackClusterId ? setSelectedRackClusterId(clusterId) : {});
//     // We'll also fetch single cluster mean immediately
//     dispatch(fetchRackClusterMean(clusterId));
//   };

 
//   const renderMeansList = () => {
//   const listToShow = effectiveCluster
//     ? meanDetail ? [meanDetail] : []
//     : meansList || [];

//   if (!listToShow.length) {
//     return (
//       <div className="min-h-[10vh] max-h-[30vh] sm:h-[30vh] flex items-center justify-center text-sm text-gray-500 ">
//         No clusters available
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-[10vh] max-h-[30vh] sm:h-[30vh] overflow-y-auto">
//       {listToShow.map((c, index) => {
//         const id = c._id || c.clusterId || index;
//         const name = c.name || "Rag_1-5_L1";
//         const temp = c.meanTemp ?? 28;
//         const humi = c.meanHumi ?? 60;
//         const status = (c.ackitStatus ?? "ON").toUpperCase();

//         return (
//           <div key={id}>
//             <div
//               onClick={() => handleClusterClick(id)}
//               className="grid grid-cols-4 items-center px-4 py-3 cursor-pointer hover:bg-gray-50"
//             >
//               <span className="text-sm font-medium text-gray-700">
//                 {name}
//               </span>

//               <span className="text-sm font-semibold text-gray-900 text-center">
//                 {temp}C
//               </span>

//               <span className="text-sm font-semibold text-gray-900 text-center">
//                 {humi}%
//               </span>

//               <span
//                 className={`text-sm font-semibold text-right ${
//                   status === "ON" ? "text-green-600" : "text-gray-500"
//                 }`}
//               >
//                 {status}
//               </span>
//             </div>

//             {/* Divider */}
//             {index !== listToShow.length - 1 && (
//               <div className="mx-4 border-b border-gray-300/70" />
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// };


//   return (
//     <div className={`dashboard-right-panel shadow-sm flex flex-col  h-full overflow-y-auto custom-scrollbar p-4 lg:p-4 border-l border-[#E5E7EB]/40 bg-[#078d860c] flex-shrink-0 ${className}`}>
//       {/* Top: Cluster Means */}
//       <div className="mb-4 bg-[#0F5EA8]
// rounded-3xl">
//         <div className=" text-white px-4 py-5">
//   <div className="grid grid-cols-4 items-center text-sm font-medium ">
//     <span className="font-thin text-md text-white/70 ">Rack Cluster</span>

//     <span className="flex justify-center">
//       <img src="/white-temp.svg" className="w-auto h-[2rem]"/>
//     </span>

//     <span className="flex justify-center">
//       <img src="/card-humidity-icon.svg" className="w-auto h-[2rem]"/>
//     </span>

//     {/* <span className="flex justify-center">❄️</span> */}
//      <span className="flex justify-center">
//       <img src="/Ac.svg"  className="w-auto h-[2.2rem]"/>
//     </span>
//   </div>
// </div>


//         <div className="p-2 bg-white rounded-xl">
//           {showMeansSkeleton ? (
//             <div className="space-y-2 ">
//               {Array.from({ length: 3 }).map((_, i) => (
//                 <div key={i} className="h-8 bg-gray-200 rounded animate-pulse" />
//               ))}
//             </div>
//           ) : (
//             renderMeansList()
//           )}
//         </div>
//       </div>

//       {/* Divider */}
//       {/* <div className="border-t my-3" /> */}

//       {/* Bottom: Selected Rack Details */}
//       <div className="flex-1 min-h-0">
//         <RackDetailsPanel
//           rack={selectedRack}
//           loading={rackLoading}
//           noData={!selectedRack}
//           closeIcon={closeIcon}
//           onClose={onClose}
//         />
//       </div>
//     </div>
//   );
// }








// src/components/DashboardRightPanel.jsx
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useStore } from "../../contexts/storecontexts";
import {
  fetchRackClusterMeansByDc,
  fetchRackClusterMean,
} from "../../slices/rackClusterSlice";
import { fetchRackById } from "../../slices/rackSlice";
import { setSelectedRackId, markContextFetched, setSelectedRackClusterId } from "../../slices/uiSlice";
import RackDetailsPanel from "../../pages/RackDetailsPanel";  // new component (see below)
import ACControl from "./ACControl";
import { X } from "lucide-react";


export default function DashboardRightPanel({
  selectedRackId = null,
  selectedDataCenterId = null,
  selectedRackClusterId = null,
  closeIcon = false,
  onClose = undefined,
  className = "",
}) {
  const dispatch = useDispatch();
  const { user } = useStore();

  // rack cluster means list + single-mean detail from slice
  const meansList = useSelector((s) => s.rackCluster?.meansList || []);
  const meansLoading = useSelector((s) => s.rackCluster?.loading?.means);
  const meanDetail = useSelector((s) => s.rackCluster?.meanDetail);
  const meanLoading = useSelector((s) => s.rackCluster?.loading?.mean);

  // rack state (list or single detail)
  const rackState = useSelector((s) => s.rack || { racks: [], loading: {} });
  const racks = Array.isArray(rackState.racks) ? rackState.racks : [];
  const rackLoading = rackState.loading?.fetch;

  const ui = useSelector((s) => s.ui || {});
  const effectiveDc = selectedDataCenterId || ui.selectedDataCenterId || null;
  const effectiveCluster = selectedRackClusterId || ui.selectedRackClusterId || null;

  // Determine whether we should show skeletons (ONLY when first time fetch for context)
  const meansContextNotFetched = effectiveCluster
    ? !ui.contextHasFetched?.cluster?.[effectiveCluster]
    : effectiveDc
    ? !ui.contextHasFetched?.dc?.[effectiveDc]
    : true;

  // show skeleton only for initial (first) fetch of the context & while loading
  const showMeansSkeleton = Boolean(meansContextNotFetched && (meansLoading || meanLoading));

  const dataCenters = useSelector((s) => s.DataCenter?.DataCenters || []);

  
//     const getEffectiveDataCenterId = (maybeAssignedId) => {
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





// in Dashboard.jsx (replace existing getEffectiveDataCenterId)
const getEffectiveDataCenterId = (maybeId) => {
  if (!maybeId) return null;

  // if maybeId is already the nested id present in any entry -> return it (already real dc id)
  const foundByNested = dataCenters.find(
    (d) => String(d?.dataCenterId?._id || d?.dataCenterId) === String(maybeId)
  );
  if (foundByNested) return String(maybeId);

  // if maybeId matches a top-level entry._id (this could be assignment id or admin dc id)
  const foundTop = dataCenters.find((d) => String(d._id) === String(maybeId));
  if (foundTop) {
    // for non-admin roles prefer nested dataCenterId (if present), otherwise top-level
    if (user?.role === "manager" || user?.role === "user") {
      return String(foundTop.dataCenterId?._id ?? foundTop.dataCenterId ?? foundTop._id);
    }
    // admin: top-level id is the real dc id
    return String(foundTop._id);
  }

  // fallback: just return maybeId (could already be the real dc _id)
  return String(maybeId);
};



const realDcId = getEffectiveDataCenterId(effectiveDc);



  // --- Fetch means list or single cluster mean on selection changes ---
  useEffect(() => {
    if (!effectiveDc && !effectiveCluster) return;




    if (effectiveCluster) {
      // when cluster selected we prefer to load single-mean detail
      dispatch(fetchRackClusterMean(effectiveCluster));
    } else {
      dispatch(fetchRackClusterMeansByDc(realDcId));
    }
  }, [effectiveDc, effectiveCluster, dispatch]);

  // When means finish loading, mark context fetched so skeletons stop showing next time
  useEffect(() => {
    // if means finished loading for DC
    if (!meansLoading && !meanLoading) {
      if (effectiveCluster) {
        dispatch(markContextFetched({ kind: "cluster", id: effectiveCluster }));
      } else if (effectiveDc) {
        dispatch(markContextFetched({ kind: "dc", id: effectiveDc }));
      }
    }
  }, [meansLoading, meanLoading, effectiveCluster, effectiveDc, dispatch]);

  // Ensure a selected rack exists in the right-panel: pick first rack if none selected
  useEffect(() => {
    if (!selectedRackId) {
      // find first rack in current rack list (racks are already filtered by dashboard context)
      const first = racks && racks.length > 0 ? racks[0] : null;
      if (first && first._id) {
        dispatch(setSelectedRackId(String(first._id)));
      }
    }
  }, [racks, selectedRackId, dispatch]);

  // Ensure full rack details loaded if a rack is selected (find in racks; if not present, fetch it)
  const selectedRack = useMemo(() => {
    if (!selectedRackId) return null;
    return racks.find((r) => String(r._id) === String(selectedRackId)) || null;
  }, [racks, selectedRackId]);

  useEffect(() => {
    if (!selectedRackId) return;
    if (!selectedRack) {
      // fallback: fetch single rack details (this will put it into rackState via your fetchRackById thunk)
      dispatch(fetchRackById(selectedRackId));
    }
  }, [selectedRackId, selectedRack, dispatch]);

  // top list click handler (optional: allow user to click cluster in right panel to select it)
  // const handleClusterClick = (clusterId) => {
  //   // selecting cluster -> update UI selection (this will cause dashboard to fetch racks by cluster)
  //   // you may also want to update URL elsewhere; Dashboard's handlers already handle that when RackClusterSelect used.
  //   dispatch(setSelectedRackClusterId ? setSelectedRackClusterId(clusterId) : {});
  //   // We'll also fetch single cluster mean immediately
  //   dispatch(fetchRackClusterMean(clusterId));
  // };


  
 
  
  const renderMeansList = () => {
  const listToShow = effectiveCluster
    ? meanDetail ? [meanDetail] : []
    : meansList || [];
``
  if (!listToShow.length) {
    return (
      <div className="min-h-[10vh] max-h-[30vh] sm:h-[30vh] flex items-center justify-center text-sm text-gray-500 ">
        No clusters available
      </div>
    );
  }

  return (
    <div className="min-h-[10vh] max-h-[30vh] sm:h-[30vh] overflow-y-auto">

      {listToShow.map((c, index) => {
        const id = c._id || c.clusterId || index;
        const name = c.name || "Rag_1-5_L1";
        const temp = c.meanTemp ?? 28;
        const humi = c.meanHumi ?? 60;
        const status = (c.ackitStatus ?? "ON").toUpperCase();

        return (
          <div key={id}>
            <div
              // onClick={() => handleClusterClick(id)}
              className="grid grid-cols-4 items-center px-4 py-3 cursor-pointer hover:bg-gray-50"
            >
              <span className="text-sm font-medium text-gray-700">
                {name}
              </span>

              <span className="text-sm font-semibold text-gray-900 text-center">
                {temp}C
              </span>

              <span className="text-sm font-semibold text-gray-900 text-center">
                {humi}%
              </span>

              <span
                className={`text-sm font-semibold text-right ${
                  status === "ON" ? "text-green-600" : "text-gray-500"
                }`}
              >
                {status}
              </span>
            </div>

            {/* Divider */}
            {index !== listToShow.length - 1 && (
              <div className="mx-4 border-b border-gray-300/70" />
            )}
          </div>
        );
      })}
    </div>
  );
};


  return (
    <div className={`dashboard-right-panel shadow-sm flex flex-col  h-full overflow-y-auto custom-scrollbar p-4 lg:p-4 border-l border-[#E5E7EB]/40 bg-[#078d860c] flex-shrink-0 ${className}`}>
       {closeIcon && onClose && (
    <div className="flex justify-end mb-2">
      <button
        onClick={onClose}
        className="p-2 rounded-full hover:bg-black/10 active:bg-black/20"
        aria-label="Close drawer"
      >
        <X size={22} className="text-gray-700" />
      </button>
    </div>
  )}

  
     
      {/* Top: Cluster Means */}
     
    {effectiveCluster && <ACControl clusterId={effectiveCluster}/>
      
    }
     <div className="mb-4 bg-[#0F5EA8]
rounded-3xl">
        <div className=" text-white px-4 py-5">
  <div className="grid grid-cols-4 items-center text-sm font-medium ">
    <span className="font-thin text-md text-white/70 ">Rack Cluster</span>

    <span className="flex justify-center">
      <img src="/white-temp.svg" className="w-auto h-[2rem]"/>
    </span>

    <span className="flex justify-center">
      <img src="/card-humidity-icon.svg" className="w-auto h-[2rem]"/>
    </span>

    {/* <span className="flex justify-center">❄️</span> */}
     <span className="flex justify-center">
      <img src="/Ac.svg"  className="w-auto h-[2.2rem]"/>
    </span>
  </div>
</div>


        <div className="p-2 bg-white rounded-xl">
          {showMeansSkeleton ? (
            <div className="space-y-2 ">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-8 bg-gray-200 rounded animate-pulse" />
              ))}
            </div>
          ) : (
            renderMeansList()
          )}
        </div>
      </div>

      {/* Divider */}
      {/* <div className="border-t my-3" /> */}

      {/* Bottom: Selected Rack Details */}
      <div className="flex-1 min-h-0">
        <RackDetailsPanel
          rack={selectedRack}
          loading={rackLoading}
          noData={!selectedRack}
          closeIcon={closeIcon}
          onClose={onClose}
          
        />
      </div>
    </div>
  );
}
