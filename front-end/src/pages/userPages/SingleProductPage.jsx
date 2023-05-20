import React from 'react'
import Header from '../../Layouts/UserHeader'
import SingleComponent from '../../Components/UserComponents/SingleComponent';
import UserFooter from '../../Layouts/UserFooter';
import Checkout from '../../Components/UserComponents/Checkout';

const SingleProductPage = () => {
  return (
    <>
    <Header/>
    <SingleComponent/>
    {/* <Checkout/> */}
        <UserFooter/>
    </>
  )
}

export default SingleProductPage;
