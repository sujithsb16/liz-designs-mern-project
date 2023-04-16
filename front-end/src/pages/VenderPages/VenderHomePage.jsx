import React from 'react'
import VenderHeader from "../../Layouts/VenderHeader";
import VenderHome from '../../Components/VenderComponents/VenderHome';

const VenderHomePage = () => {

  const homeCards = {
    position: "relative",
    margin: "0vw",
    borderRadius: 5,
    bgcolor: "warning.main",
    height: "44vh",
    width: "16.5vw",
    marginLeft: "2.5rem",
    marginTop: "10vh",
  };

  return (
    <>
      <VenderHeader />
    <VenderHome homeCards={homeCards} />
    </>
  )
}

export default VenderHomePage
