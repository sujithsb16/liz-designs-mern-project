import React from 'react'
import Header from "../../Layouts/UserHeader";
import UserFooter from '../../Layouts/UserFooter';
import OrderSuccessPage from '../../Components/UserComponents/OrderSuccessPage';


const OrderDeatailPage = () => {
  return (
    <>
      <Header />
      <OrderSuccessPage/>
      <UserFooter />
    </>
  );
}

export default OrderDeatailPage
