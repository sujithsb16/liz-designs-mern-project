import React from 'react'
import AdminSidebar from '../../Components/AdminComponents/AdminSidebar'
import Table from '../../Components/AdminComponents/VendorTable'
import VenderTable from '../../Components/AdminComponents/VendorTable'
import ChartComponent from '../../Components/AdminComponents/ChartComponents'
import Chartjs from '../../Components/AdminComponents/Chartjs'


const AdminDashboard = () => {
  const test = true;
  return (
    <>
      <AdminSidebar isActive={"dashboard"} chart={<ChartComponent />} orderChart={<Chartjs/>} />
      {/* <Table/> */}
    </>
  );
}

export default AdminDashboard
