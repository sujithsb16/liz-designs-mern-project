import React from 'react'
import Cards from '../../Components/UserComponents/Cards'
import Footer from '../../Layouts/UserFooter'
import Header from '../../Layouts/UserHeader'

const UserShop = () => {
  return (
    <div>
        <Header/>
        <Cards isSmall/>
        <Cards isSmall/>
        <Footer/>      
    </div>
  )
}

export default UserShop
