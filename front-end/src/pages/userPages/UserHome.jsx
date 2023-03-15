import React from 'react'
import Banner from '../../Components/UserComponents/Banner'
import Cards from '../../Components/UserComponents/Cards'
import Header from '../../Layouts/UserHeader'
import Footer from '../../Layouts/UserFooter'
import NewArrivals from '../../Components/UserComponents/NewArrivals'
function UserHome() {
    return (
      <>
      <Header/>
      <Banner/>
      <NewArrivals/>
      <Cards/>
      <Footer/>
         
      </>
    )
  }
  
  export default UserHome