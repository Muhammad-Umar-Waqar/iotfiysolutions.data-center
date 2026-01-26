// // src/pages/RackManagement/RackList.jsx
// import { Pencil, Trash, Menu } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Swal from "sweetalert2";

// import { fetchAllRacks } from "../../slices/rackSlice";
// import { useInstallation } from "../../contexts/InstallationContext";
// import DeleteModal from "../../components/Modals/common/DeleteModal";
// import { deleteRack } from "../../slices/rackSlice";
// import "../../styles/pages/management-pages.css";
// import TableSkeleton from "../../components/skeletons/TableSkeleton";
// import CloseIcon from "@mui/icons-material/Close";
// import { Drawer, IconButton, useMediaQuery } from "@mui/material";
// import RackEditModal from "../../components/Modals/Common/RackManagement/RackEditModal";

// const RackList = ({ selectedRack, onRackSelect }) => {
//   const dispatch = useDispatch();
//   const { selectedDataCenter, selectedHub } = useInstallation();
//   const { racks = [], loading = {}, error } = useSelector((state) => state.rack || {});
//   const isLoading = loading?.fetch;
//   const [editOpen, setEditOpen] = useState(false);
//   // const [selectedRack, setSelectedRack] = useState(null);
//   const [deleteOpen, setDeleteOpen] = useState(false);
//   const [rackToDelete, setRackToDelete] = useState(null);

//   const [drawerOpen, setDrawerOpen] = useState(false);

//   const isDesktop = useMediaQuery("(min-width:768px)");
//   const isMobile = !isDesktop;

//   useEffect(() => {
//     if (selectedDataCenter?._id) {
//       dispatch(fetchAllRacks());
//     }
//   }, [selectedDataCenter, dispatch]);

//   useEffect(() => {
//     if (error) console.error("Rack error:", error);
//   }, [error]);



// const displayRacks = racks.filter((r) => {
//   const rackDataCenterId = r.dataCenter?.id;
//   const rackHubId = r.hub?.id;

//   return (
//     rackDataCenterId === selectedDataCenter?._id &&
//     (!selectedHub?._id || rackHubId === selectedHub._id)
//   );
// });


// const handleDeleteRack = async (rackId) => {
//   try {
//     await dispatch(deleteRack(rackId)).unwrap();

//     Swal.fire({
//       icon: "success",
//       title: "Deleted",
//       text: "Rack deleted successfully",
//       timer: 2000,
//       showConfirmButton: false,
//     });

//     setDeleteOpen(false);
//     setRackToDelete(null);
//   } catch (err) {
//     Swal.fire({
//       icon: "error",
//       title: "Delete Failed",
//       text: err || "Unable to delete rack",
//     });
//   }
// };

// const handleRowClick = (rack, e) => {
//   if (e) e.stopPropagation();
//   onRackSelect?.(rack);
// };




//   const renderListMarkup = () => (
//     <div className="ListPage bg-white rounded-xl lg:rounded-r-none lg:rounded-l-xl shadow-sm w-full h-full border border-[#E5E7EB] p-5 relative">
//       {isDesktop && <h1 className="organization-list-title font-semibold text-gray-800 mb-4">Rack Management</h1>}

//       <div className="mb-4">
//         <h2 className="organization-list-header text-center font-semibold text-gray-800">Rack List</h2>
//       </div>

//       {!selectedDataCenter && (
//         <div className="p-4 text-center text-gray-500">
//           Please select a Data Center to view and manage its Racks.
//         </div>
//       )}

//       <div className="overflow-x-auto">
//         <table className="w-full table-auto text-left">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="organization-table-header py-2 px-4 font-bold text-gray-800">Rack</th>
//               <th className="organization-table-header py-2 px-4 text-center">Hub</th>
//               <th className="organization-table-header py-2 px-4 text-center">Sensors</th>
//               <th className="organization-table-header py-2 px-4 text-center">Actions</th>
//             </tr>
//           </thead>
//         </table>

//         <div className="organization-table-scroll overflow-y-auto pr-1 h-[63vh] sm:h-[58vh]">
//           <table className="w-full table-auto text-left">
//             <tbody>
//               {isLoading && <TableSkeleton rows={4} />}

//               {!isLoading &&
//                 displayRacks.map((rack, index) => {
//                   const id = rack._id ?? rack.id ?? index;
//                   const rackName = `${rack?.name ? rack.name : `Rack ${rack?.row || "?"}-${rack?.col || "?"}`} `;
//                   // const hubName = rack.hubId?.name || "N/A";
//                   const hubName = rack.hub?.name || "N/A";
//                   // const sensorCount = rack.sensorIds?.length || 0;
//                   const sensorCount = rack.sensors?.length || 0;

//                   return (
//                     // <tr
//                     //   key={id}
//                     //   className="border-b border-gray-200 cursor-pointer transition-colors hover:bg-blue-50/60"
                    
//                     // >

//                     <tr
//                         key={id}
//                         onClick={(e) => handleRowClick(rack, e)}
//                         className={`border-b border-gray-200 cursor-pointer transition-colors hover:bg-blue-50/60 ${
//                           selectedRack?._id === id ? "bg-blue-50 border-blue-300" : ""
//                         }`}
//                       >

//                       <td className="organization-table-cell py-2 sm:py-3 px-2 sm:px-4">{rackName}</td>
//                       <td className="organization-table-cell py-2 sm:py-3 px-2 sm:px-4 text-center">{hubName}</td>
//                       <td className="organization-table-cell py-2 sm:py-3 px-2 sm:px-4 text-center">{sensorCount}</td>
//                       <td className="organization-table-cell py-2 sm:py-3 px-2 sm:px-4 text-center">
//                         <div className="flex justify-center gap-2 sm:gap-3">
//                           {/* <button
//                             className="organization-action-btn rounded-full border border-green-500/50 bg-white flex items-center justify-center hover:bg-green-50 p-[4px] cursor-not-allowed"
//                           >
//                             <Pencil className="text-green-600 organization-action-icon" size={16} />
//                           </button> */}

//                           <button
//                             className="organization-action-btn rounded-full border border-green-500/50 bg-white flex items-center justify-center hover:bg-green-50 p-[4px]"
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               // setSelectedRack(rack);
//                               onRackSelect?.(rack);
//                               setEditOpen(true);
//                             }}
//                           >
//                             <Pencil className="text-green-600 organization-action-icon" size={16} />
//                           </button>

//                           {/* <button
//                             className="organization-action-btn rounded-full border border-red-500/50 bg-white flex items-center justify-center hover:bg-red-50 p-[4px] cursor-not-allowed"
//                           >
//                             <Trash className="text-red-600 organization-action-icon" size={16} />
//                           </button> */}

//               <button
//                 className="organization-action-btn rounded-full border border-red-500/50 bg-white flex items-center justify-center hover:bg-red-50 p-[4px]"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setRackToDelete(rack);
//                   setDeleteOpen(true);
//                 }}
//               >
//                 <Trash className="text-red-600 organization-action-icon" size={16} />
//               </button>



//                           {/* <button
//                             className="organization-action-btn rounded-full border border-red-500/50 bg-white flex items-center justify-center hover:bg-red-50 p-[4px]"
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               handleDeleteRack(rack);
//                             }}
//                           >
//                             <Trash className="text-red-600 organization-action-icon" size={16} />
//                           </button> */}

//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })}

//               {!isLoading && displayRacks.length === 0 && selectedDataCenter && (
//                 <tr>
//                   <td colSpan={4} className="p-4 text-center text-gray-500">
//                     No racks found for this selection.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>


//  <RackEditModal
//   open={editOpen}
//   handleClose={() => {
//     setEditOpen(false);
//     setSelectedRack(null);
//   }}
//   rack={selectedRack}
// />


// <DeleteModal
//   open={deleteOpen}
//   handleClose={() => {
//     setDeleteOpen(false);
//     setRackToDelete(null);
//   }}
//   handleDelete={handleDeleteRack}
//   itemId={rackToDelete?._id}
//   itemName={rackToDelete?.name}
//   itemLabel="Rack"
// />



//     </div>
 

// );

 
//   return (
//     <>
//       {isDesktop ? (
//         renderListMarkup()
//       ) : (
//         <Drawer
//           anchor="right"
//           open={drawerOpen}
//           onClose={() => setDrawerOpen(false)}
//           PaperProps={{ style: { width: "100%" } }}
//         >
//           {renderListMarkup()}
//         </Drawer>
//       )}
//     </>
//   );
// };




// // Adding RackList Edit Only State for Local
// // export default RackList;
// // src/pages/RackManagement/RackList.jsx
// import { Pencil, Trash, Menu } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Swal from "sweetalert2";

// import { fetchAllRacks } from "../../slices/rackSlice";
// import { useInstallation } from "../../contexts/InstallationContext";
// import DeleteModal from "../../components/Modals/common/DeleteModal";
// import { deleteRack } from "../../slices/rackSlice";
// import "../../styles/pages/management-pages.css";
// import TableSkeleton from "../../components/skeletons/TableSkeleton";
// import CloseIcon from "@mui/icons-material/Close";
// import { Drawer, IconButton, useMediaQuery } from "@mui/material";
// import RackEditModal from "../../components/Modals/Common/RackManagement/RackEditModal";

// const RackList = ({ selectedRack, onRackSelect }) => {
//   const dispatch = useDispatch();
//   const { selectedDataCenter, selectedHub } = useInstallation();
//   const { racks = [], loading = {}, error } = useSelector((state) => state.rack || {});
//   const isLoading = loading?.fetch;
//   const [editOpen, setEditOpen] = useState(false);
//   // const [selectedRack, setSelectedRack] = useState(null);
//   const [deleteOpen, setDeleteOpen] = useState(false);
//   const [rackToDelete, setRackToDelete] = useState(null);
//   const [editingRack, setEditingRack] = useState(null);


//   const [drawerOpen, setDrawerOpen] = useState(false);

//   const isDesktop = useMediaQuery("(min-width:768px)");
//   const isMobile = !isDesktop;

//   useEffect(() => {
//     if (selectedDataCenter?._id) {
//       dispatch(fetchAllRacks());
//     }
//   }, [selectedDataCenter, dispatch]);

//   useEffect(() => {
//     if (error) console.error("Rack error:", error);
//   }, [error]);



// const displayRacks = racks.filter((r) => {
//   const rackDataCenterId = r.dataCenter?.id;
//   const rackHubId = r.hub?.id;

//   return (
//     rackDataCenterId === selectedDataCenter?._id &&
//     (!selectedHub?._id || rackHubId === selectedHub._id)
//   );
// });


// const handleDeleteRack = async (rackId) => {
//   try {
//     await dispatch(deleteRack(rackId)).unwrap();

//     Swal.fire({
//       icon: "success",
//       title: "Deleted",
//       text: "Rack deleted successfully",
//       timer: 2000,
//       showConfirmButton: false,
//     });

//     setDeleteOpen(false);
//     setRackToDelete(null);
//   } catch (err) {
//     Swal.fire({
//       icon: "error",
//       title: "Delete Failed",
//       text: err || "Unable to delete rack",
//     });
//   }
// };

// const handleRowClick = (rack, e) => {
//   if (e) e.stopPropagation();
//   onRackSelect?.(rack);
// };




//   const renderListMarkup = () => (
//     <div className="ListPage bg-white rounded-xl lg:rounded-r-none lg:rounded-l-xl shadow-sm w-full h-full border border-[#E5E7EB] p-5 relative">
//       {isDesktop && <h1 className="organization-list-title font-semibold text-gray-800 mb-4">Rack Management</h1>}

//       <div className="mb-4">
//         <h2 className="organization-list-header text-center font-semibold text-gray-800">Rack List</h2>
//       </div>

//       {!selectedDataCenter && (
//         <div className="p-4 text-center text-gray-500">
//           Please select a Data Center to view and manage its Racks.
//         </div>
//       )}

//       <div className="overflow-x-auto">
//         <table className="w-full table-auto text-left">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="organization-table-header py-2 px-4 font-bold text-gray-800">Rack</th>
//               <th className="organization-table-header py-2 px-4 text-center">Hub</th>
//               <th className="organization-table-header py-2 px-4 text-center">Sensors</th>
//               <th className="organization-table-header py-2 px-4 text-center">Actions</th>
//             </tr>
//           </thead>
//         </table>

//         <div className="organization-table-scroll overflow-y-auto pr-1 h-[63vh] sm:h-[58vh]">
//           <table className="w-full table-auto text-left">
//             <tbody>
//               {isLoading && <TableSkeleton rows={4} />}

//               {!isLoading &&
//                 displayRacks.map((rack, index) => {
//                   const id = rack._id ?? rack.id ?? index;
//                   const rackName = `${rack?.name ? rack.name : `Rack ${rack?.row || "?"}-${rack?.col || "?"}`} `;
//                   // const hubName = rack.hubId?.name || "N/A";
//                   const hubName = rack.hub?.name || "N/A";
//                   // const sensorCount = rack.sensorIds?.length || 0;
//                   const sensorCount = rack.sensors?.length || 0;

//                   return (
//                     // <tr
//                     //   key={id}
//                     //   className="border-b border-gray-200 cursor-pointer transition-colors hover:bg-blue-50/60"
                    
//                     // >

//                     <tr
//                         key={id}
//                         onClick={(e) => handleRowClick(rack, e)}
//                         className={`border-b border-gray-200 cursor-pointer transition-colors hover:bg-blue-50/60 ${
//                           selectedRack?._id === id ? "bg-blue-50 border-blue-300" : ""
//                         }`}
//                       >

//                       <td className="organization-table-cell py-2 sm:py-3 px-2 sm:px-4">{rackName}</td>
//                       <td className="organization-table-cell py-2 sm:py-3 px-2 sm:px-4 text-center">{hubName}</td>
//                       <td className="organization-table-cell py-2 sm:py-3 px-2 sm:px-4 text-center">{sensorCount}</td>
//                       <td className="organization-table-cell py-2 sm:py-3 px-2 sm:px-4 text-center">
//                         <div className="flex justify-center gap-2 sm:gap-3">
//                           {/* <button
//                             className="organization-action-btn rounded-full border border-green-500/50 bg-white flex items-center justify-center hover:bg-green-50 p-[4px] cursor-not-allowed"
//                           >
//                             <Pencil className="text-green-600 organization-action-icon" size={16} />
//                           </button> */}

//                           <button
//                             className="organization-action-btn rounded-full border border-green-500/50 bg-white flex items-center justify-center hover:bg-green-50 p-[4px]"
//                             // onClick={(e) => {
//                             //   e.stopPropagation();
//                             //   // setSelectedRack(rack);
//                             //   onRackSelect?.(rack);
//                             //   setEditOpen(true);
//                             // }}

//                             onClick={(e) => {
//                             e.stopPropagation();
//                             setEditingRack(rack); // 👈 editing only
//                             setEditOpen(true);
//                           }}
//                           >
//                             <Pencil className="text-green-600 organization-action-icon" size={16} />
//                           </button>

//                           {/* <button
//                             className="organization-action-btn rounded-full border border-red-500/50 bg-white flex items-center justify-center hover:bg-red-50 p-[4px] cursor-not-allowed"
//                           >
//                             <Trash className="text-red-600 organization-action-icon" size={16} />
//                           </button> */}

//               <button
//                 className="organization-action-btn rounded-full border border-red-500/50 bg-white flex items-center justify-center hover:bg-red-50 p-[4px]"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setRackToDelete(rack);
//                   setDeleteOpen(true);
//                 }}
//               >
//                 <Trash className="text-red-600 organization-action-icon" size={16} />
//               </button>



//                           {/* <button
//                             className="organization-action-btn rounded-full border border-red-500/50 bg-white flex items-center justify-center hover:bg-red-50 p-[4px]"
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               handleDeleteRack(rack);
//                             }}
//                           >
//                             <Trash className="text-red-600 organization-action-icon" size={16} />
//                           </button> */}

//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })}

//               {!isLoading && displayRacks.length === 0 && selectedDataCenter && (
//                 <tr>
//                   <td colSpan={4} className="p-4 text-center text-gray-500">
//                     No racks found for this selection.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

// {/* 
//  <RackEditModal
//   open={editOpen}
//   handleClose={() => {
//     setEditOpen(false);
//     setSelectedRack(null);
//   }}
//   rack={selectedRack}
// /> */}

// <RackEditModal
//   open={editOpen}
//   rack={editingRack}
//   handleClose={() => {
//     setEditOpen(false);
//     setEditingRack(null); // 👈 local reset only
//   }}
// />


// <DeleteModal
//   open={deleteOpen}
//   handleClose={() => {
//     setDeleteOpen(false);
//     setRackToDelete(null);
//   }}
//   handleDelete={handleDeleteRack}
//   itemId={rackToDelete?._id}
//   itemName={rackToDelete?.name}
//   itemLabel="Rack"
// />



//     </div>
 

// );

 
//   return (
//     <>
//       {isDesktop ? (
//         renderListMarkup()
//       ) : (
//         <Drawer
//           anchor="right"
//           open={drawerOpen}
//           onClose={() => setDrawerOpen(false)}
//           PaperProps={{ style: { width: "100%" } }}
//         >
//           {renderListMarkup()}
//         </Drawer>
//       )}
//     </>
//   );
// };

// export default RackList;









// // src/pages/RackManagement/RackList.jsx
// import { Menu } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Swal from "sweetalert2";

// import { fetchAllRacks, deleteRack } from "../../slices/rackSlice";
// import { useInstallation } from "../../contexts/InstallationContext";
// import DeleteModal from "../../components/Modals/common/DeleteModal";
// import RackEditModal from "../../components/Modals/Common/RackManagement/RackEditModal";

// import "../../styles/pages/management-pages.css";
// import TableSkeleton from "../../components/skeletons/TableSkeleton";
// import CloseIcon from "@mui/icons-material/Close";
// import { Drawer, IconButton, useMediaQuery } from "@mui/material";

// import ManagementListShell from "../../components/Modals/Common/ManagementListShell";
// import ActionButtons from "../../components/Modals/Common/ActionButtons";

// /**
//  * RackList
//  * props:
//  *  - selectedRack: currently selected rack (from parent/context)
//  *  - onRackSelect(rack): called when user clicks a row
//  */
// const RackList = ({ selectedRack, onRackSelect }) => {
//   const dispatch = useDispatch();
//   const { selectedDataCenter, selectedHub } = useInstallation();

//   const { racks = [], loading = {}, error } = useSelector((state) => state.rack || {});
//   const isLoading = loading?.fetch;

//   // local UI state
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [deleteOpen, setDeleteOpen] = useState(false);
//   const [rackToDelete, setRackToDelete] = useState(null);
//   const [editOpen, setEditOpen] = useState(false);
//   const [editingRack, setEditingRack] = useState(null);

//   const isDesktop = useMediaQuery("(min-width:768px)");
//   const isMobile = !isDesktop;

//   useEffect(() => {
//     if (selectedDataCenter?._id) {
//       dispatch(fetchAllRacks());
//     }
//   }, [selectedDataCenter, dispatch]);

//   useEffect(() => {
//     if (error) console.error("Rack error:", error);
//   }, [error]);

//   // filter racks to current selection (data center + optional hub)
//   const displayRacks = Array.isArray(racks)
//     ? racks.filter((r) => {
//         const rackDataCenterId = r.dataCenter?.id ?? r.dataCenter?._id ?? r.dataCenterId;
//         const rackHubId = r.hub?.id ?? r.hub?._id ?? r.hubId;
//         return (
//           rackDataCenterId === selectedDataCenter?._id &&
//           (!selectedHub?._id || rackHubId === selectedHub._id)
//         );
//       })
//     : [];

//   const handleDeleteRack = async (rackId) => {
//     try {
//       await dispatch(deleteRack(rackId)).unwrap();

//       Swal.fire({
//         icon: "success",
//         title: "Deleted",
//         text: "Rack deleted successfully",
//         timer: 1500,
//         showConfirmButton: false,
//       });

//       setDeleteOpen(false);
//       setRackToDelete(null);

//       // refresh
//       if (selectedDataCenter?._id) dispatch(fetchAllRacks());
//     } catch (err) {
//       Swal.fire({
//         icon: "error",
//         title: "Delete Failed",
//         text: err || "Unable to delete rack",
//       });
//     }
//   };

//   const handleRowClick = (rack, e) => {
//     if (e) e.stopPropagation();
//     onRackSelect?.(rack);
//     if (isMobile) setDrawerOpen(false);
//   };

//   const renderListMarkup = () => (
//     <div className="relative min-h-0">
//       {/* mobile close button */}
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
//             <th className="py-2 px-4 font-bold text-gray-800">Rack</th>
//             <th className="py-2 px-4 text-center">Hub</th>
//             <th className="py-2 px-4 text-center">Sensors</th>
//             <th className="py-2 px-4 w-[120px] text-center">Actions</th>
//           </>
//         }
//       >
//         {isLoading && (
//           <tr>
//             <td colSpan={4} className="p-4">
//               <TableSkeleton rows={4} />
//             </td>
//           </tr>
//         )}

//         {!isLoading && !selectedDataCenter && (
//           <tr>
//             <td colSpan={4} className="p-4 text-center text-gray-500">
//               Please select a Data Center to view and manage its Racks.
//             </td>
//           </tr>
//         )}

//         {!isLoading &&
//           selectedDataCenter &&
//           displayRacks.map((rack, index) => {
//             const id = rack._id ?? rack.id ?? index;
//             const rackName = rack?.name ? rack.name : `Rack ${rack?.row ?? "?"}-${rack?.col ?? "?"}`;
//             const hubName = rack.hub?.name ?? "N/A";
//             const sensorCount = Array.isArray(rack.sensors) ? rack.sensors.length : 0;

//             return (
//               <tr
//                 key={id}
//                 className={`border-b border-gray-200 cursor-pointer transition-colors hover:bg-blue-50/60 ${
//                   selectedRack?._id === id ? "bg-blue-50 border-blue-300" : ""
//                 }`}
//                 onClick={(e) => handleRowClick(rack, e)}
//               >
//                 <td className="py-2 sm:py-3 px-2 sm:px-4">{rackName}</td>
//                 <td className="py-2 sm:py-3 px-2 sm:px-4 text-center">{hubName}</td>
//                 <td className="py-2 sm:py-3 px-2 sm:px-4 text-center">{sensorCount}</td>
//                 <td className="py-2 sm:py-3 px-2 sm:px-4 text-center">
//                   <ActionButtons
//                     item={rack}
//                     onEdit={(item) => {
//                       setEditingRack(item);
//                       setEditOpen(true);
//                     }}
//                     onDelete={(item) => {
//                       setRackToDelete(item);
//                       setDeleteOpen(true);
//                     }}
//                   />
//                 </td>
//               </tr>
//             );
//           })}

//         {!isLoading && selectedDataCenter && displayRacks.length === 0 && (
//           <tr>
//             <td colSpan={4} className="p-4 text-center text-gray-500">
//               No racks found for this selection.
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
//           {/* mobile header */}
//           <div className="flex items-center justify-between mb-4">
//             <img src="/logo-half.png" className="w-auto h-[30px]" />
//             <h1 className="organization-list-title font-semibold text-gray-800">Rack Management</h1>
//             <IconButton size="small" onClick={() => setDrawerOpen(true)}>
//               <Menu size={20} />
//             </IconButton>
//           </div>

//           <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)} PaperProps={{ style: { width: "100%" } }}>
//             <div className="p-4">{renderListMarkup()}</div>
//           </Drawer>
//         </>
//       )}

//       {/* Edit modal */}
//       {editOpen && (
//         <RackEditModal
//           open={editOpen}
//           rack={editingRack}
//           handleClose={() => {
//             setEditOpen(false);
//             setEditingRack(null);
//           }}
//         />
//       )}

//       {/* Delete modal */}
//       {deleteOpen && (
//         <DeleteModal
//           open={deleteOpen}
//           handleClose={() => {
//             setDeleteOpen(false);
//             setRackToDelete(null);
//           }}
//           handleDelete={() => handleDeleteRack(rackToDelete?._id)}
//           itemId={rackToDelete?._id}
//           itemName={rackToDelete?.name}
//           itemLabel="Rack"
//         />
//       )}
//     </>
//   );
// };

// export default RackList;













// src/pages/RackManagement/RackList.jsx
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import { fetchAllRacks, deleteRack, fetchRacksByDataCenterId } from "../../slices/rackSlice";
import { useInstallation } from "../../contexts/InstallationContext";
import DeleteModal from "../../components/Modals/common/DeleteModal";
import RackEditModal from "../../components/Modals/Common/RackManagement/RackEditModal";

import "../../styles/pages/management-pages.css";
import TableSkeleton from "../../components/skeletons/TableSkeleton";
import CloseIcon from "@mui/icons-material/Close";
import { Drawer, IconButton, useMediaQuery } from "@mui/material";

import ManagementListShell from "../../components/Modals/Common/ManagementListShell";
import ActionButtons from "../../components/Modals/Common/ActionButtons";

/**
 * RackList
 * props:
 *  - selectedRack: currently selected rack (from parent/context)
 *  - onRackSelect(rack): called when user clicks a row
 */
const RackList = ({ selectedRack: propSelectedRack, onRackSelect }) => {
  const dispatch = useDispatch();
  // const { selectedDataCenter, selectedHub } = useInstallation();
  const { selectedDataCenter, selectedHub, selectedRack: ctxSelectedRack, setSelectedRack: setCtxSelectedRack } = useInstallation();
const selectedRack = propSelectedRack ?? ctxSelectedRack;


  const { racks = [], loading = {}, error } = useSelector((state) => state.rack || {});
  const isLoading = loading?.fetch;

  // local UI state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [rackToDelete, setRackToDelete] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [editingRack, setEditingRack] = useState(null);

  const isDesktop = useMediaQuery("(min-width:768px)");
  const isMobile = !isDesktop;

  useEffect(() => {
    if (selectedDataCenter?._id) {
      // dispatch(fetchAllRacks());
      dispatch(fetchRacksByDataCenterId(selectedDataCenter._id));
    }
  }, [selectedDataCenter, dispatch]);

  useEffect(() => {
    if (error) console.error("Rack error:", error);
  }, [error]);

  // filter racks to current selection (data center + optional hub)
  // const displayRacks = Array.isArray(racks)
  //   ? racks.filter((r) => {
  //       const rackDataCenterId = r.dataCenter?.id ?? r.dataCenter?._id ?? r.dataCenterId;
  //       const rackHubId = r.hub?.id ?? r.hub?._id ?? r.hubId;
  //       return (
  //         rackDataCenterId === selectedDataCenter?._id &&
  //         (!selectedHub?._id || rackHubId === selectedHub._id)
  //       );
  //     })
  //   : [];


  const displayRacks = Array.isArray(racks) ? racks : [];


  const handleDeleteRack = async (rackId) => {
    try {
      await dispatch(deleteRack(rackId)).unwrap();

      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Rack deleted successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      setDeleteOpen(false);
      setRackToDelete(null);

      // refresh
      if (selectedDataCenter?._id) dispatch(fetchRacksByDataCenterId(selectedDataCenter._id));
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: err || "Unable to delete rack",
      });
    }
  };

  // const handleRowClick = (rack, e) => {
  //   if (e) e.stopPropagation();
  //   onRackSelect?.(rack);
  //   if (isMobile) setDrawerOpen(false);
  // };

  
const handleRowClick = (rack, e) => {
    // defensive: stop react and native propagation so parent 'outside click' won't clear selection
    if (e) {
      if (typeof e.stopPropagation === "function") e.stopPropagation();
      if (e.nativeEvent && typeof e.nativeEvent.stopImmediatePropagation === "function") {
        e.nativeEvent.stopImmediatePropagation();
      }
    }

    // call parent's callback if provided, otherwise update installation context
    if (typeof onRackSelect === "function") {
      onRackSelect(rack);
    } else {
      setCtxSelectedRack(rack);
    }

    if (isMobile) setDrawerOpen(false);
  };

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
            <th className="py-2 px-4 font-bold text-gray-800">Rack</th>
            <th className="py-2 px-4 text-center">Hub</th>
            <th className="py-2 px-4 text-center">Sensors</th>
            <th className="py-2 px-4 text-center">Actions</th>
          </>
        }
      >
        {isLoading && (
          <tr>
            <td colSpan={4} className="p-4">
              <TableSkeleton rows={4} />
            </td>
          </tr>
        )}

        {!isLoading && !selectedDataCenter && (
          <tr>
            <td colSpan={4} className="p-4 text-center text-gray-500">
              Please select a Data Center to view and manage its Racks.
            </td>
          </tr>
        )}

        {!isLoading &&
          selectedDataCenter &&
          displayRacks.map((rack, index) => {
            const id = rack._id ?? rack.id ?? index;
            const rackName = rack?.name ? rack.name : `Rack ${rack?.row ?? "?"}-${rack?.col ?? "?"}`;
            const hubName = rack.hub?.name ?? "N/A";
            const sensorCount = Array.isArray(rack.sensors) ? rack.sensors.length : 0;

            return (
              <tr
                key={id}
                className={`border-b border-gray-200 cursor-pointer transition-colors hover:bg-blue-50/60 ${
                  selectedRack?._id === id ? "bg-blue-50 border-blue-300" : ""
                }`}
                onClick={(e) => handleRowClick(rack, e)}
              >
                <td className="py-2 sm:py-3 px-2 sm:px-4">{rackName}</td>
                <td className="py-2 sm:py-3 px-2 sm:px-4 text-center">{hubName}</td>
                <td className="py-2 sm:py-3 px-2 sm:px-4 text-center">{sensorCount}</td>
                <td className="py-2 sm:py-3 px-2 sm:px-4 text-center">
                  <ActionButtons
                    item={rack}
                    onEdit={(item) => {
                      setEditingRack(item);
                      setEditOpen(true);
                    }}
                    onDelete={(item) => {
                      setRackToDelete(item);
                      setDeleteOpen(true);
                    }}
                  />
                </td>
              </tr>
            );
          })}

        {!isLoading && selectedDataCenter && displayRacks.length === 0 && (
          <tr>
            <td colSpan={4} className="p-4 text-center text-gray-500">
              No racks found for this selection.
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
          {/* mobile header */}
          <div className="flex items-center justify-between mb-4">
            <img src="/logo-half.png" className="w-auto h-[30px]" />
            <h1 className="organization-list-title font-semibold text-gray-800">Rack Management</h1>
            <IconButton size="small" onClick={() => setDrawerOpen(true)}>
              <Menu size={20} />
            </IconButton>
          </div>

          <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)} PaperProps={{ style: { width: "100%" } }}>
            <div className="p-4">{renderListMarkup()}</div>
          </Drawer>
        </>
      )}

      {/* Edit modal */}
      {editOpen && (
        <RackEditModal
          open={editOpen}
          rack={editingRack}
          handleClose={() => {
            setEditOpen(false);
            setEditingRack(null);
          }}
        />
      )}

      {/* Delete modal */}
      {deleteOpen && (
        <DeleteModal
          open={deleteOpen}
          handleClose={() => {
            setDeleteOpen(false);
            setRackToDelete(null);
          }}
          handleDelete={() => handleDeleteRack(rackToDelete?._id)}
          itemId={rackToDelete?._id}
          itemName={rackToDelete?.name}
          itemLabel="Rack"
        />
      )}
    </>
  );
};

export default RackList;
