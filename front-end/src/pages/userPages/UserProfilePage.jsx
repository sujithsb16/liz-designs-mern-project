import React from 'react'
import Header from "../../Layouts/UserHeader";
import UserFooter from "../../Layouts/UserFooter";
import UserProfile from '../../Components/UserComponents/UserProfile';

const UserProfilePage = () => {
  return (
    <>
      <Header style={{ flexShrink: 0 }} />
      {/* Your page content here */}
      <UserProfile/>
      <UserFooter style={{ flexGrow: 0 }} />
    </>
  );
}

export default UserProfilePage
