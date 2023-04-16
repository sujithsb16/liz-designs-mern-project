import React from 'react'
import Cards from '../../Components/UserComponents/Cards'
import NewArrivals from '../../Components/UserComponents/NewArrivals'
import Footer from '../../Layouts/UserFooter'
import Header from '../../Layouts/UserHeader'

const UserShop = () => {

  const shopCards =  {position: "relative",
                  margin: "10px",
                  borderRadius: 5,
                  bgcolor: "warning.main",
                height:"18rem",
              width:"15rem",
            marginLeft:"2.5rem"}

  return (
    <div>
      <Header />
      <NewArrivals text={"Happy Shopping"} />
      <Cards isSmall shopCards={shopCards} />
      <Cards isSmall shopCards={shopCards} />
      <Footer />
    </div>
  );
}

export default UserShop
