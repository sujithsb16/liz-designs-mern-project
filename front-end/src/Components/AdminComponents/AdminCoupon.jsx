import React, { useCallback, useEffect, useState } from 'react'
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, InputAdornment, styled } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { DatePicker } from '@mui/x-date-pickers';
import { useFormik } from 'formik';
import { couponSchema } from '../../schema/Validation';
import { useSelector } from 'react-redux';
import { adminAddCoupon, adminCouponList, couponStatusControl } from '../../apiCalls/adminApiCalls';
import toast, { Toaster } from "react-hot-toast";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from 'react-router-dom';
import { confirmAlert } from "react-confirm-alert";




const initialValues = {
  name: "",
  type: "",
  discount: "",
  maxDiscount: "",
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));



const AdminCoupon = () => {

    //////////validation///////////////////
const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
  useFormik({
    initialValues: initialValues,
    validationSchema: couponSchema,
    onSubmit: (values) => {
    //   submitHandler();
      // moblieVerify();

      console.log(values);
      console.log(validity.$d);
      addCoupon()
    },
  });


    /////////////////////////////
    
     const admin = useSelector((state) => state.adminLogin);
     const token = admin.adminInfo.token;

      const navigate = useNavigate();

     const [open, setOpen] = useState(false);
     
     const [id, setId] = useState("");
     const [value, setValue] = useState(null);
     const [error, setError] = useState(false);
     const [loading, setLoading] = useState(false);
     const [blockSuccess, setBlockSuccess] = useState(false);

     const [couponList, setCouponList] = useState([]);

     const [addCouponSuccess, setAddCouponSuccess] = useState(false);
     const [validity, setValidity] = useState("");

       const [isSubmitting, setIsSubmitting] = useState(false);



    ///////////////////////////
    const addCoupon = async () => {
      try {
      const couponData={
            name:values.name,
            type:values.type,
            discount:values.discount,
            validity:validity,
            maxDiscount:values.maxDiscount,
        }
        console.log(couponData);

        const result = await adminAddCoupon(couponData, token, setLoading);
        if (result.data) {
          // Successful response
          setAddCouponSuccess(!addCouponSuccess);
        } else {
          setError(true);
          setTimeout(() => {
            setError(false);
          }, 4000);
          setLoading(false);
          toast.error(result);
          throw new Error(`Unexpected response status code: ${result.status}`);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    ///////////////////////////

    //////////////////////////

   const handleCouponBlock = (id, status) => {
     confirmAlert({
       title: "Confirm",
       message: `Are you sure ?`,
       buttons: [
         {
           label: "Yes",
           onClick: () => {
             couponBlock(id, status);
             // navigate("/admin");
           },
         },
         {
           label: "No",
           onClick: () => navigate("/admin/coupon"),
         },
       ],
     });
   };


    //////////////////////////

    /////////////////////////
    const getCoupon = useCallback(async () => {
      try {
        setLoading(true);
        const result = await adminCouponList(token, setLoading);
        if (result.data) {
          console.log("test 4 ");
          console.log(result.data);
          setCouponList(result.data);
        } else {
          setError(true);
          setTimeout(() => {
            setError(false);
          }, 4000);
          setLoading(false);
          toast.error(result);
        }
        setLoading(false);
      } catch (error) {}
    }, [token]);
    ////////////////////////

    ///////////////////////
  const couponBlock = async (id, status) => {
    setIsSubmitting(true); // Set the submitting state to true
    try {
      setLoading(true);
      const result = await couponStatusControl(id, status, token, setLoading);

      console.log("blocksucess2");

      if (result.data) {
        console.log("test 4 ");
        console.log(result.data);
        setCouponList(
          couponList.map((coupon) => {
            if (coupon._id === id) {
              return { ...coupon, isBlocked: !coupon.isBlocked };
            } else {
              return coupon;
            }
          })
        );
      } else {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 4000);
        toast.error(result);
      }
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
    setIsSubmitting(false);
  };
    ///////////////////////

     const handleClickOpen = () => {
       setOpen(true);
     };

     const handleClose = () => {
       setOpen(false);
     };


     ////////////////////////////
useEffect(() => {
  getCoupon();
}, [getCoupon, addCouponSuccess, blockSuccess]);

     ////////////////////////////



  return (
    <>
      <Box
        spacing={4}
        sx={{
          width: "100%",
          paddindTop: "5rem",
        }}
      >
        <Toaster toasterOptions={{ duratiom: 4000 }} />

        <Button
          variant="outlined"
          onClick={handleClickOpen}
          sx={{ marginTop: 10 }}
        >
          Add Coupon
        </Button>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Coupon</DialogTitle>
          <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
            <DialogContentText>Please Enter Coupon Details</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              type="name"
              variant="standard"
              label={errors.name && touched.name ? errors.name : "Coupon Name"}
              value={values.name}
              //   error={errors.name && touched.name ? true : false}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              type="name"
              name="type"
              variant="standard"
              label={errors.type && touched.type ? errors.type : "Coupon Type"}
              value={values.type}
              //   error={errors.type && touched.type ? true : false}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="discount"
              type="name"
              variant="standard"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {values.type.toLowerCase() == "flat" ? "/-" : "%"}
                  </InputAdornment>
                ),
              }}
              label={
                errors.discount && touched.discount
                  ? errors.discount
                  : "Coupon Discount"
              }
              value={values.discount}
              //   error={errors.discount && touched.discount ? true : false}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            {values.type === "upto" ? (
              <TextField
                autoFocus
                margin="dense"
                id="name"
                type="name"
                name="maxDiscount"
                variant="standard"
                label={
                  errors.maxDiscount && touched.maxDiscount
                    ? errors.maxDiscount
                    : "maxDiscount"
                }
                value={values.maxDiscount}
                //   error={errors.type && touched.type ? true : false}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            ) : (
              ""
            )}

            <DatePicker
              value={validity}
              onChange={(newValue) => setValidity(newValue)}
              label="Enter Validity"
              sx={{ marginTop: 2 }}
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Add</Button>
          </DialogActions>
        </Dialog>

        <Box
          sx={{ padding: 1 }}
          // sx={{
          //   borderBottom: 1,
          //   borderColor: "divider",
          //   paddingTop: "2vh",
          //   justifyContent: "center",
          //   width: "100%", // Update to use 100% width
          //   maxWidth: "69.5rem", // Add maxWidth for better responsiveness
          //   margin: "0 auto", // Center align the container
          //   overflowX: "hidden", // Add horizontal scrolling for smaller screens
          //   "@media (min-width: 960px)": {
          //     overflowX: "hidden", // Hide horizontal scrollbar for screens wider than 960px
          //   },
          // }}
        >
          <TableContainer
            component={Paper}
            sx={{
              marginTop: "1rem",
              height: "100%",
              width: "100%", // Set the container width to 100% to occupy the available space
              marginLeft: "0",
              overflowX: "auto", // Add horizontal scrolling for smaller screens
              "&::-webkit-scrollbar": {
                height: "0.4rem",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#c4c4c4",
              },
            }}
          >
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>SI. No</StyledTableCell>
                  <StyledTableCell align="center">Coupon</StyledTableCell>
                  <StyledTableCell align="center">Type</StyledTableCell>
                  <StyledTableCell align="center">Discount</StyledTableCell>
                  <StyledTableCell align="center">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {couponList.map((coupon, index) => (
                  <StyledTableRow key={coupon._id}>
                    <StyledTableCell component="th" scope="coupon">
                      {index + 1} {/* Display serial number */}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {coupon.name}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {coupon.type}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {coupon.discount}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button
                        variant="contained"
                        disabled={coupon._id === id && isSubmitting}
                        color={!coupon.isBlocked ? "error" : "success"}
                        sx={{
                          width: "6rem", // Set the desired width for the button
                          "@media (max-width: 960px)": {
                            width: "10vw", // Set the desired width for smaller screens
                          },
                        }}
                        onClick={() => {
                          handleCouponBlock(coupon._id, coupon.isBlocked);
                          setId(coupon._id);
                        }}
                      >
                        {coupon._id === id && isSubmitting
                          ? "Submitting..."
                          : coupon.isBlocked
                          ? "List"
                          : "Unlist"}
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
}

export default AdminCoupon
