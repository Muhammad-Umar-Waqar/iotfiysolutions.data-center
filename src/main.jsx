

// Routes Not Protectoin
import './styles/global/index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import Login from './pages/Authentication/Login';
// import DeviceManagement from './pages/DeviceManagement/page';
import ManagementLayout from './Layout/management/Layout';
import UserManagement from './pages/UserManagement/page';
import Dashboard from './pages/Dashboard/page'
import App from './App';
import { Provider } from 'react-redux';
import store from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './store/store';
import { StoreProvider } from './contexts/storecontexts';
import AdminRoute from './Routes/AdminRoute';
import VerifyOtp from './pages/Authentication/VerifyOtp';
import SetupPassword from './pages/Authentication/SetupPassword';
import ForgotPassword from './pages/Authentication/ForgotPassword';
import ResetPassword from './pages/Authentication/ResetPassword';
import PublicRoute from './Routes/PublicRoute';
import NotFound from './pages/NotFound';
// import DashboardRoute from './Routes/DashboardRoute';
// import ProtectedRoute from './Routes/ProtectedRoute';
// import UserRoute from './Routes/UserRoute';
// import UserCreatedByAdminRoute from './Routes/UserCreatedByAdminRoute';
// import AddDataCenter from './pages/OrganizationManagement/AddDataCenter';
// import OrganizationManagement from './pages/OrganizationManagement/page';
// import DataCenterManagement from './pages/OrganizationManagement/page';
// import SetupPassword from './pages/Authentication/SetupPassword';
import Installation from './pages/Installation/page';
import { InstallationProvider } from './contexts/InstallationContext';
import { ManagementRoute } from './Routes/ManagementRoute';
import RouteSelectionWatcher from './components/RouteSelectionWatcher';



createRoot(document.getElementById('root')).render(
  
<StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <StoreProvider>

          {/* 👇 ADD IT HERE (GLOBAL) */}
          <RouteSelectionWatcher />

          <Routes>
            {/* ================= PUBLIC ================= */}
            <Route path="/" element={<PublicRoute><App /></PublicRoute>}>
              <Route index element={<Login />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="setup-password/:token" element={<SetupPassword />} />
              <Route path="reset-password/:token" element={<ResetPassword />} />
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




