import React from 'react'
import Banner from '../../Components/UserComponents/Banner'
import Cards from '../../Components/UserComponents/Cards'
import Header from '../../Layouts/UserHeader'
import Footer from '../../Layouts/UserFooter'
import NewArrivals from '../../Components/UserComponents/NewArrivals'
function UserHome() {
  const homeCards = {
    position: "relative",
    margin: "10px",
    borderRadius: 5,
    bgcolor: "warning.main",
    height: "18rem",
    width: "15rem",
    marginLeft: "2.5rem",
  };

  return (
    <>
      <Header />
      <Banner />
      <NewArrivals text={"New Arrivals"} />
      <Cards homeCards={homeCards} />
      <Footer />
    </>
  );
}
  
  export default UserHome