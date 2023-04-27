import React from 'react'
import AdminSidebar from '../../Components/AdminComponents/AdminSidebar'
import ProductTable from '../../Components/AdminComponents/ProductTable'

const AdminProductPage = () => {
  return (
    <>
      <AdminSidebar props={<ProductTable/>} />
    </>
  )
}

export default AdminProductPage
