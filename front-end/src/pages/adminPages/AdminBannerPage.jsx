import React from 'react'
import AdminSidebar from '../../Components/AdminComponents/AdminSidebar'
import AdminBanner from '../../Components/AdminComponents/AdminBanner'

const AdminBannerPage = () => {
  return (
    <>
    <AdminSidebar props={<AdminBanner/>} />
      
    </>
  )
}

export default AdminBannerPage
