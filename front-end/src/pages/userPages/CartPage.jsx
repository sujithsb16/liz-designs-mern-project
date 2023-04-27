import React, { useCallback, useEffect, useState } from 'react'
import Header from "../../Layouts/UserHeader";
import UserFooter from "../../Layouts/UserFooter";
import Cart from '../../Components/UserComponents/Cart';
import { cartProductList, userProductList } from '../../apiCalls/userApiCalls';
import { useSelector } from 'react-redux';










const CartPage = () => {

     const [loading, setLoading] = useState(false);
     const [cartProducts, setCartProducts] = useState([]);
     const [error, setError] = useState(false);

     const user = useSelector((state) => state.userLogin);
     const token = user.userInfo.token;


     const getCartProduct = useCallback(async () => {
       try {
         setLoading(true);
         const result = await cartProductList(token,setLoading);
         if (result.data) {
           console.log("test 4 ");
        //    console.log(result.data);
           setCartProducts(result.data);
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
       getCartProduct();
     }, [getCartProduct]);




  return (
    <>
      <Header />
      <Cart cartItems={cartProducts} />
      <UserFooter />
    </>
  );
}

export default CartPage
