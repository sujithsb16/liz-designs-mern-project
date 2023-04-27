import React, { useCallback, useEffect, useState } from 'react'
import Cards from '../../Components/UserComponents/Cards'
import NewArrivals from '../../Components/UserComponents/NewArrivals'
import Footer from '../../Layouts/UserFooter'
import Header from '../../Layouts/UserHeader'
import { userProductList } from '../../apiCalls/userApiCalls'

const UserShop = () => {

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const shopCards =  {position: "relative",
                  margin: "10px",
                  borderRadius: 5,
                  bgcolor: "warning.main",
                height:"18rem",
              width:"15rem",
            marginLeft:"2.5rem"}

            const getProduct = useCallback(async () => {
              try {
                setLoading(true);
                const result = await userProductList(setLoading);
                if (result.data) {
                  console.log("test 4 ");
                  console.log(result.data);
                  setProducts(result.data);
                } else {
                  setError(true);
                  setTimeout(() => {
                    setError(false);
                  }, 4000);
                  setLoading(false);
                  console.log(result);
                }
                setLoading(false);
              } catch (error) {}
            }, []);

            useEffect(() => {
              getProduct();
            }, [getProduct]);




  return (
    <div>
      <Header />
      {/* <NewArrivals text={"Happy Shopping"} /> */}
      <Cards isSmall shopCards={shopCards} products={products} isShop />
      <Footer />
    </div>
  );
}

export default UserShop
