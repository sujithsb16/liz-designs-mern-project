import React from 'react'
import AdminSidebar from '../../Components/AdminComponents/AdminSidebar';
import AdminOrders from '../../Components/AdminComponents/AdminOrders';

const AdminOrderPage = () => {
  return (
    <>
      <AdminSidebar props={<AdminOrders />} />
    </>
  );
}

export default AdminOrderPage
