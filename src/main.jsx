// import './styles/global/index.css';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { createRoot } from 'react-dom/client';
// import { StrictMode } from 'react';
// import Login from './pages/Authentication/Login';
// import DeviceManagement from './pages/DeviceManagement/page';
// import ManagementLayout from './Layout/management/Layout';
// import UserManagement from './pages/UserManagement/page';
// import OrganizationManagement from './pages/OrganizationManagement/page';
// import VenueManagement from './pages/VenueManagement/page';
// import Dashboard from './pages/Dashboard/page'
// import App from './App';
// import { Provider } from 'react-redux';
// import store from './store/store';
// import { PersistGate } from 'redux-persist/integration/react';
// import { persistor } from './store/store';
// import { StoreProvider } from './contexts/storecontexts';
// import DashboardRoute from './Routes/DashboardRoute';
// import ProtectedRoute from './Routes/ProtectedRoute';
// import UserRoute from './Routes/UserRoute';
// import AdminRoute from './Routes/AdminRoute';
// import VerifyOtp from './pages/Authentication/VerifyOtp';
// import SetupPassword from './pages/Authentication/SetupPassword';
// import ForgotPassword from './pages/Authentication/ForgotPassword';
// import ResetPassword from './pages/Authentication/ResetPassword';
// import PublicRoute from './Routes/PublicRoute';
// import NotFound from './pages/NotFound';
// import UserCreatedByAdminRoute from './Routes/UserCreatedByAdminRoute';
// import BrandManagement from './pages/BrandManagement/page';
// import AddDataCenter from './pages/OrganizationManagement/AddDataCenter';

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//           <BrowserRouter>
//         <StoreProvider>
//             <Routes>

//               {/* --------------------------
//                   Public routes (wrapped)
//                  -------------------------- */}
//               <Route
//                 path="/"
//                 element={
//                   <PublicRoute>
//                     <App />
//                   </PublicRoute>
//                 }
//               >
//                 {/* NOTE: child paths are relative (no leading "/") */}
//                 <Route index element={<Login />} />
//                 <Route path="forgot-password" element={<ForgotPassword />} />
//                 <Route path="reset-password/:token" element={<ResetPassword />} />
//                 <Route path="setup-password/:token" element={<SetupPassword />} />
//                 <Route path="verify-otp/:token" element={<VerifyOtp />} />
//               </Route>

//               {/* --------------------------
//                   Protected (authenticated)
//                  -------------------------- */}
//               <Route element={<ProtectedRoute />}>
//                 {/* User-only routes */}
//                 <Route element={<UserRoute />}>
//                   <Route element={<DashboardRoute />}>
//                     <Route path="management" element={<ManagementLayout />}>
//                       <Route index element={<Dashboard />} />
//                      </Route>
//                   </Route>
//                 </Route>

//                   {/* UserCreatedByAdmin-only routes */}
//                  <Route element={<UserCreatedByAdminRoute />}>
//                   <Route element={<DashboardRoute />}>
//                     <Route path="management" element={<ManagementLayout />}>
//                       <Route index element={<Dashboard />} />
//                       <Route path="users" element={<UserManagement />} />
//                      </Route>
//                   </Route>
//                 </Route>

                
//                 {/* Admin-only routes */}
//                 {/* <Route element={<AdminRoute />}> */}
//                   <Route element={<DashboardRoute />}>
//                     {/* note: top-level admin path */}
//                     <Route path="admin/management" element={<ManagementLayout />}>
//                       <Route index element={<Dashboard />} />
//                       {/* <Route path="organization" element={<OrganizationManagement />} /> */}
//                       <Route path="organization" element={<AddDataCenter />} />
//                       <Route path="device" element={<DeviceManagement />} />
//                       <Route path="venue" element={<VenueManagement />} />
//                       <Route path="users" element={<UserManagement />} />
//                       <Route path="brands" element={<BrandManagement />} /> 
//                     </Route>
//                   </Route>
//                 {/* </Route> */}
//               </Route>
//               <Route path="*" element={<NotFound />} />
//             </Routes>
//         </StoreProvider>
//           </BrowserRouter>
//       </PersistGate>
//     </Provider>
//   </StrictMode>
// );



// // Routes Not Protectoin
// import './styles/global/index.css';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { createRoot } from 'react-dom/client';
// import { StrictMode } from 'react';
// import Login from './pages/Authentication/Login';
// import DeviceManagement from './pages/DeviceManagement/page';
// import ManagementLayout from './Layout/management/Layout';
// import UserManagement from './pages/UserManagement/page';
// // import OrganizationManagement from './pages/OrganizationManagement/page';
// import VenueManagement from './pages/VenueManagement/page';
// import Dashboard from './pages/Dashboard/page'
// import App from './App';
// import { Provider } from 'react-redux';
// import store from './store/store';
// import { PersistGate } from 'redux-persist/integration/react';
// import { persistor } from './store/store';
// import { StoreProvider } from './contexts/storecontexts';
// import DashboardRoute from './Routes/DashboardRoute';
// import ProtectedRoute from './Routes/ProtectedRoute';
// import UserRoute from './Routes/UserRoute';
// import AdminRoute from './Routes/AdminRoute';
// import VerifyOtp from './pages/Authentication/VerifyOtp';
// import SetupPassword from './pages/Authentication/SetupPassword';
// import ForgotPassword from './pages/Authentication/ForgotPassword';
// import ResetPassword from './pages/Authentication/ResetPassword';
// import PublicRoute from './Routes/PublicRoute';
// import NotFound from './pages/NotFound';
// import UserCreatedByAdminRoute from './Routes/UserCreatedByAdminRoute';
// import BrandManagement from './pages/BrandManagement/page';
// import AddDataCenter from './pages/OrganizationManagement/AddDataCenter';
// import OrganizationManagement from './pages/OrganizationManagement/page';
// import DataCenterManagement from './pages/OrganizationManagement/page';
// import Installation from './pages/Installation/page';
// import { InstallationProvider } from './contexts/InstallationContext';
// import { ManagementRoute } from './Routes/ManagementRoute';

// createRoot(document.getElementById('root')).render(
  // <StrictMode>
  //   <Provider store={store}>
  //     <PersistGate loading={null} persistor={persistor}>
  //         <BrowserRouter>
  //       <StoreProvider>
  //           <Routes>

  //             {/* --------------------------
  //                 Public routes (wrapped)
  //                -------------------------- */}
  //             <Route
  //               path="/"
  //               element={
  //                 <PublicRoute>
  //                   <App />
  //                 </PublicRoute>
  //               }
  //             >
  //               {/* NOTE: child paths are relative (no leading "/") */}
  //               <Route index element={<Login />} />
  //               <Route path="forgot-password" element={<ForgotPassword />} />
  //               <Route path="reset-password/:token" element={<ResetPassword />} />
  //               <Route path="setup-password/:token" element={<SetupPassword />} />
  //               <Route path="verify-otp/:token" element={<VerifyOtp />} />
  //             </Route>

  //             {/* --------------------------
  //                 Protected (authenticated)
  //                -------------------------- */}
  //             {/* <Route element={<ProtectedRoute />}> */}
  //               {/* User-only routes */}
  //               <Route element={<UserRoute />}>
  //                 <Route element={<DashboardRoute />}>
  //                   <Route path="management" element={<ManagementLayout />}>
  //                     <Route index element={<Dashboard />} />
  //                    </Route>
  //                 </Route>
  //               </Route>

  //             <Route element={<ManagementRoute />}>
  //               <Route path="management" element={<ManagementLayout />}>
  //                 <Route index element={<Dashboard />} />
  //                 <Route path="users" element={<UserManagement />} />
  //               </Route>
  //             </Route>



  //                 {/* UserCreatedByAdmin-only routes */}
  //                <Route element={<UserCreatedByAdminRoute />}>
  //                 <Route element={<DashboardRoute />}>
  //                   <Route path="management" element={<ManagementLayout />}>
  //                     <Route index element={<Dashboard />} />
  //                     <Route path="users" element={<UserManagement />} />
  //                    </Route>
  //                 </Route>
  //               </Route>

                
  //               {/* Admin-only routes */}
  //               {/* <Route element={<AdminRoute />}> */}
  //                 <Route element={<DashboardRoute />}>
  //                   {/* note: top-level admin path */}
                   
  //                   <Route path="admin/management" element={
  //                      <InstallationProvider><ManagementLayout /></InstallationProvider>}>
  //                     <Route index element={<Dashboard />} />
  //                     <Route path="organization" element={<DataCenterManagement />} />
  //                     <Route path="installation" element={<Installation />} />
  //                      <Route path="users" element={<UserManagement />} />
  //                   </Route>
  //                 </Route>
  //               {/* </Route> */}
  //             {/* </Route> */}
  //             <Route path="*" element={<NotFound />} />
  //           </Routes>
  //       </StoreProvider>
  //         </BrowserRouter>
  //     </PersistGate>
  //   </Provider>
  // </StrictMode>


  //  <StrictMode>
  //   <Provider store={store}>
  //     <PersistGate loading={null} persistor={persistor}>
  //       <BrowserRouter>
  //         <StoreProvider>
  //           <Routes>

  //             {/* ================= PUBLIC ================= */}
  //             {/* <Route element={<PublicRoute />}>
  //               <Route path="/" element={<App />}>
  //                 <Route index element={<Login />} />
  //                 <Route path="forgot-password" element={<ForgotPassword />} />
  //                 <Route path="reset-password/:token" element={<ResetPassword />} />
  //                 <Route path="setup-password/:token" element={<SetupPassword />} />
  //                 <Route path="verify-otp/:token" element={<VerifyOtp />} />
  //               </Route>
  //             </Route> */}


  //             {/* --------------------------
  //                 Public routes (wrapped)
  //                -------------------------- */}
  //             <Route
  //               path="/"
  //               element={
  //                 <PublicRoute>
  //                   <App />
  //                 </PublicRoute>
  //               }
  //             >
  //               {/* NOTE: child paths are relative (no leading "/") */}
  //               <Route index element={<Login />} />
  //               <Route path="forgot-password" element={<ForgotPassword />} />
  //               <Route path="reset-password/:token" element={<ResetPassword />} />
  //               <Route path="setup-password/:token" element={<SetupPassword />} />
  //               <Route path="verify-otp/:token" element={<VerifyOtp />} />
  //             </Route>


  //             {/* ================= USER (dashboard only) ================= */}
  //             <Route element={<UserRoute />}>
  //               <Route path="management" element={<ManagementLayout />}>
  //                 <Route index element={<Dashboard />} />
  //               </Route>
  //             </Route>

  //             {/* ================= MANAGER =================
  //             <Route element={<ManagementRoute />}>
              
  //               <Route path="management" element={<ManagementLayout />}>
  //                 <Route index element={<Dashboard />} />
  //                 <Route path="users" element={<UserManagement />} />
  //               </Route>
  //             </Route> */}

  //             {/* ================= ADMIN ONLY ================= */}
  //             <Route element={<ManagementRoute />}>
  //               <Route
  //                 path="admin/management"
  //                 element={
  //                   <InstallationProvider>
  //                     <ManagementLayout />
  //                   </InstallationProvider>
  //                 }
  //               >
  //                 <Route index element={<Dashboard />} />
  //                 <Route path="organization" element={<OrganizationManagement />} />
  //                 <Route path="installation" element={<Installation />} />
  //                 <Route path="users" element={<UserManagement />} />
  //               </Route>
  //             </Route>

  //             {/* ================= 404 ================= */}
  //             <Route path="*" element={<NotFound />} />

  //           </Routes>
  //         </StoreProvider>
  //       </BrowserRouter>
  //     </PersistGate>
  //   </Provider>
  // </StrictMode>


// <StrictMode>
//   <Provider store={store}>
//     <PersistGate loading={null} persistor={persistor}>
//       <BrowserRouter>
//         <StoreProvider>
//           <Routes>

//             {/* ================= PUBLIC ================= */}
//             <Route path="/" element={<PublicRoute><App /></PublicRoute>}>
//               <Route index element={<Login />} />
//               <Route path="forgot-password" element={<ForgotPassword />} />
//               <Route path="reset-password/:token" element={<ResetPassword />} />
//               <Route path="setup-password/:token" element={<SetupPassword />} />
//               <Route path="verify-otp/:token" element={<VerifyOtp />} />
//             </Route>

//             {/* ================= USER (Dashboard Only) ================= */}
//             <Route element={<UserRoute />}>
//               <Route path="management" element={<ManagementLayout />}>
//                 <Route index element={<Dashboard />} />
//               </Route>
//             </Route>

//             {/* ================= MANAGER & ADMIN ================= */}
//             <Route element={<ManagementRoute />}>
//               {/* <Route path="management" element={<ManagementLayout />}>
//                 <Route index element={<Dashboard />} />
//                 <Route path="users" element={<UserManagement />} />
//               </Route> */}

//                <Route path="management" element={<InstallationProvider><ManagementLayout /></InstallationProvider>}>
//                 <Route index element={<Dashboard />} />
//                 {/* <Route path="organization" element={<OrganizationManagement />} /> */}
//                 <Route path="installation" element={<Installation />} />
//                 <Route path="users" element={<UserManagement />} />
//               </Route>
//             </Route>

//             {/* ================= ADMIN ONLY ================= */}
//             <Route element={<AdminRoute />}>
//               <Route path="admin/management" element={<InstallationProvider><ManagementLayout /></InstallationProvider>}>
//                 <Route index element={<Dashboard />} />
//                 {/* <Route path="organization" element={<OrganizationManagement />} /> */}
//                 <Route path="installation" element={<Installation />} />
//                 <Route path="users" element={<UserManagement />} />
//               </Route>
//             </Route>

//             {/* ================= 404 ================= */}
//             <Route path="*" element={<NotFound />} />

//           </Routes>
//         </StoreProvider>
//       </BrowserRouter>
//     </PersistGate>
//   </Provider>
// </StrictMode>
// );










// Routes Not Protectoin
import './styles/global/index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import Login from './pages/Authentication/Login';
import DeviceManagement from './pages/DeviceManagement/page';
import ManagementLayout from './Layout/management/Layout';
import UserManagement from './pages/UserManagement/page';
// import OrganizationManagement from './pages/OrganizationManagement/page';
import VenueManagement from './pages/VenueManagement/page';
import Dashboard from './pages/Dashboard/page'
import App from './App';
import { Provider } from 'react-redux';
import store from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './store/store';
import { StoreProvider } from './contexts/storecontexts';
import DashboardRoute from './Routes/DashboardRoute';
import ProtectedRoute from './Routes/ProtectedRoute';
import UserRoute from './Routes/UserRoute';
import AdminRoute from './Routes/AdminRoute';
import VerifyOtp from './pages/Authentication/VerifyOtp';
import SetupPassword from './pages/Authentication/SetupPassword';
import ForgotPassword from './pages/Authentication/ForgotPassword';
import ResetPassword from './pages/Authentication/ResetPassword';
import PublicRoute from './Routes/PublicRoute';
import NotFound from './pages/NotFound';
import UserCreatedByAdminRoute from './Routes/UserCreatedByAdminRoute';
import BrandManagement from './pages/BrandManagement/page';
import AddDataCenter from './pages/OrganizationManagement/AddDataCenter';
import OrganizationManagement from './pages/OrganizationManagement/page';
import DataCenterManagement from './pages/OrganizationManagement/page';
import Installation from './pages/Installation/page';
import { InstallationProvider } from './contexts/InstallationContext';
import { ManagementRoute } from './Routes/ManagementRoute';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  //   <Provider store={store}>
  //     <PersistGate loading={null} persistor={persistor}>
  //         <BrowserRouter>
  //       <StoreProvider>
  //           <Routes>

  //             {/* --------------------------
  //                 Public routes (wrapped)
  //                -------------------------- */}
  //             <Route
  //               path="/"
  //               element={
  //                 <PublicRoute>
  //                   <App />
  //                 </PublicRoute>
  //               }
  //             >
  //               {/* NOTE: child paths are relative (no leading "/") */}
  //               <Route index element={<Login />} />
  //               <Route path="forgot-password" element={<ForgotPassword />} />
  //               <Route path="reset-password/:token" element={<ResetPassword />} />
  //               <Route path="setup-password/:token" element={<SetupPassword />} />
  //               <Route path="verify-otp/:token" element={<VerifyOtp />} />
  //             </Route>

  //             {/* --------------------------
  //                 Protected (authenticated)
  //                -------------------------- */}
  //             {/* <Route element={<ProtectedRoute />}> */}
  //               {/* User-only routes */}
  //               <Route element={<UserRoute />}>
  //                 <Route element={<DashboardRoute />}>
  //                   <Route path="management" element={<ManagementLayout />}>
  //                     <Route index element={<Dashboard />} />
  //                    </Route>
  //                 </Route>
  //               </Route>

  //             <Route element={<ManagementRoute />}>
  //               <Route path="management" element={<ManagementLayout />}>
  //                 <Route index element={<Dashboard />} />
  //                 <Route path="users" element={<UserManagement />} />
  //               </Route>
  //             </Route>



  //                 {/* UserCreatedByAdmin-only routes */}
  //                <Route element={<UserCreatedByAdminRoute />}>
  //                 <Route element={<DashboardRoute />}>
  //                   <Route path="management" element={<ManagementLayout />}>
  //                     <Route index element={<Dashboard />} />
  //                     <Route path="users" element={<UserManagement />} />
  //                    </Route>
  //                 </Route>
  //               </Route>

                
  //               {/* Admin-only routes */}
  //               {/* <Route element={<AdminRoute />}> */}
  //                 <Route element={<DashboardRoute />}>
  //                   {/* note: top-level admin path */}
                   
  //                   <Route path="admin/management" element={
  //                      <InstallationProvider><ManagementLayout /></InstallationProvider>}>
  //                     <Route index element={<Dashboard />} />
  //                     <Route path="organization" element={<DataCenterManagement />} />
  //                     <Route path="installation" element={<Installation />} />
  //                      <Route path="users" element={<UserManagement />} />
  //                   </Route>
  //                 </Route>
  //               {/* </Route> */}
  //             {/* </Route> */}
  //             <Route path="*" element={<NotFound />} />
  //           </Routes>
  //       </StoreProvider>
  //         </BrowserRouter>
  //     </PersistGate>
  //   </Provider>
  // </StrictMode>


  //  <StrictMode>
  //   <Provider store={store}>
  //     <PersistGate loading={null} persistor={persistor}>
  //       <BrowserRouter>
  //         <StoreProvider>
  //           <Routes>

  //             {/* ================= PUBLIC ================= */}
  //             {/* <Route element={<PublicRoute />}>
  //               <Route path="/" element={<App />}>
  //                 <Route index element={<Login />} />
  //                 <Route path="forgot-password" element={<ForgotPassword />} />
  //                 <Route path="reset-password/:token" element={<ResetPassword />} />
  //                 <Route path="setup-password/:token" element={<SetupPassword />} />
  //                 <Route path="verify-otp/:token" element={<VerifyOtp />} />
  //               </Route>
  //             </Route> */}


  //             {/* --------------------------
  //                 Public routes (wrapped)
  //                -------------------------- */}
  //             <Route
  //               path="/"
  //               element={
  //                 <PublicRoute>
  //                   <App />
  //                 </PublicRoute>
  //               }
  //             >
  //               {/* NOTE: child paths are relative (no leading "/") */}
  //               <Route index element={<Login />} />
  //               <Route path="forgot-password" element={<ForgotPassword />} />
  //               <Route path="reset-password/:token" element={<ResetPassword />} />
  //               <Route path="setup-password/:token" element={<SetupPassword />} />
  //               <Route path="verify-otp/:token" element={<VerifyOtp />} />
  //             </Route>


  //             {/* ================= USER (dashboard only) ================= */}
  //             <Route element={<UserRoute />}>
  //               <Route path="management" element={<ManagementLayout />}>
  //                 <Route index element={<Dashboard />} />
  //               </Route>
  //             </Route>

  //             {/* ================= MANAGER =================
  //             <Route element={<ManagementRoute />}>
              
  //               <Route path="management" element={<ManagementLayout />}>
  //                 <Route index element={<Dashboard />} />
  //                 <Route path="users" element={<UserManagement />} />
  //               </Route>
  //             </Route> */}

  //             {/* ================= ADMIN ONLY ================= */}
  //             <Route element={<ManagementRoute />}>
  //               <Route
  //                 path="admin/management"
  //                 element={
  //                   <InstallationProvider>
  //                     <ManagementLayout />
  //                   </InstallationProvider>
  //                 }
  //               >
  //                 <Route index element={<Dashboard />} />
  //                 <Route path="organization" element={<OrganizationManagement />} />
  //                 <Route path="installation" element={<Installation />} />
  //                 <Route path="users" element={<UserManagement />} />
  //               </Route>
  //             </Route>

  //             {/* ================= 404 ================= */}
  //             <Route path="*" element={<NotFound />} />

  //           </Routes>
  //         </StoreProvider>
  //       </BrowserRouter>
  //     </PersistGate>
  //   </Provider>
  // </StrictMode>


<StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <StoreProvider>
       <Routes>

  {/* ================= PUBLIC ================= */}
  <Route path="/" element={<PublicRoute><App /></PublicRoute>}>
    <Route index element={<Login />} />
    <Route path="forgot-password" element={<ForgotPassword />} />
    <Route path="reset-password/:token" element={<ResetPassword />} />
    <Route path="setup-password/:token" element={<SetupPassword />} />
    <Route path="verify-otp/:token" element={<VerifyOtp />} />
  </Route>

  {/* ================= USER + MANAGER ================= */}
  <Route element={<ManagementRoute />}>
    <Route
      path="management"
      element={
        <InstallationProvider>
          <ManagementLayout />
        </InstallationProvider>
      }
    >
      <Route index element={<Dashboard />} />

      {/* MANAGER ONLY */}
      <Route path="users" element={<UserManagement />} />
      <Route path="installation" element={<Installation />} />
    </Route>
  </Route>

  {/* ================= ADMIN ONLY ================= */}
  <Route element={<AdminRoute />}>
    <Route
      path="admin/management"
      element={
        <InstallationProvider>
          <ManagementLayout />
        </InstallationProvider>
      }
    >
      <Route index element={<Dashboard />} />
      <Route path="users" element={<UserManagement />} />
      <Route path="installation" element={<Installation />} />
    </Route>
  </Route>

  <Route path="*" element={<NotFound />} />

</Routes>

        </StoreProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
</StrictMode>
);




