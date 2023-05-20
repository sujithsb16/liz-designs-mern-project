import React from 'react'
import Header from '../../Layouts/UserHeader';
import Wishlist from '../../Components/UserComponents/Wishlist';
import UserFooter from '../../Layouts/UserFooter';

const WishListPage = () => {
  return (
    <>
      <Header />
      <Wishlist/>
      <UserFooter/>
    </>
  );
}

export default WishListPage
