import React, { useCallback, useEffect, useState } from 'react'
import Cards from '../../Components/UserComponents/Cards'
import Footer from '../../Layouts/UserFooter'
import Header from '../../Layouts/UserHeader'
import { userProductList, wishlistProductList } from '../../apiCalls/userApiCalls'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const UserShop = () => {

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  let { vendorId } = useParams();

  const user = useSelector((state) => state.userLogin);
  const token = user?.userInfo?.token;

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
console.log(page,limit);
  const shopCards =  {position: "relative",
                  
                  borderRadius: 5,
                  bgcolor: "warning.main",
                height:"18rem",
              width:"15rem",
          }

            const getProduct = useCallback(async () => {
              try {
                setLoading(true);
                const result = await userProductList(
                  setLoading,
                  page,
                  limit,
                  vendorId,
                );
                if (result.data) {
                  console.log("test 4 ");
                  console.log(result.data);
                  setProducts(result.data.result);
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
            }, [setLoading, vendorId, page, limit]);

            useEffect(() => {
              getProduct();
            }, [getProduct, page,limit]);

            ////////////////////

           




  return (
    <div>
      <Header />
      {/* <NewArrivals text={"Happy Shopping"} /> */}
      <Cards
        isSmall
        shopCards={shopCards}
        products={products}
        vendorId={vendorId}
        setPage={setPage}
        page={page}
        limit={limit}
        isShop
      />
      <Footer />
    </div>
  );
}

export default UserShop
