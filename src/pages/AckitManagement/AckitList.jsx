// // src/pages/AckitManagement/AckitList.jsx
// import { Pencil, Trash } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Swal from "sweetalert2";
// import { fetchAllAckits, deleteAckit } from "../../slices/ackitSlice";
// import DeleteModal from "../../components/Modals/common/DeleteModal";
// import AckitEditModal from "../../components/Modals/Common/AcKitManagement/AckitEditModal";
// import "../../styles/pages/management-pages.css";
// import TableSkeleton from "../../components/skeletons/TableSkeleton";

// export default function AckitList({ selectedAcKit, onAckitSelect }) {
//   const dispatch = useDispatch();
//   const { ackits = [], loading = {}, error } = useSelector((s) => s.ackit || {});
//   const [editOpen, setEditOpen] = useState(false);
//   const [selected, setSelected] = useState(null);
//   const [deleteOpen, setDeleteOpen] = useState(false);
//   const [toDelete, setToDelete] = useState(null);

//   useEffect(() => {
//     dispatch(fetchAllAckits());
//   }, [dispatch]);

//   useEffect(() => {
//     if (error) console.error("Ackit error:", error);
//   }, [error]);

//   const handleDelete = async (id) => {
//     try {
//       await dispatch(deleteAckit(id)).unwrap();
//       Swal.fire({ icon: "success", title: "Deleted", text: "AC Kit deleted", timer: 1500, showConfirmButton: false });
//       setDeleteOpen(false);
//       setToDelete(null);
//     } catch (err) {
//       Swal.fire("Error", err || "Unable to delete", "error");
//     }
//   };


//   const handleRowClick = (ackit, e) => {
//   if (e) e.stopPropagation();
//   onAckitSelect?.(ackit);
// };

//   return (
//     <div className="ListPage bg-white rounded-xl shadow-sm w-full h-full border border-[#E5E7EB] p-5">
//       <h1 className="organization-list-title font-semibold text-gray-800 mb-4">AC Kit Management</h1>

//       <div className="overflow-x-auto">
//         <table className="w-full table-auto text-left">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="organization-table-header py-2 px-4 font-bold text-gray-800">Name</th>
//               <th className="organization-table-header py-2 px-4 text-center">Condition</th>
//               <th className="organization-table-header py-2 px-4 text-center">Actions</th>
//             </tr>
//           </thead>
//         </table>

//         <div className="organization-table-scroll overflow-y-auto pr-1 h-[60vh]">
//           <table className="w-full table-auto text-left">
//             <tbody>
//               {loading.fetch && <TableSkeleton rows={6} />}

//               {!loading.fetch &&
//                 ackits.map((a) => {
//                   const id = a._id;
//                   const cond = a.condition || {};
//                   const condText = `${cond.type || "?"} ${cond.operator || "?"} ${cond.value ?? "?"}`;

//                   return (
//                     <tr key={id} 
//                     // className="border-b border-gray-200 hover:bg-blue-50/60"
//                      className={`border-b cursor-pointer transition-colors hover:bg-blue-50/60 ${
//                       selectedAcKit?._id === id
//                         ? "bg-blue-50 border-blue-300"
//                         : ""
//                     }`}
//                     onClick={(e) =>
//                        handleRowClick(a, e)
//                       }
//                     >
//                       <td className="organization-table-cell py-3 px-4">{a.name}</td>
//                       <td className="organization-table-cell py-3 px-4 text-center">{condText}</td>
//                       <td className="organization-table-cell py-3 px-4 text-center">
//                         <div className="flex justify-center gap-3">
//                           <button
//                             className="organization-action-btn rounded-full border border-green-500/50 p-[6px] bg-white"
//                             onClick={() => {
//                               setSelected(a);
//                               setEditOpen(true);
//                             }}
//                           >
//                             <Pencil className="text-green-600" size={16} />
//                           </button>

//                           <button
//                             className="organization-action-btn rounded-full border border-red-500/50 p-[6px] bg-white"
//                             onClick={() => {
//                               setToDelete(a);
//                               setDeleteOpen(true);
//                             }}
//                           >
//                             <Trash className="text-red-600" size={16} />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })}

//               {!loading.fetch && ackits.length === 0 && (
//                 <tr>
//                   <td colSpan={3} className="p-4 text-center text-gray-500">
//                     No AC Kits found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <AckitEditModal open={editOpen} handleClose={() => setEditOpen(false)} ackit={selected} />
  
//       <DeleteModal
//         open={deleteOpen}
//         handleClose={() => {
//           setDeleteOpen(false);
//           setToDelete(null);
//         }}
//         handleDelete={handleDelete}
//         itemId={toDelete?._id}
//         itemName={toDelete?.name}
//         itemLabel="AC Kit"
//       />
//     </div>
//   );
// }










// src/pages/AckitManagement/AckitList.jsx
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import { fetchAllAckits, deleteAckit } from "../../slices/ackitSlice";
import DeleteModal from "../../components/Modals/common/DeleteModal";
import AckitEditModal from "../../components/Modals/Common/AcKitManagement/AckitEditModal";

import "../../styles/pages/management-pages.css";
import TableSkeleton from "../../components/skeletons/TableSkeleton";
import CloseIcon from "@mui/icons-material/Close";
import { Drawer, IconButton, useMediaQuery } from "@mui/material";
import { useInstallation } from "../../contexts/InstallationContext";
import ManagementListShell from "../../components/Modals/Common/ManagementListShell";
import ActionButtons from "../../components/Modals/Common/ActionButtons";

export default function AckitList() {
  const dispatch = useDispatch();
  const { ackits = [], loading = {}, error } = useSelector((s) => s.ackit || {});
  const isLoading = loading?.fetch;

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editingAckit, setEditingAckit] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  const isDesktop = useMediaQuery("(min-width:768px)");
  const isMobile = !isDesktop;

  const { selectedAcKit, setSelectedAcKit } = useInstallation();

  useEffect(() => {
    dispatch(fetchAllAckits());
  }, [dispatch]);

  useEffect(() => {
    if (error) console.error("Ackit error:", error);
  }, [error]);

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteAckit(id)).unwrap();
      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "AC Kit deleted",
        timer: 1500,
        showConfirmButton: false,
      });
      setDeleteOpen(false);
      setToDelete(null);
    } catch (err) {
      Swal.fire("Error", err || "Unable to delete", "error");
    }
  };

  // const handleRowClick = (ackit, e) => {
  //   e?.stopPropagation();
  //   onAckitSelect?.(ackit);
  //   if (isMobile) setDrawerOpen(false);
  // };

  const handleRowClick = (ackit, e) => {
  e?.stopPropagation();
  setSelectedAcKit(ackit);   // 🔥 THIS WAS MISSING
  if (isMobile) setDrawerOpen(false);
};


  const renderListMarkup = () => (
    <div className="relative min-h-0">
      {/* mobile close */}
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
            <th className="py-2 px-4 font-bold text-gray-800">Name</th>
            <th className="py-2 px-4 text-center">Condition</th>
            <th className="py-2 px-4 w-[120px] text-center">Actions</th>
          </>
        }
      >
        {isLoading && (
          <tr>
            <td colSpan={3} className="p-4">
              <TableSkeleton rows={5} />
            </td>
          </tr>
        )}

        {!isLoading &&
          ackits.map((a, index) => {
            const id = a._id ?? index;
            const cond = a.condition || {};
            const condText = `${cond.type || "?"} ${cond.operator || "?"} ${cond.value ?? "?"}`;

            return (
              <tr
                key={id}
                className={`border-b border-gray-200 cursor-pointer transition-colors hover:bg-blue-50/60 ${
                  selectedAcKit?._id === id ? "bg-blue-50 border-blue-300" : ""
                }`}
                onClick={(e) => handleRowClick(a, e)}
              >
                <td className="py-2 sm:py-3 px-2 sm:px-4">{a.name}</td>
                <td className="py-2 sm:py-3 px-2 sm:px-4 text-center">{condText}</td>
                <td className="py-2 sm:py-3 px-2 sm:px-4 text-center">
                  <ActionButtons
                    item={a}
                    onEdit={(item) => {
                      setEditingAckit(item);
                      setEditOpen(true);
                    }}
                    onDelete={(item) => {
                      setToDelete(item);
                      setDeleteOpen(true);
                    }}
                  />
                </td>
              </tr>
            );
          })}

        {!isLoading && ackits.length === 0 && (
          <tr>
            <td colSpan={3} className="p-4 text-center text-gray-500">
              No AC Kits found.
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
            <h1 className="organization-list-title font-semibold text-gray-800">
              AC Kit Management
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

      {/* Edit */}
      {editOpen && (
        <AckitEditModal
          open={editOpen}
          ackit={editingAckit}
          handleClose={() => {
            setEditOpen(false);
            setEditingAckit(null);
          }}
        />
      )}

      {/* Delete */}
      {deleteOpen && (
        <DeleteModal
          open={deleteOpen}
          handleClose={() => {
            setDeleteOpen(false);
            setToDelete(null);
          }}
          handleDelete={() => handleDelete(toDelete?._id)}
          itemId={toDelete?._id}
          itemName={toDelete?.name}
          itemLabel="AC Kit"
        />
      )}
    </>
  );
}
