import React from 'react'
import AdminSidebar from '../../Components/AdminComponents/AdminSidebar'
import VendorTable from '../../Components/AdminComponents/VendorTable'

const AdminVendorPage = () => {
  return (
    <>
      <AdminSidebar props={<VendorTable/>} />
    </>
  )
}

export default AdminVendorPage
