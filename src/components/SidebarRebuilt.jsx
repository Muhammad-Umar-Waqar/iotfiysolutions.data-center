//  // src/components/SidebarRebuilt.jsx
// import React, { useEffect, useState } from "react"
// import { NavLink, useLocation, useNavigate } from "react-router-dom"
// import "../styles/components/Sidebar.css"
// import { useStore } from "../contexts/storecontexts"
// import Tooltip from "@mui/material/Tooltip";
// import LogoutDialog from "./Modals/LogoutDialog"
// import { useMediaQuery, Skeleton } from "@mui/material"
// import { resetUI } from "../slices/uiSlice";
// import { useDispatch } from "react-redux";

// const BASE = import.meta.env.VITE_BACKEND_API || "http://localhost:5050"

// const Icon = ({ src, alt, size = 24, className = "", ...props }) => (
//   <img
//     src={src}
//     alt={alt}
//     width={size}
//     height={size}
//     className={`imageClassForActiveandHover ${className}`.trim()}
//     onError={(e) => { e.currentTarget.src = "/sidebar-images/placeholder.png" }}
//     {...props}
//   />
// )
// // replace the MobDashMenu declaration with this version
// const MobDashMenu = ({ items = [], onItemClick, activePath = "/", openLogout, activeVenue = null, loading = false, skeletonCount = 3 }) => {
//   // helper to render a skeleton icon
//   const renderSkeletonItem = (key) => (
//     <span key={key} style={{ display: "inline-block" }}>
//       <div
//         className="h-[45px] w-[45px] flex items-center justify-center sidebar-icon"
//         title="Loading"
//         aria-hidden="true"
//       >
//         <Skeleton variant="circular" width={28} height={28} />
//       </div>
//     </span>
//   );

//   return (
//     <div
//       className="bg-[#E8EDF2] left-1/2 transform -translate-x-1/2 px-3 flex items-center justify-around rounded-t-[35px] fixed bottom-0 z-30 pt-1 w-full max-w-[500px]"
//       role="navigation"
//       aria-label="Mobile bottom navigation"
//     >
//       {loading
//         ? // show skeletons while loading
//         Array.from({ length: skeletonCount }).map((_, i) => renderSkeletonItem(`mob-skel-${i}`))
//         : // normal items
//         items.map((it, idx) => {
//           const isVenueItem = !!it.venueId;

//           const isActive = isVenueItem
//             ? String(activeVenue) === String(it.venueId)
//             : (() => {
//               const path = String(activePath || "").replace(/\/+$/, "");
//               const link = String(it.link || "").replace(/\/+$/, "");
//               if (it.key === "home" && path === "/management") return true;
//               if (it.key === "home") return path === link;
//               return path === link || (link && path.startsWith(link));
//             })();

//           const venueNumber = isVenueItem
//             ? items.slice(0, idx + 1).filter(x => !!x.venueId).length
//             : null;

//           return (
//             <Tooltip key={it.key} title={it.label} placement="top">
//               <span style={{ display: "inline-block" }}>
//                 <NavLink
//                   to={it.link || "#"}
//                   onClick={(e) => {
//                     if (onItemClick) {
//                       const prevent = onItemClick(it);
//                       if (prevent === true) e.preventDefault();
//                     }
//                   }}
//                   key={it.key}
//                   end
//                   className={() => `h-[45px] w-[45px] flex items-center justify-center sidebar-icon ${isActive ? "active" : ""}`}
//                   aria-label={it.label}
//                   aria-current={isActive ? "page" : undefined}
//                   title={it.label}
//                 >
//                   <Icon src={it.icon} alt={it.label} size={20} className="imageClassForActiveandHover " />
//                   <div className="relative">
//                     {isVenueItem && (
//                       <p className="absolute text-xs top-[-11px] right-[-8px]" aria-hidden="true">
//                         {String(venueNumber).padStart(2, "0")}
//                       </p>
//                     )}
//                   </div>
//                 </NavLink>
//               </span>
//             </Tooltip>
//           );
//         })}
//       <button onClick={openLogout} aria-label="Logout" title="Logout" className="p-2 rounded-full bg-white/10">
//         <img src="/sidebar-images/8.png" alt="Logout" width={28} height={28} />
//       </button>
//     </div>
//   );
// };



// const SidebarRebuilt = () => {
//   const location = useLocation()
//   const navigate = useNavigate()
//   const { user, LogoutTrue, getToken } = useStore()
//   const [venues, setVenues] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null)
//   const [logoutOpen, setLogoutOpen] = useState(false)
//   const openLogout = () => setLogoutOpen(true)
//   const closeLogout = () => setLogoutOpen(false)
//   const isMobile = useMediaQuery("(max-width:759px)")
//   // const showUserManagement = user?.createdBy === "admin";

//   // const AdminiAndManagertems = [
//   //   { key: "home", label: "Home", link: "/admin/management", icon: "/sidebar-images/1.png", blueIcon: "/sidebar-images-blue/1.svg" },
//   //   { key: "organization-management", label: "Organization Management", link: "/admin/management/installation", icon: "/sidebar-images/2.png", blueIcon: "/sidebar-images-blue/2.png" },
//   //   { key: "users-management", label: "Users Management", link: "/admin/management/users", icon: "/sidebar-images/7.png", blueIcon: "/sidebar-images-blue/7.png" },
//   // ]
//   const AdminiAndManagertems = [
//     { key: "home", label: "Home", link: "/admin/management", icon: "/sidebar-images/1.png", blueIcon: "/sidebar-images-blue/1.svg" },
//     { key: "organization-management", label: "Organization Management", link: "/admin/management/installation", icon: "/sidebar-images/2.png", blueIcon: "/sidebar-images-blue/2.png" },
//     // { key: "venue-management", label: "Venue Management", link: "/admin/management/venue", icon: "/sidebar-images/4.png", blueIcon: "/sidebar-images-blue/4.png" },
//     { key: "users-management", label: "Users Management", link: "/admin/management/users", icon: "/sidebar-images/7.png", blueIcon: "/sidebar-images-blue/7.png" },
//     // { key: "device-management", label: "Device Management", link: "/admin/management/device", icon: "/sidebar-images/3.png", blueIcon: "/sidebar-images-blue/3.png" },
//     // { key: "ota-management", label: "OTA Management", link: "/admin/management/brands", icon: "/sidebar-images/5.png", blueIcon: "/sidebar-images-blue/5.png" },
//   ]

//   // normalize various possible venue shapes to { _id, name, raw }
//   // const normalizeVenue = (v) => {
//   //   if (!v) return null;

//   //   // already normalized or backend org venues: { _id, name, ... }
//   //   if (v._id || v.id) {
//   //     return {
//   //       _id: String(v._id ?? v.id),
//   //       name: v.name ?? v.title ?? v.venueName ?? "",
//   //       raw: v,
//   //     };
//   //   }

//   //   // user-venues shape: { venueId, venueName }
//   //   if (v.venueId) {
//   //     return {
//   //       _id: String(v.venueId),
//   //       name: v.venueName ?? v.name ?? "",
//   //       raw: v,
//   //     };
//   //   }

//   //   // maybe passed directly as string id
//   //   if (typeof v === "string") {
//   //     return { _id: v, name: "", raw: v };
//   //   }

//   //   return null;
//   // };

//   // useEffect(() => {
//   //   // If no user or admin don't fetch here
//   //   if (!user || user.role === "admin") return;

//   //   let aborted = false;

//   //   const fetchVenues = async () => {
//   //     try {
//   //       setLoading(true);
//   //       setError(null);

//   //       // const token = localStorage.getItem("token");
//   //       const token = getToken();

//   //       // If this logged-in user was created by another user,
//   //       // call the user-specific endpoint (GET /venue/:userId) and normalize results.
//   //       if (user.createdBy && String(user.createdBy) === "user") {
//   //         const res = await fetch(`${BASE}/venue/${user._id}`, {
//   //           method: "GET",
//   //           credentials: "include",
//   //           headers: {
//   //             "Content-Type": "application/json",
//   //             ...(token ? { Authorization: `Bearer ${token}` } : {}),
//   //           },
//   //         });

//   //         const data = await res.json();
//   //         if (!res.ok) {
//   //           if (!aborted) {
//   //             setError(data?.message || "Failed to fetch user venues");
//   //             setVenues([]);
//   //           }
//   //           return;
//   //         }
//   //         console.log("data", data);

//   //         // data may be { venues: [...] } or array
//   //         // const arr = Array.isArray(data) ? data : Array.isArray(data?.venues) ? data.venues : [];
//   //         const arr = Array.isArray(data?.venues)
//   //           ? data.venues.map(({ _id, ...rest }) => rest)
//   //           : [];

//   //         const normalized = arr.map(normalizeVenue).filter(Boolean);
//   //         if (!aborted) setVenues(normalized);
//   //         return;
//   //       }

//   //       // Default: fetch venues by organization
//   //       const res = await fetch(`${BASE}/venue/venue-by-org/${user.organization}`, {
//   //         method: "GET",
//   //         credentials: "include",
//   //         headers: {
//   //           "Content-Type": "application/json",
//   //           ...(token ? { Authorization: `Bearer ${token}` } : {}),
//   //         },
//   //       });

//   //       const data = await res.json();
//   //       if (!res.ok) {
//   //         if (!aborted) {
//   //           setError(data?.message || "Failed to fetch venues");
//   //           setVenues([]);
//   //         }
//   //         return;
//   //       }

//   //       const arr = Array.isArray(data) ? data : Array.isArray(data?.venues) ? data.venues : [];
//   //       const normalized = arr.map(normalizeVenue).filter(Boolean);
//   //       if (!aborted) setVenues(normalized);
//   //     } catch (err) {
//   //       if (!aborted) {
//   //         setError(err.message || "Network error");
//   //         setVenues([]);
//   //       }
//   //     } finally {
//   //       if (!aborted) setLoading(false);
//   //     }
//   //   };

//   //   fetchVenues();

//   //   return () => { aborted = true; };
//   // }, [user]);

//   // const topVenues = (venues || []).slice(0, 3)

//   // const activeVenueFromSearch = () => {
//   //   try {
//   //     const sp = new URLSearchParams(location.search)
//   //     return sp.get("venue") || ""
//   //   } catch { return "" }
//   // }

//   // const activeVenue = activeVenueFromSearch()

//   // const handleVenueClick = (id) => {
//   //   // Choose base depending on admin vs non-admin area
//   //   const isAdminArea = location.pathname.startsWith("/admin/management");
//   //   const basePath = isAdminArea ? "/admin/management" : "/management";

//   //   // Navigate to base with the venue query (replace true avoids leaving old URL in history)
//   //   navigate(`${basePath}?venue=${id}`, { replace: true });
//   // }

//   // useEffect(() => {
//   //   if (!user || user.role === "admin") return;
//   //   if (loading) return;

//   //   // don't auto-insert venue on pages that are not venue-scoped (e.g. users management)
//   //   const nonVenuePaths = [
//   //     "/management/users",
//   //   ];
//   //   if (nonVenuePaths.some(p => location.pathname.startsWith(p))) return;

//   //   try {
//   //     const sp = new URLSearchParams(location.search);
//   //     if (sp.get("venue")) return;
//   //   } catch { }

//   //   const firstVenue = (venues || [])[0] ?? null;
//   //   if (!firstVenue) return;
//   //   const firstId = String(firstVenue._id ?? firstVenue.id ?? firstVenue);
//   //   navigate(`${location.pathname}?venue=${firstId}`, { replace: true });
//   // }, [user, loading, venues, location.pathname, location.search, navigate]);

//   const dispatch  = useDispatch();
//   const handleConfirmLogout = async () => {
//     try {
//       setLoading(true)
//       dispatch(resetUI()); 
//       await LogoutTrue(true)
//       navigate("/")
//     } finally {
//       setLoading(false)
//       closeLogout()
//     }
//   }

//   // mobile items
//   const mobileItemsForAdmin = AdminiAndManagertems.map(it => ({ key: it.key, label: it.label, link: it.link, icon: it.blueIcon }));
//   // const mobileItemsForUser = topVenues.length
//   //   ? topVenues.map((v, idx) => {
//   //     const id = String(v._id ?? v.id ?? v.raw?.venueId ?? v)
//   //     const isAdminArea = location.pathname.startsWith("/admin/management");
//   //     const basePath = isAdminArea ? "/admin/management" : "/management";
//   //     return {
//   //       key: `venue-${id}`,
//   //       label: v.name ?? v.venue_name ?? `Venue ${idx + 1}`,
//   //       link: `${basePath}?venue=${id}`,
//   //       icon: "/venue-icon-sidebar.svg",
//   //       venueId: id
//   //     }
//   //   })
//   //   : [{ key: "no-venues", label: "Home", link: "/", icon: "/sidebar-images/1.png" }]

//   // add Users Management item for users createdBy admin (or admins)
//   // if (showUserManagement) {
//   //   mobileItemsForUser.push({
//   //     key: "users-management",
//   //     label: "Users",
//   //     link: "/management/users",
//   //     icon: "/sidebar-images-blue/7.png",
//   //   });
//   // }

//   // const mobileOnItemClick = (item) => {
//   //   if (item.venueId) {
//   //     handleVenueClick(item.venueId)
//   //     return true
//   //   }
//   //   return false
//   // }

//   // const activePath = location.pathname;

//   return (
//     <>
//       {/* Desktop sidebar (unchanged behavior) */}
//       {!isMobile && (
//         <div className="sidebar ">
//           <div className="sidebar-top">
//             <img src="/logo-half.png" alt="logo" className="w-[55px] h-[auto]" />
//           </div>

//           {(user?.role !== "admin") ? (
//             <div className="sidebar-venues mt-4 px-2">
//               <div className="sidebar-track">
//                 {
//                   showUserManagement && (
//                     <>
//                       <Tooltip title="Users Management">
//                         <span style={{ display: "inline-block" }}>
//                           <button
//                             onClick={() => navigate("/management/users")}
//                             className={`sidebar-icon ${location.pathname === "/management/users" ? "active" : ""} cursor-pointer`}
//                           >
//                             <Icon
//                               src="/sidebar-images-blue/7.png"
//                               alt="Users Management"
//                               className="imageClassForActiveandHover"
//                             />
//                           </button>
//                         </span>
//                       </Tooltip>
//                     </>
//                   )
//                 }


//                 {loading ? (
//                   // show three skeleton placeholders
//                   Array.from({ length: 3 }).map((_, idx) => {
//                     const key = `skeleton-${idx}`;
//                     return (
//                       <Tooltip key={key} title="Loading..." placement="top">
//                         <span style={{ display: "inline-block" }}>
//                           <button
//                             className={`sidebar-icon venue-shortcut`}
//                             title="Loading"
//                             aria-hidden="true"
//                             style={{ cursor: "default" }}
//                           >
//                             <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//                               <div style={{ position: "relative" }}>
//                                 <Skeleton variant="square" width={30} height={30} sx={{ borderRadius: '5px' }} />

//                               </div>
//                             </div>
//                           </button>
//                         </span>
//                       </Tooltip>
//                     );
//                   })
//                 ) : (
//                   // existing mapping for actual venues
//                   // topVenues.map((v, idx) => {
//                   //   const id = String(v._id ?? v.id ?? v)
//                   //   const name = v.name ?? v.venue_name ?? id
//                   //   const isActive = id === activeVenue
//                   //   return (
//                   //     <>
//                   //       <Tooltip key={id} title={name} placement="top">
//                   //         <span style={{ display: "inline-block" }}>
//                   //           <button
//                   //             onClick={() => handleVenueClick(id)}
//                   //             className={`sidebar-icon ${isActive ? "active" : ""} venue-shortcut cursor-pointer`}
//                   //             title={name}
//                   //             style={{ display: "flex", alignItems: "center", gap: 8 }}
//                   //           >
//                   //             <div className="relative">
//                   //               <img
//                   //                 src="/venue-icon-sidebar.svg"
//                   //                 alt=""
//                   //                 style={{ height: "25px", width: "25px" }}
//                   //                 className="imageClassForActiveandHover"
//                   //               />
//                   //               <p className="absolute bottom-[5px] left-[16px] text-xs text-white">
//                   //                 {(idx + 1).toString().padStart(2, "0")}
//                   //               </p>
//                   //             </div>
//                   //           </button>
//                   //         </span>
//                   //       </Tooltip>
//                   //     </>
//                   //   )
//                   // })
//                   <>
//                   </>
//                 )}



//               </div>
//             </div>
//           ) : (
//             <nav className="sidebar-nav">
//               <div className="sidebar-track">
//                 {Adminitems.map((item) => {
//                   const active = location.pathname === item.link || (item.key === "home" && location.pathname === "/management")
//                   return (
//                     <Tooltip key={item.key} title={item.label} placement="top">
//                       <span style={{ display: "inline-block" }}>
//                         <NavLink to={item.link} end className={`sidebar-icon ${active ? "active" : ""}`} data-tooltip={item.label} aria-label={item.label}>
//                           <Icon src={item.blueIcon} alt={item.label} className="imageClassForActiveandHover" />
//                         </NavLink>
//                       </span>
//                     </Tooltip>
//                   )
//                 })}
//               </div>
//             </nav>
//           )}

//           <div className="sidebar-bottom">
//             <div className="sidebar-track">
//               <button onClick={openLogout} type="button" aria-label="Logout" className={`sidebar-icon cursor-pointer`} data-tooltip="Logout">
//                 <Icon src="/sidebar-images/8.png" alt="profile" />
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Mobile bottom nav (fixed) */}
//       {isMobile && (user.role === "user" || user?.role === 'admin') && (
//         <>
//           <MobDashMenu
//             items={user?.role === "admin" ? mobileItemsForAdmin : mobileItemsForUser}
//             onItemClick={mobileOnItemClick}
//             activePath={location.pathname}
//             openLogout={openLogout}
//             activeVenue={activeVenue}
//             loading={loading && user?.role !== "admin"} // show skeletons for non-admin users while loading
//             skeletonCount={3} // how many skeleton icons to show (tweak if you want 4)
//           />
//         </>
//       )}

//       <LogoutDialog
//         open={logoutOpen}
//         onClose={closeLogout}
//         onConfirm={handleConfirmLogout}
//         loading={loading}
//         title="Confirm sign out"
//         description="You are about to sign out. Are you sure you want to continue?"
//       />
//     </>
//   )
// }

// export default SidebarRebuilt
























// src/components/SidebarRebuilt.jsx
import React, { useState } from "react"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import "../styles/components/Sidebar.css"
import { useStore } from "../contexts/storecontexts"
import Tooltip from "@mui/material/Tooltip"
import LogoutDialog from "./Modals/LogoutDialog"
import { useMediaQuery, Skeleton } from "@mui/material"
import { resetUI } from "../slices/uiSlice"
import { useDispatch } from "react-redux"

const Icon = ({ src, alt, size = 24, className = "", ...props }) => (
  <img
    src={src}
    alt={alt}
    width={size}
    height={size}
    className={`imageClassForActiveandHover ${className}`.trim()}
    onError={(e) => {
      e.currentTarget.src = "/sidebar-images/placeholder.png"
    }}
    {...props}
  />
)

/* ================= SIDEBAR ITEMS ================= */

// const AdminiAndManagertems = [
//   {
//     key: "home",
//     label: "Home",
//     link: "/admin/management",
//     icon: "/sidebar-images/1.png",
//     blueIcon: "/sidebar-images-blue/1.svg",
//   },
//   {
//     key: "organization-management",
//     label: "Organization Management",
//     link: "/admin/management/installation",
//     icon: "/sidebar-images/2.png",
//     blueIcon: "/sidebar-images-blue/2.png",
//   },
//   {
//     key: "users-management",
//     label: "Users Management",
//     link: "/admin/management/users",
//     icon: "/sidebar-images/7.png",
//     blueIcon: "/sidebar-images-blue/7.png",
//   },
// ]


const USER_ITEMS = [
  {
    key: "home",
    label: "Home",
    link: "/management",
    icon: "/sidebar-images/1.png",
    blueIcon: "/sidebar-images-blue/1.svg",
  },
]

const MANAGER_ITEMS = [
  {
    key: "home",
    label: "Home",
    link: "/management",
    icon: "/sidebar-images/1.png",
    blueIcon: "/sidebar-images-blue/1.svg",
  },
  {
    key: "installation",
    label: "Installation",
    link: "/management/installation",
    icon: "/sidebar-images/2.png",
    blueIcon: "/sidebar-images-blue/2.png",
  },
  {
    key: "users",
    label: "Users",
    link: "/management/users",
    icon: "/sidebar-images/7.png",
    blueIcon: "/sidebar-images-blue/7.png",
  },
]

const ADMIN_ITEMS = [
  {
    key: "home",
    label: "Home",
    link: "/admin/management",
    icon: "/sidebar-images/1.png",
    blueIcon: "/sidebar-images-blue/1.svg",
  },
  {
    key: "installation",
    label: "Installation",
    link: "/admin/management/installation",
    icon: "/sidebar-images/2.png",
    blueIcon: "/sidebar-images-blue/2.png",
  },
  {
    key: "users",
    label: "Users",
    link: "/admin/management/users",
    icon: "/sidebar-images/7.png",
    blueIcon: "/sidebar-images-blue/7.png",
  },
]


/* ================= MOBILE MENU ================= */

const MobDashMenu = ({
  items = [],
  activePath = "/",
  openLogout,
  loading = false,
  skeletonCount = 3,
}) => {
  return (
    <div className="bg-[#E8EDF2] left-1/2 transform -translate-x-1/2 px-3 flex items-center justify-around rounded-t-[35px] fixed bottom-0 z-30 pt-1 w-full max-w-[500px]">
      {loading
        ? Array.from({ length: skeletonCount }).map((_, i) => (
            <div
              key={i}
              className="h-[45px] w-[45px] flex items-center justify-center sidebar-icon"
            >
              <Skeleton variant="circular" width={28} height={28} />
            </div>
          ))
        : items.map((it) => {
            const path = activePath.replace(/\/+$/, "")
            const link = it.link.replace(/\/+$/, "")
            const isActive = path === link || path.startsWith(link)

            return (
              <Tooltip key={it.key} title={it.label} placement="top">
                <span>
           <NavLink
                to={it.link}
                end
                className={({ isActive }) =>
                  `h-[45px] w-[45px] flex items-center justify-center sidebar-icon ${isActive ? "active" : ""}`
                }
              >
                <Icon src={it.icon} alt={it.label} size={20} />
              </NavLink>
                </span>
              </Tooltip>
            )
          })}

      <button
        onClick={openLogout}
        className="p-2 rounded-full bg-white/10"
      >
        <img src="/sidebar-images/8.png" alt="Logout" width={28} height={28} />
      </button>
    </div>
  )
}

/* ================= MAIN COMPONENT ================= */

const SidebarRebuilt = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, LogoutTrue } = useStore()
  const dispatch = useDispatch()
  const isMobile = useMediaQuery("(max-width:759px)")

  const [logoutOpen, setLogoutOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  // const isAdminOrManager =
  //   user?.role === "admin" || user?.role === "manager"

  let sidebarItems = []

    if (user?.role === "admin") {
      sidebarItems = ADMIN_ITEMS
    } else if (user?.role === "manager") {
      sidebarItems = MANAGER_ITEMS
    } else {
      sidebarItems = USER_ITEMS
    }


  /* 🔑 ROLE-BASED FILTER (LOGIC ONLY) */
  // const sidebarItems = isAdminOrManager
  //   ? AdminiAndManagertems
  //   : AdminiAndManagertems.filter((it) => it.key === "home")

  const mobileItems = sidebarItems.map((it) => ({
    key: it.key,
    label: it.label,
    link: it.link,
    icon: it.blueIcon,
  }))

  const handleConfirmLogout = async () => {
    try {
      setLoading(true)
      dispatch(resetUI())
      await LogoutTrue(true)
      navigate("/")
    } finally {
      setLoading(false)
      setLogoutOpen(false)
    }
  }

  return (
    <>
      {/* ================= DESKTOP SIDEBAR ================= */}
      {!isMobile && (
        <div className="sidebar">
          <div className="sidebar-top">
            <img src="/logo-half.png" alt="logo" className="w-[55px]" />
          </div>

          <nav className="sidebar-nav">
            <div className="sidebar-track">
              {sidebarItems.map((item) => {
                const active =
                  location.pathname === item.link ||
                  (item.key === "home" &&
                    location.pathname === "/management")

                return (
                  <Tooltip key={item.key} title={item.label} placement="top">
                    <span>
                 <NavLink
                    to={item.link}
                    end
                    className={({ isActive }) => `sidebar-icon ${isActive ? "active" : ""}`}
                  >
                    <Icon src={item.blueIcon} alt={item.label} />
                  </NavLink>
                    </span>
                  </Tooltip>
                )
              })}
            </div>
          </nav>

          <div className="sidebar-bottom">
            <div className="sidebar-track">
              <button
                onClick={() => setLogoutOpen(true)}
                className="sidebar-icon"
              >
                <Icon src="/sidebar-images/8.png" alt="Logout" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MOBILE NAV ================= */}
      {isMobile && user && (
        <MobDashMenu
          items={mobileItems}
          activePath={location.pathname}
          openLogout={() => setLogoutOpen(true)}
          loading={loading}
        />
      )}

      <LogoutDialog
        open={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        onConfirm={handleConfirmLogout}
        loading={loading}
        title="Confirm sign out"
        description="You are about to sign out. Are you sure?"
      />
    </>
  )
}

export default SidebarRebuilt
