import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AdminDashboard from '../../pages/adminPages/AdminDashboard';
import AdminSignIn from '../../pages/adminPages/AdminSignIn';
import AdminUserPage from '../../pages/adminPages/AdminUserPage';
import AdminVendorPage from '../../pages/adminPages/AdminVendorPage';
import { useSelector } from 'react-redux';
import AdminCategoryPage from '../../pages/adminPages/AdminCategoryPage';
import AdminProductPage from '../../pages/adminPages/AdminProductPage';
import AdminBannerPage from '../../pages/adminPages/AdminBannerPage';
import AdminCouponPage from '../../pages/adminPages/AdminCouponPage';
import AdminOrderPage from '../../pages/adminPages/AdminOrderPage';


const ProtectedRoute = ({ children }) => {
  
  const isAuthenticated = useSelector((state) => state.adminLogin.adminInfo);
  
   return isAuthenticated ? (
    
     children
   ) : (
     // Redirect to login page if not authenticated
     <Navigate to="/admin/" replace={true} />
   );
 };

 const ConditionalRendering = ({ isAuthenticated, children }) => {



   return isAuthenticated ? (
     // Render the AdminDashboard component if authenticated
     <AdminDashboard />
   ) : (
     // Render the AdminSignIn component if not authenticated
     <AdminSignIn />
   );
 };

const AdminRoutes = () => {
  const isAuthenticated = useSelector((state) => state.adminLogin.adminInfo);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/admin/adminsignin" element={<AdminSignIn />} />
          <Route
            path="/admin"
            element={<ConditionalRendering isAuthenticated={isAuthenticated} />}
          />
          {/* <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}
          {/* <Route path="/admin/users" element={<AdminUserPage />} />
          <Route path="/admin/tailors" element={<AdminVendorPage />} /> */}

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/users"
            element={
              <ProtectedRoute>
                <AdminUserPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/tailors"
            element={
              <ProtectedRoute>
                <AdminVendorPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/category"
            element={
              <ProtectedRoute>
                <AdminCategoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <ProtectedRoute>
                <AdminProductPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/banner"
            element={
              <ProtectedRoute>
                <AdminBannerPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/coupon"
            element={
              <ProtectedRoute>
                <AdminCouponPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <ProtectedRoute>
                <AdminOrderPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default AdminRoutes
