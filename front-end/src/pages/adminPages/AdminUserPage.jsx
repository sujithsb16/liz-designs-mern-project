import React from 'react'
import AdminSidebar from '../../Components/AdminComponents/AdminSidebar'
import Tables from '../../Components/AdminComponents/VenderTable'
import UserTable from '../../Components/AdminComponents/UserTable'

const AdminUserPage = () => {
  return (
    <>
    <AdminSidebar   props={<UserTable/>} />
    {/* <Tables/> */}
      
    </>
  )
}

export default AdminUserPage
