import React, { Fragment } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import UserRegister from '../../pages/userPages/UserRegister';
import UserHome from '../../pages/userPages/UserHome';
import UserShop from '../../pages/userPages/UserShop';
import UserSign from '../../pages/userPages/UserSign';
import { useSelector } from 'react-redux';
import SingleProduct from '../../pages/userPages/SingleProductPage';
import CartPage from '../../pages/userPages/CartPage';
import CheckoutPage from '../../pages/userPages/CheckoutPage';
import UserProfilePage from '../../pages/userPages/UserProfilePage';
import WishListPage from '../../pages/userPages/WishListPage';
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
          <Route path="/singleproduct/:id" element={<SingleProduct />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          {/* <Route path='/profile' element={<UserProfilePage/>}/> */}
          <Route path="/wishlist" element={<WishListPage />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UserProfilePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default UserRoutes
