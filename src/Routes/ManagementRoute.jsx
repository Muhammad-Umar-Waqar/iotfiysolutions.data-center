// import { Navigate, Outlet } from "react-router-dom";
// import { useStore } from "../contexts/storecontexts";

// export const ManagementRoute = () => {
//   const { isLoggedIn, user, loading } = useStore();

//   if (loading) return null;
//   if (!isLoggedIn) return <Navigate to="/" replace />;

//   if (!["manager"].includes(user.role)) {
//     return <Navigate to="/" replace />;
//   }

//   return <Outlet />;
// };


// src/Routes/ManagementRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useStore } from "../contexts/storecontexts";

export const ManagementRoute = () => {
  const { isLoggedIn, user, loading } = useStore();

  if (loading) return null; // or a spinner

  // not logged in -> go to public
  if (!isLoggedIn) return <Navigate to="/" replace />;

  // allow regular users and managers (and admins if desired)
  const ALLOWED = ["user", "manager", "admin"];
  if (!user || !ALLOWED.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ManagementRoute;
