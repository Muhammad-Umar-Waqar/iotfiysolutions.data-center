// // src/pages/RackClusterManagement/RackClusterList.jsx
// import { Trash } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Swal from "sweetalert2";

// import {
//   fetchRackClustersByAcKit,
//   deleteRackCluster,
// } from "../../slices/rackClusterSlice";

// import { useInstallation } from "../../contexts/InstallationContext";
// import TableSkeleton from "../../components/skeletons/TableSkeleton";
// import DeleteModal from "../../components/Modals/common/DeleteModal";

// import "../../styles/pages/management-pages.css";

// const RackClusterList = () => {
//   const dispatch = useDispatch();
//   const {
//     selectedAcKit,
//     selectedRackCluster,
//     setSelectedRackCluster,
//   } = useInstallation();

//   const { rackClusters = [], loading = {} } = useSelector(
//     (state) => state.rackCluster || {}
//   );

//   const isLoading = loading.fetch;

//   const [deleteOpen, setDeleteOpen] = useState(false);
//   const [clusterName, setClusterName] = useState("");
//   const [clusterId, setClusterId] = useState(null);

//   /* ---------------------------
//      Fetch when AC Kit changes
//   ---------------------------- */
//   useEffect(() => {
//     if (selectedAcKit?._id) {
//       dispatch(fetchRackClustersByAcKit(selectedAcKit._id));
//     }
//   }, [selectedAcKit, dispatch]);

//   /* ---------------------------
//      Row select
//   ---------------------------- */
//   const handleRowClick = (cluster) => {
//     setSelectedRackCluster(cluster);
//   };

//   /* ---------------------------
//      Delete handlers
//   ---------------------------- */
//   const handleDeleteOpen = (name, id) => {
//     setClusterName(name);
//     setClusterId(id);
//     setDeleteOpen(true);
//   };

//   const handleDeleteClose = () => {
//     setClusterName("");
//     setClusterId(null);
//     setDeleteOpen(false);
//   };

//   const handleDelete = async (id) => {
//     try {
//       await dispatch(deleteRackCluster(id)).unwrap();

//       Swal.fire({
//         icon: "success",
//         title: "Deleted",
//         text: "Rack Cluster deleted successfully.",
//       });

//       handleDeleteClose();

//       if (selectedAcKit?._id) {
//         dispatch(fetchRackClustersByAcKit(selectedAcKit._id));
//       }
//     } catch (err) {
//       Swal.fire({
//         icon: "error",
//         title: "Delete failed",
//         text: err || "Something went wrong",
//       });
//     }
//   };

//   /* ---------------------------
//      UI
//   ---------------------------- */
//   return (
//     <div className="ListPage bg-white rounded-xl shadow-sm w-full h-full border border-[#E5E7EB] p-5">
//       <h2 className="organization-list-header text-center font-semibold mb-4">
//         Rack Cluster List
//       </h2>

//       {!selectedAcKit && (
//         <div className="p-4 text-center text-gray-500">
//           Please select an AC Kit to view Rack Clusters.
//         </div>
//       )}

//       <div className="overflow-x-auto">
//         <table className="w-full table-auto text-left">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="organization-table-header py-2 px-4">
//                 Rack Cluster Name
//               </th>
//               <th className="organization-table-header py-2 px-4 text-center">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//         </table>

//         <div className="organization-table-scroll overflow-y-auto h-[60vh] pr-1">
//           <table className="w-full table-auto text-left">
//             <tbody>
//               {isLoading && <TableSkeleton rows={4} />}

//               {!isLoading &&
//                 rackClusters.map((cluster, index) => {
//                   const id = cluster._id;
//                   const name = cluster.name || `Cluster ${index + 1}`;

//                   return (
//                     <tr
//                       key={id}
//                       onClick={() => handleRowClick(cluster)}
//                       className={`border-b cursor-pointer transition-colors hover:bg-blue-50/60 ${
//                         selectedRackCluster?._id === id
//                           ? "bg-blue-50 border-blue-300"
//                           : ""
//                       }`}
//                     >
//                       <td className="py-2 px-4">
//                         {index + 1}. {name}
//                       </td>

//                       <td className="py-2 px-4">
//                         <div
//                           className="flex justify-center"
//                           onClick={(e) => e.stopPropagation()}
//                         >
//                           <button
//                             onClick={() => handleDeleteOpen(name, id)}
//                             className="rounded-full border border-red-500/50 bg-white hover:bg-red-50 p-[4px]"
//                           >
//                             <Trash size={16} className="text-red-600" />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })}

//               {!isLoading &&
//                 rackClusters.length === 0 &&
//                 selectedAcKit && (
//                   <tr>
//                     <td className="p-4 text-center text-gray-500">
//                       No Rack Clusters found.
//                     </td>
//                   </tr>
//                 )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Delete Modal */}
//       {deleteOpen && (
//         <DeleteModal
//           open={deleteOpen}
//           handleClose={handleDeleteClose}
//           handleDelete={() => handleDelete(clusterId)}
//           itemName={clusterName}
//           itemLabel="Rack Cluster"
//           itemId={clusterId}
//         />
//       )}
//     </div>
//   );
// };

// export default RackClusterList;

















// // src/pages/RackClusterManagement/RackClusterList.jsx
// import { Trash, Menu, Pencil } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Swal from "sweetalert2";

// import {
//   fetchRackClustersByAcKit,
//   deleteRackCluster,
//   fetchRackClustersByDataCenter,
// } from "../../slices/rackClusterSlice";

// import { useInstallation } from "../../contexts/InstallationContext";

// import "../../styles/pages/management-pages.css";
// import TableSkeleton from "../../components/skeletons/TableSkeleton";
// import CloseIcon from "@mui/icons-material/Close";
// import { Drawer, IconButton, useMediaQuery } from "@mui/material";
// import DeleteModal from "../../components/Modals/common/DeleteModal";
// import EditRackCluster from "../../components/Modals/Common/RackClusterManagement/EditRackCluster";
// // import EditRackCluster from "../../components/Modals/Common/RackClusterManagement/EditRackCluster";

// const RackClusterList = () => {
//   const dispatch = useDispatch();

//   const {
//     // selectedAcKit,
//     // selectedRackCluster,
//     // setSelectedRackCluster,
//     selectedDataCenter
//   } = useInstallation();

//   // const { rackClusters = [], loading = {} } = useSelector(
//   //   (state) => state.rackCluster || {}
//   // );


//   const { clusters = [], loading = {} } = useSelector(
//    (state) => state.rackCluster || {}
//  );


//   // const { clusters = [], loading } = useSelector((state) => state.rackCluster || {});

//   const isLoading = loading?.fetch;

//   // UI state
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [deleteOpen, setDeleteOpen] = useState(false);
//   const [clusterName, setClusterName] = useState("");
//   const [clusterId, setClusterId] = useState(null);
// const [editOpen, setEditOpen] = useState(false);
// const isDesktop = useMediaQuery("(min-width:768px)");
// const isMobile = !isDesktop;

// const [selectedRackCluster, setSelectedRackCluster] = useState(null);
//   /* ---------------------------
//      Fetch clusters by AC Kit
//   ---------------------------- */
//   useEffect(() => {
//     if (selectedDataCenter?._id) {
//       dispatch(fetchRackClustersByDataCenter(selectedDataCenter._id));
//     }
//   }, [selectedDataCenter, dispatch]);

//   /* ---------------------------
//      Row selection
//   ---------------------------- */
//   const handleRowClick = (cluster, e) => {
//     if (e && e.stopPropagation) e.stopPropagation();
//     setSelectedRackCluster(cluster);
//     if (isMobile) setDrawerOpen(false);
//   };

//   /* ---------------------------
//      Delete handlers
//   ---------------------------- */
//   const handleDeleteOpen = (name, id) => {
//     setClusterName(name);
//     setClusterId(id);
//     setDeleteOpen(true);
//   };

//   const handleDeleteClose = () => {
//     setClusterName("");
//     setClusterId(null);
//     setDeleteOpen(false);
//   };

//   const handleDelete = async (id) => {
//     try {
//       await dispatch(deleteRackCluster(id)).unwrap();

//       Swal.fire({
//         icon: "success",
//         title: "Deleted",
//         text: "Rack Cluster deleted successfully.",
//       });

//       handleDeleteClose();

//       if (selectedDataCenter?._id) {
//         // dispatch(fetchRackClustersByAcKit(selectedDataCenter._id));
//         dispatch(fetchRackClustersByDataCenter(selectedDataCenter._id));
//       }
//     } catch (err) {
//       Swal.fire({
//         icon: "error",
//         title: "Delete failed",
//         text: err || "Something went wrong",
//       });
//     }
//   };

//   const displayClusters = selectedDataCenter ? clusters : [];

//   /* ---------------------------
//      Shared markup (Desktop + Drawer)
//   ---------------------------- */
//   const renderListMarkup = () => (
//     <div className="ListPage bg-white rounded-xl lg:rounded-r-none lg:rounded-l-xl shadow-sm w-full h-full border border-[#E5E7EB] p-5 relative">
//       {isDesktop ? (
//         <h1 className="organization-list-title font-semibold text-gray-800 mb-4">
//           Rack Cluster Management
//         </h1>
//       ) : (
//         <div className="flex justify-end">
//           <IconButton
//             onClick={() => setDrawerOpen(false)}
//             edge="start"
//             size="small"
//           >
//             <CloseIcon />
//           </IconButton>
//         </div>
//       )}

//       <div className="mb-4">
//         <h2 className="organization-list-header text-center font-semibold text-gray-800">
//           Rack Cluster List
//         </h2>
//       </div>

//       {!selectedDataCenter && (
//         <div className="p-4 text-center text-gray-500">
//           Please select an Data Center Kit to view Rack Clusters.
//         </div>
//       )}

//       <div className="overflow-x-auto">
//         <table className="w-full table-auto text-left">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="organization-table-header py-2 px-4 font-bold text-gray-800">
//                 Rack Cluster Name
//               </th>
//               <th className="organization-table-header py-2 px-4 text-center">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//         </table>

//         <div className="organization-table-scroll overflow-y-auto pr-1 h-[63vh] sm:h-[58vh]">
//           <table className="w-full table-auto text-left">
//             <tbody>
//               {isLoading && <TableSkeleton rows={4} />}

//               {!isLoading &&
//                 displayClusters.map((cluster, index) => {
//                   const id = cluster._id ?? cluster.id ?? index;
//                   const name = cluster.name ?? `Cluster ${index + 1}`;

//                   return (
//                     <tr
//                       key={id}
//                       className={`border-b border-gray-200 cursor-pointer transition-colors hover:bg-blue-50/60 ${
//                         selectedRackCluster?._id === id
//                           ? "bg-blue-50 border-blue-300"
//                           : ""
//                       }`}
//                       onClick={(e) => handleRowClick(cluster, e)}
//                     >
//                       <td className="organization-table-cell py-2 sm:py-3 px-2 sm:px-4">
//                         {index + 1}. {name}
//                       </td>

//                       <td className="organization-table-cell py-2 sm:py-3 px-2 sm:px-4">
//                         <div
//                           className="flex justify-center gap-3"
//                           onClick={(e) => e.stopPropagation()}
//                         >
//                           <button
//                         //   onClick={() => 
//                         //     setSelectedRackCluster(cluster)
//                         // }

//                         onClick={() => {
//                           setSelectedRackCluster(cluster);
//                           setEditOpen(true);
//                         }}

//                           className="organization-action-btn rounded-full border border-green-500/50 p-[6px] bg-white"
//                         >
//                            <Pencil className="text-green-600" size={16} />
//                         </button>


//                           <button
//                             onClick={() => handleDeleteOpen(name, id)}
//                             className="organization-action-btn rounded-full border border-red-500/50 bg-white flex items-center justify-center hover:bg-red-50 cursor-pointer p-[4px]"
//                           >
//                             <Trash
//                               className="text-red-600 organization-action-icon"
//                               size={16}
//                             />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })}

//               {!isLoading &&
//                 displayClusters.length === 0 &&
//                 selectedDataCenter && (
//                   <tr>
//                     <td className="p-4 text-center text-gray-500">
//                       No Rack Clusters found for this AC Kit.
//                     </td>
//                   </tr>
//                 )}
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
//           {/* Mobile header */}
//           <div className="flex items-center justify-between mb-4">
//             <img src="/logo-half.png" className="w-auto h-[30px]" />
//             <h1 className="organization-list-title font-semibold text-gray-800">
//               Rack Cluster Management
//             </h1>
//             <IconButton size="small" onClick={() => setDrawerOpen(true)}>
//               <Menu size={20} />
//             </IconButton>
//           </div>

//           <Drawer
//             anchor="right"
//             open={drawerOpen}
//             onClose={() => setDrawerOpen(false)}
//             PaperProps={{ style: { width: "100%" } }}
//           >
//             {renderListMarkup()}
//           </Drawer>
//         </>
//       )}

//       {/* <EditRackCluster
//         open={editOpen}
//         handleClose={() => setEditOpen(false)}
//       /> */}


//       {editOpen && selectedRackCluster && (
//         <EditRackCluster
//           open={editOpen}
//           handleClose={() => setEditOpen(false)}
//           cluster={selectedRackCluster}
//         />
//       )}

//       {/* Delete modal */}
//       {deleteOpen && (
//         <DeleteModal
//           open={deleteOpen}
//           handleClose={handleDeleteClose}
//           handleDelete={() => handleDelete(clusterId)}
//           itemName={clusterName}
//           itemLabel="Rack Cluster"
//           itemId={clusterId}
//         />
//       )}
//     </>
//   );
// };


// export default RackClusterList;










// // Fixing UI and Button Problems of Next/Back
// // src/pages/RackClusterManagement/RackClusterList.jsx
// import { Trash, Menu, Pencil } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Swal from "sweetalert2";

// import {
//   fetchRackClustersByAcKit,
//   deleteRackCluster,
//   fetchRackClustersByDataCenter,
// } from "../../slices/rackClusterSlice";

// import { useInstallation } from "../../contexts/InstallationContext";

// import "../../styles/pages/management-pages.css";
// import TableSkeleton from "../../components/skeletons/TableSkeleton";
// import CloseIcon from "@mui/icons-material/Close";
// import { Drawer, IconButton, useMediaQuery } from "@mui/material";
// import DeleteModal from "../../components/Modals/common/DeleteModal";
// import EditRackCluster from "../../components/Modals/Common/RackClusterManagement/EditRackCluster";
// // import EditRackCluster from "../../components/Modals/Common/RackClusterManagement/EditRackCluster";

// const RackClusterList = ({ selectedCluster, onClusterSelect }) => {
//   const dispatch = useDispatch();

//   const {
//     // selectedAcKit,
//     // selectedRackCluster,
//     // setSelectedRackCluster,
//     selectedDataCenter
//   } = useInstallation();

//   // const { rackClusters = [], loading = {} } = useSelector(
//   //   (state) => state.rackCluster || {}
//   // );


//   const { clusters = [], loading = {} } = useSelector(
//    (state) => state.rackCluster || {}
//  );


//   // const { clusters = [], loading } = useSelector((state) => state.rackCluster || {});

//   const isLoading = loading?.fetch;

//   // UI state
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [deleteOpen, setDeleteOpen] = useState(false);
//   const [clusterName, setClusterName] = useState("");
//   const [clusterId, setClusterId] = useState(null);
//   const [editOpen, setEditOpen] = useState(false);
//   const isDesktop = useMediaQuery("(min-width:768px)");
//   const isMobile = !isDesktop;

// const [selectedRackCluster, setSelectedRackCluster] = useState(null);
//   /* ---------------------------
//      Fetch clusters by AC Kit
//   ---------------------------- */
//   useEffect(() => {
//     if (selectedDataCenter?._id) {
//       dispatch(fetchRackClustersByDataCenter(selectedDataCenter._id));
//     }
//   }, [selectedDataCenter, dispatch]);

//   /* ---------------------------
//      Row selection
//   ---------------------------- */
//   // const handleRowClick = (cluster, e) => {
//   //   if (e && e.stopPropagation) e.stopPropagation();
//   //   setSelectedRackCluster(cluster);
//   //   if (isMobile) setDrawerOpen(false);
//   // };


// const handleRowClick = (cluster, e) => {
//     if (e && e.stopPropagation) e.stopPropagation();

//     // installation selection via parent prop (preferred)
//     if (typeof onClusterSelect === "function") {
//       onClusterSelect(cluster);
//     }

//     // keep local edit highlight (for edit modal)
//     setSelectedRackCluster(cluster);

//     if (isMobile) setDrawerOpen(false);
// };

//   /* ---------------------------
//      Delete handlers
//   ---------------------------- */
//   const handleDeleteOpen = (name, id) => {
//     setClusterName(name);
//     setClusterId(id);
//     setDeleteOpen(true);
//   };

//   const handleDeleteClose = () => {
//     setClusterName("");
//     setClusterId(null);
//     setDeleteOpen(false);
//   };

//   const handleDelete = async (id) => {
//     try {
//       await dispatch(deleteRackCluster(id)).unwrap();

//       Swal.fire({
//         icon: "success",
//         title: "Deleted",
//         text: "Rack Cluster deleted successfully.",
//       });

//       handleDeleteClose();

//       if (selectedDataCenter?._id) {
//         // dispatch(fetchRackClustersByAcKit(selectedDataCenter._id));
//         dispatch(fetchRackClustersByDataCenter(selectedDataCenter._id));
//       }
//     } catch (err) {
//       Swal.fire({
//         icon: "error",
//         title: "Delete failed",
//         text: err || "Something went wrong",
//       });
//     }
//   };

//   const displayClusters = selectedDataCenter ? clusters : [];

//   /* ---------------------------
//      Shared markup (Desktop + Drawer)
//   ---------------------------- */
//   const renderListMarkup = () => (
//     <div className="ListPage bg-white rounded-xl lg:rounded-r-none lg:rounded-l-xl shadow-sm w-full h-full border border-[#E5E7EB] p-5 relative">
//       {isDesktop ? (
//         <h1 className="organization-list-title font-semibold text-gray-800 mb-4">
//           Rack Cluster Management
//         </h1>
//       ) : (
//         <div className="flex justify-end">
//           <IconButton
//             onClick={() => setDrawerOpen(false)}
//             edge="start"
//             size="small"
//           >
//             <CloseIcon />
//           </IconButton>
//         </div>
//       )}

//       <div className="mb-4">
//         <h2 className="organization-list-header text-center font-semibold text-gray-800">
//           Rack Cluster List
//         </h2>
//       </div>

//       {!selectedDataCenter && (
//         <div className="p-4 text-center text-gray-500">
//           Please select an Data Center Kit to view Rack Clusters.
//         </div>
//       )}

//       <div className="overflow-x-auto">
//         <table className="w-full table-auto text-left">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="organization-table-header py-2 px-4 font-bold text-gray-800">
//                 Rack Cluster Name
//               </th>
//               <th className="organization-table-header py-2 px-4 text-center">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//         </table>

//         <div className="organization-table-scroll overflow-y-auto pr-1 h-[63vh] sm:h-[58vh]">
//           <table className="w-full table-auto text-left">
//             <tbody>
//               {isLoading && <TableSkeleton rows={4} />}

//               {!isLoading &&
//                 displayClusters.map((cluster, index) => {
//                   const id = cluster._id ?? cluster.id ?? index;
//                   const name = cluster.name ?? `Cluster ${index + 1}`;

//                   return (
//                     // <tr
//                     //   key={id}
//                     //   className={`border-b border-gray-200 cursor-pointer transition-colors hover:bg-blue-50/60 ${
//                     //     selectedRackCluster?._id === id
//                     //       ? "bg-blue-50 border-blue-300"
//                     //       : ""
//                     //   }`}
//                     //   onClick={(e) => handleRowClick(cluster, e)}
//                     // >
//                     <tr
//                       key={id}
//                      className={`border-b border-gray-200 cursor-pointer transition-colors hover:bg-blue-50/60 ${
//                         (selectedCluster?._id || selectedRackCluster?._id) === id ? "bg-blue-50 border-blue-300" : ""
//                       }`}

//                       onClick={(e) => handleRowClick(cluster, e)}
//                     >
//                       <td className="organization-table-cell py-2 sm:py-3 px-2 sm:px-4">
//                         {index + 1}. {name}
//                       </td>

//                       <td className="organization-table-cell py-2 sm:py-3 px-2 sm:px-4">
//                         <div
//                           className="flex justify-center gap-3"
//                           onClick={(e) => e.stopPropagation()}
//                         >
//                           <button
//                         //   onClick={() => 
//                         //     setSelectedRackCluster(cluster)
//                         // }

//                         onClick={() => {
//                           setSelectedRackCluster(cluster);
//                           setEditOpen(true);
//                         }}

//                           className="organization-action-btn rounded-full border border-green-500/50 p-[6px] bg-white"
//                         >
//                            <Pencil className="text-green-600" size={16} />
//                         </button>


//                           <button
//                             onClick={() => handleDeleteOpen(name, id)}
//                             className="organization-action-btn rounded-full border border-red-500/50 bg-white flex items-center justify-center hover:bg-red-50 cursor-pointer p-[4px]"
//                           >
//                             <Trash
//                               className="text-red-600 organization-action-icon"
//                               size={16}
//                             />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })}

//               {!isLoading &&
//                 displayClusters.length === 0 &&
//                 selectedDataCenter && (
//                   <tr>
//                     <td className="p-4 text-center text-gray-500">
//                       No Rack Clusters found for this AC Kit.
//                     </td>
//                   </tr>
//                 )}
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
//           {/* Mobile header */}
//           <div className="flex items-center justify-between mb-4">
//             <img src="/logo-half.png" className="w-auto h-[30px]" />
//             <h1 className="organization-list-title font-semibold text-gray-800">
//               Rack Cluster Management
//             </h1>
//             <IconButton size="small" onClick={() => setDrawerOpen(true)}>
//               <Menu size={20} />
//             </IconButton>
//           </div>

//           <Drawer
//             anchor="right"
//             open={drawerOpen}
//             onClose={() => setDrawerOpen(false)}
//             PaperProps={{ style: { width: "100%" } }}
//           >
//             {renderListMarkup()}
//           </Drawer>
//         </>
//       )}

//       {/* <EditRackCluster
//         open={editOpen}
//         handleClose={() => setEditOpen(false)}
//       /> */}


//       {editOpen && selectedRackCluster && (
//         <EditRackCluster
//           open={editOpen}
//           handleClose={() => setEditOpen(false)}
//           cluster={selectedRackCluster}
//         />
//       )}

//       {/* Delete modal */}
//       {deleteOpen && (
//         <DeleteModal
//           open={deleteOpen}
//           handleClose={handleDeleteClose}
//           handleDelete={() => handleDelete(clusterId)}
//           itemName={clusterName}
//           itemLabel="Rack Cluster"
//           itemId={clusterId}
//         />
//       )}
//     </>
//   );
// };

// export default RackClusterList;



















// import { Menu, Pencil, Trash } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Swal from "sweetalert2";
// import { Drawer, IconButton, useMediaQuery } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";

// import {
//   fetchRackClustersByDataCenter,
//   deleteRackCluster,
// } from "../../slices/rackClusterSlice";

// import { useInstallation } from "../../contexts/InstallationContext";

// import TableSkeleton from "../../components/skeletons/TableSkeleton";
// import DeleteModal from "../../components/Modals/common/DeleteModal";
// import EditRackCluster from "../../components/Modals/Common/RackClusterManagement/EditRackCluster";
// import ManagementListShell from "../../components/Modals/Common/ManagementListShell";
// import ActionButtons from "../../components/Modals/Common/ActionButtons";

// const RackClusterList = ({ selectedCluster, onClusterSelect }) => {
//   const dispatch = useDispatch();
//   const { selectedDataCenter } = useInstallation();

//   const { clusters = [], loading = {} } = useSelector(
//     (state) => state.rackCluster || {}
//   );

//   const isDesktop = useMediaQuery("(min-width:768px)");
//   const isMobile = !isDesktop;

//   // UI state
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [editOpen, setEditOpen] = useState(false);
//   const [deleteOpen, setDeleteOpen] = useState(false);
//   const [selectedRackCluster, setSelectedRackCluster] = useState(null);
//   const [clusterId, setClusterId] = useState(null);
//   const [clusterName, setClusterName] = useState("");

//   useEffect(() => {
//     if (selectedDataCenter?._id) {
//       dispatch(fetchRackClustersByDataCenter(selectedDataCenter._id));
//     }
//   }, [selectedDataCenter, dispatch]);

//   const handleRowClick = (cluster, e) => {
//     e?.stopPropagation();
//     onClusterSelect?.(cluster);
//     setSelectedRackCluster(cluster);
//     if (isMobile) setDrawerOpen(false);
//   };

//   const handleDelete = async () => {
//     try {
//       await dispatch(deleteRackCluster(clusterId)).unwrap();
//       Swal.fire({ icon: "success", title: "Deleted", text: "Rack Cluster deleted." });
//       setDeleteOpen(false);
//       if (selectedDataCenter?._id) {
//         dispatch(fetchRackClustersByDataCenter(selectedDataCenter._id));
//       }
//     } catch (err) {
//       Swal.fire("Error", err || "Delete failed", "error");
//     }
//   };

//   const renderListMarkup = () => (
//     <div className="relative min-h-0">
//       {!isDesktop && (
//         <div className="flex justify-end p-2">
//           <IconButton onClick={() => setDrawerOpen(false)} size="small">
//             <CloseIcon />
//           </IconButton>
//         </div>
//       )}

//       <ManagementListShell
//         className="h-[96%] md:h-[81.5vh] 2xl:h-[83vh]"
//         columns={
//           <>
//             <th className="py-2 px-4 font-bold text-gray-800">
//               Rack Cluster Name
//             </th>
//             <th className="py-2 px-4 w-[120px] text-center">
//               Actions
//             </th>
//           </>
//         }
//       >
//         {loading.fetch && (
//           <tr>
//             <td colSpan={2} className="p-4">
//               <TableSkeleton rows={4} />
//             </td>
//           </tr>
//         )}

//         {!loading.fetch && !selectedDataCenter && (
//           <tr>
//             <td colSpan={2} className="p-4 text-center text-gray-500">
//               Please select a Data Center to view Rack Clusters.
//             </td>
//           </tr>
//         )}

//         {!loading.fetch &&
//           selectedDataCenter &&
//           clusters.map((cluster, index) => {
//             const id = cluster._id;
//             const name = cluster.name ?? `Cluster ${index + 1}`;

//             return (
//               <tr
//                 key={id}
//                 onClick={(e) => handleRowClick(cluster, e)}
//                 className={`border-b cursor-pointer transition-colors hover:bg-blue-50/60 ${
//                   (selectedCluster?._id || selectedRackCluster?._id) === id
//                     ? "bg-blue-50 border-blue-300"
//                     : ""
//                 }`}
//               >
//                 <td className="py-2 sm:py-3 px-2 sm:px-4">
//                   {index + 1}. {name}
//                 </td>

//                 <td className="py-2 sm:py-3 px-2 sm:px-4 text-center">
//                   <ActionButtons
//                     item={cluster}
//                     onEdit={() => {
//                       setSelectedRackCluster(cluster);
//                       setEditOpen(true);
//                     }}
//                     onDelete={() => {
//                       setClusterId(id);
//                       setClusterName(name);
//                       setDeleteOpen(true);
//                     }}
//                   />
//                 </td>
//               </tr>
//             );
//           })}

//         {!loading.fetch && selectedDataCenter && clusters.length === 0 && (
//           <tr>
//             <td colSpan={2} className="p-4 text-center text-gray-500">
//               No Rack Clusters found.
//             </td>
//           </tr>
//         )}
//       </ManagementListShell>
//     </div>
//   );

//   return (
//     <>
//       {isDesktop ? (
//         renderListMarkup()
//       ) : (
//         <>
//           <div className="flex items-center justify-between mb-4">
//             <img src="/logo-half.png" className="h-[30px]" />
//             <h1 className="organization-list-title font-semibold text-gray-800">
//               Rack Cluster Management
//             </h1>
//             <IconButton size="small" onClick={() => setDrawerOpen(true)}>
//               <Menu size={20} />
//             </IconButton>
//           </div>

//           <Drawer
//             anchor="right"
//             open={drawerOpen}
//             onClose={() => setDrawerOpen(false)}
//             PaperProps={{ style: { width: "100%" } }}
//           >
//             <div className="p-4">{renderListMarkup()}</div>
//           </Drawer>
//         </>
//       )}

//       {editOpen && selectedRackCluster && (
//         <EditRackCluster
//           open={editOpen}
//           handleClose={() => setEditOpen(false)}
//           cluster={selectedRackCluster}
//         />
//       )}

//       {deleteOpen && (
//         <DeleteModal
//           open={deleteOpen}
//           handleClose={() => setDeleteOpen(false)}
//           handleDelete={handleDelete}
//           itemName={clusterName}
//           itemLabel="Rack Cluster"
//           itemId={clusterId}
//         />
//       )}
//     </>
//   );
// };

// export default RackClusterList;






import { Menu, Pencil, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Drawer, IconButton, useMediaQuery } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import {
  fetchRackClustersByDataCenter,
  deleteRackCluster,
} from "../../slices/rackClusterSlice";

import { useInstallation } from "../../contexts/InstallationContext";

import TableSkeleton from "../../components/skeletons/TableSkeleton";
import DeleteModal from "../../components/Modals/Common/DeleteModal";
import EditRackCluster from "../../components/Modals/Common/RackClusterManagement/EditRackCluster";
import ManagementListShell from "../../components/Modals/Common/ManagementListShell";
import ActionButtons from "../../components/Modals/Common/ActionButtons";

const RackClusterList = ({ selectedCluster, onClusterSelect }) => {
  const dispatch = useDispatch();
  const { selectedDataCenter } = useInstallation();

  const { clusters = [], loading = {} } = useSelector(
    (state) => state.rackCluster || {}
  );

  const isDesktop = useMediaQuery("(min-width:768px)");
  const isMobile = !isDesktop;

  // UI state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedRackCluster, setSelectedRackCluster] = useState(null);
  const [clusterId, setClusterId] = useState(null);
  const [clusterName, setClusterName] = useState("");

  useEffect(() => {
    if (selectedDataCenter?._id) {
      dispatch(fetchRackClustersByDataCenter(selectedDataCenter._id));
    }
  }, [selectedDataCenter, dispatch]);

  const handleRowClick = (cluster, e) => {
    e?.stopPropagation();
    onClusterSelect?.(cluster);
    setSelectedRackCluster(cluster);
    if (isMobile) setDrawerOpen(false);
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteRackCluster(clusterId)).unwrap();
      Swal.fire({ icon: "success", title: "Deleted", text: "Rack Cluster deleted." });
      setDeleteOpen(false);
      if (selectedDataCenter?._id) {
        dispatch(fetchRackClustersByDataCenter(selectedDataCenter._id));
      }
    } catch (err) {
      Swal.fire("Error", err || "Delete failed", "error");
    }
  };

  const renderListMarkup = () => (
    <div className="relative min-h-0">
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
            <th className="py-2 px-4 font-bold text-gray-800">
              Rack Cluster Name
            </th>
            <th className="py-2 px-4  text-center">
              Actions
            </th>
          </>
        }
      >
        {loading.fetch && (
          <tr>
            <td colSpan={2} className="p-4">
              <TableSkeleton rows={4} />
            </td>
          </tr>
        )}

        {!loading.fetch && !selectedDataCenter && (
          <tr>
            <td colSpan={2} className="p-4 text-center text-gray-500">
              Please select a Data Center to view Rack Clusters.
            </td>
          </tr>
        )}

        {!loading.fetch &&
          selectedDataCenter &&
          clusters.map((cluster, index) => {
            const id = cluster._id;
            const name = cluster.name ?? `Cluster ${index + 1}`;

            return (
              <tr
                key={id}
                onClick={(e) => handleRowClick(cluster, e)}
                className={`border-b border-gray-200 cursor-pointer transition-colors hover:bg-blue-50/60 ${
                  (selectedCluster?._id || selectedRackCluster?._id) === id
                    ? "bg-blue-50 border-blue-300"
                    : ""
                }`}
              >
                <td className="py-2 sm:py-3 px-2 sm:px-4">
                  {name}
                </td>

                <td className="py-2 sm:py-3 px-2 sm:px-4 text-center">
                  <ActionButtons
                    item={cluster}
                    onEdit={() => {
                      setSelectedRackCluster(cluster);
                      setEditOpen(true);
                    }}
                    onDelete={() => {
                      setClusterId(id);
                      setClusterName(name);
                      setDeleteOpen(true);
                    }}
                  />
                </td>
              </tr>
            );
          })}

        {!loading.fetch && selectedDataCenter && clusters.length === 0 && (
          <tr>
            <td colSpan={2} className="p-4 text-center text-gray-500">
              No Rack Clusters found.
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
            <img src="/logo-half.png" className="h-[30px]" />
            <h1 className="organization-list-title font-semibold text-gray-800">
              Rack Cluster Management
            </h1>
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

      {editOpen && selectedRackCluster && (
        <EditRackCluster
          open={editOpen}
          handleClose={() => setEditOpen(false)}
          cluster={selectedRackCluster}
        />
      )}

      {deleteOpen && (
        <DeleteModal
          open={deleteOpen}
          handleClose={() => setDeleteOpen(false)}
          handleDelete={handleDelete}
          itemName={clusterName}
          itemLabel="Rack Cluster"
          itemId={clusterId}
        />
      )}
    </>
  );
};

export default RackClusterList;
