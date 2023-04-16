import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RequestPendingPage from '../../Components/VenderComponents/RequestPending';
import VenderSignIn from '../../pages/VenderPages/VenderSignIn';
import VenderSignupPage from '../../pages/VenderPages/VenderSignupPage';
import VenderRequestPendingPage from '../../pages/VenderPages/VenderRequestPendingPage';
import VenderHomePage from '../../pages/VenderPages/VenderHomePage';
import VenderAddProductsPage from '../../pages/VenderPages/VenderAddProductsPage';
const VenderRoutes = () => {

    

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/vendersignin" element={<VenderSignIn />} />
          <Route path="/vender" element={<VenderSignIn />} />
          <Route path="/vendersignup" element={<VenderSignupPage />} />
          <Route
            path="/venderVerification"
            element={<VenderRequestPendingPage />}
          />
          <Route
            path="/venderhome"
            element={<VenderHomePage />}
          />
          <Route
            path="/vender/addproducts"
            element={<VenderAddProductsPage />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default VenderRoutes
