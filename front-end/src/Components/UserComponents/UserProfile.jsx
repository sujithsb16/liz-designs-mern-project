

import React, { useCallback, useEffect, useState } from "react";
import {
  Tabs,
  Tab,
  Typography,
  Box,
  TextField,
  Button,
  Paper,
  Grid,
  Stack,
  styled,
  Divider,


} from "@mui/material";
import { UserProfileApi, addAddressApi, updateUserApi, userCouponActivate, userCouponList } from "../../apiCalls/userApiCalls";
import { useDispatch, useSelector } from "react-redux";
import { userAddressSchema, userUpdateSchema } from "../../schema/Validation";
import { useFormik } from "formik";
import { setUserLogin } from "../../Redux/userSlice";
import UserAddress from "./UserAddress";


const initialUser={
firstName:"",
  lastName:"",
  email:"",
  mobile:"",

}
const initialAddress = {
  title:"",
  address: "",
  city: "",
  state: "",
  zip: "",
};


const UserProfile = () => {
const dispatch = useDispatch();
  ////////////// validation///////////////
  
  const formikUser =
    useFormik({
      initialValues: initialUser,
      validationSchema: userUpdateSchema,
      onSubmit: (values) => {
  
       const updatedUser = {
         firstName: formikUser.values.firstName,
         lastName: formikUser.values.lastName,
         email: formikUser.values.email,
         mobile: formikUser.values.mobile,
       };
  
       updateUser(updatedUser);
  
  
        // submitHandler();
  
        console.log(values);
      },
    });
  const formikAddress = useFormik({
    initialValues: initialAddress,
    validationSchema: userAddressSchema,
    onSubmit: (values) => {
      const address = {
        title:values.title,
        address: values.address,
        state: values.state,
        city: values.city,
        zip: values.zip,
      };

      addAddress(address);

      // submitHandler();

      console.log(values);
    },
  });


///////////////////////////////////////


  const [value, setValue] = useState(0);
  const [error, setError] = useState(false);
  const [userUpdateSuccess, setUserUpdateSuccess] = useState(false);
  const [addAddressSuccess,setAddAddressSuccess] = useState(false)
  const [couponSuccess,setCouponSuccess] = useState(false)
  const [loading, setLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [user, setUser] = useState("");
  const [orders, setOrders] = useState([])
  ///////////////////////////////////////////////////
  const token = useSelector((state) => state.userLogin.userInfo.token);
  const userInfo =  useSelector((state) => state.userLogin.userInfo)
  
  ///////////////////////////////////////////////////

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
//////////////////////////////////////////////////////

//////////////////////user update////////////////////




/////////////////////////////////////////////////////
const updateUser = async (updatedUser) => {
  try {
    setLoading(true);
    const result = await updateUserApi(token, updatedUser, setLoading);
    if (result.data) {
      console.log("test 4 ");
      console.log(result.data);
       dispatch(
         setUserLogin({
           userInfo: result.data,
         })
       );
       setUserUpdateSuccess(!userUpdateSuccess); 
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
////////////////////////////////////////////////////


const addAddress = async (address) => {
  try {
    setLoading(true);
    const result = await addAddressApi(token, address, setLoading);
    if (result.data) {
      console.log("test 4 ");
      console.log(result.data);
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


////////////////////////////////////////////////////

////////////////////////////////////////////////////


///////////////////////////////////////////////////

//////////////////////////////////////////////////////
  const userProfile = useCallback(async () => {
    try {
      setLoading(true);
      const result = await UserProfileApi(token, setLoading);
      if (result.data) {
        console.log("test 4 ");
        console.log(result.data.coupons);
        setCoupons(result.data.coupons);
        setUser(result.data.user);
        setOrders(result.data.orders);
      } else {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 4000);
        setLoading(false);
        console.log(result);
      }
      setLoading(false);
    } catch (error) {    console.log(error);
}
  }, [token, setLoading]);
///////////////////////////////////////////////////////

const couponActivate = async(couponId) => {
   try {
      setLoading(true);
      const result = await userCouponActivate(token,couponId, setLoading);
      if (result.data) {
        console.log("test 4 ");
        console.log(result.data);
        setCouponSuccess(!couponSuccess);
        // setCoupons(result.data); // set only first 4 elements
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

}


///////////////////////////////////////////////////////
  useEffect(() => {
    userProfile();
    // getUser();
  }, [userProfile, addAddressSuccess, couponSuccess]);

console.log(orders);

  return (
    <>
      {/* <Typography variant="h4" align="center" gutterBottom>
        User Profile
      </Typography> */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          padding: 0,
          minHeight: "90vh",
        }}
      >
        <Paper
          sx={{
            width: { xs: "100%", sm: "80%", md: "60%" },
            boxShadow: 10,
            margin: { xs: 1, sm: 2, lg: 4 },
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Profile Details" sx={{ fontFamily: "Inria Serif" }} />
            <Tab label="Addresses" sx={{ fontFamily: "Inria Serif" }} />
            <Tab label="Coupons" sx={{ fontFamily: "Inria Serif" }} />
            <Tab label="Orders" sx={{ fontFamily: "Inria Serif" }} />
          </Tabs>
          <TabPanel value={value} index={0}>
            <Box sx={{ display: "flex", flexDirection: "column", p: 3 }}>
              <TextField
                margin="normal"
                label={
                  formikUser.errors.firstName && formikUser.touched.firstName
                    ? formikUser.errors.firstName
                    : "First Name"
                }
                name="firstName"
                defaultValue={userInfo.name}
                error={
                  formikUser.errors.firstName && formikUser.touched.firstName
                    ? true
                    : false
                }
                onChange={formikUser.handleChange}
                onBlur={formikUser.handleBlur}
                size={"small"}
              />
              <TextField
                name="lastName"
                margin="normal"
                label={
                  formikUser.errors.lastName && formikUser.touched.lastName
                    ? formikUser.errors.lastName
                    : "Last Name"
                }
                error={
                  formikUser.errors.lastName && formikUser.touched.lastName
                    ? true
                    : false
                }
                onChange={formikUser.handleChange}
                onBlur={formikUser.handleBlur}
                defaultValue={userInfo.name2}
                size={"small"}
              />
              <TextField
                name="email"
                margin="normal"
                label={
                  formikUser.errors.email && formikUser.touched.email
                    ? formikUser.errors.email
                    : "Email"
                }
                error={
                  formikUser.errors.email && formikUser.touched.email
                    ? true
                    : false
                }
                onChange={formikUser.handleChange}
                onBlur={formikUser.handleBlur}
                defaultValue={userInfo.email}
                size={"small"}
              />
              <TextField
                name="mobile"
                margin="normal"
                label={
                  formikUser.errors.mobile && formikUser.touched.mobile
                    ? formikUser.errors.mobile
                    : "Mobile"
                }
                error={
                  formikUser.errors.mobile && formikUser.touched.mobile
                    ? true
                    : false
                }
                onChange={formikUser.handleChange}
                onBlur={formikUser.handleBlur}
                defaultValue={userInfo.mobile}
                size={"small"}
              />

              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  disabled={loading ? true : false}
                  variant="contained"
                  color="primary"
                  onClick={formikUser.handleSubmit}
                  size={"small"}
                  sx={{ fontFamily: "Inria Serif" }}
                >
                  Save Changes
                </Button>
              </Box>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Box sx={{ display: "flex", flexDirection: "column", p: 3 }}>
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
                    : "Zip Code"
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

              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={loading ? true : false}
                  onClick={formikAddress.handleSubmit}
                  size={"small"}
                  sx={{ fontFamily: "Inria Serif" }}
                >
                  Add Address
                </Button>
              </Box>
            </Box>
            <Box
              sx={{
                boxShadow: 2,
                borderRadius: 10,
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "info.main",
                padding: 3,
              }}
            >
              {user &&
                user.addresses &&
                Array.isArray(user.addresses) &&
                user.addresses.map((address, index) => (
                  <Stack
                    direction="row"
                    divider={<Divider orientation="vertical" flexItem />}
                    spacing={2}
                  >
                    <Item key={index}>
                      {" "}
                      <UserAddress key={index} address={address} />
                    </Item>
                  </Stack>
                ))}
            </Box>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                p: 3,
                backgroundColor: "info.main",
              }}
            >
              {coupons.length > 0 &&
                coupons
                  .filter((coupon) => !coupon.isBlocked)
                  .map((coupon) => {
                    const isActivated = user.activatedCoupons?.some(
                      (activatedCoupon) =>
                        activatedCoupon.toString() === coupon._id.toString()
                    );
                    const isExpired = new Date() > new Date(coupon.validity);
                    return (
                      <Box
                        key={coupon._id}
                        sx={{ display: "flex", alignItems: "center", mb: 2 }}
                      >
                        <Typography
                          variant="body1"
                          sx={{ fontFamily: "Roboto", fontSize: 16 }}
                        >
                          {coupon.name}
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        <Typography
                          variant="body1"
                          sx={{ fontFamily: "Roboto", fontSize: 16 }}
                        >
                          {coupon.type}
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        <Typography
                          variant="body1"
                          sx={{ fontFamily: "Roboto", fontSize: 16 }}
                        >
                          {coupon.discount}{" "}
                          {coupon.type === "flat" ? "/- off" : "% off"}
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        {isExpired ? (
                          <Typography
                            sx={{ fontFamily: "Roboto", fontSize: 16 }}
                            variant="body1"
                            color={"red"}
                          >
                            Expired
                          </Typography>
                        ) : isActivated ? (
                          <Typography
                            sx={{ fontFamily: "Roboto", fontSize: 16 }}
                            variant="body1"
                            color={"green"}
                          >
                            Activated
                          </Typography>
                        ) : (
                          <Button
                            variant="contained"
                            color="primary"
                            sx={{ fontFamily: "Roboto", fontSize: 16 }}
                            font
                            onClick={() => {
                              couponActivate(coupon._id);
                            }}
                          >
                            Activate
                          </Button>
                        )}
                      </Box>
                    );
                  })}

              <Box sx={{ display: "flex", justifyContent: "flex-end" }}></Box>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={3}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                p: 3,
                backgroundColor: "info.main",
              }}
            >
              {orders.length > 0 &&
                orders.map((order) => {
                  
                  return (
                    <Box
                      key={order._id}
                      sx={{ display: "flex", alignItems: "center", mb: 2 }}
                    >
                      <div>
                        {order.products.items.map(
                          (product) =>
                            product.productId.image.url[0] && (
                              <img
                                key={product.productId._id}
                                src={product.productId.image.url[0].url}
                                alt={`Image`}
                                style={{
                                  width: "75px",
                                  height: "75px",
                                  margin: "10px",
                                }}
                              />
                            )
                        )}
                      </div>
                      <Box sx={{ flexGrow: 1 }} />
                      <Typography variant="body1">{order.address}</Typography>
                      <Box sx={{ flexGrow: 1 }} />
                      <Typography variant="body1">{order.discount} </Typography>
                      <Typography variant="body1">
                        {order.totalPrice}{" "}
                      </Typography>
                      <Box sx={{ flexGrow: 1 }} />
                      {/* {isExpired ? (
                        <Typography variant="body1" color={"red"}>
                          Expired
                        </Typography>
                      ) : isActivated ? (
                        <Typography variant="body1" color={"green"}>
                          Activated
                        </Typography>
                      ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            couponActivate(coupon._id);
                          }}
                        >
                          Activate
                        </Button>
                      )} */}
                    </Box>
                  );
                })}

              <Box sx={{ display: "flex", justifyContent: "flex-end" }}></Box>
            </Box>
          </TabPanel>
        </Paper>
      </Box>
    </>
  );
};

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default UserProfile;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));