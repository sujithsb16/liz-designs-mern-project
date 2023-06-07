import React from 'react'
import VendorHeader from "../../Layouts/VendorHeader";
import VendorHome from '../../Components/VendorComponents/VendorHome';

const VendorHomePage = () => {

  const homeCards = {
    // position: "relative",
    // margin: "0vw",
    // borderRadius: 5,
    // bgcolor: "warning.main",
    // height: "44vh",
    // width: "16.5vw",
    // marginLeft: "2.5rem",
    // marginTop: "10vh",
  };

  return (
    <>
      <VendorHeader />
    <VendorHome homeCards={homeCards} />
    </>
  )
}

export default VendorHomePage
