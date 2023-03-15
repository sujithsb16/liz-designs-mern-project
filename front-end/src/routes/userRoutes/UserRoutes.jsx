import React, { Fragment } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserRegister from '../../pages/userPages/UserRegister';
import UserHome from '../../pages/userPages/UserHome';
import UserShop from '../../pages/userPages/UserShop';
import UserSign from '../../pages/userPages/UserSign';
const UserRoutes = () => {
  return (
  <Fragment>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<UserHome/>}/>
      <Route path='/shop' element={<UserShop/>}/>
      <Route path='/usersignin' element={<UserSign/>}/>
      <Route path='/usersignup' element={<UserRegister/>}/>
    </Routes> 
    </BrowserRouter>    
  </Fragment>
  )
}

export default UserRoutes
