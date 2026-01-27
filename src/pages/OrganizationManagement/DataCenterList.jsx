// // src/pages/management/DataCenterList.jsx
// import { Pencil, Trash, Menu } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Swal from "sweetalert2";

// import {
//   fetchAllDataCenters,
//   updateDataCenter,
//   deleteDataCenter,
// } from "../../slices/DataCenterSlice";

// // import OrganizationDeleteModal from "../../components/Modals/OrganizationManagement/DeleteModal";
// import OrganizationEditModal from "../../components/Modals/OrganizationManagement/EditModal";

// import "../../styles/pages/management-pages.css";
// import TableSkeleton from "../../components/skeletons/TableSkeleton";
// import CloseIcon from "@mui/icons-material/Close";
// import { Drawer, IconButton, useMediaQuery } from "@mui/material";
// import DeleteModal from "../../components/Modals/common/DeleteModal";

// // const DataCenterList = ({ onOrganizationSelect, selectedOrganization }) => {
// const DataCenterList = ({ onDataCenterSelect, selectedDataCenter }) => {
//   const dispatch = useDispatch();

// //   const { DataCenter, loading, error } = useSelector(
// //     (state) => {
// //         console.log("statte>", state);
// //         state.DataCenter || {}
// //     }
// //   );


// const { DataCenters, loading, error } = useSelector((state) => {
//   console.log("state>", state);
//   return state.DataCenter;
// });


//   // IMPORTANT: list loading is now separate
//   const isLoading = loading?.fetch;

//   const [DeleteOpen, setDeleteOpen] = useState(false);
//   const [EditOpen, setEditOpen] = useState(false);

// const [dataCenterName, setDataCenterName] = useState("");
// const [dataCenterId, setDataCenterId] = useState(null);


//   // drawer state for mobile
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const isDesktop = useMediaQuery("(min-width:768px)");
//   const isMobile = !isDesktop;

//   useEffect(() => {
//     dispatch(fetchAllDataCenters());
//   }, [dispatch]);

//   useEffect(() => {
//     if (error?.fetch) console.error("DataCenter error:", error.fetch);
//   }, [error]);

//   const handleDeleteOpen = (name, id) => {
//     setDeleteOpen(true);
//     setDataCenterName(name);
//     setDataCenterId(id);
//   };
//   const handleDeleteClose = () => {
//     setDeleteOpen(false);
//     setDataCenterId(null);
//     setDataCenterName("");
//   };
//   const handleEditOpen = (name, id) => {
//     setEditOpen(true);
//     setDataCenterId(id);
//     setDataCenterName(name);
//   };
//   const handleEditClose = () => {
//     setEditOpen(false);
//     setDataCenterId(null);
//     setDataCenterName("");
//   };

//   const handleChange = (e) => {
//     setDataCenterName(e.target.value);
//   };

//   // Delete
//   const handleDelete = async (id) => {
//     try {
//       await dispatch(deleteDataCenter(id)).unwrap();
//       Swal.fire({ icon: "success", title: "Deleted", text: "Data Center deleted." });
//       handleDeleteClose();
//     } catch (err) {
//       console.error("Delete error:", err);
//       Swal.fire({ icon: "error", title: "Delete failed", text: err || "Something went wrong" });
//     }
//   };

//   // Update
//   const handleEdit = async (orgId, newName) => {
//     try {
//       await dispatch(updateDataCenter({ id: orgId, name: newName })).unwrap();
//       Swal.fire({ icon: "success", title: "Updated", text: "Data Center updated." });
//       handleEditClose();
//     } catch (err) {
//       console.error("Update error:", err);
//       Swal.fire({ icon: "error", title: "Update failed", text: err || "Something went wrong" });
//     }
//   };

// //   const displayOrganizations = Array.isArray(DataCenters) ? DataCenters : [];
//   const displayDataCenters = Array.isArray(DataCenters) ? DataCenters : [];

//   console.log("displayDC:", DataCenters)
//   const handleRowClick = (datacenter, e) => {
//     if (e && e.stopPropagation) e.stopPropagation();
//     // onOrganizationSelect?.(organization);
//     onDataCenterSelect?.(datacenter);
//     if (isMobile) setDrawerOpen(false);
//   };

//   const renderListMarkup = () => (
//     <div className="ListPage bg-white rounded-xl lg:rounded-r-none lg:rounded-l-xl shadow-sm w-full h-full border border-[#E5E7EB] p-5 relative">
//       {isDesktop ? (
//         <h1 className="organization-list-title font-semibold text-gray-800 mb-4">
//           Data Center Management
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
//           Data Center List
//         </h2>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full table-auto text-left">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="organization-table-header py-2 px-4 font-bold text-gray-800">
//                 Data Center Name
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
//                 displayDataCenters.map((datac, index) => {
//                   const id = datac._id ?? datac.id ?? index;
//                   const displayName = datac.name ?? `Data Center ${index + 1}`;

//                   return (
//                     <tr
//                       key={id}
//                       className={`border-b border-gray-200 cursor-pointer transition-colors hover:bg-blue-50/60 ${
//                         selectedDataCenter?._id === id ? "bg-blue-50 border-blue-300" : ""
//                       }`}
//                       onClick={(e) => handleRowClick(datac, e)}
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

//               {!isLoading && displayDataCenters.length === 0 && (
//                 <tr>
//                   <td className="p-4 text-center text-gray-500">
//                     No Data Centers found.
//                   </td>
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
//             <h1 className="organization-list-title font-semibold text-gray-800">
//               Data Center Management
//             </h1>
//             <IconButton size="small" onClick={() => setDrawerOpen(true)}>
//               <Menu size={20} />
//             </IconButton>
//           </div>

//           <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)} PaperProps={{ style: { width: "100%" } }}>
//             {renderListMarkup()}
//           </Drawer>
//         </>
//       )}

//       {DeleteOpen && (
//         <DeleteModal
//             open={DeleteOpen}
//             handleClose={handleDeleteClose}
//             handleDelete={handleDelete}
//             // itemId={OrganizationId}
//             // itemName={organizationName}
//             itemId={dataCenterId}
//             itemName={dataCenterName}
//             itemLabel="Data Center"
//         />
//       )}

//     {EditOpen && (
//     <OrganizationEditModal
//         open={EditOpen}
//         handleClose={handleEditClose}
//         handleEdit={handleEdit}
//         organizationId={dataCenterId}
//         organizationName={dataCenterName}
//     />
//     )}


//     </>
//   );
// };

// export default DataCenterList;
















// // Working on UI
// // src/pages/management/DataCenterList.jsx
// import { Pencil, Trash, Menu } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Swal from "sweetalert2";

// import {
//   fetchAllDataCenters,
//   updateDataCenter,
//   deleteDataCenter,
// } from "../../slices/DataCenterSlice";

// // import OrganizationDeleteModal from "../../components/Modals/OrganizationManagement/DeleteModal";
// import OrganizationEditModal from "../../components/Modals/OrganizationManagement/EditModal";

// import "../../styles/pages/management-pages.css";
// import TableSkeleton from "../../components/skeletons/TableSkeleton";
// import CloseIcon from "@mui/icons-material/Close";
// import { Drawer, IconButton, useMediaQuery } from "@mui/material";
// import DeleteModal from "../../components/Modals/common/DeleteModal";

// // const DataCenterList = ({ onOrganizationSelect, selectedOrganization }) => {
// const DataCenterList = ({ onDataCenterSelect, selectedDataCenter }) => {
//   const dispatch = useDispatch();

// //   const { DataCenter, loading, error } = useSelector(
// //     (state) => {
// //         console.log("statte>", state);
// //         state.DataCenter || {}
// //     }
// //   );


// const { DataCenters, loading, error } = useSelector((state) => {
//   console.log("state>", state);
//   return state.DataCenter;
// });


//   // IMPORTANT: list loading is now separate
//   const isLoading = loading?.fetch;

//   const [DeleteOpen, setDeleteOpen] = useState(false);
//   const [EditOpen, setEditOpen] = useState(false);

// const [dataCenterName, setDataCenterName] = useState("");
// const [dataCenterId, setDataCenterId] = useState(null);


//   // drawer state for mobile
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const isDesktop = useMediaQuery("(min-width:768px)");
//   const isMobile = !isDesktop;

//   useEffect(() => {
//     dispatch(fetchAllDataCenters());
//   }, [dispatch]);

//   useEffect(() => {
//     if (error?.fetch) console.error("DataCenter error:", error.fetch);
//   }, [error]);

//   const handleDeleteOpen = (name, id) => {
//     setDeleteOpen(true);
//     setDataCenterName(name);
//     setDataCenterId(id);
//   };
//   const handleDeleteClose = () => {
//     setDeleteOpen(false);
//     setDataCenterId(null);
//     setDataCenterName("");
//   };
//   const handleEditOpen = (name, id) => {
//     setEditOpen(true);
//     setDataCenterId(id);
//     setDataCenterName(name);
//   };
//   const handleEditClose = () => {
//     setEditOpen(false);
//     setDataCenterId(null);
//     setDataCenterName("");
//   };

//   const handleChange = (e) => {
//     setDataCenterName(e.target.value);
//   };

//   // Delete
//   const handleDelete = async (id) => {
//     try {
//       await dispatch(deleteDataCenter(id)).unwrap();
//       Swal.fire({ icon: "success", title: "Deleted", text: "Data Center deleted." });
//       handleDeleteClose();
//     } catch (err) {
//       console.error("Delete error:", err);
//       Swal.fire({ icon: "error", title: "Delete failed", text: err || "Something went wrong" });
//     }
//   };

//   // Update
//   const handleEdit = async (orgId, newName) => {
//     try {
//       await dispatch(updateDataCenter({ id: orgId, name: newName })).unwrap();
//       Swal.fire({ icon: "success", title: "Updated", text: "Data Center updated." });
//       handleEditClose();
//     } catch (err) {
//       console.error("Update error:", err);
//       Swal.fire({ icon: "error", title: "Update failed", text: err || "Something went wrong" });
//     }
//   };

// //   const displayOrganizations = Array.isArray(DataCenters) ? DataCenters : [];
//   const displayDataCenters = Array.isArray(DataCenters) ? DataCenters : [];

//   console.log("displayDC:", DataCenters)
//   const handleRowClick = (datacenter, e) => {
//     if (e && e.stopPropagation) e.stopPropagation();
//     // onOrganizationSelect?.(organization);
//     onDataCenterSelect?.(datacenter);
//     if (isMobile) setDrawerOpen(false);
//   };

//   const renderListMarkup = () => (
//     // <div className="bg-white rounded-xl lg:rounded-r-none lg:rounded-l-xl shadow-sm w-full h-full border border-[#E5E7EB] p-5 relative">
//     // <div className="bg-white rounded-xl lg:rounded-r-none  w-full h-full p-3 relative">
//     <div className="bg-white rounded-xl lg:rounded-r-none  w-full h-full  relative">
//       {isDesktop ? (
//         // <h1 className="organization-list-title font-semibold text-gray-800 mb-4">
//         //   Data Center Management
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

//       {/* <div className="mb-4">
//         <h2 className="organization-list-header text-center font-semibold text-gray-800">
//           Data Center List
//         </h2>
//       </div> */}

//       <div className="overflow-x-auto h-full overflow-y-hidden">
//         <table className="w-full table-auto text-left">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="organization-table-header py-2 px-4 font-bold text-gray-800">
//                 Data Center Name
//               </th>
//               <th className="organization-table-header py-2 px-4 text-center">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//         </table>

//         {/* <div className="organization-table-scroll overflow-y-auto pr-1 h-[90vh] sm:h-[65vh]"> */}
//         <div className="organization-table-scroll overflow-y-auto pr-1 h-full">
//         {/* <div className="overflow-y-auto pr-1 "> */}
//           <table className="w-full table-auto text-left">
//             <tbody>
//               {isLoading && <TableSkeleton rows={4} />}

//               {!isLoading &&
//                 displayDataCenters.map((datac, index) => {
//                   const id = datac._id ?? datac.id ?? index;
//                   const displayName = datac.name ?? `Data Center ${index + 1}`;

//                   return (
//                     <tr
//                       key={id}
//                       className={`border-b border-gray-200 cursor-pointer transition-colors hover:bg-blue-50/60 ${
//                         selectedDataCenter?._id === id ? "bg-blue-50 border-blue-300" : ""
//                       }`}
//                       onClick={(e) => handleRowClick(datac, e)}
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

//               {!isLoading && displayDataCenters.length === 0 && (
//                 <tr>
//                   <td className="p-4 text-center text-gray-500">
//                     No Data Centers found.
//                   </td>
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
//             <h1 className="organization-list-title font-semibold text-gray-800">
//               Data Center Management
//             </h1>
//             <IconButton size="small" onClick={() => setDrawerOpen(true)}>
//               <Menu size={20} />
//             </IconButton>
//           </div>

//           <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)} PaperProps={{ style: { width: "100%" } }}>
//             {renderListMarkup()}
//           </Drawer>
//         </>
//       )}

//       {DeleteOpen && (
//         <DeleteModal
//             open={DeleteOpen}
//             handleClose={handleDeleteClose}
//             handleDelete={handleDelete}
//             // itemId={OrganizationId}
//             // itemName={organizationName}
//             itemId={dataCenterId}
//             itemName={dataCenterName}
//             itemLabel="Data Center"
//         />
//       )}

//     {EditOpen && (
//     <OrganizationEditModal
//         open={EditOpen}
//         handleClose={handleEditClose}
//         handleEdit={handleEdit}
//         organizationId={dataCenterId}
//         organizationName={dataCenterName}
//     />
//     )}


//     </>
//   );
// };

// export default DataCenterList;




















// // Working on UI and trying to move Next on Select and fixing the Form 
// // src/pages/management/DataCenterList.jsx
// import { Pencil, Trash, Menu } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Swal from "sweetalert2";

// import {
//   fetchAllDataCenters,
//   updateDataCenter,
//   deleteDataCenter,
// } from "../../slices/DataCenterSlice";

// // import OrganizationDeleteModal from "../../components/Modals/OrganizationManagement/DeleteModal";
// import OrganizationEditModal from "../../components/Modals/OrganizationManagement/EditModal";

// import "../../styles/pages/management-pages.css";
// import TableSkeleton from "../../components/skeletons/TableSkeleton";
// import CloseIcon from "@mui/icons-material/Close";
// import { Drawer, IconButton, useMediaQuery } from "@mui/material";
// import DeleteModal from "../../components/Modals/common/DeleteModal";
// import { useInstallation } from "../../contexts/InstallationContext";

// // const DataCenterList = ({ onOrganizationSelect, selectedOrganization }) => {
// const DataCenterList = () => {
//   const dispatch = useDispatch();

// //   const { DataCenter, loading, error } = useSelector(
// //     (state) => {
// //         console.log("statte>", state);
// //         state.DataCenter || {}
// //     }
// //   );


// const { DataCenters, loading, error } = useSelector((state) => {
//   console.log("state>", state);
//   return state.DataCenter;
// });

// const { selectedDataCenter, setSelectedDataCenter } = useInstallation();



//   // IMPORTANT: list loading is now separate
//   const isLoading = loading?.fetch;

//   const [DeleteOpen, setDeleteOpen] = useState(false);
//   const [EditOpen, setEditOpen] = useState(false);

// const [dataCenterName, setDataCenterName] = useState("");
// const [dataCenterId, setDataCenterId] = useState(null);


//   // drawer state for mobile
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const isDesktop = useMediaQuery("(min-width:768px)");
//   const isMobile = !isDesktop;

//   useEffect(() => {
//     dispatch(fetchAllDataCenters());
//   }, [dispatch]);

//   useEffect(() => {
//     if (error?.fetch) console.error("DataCenter error:", error.fetch);
//   }, [error]);

//   const handleDeleteOpen = (name, id) => {
//     setDeleteOpen(true);
//     setDataCenterName(name);
//     setDataCenterId(id);
//   };
//   const handleDeleteClose = () => {
//     setDeleteOpen(false);
//     setDataCenterId(null);
//     setDataCenterName("");
//   };
//   const handleEditOpen = (name, id) => {
//     setEditOpen(true);
//     setDataCenterId(id);
//     setDataCenterName(name);
//   };
//   const handleEditClose = () => {
//     setEditOpen(false);
//     setDataCenterId(null);
//     setDataCenterName("");
//   };

//   const handleChange = (e) => {
//     setDataCenterName(e.target.value);
//   };

//   // Delete
//   const handleDelete = async (id) => {
//     try {
//       await dispatch(deleteDataCenter(id)).unwrap();
//       Swal.fire({ icon: "success", title: "Deleted", text: "Data Center deleted." });
//       handleDeleteClose();
//     } catch (err) {
//       console.error("Delete error:", err);
//       Swal.fire({ icon: "error", title: "Delete failed", text: err || "Something went wrong" });
//     }
//   };

//   // Update
//   const handleEdit = async (orgId, newName) => {
//     try {
//       await dispatch(updateDataCenter({ id: orgId, name: newName })).unwrap();
//       Swal.fire({ icon: "success", title: "Updated", text: "Data Center updated." });
//       handleEditClose();
//     } catch (err) {
//       console.error("Update error:", err);
//       Swal.fire({ icon: "error", title: "Update failed", text: err || "Something went wrong" });
//     }
//   };

// //   const displayOrganizations = Array.isArray(DataCenters) ? DataCenters : [];
//   const displayDataCenters = Array.isArray(DataCenters) ? DataCenters : [];

//   console.log("displayDC:", DataCenters)
//  const handleRowClick = (datacenter, e) => {
//   e?.stopPropagation();
//   setSelectedDataCenter(datacenter); // ✅ THIS WAS MISSING
//   if (isMobile) setDrawerOpen(false);
// };


//   const renderListMarkup = () => (
//     // <div className="bg-white rounded-xl lg:rounded-r-none lg:rounded-l-xl shadow-sm w-full h-full border border-[#E5E7EB] p-5 relative">
//     // <div className="bg-white rounded-xl lg:rounded-r-none  w-full h-full p-3 relative">
//     <div className="bg-white rounded-xl lg:rounded-r-none  w-full h-full  relative">
//       {isDesktop ? (
//         // <h1 className="organization-list-title font-semibold text-gray-800 mb-4">
//         //   Data Center Management
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

//       {/* <div className="mb-4">
//         <h2 className="organization-list-header text-center font-semibold text-gray-800">
//           Data Center List
//         </h2>
//       </div> */}

//       <div className="overflow-x-auto h-full overflow-y-hidden h-full">
//         <table className="w-full table-auto text-left">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="organization-table-header py-2 px-4 font-bold text-gray-800">
//                 Data Center Name
//               </th>
//               <th className="organization-table-header py-2 px-4 text-center">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//         </table>

//         {/* <div className="organization-table-scroll overflow-y-auto pr-1 h-[90vh] sm:h-[65vh]"> */}
//         <div className="organization-table-scroll overflow-y-auto pr-1 h-full">
//         {/* <div className="overflow-y-auto pr-1 "> */}
//           <table className="w-full table-auto text-left">
//             <tbody>
//               {isLoading && <TableSkeleton rows={4} />}

//               {!isLoading &&
//                 displayDataCenters.map((datac, index) => {
//                   const id = datac._id ?? datac.id ?? index;
//                   const displayName = datac.name ?? `Data Center ${index + 1}`;

//                   return (
//                     <tr
//                       key={id}
//                       className={`border-b border-gray-200 cursor-pointer transition-colors hover:bg-blue-50/60 ${
//                         selectedDataCenter?._id === id ? "bg-blue-50 border-blue-300" : ""
//                       }`}
//                       onClick={(e) => handleRowClick(datac, e)}
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

//               {!isLoading && displayDataCenters.length === 0 && (
//                 <tr>
//                   <td className="p-4 text-center text-gray-500">
//                     No Data Centers found.
//                   </td>
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
//             <h1 className="organization-list-title font-semibold text-gray-800">
//               Data Center Management
//             </h1>
//             <IconButton size="small" onClick={() => setDrawerOpen(true)}>
//               <Menu size={20} />
//             </IconButton>
//           </div>

//           <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)} PaperProps={{ style: { width: "100%" } }}>
//             {renderListMarkup()}
//           </Drawer>
//         </>
//       )}

//       {DeleteOpen && (
//         <DeleteModal
//             open={DeleteOpen}
//             handleClose={handleDeleteClose}
//             handleDelete={handleDelete}
//             // itemId={OrganizationId}
//             // itemName={organizationName}
//             itemId={dataCenterId}
//             itemName={dataCenterName}
//             itemLabel="Data Center"
//         />
//       )}

//     {EditOpen && (
//     <OrganizationEditModal
//         open={EditOpen}
//         handleClose={handleEditClose}
//         handleEdit={handleEdit}
//         organizationId={dataCenterId}
//         organizationName={dataCenterName}
//     />
//     )}


//     </>
//   );
// };


// export default DataCenterList;



// // working on UI and scrolling List
// // Working on UI and trying to move Next on Select and fixing the Form 
// // src/pages/management/DataCenterList.jsx
// import { Pencil, Trash, Menu } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Swal from "sweetalert2";

// import {
//   fetchAllDataCenters,
//   updateDataCenter,
//   deleteDataCenter,
// } from "../../slices/DataCenterSlice";

// // import OrganizationDeleteModal from "../../components/Modals/OrganizationManagement/DeleteModal";
// import OrganizationEditModal from "../../components/Modals/OrganizationManagement/EditModal";

// import "../../styles/pages/management-pages.css";
// import TableSkeleton from "../../components/skeletons/TableSkeleton";
// import CloseIcon from "@mui/icons-material/Close";
// import { Drawer, IconButton, useMediaQuery } from "@mui/material";
// import DeleteModal from "../../components/Modals/common/DeleteModal";
// import { useInstallation } from "../../contexts/InstallationContext";

// // const DataCenterList = ({ onOrganizationSelect, selectedOrganization }) => {
// const DataCenterList = () => {
//   const dispatch = useDispatch();

// //   const { DataCenter, loading, error } = useSelector(
// //     (state) => {
// //         console.log("statte>", state);
// //         state.DataCenter || {}
// //     }
// //   );


// const { DataCenters, loading, error } = useSelector((state) => {
//   console.log("state>", state);
//   return state.DataCenter;
// });

// const { selectedDataCenter, setSelectedDataCenter } = useInstallation();



//   // IMPORTANT: list loading is now separate
//   const isLoading = loading?.fetch;

//   const [DeleteOpen, setDeleteOpen] = useState(false);
//   const [EditOpen, setEditOpen] = useState(false);

// const [dataCenterName, setDataCenterName] = useState("");
// const [dataCenterId, setDataCenterId] = useState(null);


//   // drawer state for mobile
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const isDesktop = useMediaQuery("(min-width:768px)");
//   const isMobile = !isDesktop;

//   useEffect(() => {
//     dispatch(fetchAllDataCenters());
//   }, [dispatch]);

//   useEffect(() => {
//     if (error?.fetch) console.error("DataCenter error:", error.fetch);
//   }, [error]);

//   const handleDeleteOpen = (name, id) => {
//     setDeleteOpen(true);
//     setDataCenterName(name);
//     setDataCenterId(id);
//   };
//   const handleDeleteClose = () => {
//     setDeleteOpen(false);
//     setDataCenterId(null);
//     setDataCenterName("");
//   };
//   const handleEditOpen = (name, id) => {
//     setEditOpen(true);
//     setDataCenterId(id);
//     setDataCenterName(name);
//   };
//   const handleEditClose = () => {
//     setEditOpen(false);
//     setDataCenterId(null);
//     setDataCenterName("");
//   };

//   const handleChange = (e) => {
//     setDataCenterName(e.target.value);
//   };

//   // Delete
//   const handleDelete = async (id) => {
//     try {
//       await dispatch(deleteDataCenter(id)).unwrap();
//       Swal.fire({ icon: "success", title: "Deleted", text: "Data Center deleted." });
//       handleDeleteClose();
//     } catch (err) {
//       console.error("Delete error:", err);
//       Swal.fire({ icon: "error", title: "Delete failed", text: err || "Something went wrong" });
//     }
//   };

//   // Update
//   const handleEdit = async (orgId, newName) => {
//     try {
//       await dispatch(updateDataCenter({ id: orgId, name: newName })).unwrap();
//       Swal.fire({ icon: "success", title: "Updated", text: "Data Center updated." });
//       handleEditClose();
//     } catch (err) {
//       console.error("Update error:", err);
//       Swal.fire({ icon: "error", title: "Update failed", text: err || "Something went wrong" });
//     }
//   };

// //   const displayOrganizations = Array.isArray(DataCenters) ? DataCenters : [];
//   const displayDataCenters = Array.isArray(DataCenters) ? DataCenters : [];

//   console.log("displayDC:", DataCenters)
//  const handleRowClick = (datacenter, e) => {
//   e?.stopPropagation();
//   setSelectedDataCenter(datacenter); // ✅ THIS WAS MISSING
//   if (isMobile) setDrawerOpen(false);
// };


//   const renderListMarkup = () => (
//     // <div className="bg-white rounded-xl lg:rounded-r-none lg:rounded-l-xl shadow-sm w-full h-full border border-[#E5E7EB] p-5 relative">
//     // <div className="bg-white rounded-xl lg:rounded-r-none  w-full h-full p-3 relative">
//     <div className="bg-white rounded-xl lg:rounded-r-none  w-full h-full flex flex-col relative min-h-0">
//       {isDesktop ? (
//         // <h1 className="organization-list-title font-semibold text-gray-800 mb-4">
//         //   Data Center Management
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

//       {/* <div className="mb-4">
//         <h2 className="organization-list-header text-center font-semibold text-gray-800">
//           Data Center List
//         </h2>
//       </div> */}

   
//       <div className="overflow-x-auto   h-full">
//       {/* <div className="overflow-x-auto "> */}
//         <table className="w-full table-auto text-left">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="organization-table-header py-2 px-4 font-bold text-gray-800">
//                 Data Center Name
//               </th>
//               <th className="organization-table-header py-2 px-4 text-center">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//         </table>

//         {/* <div className="organization-table-scroll overflow-y-auto pr-1 h-[90vh] sm:h-[65vh]"> */}
//         <div className="organization-table-scroll overflow-y-auto pr-1 h-full">
//         {/* <div className="overflow-y-auto pr-1 "> */}
//           <table className="w-full table-auto text-left">
//             <tbody>
//               {isLoading && <TableSkeleton rows={4} />}

//               {!isLoading &&
//                 displayDataCenters.map((datac, index) => {
//                   const id = datac._id ?? datac.id ?? index;
//                   const displayName = datac.name ?? `Data Center ${index + 1}`;

//                   return (
//                     <tr
//                       key={id}
//                       className={`border-b border-gray-200 cursor-pointer transition-colors hover:bg-blue-50/60 ${
//                         selectedDataCenter?._id === id ? "bg-blue-50 border-blue-300" : ""
//                       }`}
//                       onClick={(e) => handleRowClick(datac, e)}
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

//               {!isLoading && displayDataCenters.length === 0 && (
//                 <tr>
//                   <td className="p-4 text-center text-gray-500">
//                     No Data Centers found.
//                   </td>
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
//             <h1 className="organization-list-title font-semibold text-gray-800">
//               Data Center Management
//             </h1>
//             <IconButton size="small" onClick={() => setDrawerOpen(true)}>
//               <Menu size={20} />
//             </IconButton>
//           </div>

//           <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)} PaperProps={{ style: { width: "100%" } }}>
//             {renderListMarkup()}
//           </Drawer>
//         </>
//       )}

//       {DeleteOpen && (
//         <DeleteModal
//             open={DeleteOpen}
//             handleClose={handleDeleteClose}
//             handleDelete={handleDelete}
//             // itemId={OrganizationId}
//             // itemName={organizationName}
//             itemId={dataCenterId}
//             itemName={dataCenterName}
//             itemLabel="Data Center"
//         />
//       )}

//     {EditOpen && (
//     <OrganizationEditModal
//         open={EditOpen}
//         handleClose={handleEditClose}
//         handleEdit={handleEdit}
//         organizationId={dataCenterId}
//         organizationName={dataCenterName}
//     />
//     )}


//     </>
//   );
// };

// export default DataCenterList;








// // src/pages/management/DataCenterList.jsx
// import { Pencil, Trash, Menu } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Swal from "sweetalert2";

// import {
//   fetchAllDataCenters,
//   updateDataCenter,
//   deleteDataCenter,
// } from "../../slices/DataCenterSlice";

// import OrganizationEditModal from "../../components/Modals/OrganizationManagement/EditModal";
// import DeleteModal from "../../components/Modals/common/DeleteModal";
// import TableSkeleton from "../../components/skeletons/TableSkeleton";

// import CloseIcon from "@mui/icons-material/Close";
// import { Drawer, IconButton, useMediaQuery } from "@mui/material";
// import { useInstallation } from "../../contexts/InstallationContext";

// const DataCenterList = () => {
//   const dispatch = useDispatch();
//   const { DataCenters, loading, error } = useSelector((state) => state.DataCenter);
//   const { selectedDataCenter, setSelectedDataCenter } = useInstallation();

//   const isLoading = loading?.fetch;

//   const [DeleteOpen, setDeleteOpen] = useState(false);
//   const [EditOpen, setEditOpen] = useState(false);
//   const [dataCenterName, setDataCenterName] = useState("");
//   const [dataCenterId, setDataCenterId] = useState(null);

//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const isDesktop = useMediaQuery("(min-width:768px)");
//   const isMobile = !isDesktop;

//   useEffect(() => {
//     dispatch(fetchAllDataCenters());
//   }, [dispatch]);

//   useEffect(() => {
//     if (error?.fetch) console.error("DataCenter error:", error.fetch);
//   }, [error]);

//   const handleDeleteOpen = (name, id) => {
//     setDeleteOpen(true);
//     setDataCenterName(name);
//     setDataCenterId(id);
//   };
//   const handleDeleteClose = () => {
//     setDeleteOpen(false);
//     setDataCenterId(null);
//     setDataCenterName("");
//   };
//   const handleEditOpen = (name, id) => {
//     setEditOpen(true);
//     setDataCenterId(id);
//     setDataCenterName(name);
//   };
//   const handleEditClose = () => {
//     setEditOpen(false);
//     setDataCenterId(null);
//     setDataCenterName("");
//   };

//   const handleDelete = async (id) => {
//     try {
//       await dispatch(deleteDataCenter(id)).unwrap();
//       Swal.fire({ icon: "success", title: "Deleted", text: "Data Center deleted." });
//       handleDeleteClose();
//     } catch (err) {
//       console.error("Delete error:", err);
//       Swal.fire({ icon: "error", title: "Delete failed", text: err || "Something went wrong" });
//     }
//   };

//   const handleEdit = async (orgId, newName) => {
//     try {
//       await dispatch(updateDataCenter({ id: orgId, name: newName })).unwrap();
//       Swal.fire({ icon: "success", title: "Updated", text: "Data Center updated." });
//       handleEditClose();
//     } catch (err) {
//       console.error("Update error:", err);
//       Swal.fire({ icon: "error", title: "Update failed", text: err || "Something went wrong" });
//     }
//   };

//   const displayDataCenters = Array.isArray(DataCenters) ? DataCenters : [];

//   const handleRowClick = (datacenter, e) => {
//     e?.stopPropagation();
//     setSelectedDataCenter(datacenter);
//     if (isMobile) setDrawerOpen(false);
//   };

//   const renderListMarkup = () => (
//     <div className="bg-white rounded-xl lg:rounded-r-none w-full h-[96%] md:h-[81.5vh] 2xl:h-[83vh] flex flex-col relative min-h-0">
//       {/* Mobile close button */}
//       {!isDesktop && (
//         <div className="flex justify-end p-2">
//           <IconButton onClick={() => setDrawerOpen(false)} size="small">
//             <CloseIcon />
//           </IconButton>
//         </div>
//       )}

//       {/* Table header */}
//       <div className="overflow-x-auto">
//         <table className="w-full table-fixed text-left">
//           <thead className="bg-gray-100 sticky top-0 z-10">
//             <tr>
//               <th className="py-2 px-4 font-bold text-gray-800">Data Center Name</th>
//               <th className="py-2 px-4 text-center">Actions</th>
//             </tr>
//           </thead>
//         </table>
//       </div>

//       {/* Scrollable table body */}
//       <div className="flex-1 overflow-y-auto min-h-0">
//         <table className="w-full table-fixed text-left">
//           <tbody>
//             {isLoading && <TableSkeleton rows={4} />}

//             {!isLoading && displayDataCenters.map((datac, index) => {
//               const id = datac._id ?? datac.id ?? index;
//               const displayName = datac.name ?? `Data Center ${index + 1}`;

//               return (
//                 <tr
//                   key={id}
//                   className={`border-b border-gray-200 cursor-pointer transition-colors hover:bg-blue-50/60 ${
//                     selectedDataCenter?._id === id ? "bg-blue-50 border-blue-300" : ""
//                   }`}
//                   onClick={(e) => handleRowClick(datac, e)}
//                 >
//                   <td className="py-2 sm:py-3 px-2 sm:px-4 ">{displayName}</td>
//                   <td className="py-2 sm:py-3 px-2 sm:px-4 text-center">
//                     <div className="flex justify-center gap-2 sm:gap-3" onClick={(e) => e.stopPropagation()}>
//                       <button
//                         onClick={() => handleEditOpen(displayName, id)}
//                         className="rounded-full border border-green-500/50 bg-white flex items-center justify-center hover:bg-green-50 p-[4px]"
//                       >
//                         <Pencil className="text-green-600" size={16} />
//                       </button>
//                       <button
//                         onClick={() => handleDeleteOpen(displayName, id)}
//                         className="rounded-full border border-red-500/50 bg-white flex items-center justify-center hover:bg-red-50 p-[4px]"
//                       >
//                         <Trash className="text-red-600" size={16} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               );
//             })}

//             {!isLoading && displayDataCenters.length === 0 && (
//               <tr>
//                 <td className="p-4 text-center text-gray-500" colSpan={2}>
//                   No Data Centers found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
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
//             <h1 className="organization-list-title font-semibold text-gray-800">
//               Data Center Management
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

//       {DeleteOpen && (
//         <DeleteModal
//           open={DeleteOpen}
//           handleClose={handleDeleteClose}
//           handleDelete={handleDelete}
//           itemId={dataCenterId}
//           itemName={dataCenterName}
//           itemLabel="Data Center"
//         />
//       )}

//       {EditOpen && (
//         <OrganizationEditModal
//           open={EditOpen}
//           handleClose={handleEditClose}
//           handleEdit={handleEdit}
//           organizationId={dataCenterId}
//           organizationName={dataCenterName}
//         />
//       )}
//     </>
//   );
// };

// export default DataCenterList;












// // src/pages/management/DataCenterList.jsx
// import { Pencil, Trash, Menu } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Swal from "sweetalert2";

// import {
//   fetchAllDataCenters,
//   updateDataCenter,
//   deleteDataCenter,
// } from "../../slices/DataCenterSlice";

// import OrganizationEditModal from "../../components/Modals/OrganizationManagement/EditModal";
// import DeleteModal from "../../components/Modals/Common/DeleteModal";
// import TableSkeleton from "../../components/skeletons/TableSkeleton";

// import CloseIcon from "@mui/icons-material/Close";
// import { Drawer, IconButton, useMediaQuery } from "@mui/material";
// import { useInstallation } from "../../contexts/InstallationContext";

// import ManagementListShell from "../../components/Modals/Common/ManagementListShell";
// import ActionButtons from "../../components/Modals/Common/ActionButtons";

// const DataCenterList = () => {
//   const dispatch = useDispatch();
//   const { DataCenters, loading, error } = useSelector((state) => state.DataCenter);
//   const { selectedDataCenter, setSelectedDataCenter } = useInstallation();

//   const isLoading = loading?.fetch;

//   const [DeleteOpen, setDeleteOpen] = useState(false);
//   const [EditOpen, setEditOpen] = useState(false);
//   const [dataCenterName, setDataCenterName] = useState("");
//   const [dataCenterId, setDataCenterId] = useState(null);

//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const isDesktop = useMediaQuery("(min-width:768px)");
//   const isMobile = !isDesktop;

//   useEffect(() => {
//     dispatch(fetchAllDataCenters());
//   }, [dispatch]);

//   useEffect(() => {
//     if (error?.fetch) console.error("DataCenter error:", error.fetch);
//   }, [error]);

//   const handleDeleteOpen = (name, id) => {
//     setDeleteOpen(true);
//     setDataCenterName(name);
//     setDataCenterId(id);
//   };
//   const handleDeleteClose = () => {
//     setDeleteOpen(false);
//     setDataCenterId(null);
//     setDataCenterName("");
//   };
//   const handleEditOpen = (name, id) => {
//     setEditOpen(true);
//     setDataCenterId(id);
//     setDataCenterName(name);
//   };
//   const handleEditClose = () => {
//     setEditOpen(false);
//     setDataCenterId(null);
//     setDataCenterName("");
//   };

//   const handleDelete = async (id) => {
//     try {
//       await dispatch(deleteDataCenter(id)).unwrap();
//       Swal.fire({ icon: "success", title: "Deleted", text: "Data Center deleted." });
//       handleDeleteClose();
//     } catch (err) {
//       console.error("Delete error:", err);
//       Swal.fire({ icon: "error", title: "Delete failed", text: err || "Something went wrong" });
//     }
//   };

//   const handleEdit = async (orgId, newName) => {
//     try {
//       await dispatch(updateDataCenter({ id: orgId, name: newName })).unwrap();
//       Swal.fire({ icon: "success", title: "Updated", text: "Data Center updated." });
//       handleEditClose();
//     } catch (err) {
//       console.error("Update error:", err);
//       Swal.fire({ icon: "error", title: "Update failed", text: err || "Something went wrong" });
//     }
//   };

//   const displayDataCenters = Array.isArray(DataCenters) ? DataCenters : [];

//   const handleRowClick = (datacenter, e) => {
//     e?.stopPropagation();
//     setSelectedDataCenter(datacenter);
//     if (isMobile) setDrawerOpen(false);
//   };

//   // shared markup using ManagementListShell
//   const renderListMarkup = () => (
//     <div className="relative min-h-0">
//       {/* mobile close placed above on small screens */}
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
//             <th className="py-2 px-4 font-bold text-gray-800">Data Center Name</th>
//             <th className="py-2 px-4  text-center">Actions</th>
//           </>
//         }
//       >
//         {isLoading && (
//           <>
//            {/* <tr> */}
//             {/* <td colSpan={2} className="p-4"> */}
//               <TableSkeleton rows={4} />
//             {/* </td> */}
//           {/* </tr> */}
//           </>
//         )}

//         {!isLoading &&
//           displayDataCenters.map((datac, index) => {
//             const id = datac._id ?? datac.id ?? index;
//             const displayName = datac.name ?? `Data Center ${index + 1}`;

//             return (
//               <tr
//                 key={id}
//                 className={`border-b border-gray-200 cursor-pointer transition-colors hover:bg-blue-50/60 ${
//                   selectedDataCenter?._id === id ? "bg-blue-50 border-blue-300" : ""
//                 }`}
//                 onClick={(e) => handleRowClick(datac, e)}
//               >
//                 <td className="py-2 sm:py-3 px-2 sm:px-4">{displayName}</td>

//                 <td className="py-2 sm:py-3 px-2 sm:px-4 text-center">
//                   <ActionButtons
//                     item={datac}
//                     onEdit={(item) => handleEditOpen(item.name, item._id)}
//                     onDelete={(item) => handleDeleteOpen(item.name, item._id)}
//                   />
//                 </td>
//               </tr>
//             );
//           })}

//         {!isLoading && displayDataCenters.length === 0 && (
//           <tr>
//             <td colSpan={2} className="p-4 text-center text-gray-500">
//               No Data Centers found.
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
//             <img src="/logo-half.png" className="w-auto h-[30px]" />
//             <h1 className="organization-list-title font-semibold text-gray-800">Data Center Management</h1>
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

//       {DeleteOpen && (
//         <DeleteModal
//           open={DeleteOpen}
//           handleClose={handleDeleteClose}
//           handleDelete={handleDelete}
//           itemId={dataCenterId}
//           itemName={dataCenterName}
//           itemLabel="Data Center"
//         />
//       )}

//       {EditOpen && (
//         <OrganizationEditModal
//           open={EditOpen}
//           handleClose={handleEditClose}
//           handleEdit={handleEdit}
//           organizationId={dataCenterId}
//           organizationName={dataCenterName}
//         />
//       )}
//     </>
//   );
// };

// export default DataCenterList;








// // src/pages/management/DataCenterList.jsx
// import { Pencil, Trash, Menu } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Swal from "sweetalert2";

// import {
//   fetchAllDataCenters,
//   fetchDataCentersByUser,
//   updateDataCenter,
//   deleteDataCenter,
// } from "../../slices/DataCenterSlice";

// import OrganizationEditModal from "../../components/Modals/OrganizationManagement/EditModal";
// import DeleteModal from "../../components/Modals/Common/DeleteModal";
// import TableSkeleton from "../../components/skeletons/TableSkeleton";

// import CloseIcon from "@mui/icons-material/Close";
// import { Drawer, IconButton, useMediaQuery } from "@mui/material";
// import { useInstallation } from "../../contexts/InstallationContext";
// import { useStore } from "../../contexts/storecontexts";

// import ManagementListShell from "../../components/Modals/Common/ManagementListShell";
// import ActionButtons from "../../components/Modals/Common/ActionButtons";

// const DataCenterList = () => {
//   const dispatch = useDispatch();
//   const { DataCenters, loading, error } = useSelector((state) => state.DataCenter);
//   const { selectedDataCenter, setSelectedDataCenter } = useInstallation();
//   const { user } = useStore(); // get current user to decide fetch behavior

//   const isLoading = loading?.fetch;

//   const [DeleteOpen, setDeleteOpen] = useState(false);
//   const [EditOpen, setEditOpen] = useState(false);
//   const [dataCenterName, setDataCenterName] = useState("");
//   const [dataCenterId, setDataCenterId] = useState(null);

//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const isDesktop = useMediaQuery("(min-width:768px)");
//   const isMobile = !isDesktop;
//   const dataCenters = useSelector((s) => s.DataCenter?.DataCenters || []);


//   // ----- fetch datacenters depending on role -----
//   useEffect(() => {
//     if (!user) return;
//     // admin sees all; managers/users see only their assigned DCs
//     if (user.role === "admin") {
//       dispatch(fetchAllDataCenters());
//     } else {
//       dispatch(fetchDataCentersByUser(user._id));
//     }
//   }, [dispatch, user]);

//   useEffect(() => {
//     if (error?.fetch) console.error("DataCenter error:", error.fetch);
//   }, [error]);

//   const handleDeleteOpen = (name, id) => {
//     setDeleteOpen(true);
//     setDataCenterName(name);
//     setDataCenterId(id);
//   };
//   const handleDeleteClose = () => {
//     setDeleteOpen(false);
//     setDataCenterId(null);
//     setDataCenterName("");
//   };
//   const handleEditOpen = (name, id) => {
//     setEditOpen(true);
//     setDataCenterId(id);
//     setDataCenterName(name);
//   };
//   const handleEditClose = () => {
//     setEditOpen(false);
//     setDataCenterId(null);
//     setDataCenterName("");
//   };

//   const handleDelete = async (id) => {
//     try {
//       await dispatch(deleteDataCenter(id)).unwrap();
//       Swal.fire({ icon: "success", title: "Deleted", text: "Data Center deleted." });
//       handleDeleteClose();
//     } catch (err) {
//       console.error("Delete error:", err);
//       Swal.fire({ icon: "error", title: "Delete failed", text: err || "Something went wrong" });
//     }
//   };

//   const handleEdit = async (orgId, newName) => {
//     try {
//       await dispatch(updateDataCenter({ id: orgId, name: newName })).unwrap();
//       Swal.fire({ icon: "success", title: "Updated", text: "Data Center updated." });
//       handleEditClose();
//     } catch (err) {
//       console.error("Update error:", err);
//       Swal.fire({ icon: "error", title: "Update failed", text: err || "Something went wrong" });
//     }
//   };

//   // normalize id extractor to handle different shapes (assignment objects etc.)
//   // const getEffectiveId = (item) => {
//   //   if (!item) return null;
//   //   // common id properties
//   //   if (item._id) return String(item._id);
//   //   if (item.id) return String(item.id);
//   //   // assignment shape: { dataCenterId: { _id: '...' } } or { dataCenterId: '...' }
//   //   if (item.dataCenterId) {
//   //     if (typeof item.dataCenterId === "string") return String(item.dataCenterId);
//   //     if (item.dataCenterId._id) return String(item.dataCenterId._id);
//   //   }
//   //   return null;
//   // };



//   const getEffectiveId = (maybeAssignedId) => {
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


//   const displayDataCenters = Array.isArray(DataCenters) ? DataCenters : [];

//   const handleRowClick = (datacenter, e) => {
//     e?.stopPropagation();
//     setSelectedDataCenter(datacenter);
//     if (isMobile) setDrawerOpen(false);
//   };

//   // selected effective id (handles selectedDataCenter being assignment or plain dc)
//   const selectedEffId = getEffectiveId(selectedDataCenter);

//   // shared markup using ManagementListShell
//   const renderListMarkup = () => (
//     <div className="relative min-h-0">
//       {/* mobile close placed above on small screens */}
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
//             <th className="py-2 px-4 font-bold text-gray-800">Data Center Name</th>
//             <th className="py-2 px-4  text-center">Actions</th>
//           </>
//         }
//       >
//         {isLoading && (
//           <>
//             <TableSkeleton rows={4} />
//           </>
//         )}

//         {!isLoading &&
//           displayDataCenters.map((datac, index) => {
//             const id = getEffectiveId(datac) ?? index;
//             const displayName = datac.name ?? `Data Center ${index + 1}`;

//             return (
//               <tr
//                 key={id}
//                 className={`border-b border-gray-200 cursor-pointer transition-colors hover:bg-blue-50/60 ${
//                   selectedEffId === String(id) ? "bg-blue-50 border-blue-300" : ""
//                 }`}
//                 onClick={(e) => handleRowClick(datac, e)}
//               >
//                 <td className="py-2 sm:py-3 px-2 sm:px-4">{displayName}</td>

//                 <td className="py-2 sm:py-3 px-2 sm:px-4 text-center">
//                   <ActionButtons
//                     item={datac}
//                     onEdit={(item) => handleEditOpen(item.name, getEffectiveId(item))}
//                     onDelete={(item) => handleDeleteOpen(item.name, getEffectiveId(item))}
//                   />
//                 </td>
//               </tr>
//             );
//           })}

//         {!isLoading && displayDataCenters.length === 0 && (
//           <tr>
//             <td colSpan={2} className="p-4 text-center text-gray-500">
//               No Data Centers found.
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
//             <img src="/logo-half.png" className="w-auto h-[30px]" />
//             <h1 className="organization-list-title font-semibold text-gray-800">Data Center Management</h1>
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

//       {DeleteOpen && (
//         <DeleteModal
//           open={DeleteOpen}
//           handleClose={handleDeleteClose}
//           handleDelete={handleDelete}
//           itemId={dataCenterId}
//           itemName={dataCenterName}
//           itemLabel="Data Center"
//         />
//       )}

//       {EditOpen && (
//         <OrganizationEditModal
//           open={EditOpen}
//           handleClose={handleEditClose}
//           handleEdit={handleEdit}
//           organizationId={dataCenterId}
//           organizationName={dataCenterName}
//         />
//       )}
//     </>
//   );
// };

// export default DataCenterList;











// // src/pages/management/DataCenterList.jsx
// import { Pencil, Trash, Menu } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Swal from "sweetalert2";

// import {
//   fetchAllDataCenters,
//   fetchDataCentersByUser,
//   updateDataCenter,
//   deleteDataCenter,
// } from "../../slices/DataCenterSlice";

// import OrganizationEditModal from "../../components/Modals/OrganizationManagement/EditModal";
// import DeleteModal from "../../components/Modals/Common/DeleteModal";
// import TableSkeleton from "../../components/skeletons/TableSkeleton";

// import CloseIcon from "@mui/icons-material/Close";
// import { Drawer, IconButton, useMediaQuery } from "@mui/material";
// import { useInstallation } from "../../contexts/InstallationContext";
// import { useStore } from "../../contexts/storecontexts";

// import ManagementListShell from "../../components/Modals/Common/ManagementListShell";
// import ActionButtons from "../../components/Modals/Common/ActionButtons";

// const DataCenterList = () => {
//   const dispatch = useDispatch();
//   const { DataCenters, loading, error } = useSelector((state) => state.DataCenter);
//   const { selectedDataCenter, setSelectedDataCenter } = useInstallation();
//   const { user } = useStore(); // get current user to decide fetch behavior

//   console.log("DataCenters", DataCenters)
//   const isLoading = loading?.fetch;

//   const [DeleteOpen, setDeleteOpen] = useState(false);
//   const [EditOpen, setEditOpen] = useState(false);
//   const [dataCenterName, setDataCenterName] = useState("");
//   const [dataCenterId, setDataCenterId] = useState(null);

//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const isDesktop = useMediaQuery("(min-width:768px)");
//   const isMobile = !isDesktop;

//   // local copy of datacenters list (normalized)
//   const dataCenters = Array.isArray(DataCenters) ? DataCenters : [];

//   // ----- fetch datacenters depending on role -----
//   useEffect(() => {
//     if (!user) return;
//     // admin sees all; managers/users see only their assigned DCs
//     if (user.role === "admin") {
//       dispatch(fetchAllDataCenters());
//     } else {
//       dispatch(fetchDataCentersByUser(user._id));
//     }
//   }, [dispatch, user]);

//   useEffect(() => {
//     if (error?.fetch) console.error("DataCenter error:", error.fetch);
//   }, [error]);

//   const handleDeleteOpen = (name, id) => {
//     setDeleteOpen(true);
//     setDataCenterName(name);
//     setDataCenterId(id);
//   };
//   const handleDeleteClose = () => {
//     setDeleteOpen(false);
//     setDataCenterId(null);
//     setDataCenterName("");
//   };
//   const handleEditOpen = (name, id) => {
//     setEditOpen(true);
//     setDataCenterId(id);
//     setDataCenterName(name);
//   };
//   const handleEditClose = () => {
//     setEditOpen(false);
//     setDataCenterId(null);
//     setDataCenterName("");
//   };

//   // SAFE handlers: validate id before dispatching
//   const handleDelete = async (id) => {
//     if (!id || typeof id !== "string") {
//       console.error("Invalid DataCenter ID for delete:", id);
//       return Swal.fire("Error", "Invalid Data Center ID", "error");
//     }

//     try {
//       await dispatch(deleteDataCenter(id)).unwrap();
//       Swal.fire({ icon: "success", title: "Deleted", text: "Data Center deleted." });
//       handleDeleteClose();
//     } catch (err) {
//       console.error("Delete error:", err);
//       Swal.fire({ icon: "error", title: "Delete failed", text: String(err) || "Something went wrong" });
//     }
//   };

//   const handleEdit = async (orgId, newName) => {
//     if (!orgId || typeof orgId !== "string") {
//       console.error("Invalid DataCenter ID for update:", orgId);
//       return Swal.fire("Error", "Invalid Data Center ID", "error");
//     }

//     try {
//       await dispatch(updateDataCenter({ id: orgId, name: newName })).unwrap();
//       Swal.fire({ icon: "success", title: "Updated", text: "Data Center updated." });
//       handleEditClose();
//     } catch (err) {
//       console.error("Update error:", err);
//       Swal.fire({ icon: "error", title: "Update failed", text: String(err) || "Something went wrong" });
//     }
//   };

//   /**
//    * getEffectiveId
//    *
//    * Purpose:
//    *  - Return a stable string ID for a datacenter regardless of shape:
//    *    - admin: data center object with _id
//    *    - manager/user: assignment object that may contain dataCenterId or nested { dataCenterId: { _id } }
//    *    - or when you accidentally pass an id string already.
//    *
//    * IMPORTANT: keeps role-based semantics (returns the nested dataCenterId for managers/users).
//    */
//   // const getEffectiveId = (maybe) => {
//   //   if (!maybe) return null;

//   //   // If a string id is passed, return it directly
//   //   if (typeof maybe === "string") return maybe;

//   //   // If it's an object which already is the full datacenter (admin case)
//   //   if (maybe._id && typeof maybe._id === "string") return String(maybe._id);

//   //   // If it's an assignment/mapper object (manager/user case)
//   //   // e.g. { dataCenterId: "abc" }  or { dataCenterId: { _id: "abc", name: "..." } }
//   //   if (maybe.dataCenterId) {
//   //     if (typeof maybe.dataCenterId === "string") return maybe.dataCenterId;
//   //     if (maybe.dataCenterId._id && typeof maybe.dataCenterId._id === "string") {
//   //       return String(maybe.dataCenterId._id);
//   //     }
//   //   }

//   //   // Finally, attempt to match by object shapes inside the loaded dataCenters list
//   //   // (sometimes you pass an _id-like value that needs mapping)
//   //   // This preserves the "role based" mapping: for manager/user entries, dataCenters array may contain assignment objects
//   //   // So try to find the actual datacenter entry if possible.
//   //   try {
//   //     // attempt to find matching by name or other shallow heuristics
//   //     if (maybe.name && typeof maybe.name === "string") {
//   //       const foundByName = dataCenters.find((d) => d.name === maybe.name);
//   //       if (foundByName && foundByName._id) return String(foundByName._id);
//   //     }
//   //   } catch (e) {
//   //     // ignore and fallthrough
//   //   }

//   //   // give up safely
//   //   return null;
//   // };


//   // role-aware effective id extractor


//   const getEffectiveId = (maybe) => {
//   if (!maybe) return null;

//   // 1) if caller passed a plain id string -> return it
//   // if (typeof maybe === "string") return maybe;

//   // 2) CASE: object that explicitly contains dataCenterId (assignment / manager case)
//   //   - { dataCenterId: "abc" } or { dataCenterId: { _id: "abc", ... } }
//   // if (maybe.dataCenterId) {
//   //   if (typeof maybe.dataCenterId === "string") return String(maybe.dataCenterId);
//   //   if (maybe.dataCenterId._id) return String(maybe.dataCenterId._id);
//   // }

//   // 3) If it's a datacenter-like object with _id
//   if (maybe._id) {
//     // Admin: prefer the top-level _id
//     if (user?.role === "admin") return String(maybe._id);

//     // Manager/User: try to find the matching entry in the loaded list and return its nested dataCenterId if present
//     // (some manager lists return items where the actual datacenter id is nested)
//     const found = dataCenters.find((d) => String(d._id) === String(maybe._id));
//     if (found) {
//       if (found.dataCenterId) {
//         if (typeof found.dataCenterId === "string") return String(found.dataCenterId);
//         if (found.dataCenterId._id) return String(found.dataCenterId._id);
//       }
//       // if no nested dataCenterId, fallback to top-level _id
//       return String(found._id);
//     }

//     // fallback: return the object's _id (safe)
//     return String(maybe._id);
//   }

//   // 4) As a last attempt, try matching by name (defensive)
//   if (maybe.name && typeof maybe.name === "string") {
//     const foundByName = dataCenters.find((d) => d.name === maybe.name);
//     if (foundByName) {
//       if (user?.role === "admin") return String(foundByName._id);
//       if (foundByName.dataCenterId) {
//         if (typeof foundByName.dataCenterId === "string") return String(foundByName.dataCenterId);
//         if (foundByName.dataCenterId._id) return String(foundByName.dataCenterId._id);
//       }
//       return String(foundByName._id);
//     }
//   }

//   // Give up safely
//   return null;
// };



// const getNormalizedDataCenter = (datacenter) => {
//   if (!datacenter) return null;

//   // Admin already has full DC object
//   if (user?.role === "admin") return datacenter;

//   // Manager/User → extract real DC from assignment
//   if (datacenter.dataCenterId) {
//     if (typeof datacenter.dataCenterId === "object") {
//       return datacenter.dataCenterId;
//     }

//     // fallback: find in loaded list
//     const found = dataCenters.find(
//       (d) => String(d._id) === String(datacenter.dataCenterId)
//     );
//     return found || null;
//   }

//   // Final fallback
//   return datacenter;
// };



//   const displayDataCenters = dataCenters;

//   const handleRowClick = (datacenter, e) => {
//     e?.stopPropagation();
//     setSelectedDataCenter(datacenter);
//     if (isMobile) setDrawerOpen(false);
//   };

//   // selected effective id (handles selectedDataCenter being assignment or plain dc)
//   const selectedEffId = getEffectiveId(selectedDataCenter);

//   // shared markup using ManagementListShell
//   const renderListMarkup = () => (
//     <div className="relative min-h-0">
//       {/* mobile close placed above on small screens */}
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
//             <th className="py-2 px-4 font-bold text-gray-800">Data Center Name</th>
//             <th className="py-2 px-4  text-center">Actions</th>
//           </>
//         }
//       >
//         {isLoading && <TableSkeleton rows={4} />}

//         {!isLoading &&
//           displayDataCenters.map((datac, index) => {
//             const id = getEffectiveId(datac) ?? String(index);
//             const displayName = datac.name ?? `Data Center ${index + 1}`;

//             return (
//               <tr
//                 key={id}
//                 className={`border-b border-gray-200 cursor-pointer transition-colors hover:bg-blue-50/60 ${
//                   selectedEffId === String(id) ? "bg-blue-50 border-blue-300" : ""
//                 }`}
//                 onClick={(e) => handleRowClick(datac, e)}
//               >
//                 <td className="py-2 sm:py-3 px-2 sm:px-4">{displayName}</td>

//                 <td className="py-2 sm:py-3 px-2 sm:px-4 text-center">
//                   <ActionButtons
//                     item={datac}
//                     onEdit={(item) => {
//                       const eff = getEffectiveId(item);
//                       if (!eff) return Swal.fire("Error", "Invalid Data Center ID", "error");
//                       handleEditOpen(item.name, eff);
//                     }}
//                     onDelete={(item) => {
//                       const eff = getEffectiveId(item);
//                       if (!eff) return Swal.fire("Error", "Invalid Data Center ID", "error");
//                       handleDeleteOpen(item.name, eff);
//                     }}
//                   />
//                 </td>
//               </tr>
//             );
//           })}

//         {!isLoading && displayDataCenters.length === 0 && (
//           <tr>
//             <td colSpan={2} className="p-4 text-center text-gray-500">
//               No Data Centers found.
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
//             <img src="/logo-half.png" className="w-auto h-[30px]" />
//             <h1 className="organization-list-title font-semibold text-gray-800">Data Center Management</h1>
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

//       {DeleteOpen && (
//         <DeleteModal
//           open={DeleteOpen}
//           handleClose={handleDeleteClose}
//           handleDelete={() => handleDelete(dataCenterId)}
//           itemId={dataCenterId}
//           itemName={dataCenterName}
//           itemLabel="Data Center"
//         />
//       )}

//       {EditOpen && (
//         <OrganizationEditModal
//           open={EditOpen}
//           handleClose={handleEditClose}
//           handleEdit={(id, name) => handleEdit(id, name)}
//           organizationId={dataCenterId}
//           organizationName={dataCenterName}
//         />
//       )}
//     </>
//   );
// };

// export default DataCenterList;
















// // src/pages/management/DataCenterList.jsx
// import { Pencil, Trash, Menu } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Swal from "sweetalert2";

// import {
//   fetchAllDataCenters,
//   fetchDataCentersByUser,
//   updateDataCenter,
//   deleteDataCenter,
// } from "../../slices/DataCenterSlice";

// import OrganizationEditModal from "../../components/Modals/OrganizationManagement/EditModal";
// import DeleteModal from "../../components/Modals/Common/DeleteModal";
// import TableSkeleton from "../../components/skeletons/TableSkeleton";

// import CloseIcon from "@mui/icons-material/Close";
// import { Drawer, IconButton, useMediaQuery } from "@mui/material";
// import { useInstallation } from "../../contexts/InstallationContext";
// import { useStore } from "../../contexts/storecontexts";

// import ManagementListShell from "../../components/Modals/Common/ManagementListShell";
// import ActionButtons from "../../components/Modals/Common/ActionButtons";

// const DataCenterList = () => {
//   const dispatch = useDispatch();
//   const { DataCenters, loading, error } = useSelector((state) => state.DataCenter);
//   const { selectedDataCenter, setSelectedDataCenter } = useInstallation();
//   const { user } = useStore(); // get current user to decide fetch behavior

//   const isLoading = loading?.fetch;

//   const [DeleteOpen, setDeleteOpen] = useState(false);
//   const [EditOpen, setEditOpen] = useState(false);
//   const [dataCenterName, setDataCenterName] = useState("");
//   const [dataCenterId, setDataCenterId] = useState(null);

//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const isDesktop = useMediaQuery("(min-width:768px)");
//   const isMobile = !isDesktop;

//   // local copy of datacenters list (normalized)
//   const dataCenters = Array.isArray(DataCenters) ? DataCenters : [];

//   // ----- fetch datacenters depending on role -----
//   useEffect(() => {
//     if (!user) return;
//     // admin sees all; managers/users see only their assigned DCs
//     if (user.role === "admin") {
//       dispatch(fetchAllDataCenters());
//     } else {
//       dispatch(fetchDataCentersByUser(user._id));
//     }
//   }, [dispatch, user]);

//   useEffect(() => {
//     if (error?.fetch) console.error("DataCenter error:", error.fetch);
//   }, [error]);

//   const handleDeleteOpen = (name, id) => {
//     setDeleteOpen(true);
//     setDataCenterName(name);
//     setDataCenterId(id);
//   };
//   const handleDeleteClose = () => {
//     setDeleteOpen(false);
//     setDataCenterId(null);
//     setDataCenterName("");
//   };
//   const handleEditOpen = (name, id) => {
//     setEditOpen(true);
//     setDataCenterId(id);
//     setDataCenterName(name);
//   };
//   const handleEditClose = () => {
//     setEditOpen(false);
//     setDataCenterId(null);
//     setDataCenterName("");
//   };

//   // SAFE handlers: validate id before dispatching
//   const handleDelete = async (id) => {
//     if (!id || typeof id !== "string") {
//       console.error("Invalid DataCenter ID for delete:", id);
//       return Swal.fire("Error", "Invalid Data Center ID", "error");
//     }

//     try {
//       await dispatch(deleteDataCenter(id)).unwrap();
//       Swal.fire({ icon: "success", title: "Deleted", text: "Data Center deleted." });
//       handleDeleteClose();
//     } catch (err) {
//       console.error("Delete error:", err);
//       Swal.fire({ icon: "error", title: "Delete failed", text: String(err) || "Something went wrong" });
//     }
//   };

//   const handleEdit = async (orgId, newName) => {
//     if (!orgId || typeof orgId !== "string") {
//       console.error("Invalid DataCenter ID for update:", orgId);
//       return Swal.fire("Error", "Invalid Data Center ID", "error");
//     }

//     try {
//       await dispatch(updateDataCenter({ id: orgId, name: newName })).unwrap();
//       Swal.fire({ icon: "success", title: "Updated", text: "Data Center updated." });
//       handleEditClose();
//     } catch (err) {
//       console.error("Update error:", err);
//       Swal.fire({ icon: "error", title: "Update failed", text: String(err) || "Something went wrong" });
//     }
//   };

//   /**
//    * getEffectiveId
//    *
//    * Return a stable string ID for a datacenter regardless of shape:
//    *  - admin: datacenter object with _id
//    *  - manager/user: assignment-like object containing dataCenterId (object or string)
//    *  - or when you accidentally pass an id string already.
//    */
//   const getEffectiveId = (maybe) => {
//     if (!maybe) return null;

//     // If caller passed a plain id string -> return it
//     if (typeof maybe === "string") return maybe;

//     // If item has dataCenterId (assignment shape) -> use nested id
//     if (maybe.dataCenterId) {
//       if (typeof maybe.dataCenterId === "string") return String(maybe.dataCenterId);
//       if (typeof maybe.dataCenterId === "object" && maybe.dataCenterId._id) return String(maybe.dataCenterId._id);
//     }

//     // If it's already a datacenter-like object with _id -> return top-level _id
//     if (maybe._id) {
//       // For admin datacenters this is the real DC id. For manager entries the top _id may be assignment id,
//       // but we already handled dataCenterId above so here returning maybe._id is safe fallback.
//       return String(maybe._id);
//     }

//     // Last attempt: if there's a name, try to find by name in loaded list
//     if (maybe.name && typeof maybe.name === "string") {
//       const found = dataCenters.find((d) => d.name === maybe.name || (d.dataCenterId && d.dataCenterId.name === maybe.name));
//       if (found) {
//         // prefer nested dataCenterId if present
//         if (found.dataCenterId) {
//           if (typeof found.dataCenterId === "string") return String(found.dataCenterId);
//           if (found.dataCenterId._id) return String(found.dataCenterId._id);
//         }
//         if (found._id) return String(found._id);
//       }
//     }

//     return null;
//   };


// //   const getEffectiveId = (datacenter) => {
// //   if (!datacenter) return null;

// //   // ADMIN → real datacenter id is top-level _id
// //   if (user?.role === "admin") {
// //     if (typeof datacenter === "string") return datacenter;
// //     if (datacenter._id) return String(datacenter._id);
// //     return null;
// //   }

// //   // MANAGER / USER → real datacenter id is ONLY nested
// //   if (user?.role === "manager" || user?.role === "user") {
// //     if (
// //       datacenter.dataCenterId &&
// //       typeof datacenter.dataCenterId === "object" &&
// //       datacenter.dataCenterId._id
// //     ) {
// //       return String(datacenter.dataCenterId._id);
// //     }
// //     return null; // 🚫 NEVER fallback to datacenter._id
// //   }

// //   return null;
// // };



//   /**
//    * getNormalizedDataCenter
//    *
//    * Return a "normalized" full datacenter object to store in installation context.
//    * - admin: the item itself is the datacenter → return it.
//    * - manager/user: the item is often an assignment that includes `dataCenterId` object → return `dataCenterId`.
//    * - fallback: try to find the full datacenter in the loaded list by nested id or name.
//    */
//   // const getNormalizedDataCenter = (maybe) => {
//   //   if (!maybe) return null;

//   //   // If already a plain id string -> try to find full object from list
//   //   if (typeof maybe === "string") {
//   //     const found = dataCenters.find((d) => String(d._id) === String(maybe) || (d.dataCenterId && String(d.dataCenterId._id) === String(maybe)));
//   //     return found?.dataCenterId ? (typeof found.dataCenterId === "object" ? found.dataCenterId : found) : found || null;
//   //   }

//   //   // If item contains dataCenterId (assignment shape) -> return nested object if available
//   //   if (maybe.dataCenterId) {
//   //     if (typeof maybe.dataCenterId === "object") {
//   //       // dataCenterId object looks like { _id, name, ... } -> use it (this is the real DC)
//   //       return maybe.dataCenterId;
//   //     }
//   //     // dataCenterId could be a string id -> find it in loaded list
//   //     const foundByNested = dataCenters.find((d) => String(d._id) === String(maybe.dataCenterId) || (d.dataCenterId && String(d.dataCenterId._id) === String(maybe.dataCenterId)));
//   //     if (foundByNested) return foundByNested.dataCenterId ? (typeof foundByNested.dataCenterId === "object" ? foundByNested.dataCenterId : foundByNested) : foundByNested;
//   //   }

//   //   // If it's already a datacenter-like object with _id:
//   //   if (maybe._id) {
//   //     // If admin -> this is the full DC
//   //     if (user?.role === "admin") return maybe;

//   //     // For non-admin, try to locate a corresponding entry in the loaded list which may contain nested dataCenterId
//   //     const found = dataCenters.find((d) => String(d._id) === String(maybe._id) || (d.dataCenterId && String(d.dataCenterId._id) === String(maybe._id)));
//   //     if (found) {
//   //       // prefer nested real datacenter if present
//   //       if (found.dataCenterId && typeof found.dataCenterId === "object") return found.dataCenterId;
//   //       return found;
//   //     }
//   //     // fallback: return maybe itself
//   //     return maybe;
//   //   }

//   //   // Last fallback by name
//   //   if (maybe.name) {
//   //     const foundByName = dataCenters.find((d) => d.name === maybe.name || (d.dataCenterId && d.dataCenterId.name === maybe.name));
//   //     if (foundByName) {
//   //       return foundByName.dataCenterId && typeof foundByName.dataCenterId === "object" ? foundByName.dataCenterId : foundByName;
//   //     }
//   //   }

//   //   return null;
//   // };


// //   const getNormalizedDataCenter = (datacenter) => {
// //   if (!datacenter) return null;

// //   // ADMIN → already correct
// //   if (user?.role === "admin") {
// //     return datacenter;
// //   }

// //   // MANAGER / USER → always return nested datacenter
// //   if (
// //     datacenter.dataCenterId &&
// //     typeof datacenter.dataCenterId === "object"
// //   ) {
// //     return datacenter.dataCenterId;
// //   }

// //   return null;
// // };







// // const getNormalizedDataCenter = (datacenter) => {
// //   if (!datacenter) return null;

// //   // ADMIN → use the top-level object
// //   if (user?.role === "admin") return datacenter;

// //   // MANAGER / USER → nested datacenter if present
// //   if (user?.role === "manager" || user?.role === "user") {
// //     if (datacenter.dataCenterId && typeof datacenter.dataCenterId === "object") {
// //       return datacenter.dataCenterId;
// //     }

// //     // fallback: use the top-level name/id to keep UI clickable
// //     return {
// //       _id: datacenter._id ?? null,
// //       name: datacenter.name ?? "Unknown DC",
// //     };
// //   }

// //   return null;
// // };





//   const displayDataCenters = dataCenters;

//   // When user clicks a row -> store a NORMALIZED datacenter object (so other pages see real ._id and name)
//   // const handleRowClick = (datacenter, e) => {
//   //   e?.stopPropagation();

//   //   const normalized = getNormalizedDataCenter(datacenter);
//   //   if (!normalized) {
//   //     // Fallback: still set original item if nothing normalized (defensive)
//   //     console.warn("Failed to normalize datacenter selection, storing raw item:", datacenter);
//   //     setSelectedDataCenter(datacenter);
//   //   } else {
//   //     setSelectedDataCenter(normalized);
//   //   }

//   //   if (isMobile) setDrawerOpen(false);
//   // };


//   console.log("FetchDataCenter By UsrerID:", DataCenters)

//   const handleRowClick = (datacenter, e) => {
//   e?.stopPropagation();

//   const normalized = getNormalizedDataCenter(datacenter);

//   if (!normalized) {
//     return Swal.fire("Error", "Invalid Data Center selection", "error");
//   }

//   setSelectedDataCenter(normalized);
//   if (isMobile) setDrawerOpen(false);
// };


//   // selected effective id (handles selectedDataCenter being assignment or plain dc)
//   const selectedEffId = getEffectiveId(selectedDataCenter);

//   // shared markup using ManagementListShell
//   const renderListMarkup = () => (
//     <div className="relative min-h-0">
//       {/* mobile close placed above on small screens */}
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
//             <th className="py-2 px-4 font-bold text-gray-800">Data Center Name</th>
//             <th className="py-2 px-4  text-center">Actions</th>
//           </>
//         }
//       >
//         {isLoading && <TableSkeleton rows={4} />}

//         {!isLoading &&
//           displayDataCenters.map((datac, index) => {
//             const id = getEffectiveId(datac) ?? String(index);
//             // prefer nested name for manager entries, else top-level name
//             const displayName = datac?.dataCenterId?.name ?? datac?.name ?? `Data Center ${index + 1}`;

//             return (
//               <tr
//                 key={id}
//                 className={`border-b border-gray-200 cursor-pointer transition-colors hover:bg-blue-50/60 ${
//                   selectedEffId === String(id) ? "bg-blue-50 border-blue-300" : ""
//                 }`}
//                 onClick={(e) => handleRowClick(datac, e)}
//               >
//                 <td className="py-2 sm:py-3 px-2 sm:px-4">{displayName}</td>

//                 <td className="py-2 sm:py-3 px-2 sm:px-4 text-center">
//                   {/* <ActionButtons
//                     item={datac}
//                     onEdit={(item) => {
//                       const eff = getEffectiveId(item);
//                       if (!eff) return Swal.fire("Error", "Invalid Data Center ID", "error");
//                       handleEditOpen(item?.dataCenterId?.name ?? item.name, eff);
//                     }}
//                     onDelete={(item) => {
//                       const eff = getEffectiveId(item);
//                       if (!eff) return Swal.fire("Error", "Invalid Data Center ID", "error");
//                       handleDeleteOpen(item?.dataCenterId?.name ?? item.name, eff);
//                     }}
//                   /> */}

//                   <ActionButtons
//                     item={datac}
//                     onEdit={(item) => {
//                       const id = getEffectiveDataCenterId(item);
//                       if (!id) return Swal.fire("Error", "Invalid Data Center ID", "error");
//                       handleEditOpen(item?.dataCenterId?.name ?? item.name, id);
//                     }}
//                     onDelete={(item) => {
//                       const id = getEffectiveDataCenterId(item);
//                       if (!id) return Swal.fire("Error", "Invalid Data Center ID", "error");
//                       handleDeleteOpen(item?.dataCenterId?.name ?? item.name, id);
//                     }}
//                   />
//                 </td>
//               </tr>
//             );
//           })}

//         {!isLoading && displayDataCenters.length === 0 && (
//           <tr>
//             <td colSpan={2} className="p-4 text-center text-gray-500">
//               No Data Centers found.
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
//             <img src="/logo-half.png" className="w-auto h-[30px]" />
//             <h1 className="organization-list-title font-semibold text-gray-800">Data Center Management</h1>
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

//       {DeleteOpen && (
//         <DeleteModal
//           open={DeleteOpen}
//           handleClose={handleDeleteClose}
//           handleDelete={() => handleDelete(dataCenterId)}
//           itemId={dataCenterId}
//           itemName={dataCenterName}
//           itemLabel="Data Center"
//         />
//       )}

//       {EditOpen && (
//         <OrganizationEditModal
//           open={EditOpen}
//           handleClose={handleEditClose}
//           handleEdit={(id, name) => handleEdit(id, name)}
//           organizationId={dataCenterId}
//           organizationName={dataCenterName}
//         />
//       )}
//     </>
//   );
// };

// export default DataCenterList;
















// // src/pages/management/DataCenterList.jsx
// import { Pencil, Trash, Menu } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Swal from "sweetalert2";

// import {
//   fetchAllDataCenters,
//   fetchDataCentersByUser,
//   updateDataCenter,
//   deleteDataCenter,
// } from "../../slices/DataCenterSlice";

// import OrganizationEditModal from "../../components/Modals/OrganizationManagement/EditModal";
// import DeleteModal from "../../components/Modals/Common/DeleteModal";
// import TableSkeleton from "../../components/skeletons/TableSkeleton";

// import CloseIcon from "@mui/icons-material/Close";
// import { Drawer, IconButton, useMediaQuery } from "@mui/material";
// import { useInstallation } from "../../contexts/InstallationContext";
// import { useStore } from "../../contexts/storecontexts";

// import ManagementListShell from "../../components/Modals/Common/ManagementListShell";
// import ActionButtons from "../../components/Modals/Common/ActionButtons";

// const DataCenterList = () => {
//   const dispatch = useDispatch();
//   const { DataCenters, loading, error } = useSelector((state) => state.DataCenter);
//   const { selectedDataCenter, setSelectedDataCenter } = useInstallation();
//   const { user } = useStore(); // get current user to decide fetch behavior

//   const isLoading = loading?.fetch;

//   const [DeleteOpen, setDeleteOpen] = useState(false);
//   const [EditOpen, setEditOpen] = useState(false);
//   const [dataCenterName, setDataCenterName] = useState("");
//   const [dataCenterId, setDataCenterId] = useState(null);

//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const isDesktop = useMediaQuery("(min-width:768px)");
//   const isMobile = !isDesktop;

//   // local copy of datacenters list (normalized)
//   const dataCenters = Array.isArray(DataCenters) ? DataCenters : [];

//   // ----- fetch datacenters depending on role -----
//   useEffect(() => {
//     if (!user) return;
//     // admin sees all; managers/users see only their assigned DCs
//     if (user.role === "admin") {
//       dispatch(fetchAllDataCenters());
//     } else {
//       dispatch(fetchDataCentersByUser(user._id));
//     }
//   }, [dispatch, user]);

//   useEffect(() => {
//     if (error?.fetch) console.error("DataCenter error:", error.fetch);
//   }, [error]);

//   const handleDeleteOpen = (name, id) => {
//     setDeleteOpen(true);
//     setDataCenterName(name);
//     setDataCenterId(id);
//   };
//   const handleDeleteClose = () => {
//     setDeleteOpen(false);
//     setDataCenterId(null);
//     setDataCenterName("");
//   };
//   const handleEditOpen = (name, id) => {
//     setEditOpen(true);
//     setDataCenterId(id);
//     setDataCenterName(name);
//   };
//   const handleEditClose = () => {
//     setEditOpen(false);
//     setDataCenterId(null);
//     setDataCenterName("");
//   };

//   // SAFE handlers: validate id before dispatching
//   const handleDelete = async (id) => {
//     if (!id || typeof id !== "string") {
//       console.error("Invalid DataCenter ID for delete:", id);
//       return Swal.fire("Error", "Invalid Data Center ID", "error");
//     }

//     try {
//       await dispatch(deleteDataCenter(id)).unwrap();
//       Swal.fire({ icon: "success", title: "Deleted", text: "Data Center deleted." });
//       handleDeleteClose();
//     } catch (err) {
//       console.error("Delete error:", err);
//       Swal.fire({ icon: "error", title: "Delete failed", text: String(err) || "Something went wrong" });
//     }
//   };

//   const handleEdit = async (orgId, newName) => {
//     if (!orgId || typeof orgId !== "string") {
//       console.error("Invalid DataCenter ID for update:", orgId);
//       return Swal.fire("Error", "Invalid Data Center ID", "error");
//     }

//     try {
//       await dispatch(updateDataCenter({ id: orgId, name: newName })).unwrap();
//       Swal.fire({ icon: "success", title: "Updated", text: "Data Center updated." });
//       handleEditClose();
//     } catch (err) {
//       console.error("Update error:", err);
//       Swal.fire({ icon: "error", title: "Update failed", text: String(err) || "Something went wrong" });
//     }
//   };

//   /**
//    * getEffectiveId
//    *
//    * Return a stable string ID for a datacenter regardless of shape:
//    *  - admin: datacenter object with _id
//    *  - manager/user: assignment-like object containing dataCenterId (object or string)
//    *  - or when you accidentally pass an id string already.
//    */
//   const getEffectiveId = (maybe) => {
//     if (!maybe) return null;

//     // If caller passed a plain id string -> return it
//     if (typeof maybe === "string") return maybe;

//     // If item has dataCenterId (assignment shape) -> use nested id
//     if (maybe.dataCenterId) {
//       if (typeof maybe.dataCenterId === "string") return String(maybe.dataCenterId);
//       if (typeof maybe.dataCenterId === "object" && maybe.dataCenterId._id) return String(maybe.dataCenterId._id);
//     }

//     // If it's already a datacenter-like object with _id -> return top-level _id
//     if (maybe._id) {
//       // For admin datacenters this is the real DC id. For manager entries the top _id may be assignment id,
//       // but we already handled dataCenterId above so here returning maybe._id is safe fallback.
//       return String(maybe._id);
//     }

//     // Last attempt: if there's a name, try to find by name in loaded list
//     if (maybe.name && typeof maybe.name === "string") {
//       const found = dataCenters.find((d) => d.name === maybe.name || (d.dataCenterId && d.dataCenterId.name === maybe.name));
//       if (found) {
//         // prefer nested dataCenterId if present
//         if (found.dataCenterId) {
//           if (typeof found.dataCenterId === "string") return String(found.dataCenterId);
//           if (found.dataCenterId._id) return String(found.dataCenterId._id);
//         }
//         if (found._id) return String(found._id);
//       }
//     }

//     return null;
//   };

//   /**
//    * getNormalizedDataCenter
//    *
//    * Return a "normalized" full datacenter object to store in installation context.
//    * - admin: the item itself is the datacenter → return it.
//    * - manager/user: the item is often an assignment that includes `dataCenterId` object → return `dataCenterId`.
//    * - fallback: try to find the full datacenter in the loaded list by nested id or name.
//    */
//   const getNormalizedDataCenter = (maybe) => {
//     if (!maybe) return null;

//     // If already a plain id string -> try to find full object from list
//     if (typeof maybe === "string") {
//       const found = dataCenters.find((d) => String(d._id) === String(maybe) || (d.dataCenterId && String(d.dataCenterId._id) === String(maybe)));
//       return found?.dataCenterId ? (typeof found.dataCenterId === "object" ? found.dataCenterId : found) : found || null;
//     }

//     // If item contains dataCenterId (assignment shape) -> return nested object if available
//     if (maybe.dataCenterId) {
//       if (typeof maybe.dataCenterId === "object") {
//         // dataCenterId object looks like { _id, name, ... } -> use it (this is the real DC)
//         return maybe.dataCenterId;
//       }
//       // dataCenterId could be a string id -> find it in loaded list
//       const foundByNested = dataCenters.find((d) => String(d._id) === String(maybe.dataCenterId) || (d.dataCenterId && String(d.dataCenterId._id) === String(maybe.dataCenterId)));
//       if (foundByNested) return foundByNested.dataCenterId ? (typeof foundByNested.dataCenterId === "object" ? foundByNested.dataCenterId : foundByNested) : foundByNested;
//     }

//     // If it's already a datacenter-like object with _id:
//     if (maybe._id) {
//       // If admin -> this is the full DC
//       if (user?.role === "admin") return maybe;

//       // For non-admin, try to locate a corresponding entry in the loaded list which may contain nested dataCenterId
//       const found = dataCenters.find((d) => String(d._id) === String(maybe._id) || (d.dataCenterId && String(d.dataCenterId._id) === String(maybe._id)));
//       if (found) {
//         // prefer nested real datacenter if present
//         if (found.dataCenterId && typeof found.dataCenterId === "object") return found.dataCenterId;
//         return found;
//       }
//       // fallback: return maybe itself
//       return maybe;
//     }

//     // Last fallback by name
//     if (maybe.name) {
//       const foundByName = dataCenters.find((d) => d.name === maybe.name || (d.dataCenterId && d.dataCenterId.name === maybe.name));
//       if (foundByName) {
//         return foundByName.dataCenterId && typeof foundByName.dataCenterId === "object" ? foundByName.dataCenterId : foundByName;
//       }
//     }

//     return null;
//   };

//   const displayDataCenters = dataCenters;

//   // When user clicks a row -> store a NORMALIZED datacenter object (so other pages see real ._id and name)
//   const handleRowClick = (datacenter, e) => {
//     e?.stopPropagation();

//     const normalized = getNormalizedDataCenter(datacenter);
//     if (!normalized) {
//       // Fallback: still set original item if nothing normalized (defensive)
//       console.warn("Failed to normalize datacenter selection, storing raw item:", datacenter);
//       setSelectedDataCenter(datacenter);
//     } else {
//       setSelectedDataCenter(normalized);
//     }

//     if (isMobile) setDrawerOpen(false);
//   };

//   // selected effective id (handles selectedDataCenter being assignment or plain dc)
//   const selectedEffId = getEffectiveId(selectedDataCenter);

//   // shared markup using ManagementListShell
//   const renderListMarkup = () => (
//     <div className="relative min-h-0">
//       {/* mobile close placed above on small screens */}
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
//             <th className="py-2 px-4 font-bold text-gray-800">Data Center Name</th>
//             <th className="py-2 px-4  text-center">Actions</th>
//           </>
//         }
//       >
//         {isLoading && <TableSkeleton rows={4} />}

//         {!isLoading &&
//           displayDataCenters.map((datac, index) => {
//             const id = getEffectiveId(datac) ?? String(index);
//             // prefer nested name for manager entries, else top-level name
//             const displayName = datac?.dataCenterId?.name ?? datac?.name ?? `Data Center ${index + 1}`;

//             return (
//               <tr
//                 key={id}
//                 className={`border-b border-gray-200 cursor-pointer transition-colors hover:bg-blue-50/60 ${
//                   selectedEffId === String(id) ? "bg-blue-50 border-blue-300" : ""
//                 }`}
//                 onClick={(e) => handleRowClick(datac, e)}
//               >
//                 <td className="py-2 sm:py-3 px-2 sm:px-4">{displayName}</td>

//                 <td className="py-2 sm:py-3 px-2 sm:px-4 text-center">
//                   <ActionButtons
//                     item={datac}
//                     onEdit={(item) => {
//                       const eff = getEffectiveId(item);
//                       if (!eff) return Swal.fire("Error", "Invalid Data Center ID", "error");
//                       handleEditOpen(item?.dataCenterId?.name ?? item.name, eff);
//                     }}
//                     onDelete={(item) => {
//                       const eff = getEffectiveId(item);
//                       if (!eff) return Swal.fire("Error", "Invalid Data Center ID", "error");
//                       handleDeleteOpen(item?.dataCenterId?.name ?? item.name, eff);
//                     }}
//                   />
//                 </td>
//               </tr>
//             );
//           })}

//         {!isLoading && displayDataCenters.length === 0 && (
//           <tr>
//             <td colSpan={2} className="p-4 text-center text-gray-500">
//               No Data Centers found.
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
//             <img src="/logo-half.png" className="w-auto h-[30px]" />
//             <h1 className="organization-list-title font-semibold text-gray-800">Data Center Management</h1>
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

//       {DeleteOpen && (
//         <DeleteModal
//           open={DeleteOpen}
//           handleClose={handleDeleteClose}
//           handleDelete={() => handleDelete(dataCenterId)}
//           itemId={dataCenterId}
//           itemName={dataCenterName}
//           itemLabel="Data Center"
//         />
//       )}

//       {EditOpen && (
//         <OrganizationEditModal
//           open={EditOpen}
//           handleClose={handleEditClose}
//           handleEdit={(id, name) => handleEdit(id, name)}
//           organizationId={dataCenterId}
//           organizationName={dataCenterName}
//         />
//       )}
//     </>
//   );
// };

// export default DataCenterList;






// // src/pages/management/DataCenterList.jsx
// import { Pencil, Trash, Menu } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Swal from "sweetalert2";

// import {
//   fetchAllDataCenters,
//   fetchDataCentersByUser,
//   updateDataCenter,
//   deleteDataCenter,
// } from "../../slices/DataCenterSlice";

// import OrganizationEditModal from "../../components/Modals/OrganizationManagement/EditModal";
// import DeleteModal from "../../components/Modals/Common/DeleteModal";
// import TableSkeleton from "../../components/skeletons/TableSkeleton";

// import CloseIcon from "@mui/icons-material/Close";
// import { Drawer, IconButton, useMediaQuery } from "@mui/material";
// import { useInstallation } from "../../contexts/InstallationContext";
// import { useStore } from "../../contexts/storecontexts";

// import ManagementListShell from "../../components/Modals/Common/ManagementListShell";
// import ActionButtons from "../../components/Modals/Common/ActionButtons";

// const DataCenterList = () => {
//   const dispatch = useDispatch();
//   const { DataCenters, loading, error } = useSelector((state) => state.DataCenter);
//   const { selectedDataCenter, setSelectedDataCenter } = useInstallation();
//   const { user } = useStore(); // get current user to decide fetch behavior

//   const isLoading = loading?.fetch;

//   const [DeleteOpen, setDeleteOpen] = useState(false);
//   const [EditOpen, setEditOpen] = useState(false);
//   const [dataCenterName, setDataCenterName] = useState("");
//   const [dataCenterId, setDataCenterId] = useState(null);

//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const isDesktop = useMediaQuery("(min-width:768px)");
//   const isMobile = !isDesktop;

//   // local copy of datacenters list
//   const dataCenters = Array.isArray(DataCenters) ? DataCenters : [];

//   // ----- fetch datacenters depending on role -----
//   useEffect(() => {
//     if (!user) return;
//     if (user.role === "admin") {
//       dispatch(fetchAllDataCenters());
//     } else {
//       dispatch(fetchDataCentersByUser(user._id));
//     }
//   }, [dispatch, user]);

//   useEffect(() => {
//     if (error?.fetch) console.error("DataCenter error:", error.fetch);
//   }, [error]);

//   const handleDeleteOpen = (name, id) => {
//     setDeleteOpen(true);
//     setDataCenterName(name);
//     setDataCenterId(id);
//   };
//   const handleDeleteClose = () => {
//     setDeleteOpen(false);
//     setDataCenterId(null);
//     setDataCenterName("");
//   };
//   const handleEditOpen = (name, id) => {
//     setEditOpen(true);
//     setDataCenterId(id);
//     setDataCenterName(name);
//   };
//   const handleEditClose = () => {
//     setEditOpen(false);
//     setDataCenterId(null);
//     setDataCenterName("");
//   };

//   // SAFE handlers: validate id before dispatching
//   const handleDelete = async (id) => {
//     if (!id || typeof id !== "string") {
//       console.error("Invalid DataCenter ID for delete:", id);
//       return Swal.fire("Error", "Invalid Data Center ID", "error");
//     }

//     try {
//       await dispatch(deleteDataCenter(id)).unwrap();
//       Swal.fire({ icon: "success", title: "Deleted", text: "Data Center deleted." });
//       handleDeleteClose();
//     } catch (err) {
//       console.error("Delete error:", err);
//       Swal.fire({ icon: "error", title: "Delete failed", text: String(err) || "Something went wrong" });
//     }
//   };

//   const handleEdit = async (orgId, newName) => {
//     if (!orgId || typeof orgId !== "string") {
//       console.error("Invalid DataCenter ID for update:", orgId);
//       return Swal.fire("Error", "Invalid Data Center ID", "error");
//     }

//     try {
//       await dispatch(updateDataCenter({ id: orgId, name: newName })).unwrap();
//       Swal.fire({ icon: "success", title: "Updated", text: "Data Center updated." });
//       handleEditClose();
//     } catch (err) {
//       console.error("Update error:", err);
//       Swal.fire({ icon: "error", title: "Update failed", text: String(err) || "Something went wrong" });
//     }
//   };

//   /**
//    * getIdForRole
//    *
//    * Return the id string to use for keys/actions depending on current user role:
//    * - admin: prefer top-level _id (full datacenter objects)
//    * - non-admin: prefer nested dataCenterId (string or object._id)
//    *
//    * This ensures actions (edit/delete) send the datacenter's true id for managers/users
//    * and uses the admin object's _id for admins.
//    */
//   const getIdForRole = (item) => {
//     if (!item) return null;

//     // Admin should act on top-level datacenter objects (they fetch full datacenters)
//     if (user?.role === "admin") {
//       // If provided an assignment-like entry accidentally, fallback to nested id
//       if (item._id) return String(item._id);
//       if (item.dataCenterId) {
//         if (typeof item.dataCenterId === "string") return String(item.dataCenterId);
//         if (typeof item.dataCenterId === "object" && item.dataCenterId._id) return String(item.dataCenterId._id);
//       }
//       return null;
//     }

//     // Non-admins: prefer dataCenterId (they receive assignment-like entries)
//     if (item.dataCenterId) {
//       if (typeof item.dataCenterId === "string") return String(item.dataCenterId);
//       if (typeof item.dataCenterId === "object" && item.dataCenterId._id) return String(item.dataCenterId._id);
//     }
//     // fallback to top-level _id if nested not present
//     if (item._id) return String(item._id);
//     return null;
//   };

//   /**
//    * getDisplayName - prefer nested name for assigned entries, otherwise top-level name
//    */
//   const getDisplayName = (item, index) => item?.dataCenterId?.name ?? item?.name ?? `Data Center ${index + 1}`;

//   // When user clicks a row -> store a NORMALIZED datacenter object (so other pages see real ._id and name)
//   const handleRowClick = (datacenter, e) => {
//     e?.stopPropagation();

//     // existing normalization stays useful (returns full dc object for non-admins when possible)
//     const normalized = (() => {
//       if (!datacenter) return null;

//       // If already a plain id string -> try to find full object from local list
//       if (typeof datacenter === "string") {
//         const found = dataCenters.find(
//           (d) => String(d._id) === String(datacenter) || (d.dataCenterId && String(d.dataCenterId._id) === String(datacenter))
//         );
//         return found?.dataCenterId ? (typeof found.dataCenterId === "object" ? found.dataCenterId : found) : found || null;
//       }

//       // If item contains dataCenterId (assignment shape) -> return nested object if available
//       if (datacenter.dataCenterId) {
//         if (typeof datacenter.dataCenterId === "object") return datacenter.dataCenterId;
//         const foundByNested = dataCenters.find(
//           (d) => String(d._id) === String(datacenter.dataCenterId) || (d.dataCenterId && String(d.dataCenterId._id) === String(datacenter.dataCenterId))
//         );
//         if (foundByNested) return foundByNested.dataCenterId ? (typeof foundByNested.dataCenterId === "object" ? foundByNested.dataCenterId : foundByNested) : foundByNested;
//       }

//       // If it's already a datacenter-like object with _id:
//       if (datacenter._id) {
//         if (user?.role === "admin") return datacenter;
//         const found = dataCenters.find((d) => String(d._id) === String(datacenter._id) || (d.dataCenterId && String(d.dataCenterId._id) === String(datacenter._id)));
//         if (found) {
//           if (found.dataCenterId && typeof found.dataCenterId === "object") return found.dataCenterId;
//           return found;
//         }
//         return datacenter;
//       }

//       // Last fallback by name
//       if (datacenter.name) {
//         const foundByName = dataCenters.find((d) => d.name === datacenter.name || (d.dataCenterId && d.dataCenterId.name === datacenter.name));
//         if (foundByName) return foundByName.dataCenterId && typeof foundByName.dataCenterId === "object" ? foundByName.dataCenterId : foundByName;
//       }

//       return null;
//     })();

//     if (!normalized) {
//       console.warn("Failed to normalize datacenter selection, storing raw item:", datacenter);
//       setSelectedDataCenter(datacenter);
//     } else {
//       setSelectedDataCenter(normalized);
//     }

//     if (isMobile) setDrawerOpen(false);
//   };

//   // selected effective id (role-aware)
//   const selectedEffId = getIdForRole(selectedDataCenter);

//   // shared markup using ManagementListShell
//   const renderListMarkup = () => (
//     <div className="relative min-h-0">
//       {/* mobile close placed above on small screens */}
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
//             <th className="py-2 px-4 font-bold text-gray-800">Data Center Name</th>
//             <th className="py-2 px-4  text-center">Actions</th>
//           </>
//         }
//       >
//         {isLoading && <TableSkeleton rows={4} />}

//         {!isLoading &&
//           dataCenters.map((datac, index) => {
//             // id used for keys and actions depends on current user's role
//             const id = getIdForRole(datac) ?? String(index);
//             const displayName = getDisplayName(datac, index);

//             return (
//               <tr
//                 key={id}
//                 className={`border-b border-gray-200 cursor-pointer transition-colors hover:bg-blue-50/60 ${
//                   selectedEffId === String(id) ? "bg-blue-50 border-blue-300" : ""
//                 }`}
//                 onClick={(e) => handleRowClick(datac, e)}
//               >
//                 <td className="py-2 sm:py-3 px-2 sm:px-4">{displayName}</td>

//                 <td className="py-2 sm:py-3 px-2 sm:px-4 text-center">
//                   <ActionButtons
//                     item={datac}
//                     onEdit={(item) => {
//                       const eff = getIdForRole(item);
//                       if (!eff) return Swal.fire("Error", "Invalid Data Center ID", "error");
//                       handleEditOpen(item?.dataCenterId?.name ?? item.name, eff);
//                     }}
//                     onDelete={(item) => {
//                       const eff = getIdForRole(item);
//                       if (!eff) return Swal.fire("Error", "Invalid Data Center ID", "error");
//                       handleDeleteOpen(item?.dataCenterId?.name ?? item.name, eff);
//                     }}
//                   />
//                 </td>
//               </tr>
//             );
//           })}

//         {!isLoading && dataCenters.length === 0 && (
//           <tr>
//             <td colSpan={2} className="p-4 text-center text-gray-500">
//               No Data Centers found.
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
//             <img src="/logo-half.png" className="w-auto h-[30px]" />
//             <h1 className="organization-list-title font-semibold text-gray-800">Data Center Management</h1>
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

//       {DeleteOpen && (
//         <DeleteModal
//           open={DeleteOpen}
//           handleClose={handleDeleteClose}
//           handleDelete={() => handleDelete(dataCenterId)}
//           itemId={dataCenterId}
//           itemName={dataCenterName}
//           itemLabel="Data Center"
//         />
//       )}

//       {EditOpen && (
//         <OrganizationEditModal
//           open={EditOpen}
//           handleClose={handleEditClose}
//           handleEdit={(id, name) => handleEdit(id, name)}
//           organizationId={dataCenterId}
//           organizationName={dataCenterName}
//         />
//       )}
//     </>
//   );
// };

// export default DataCenterList;













// src/pages/management/DataCenterList.jsx
import { Pencil, Trash, Menu } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import {
  fetchAllDataCenters,
  fetchDataCentersByUser,
  updateDataCenter,
  deleteDataCenter,
} from "../../slices/DataCenterSlice";

import OrganizationEditModal from "../../components/Modals/OrganizationManagement/EditModal";
import DeleteModal from "../../components/Modals/Common/DeleteModal";
import TableSkeleton from "../../components/skeletons/TableSkeleton";

import CloseIcon from "@mui/icons-material/Close";
import { Drawer, IconButton, useMediaQuery } from "@mui/material";
import { useInstallation } from "../../contexts/InstallationContext";
import { useStore } from "../../contexts/storecontexts";

import ManagementListShell from "../../components/Modals/Common/ManagementListShell";
import ActionButtons from "../../components/Modals/Common/ActionButtons";

const DataCenterList = () => {
  const dispatch = useDispatch();
  const { DataCenters, loading, error } = useSelector((state) => state.DataCenter);
  const { selectedDataCenter, setSelectedDataCenter } = useInstallation();
  const { user } = useStore(); // get current user to decide fetch behavior

  const isLoading = loading?.fetch;

  const [DeleteOpen, setDeleteOpen] = useState(false);
  const [EditOpen, setEditOpen] = useState(false);
  const [dataCenterName, setDataCenterName] = useState("");
  const [dataCenterId, setDataCenterId] = useState(null);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width:768px)");
  const isMobile = !isDesktop;

  // local copy of datacenters list
  const dataCenters = Array.isArray(DataCenters) ? DataCenters : [];

  // ----- fetch datacenters depending on role -----
  useEffect(() => {
    if (!user) return;
    if (user.role === "admin") {
      dispatch(fetchAllDataCenters());
    } else {
      dispatch(fetchDataCentersByUser(user._id));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (error?.fetch) console.error("DataCenter error:", error.fetch);
  }, [error]);

  const handleDeleteOpen = (name, id) => {
    setDeleteOpen(true);
    setDataCenterName(name);
    setDataCenterId(id);
  };
  const handleDeleteClose = () => {
    setDeleteOpen(false);
    setDataCenterId(null);
    setDataCenterName("");
  };
  const handleEditOpen = (name, id) => {
    setEditOpen(true);
    setDataCenterId(id);
    setDataCenterName(name);
  };
  const handleEditClose = () => {
    setEditOpen(false);
    setDataCenterId(null);
    setDataCenterName("");
  };

  // SAFE handlers: validate id before dispatching
  const handleDelete = async (id) => {
    if (!id || typeof id !== "string") {
      console.error("Invalid DataCenter ID for delete:", id);
      return Swal.fire("Error", "Invalid Data Center ID", "error");
    }

    try {
      await dispatch(deleteDataCenter(id)).unwrap();
      Swal.fire({ icon: "success", title: "Deleted", text: "Data Center deleted." });
      handleDeleteClose();
    } catch (err) {
      console.error("Delete error:", err);
      Swal.fire({ icon: "error", title: "Delete failed", text: String(err) || "Something went wrong" });
    }
  };

  const handleEdit = async (orgId, newName) => {
    if (!orgId || typeof orgId !== "string") {
      console.error("Invalid DataCenter ID for update:", orgId);
      return Swal.fire("Error", "Invalid Data Center ID", "error");
    }

    try {
      await dispatch(updateDataCenter({ id: orgId, name: newName })).unwrap();
      Swal.fire({ icon: "success", title: "Updated", text: "Data Center updated." });
      handleEditClose();
    } catch (err) {
      console.error("Update error:", err);
      Swal.fire({ icon: "error", title: "Update failed", text: String(err) || "Something went wrong" });
    }
  };

  /**
   * getIdForRole
   *
   * Return the id string to use for keys/actions depending on current user role:
   * - admin: prefer top-level _id (full datacenter objects)
   * - non-admin: prefer nested dataCenterId (string or object._id)
   *
   * This ensures actions (edit/delete) send the datacenter's true id for managers/users
   * and uses the admin object's _id for admins.
   */
  const getIdForRole = (item) => {
    if (!item) return null;

    // Admin should act on top-level datacenter objects (they fetch full datacenters)
    if (user?.role === "admin") {
      // If provided an assignment-like entry accidentally, fallback to nested id
      if (item._id) return String(item._id);
      if (item.dataCenterId) {
        if (typeof item.dataCenterId === "string") return String(item.dataCenterId);
        if (typeof item.dataCenterId === "object" && item.dataCenterId._id) return String(item.dataCenterId._id);
      }
      return null;
    }

    // Non-admins: prefer dataCenterId (they receive assignment-like entries)
    if (item.dataCenterId) {
      if (typeof item.dataCenterId === "string") return String(item.dataCenterId);
      if (typeof item.dataCenterId === "object" && item.dataCenterId._id) return String(item.dataCenterId._id);
    }
    // fallback to top-level _id if nested not present
    if (item._id) return String(item._id);
    return null;
  };

  /**
   * getDisplayName - prefer nested name for assigned entries, otherwise top-level name
   */
  const getDisplayName = (item, index) => item?.dataCenterId?.name ?? item?.name ?? `Data Center ${index + 1}`;

  /* ==================== NEW NORMALIZATION HELPERS ==================== */
  // helper: get real datacenter id from any shape
  const getRealDcIdFrom = (entry) => {
    if (!entry) return null;
    if (typeof entry === "string") return entry;
    // assignment shape: dataCenterId may be string or object
    if (entry.dataCenterId) {
      if (typeof entry.dataCenterId === "string") return entry.dataCenterId;
      if (typeof entry.dataCenterId === "object") return entry.dataCenterId._id || null;
    }
    // admin/full datacenter object
    return entry._id || null;
  };

  // helper: best-effort name
  const getRealDcNameFrom = (entry) => {
    if (!entry) return "";
    // prefer nested name (assignment populated)
    if (entry.dataCenterId && typeof entry.dataCenterId === "object" && entry.dataCenterId.name) {
      return entry.dataCenterId.name;
    }
    // direct name
    if (entry.name) return entry.name;
    // try to look up name in local dataCenters by id
    const id = getRealDcIdFrom(entry);
    const found = dataCenters.find(
      (d) =>
        String(d._id) === String(id) ||
        (d.dataCenterId && (String(d.dataCenterId) === String(id) || String(d.dataCenterId?._id) === String(id)))
    );
    return found?.name || "";
  };

  const createNormalizedDcObject = (entry) => {
    const realId = getRealDcIdFrom(entry);
    if (!realId) return null;
    return {
      // guarantee this _id is the real datacenter id (backend's DC _id)
      _id: String(realId),
      // readable name
      name: getRealDcNameFrom(entry),
      // keep original for any legacy consumer that needs it
      _raw: entry,
      // if the selected row was an assignment record keep assignment id
      assignmentId: typeof entry === "object" && entry._id && entry.dataCenterId ? String(entry._id) : null,
    };
  };

  // When user clicks a row -> store a NORMALIZED datacenter object (so other pages see real ._id and name)
  const handleRowClick = (datacenter, e) => {
    e?.stopPropagation();

    // normalize and always store an object whose _id is the real datacenter id
    const normalized = createNormalizedDcObject(datacenter);

    if (!normalized) {
      // fallback: keep original item (defensive)
      console.warn("Failed to normalize datacenter selection, storing raw item:", datacenter);
      setSelectedDataCenter(datacenter);
    } else {
      setSelectedDataCenter(normalized);
    }

    if (isMobile) setDrawerOpen(false);
  };

  // Simplify selected effective id: with normalization selectedDataCenter._id will be real DC id.
  const selectedEffId = selectedDataCenter
    ? String(getRealDcIdFrom(selectedDataCenter) || selectedDataCenter._id || "")
    : null;

  /* ==================== END NEW HELPERS ==================== */

  // shared markup using ManagementListShell
  const renderListMarkup = () => (
    <div className="relative min-h-0">
      {/* mobile close placed above on small screens */}
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
            <th className="py-2 px-4 font-bold text-gray-800">Data Center Name</th>
            <th className="py-2 px-4  text-center">Actions</th>
          </>
        }
      >
        {isLoading && <TableSkeleton rows={4} />}

        {!isLoading &&
          dataCenters.map((datac, index) => {
            // id used for keys and actions depends on current user's role
            const id = getIdForRole(datac) ?? String(index);
            const displayName = getDisplayName(datac, index);

            return (
              <tr
                key={id}
                className={`border-b border-gray-200 cursor-pointer transition-colors hover:bg-blue-50/60 ${
                  selectedEffId === String(id) ? "bg-blue-50 border-blue-300" : ""
                }`}
                onClick={(e) => handleRowClick(datac, e)}
              >
                <td className="py-2 sm:py-3 px-2 sm:px-4">{displayName}</td>

                <td className="py-2 sm:py-3 px-2 sm:px-4 text-center">
                  <ActionButtons
                    item={datac}
                    onEdit={(item) => {
                      const eff = getIdForRole(item);
                      if (!eff) return Swal.fire("Error", "Invalid Data Center ID", "error");
                      handleEditOpen(item?.dataCenterId?.name ?? item.name, eff);
                    }}
                    onDelete={(item) => {
                      const eff = getIdForRole(item);
                      if (!eff) return Swal.fire("Error", "Invalid Data Center ID", "error");
                      handleDeleteOpen(item?.dataCenterId?.name ?? item.name, eff);
                    }}
                  />
                </td>
              </tr>
            );
          })}

        {!isLoading && dataCenters.length === 0 && (
          <tr>
            <td colSpan={2} className="p-4 text-center text-gray-500">
              No Data Centers found.
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
            <h1 className="organization-list-title font-semibold text-gray-800">Data Center Management</h1>
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

      {DeleteOpen && (
        <DeleteModal
          open={DeleteOpen}
          handleClose={handleDeleteClose}
          handleDelete={() => handleDelete(dataCenterId)}
          itemId={dataCenterId}
          itemName={dataCenterName}
          itemLabel="Data Center"
        />
      )}

      {EditOpen && (
        <OrganizationEditModal
          open={EditOpen}
          handleClose={handleEditClose}
          handleEdit={(id, name) => handleEdit(id, name)}
          organizationId={dataCenterId}
          organizationName={dataCenterName}
        />
      )}
    </>
  );
};

export default DataCenterList;
