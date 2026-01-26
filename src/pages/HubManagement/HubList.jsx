// // src/pages/HubManagement/HubList.jsx
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchHubsByDataCenter } from "../../slices/hubSlice";
// import { useInstallation } from "../../contexts/InstallationContext";
// import "../../styles/pages/management-pages.css";

// const HubList = ({ onHubSelect, selectedHub }) => {

//   const dispatch = useDispatch();
//   const { selectedDataCenter } = useInstallation();

//   const { hubs, loading } = useSelector((state) => state.hub);

//   useEffect(() => {
//     if (selectedDataCenter?._id) {
//       dispatch(fetchHubsByDataCenter(selectedDataCenter._id));
//     }
//   }, [selectedDataCenter, dispatch]);

//   return (
//     <div className="ListPage bg-white rounded-xl shadow-sm w-full h-full border border-[#E5E7EB] p-5">

//       <h2 className="organization-list-header text-center font-semibold mb-4">
//         Hub List
//       </h2>

//       {!selectedDataCenter && (
//         <p className="text-center text-gray-500">
//           Select a Data Center to view its hubs
//         </p>
//       )}

//       <div className="organization-table-scroll h-[63vh] overflow-y-auto">
//         <table className="w-full table-auto">
//           <tbody>
//             {loading.fetch && (
//               <tr><td className="p-4 text-center">Loading...</td></tr>
//             )}

//             {!loading.fetch && hubs.map((hub, index) => (
//               <tr
//                 key={hub._id}
//                 onClick={() => onHubSelect(hub)}
//                 className={`cursor-pointer border-b hover:bg-blue-50 ${
//                   selectedHub?._id === hub._id ? "bg-blue-50 border-blue-300" : ""
//                 }`}
//               >
//                 <td className="py-3 px-4">
//                   {index + 1}. {hub.name}
//                 </td>
//               </tr>
//             ))}

//             {!loading.fetch && hubs.length === 0 && selectedDataCenter && (
//               <tr>
//                 <td className="p-4 text-center text-gray-500">
//                   No hubs found for this Data Center
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//     </div>
//   );
// };

// export default HubList;









// // src/pages/HubManagement/HubList.jsx
// import { Pencil, Trash, Menu } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Swal from "sweetalert2";

// import { fetchHubsByDataCenter, updateHub, deleteHub } from "../../slices/hubSlice";
// import { useInstallation } from "../../contexts/InstallationContext";

// import "../../styles/pages/management-pages.css";
// import TableSkeleton from "../../components/skeletons/TableSkeleton";
// import CloseIcon from "@mui/icons-material/Close";
// import { Drawer, IconButton, useMediaQuery } from "@mui/material";
// import DeleteModal from "../../components/Modals/common/DeleteModal";
// import HubEditModal from "../../components/Modals/Common/HubManagement/HubEditModal";

// // Optional: if you create an Edit modal for Hub, place it here
// // import HubEditModal from "../../components/Modals/HubManagement/EditModal"; // optional - implement later

// const HubList = ({ onHubSelect, selectedHub }) => {
//   const dispatch = useDispatch();
//   const { selectedDataCenter } = useInstallation();

//   const { hubs = [], loading = {}, error } = useSelector((state) => state.hub || {});
//   const isLoading = loading?.fetch;

//   // local UI state
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [deleteOpen, setDeleteOpen] = useState(false);
//   const [editOpen, setEditOpen] = useState(false);
//   const [hubName, setHubName] = useState("");
//   const [hubId, setHubId] = useState(null);
// const [hubDataCenterId, setHubDataCenterId] = useState("");

//   const isDesktop = useMediaQuery("(min-width:768px)");
//   const isMobile = !isDesktop;

//   useEffect(() => {
//     // fetch hubs only when a dataCenter is selected
//     if (selectedDataCenter && selectedDataCenter._id) {
//       dispatch(fetchHubsByDataCenter(selectedDataCenter._id));
//     }
//   }, [selectedDataCenter, dispatch]);

//   useEffect(() => {
//     if (error) {
//       console.error("Hub error:", error);
//     }
//   }, [error]);

//   const handleRowClick = (hub, e) => {
//     if (e && e.stopPropagation) e.stopPropagation();
//     onHubSelect?.(hub);
//     if (isMobile) setDrawerOpen(false);
//   };

//   const handleDeleteOpen = (name, id) => {
//     setHubName(name);
//     setHubId(id);
//     setDeleteOpen(true);
//   };
//   const handleDeleteClose = () => {
//     setHubName("");
//     setHubId(null);
//     setDeleteOpen(false);
//   };

//   const handleEditOpen = (name, id) => {
//     setHubName(name);
//     setHubId(id);
    
//     setEditOpen(true);
//   };
//   const handleEditClose = () => {
//     setHubName("");
//     setHubId(null);
//     setEditOpen(false);
//   };

//   const handleDelete = async (id) => {
//     try {
//       await dispatch(deleteHub(id)).unwrap();
//       Swal.fire({ icon: "success", title: "Deleted", text: "Hub deleted." });
//       handleDeleteClose();
//       // re-fetch hubs for the selected data center (optional - your slice already removes it)
//       if (selectedDataCenter && selectedDataCenter._id) {
//         dispatch(fetchHubsByDataCenter(selectedDataCenter._id));
//       }
//     } catch (err) {
//       console.error("Delete error:", err);
//       Swal.fire({ icon: "error", title: "Delete failed", text: err || "Something went wrong" });
//     }
//   };

//   const handleEdit = async (id, newName) => {
//     try {
//       await dispatch(updateHub({ hubId: id, payload: { name: newName } })).unwrap();
//       Swal.fire({ icon: "success", title: "Updated", text: "Hub updated." });
//       handleEditClose();
//       if (selectedDataCenter && selectedDataCenter._id) {
//         dispatch(fetchHubsByDataCenter(selectedDataCenter._id));
//       }
//     } catch (err) {
//       console.error("Update error:", err);
//       Swal.fire({ icon: "error", title: "Update failed", text: err || "Something went wrong" });
//     }
//   };

//   // show hubs only when a data center is selected — prevents stale list
//   const displayHubs = selectedDataCenter ? hubs : [];

//   const renderListMarkup = () => (
//     <div className="ListPage bg-white rounded-xl lg:rounded-r-none lg:rounded-l-xl shadow-sm w-full h-full border border-[#E5E7EB] p-5 relative">
//       {isDesktop ? (
//         <h1 className="organization-list-title font-semibold text-gray-800 mb-4">
//           Hub Management
//         </h1>
//       ) : (
//         <div className="flex justify-end">
//           <IconButton onClick={() => setDrawerOpen(!drawerOpen)} edge="start" size="small">
//             <CloseIcon />
//           </IconButton>
//         </div>
//       )}

//       <div className="mb-4">
//         <h2 className="organization-list-header text-center font-semibold text-gray-800">
//           Hub List
//         </h2>
//       </div>

//       {!selectedDataCenter && (
//         <div className="p-4 text-center text-gray-500">
//           Please select a Data Center to view and manage its Hubs.
//         </div>
//       )}

//       <div className="overflow-x-auto">
//         <table className="w-full table-auto text-left">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="organization-table-header py-2 px-4 font-bold text-gray-800">Hub Name</th>
//               <th className="organization-table-header py-2 px-4 text-center">Actions</th>
//             </tr>
//           </thead>
//         </table>

//         <div className="organization-table-scroll overflow-y-auto pr-1 h-[63vh] sm:h-[58vh]">
//           <table className="w-full table-auto text-left">
//             <tbody>
//               {isLoading && <TableSkeleton rows={4} />}

//               {!isLoading &&
//                 displayHubs.map((hub, index) => {
//                   const id = hub._id ?? hub.id ?? index;
//                   const displayName = hub.name ?? `Hub ${index + 1}`;

//                   return (
//                     <tr
//                       key={id}
//                       className={`border-b border-gray-200 cursor-pointer transition-colors hover:bg-blue-50/60 ${
//                         selectedHub?._id === id ? "bg-blue-50 border-blue-300" : ""
//                       }`}
//                       onClick={(e) => handleRowClick(hub, e)}
//                     >
//                       <td className="organization-table-cell py-2 sm:py-3 px-2 sm:px-4">
//                         {index + 1}. {displayName}
//                       </td>
//                       <td className="organization-table-cell py-2 sm:py-3 px-2 sm:px-4">
//                         <div className="flex justify-center gap-2 sm:gap-3" onClick={(e) => e.stopPropagation()}>
//                           <button
//                             onClick={() => handleEditOpen(displayName, id)}
//                             className="organization-action-btn rounded-full border border-green-500/50 bg-white flex items-center justify-center hover:bg-green-50 cursor-pointer p-[4px]"
//                           >
//                             <Pencil className="text-green-600 organization-action-icon" size={16} />
//                           </button>
//                           <button
//                             onClick={() => handleDeleteOpen(displayName, id)}
//                             className="organization-action-btn rounded-full border border-red-500/50 bg-white flex items-center justify-center hover:bg-red-50 cursor-pointer p-[4px]"
//                           >
//                             <Trash className="text-red-600 organization-action-icon" size={16} />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })}

//               {!isLoading && displayHubs.length === 0 && selectedDataCenter && (
//                 <tr>
//                   <td className="p-4 text-center text-gray-500">No hubs found for this Data Center.</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <>
//       {isDesktop ? (
//         renderListMarkup()
//       ) : (
//         <>
//           <div className="flex items-center justify-between mb-4">
//             <img src="/logo-half.png" className="w-auto h-[30px]" />
//             <h1 className="organization-list-title font-semibold text-gray-800">Hub Management</h1>
//             <IconButton size="small" onClick={() => setDrawerOpen(true)}>
//               <Menu size={20} />
//             </IconButton>
//           </div>

//           <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)} PaperProps={{ style: { width: "100%" } }}>
//             {renderListMarkup()}
//           </Drawer>
//         </>
//       )}

//       {deleteOpen && (
//         <DeleteModal
//           open={deleteOpen}
//           handleClose={handleDeleteClose}
//           handleDelete={() => handleDelete(hubId)}
//           itemName={hubName}
//           itemLabel="Hub"
//           itemId={hubId}
//         />
//       )}

//       {editOpen && typeof HubEditModal !== "undefined" && (
//         <HubEditModal
//           open={editOpen}
//           handleClose={handleEditClose}
//           hubId={hubId}
//           hubName={hubName}
//           hubDataCenterId={hub.dataCenter?._id || hub.dataCenterId}
//           handleEdit={(id, newName) => handleEdit(id, newName)}
//         />
//       )}
//     </>
//   );
// };

// export default HubList;











// // src/pages/HubManagement/HubList.jsx
// import { Pencil, Trash, Menu } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Swal from "sweetalert2";

// import { fetchHubsByDataCenter, updateHub, deleteHub } from "../../slices/hubSlice";
// import { useInstallation } from "../../contexts/InstallationContext";

// import "../../styles/pages/management-pages.css";
// import TableSkeleton from "../../components/skeletons/TableSkeleton";
// import CloseIcon from "@mui/icons-material/Close";
// import { Drawer, IconButton, useMediaQuery } from "@mui/material";
// import DeleteModal from "../../components/Modals/common/DeleteModal";
// import HubEditModal from "../../components/Modals/Common/HubManagement/HubEditModal";

// const HubList = ({ onHubSelect, selectedHub }) => {
//   const dispatch = useDispatch();
//   const { selectedDataCenter } = useInstallation();

//   const { hubs = [], loading = {}, error } = useSelector((state) => state.hub || {});
//   const isLoading = loading?.fetch;

//   // local UI state
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [deleteOpen, setDeleteOpen] = useState(false);
//   const [editOpen, setEditOpen] = useState(false);
//   const [hubName, setHubName] = useState("");
//   const [hubId, setHubId] = useState(null);
//   const [hubDataCenterId, setHubDataCenterId] = useState("");

//   const isDesktop = useMediaQuery("(min-width:768px)");
//   const isMobile = !isDesktop;

//   useEffect(() => {
//     if (selectedDataCenter && selectedDataCenter._id) {
//       dispatch(fetchHubsByDataCenter(selectedDataCenter._id));
//     }
//   }, [selectedDataCenter, dispatch]);

//   useEffect(() => {
//     if (error) {
//       console.error("Hub error:", error);
//     }
//   }, [error]);

//   const handleRowClick = (hub, e) => {
//     if (e && e.stopPropagation) e.stopPropagation();
//     onHubSelect?.(hub);
//     if (isMobile) setDrawerOpen(false);
//   };

//   const handleDeleteOpen = (name, id) => {
//     setHubName(name);
//     setHubId(id);
//     setDeleteOpen(true);
//   };
//   const handleDeleteClose = () => {
//     setHubName("");
//     setHubId(null);
//     setDeleteOpen(false);
//   };

//   // pass full hub object to get DataCenterId
// //   const handleEditOpen = (hub) => {
// //     console.log("hub>", hub);
// //     setHubName(hub.name || "");
// //     setHubId(hub._id);
// //     setHubDataCenterId(hub.dataCenter?._id || hub.dataCenterId || "");
// //     setEditOpen(true);
// //   };

// const handleEditOpen = (hub) => {
//   console.log("hub>", hub);

//   setHubName(hub.name || "");
//   setHubId(hub._id || hub.id); // ✅ FIX
//   setHubDataCenterId(
//     hub.dataCenter?._id || hub.dataCenterId || ""
//   );

//   setEditOpen(true);
// };

//   const handleEditClose = () => {
//     setHubName("");
//     setHubId(null);
//     setHubDataCenterId("");
//     setEditOpen(false);
//   };

//   const handleDelete = async (id) => {
//     try {
//       await dispatch(deleteHub(id)).unwrap();
//       Swal.fire({ icon: "success", title: "Deleted", text: "Hub deleted." });
//       handleDeleteClose();
//       if (selectedDataCenter && selectedDataCenter._id) {
//         dispatch(fetchHubsByDataCenter(selectedDataCenter._id));
//       }
//     } catch (err) {
//       console.error("Delete error:", err);
//       Swal.fire({ icon: "error", title: "Delete failed", text: err || "Something went wrong" });
//     }
//   };

//   const handleEdit = async (id, newName) => {
//     try {
//       await dispatch(updateHub({ hubId: id, payload: { name: newName } })).unwrap();
//       Swal.fire({ icon: "success", title: "Updated", text: "Hub updated." });
//       handleEditClose();
//       if (selectedDataCenter && selectedDataCenter._id) {
//         dispatch(fetchHubsByDataCenter(selectedDataCenter._id));
//       }
//     } catch (err) {
//       console.error("Update error:", err);
//       Swal.fire({ icon: "error", title: "Update failed", text: err || "Something went wrong" });
//     }
//   };

//   const displayHubs = selectedDataCenter ? hubs : [];

//   const renderListMarkup = () => (
//     <div className="ListPage bg-white rounded-xl lg:rounded-r-none lg:rounded-l-xl shadow-sm w-full h-full border border-[#E5E7EB] p-5 relative">
//       {isDesktop ? (
//         <h1 className="organization-list-title font-semibold text-gray-800 mb-4">
//           Hub Management
//         </h1>
//       ) : (
//         <div className="flex justify-end">
//           <IconButton onClick={() => setDrawerOpen(!drawerOpen)} edge="start" size="small">
//             <CloseIcon />
//           </IconButton>
//         </div>
//       )}

//       <div className="mb-4">
//         <h2 className="organization-list-header text-center font-semibold text-gray-800">
//           Hub List
//         </h2>
//       </div>

//       {!selectedDataCenter && (
//         <div className="p-4 text-center text-gray-500">
//           Please select a Data Center to view and manage its Hubs.
//         </div>
//       )}

//       <div className="overflow-x-auto">
//         <table className="w-full table-auto text-left">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="organization-table-header py-2 px-4 font-bold text-gray-800">Hub Name</th>
//               <th className="organization-table-header py-2 px-4 text-center">Actions</th>
//             </tr>
//           </thead>
//         </table>

//         <div className="organization-table-scroll overflow-y-auto pr-1 h-[63vh] sm:h-[58vh]">
//           <table className="w-full table-auto text-left">
//             <tbody>
//               {isLoading && <TableSkeleton rows={4} />}

//               {!isLoading &&
//                 displayHubs.map((hub, index) => {
//                   const id = hub._id ?? hub.id ?? index;
//                   const displayName = hub.name ?? `Hub ${index + 1}`;

//                   return (
//                     <tr
//                       key={id}
//                       className={`border-b border-gray-200 cursor-pointer transition-colors hover:bg-blue-50/60 ${
//                         selectedHub?._id === id ? "bg-blue-50 border-blue-300" : ""
//                       }`}
//                       onClick={(e) => handleRowClick(hub, e)}
//                     >
//                       <td className="organization-table-cell py-2 sm:py-3 px-2 sm:px-4">
//                         {index + 1}. {displayName}
//                       </td>
//                       <td className="organization-table-cell py-2 sm:py-3 px-2 sm:px-4">
//                         <div className="flex justify-center gap-2 sm:gap-3" onClick={(e) => e.stopPropagation()}>
//                           <button
//                             onClick={() => handleEditOpen(hub)}
//                             className="organization-action-btn rounded-full border border-green-500/50 bg-white flex items-center justify-center hover:bg-green-50 cursor-pointer p-[4px]"
//                           >
//                             <Pencil className="text-green-600 organization-action-icon" size={16} />
//                           </button>
//                           <button
//                             onClick={() => handleDeleteOpen(displayName, id)}
//                             className="organization-action-btn rounded-full border border-red-500/50 bg-white flex items-center justify-center hover:bg-red-50 cursor-pointer p-[4px]"
//                           >
//                             <Trash className="text-red-600 organization-action-icon" size={16} />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })}

//               {!isLoading && displayHubs.length === 0 && selectedDataCenter && (
//                 <tr>
//                   <td className="p-4 text-center text-gray-500">No hubs found for this Data Center.</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <>
//       {isDesktop ? (
//         renderListMarkup()
//       ) : (
//         <>
//           <div className="flex items-center justify-between mb-4">
//             <img src="/logo-half.png" className="w-auto h-[30px]" />
//             <h1 className="organization-list-title font-semibold text-gray-800">Hub Management</h1>
//             <IconButton size="small" onClick={() => setDrawerOpen(true)}>
//               <Menu size={20} />
//             </IconButton>
//           </div>

//           <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)} PaperProps={{ style: { width: "100%" } }}>
//             {renderListMarkup()}
//           </Drawer>
//         </>
//       )}

//       {deleteOpen && (
//         <DeleteModal
//           open={deleteOpen}
//           handleClose={handleDeleteClose}
//           handleDelete={() => handleDelete(hubId)}
//           itemName={hubName}
//           itemLabel="Hub"
//           itemId={hubId}
//         />
//       )}

//       {editOpen && (
//         <HubEditModal
//           open={editOpen}
//           handleClose={handleEditClose}
//           hubId={hubId}
//           hubName={hubName}
//           hubDataCenterId={hubDataCenterId}
//           handleEdit={(id, newName) => handleEdit(id, newName)}
//         />
//       )}
//     </>
//   );
// };

// export default HubList;













// // src/pages/HubManagement/HubList.jsx
// import { Pencil, Trash, Menu } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Swal from "sweetalert2";

// import { fetchHubsByDataCenter, updateHub, deleteHub } from "../../slices/hubSlice";
// import { useInstallation } from "../../contexts/InstallationContext";

// import "../../styles/pages/management-pages.css";
// import TableSkeleton from "../../components/skeletons/TableSkeleton";
// import CloseIcon from "@mui/icons-material/Close";
// import { Drawer, IconButton, useMediaQuery } from "@mui/material";
// import DeleteModal from "../../components/Modals/common/DeleteModal";
// import HubEditModal from "../../components/Modals/Common/HubManagement/HubEditModal";

// const HubList = () => {
//   const dispatch = useDispatch();
//   const { selectedDataCenter, selectedHub, setSelectedHub } = useInstallation();

//   const { hubs = [], loading = {}, error } = useSelector((state) => state.hub || {});
//   const isLoading = loading?.fetch;

//   // local UI state
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [deleteOpen, setDeleteOpen] = useState(false);
//   const [editOpen, setEditOpen] = useState(false);
//   const [hubName, setHubName] = useState("");
//   const [hubId, setHubId] = useState(null);
//   const [hubDataCenterId, setHubDataCenterId] = useState("");

//   const isDesktop = useMediaQuery("(min-width:768px)");
//   const isMobile = !isDesktop;

//   useEffect(() => {
//     if (selectedDataCenter && selectedDataCenter._id) {
//       dispatch(fetchHubsByDataCenter(selectedDataCenter._id));
//     }
//   }, [selectedDataCenter, dispatch]);

//   useEffect(() => {
//     if (error) console.error("Hub error:", error);
//   }, [error]);

//   const handleRowClick = (hub, e) => {
//     e?.stopPropagation();
//     // persist selection in InstallationContext
//     setSelectedHub(hub);
//     if (isMobile) setDrawerOpen(false);
//   };

//   const handleDeleteOpen = (name, id) => {
//     setHubName(name);
//     setHubId(id);
//     setDeleteOpen(true);
//   };
//   const handleDeleteClose = () => {
//     setHubName("");
//     setHubId(null);
//     setDeleteOpen(false);
//   };

//   const handleEditOpen = (hub) => {
//     setHubName(hub.name || "");
//     setHubId(hub._id || hub.id);
//     setHubDataCenterId(hub.dataCenter?._id || hub.dataCenterId || "");
//     setEditOpen(true);
//   };

//   const handleEditClose = () => {
//     setHubName("");
//     setHubId(null);
//     setHubDataCenterId("");
//     setEditOpen(false);
//   };

//   const handleDelete = async (id) => {
//     try {
//       await dispatch(deleteHub(id)).unwrap();
//       Swal.fire({ icon: "success", title: "Deleted", text: "Hub deleted." });
//       handleDeleteClose();
//       if (selectedDataCenter && selectedDataCenter._id) {
//         dispatch(fetchHubsByDataCenter(selectedDataCenter._id));
//         // if deleted hub was selected, clear selection
//         if (selectedHub?._id === id) setSelectedHub(null);
//       }
//     } catch (err) {
//       console.error("Delete error:", err);
//       Swal.fire({ icon: "error", title: "Delete failed", text: err || "Something went wrong" });
//     }
//   };

//   const handleEdit = async (id, newName) => {
//     try {
//       await dispatch(updateHub({ hubId: id, payload: { name: newName } })).unwrap();
//       Swal.fire({ icon: "success", title: "Updated", text: "Hub updated." });
//       handleEditClose();
//       if (selectedDataCenter && selectedDataCenter._id) {
//         dispatch(fetchHubsByDataCenter(selectedDataCenter._id));
//       }
//     } catch (err) {
//       console.error("Update error:", err);
//       Swal.fire({ icon: "error", title: "Update failed", text: err || "Something went wrong" });
//     }
//   };

//   const displayHubs = selectedDataCenter ? hubs : [];

//   const renderListMarkup = () => (
//     <div className="ListPage bg-white rounded-xl lg:rounded-r-none lg:rounded-l-xl shadow-sm w-full h-full border border-[#E5E7EB] p-5 relative">
//       {isDesktop ? (
//         // <h1 className="organization-list-title font-semibold text-gray-800 mb-4">
//         //   Hub Management
//         // </h1>

//         <>
//         </>
//       ) : (
//         <div className="flex justify-end">
//           <IconButton onClick={() => setDrawerOpen(!drawerOpen)} edge="start" size="small">
//             <CloseIcon />
//           </IconButton>
//         </div>
//       )}

//       <div className="mb-4">
//         <h2 className="organization-list-header text-center font-semibold text-gray-800">
//           Hub List
//         </h2>
//       </div>

//       {!selectedDataCenter && (
//         <div className="p-4 text-center text-gray-500">
//           Please select a Data Center to view and manage its Hubs.
//         </div>
//       )}

//       <div className="overflow-x-auto">
//         <table className="w-full table-auto text-left">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="organization-table-header py-2 px-4 font-bold text-gray-800">Hub Name</th>
//               <th className="organization-table-header py-2 px-4 text-center">Actions</th>
//             </tr>
//           </thead>
//         </table>

//         <div className="organization-table-scroll overflow-y-auto pr-1 h-[63vh] sm:h-[58vh]">
//           <table className="w-full table-auto text-left">
//             <tbody>
//               {isLoading && <TableSkeleton rows={4} />}

//               {!isLoading &&
//                 displayHubs.map((hub, index) => {
//                   const id = hub._id ?? hub.id ?? index;
//                   const displayName = hub.name ?? `Hub ${index + 1}`;

//                   return (
//                     <tr
//                       key={id}
//                       className={`border-b border-gray-200 cursor-pointer transition-colors hover:bg-blue-50/60 ${
//                         selectedHub?._id === id ? "bg-blue-50 border-blue-300" : ""
//                       }`}
//                       onClick={(e) => handleRowClick(hub, e)}
//                     >
//                       <td className="organization-table-cell py-2 sm:py-3 px-2 sm:px-4">
//                         {index + 1}. {displayName}
//                       </td>
//                       <td className="organization-table-cell py-2 sm:py-3 px-2 sm:px-4">
//                         <div className="flex justify-center gap-2 sm:gap-3" onClick={(e) => e.stopPropagation()}>
//                           <button
//                             onClick={() => handleEditOpen(hub)}
//                             className="organization-action-btn rounded-full border border-green-500/50 bg-white flex items-center justify-center hover:bg-green-50 cursor-pointer p-[4px]"
//                           >
//                             <Pencil className="text-green-600 organization-action-icon" size={16} />
//                           </button>
//                           <button
//                             onClick={() => handleDeleteOpen(displayName, id)}
//                             className="organization-action-btn rounded-full border border-red-500/50 bg-white flex items-center justify-center hover:bg-red-50 cursor-pointer p-[4px]"
//                           >
//                             <Trash className="text-red-600 organization-action-icon" size={16} />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })}

//               {!isLoading && displayHubs.length === 0 && selectedDataCenter && (
//                 <tr>
//                   <td className="p-4 text-center text-gray-500">No hubs found for this Data Center.</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
  

//   return (
//     <>
//       {isDesktop ? (
//         renderListMarkup()
//       ) : (
//         <>
//           <div className="flex items-center justify-between mb-4">
//             <img src="/logo-half.png" className="w-auto h-[30px]" />
//             <h1 className="organization-list-title font-semibold text-gray-800">Hub Management</h1>
//             <IconButton size="small" onClick={() => setDrawerOpen(true)}>
//               <Menu size={20} />
//             </IconButton>
//           </div>

//           <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)} PaperProps={{ style: { width: "100%" } }}>
//             {renderListMarkup()}
//           </Drawer>
//         </>
//       )}

//       {deleteOpen && (
//         <DeleteModal
//           open={deleteOpen}
//           handleClose={handleDeleteClose}
//           handleDelete={() => handleDelete(hubId)}
//           itemName={hubName}
//           itemLabel="Hub"
//           itemId={hubId}
//         />
//       )}

//       {editOpen && (
//         <HubEditModal
//           open={editOpen}
//           handleClose={handleEditClose}
//           hubId={hubId}
//           hubName={hubName}
//           hubDataCenterId={hubDataCenterId}
//           handleEdit={(id, newName) => handleEdit(id, newName)}
//         />
//       )}
//     </>
//   );
// };

// export default HubList;













// src/pages/HubManagement/HubList.jsx
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import { fetchHubsByDataCenter, updateHub, deleteHub } from "../../slices/hubSlice";
import { useInstallation } from "../../contexts/InstallationContext";

import "../../styles/pages/management-pages.css";
import TableSkeleton from "../../components/skeletons/TableSkeleton";
import CloseIcon from "@mui/icons-material/Close";
import { Drawer, IconButton, useMediaQuery } from "@mui/material";
import DeleteModal from "../../components/Modals/common/DeleteModal";
import HubEditModal from "../../components/Modals/Common/HubManagement/HubEditModal";

import ManagementListShell from "../../components/Modals/Common/ManagementListShell";
import ActionButtons from "../../components/Modals/Common/ActionButtons";

const HubList = () => {
  const dispatch = useDispatch();
  const { selectedDataCenter, selectedHub, setSelectedHub } = useInstallation();

  const { hubs = [], loading = {}, error } = useSelector((state) => state.hub || {});
  const isLoading = loading?.fetch;

  // local UI state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [hubName, setHubName] = useState("");
  const [hubId, setHubId] = useState(null);
  const [hubDataCenterId, setHubDataCenterId] = useState("");

  const isDesktop = useMediaQuery("(min-width:768px)");
  const isMobile = !isDesktop;

  useEffect(() => {
    if (selectedDataCenter && selectedDataCenter._id) {
      dispatch(fetchHubsByDataCenter(selectedDataCenter._id));
    }
  }, [selectedDataCenter, dispatch]);

  useEffect(() => {
    if (error) console.error("Hub error:", error);
  }, [error]);

  const handleRowClick = (hub, e) => {
    e?.stopPropagation();
    // persist selection in InstallationContext
    setSelectedHub(hub);
    if (isMobile) setDrawerOpen(false);
  };

  const handleDeleteOpen = (name, id) => {
    setHubName(name);
    setHubId(id);
    setDeleteOpen(true);
  };
  const handleDeleteClose = () => {
    setHubName("");
    setHubId(null);
    setDeleteOpen(false);
  };

  const handleEditOpen = (hub) => {
    setHubName(hub.name || "");
    setHubId(hub._id || hub.id);
    setHubDataCenterId(hub.dataCenter?._id || hub.dataCenterId || "");
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setHubName("");
    setHubId(null);
    setHubDataCenterId("");
    setEditOpen(false);
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteHub(id)).unwrap();
      Swal.fire({ icon: "success", title: "Deleted", text: "Hub deleted." });
      handleDeleteClose();
      if (selectedDataCenter && selectedDataCenter._id) {
        dispatch(fetchHubsByDataCenter(selectedDataCenter._id));
        // if deleted hub was selected, clear selection
        if (selectedHub?._id === id) setSelectedHub(null);
      }
    } catch (err) {
      console.error("Delete error:", err);
      Swal.fire({ icon: "error", title: "Delete failed", text: err || "Something went wrong" });
    }
  };

  const handleEdit = async (id, newName) => {
    try {
      await dispatch(updateHub({ hubId: id, payload: { name: newName } })).unwrap();
      Swal.fire({ icon: "success", title: "Updated", text: "Hub updated." });
      handleEditClose();
      if (selectedDataCenter && selectedDataCenter._id) {
        dispatch(fetchHubsByDataCenter(selectedDataCenter._id));
      }
    } catch (err) {
      console.error("Update error:", err);
      Swal.fire({ icon: "error", title: "Update failed", text: err || "Something went wrong" });
    }
  };

  const displayHubs = Array.isArray(hubs) ? hubs : [];

  const renderListMarkup = () => (
    <div className="relative min-h-0">
      {/* mobile close button */}
      {!isDesktop && (
        <div className="flex justify-end p-2">
          <IconButton onClick={() => setDrawerOpen(false)} size="small">
            <CloseIcon />
          </IconButton>
        </div>
      )}

      <ManagementListShell
        className="h-[96%] md:h-[81.5vh] 2xl:h-[83vh]"
        columns={
          <>
            <th className="py-2 px-4 font-bold text-gray-800">Hub Name</th>
            <th className="py-2 px-4 w-[120px] text-center">Actions</th>
          </>
        }
      >
        {isLoading && (
          <tr>
            <td colSpan={2} className="p-4">
              <TableSkeleton rows={4} />
            </td>
          </tr>
        )}

        {!isLoading && !selectedDataCenter && (
          <tr>
            <td colSpan={2} className="p-4 text-center text-gray-500">
              Please select a Data Center to view and manage its Hubs.
            </td>
          </tr>
        )}

        {!isLoading &&
          selectedDataCenter &&
          displayHubs.map((hub, index) => {
            const id = hub._id ?? hub.id ?? index;
            const displayName = hub.name ?? `Hub ${index + 1}`;

            return (
              <tr
                key={id}
                className={`border-b border-gray-200 cursor-pointer transition-colors hover:bg-blue-50/60 ${
                  selectedHub?._id === id ? "bg-blue-50 border-blue-300" : ""
                }`}
                onClick={(e) => handleRowClick(hub, e)}
              >
                <td className="py-2 sm:py-3 px-2 sm:px-4">{displayName}</td>

                <td className="py-2 sm:py-3 px-2 sm:px-4 text-center">
                  <ActionButtons
                    item={hub}
                    onEdit={(item) => handleEditOpen(item)}
                    onDelete={(item) => handleDeleteOpen(item.name, item._id)}
                  />
                </td>
              </tr>
            );
          })}

        {!isLoading && selectedDataCenter && displayHubs.length === 0 && (
          <tr>
            <td colSpan={2} className="p-4 text-center text-gray-500">
              No hubs found for this Data Center.
            </td>
          </tr>
        )}
      </ManagementListShell>
    </div>
  );

  return (
    <>
      {isDesktop ? (
        renderListMarkup()
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            <img src="/logo-half.png" className="w-auto h-[30px]" />
            <h1 className="organization-list-title font-semibold text-gray-800">Hub Management</h1>
            <IconButton size="small" onClick={() => setDrawerOpen(true)}>
              <Menu size={20} />
            </IconButton>
          </div>

          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            PaperProps={{ style: { width: "100%" } }}
          >
            <div className="p-4">{renderListMarkup()}</div>
          </Drawer>
        </>
      )}

      {deleteOpen && (
        <DeleteModal
          open={deleteOpen}
          handleClose={handleDeleteClose}
          handleDelete={() => handleDelete(hubId)}
          itemName={hubName}
          itemLabel="Hub"
          itemId={hubId}
        />
      )}

      {editOpen && (
        <HubEditModal
          open={editOpen}
          handleClose={handleEditClose}
          hubId={hubId}
          hubName={hubName}
          hubDataCenterId={hubDataCenterId}
          handleEdit={(id, newName) => handleEdit(id, newName)}
        />
      )}
    </>
  );
};

export default HubList;
