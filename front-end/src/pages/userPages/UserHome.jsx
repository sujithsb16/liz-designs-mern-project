import React, { useCallback, useEffect, useState } from "react";
import Banner from "../../Components/UserComponents/Banner";
import Cards from "../../Components/UserComponents/Cards";
import Header from "../../Layouts/UserHeader";
import Footer from "../../Layouts/UserFooter";
import { userProductList } from "../../apiCalls/userApiCalls";

function UserHome() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);

  const homeCards = {
    position: "relative",
    borderRadius: 5,
    bgcolor: "warning.main",
    height: "18rem",
    width: "15rem",
  };

  let vendorId = null

  const getProduct = useCallback(async () => {
    try {
      setLoading(true);
      const result = await userProductList(setLoading, page, limit, vendorId);
      if (result.data) {
        console.log("test 4 ");
        console.log(result.data);
        setProducts(result.data.result.slice(0, 4)); // set only first 4 elements
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
    <>
      <Header />
      <Banner />
      {/* <NewArrivals text={"New Arrivals"} /> */}
      <Cards homeCards={homeCards} products={products} />
      <Footer />
    </>
  );
}

export default UserHome;
