import React, { useCallback, useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Autocomplete,
} from "@mui/material";
import { useSelector } from "react-redux";
import { addAddressApi, buildOrder, getUserApi, paymentApi } from "../../apiCalls/userApiCalls";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CloseIcon from "@mui/icons-material/Close";
import StripCheckout from "react-stripe-checkout"
import { axiosUserInstance } from "../../utility/axios";
import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js"
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useFormik } from "formik";
import { userAddressSchema } from "../../schema/Validation";
import { useNavigate } from "react-router-dom";

const styles = {
  paper: {
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 4px rgba(0,0,0,.2)",
  },
  addressContainer: {
    marginTop: "20px",
    marginBottom: "40px",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 2px 4px rgba(0,0,0,.2)",
  },
  addressItem: {
    marginBottom: "10px",
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: "#f5f5f5",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#e0e0e0",
    },
  },
  paymentMethodContainer: {
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 2px 4px rgba(0,0,0,.2)",
  },
  payButton: {
    marginTop: "20px",
    borderRadius: "5px",
  },
  couponContainer: {
    margin: "30px 0",
  },
  couponInputContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent:"center",
    marginTop: 10,
    "& > *": {
      marginRight: 10,
    },
  },
};

const initialAddress = {
  title: "",
  address: "",
  city: "",
  state: "",
  zip: "",
};

const MySwal = withReactContent(Swal);

const Checkout = () => {
  const [selectedAddress, setSelectedAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const handleAddressSelect = (index) => {
    setSelectedAddress(index);
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };
/////////////////////////////////////////////////
  const [value, setValue] = useState(0);
  const [error, setError] = useState(false);
  const [userUpdateSuccess, setUserUpdateSuccess] = useState(false);
  const [addAddressSuccess, setAddAddressSuccess] = useState(false);
  const [couponSuccess, setCouponSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [coupon, setCoupon] = useState([]);
  const [activatedCoupons, setActivatedCoupons] = useState([])
  const [user, setUser] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState("")
  const [discount, setDiscount] = useState("")
  const [clientSecret, setClientSecret] = useState("")
   const navigate = useNavigate();

  ///////////////////////////////////////////////////
  const token = useSelector((state) => state.userLogin.userInfo.token);
  const userInfo = useSelector((state) => state.userLogin.userInfo);
  let userToken = token;
     const [open, setOpen] = useState(false);

  ///////////////////////////////////////////////////

    const elements = useElements();
    const stripe = useStripe();

  ///////////////////////////////////////////////////////

  console.log(paymentMethod);

  const handleApplyCoupon = async()=>{

   const appliedCoupon = activatedCoupons.find(({ name }) => name === coupon);
console.log( appliedCoupon);

   if (appliedCoupon) {
    setAppliedCoupon(appliedCoupon)
     let discount = 0;

     if (appliedCoupon.type === "flat") {
       discount = appliedCoupon.discount;
     } else if (appliedCoupon.type === "upto") {
       const maxDiscount = Math.min(
         totalPrice * (appliedCoupon.discount / 100),
         appliedCoupon.maxDiscount
       );
       discount = maxDiscount;
       setDiscount(discount)
     }

     const discountedPrice = totalPrice - discount;
     setTotalPrice(discountedPrice);
   }

    // setDiscount(coupon.discount);
    
  }

  


   const handleRemoveCoupon = async () => {
     const appliedCoupon = activatedCoupons.find(({ name }) => name === coupon);
     console.log(appliedCoupon);

     if (appliedCoupon) {
       setAppliedCoupon("");
       let discount = 0;

       if (appliedCoupon.type === "flat") {
         discount = appliedCoupon.discount;
       } else if (appliedCoupon.type === "upto") {
         const maxDiscount = Math.min(
           totalPrice * (appliedCoupon.discount / 100),
           appliedCoupon.maxDiscount
         );
         discount = maxDiscount;
       }

       const discountedPrice = totalPrice + discount;
       setTotalPrice(discountedPrice);
     }

     // setDiscount(coupon.discount);
   };

  // console.log(totalPrice);

  ////////////////////////////////////////////////////

  const payNow = async token => {
    try {
      setLoading(true);
      const paymentToken = token;
      const result = await paymentApi(
        totalPrice,
        paymentToken,
        userToken
      );

       if (result.status === 200) {
        // handleSuccess();
      }
   

    } catch (error) {
      //  handleFailure();
       console.log(error);
      
    }
  }

  const priceForStripe = totalPrice * 100;
  ////////////////////////////////////////////////////////
  const formikAddress = useFormik({
    initialValues: initialAddress,
    validationSchema: userAddressSchema,
    onSubmit: (values) => {
      const address = {
        title: values.title,
        address: values.address,
        state: values.state,
        city: values.city,
        zip: values.zip,
      };

      addAddress(address);

      // submitHandler();

      console.log("values");
    },
  });

  ////////////////////////////////////////////////////////
  const addAddress = async (address) => {
    try {
      setLoading(true);
      const result = await addAddressApi(token, address, setLoading);
      if (result.data) {
        console.log("test 4 ");
        console.log(result.data);
               setOpen(false);
        setAddAddressSuccess(!addAddressSuccess);
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
  };
  ////////////////////////////////////////////////////////


  /////////////////////////////////////////////////////////
  const getUser = useCallback(async () => {
    try {
      setLoading(true);
      const result = await getUserApi(token, setLoading);
      if (result.data) {
        console.log("test 4 ");
        console.log(result.data);
        setUser(result.data);
        setActivatedCoupons(result.data.activatedCoupons)
        setCartItems(result.data.cart.items)
        setTotalPrice(result.data.cart.totalPrice)
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
  }, [token, setLoading]);
  ///////////////////////////////////////////////////////

  
     const handleClickOpen = () => {
       setOpen(true);
     };

     const handleClose = () => {
       setOpen(false);
     };


  //////////////////////////////////////////////////////
  
  // console.log(coupon);
  
  // console.log(options);
  
  const options = activatedCoupons
    .filter(({ isBlocked }) => !isBlocked)
    .map(({ name }) => ({ label: name }));
  
    // console.log(options);
  
  
  // console.log(activatedCoupons[0]?._id);
//  const unblockedCoupons = activatedCoupons.filter(
//    (coupon) => !coupon.isBlocked
//  );

  //////////////////////////////////////////////////////

  ///////////////////order management//////////////////

  const handlePlaceOrder = async() =>{
    try {
      setLoading(true);
      console.log(selectedAddress);
      const orderAddress = addresses[selectedAddress];

      if (paymentMethod === "credit_card"){
const result = await buildOrder(
  token,
  totalPrice,
  orderAddress,
  appliedCoupon,
  discount,
  paymentMethod,
  setLoading
);
if (result) {
  console.log("2000");
 await stripe.confirmCardPayment(clientSecret, {
  payment_method:{
    card:elements.getElement(CardElement)
  }
  
 }).then((result) => {
  MySwal.fire({
    icon: "success",
    title: "Payment was successful",
    time: 4000,
  }).then(()=>navigate(`/orderdetails/${result.data.order._id}`)
);
 }).catch((err) => console.warn(err))
} else {
  setError(true);
  setTimeout(() => {
    setError(false);
  }, 4000);
  setLoading(false);
  console.log(result);
}


      }else{
        const result = await buildOrder(
          token,
          totalPrice,
          orderAddress,
          appliedCoupon,
          discount,
          paymentMethod,
          setLoading
        );
        console.log(result);
        if (result.data) {
          console.log("test 4 ");
          console.log(result.data);
           MySwal.fire({
             icon: "success",
             title: result.message,
             time: 4000,
           }).then(() => {
             navigate(`/orderdetails/${result.data.order._id}`);
           });
        } else {
          setError(true);
          setTimeout(() => {
            setError(false);
          }, 4000);
          setLoading(false);
          console.log(result);
           }
      }      
       
        setLoading(false);
    } catch (error) {}

  }

  ////////////////////////////////////////////////////

  /////////////////////////////////////////////////////

   useEffect(() => {
     getUser();
     // getUser();
   }, [getUser, addAddressSuccess]);

   useEffect(() => {
     const fetchClientSecret = async () => {
       console.log(totalPrice);
       const data = await axiosUserInstance.post("/payment/create", {
         amount: totalPrice,
       });
       if (data?.data) {
         setClientSecret(data.data.clientSecret);
       }
     };

     if (paymentMethod === "credit_card") {
       fetchClientSecret();
     }
   }, [totalPrice, paymentMethod]);

  

   console.log(user.addresses);

const addresses =  user.addresses
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      padding={3}
      backgroundColor="info.main"
    >
      <Grid item xs={11} md={8} lg={6}>
        <Paper style={styles.paper}>
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ fontFamily: "Inria Serif" }}
          >
            Checkout
          </Typography>
          <div style={styles.addressContainer}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontFamily: "Inria Serif" }}
            >
              Select Address
            </Typography>
            {addresses &&
              addresses.map((address, index) => (
                <div
                  key={index}
                  style={{
                    ...styles.addressItem,
                    backgroundColor:
                      selectedAddress === index ? "#e0e0e0" : "#f5f5f5",
                  }}
                  onClick={() => handleAddressSelect(index)}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ fontFamily: "Roboto", fontSize: 16 }}
                  >
                    {address.title}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontFamily: "Roboto", fontSize: 16 }}
                  >
                    {address.address}, {address.city}, {address.state}{" "}
                    {address.zip}
                  </Typography>
                </div>
              ))}
            <Button onClick={handleClickOpen}>Add Address</Button>
          </div>

          <div style={styles.paymentMethodContainer}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontFamily: "Inria Serif" }}
            >
              Payment Method
            </Typography>
            <FormControl
              component="fieldset"
              style={{ fontFamily: "Roboto", fontSize: 16 }}
            >
              <RadioGroup
                aria-label="payment method"
                name="paymentMethod"
                value={paymentMethod}
                sx={{ fontFamily: "Roboto", fontSize: 16 }}
                onChange={handlePaymentMethodChange}
              >
                <FormControlLabel
                  sx={{ fontFamily: "Roboto", fontSize: 16 }}
                  value="cod"
                  control={<Radio />}
                  style={{ fontFamily: "Roboto", fontSize: 16 }}
                  label="Cash on Delivery"
                />
                <FormControlLabel
                  value="credit_card"
                  sx={{ fontFamily: "Roboto", fontSize: 16 }}
                  control={<Radio />}
                  label="Credit Card"
                />
              </RadioGroup>
            </FormControl>
            {paymentMethod === "credit_card" && <CardElement />}
          </div>
          <div style={styles.couponContainer}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontFamily: "Inria Serif" }}
            >
              Apply Coupon
            </Typography>
            <div style={styles.couponInputContainer}>
              {appliedCoupon ? (
                <Typography
                  variant="h6"
                  gutterBottom
                  color={"green"}
                  sx={{ fontFamily: "Roboto", fontSize: 16 }}
                >
                  Coupon Appllied{" "}
                </Typography>
              ) : (
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={options}
                  value={coupon}
                  onChange={(event, newValue) => {
                    setCoupon(newValue ? newValue.label : ""); // set the selected value in state
                  }}
                  getOptionSelected={(option, value) =>
                    option.label === value.label
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Coupon Code"
                      size="small"
                      sx={{ width: "15vw" }}
                    />
                  )}
                />
              )}

              {appliedCoupon ? (
                <CloseIcon
                  variant="contained"
                  color="error"
                  sx={{ marginLeft: 2, marginTop: 0.1 }}
                  onClick={handleRemoveCoupon}
                >
                  Remove
                </CloseIcon>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ marginLeft: 2, marginTop: 0.1 }}
                  onClick={handleApplyCoupon}
                >
                  Apply
                </Button>
              )}
            </div>
          </div>
          <div style={styles.billingDetailsContainer}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontFamily: "Inria Serif" }}
            >
              Billing Details
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontFamily: "Roboto", fontSize: 16 }}>
                      Product
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ fontFamily: "Roboto", fontSize: 16 }}
                    >
                      Quantity
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ fontFamily: "Roboto", fontSize: 16 }}
                    >
                      Price
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ fontFamily: "Roboto", fontSize: 16 }}
                      >
                        {item.productId.name}
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ fontFamily: "Roboto", fontSize: 16 }}
                      >
                        {item.qty}
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ fontFamily: "Roboto", fontSize: 16 }}
                      >
                        ₹ {item.qty * item.price}
                      </TableCell>
                    </TableRow>
                  ))}

                  <TableRow>
                    <TableCell colSpan={1}></TableCell>
                    <TableCell align="right">
                      {" "}
                      <Typography
                        variant="sub2"
                        sx={{ fontFamily: "Roboto", fontSize: 16 }}
                        color={"green"}
                      >
                        {appliedCoupon
                          ? `${coupon} applied discount of ${discount}/-`
                          : ""}
                      </Typography>{" "}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell rowSpan={3} />
                    {/* <TableCell colSpan={1}>Sub total</TableCell> */}
                    {/* <TableCell align="right">${subtotal.toFixed(2)}</TableCell> */}
                    {/* <TableCell align="right">₹ {totalPrice}</TableCell> */}
                    {/* <TableCell align="right">₹ {totalPrice}</TableCell> */}
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontFamily: "Roboto", fontSize: 16 }}>
                      Total
                    </TableCell>
                    <TableCell align="right">₹ {totalPrice}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
            onClick={handlePlaceOrder}
          >
            Place Order
          </Button>
        </Paper>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Address</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
          <DialogContentText>Please Enter Address Details</DialogContentText>
          <TextField
            label={
              formikAddress.errors.title && formikAddress.touched.title
                ? formikAddress.errors.title
                : "title"
            }
            error={
              formikAddress.errors.title && formikAddress.touched.title
                ? true
                : false
            }
            onChange={formikAddress.handleChange}
            onBlur={formikAddress.handleBlur}
            name="title"
            margin="normal"
            size={"small"}
          />
          <TextField
            label={
              formikAddress.errors.address && formikAddress.touched.address
                ? formikAddress.errors.address
                : "address"
            }
            error={
              formikAddress.errors.address && formikAddress.touched.address
                ? true
                : false
            }
            onChange={formikAddress.handleChange}
            onBlur={formikAddress.handleBlur}
            name="address"
            margin="normal"
            size={"small"}
          />
          <TextField
            name="city"
            margin="normal"
            label={
              formikAddress.errors.city && formikAddress.touched.city
                ? formikAddress.errors.city
                : "city"
            }
            error={
              formikAddress.errors.city && formikAddress.touched.city
                ? true
                : false
            }
            onChange={formikAddress.handleChange}
            onBlur={formikAddress.handleBlur}
            size={"small"}
          />
          <TextField
            label={
              formikAddress.errors.state && formikAddress.touched.city
                ? formikAddress.errors.state
                : "state"
            }
            error={
              formikAddress.errors.state && formikAddress.touched.state
                ? true
                : false
            }
            onChange={formikAddress.handleChange}
            onBlur={formikAddress.handleBlur}
            name="state"
            margin="normal"
            size={"small"}
          />
          <TextField
            label={
              formikAddress.errors.zip && formikAddress.touched.zip
                ? formikAddress.errors.zip
                : "zip code"
            }
            error={
              formikAddress.errors.zip && formikAddress.touched.zip
                ? true
                : false
            }
            onChange={formikAddress.handleChange}
            onBlur={formikAddress.handleBlur}
            name="zip"
            margin="normal"
            size={"small"}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={formikAddress.handleSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default Checkout;
