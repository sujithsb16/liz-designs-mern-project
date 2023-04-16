import React from 'react'
import AdminSidebar from '../../Components/AdminComponents/AdminSidebar'
import VenderTable from '../../Components/AdminComponents/VenderTable'

const AdminVenderPage = () => {
  return (
    <>
      <AdminSidebar props={<VenderTable/>} />
    </>
  )
}

export default AdminVenderPage
