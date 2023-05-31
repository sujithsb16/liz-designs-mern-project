import React from 'react'
import AdminSidebar from '../../Components/AdminComponents/AdminSidebar'
import Table from '../../Components/AdminComponents/VendorTable'
import VenderTable from '../../Components/AdminComponents/VendorTable'
import ChartComponent from '../../Components/AdminComponents/ChartComponents'


const AdminDashboard = () => {
  const test = true;
  return (
    <>
      <AdminSidebar isActive={"dashboard"} props={<ChartComponent />} />
      {/* <Table/> */}
    </>
  );
}

export default AdminDashboard
