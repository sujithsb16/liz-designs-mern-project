import React, { Fragment } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import UserRegister from '../../pages/userPages/UserRegister';
import UserHome from '../../pages/userPages/UserHome';
import UserShop from '../../pages/userPages/UserShop';
import UserSign from '../../pages/userPages/UserSign';
import { useSelector } from 'react-redux';
const UserRoutes = () => {

   const ProtectedRoute = ({ children }) => {
     const isAuthenticated = useSelector((state) => state.userLogin.userInfo);
     // Add your authentication logic here
     // const isAuthenticated = true; // Example: hardcoded as authenticated
     return isAuthenticated ? (
       // Render the protected component if authenticated
       children
     ) : (
       // Redirect to login page if not authenticated
       <Navigate to="/usersignin" replace={true} />
     );
   };


  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserHome />} />
          <Route path="/shop" element={<UserShop />} />
          <Route path="/usersignin" element={<UserSign />} />
          <Route path="/usersignup" element={<UserRegister />} />

          <Route
            path=""
            element={
              <ProtectedRoute>
             
              </ProtectedRoute>
            }
          />
          

        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default UserRoutes
