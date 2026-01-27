// // src/components/Modals/UserManagement/EditModal.jsx
// import * as React from "react";
// import {
//   Box,
//   Button,
//   Typography,
//   Modal,
//   Stack,
//   MenuItem,
//   TextField,
//   useMediaQuery,
//   useTheme,
// } from "@mui/material";
// import { Lock, Mail, User2 } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import InputField from "../../Inputs/InputField";
// import PasswordField from "../../Inputs/PasswordField";
// import Swal from "sweetalert2";
// import {
//   fetchAllManagers,
//   UpdateManager,
//   setManagerEditModalOpen,
// } from "../../../slices/ManagerSlice";
// import { fetchAllOrganizations } from "../../../slices/OrganizationSlice";
// import { useStore } from "../../../contexts/storecontexts";
// import { useNavigate } from "react-router";
// import './EditModalStyle.css'
// import { fetchAllVenues } from "../../../slices/VenueSlice";


// export default function UserEditModal({ handleClose, id }) {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { User } = useStore();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const { ManagerEditModalOpen, Managers, isLoading } = useSelector(
//     (s) => s.Manager || {}
//   );
//   const { Organizations = [] } = useSelector(
//     (s) => s.Organization || {}
//   );

//   const [formData, setFormData] = React.useState({
//     id: null,
//     name: "",
//     current_email: "",
//     updated_email: "",
//     updated_password: "",
//     organizationId: "",
//   });

//   React.useEffect(() => {
//     dispatch(fetchAllOrganizations());
//   }, [dispatch]);

//   React.useEffect(() => {
//     if (!ManagerEditModalOpen || !id) return;
//     const mgr = (Managers || []).find((m) => String(m._id) === String(id));
//     if (mgr) {
//       const orgId =
//         mgr.organization && typeof mgr.organization === "object"
//           ? mgr.organization._id || mgr.organization.id
//           : mgr.organization || "";

//       setFormData({
//         id: mgr._id,
//         name: mgr.name || "",
//         current_email: mgr.email || "",
//         updated_email: "",
//         updated_password: "",
//         organizationId: orgId,
//       });
//     } else {
//       dispatch(fetchAllManagers()).catch(() => {});
//     }
//   }, [ManagerEditModalOpen, id, Managers, dispatch]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((p) => ({ ...p, [name]: value }));
//   };

//   const closeModal = () => {
//     dispatch(setManagerEditModalOpen(false));
//     handleClose && handleClose();
//   };

//   const handleUpdate = async () => {
//     if (!formData.name || !formData.organizationId) {
//       return Swal.fire({
//         icon: "warning",
//         title: "Missing fields",
//         text: "Name and Organization are required.",
//       });
//     }

//     try {
//       const payload = {
//         id: formData.id,
//         name: formData.name,
//         email: formData.updated_email !== "" ? formData.updated_email : undefined,
//         password:
//           formData.updated_password && formData.updated_password.length > 0
//             ? formData.updated_password
//             : undefined,
//         organization: formData.organizationId,
//       };

//       const updated = await dispatch(UpdateManager(payload)).unwrap();

//       Swal.fire({
//         icon: "success",
//         title: "Updated",
//         text: "User updated successfully.",
//       });

//       closeModal();

//       if (User && (String(User._id) === String(updated._id) || User.email === formData.current_email)) {
//         navigate("/logout");
//         return;
//       }
//     } catch (err) {
//       Swal.fire({
//         icon: "error",
//         title: "Update failed",
//         text: err || "Failed to update user",
//         customClass: { container: "swal2-topmost" },
//       });
//     }
//   };

//   const modalStyle = {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     width: isMobile ? "90%" : 500,
//     maxWidth: 500,
//     bgcolor: "background.paper",
//     borderRadius: "8px",
//     boxShadow: 24,
//     p: 4,
//   };

//   return (
//     <Modal
//       open={!!ManagerEditModalOpen}
//       onClose={closeModal}
//     >
//       <Box sx={modalStyle}>
//         <Typography variant="h6" fontWeight="bold" mb={2}>
//           Edit User
//         </Typography>
//     <Stack spacing={2}>
//         <InputField
//           label="Current Email"
//           id="Current_Email"
//           name="current_email"
//           type="email"
//           value={formData.current_email}
//           disabled={true}
//           placeholder="Current Email"
//           icon={<Mail size={18} className="text-gray-400" />}
//         />

//         <InputField
//           label="Name"
//           id="name"
//           name="name"
//           type="text"
//           value={formData.name}
//           onchange={handleChange}
//           placeholder="Full name"
//           icon={<User2 size={18} className="text-gray-400" />}
//         />

//         <InputField
//           label="Updated Email (optional)"
//           id="Updated_Email"
//           name="updated_email"
//           type="email"
//           value={formData.updated_email}
//           onchange={handleChange}
//           placeholder="Enter updated email (leave blank to keep)"
//           icon={<Mail size={18} className="text-gray-400" />}
//         />

//         <PasswordField
//           label="New Password (optional)"
//           id="password"
//           name="updated_password"
//           value={formData.updated_password}
//           onchange={handleChange}
//           placeholder="Enter new password (leave blank to keep)"
//           icon={<Lock size={18} className="text-gray-400"/>}
//         />

//              {
//             role === "admin" ? 
//             <>    <TextField
//           select
//           fullWidth
//           label="Organization"
//           name="organizationId"
//           value={formData.organizationId || ""}
//           onChange={handleChange}
//           sx={{ mt: 2 }}
//         >
     
//           <MenuItem value="">Select Organization</MenuItem>
//           {(Organizations || []).map((org) => (
//             <MenuItem key={org._id || org.id} value={org._id || org.id}>
//               {org.name}
//             </MenuItem>
//           ))}
//         </TextField></> : <>
      
//         </>
//           }
    
//         </Stack>

//         <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3}>
//           <Button onClick={closeModal} variant="outlined" disabled={isLoading}>
//             Cancel
//           </Button>
//           <Button onClick={handleUpdate} variant="contained" color="primary" disabled={isLoading}>
//             {isLoading ? "Updating..." : "Update"}
//           </Button>
//         </Stack>
//       </Box>
//     </Modal>
//   );
// }








// import * as React from "react";
// import {
//   Box,
//   Button,
//   Typography,
//   Modal,
//   Stack,
//   MenuItem,
//   TextField,
//   useMediaQuery,
//   useTheme,
//   Autocomplete,
//   Chip,
// } from "@mui/material";
// import { Lock, Mail, Timer, User2 } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import InputField from "../../Inputs/InputField";
// import PasswordField from "../../Inputs/PasswordField";
// import Swal from "sweetalert2";
// import {
//   fetchAllManagers,
//   UpdateManager,
//   setManagerEditModalOpen,
// } from "../../../slices/ManagerSlice";
// import { fetchAllOrganizations } from "../../../slices/OrganizationSlice";
// import { fetchAllVenues, fetchVenuesByOrganization } from "../../../slices/VenueSlice"; // ensure this thunk exists and is exported
// import { useStore } from "../../../contexts/storecontexts";
// import { useNavigate } from "react-router";
// import './EditModalStyle.css'

// export default function UserEditModal({ handleClose, id }) {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user } = useStore();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//   const [timer, setTimer] = React.useState("");
//   const [timerError, setTimerError] = React.useState("");

//   const { ManagerEditModalOpen, Managers, isLoading } = useSelector(
//     (s) => s.Manager || {}
//   );
//   const { Organizations = [] } = useSelector((s) => s.Organization || {});
//   // const { Venues = [], loading: venuesLoading,  } = useSelector((s) => s.Venue || {});

//   const { Venues = [], loading: venuesLoading, venuesByOrg = {} } = useSelector((s) => s.Venue || {});


//   const [formData, setFormData] = React.useState({
//     id: null,
//     name: "",
//     current_email: "",
//     updated_email: "",
//     updated_password: "",
//     organizationId: "",
//     role: "",
//     createdBy: "",
//   });

//   // selected venue objects for Autocomplete
//   const [selectedVenues, setSelectedVenues] = React.useState([]);

//   React.useEffect(() => {
//     dispatch(fetchAllOrganizations());
//     // load all venues for selection (so user can pick any venue)
//   }, [dispatch]);

//   React.useEffect(() => {
//   if (!ManagerEditModalOpen || !id) return;

//   const mgr = (Managers || []).find((m) => String(m._id) === String(id));
//   if (mgr) {


//     console.log("mgr>>", mgr)
//     const orgId =
//       mgr.organization && typeof mgr.organization === "object"
//         ? mgr.organization._id || mgr.organization.id
//         : mgr.organization || "";

//       if (user?.role === "admin") {
//         setTimer(mgr.timer || ""); // mgr.timer can be null
//       }
    
//       setFormData({
//       id: mgr._id,
//       name: mgr.name || "",
//       current_email: mgr.email || "",
//       updated_email: "",
//       updated_password: "",
//       organizationId: orgId,
//       role: mgr.role || "",
//       createdBy: mgr.createdBy || "",
//     });

//     if (orgId) {
//       dispatch(fetchVenuesByOrganization(orgId)).catch(() => {});
//     }

//     // Pre-select assigned venues properly
//     if (Array.isArray(mgr.venues) && mgr.venues.length > 0) {
//       setSelectedVenues(mgr.venues.map((v) => ({
//         _id: v.venueId || v._id || v.id,
//         name: v.venueName || v.name || v.title,
//       })));
//     } else {
//       setSelectedVenues([]);
//     }
//   }
// }, [ManagerEditModalOpen, id, Managers, dispatch]);

// const validateTimer = (value) => {
//   if (!value || typeof value !== "string") return { valid: false, message: "Timer required" };
//   const re = /^(?:[1-9]|[1-5][0-9]|60)(s|m)$/;
//   const match = value.trim().match(re);
//   if (!match) return { valid: false, message: "Use 1–60s or 1–60m" };
//   return { valid: true };
// };


// const handleTimerChange = (e) => {
//   const val = e.target.value;
//   setTimer(val);

//   if (!val) {
//     setTimerError("");
//     return;
//   }

//   const { valid, message } = validateTimer(val);
//   setTimerError(valid ? "" : message);
// };



//    React.useEffect(() => {
//     const orgId = formData.organizationId;
//     if (!orgId) return;

//     const orgVenues = venuesByOrg[orgId] || []; // this will be the array returned by fetchVenuesByOrganization
//     console.log("orgVenues>", orgVenues)
//     if (!Array.isArray(orgVenues)) return;

//     // If selectedVenues currently hold simple {_id: id} objects, replace them with the full option objects from orgVenues
//     // Also handle case where selectedVenues already contains full venue objects
//     if (selectedVenues && selectedVenues.length > 0) {
//       // produce a map for quick lookup
//       const mapById = orgVenues.reduce((acc, v) => {
//         const id = v._id || v.id;
//         acc[id] = { _id: id, name: v.name || v.title || "" , ...v};
//         return acc;
//       }, {});

//       const replaced = selectedVenues
//         .map((sv) => {
//           const id = sv._id || sv.id || sv.venueId;
//           return mapById[id] || (sv.name ? sv : null); // keep if already full object (has name), else null
//         })
//         .filter(Boolean); // remove nulls (assigned venue id might no longer exist in org)

//       // If any replacements were found, update to the real option objects so Autocomplete recognizes them
//       if (replaced.length > 0) {
//         setSelectedVenues(replaced);
//       }
//     }
//   }, [venuesByOrg, formData.organizationId]); // intentionally not including selectedVenues to avoid loop

//    // When admin changes organization selection in the select box, fetch that org's venues
//   const handleOrgChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((p) => ({ ...p, [name]: value }));
//     if (value) dispatch(fetchVenuesByOrganization(value)).catch(() => {});
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((p) => ({ ...p, [name]: value }));
//   };

//   const closeModal = () => {
//     dispatch(setManagerEditModalOpen(false));
//     handleClose && handleClose();
//   };

//   const handleUpdate = async () => {
//     if (!formData.name || !formData.organizationId) {
//       return Swal.fire({
//         icon: "warning",
//         title: "Missing fields",
//         text: "Name and Organization are required.",
//       });
//     }

    
//     // console.log("venuesPayload", venuesPayload)
//     try {
//       // Prepare venues payload - send array  [venueId]
      
//       const venuesPayload =  (user?.role === "user") ? (selectedVenues || []).map((v) => (v._id || v.id)) : [];
      

     
//       const payload = {
//         id: formData.id,
//         name: formData.name,
//         email: formData.updated_email !== "" ? formData.updated_email : undefined,
//         password:
//           formData.updated_password && formData.updated_password.length > 0
//             ? formData.updated_password
//             : undefined,
//         organization: formData.organizationId,
//         // include venues only for users (optional), backend should ignore if not applicable
//         venues: venuesPayload,
//       };

//       // add timer if admin and valid
//       if (user?.role === "admin" && timer && !timerError) {
//         payload.timer = timer;
//       }

//       console.log("payload>", payload);
      

      
//       // refresh lists depending on current user's role:
//       if (user && user?.role === "admin") {
//         await dispatch(fetchAllManagers()).unwrap();
//       }
//       const updated = await dispatch(UpdateManager(payload)).unwrap();
      
//       Swal.fire({
//         icon: "success",
//         title: "Updated",
//         text: "User updated successfully.",
//       });

//       closeModal();

//       // if (user && (String(user._id) === String(updated._id) || user.email === formData.current_email)) {
//       //   navigate("/logout");
//       //   return;
//       // }
//     } catch (err) {
//       Swal.fire({
//         icon: "error",
//         title: "Update failed",
//         text: err || "Failed to update user",
//         customClass: { container: "swal2-topmost" },
//       });
//     }
//   };

//   const modalStyle = {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     width: isMobile ? "90%" : 500,
//     maxWidth: 500,
//     bgcolor: "background.paper",
//     borderRadius: "8px",
//     boxShadow: 24,
//     p: 4,
//   };

//   // Determine role to decide which fields to show. Prefer formData.role (populated from manager)
//   const role = user?.role;

//   return (
//     <Modal
//       open={!!ManagerEditModalOpen}
//       onClose={closeModal}
//     >
//       <Box sx={modalStyle}>
//         <Typography variant="h6" fontWeight="bold" mb={2}>
//           Edit User
//         </Typography>
//         <Stack spacing={2}>
//           <InputField
//             label="Current Email"
//             id="Current_Email"
//             name="current_email"
//             type="email"
//             value={formData.current_email}
//             disabled={true}
//             placeholder="Current Email"
//             icon={<Mail size={18} className="text-gray-400" />}
//           />

//           <InputField
//             label="Name"
//             id="name"
//             name="name"
//             type="text"
//             value={formData.name}
//             onchange={handleChange}
//             placeholder="Full name"
//             icon={<User2 size={18} className="text-gray-400" />}
//           />

//           <InputField
//             label="Updated Email (optional)"
//             id="Updated_Email"
//             name="updated_email"
//             type="email"
//             value={formData.updated_email}
//             onchange={handleChange}
//             placeholder="Enter updated email (leave blank to keep)"
//             icon={<Mail size={18} className="text-gray-400" />}
//           />

//           <PasswordField
//             label="New Password (optional)"
//             id="password"
//             name="updated_password"
//             value={formData.updated_password}
//             onchange={handleChange}
//             placeholder="Enter new password (leave blank to keep)"
//             icon={<Lock size={18} className="text-gray-400"/>}
//           />

//            {
//           role === "admin" ? (
    
//               <>
//                 <TextField
//                   select
//                   fullWidth
//                   label="Organization"
//                   name="organizationId"
//                   value={formData.organizationId || ""}
//                   onChange={handleOrgChange} // <--- use handler to fetch venues on change
//                   sx={{ mt: 2 }}
//                 >
//                   <MenuItem value="">Select Organization</MenuItem>
//                   {(Organizations || []).map((org) => (
//                     <MenuItem key={org._id || org.id} value={org._id || org.id}>
//                       {org.name}
//                     </MenuItem>
//                   ))}
//                 </TextField>

//                 <InputField
//                   type="text"
//                   name="timer"
//                   label="Timer"
//                   placeholder="eg: 1s or 1m"
//                   value={timer}
//                   onchange={handleTimerChange}
//                   icon={<Timer />}
//                 />
//     {timerError && <p className="mt-1 text-sm text-red-600">{timerError}</p>}
//             </>
//           ) : (
//             role === "user" && (
//               <Autocomplete
//                 multiple
//                 disableCloseOnSelect
//                 // options: prefer cached org-specific venues; fall back to top-level Venues if needed
//                 options={
//                   (venuesByOrg[formData.organizationId] && venuesByOrg[formData.organizationId].map(v => ({ _id: v._id || v.id, name: v.name || v.title, ...v })))
//                   || (Venues || []).map((v) => ({ _id: v._id || v.id, name: v.name || v.title, ...v }))
//                 }
//                 getOptionLabel={(option) => option.name || ""}
//                 // ensure matching compares by _id (this is critical)
//                 isOptionEqualToValue={(option, value) => String(option._id) === String(value._id)}
//                 value={selectedVenues}
//                 onChange={(e, newValue) => {
//                   setSelectedVenues(newValue || []);
//                 }}
              
//                 renderInput={(params) => (
//                   <TextField
//                     {...params}
//                     label="Assigned Venues"
//                     placeholder="Select venues"
//                   />
//                 )}
//               />
//             )
//           )
//         }

//         </Stack>

//         <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3}>
//           <Button onClick={closeModal} variant="outlined" disabled={isLoading}>
//             Cancel
//           </Button>
//           <Button onClick={handleUpdate} variant="contained" color="primary" disabled={isLoading}>
//             {isLoading ? "Updating..." : "Update"}
//           </Button>
//         </Stack>
//       </Box>
//     </Modal>
//   );
// }












// // src/components/Modals/UserManagement/EditModal.jsx
// import * as React from "react";
// import {
//   Box,
//   Button,
//   Typography,
//   Modal,
//   Stack,
//   MenuItem,
//   TextField,
//   useMediaQuery,
//   useTheme,
//   Autocomplete,
//   Chip,
// } from "@mui/material";
// import { Lock, Mail, Timer, User2 } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import InputField from "../../Inputs/InputField";
// import PasswordField from "../../Inputs/PasswordField";
// import Swal from "sweetalert2";
// import { fetchAllUsers, fetchUsersByCreator, updateUser } from "../../../slices/UserSlice";
// import { fetchAllDataCenters, fetchDataCentersByUser } from "../../../slices/DataCenterSlice";
// import { useStore } from "../../../contexts/storecontexts";

// export default function UserEditModal({ open, handleClose, user, onSaved }) {
//   const dispatch = useDispatch();
//   const { user: currentUser, getToken } = useStore();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const { list: users = [], loading } = useSelector((s) => s.User || {});
//   const { DataCenters = [], loading: dcLoading } = useSelector((s) => s.DataCenter || {});

//   const [formData, setFormData] = React.useState({
//     id: null,
//     name: "",
//     current_email: "",
//     updated_email: "",
//     updated_password: "",
//     role: "",
//   });

//   const [selectedDataCenters, setSelectedDataCenters] = React.useState([]); // array of { _id, name }
//   const [timer, setTimer] = React.useState("");
//   const [timerError, setTimerError] = React.useState("");

//   // load data centers options depending on role
//   React.useEffect(() => {
//     if (!currentUser) return;
//     if (currentUser.role === "admin") {
//       dispatch(fetchAllDataCenters());
//     } else if (currentUser.role === "manager") {
//       // manager can only assign from his own DCs
//       dispatch(fetchDataCentersByUser(currentUser._id));
//     }
//   }, [currentUser, dispatch]);

  
//   // when modal opens or id changes, populate form from store's user list
//   React.useEffect(() => {
//     if (!open || !user) {
//       // clear
//       setFormData({
//         id: null,
//         name: "",
//         current_email: "",
//         updated_email: "",
//         updated_password: "",
//         role: "",
//       });
//       setSelectedDataCenters([]);
//       setTimer("");
//       setTimerError("");
//       return;
//     }

//     // const target = (users || []).find((u) => String(u._id) === String(id));


//     if (!user) return;

//     setFormData({
//       id: user._id,
//       name: user.name || "",
//       current_email: user.email || "",
//       updated_email: "",
//       updated_password: "",
//       role: user.role || "",
//     });

//     if (currentUser?.role === "admin") {
//       setTimer(user.timer || "");
//     }

//     // populate selectedDataCenters from target.dataCenters which is populated by backend as:
//     // target.dataCenters = [{ dataCenterId: { _id, name }, name }, ...] (based on your controller)
//     const assigned = Array.isArray(target.dataCenters)
//       ? target.dataCenters.map((dc) => {
//           const maybe = dc.dataCenterId || dc; // handle both shapes
//           return { _id: maybe._id || maybe.id || maybe, name: maybe.name || dc.name || "" };
//         })
//       : [];
//     setSelectedDataCenters(assigned);
//   }, [open, user, users, currentUser]);

//   const validateTimer = (value) => {
//     if (!value || typeof value !== "string") return { valid: false, message: "Timer required" };
//     const re = /^(?:[1-9]|[1-5][0-9]|60)(s|m)$/;
//     const match = value.trim().match(re);
//     if (!match) return { valid: false, message: "Use 1–60s or 1–60m" };
//     return { valid: true };
//   };

//   const handleTimerChange = (e) => {
//     const val = e.target.value;
//     setTimer(val);
//     if (!val) {
//       setTimerError("");
//       return;
//     }
//     const { valid, message } = validateTimer(val);
//     setTimerError(valid ? "" : message);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((p) => ({ ...p, [name]: value }));
//   };

//   const closeModal = () => {
//     handleClose && handleClose();
//   };

//   // manager helpers: add/remove datacenters via endpoints
//   const addDataCenterToUser = async (userId, dcId, token) => {
//     const res = await fetch(`${import.meta.env.VITE_BACKEND_API || "http://localhost:5050"}/users/${userId}/add-datacenter`, {
//       method: "POST",
//       credentials: "include",
//       headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//       body: JSON.stringify({ dataCenterId: dcId }),
//     });
//     if (!res.ok) {
//       const d = await res.json().catch(() => ({}));
//       throw new Error(d.message || "Failed to add datacenter");
//     }
//     return res.json();
//   };

//   const removeDataCenterFromUser = async (userId, dcId, token) => {
//     const res = await fetch(`${import.meta.env.VITE_BACKEND_API || "http://localhost:5050"}/users/${userId}/delete/${dcId}`, {
//       method: "DELETE",
//       credentials: "include",
//       headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//     });
//     if (!res.ok) {
//       const d = await res.json().catch(() => ({}));
//       throw new Error(d.message || "Failed to remove datacenter");
//     }
//     return res.json();
//   };

//   const handleUpdate = async () => {
//     // validations
//     if (!formData.name) {
//       return Swal.fire({ icon: "warning", title: "Missing fields", text: "Name is required" });
//     }

//     try {
//       // ADMIN path -> can call updateUser (PUT /users/update/:id) to update name/email/password and dataCenters in validated shape
//       if (currentUser?.role === "admin") {
//         const payload = {
//           name: formData.name,
//         };
//         if (formData.updated_email && formData.updated_email.trim() !== "") payload.email = formData.updated_email.trim();
//         if (formData.updated_password && formData.updated_password.length > 0) payload.password = formData.updated_password;
//         if (Array.isArray(selectedDataCenters) && selectedDataCenters.length > 0) {
//           // backend expects array of objects with dataCenterId
//           payload.dataCenters = selectedDataCenters.map((d) => ({ dataCenterId: d._id }));
//         } else {
//           payload.dataCenters = [];
//         }
//         if (timer && !timerError) payload.timer = timer;

//         // call updateUser thunk
//         await dispatch(updateUser({ id: formData.id, payload })).unwrap();

//         Swal.fire({ icon: "success", title: "Updated", text: "User updated successfully." });

//         // refresh lists
//         dispatch(fetchAllUsers());
//         onSaved && onSaved();
//         closeModal();
//         return;
//       }

//       // MANAGER path -> adminOnly update endpoint is not available for managers.
//       // Managers can add/remove datacenters for their users via add/remove endpoints.
//       if (currentUser?.role === "manager") {
//         // need the 'target' from store to compute diff
//         // const target = (users || []).find((u) => String(u._id) === String(formData.id));


//         if (!target) {
//           throw new Error("Target user not found in store");
//         }

//         // normalize current assigned ids
//         const originalIds = Array.isArray(target.dataCenters)
//           ? target.dataCenters.map((dc) => String((dc.dataCenterId && (dc.dataCenterId._id || dc.dataCenterId)) || (dc._id || dc)))
//           : [];

//         const requestedIds = Array.isArray(selectedDataCenters) ? selectedDataCenters.map((d) => String(d._id)) : [];

//         const toAdd = requestedIds.filter((id) => !originalIds.includes(id));
//         const toRemove = originalIds.filter((id) => !requestedIds.includes(id));

//         const token = getToken ? getToken() : localStorage.getItem("token");
//         // perform adds
//         for (const dcId of toAdd) {
//           await addDataCenterToUser(formData.id, dcId, token);
//         }
//         // perform removes
//         for (const dcId of toRemove) {
//           await removeDataCenterFromUser(formData.id, dcId, token);
//         }

//         // Optionally managers may update name via a different endpoint — but backend has update route adminOnly.
//         // So we only change dataCenters as manager. If you want managers to change name/email, backend must allow it.
//         Swal.fire({ icon: "success", title: "Updated", text: "User data centers updated." });

//         // refresh users for this manager
//         dispatch(fetchUsersByCreator(currentUser._id));
//         onSaved && onSaved();
//         closeModal();
//         return;
//       }

//       // other roles: no op
//       Swal.fire({ icon: "warning", title: "No permission", text: "You don't have permission to update this user." });
//     } catch (err) {
//       console.error("Edit error:", err);
//       Swal.fire({ icon: "error", title: "Update failed", text: err?.message || err || "Failed to update user" });
//     }
//   };

//   const modalStyle = {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     width: isMobile ? "92%" : 520,
//     maxWidth: 520,
//     bgcolor: "background.paper",
//     borderRadius: "8px",
//     boxShadow: 24,
//     p: 4,
//   };

//   // options for Autocomplete: show all cached DataCenters (admin) or manager's DCs (DataCenterSlice)
//   const options = (DataCenters || []).map((d) => ({ _id: d._id || d.id, name: d.name || d, ...d }));

//   return (
//     <Modal open={!!open} onClose={closeModal}>
//       <Box sx={modalStyle}>
//         <Typography variant="h6" fontWeight="bold" mb={2}>
//           Edit User
//         </Typography>
//         <Stack spacing={2}>
//           <InputField
//             label="Current Email"
//             id="Current_Email"
//             name="current_email"
//             type="email"
//             value={formData.current_email}
//             disabled={true}
//             placeholder="Current Email"
//             icon={<Mail size={18} className="text-gray-400" />}
//           />

//           <InputField
//             label="Name"
//             id="name"
//             name="name"
//             type="text"
//             value={formData.name}
//             onchange={handleChange}
//             placeholder="Full name"
//             icon={<User2 size={18} className="text-gray-400" />}
//           />

//           <InputField
//             label="Updated Email (optional)"
//             id="Updated_Email"
//             name="updated_email"
//             type="email"
//             value={formData.updated_email}
//             onchange={handleChange}
//             placeholder="Enter updated email (leave blank to keep)"
//             icon={<Mail size={18} className="text-gray-400" />}
//           />

//           <PasswordField
//             label="New Password (optional)"
//             id="password"
//             name="updated_password"
//             value={formData.updated_password}
//             onchange={handleChange}
//             placeholder="Enter new password (leave blank to keep)"
//             icon={<Lock size={18} className="text-gray-400" />}
//           />

//           {/* DataCenters selector (both admin and manager) */}
//           <Autocomplete
//             multiple
//             options={options}
//             getOptionLabel={(opt) => opt.name || ""}
//             isOptionEqualToValue={(option, value) => String(option._id) === String(value._id)}
//             value={selectedDataCenters}
//             onChange={(e, newValue) => setSelectedDataCenters(newValue || [])}
//             renderInput={(params) => <TextField {...params} label="Assigned Data Centers" placeholder="Select data centers" />}
//           />

//           {/* Timer only editable by admin */}
//           {currentUser?.role === "admin" && (
//             <>
//               <TextField
//                 label="Timer (optional)"
//                 placeholder="eg: 1s or 1m"
//                 value={timer}
//                 onChange={handleTimerChange}
//                 fullWidth
//               />
//               {timerError && <p className="mt-1 text-sm text-red-600">{timerError}</p>}
//             </>
//           )}
//         </Stack>

//         <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3}>
//           <Button onClick={closeModal} variant="outlined" disabled={loading}>
//             Cancel
//           </Button>
//           <Button onClick={handleUpdate} variant="contained" color="primary" disabled={loading}>
//             {loading ? "Updating..." : "Update"}
//           </Button>
//         </Stack>
//       </Box>
//     </Modal>
//   );
// }







// // src/components/Modals/UserManagement/EditModal.jsx
// import * as React from "react";
// import {
//   Box,
//   Button,
//   Typography,
//   Modal,
//   Stack,
//   TextField,
//   useMediaQuery,
//   useTheme,
//   Autocomplete,
//   FormControl,
//   Select,
//   InputLabel,
//   MenuItem,
// } from "@mui/material";
// import { Lock, Mail, User2 } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import InputField from "../../Inputs/InputField";
// import PasswordField from "../../Inputs/PasswordField";
// import Swal from "sweetalert2";
// import {
//   fetchUsersByCreator,
//   updateUser,
// } from "../../../slices/UserSlice";
// import {
//   fetchAllDataCenters,
//   fetchDataCentersByUser,
// } from "../../../slices/DataCenterSlice";
// import { useStore } from "../../../contexts/storecontexts";

// export default function UserEditModal({ open, handleClose, user, onSaved }) {
//   console.log("SelectedUser>", user)
//   const dispatch = useDispatch();
//   const { user: currentUser, getToken } = useStore();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const { DataCenters = [], loading } = useSelector(
//     (s) => s.DataCenter || {}
//   );


//   const timerDisplayMap = {
//   "900s": "15m",
//   "1800s": "30m",
//   "21600s": "6h",
//   "43200s": "12h",
//   "86400s": "1d",
// };

// const timerPayloadMap = {
//   "15m": "900s",
//   "30m": "1800s",
//   "6h": "21600s",
//   "12h": "43200s",
//   "1d": "86400s",
// };



//   const [formData, setFormData] = React.useState({
//     id: null,
//     name: "",
//     current_email: "",
//     updated_email: "",
//     updated_password: "",
//   });

//   const [selectedDataCenters, setSelectedDataCenters] = React.useState([]);
//   const [timer, setTimer] = React.useState("");
//   const [timerError, setTimerError] = React.useState("");

//   /* ================= LOAD DC OPTIONS ================= */
//   React.useEffect(() => {
//     if (!currentUser) return;
//     if (currentUser.role === "admin") {
//       dispatch(fetchAllDataCenters());
//     } else if (currentUser.role === "manager") {
//       dispatch(fetchDataCentersByUser(currentUser._id));
//     }
//   }, [currentUser, dispatch]);

//   /* ================= POPULATE FORM ================= */
//   React.useEffect(() => {
//     if (!open || !user) return;

//     setFormData({
//       id: user._id,
//       name: user.name || "",
//       current_email: user.email || "",
//       updated_email: "",
//       updated_password: "",
//     });

//     // if (currentUser?.role === "admin") {
//     //   setTimer(user.timer || "");
//     // }
    

//     if (currentUser?.role === "admin") {
//   const raw = user.timer || "";
//   setTimer(timerDisplayMap[raw] || "");
//   }


//     // const assigned = Array.isArray(user.dataCenters)
//     // ? user.dataCenters.map((dc) => {
//     //     if (typeof dc === "string") return { _id: dc, name: "" }; // fallback if only id
//     //     return { _id: dc.dataCenterId, name: dc.name || "" };
//     //   })
//     // : [];
  

//   const assigned = Array.isArray(user.dataCenters)
//   ? user.dataCenters.map((dc) => {
//     console.log("DCCC>>", dc);
//       if (typeof dc === "string") return { _id: dc, name: "" }; // just ID
//       // dc.dataCenterId might be object or string
//       const id = typeof dc.dataCenterId === "string" ? dc.dataCenterId : dc.dataCenterId?._id;
//       return { _id: id, name: dc.name || "" };
//     })
//   : [];


//   // const assigned = Array.isArray(user.dataCenters)
//   // ? user.dataCenters.map((dc) => {
//   //     // if dc is string -> it's dataCenterId
//   //     const id = typeof dc === "string" ? dc : dc.dataCenterId;
//   //     // find the name from available DataCenters (if loaded)
//   //     const found = DataCenters.find((d) => d._id === id);
//   //     return { _id: id, name: found ? found.name : "" };
//   //   })
//   // : [];

//     console.log("assigned>>", assigned)
//     setSelectedDataCenters(assigned);
//   }, [open, user, currentUser]);

//   /* ================= HELPERS ================= */
//   const validateTimer = (value) => {
//     if (!value) return { valid: true };
//     const re = /^(?:[1-9]|[1-5][0-9]|60)(s|m)$/;
//     return re.test(value)
//       ? { valid: true }
//       : { valid: false, message: "Use 1–60s or 1–60m" };
//   };

//   const handleTimerChange = (e) => {
//     const val = e.target.value;
//     setTimer(val);
//     const { valid, message } = validateTimer(val);
//     setTimerError(valid ? "" : message);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((p) => ({ ...p, [name]: value }));
//   };

//   const closeModal = () => handleClose?.();

//   /* ================= UPDATE ================= */
//   const handleUpdate = async () => {
//     if (!formData.name) {
//       return Swal.fire("Missing", "Name is required", "warning");
//     }

   

//     try {
//       /* ===== ADMIN ===== */
//       if (currentUser?.role == "admin" || currentUser?.role == "manager") {
        
//         console.log("Payload>>.,.., ", selectedDataCenters);

//         const payload = {
//           name: formData.name,
//           dataCenters: selectedDataCenters.map((d) => ({
//             dataCenterId: d?._id,
//           })),
//         };

//         if (formData.updated_email)
//           payload.email = formData.updated_email;
//         if (formData.updated_password)
//           payload.password = formData.updated_password;
//         // if (timer && !timerError) payload.timer = timer;

//         if (timer && !timerError) {
//           payload.timer = timerPayloadMap[timer] || null; // 30m → "1800s"
//         }

//         await dispatch(
//           updateUser({ id: formData.id, payload })
//         ).unwrap();
        
//         dispatch(fetchUsersByCreator(currentUser._id));
//       }


//       Swal.fire("Success", "User updated", "success");
//       onSaved?.();
//       closeModal();
//     } catch (err) {
//       Swal.fire("Error", err.message || "Update failed", "error");
//     }
//   };

//   console.log("Datacenters>>", DataCenters)

//   // const options = DataCenters.map((d) => ({
//   //   _id: d.dataCenterId,
//   //   name: d.name,
//   // }));


//   let options = [];

// if (currentUser?.role === "admin") {
//   // Admin → Response already clean [{ _id, name }]
//   options = DataCenters.map(d => ({
//     _id: d._id,
//     name: d.name
//   }));
// }

// if (currentUser?.role === "manager") {
//   // Manager → Response joined [{ dataCenterId:{_id,name} }]
//   options = DataCenters.map(d => ({
//     _id: d.dataCenterId?._id,
//     name: d.dataCenterId?.name
//   })).filter(d => d._id);
// }



//   console.log("Datacenters>>", DataCenters)
//   console.log("Options>>", options);


//   return (
//     <Modal open={!!open} onClose={closeModal}>
//       <Box
//         sx={{
//           position: "absolute",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           width: isMobile ? "92%" : 520,
//           bgcolor: "background.paper",
//           p: 4,
//           borderRadius: 2,
//         }}
//       >
//         <Typography variant="h6" mb={2}>
//           Edit User
//         </Typography>

//         <Stack spacing={2}>
//           <InputField
//             label="Current Email"
//             value={formData.current_email}
//             disabled
//             icon={<Mail size={18} />}
//           />

//           <InputField
//           label="Name"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}  // ✅
//           icon={<User2 size={18} />}
//         />


//           <InputField
//             label="Updated Email"
//             name="updated_email"
//             value={formData.updated_email}
//             onchange={handleChange}
//             icon={<Mail size={18} />}
//           />

//           <PasswordField
//             label="New Password"
//             name="updated_password"
//             value={formData.updated_password}
//             onchange={handleChange}
//             icon={<Lock size={18} />}
//           />

//           <Autocomplete
//             multiple
//             options={options}
//             value={selectedDataCenters}
//             getOptionLabel={(o) => o.name}
//             isOptionEqualToValue={(a, b) => a._id === b._id}
//             onChange={(e, v) => setSelectedDataCenters(v)}
//             renderInput={(p) => (
//               <TextField {...p} label="Assigned Data Centers" />
//             )}
//           />


//           {currentUser?.role === "admin" && (
//             <FormControl fullWidth className="mt-4">
//               <InputLabel id="timer-select-label">Timer</InputLabel>
//               <Select
//                 labelId="timer-select-label"
//                 id="timer-select"
//                 value={timer}
//                 label="Timer"
//                 onChange={(e) => setTimer(e.target.value)}
//               >
//                 <MenuItem value="">Select Duration</MenuItem>
//                 <MenuItem value="15m">15 minutes</MenuItem>
//                 <MenuItem value="30m">30 minutes</MenuItem>
//                 <MenuItem value="6h">6 hours</MenuItem>
//                 <MenuItem value="12h">12 hours</MenuItem>
//                 <MenuItem value="1d">1 day</MenuItem>
//               </Select>
//             </FormControl>
//           )}


//           {/* {currentUser?.role === "admin" && (
//             <FormControl fullWidth className="mt-4">
//             <InputLabel id="timer-select-label">Timer</InputLabel>
//             <Select
//               labelId="timer-select-label"
//               id="timer-select"
//               value={timer}
//               label="Timer"
//               onChange={(e) => setTimer(e.target.value)}
//             >
//               <MenuItem value="">Select Duration</MenuItem>
//               <MenuItem value="15m">15 minutes</MenuItem>
//               <MenuItem value="30m">30 minutes</MenuItem>
//               <MenuItem value="6h">6 hours</MenuItem>
//               <MenuItem value="12h">12 hours</MenuItem>
//               <MenuItem value="1d">1 day</MenuItem>
//             </Select>
//           </FormControl>
//           )} */}
//         </Stack>

//         <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3}>
//           <Button onClick={closeModal} variant="outlined">
//             Cancel
//           </Button>
//           <Button onClick={handleUpdate} variant="contained">
//             Update
//           </Button>
//         </Stack>
//       </Box>
//     </Modal>
//   );
// }











// // src/components/Modals/UserManagement/EditModal.jsx
// import * as React from "react";
// import {
//   Box,
//   Button,
//   Typography,
//   Modal,
//   Stack,
//   TextField,
//   useMediaQuery,
//   useTheme,
//   Autocomplete,
//   FormControl,
//   Select,
//   InputLabel,
//   MenuItem,
// } from "@mui/material";
// import { Lock, Mail, User2 } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import InputField from "../../Inputs/InputField";
// import PasswordField from "../../Inputs/PasswordField";
// import Swal from "sweetalert2";
// import {
//   fetchUsersByCreator,
//   updateUser,
// } from "../../../slices/UserSlice";
// import {
//   fetchAllDataCenters,
//   fetchDataCentersByUser,
// } from "../../../slices/DataCenterSlice";
// import { useStore } from "../../../contexts/storecontexts";

// export default function UserEditModal({ open, handleClose, user, onSaved }) {
//   console.log("SelectedUser>", user)
//   const dispatch = useDispatch();
//   const { user: currentUser, getToken } = useStore();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const { DataCenters = [], loading } = useSelector(
//     (s) => s.DataCenter || {}
//   );


//   const timerDisplayMap = {
//   "900s": "15m",
//   "1800s": "30m",
//   "21600s": "6h",
//   "43200s": "12h",
//   "86400s": "1d",
// };

// const timerPayloadMap = {
//   "15m": "900s",
//   "30m": "1800s",
//   "6h": "21600s",
//   "12h": "43200s",
//   "1d": "86400s",
// };



//   const [formData, setFormData] = React.useState({
//     id: null,
//     name: "",
//     current_email: "",
//     updated_email: "",
//     updated_password: "",
//   });

//   const [selectedDataCenters, setSelectedDataCenters] = React.useState([]);
//   const [timer, setTimer] = React.useState("");
//   const [timerError, setTimerError] = React.useState("");

//   /* ================= LOAD DC OPTIONS ================= */
//   React.useEffect(() => {
//     if (!currentUser) return;
//     if (currentUser.role === "admin") {
//       dispatch(fetchAllDataCenters());
//     } else if (currentUser.role === "manager") {
//       dispatch(fetchDataCentersByUser(currentUser._id));
//     }
//   }, [currentUser, dispatch]);

//   /* ================= POPULATE FORM ================= */
//   React.useEffect(() => {
//     if (!open || !user) return;

//     setFormData({
//       id: user._id,
//       name: user.name || "",
//       current_email: user.email || "",
//       updated_email: "",
//       updated_password: "",
//     });

//     // if (currentUser?.role === "admin") {
//     //   setTimer(user.timer || "");
//     // }
//     console.log("SelectedEdittedUser>", user)

//     if (currentUser?.role === "admin") {
//   const raw = user.timer || "";
//   setTimer(timerDisplayMap[raw] || "");
//   }


//     // const assigned = Array.isArray(user.dataCenters)
//     // ? user.dataCenters.map((dc) => {
//     //     if (typeof dc === "string") return { _id: dc, name: "" }; // fallback if only id
//     //     return { _id: dc.dataCenterId, name: dc.name || "" };
//     //   })
//     // : [];
  

//   // const assigned = Array.isArray(user.dataCenters)
//   // ? user.dataCenters
//   //     .map((dc) => {
//   //       const id =
//   //         typeof dc === "string"
//   //           ? dc
//   //           : typeof dc.dataCenterId === "string"
//   //           ? dc.dataCenterId
//   //           : dc.dataCenterId?._id;

//   //       // 🔑 find the real option object
//   //       return options.find((o) => String(o._id) === String(id));
//   //     })
//   //     .filter(Boolean)
//   // : [];



//   // // const assigned = Array.isArray(user.dataCenters)
//   // // ? user.dataCenters.map((dc) => {
//   // //     // if dc is string -> it's dataCenterId
//   // //     const id = typeof dc === "string" ? dc : dc.dataCenterId;
//   // //     // find the name from available DataCenters (if loaded)
//   // //     const found = DataCenters.find((d) => d._id === id);
//   // //     return { _id: id, name: found ? found.name : "" };
//   // //   })
//   // // : [];

//   //   console.log("assigned>>", assigned)
//   //   setSelectedDataCenters(assigned);


//   const assigned =
//   Array.isArray(user.dataCenters)
//     ? user.dataCenters.map(dc => {
//         // ADMIN case (populated object)
//         if (dc.dataCenterId?._id) {
//           return {
//             _id: dc.dataCenterId._id,
//             name: dc.dataCenterId.name || "",
//           };
//         }

//         // MANAGER case (string id only)
//         if (typeof dc.dataCenterId === "string") {
//           const found = options.find(o => o._id === dc.dataCenterId);
//           return {
//             _id: dc.dataCenterId,
//             name: found?.name || "",
//           };
//         }

//         return null;
//       }).filter(Boolean)
//     : [];

// setSelectedDataCenters(assigned);

//   }, [open, user, currentUser]);

//   /* ================= HELPERS ================= */
//   const validateTimer = (value) => {
//     if (!value) return { valid: true };
//     const re = /^(?:[1-9]|[1-5][0-9]|60)(s|m)$/;
//     return re.test(value)
//       ? { valid: true }
//       : { valid: false, message: "Use 1–60s or 1–60m" };
//   };

//   const handleTimerChange = (e) => {
//     const val = e.target.value;
//     setTimer(val);
//     const { valid, message } = validateTimer(val);
//     setTimerError(valid ? "" : message);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((p) => ({ ...p, [name]: value }));
//   };

//   const closeModal = () => handleClose?.();

//   /* ================= UPDATE ================= */
//   const handleUpdate = async () => {
//     if (!formData.name) {
//       return Swal.fire("Missing", "Name is required", "warning");
//     }

   

//     try {
//       /* ===== ADMIN ===== */
//       if (currentUser?.role == "admin" || currentUser?.role == "manager") {
        
//         console.log("Payload>>.,.., ", selectedDataCenters);

//         const payload = {
//           name: formData.name,
//           dataCenters: selectedDataCenters.map((d) => ({
//             dataCenterId: d?._id,
//           })),
//         };

//         if (formData.updated_email)
//           payload.email = formData.updated_email;
//         if (formData.updated_password)
//           payload.password = formData.updated_password;
//         // if (timer && !timerError) payload.timer = timer;

//         if (timer && !timerError) {
//           payload.timer = timerPayloadMap[timer] || null; // 30m → "1800s"
//         }

//         await dispatch(
//           updateUser({ id: formData.id, payload })
//         ).unwrap();
        
//         dispatch(fetchUsersByCreator(currentUser._id));
//       }


//       Swal.fire("Success", "User updated", "success");
//       onSaved?.();
//       closeModal();
//     } catch (err) {
//       Swal.fire("Error", err.message || "Update failed", "error");
//     }
//   };

//   console.log("Datacenters>>", DataCenters)

//   // const options = DataCenters.map((d) => ({
//   //   _id: d.dataCenterId,
//   //   name: d.name,
//   // }));


//   let options = [];

// if (currentUser?.role === "admin") {
//   // Admin → Response already clean [{ _id, name }]
//   options = DataCenters.map(d => ({
//     _id: d._id,
//     name: d.name
//   }));
// }

// if (currentUser?.role === "manager") {
//   // Manager → Response joined [{ dataCenterId:{_id,name} }]
//   options = DataCenters.map(d => ({
//     _id: d.dataCenterId?._id,
//     name: d.dataCenterId?.name
//   })).filter(d => d._id);
// }



//   console.log("Datacenters>>", DataCenters)
//   console.log("Options>>", options);


//   return (
//     <Modal open={!!open} onClose={closeModal}>
//       <Box
//         sx={{
//           position: "absolute",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           width: isMobile ? "92%" : 520,
//           bgcolor: "background.paper",
//           p: 4,
//           borderRadius: 2,
//         }}
//       >
//         <Typography variant="h6" mb={2}>
//           Edit User
//         </Typography>

//         <Stack spacing={2}>
//           <InputField
//             label="Current Email"
//             value={formData.current_email}
//             disabled
//             icon={<Mail size={18} />}
//           />

//           <InputField
//           label="Name"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}  // ✅
//           icon={<User2 size={18} />}
//         />


//           <InputField
//             label="Updated Email"
//             name="updated_email"
//             value={formData.updated_email}
//             onchange={handleChange}
//             icon={<Mail size={18} />}
//           />

//           <PasswordField
//             label="New Password"
//             name="updated_password"
//             value={formData.updated_password}
//             onchange={handleChange}
//             icon={<Lock size={18} />}
//           />

//           <Autocomplete
//             multiple
//             options={options}
//             value={selectedDataCenters}
//             getOptionLabel={(o) => o.name}
//             isOptionEqualToValue={(a, b) => a._id === b._id}
//             onChange={(e, v) => setSelectedDataCenters(v)}
//             renderInput={(p) => (
//               <TextField {...p} label="Assigned Data Centers" />
//             )}
//           />


//           {currentUser?.role === "admin" && (
//             <FormControl fullWidth className="mt-4">
//               <InputLabel id="timer-select-label">Timer</InputLabel>
//               <Select
//                 labelId="timer-select-label"
//                 id="timer-select"
//                 value={timer}
//                 label="Timer"
//                 onChange={(e) => setTimer(e.target.value)}
//               >
//                 <MenuItem value="">Select Duration</MenuItem>
//                 <MenuItem value="15m">15 minutes</MenuItem>
//                 <MenuItem value="30m">30 minutes</MenuItem>
//                 <MenuItem value="6h">6 hours</MenuItem>
//                 <MenuItem value="12h">12 hours</MenuItem>
//                 <MenuItem value="1d">1 day</MenuItem>
//               </Select>
//             </FormControl>
//           )}


//           {/* {currentUser?.role === "admin" && (
//             <FormControl fullWidth className="mt-4">
//             <InputLabel id="timer-select-label">Timer</InputLabel>
//             <Select
//               labelId="timer-select-label"
//               id="timer-select"
//               value={timer}
//               label="Timer"
//               onChange={(e) => setTimer(e.target.value)}
//             >
//               <MenuItem value="">Select Duration</MenuItem>
//               <MenuItem value="15m">15 minutes</MenuItem>
//               <MenuItem value="30m">30 minutes</MenuItem>
//               <MenuItem value="6h">6 hours</MenuItem>
//               <MenuItem value="12h">12 hours</MenuItem>
//               <MenuItem value="1d">1 day</MenuItem>
//             </Select>
//           </FormControl>
//           )} */}
//         </Stack>

//         <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3}>
//           <Button onClick={closeModal} variant="outlined">
//             Cancel
//           </Button>
//           <Button onClick={handleUpdate} variant="contained">
//             Update
//           </Button>
//         </Stack>
//       </Box>
//     </Modal>
//   );
// }















// src/components/Modals/UserManagement/EditModal.jsx
import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  Stack,
  TextField,
  useMediaQuery,
  useTheme,
  Autocomplete,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { Lock, Mail, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../../Inputs/InputField";
import PasswordField from "../../Inputs/PasswordField";
import Swal from "sweetalert2";
import { fetchUsersByCreator, updateUser } from "../../../slices/UserSlice";
import { fetchAllDataCenters, fetchDataCentersByUser } from "../../../slices/DataCenterSlice";
import { useStore } from "../../../contexts/storecontexts";

export default function UserEditModal({ open, handleClose, user, onSaved }) {
  const dispatch = useDispatch();
  const { user: currentUser } = useStore();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { DataCenters = [], loading: dcLoading } = useSelector((s) => s.DataCenter || {});

  const timerDisplayMap = {
    "900s": "15m",
    "1800s": "30m",
    "21600s": "6h",
    "43200s": "12h",
    "86400s": "1d",
  };
  const timerPayloadMap = {
    "15m": "900s",
    "30m": "1800s",
    "6h": "21600s",
    "12h": "43200s",
    "1d": "86400s",
  };

  const [formData, setFormData] = useState({
    id: null,
    name: "",
    current_email: "",
    updated_email: "",
    updated_password: "",
  });

  const [selectedDataCenters, setSelectedDataCenters] = useState([]); // [{ _id, name }]
  const [timer, setTimer] = useState("");
  const [timerError, setTimerError] = useState("");

  // load DCs depending on current user's role (your existing logic)
  useEffect(() => {
    if (!currentUser) return;
    if (currentUser.role === "admin") {
      dispatch(fetchAllDataCenters());
    } else if (currentUser.role === "manager") {
      dispatch(fetchDataCentersByUser(currentUser._id));
    }
  }, [currentUser, dispatch]);

  // helper - extract id from many shapes
  const extractId = (entry) => {
    if (!entry) return null;
    if (typeof entry === "string") return entry;
    if (entry._id) return entry._id;
    if (entry.dataCenterId) {
      if (typeof entry.dataCenterId === "string") return entry.dataCenterId;
      if (typeof entry.dataCenterId === "object") return entry.dataCenterId._id || entry.dataCenterId.id || null;
    }
    return null;
  };

  // Normalize options so each option is { _id, name }
  const options = useMemo(() => {
    if (!Array.isArray(DataCenters)) return [];

    if (currentUser?.role === "admin") {
      // DataCenters are full objects: { _id, name }
      const arr = DataCenters.map((d) => ({ _id: d._id || d.id, name: d.name || "" }));
      const map = {};
      return arr.filter((o) => {
        if (!o._id) return false;
        if (map[o._id]) return false;
        map[o._id] = true;
        return true;
      });
    }

    // manager: DataCenters slice returns assignment-like objects
    const arr = DataCenters
      .map((d) => {
        const nested = d?.dataCenterId;
        if (!nested) {
          if (d._id && d.name) return { _id: d._id, name: d.name };
          return null;
        }
        if (typeof nested === "string") return { _id: nested, name: d.name || "" };
        // nested object
        return { _id: nested._id || nested.id, name: nested.name || d.name || "" };
      })
      .filter(Boolean);

    // dedupe
    const map = {};
    return arr.filter((o) => {
      if (!o._id) return false;
      if (map[o._id]) return false;
      map[o._id] = true;
      return true;
    });
  }, [DataCenters, currentUser]);

  // Populate form and selectedDataCenters when modal opens
  useEffect(() => {
    if (!open || !user) {
      setFormData({
        id: null,
        name: "",
        current_email: "",
        updated_email: "",
        updated_password: "",
      });
      setSelectedDataCenters([]);
      setTimer("");
      setTimerError("");
      return;
    }

    setFormData({
      id: user._id,
      name: user.name || "",
      current_email: user.email || "",
      updated_email: "",
      updated_password: "",
    });

    if (currentUser?.role === "admin") {
      const raw = user.timer || "";
      setTimer(timerDisplayMap[raw] || "");
    } else {
      setTimer("");
    }

    // Build assigned ids from user.dataCenters entries (handles assignment shapes)
    const assignedIds = Array.isArray(user.dataCenters)
      ? user.dataCenters
          .map((dc) => {
            if (!dc) return null;
            // if dc.dataCenterId is object
            if (dc.dataCenterId && typeof dc.dataCenterId === "object") return extractId(dc.dataCenterId);
            // if dc.dataCenterId is string
            if (dc.dataCenterId && typeof dc.dataCenterId === "string") return dc.dataCenterId;
            // some shapes might be direct objects with _id
            if (dc._id) return dc._id;
            return null;
          })
          .filter(Boolean)
      : [];

    // Map assigned ids to option objects if possible (fall back to id-only objects)
    const mapped = assignedIds.map((id) => {
      const found = options.find((o) => String(o._id) === String(id));
      return found || { _id: id, name: "" };
    });

    setSelectedDataCenters(mapped);
  }, [open, user, options, currentUser]);

  const validateTimer = (value) => {
    if (!value) return { valid: true };
    const re = /^(?:[1-9]|[1-5][0-9]|60)(s|m)$/;
    return re.test(value) ? { valid: true } : { valid: false, message: "Use 1–60s or 1–60m" };
  };

  const handleTimerChange = (e) => {
    const val = e.target.value;
    setTimer(val);
    const { valid, message } = validateTimer(val);
    setTimerError(valid ? "" : message);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const closeModal = () => handleClose?.();

  // Update: send dataCenters array with { dataCenterId: <id> } where <id> is _id drawn from options.
  const handleUpdate = async () => {
    if (!formData.name) {
      return Swal.fire("Missing", "Name is required", "warning");
    }

    try {
      // Prepare payload
      const payload = {
        name: formData.name,
        dataCenters: (selectedDataCenters || []).map((d) => ({ dataCenterId: d._id })),
      };

      if (formData.updated_email) payload.email = formData.updated_email;
      if (formData.updated_password) payload.password = formData.updated_password;
      if (timer && !timerError) payload.timer = timerPayloadMap[timer] || null;

      await dispatch(updateUser({ id: formData.id, payload })).unwrap();
      // refresh the user list for this manager/admin
      dispatch(fetchUsersByCreator(currentUser._id));
      Swal.fire("Success", "User updated", "success");
      onSaved?.();
      closeModal();
    } catch (err) {
      console.error("Update error:", err);
      Swal.fire("Error", err?.message || "Update failed", "error");
    }
  };

  // Autocomplete equality helper
  const isEq = (a, b) => {
    if (!a || !b) return false;
    return String(a._id) === String(b._id);
  };

  return (
    <Modal open={!!open} onClose={closeModal}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: isMobile ? "92%" : 520,
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" mb={2}>
          Edit User
        </Typography>

        <Stack spacing={2}>
          <InputField label="Current Email" value={formData.current_email} disabled icon={<Mail size={18} />} onChange={() => {}} onchange={() => {}} />

          <InputField label="Name" name="name" value={formData.name} onChange={handleChange} onchange={handleChange} icon={<User2 size={18} />} />

          <InputField label="Updated Email" name="updated_email" value={formData.updated_email} onChange={handleChange} onchange={handleChange} icon={<Mail size={18} />} />

          <PasswordField label="New Password" name="updated_password" value={formData.updated_password} onchange={handleChange} onChange={handleChange} icon={<Lock size={18} />} />

          <Autocomplete
            multiple
            options={options}
            groupBy={null}
            getOptionLabel={(o) => o.name || o._id || ""}
            isOptionEqualToValue={isEq}
            value={selectedDataCenters}
            onChange={(e, v) => setSelectedDataCenters(v || [])}
            renderInput={(params) => <TextField {...params} label="Assigned Data Centers" placeholder="Select data centers" />}
            disableCloseOnSelect
            filterSelectedOptions
          />

          {currentUser?.role === "admin" && (
            <FormControl fullWidth className="mt-4">
              <InputLabel id="timer-select-label">Timer</InputLabel>
              <Select labelId="timer-select-label" id="timer-select" value={timer} label="Timer" onChange={(e) => setTimer(e.target.value)}>
                <MenuItem value="">Select Duration</MenuItem>
                <MenuItem value="15m">15 minutes</MenuItem>
                <MenuItem value="30m">30 minutes</MenuItem>
                <MenuItem value="6h">6 hours</MenuItem>
                <MenuItem value="12h">12 hours</MenuItem>
                <MenuItem value="1d">1 day</MenuItem>
              </Select>
            </FormControl>
          )}
        </Stack>

        <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3}>
          <Button onClick={closeModal} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleUpdate} variant="contained">
            Update
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
