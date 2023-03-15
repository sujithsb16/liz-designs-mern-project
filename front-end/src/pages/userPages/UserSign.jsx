import React from 'react'
import SignIn from '../../Components/UserComponents/SignIn'
import Footer from '../../Layouts/UserFooter'
import Header from '../../Layouts/UserHeader'

const UserSign = () => {
  return (
    <div>
       <Header/>
       <SignIn/>
       <Footer/>  
    </div>
  )
}

export default UserSign
