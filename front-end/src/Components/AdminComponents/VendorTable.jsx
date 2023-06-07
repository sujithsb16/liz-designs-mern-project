import React, { useCallback, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading";
import {  vendorBlock, verifyVendor } from "../../actions/adminActions";
import { Button, Typography } from "@mui/material";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { axiosAdminInstance } from "../../utility/axios";
import { adminVendorList, vendorStatusControl, vendorVerifyControl } from "../../apiCalls/adminApiCalls";
import toast, { Toaster } from "react-hot-toast";
/////////////Tabs///////////////



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}








const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const VendorTable = () => {



  const navigate = useNavigate()
  
  const [value, setValue] = React.useState(0);
  
  

   const handleChange = (event, newValue) => {
     setValue(newValue);
   };




///////////////////////////////////////////////////////////////


    const admin = useSelector((state) => state.adminLogin);
    const token = admin.adminInfo.token;
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [vendorList, setVendorList] = useState([]);
  const [blockSuccess, setBlockSuccess] = useState(false);
  const [verifySuccess, setVerifySuccess] = useState(false);

 /////////////////////////////////////////////////////////////////////

/////////////Vendor Block//////////////
const vendorBlock = async (id, status) => {
  try {
     setLoading(true);
     const result = await vendorStatusControl(id, status, token, setLoading);

     console.log("blocksucess2");

     if (result.data) {
       console.log("test 4 ");
       console.log(result.data);
       setBlockSuccess(!blockSuccess);
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
};
////////////////////////////////

//////////////vendor verify///////
const verifyVendor = async (id, status) => {
  try {
    setLoading(true);
    const result = await vendorVerifyControl(id, status, token, setLoading);

    console.log("blocksucess2");

    if (result.data) {
      console.log("test 4 ");
      console.log(result.data);
      setVerifySuccess(!verifySuccess);
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
};
////////////////////////////////



  ////verifyVendor/////////

   const handleVendorVerify = (id, status) => {

    console.log("verify test");
     confirmAlert({
       title: "Confirm",
       message: `Are you sure ?`,
       buttons: [
         {
           label: "Yes",
           onClick: () => {
            console.log(id,status);
            verifyVendor(id, status)
             // navigate("/admin");
           },
         },
         {
           label: "No",
           onClick: () => navigate("/admin/tailors"),
         },
       ],
     });
   };
/////////BlockVendor///////

 const handleVendorBlock = (id, status) => {
   confirmAlert({
     title: "Confirm",
     message: `Are you sure ?`,
     buttons: [
       {
         label: "Yes",
         onClick: () => {
           vendorBlock(id, status);
           // navigate("/admin");
         },
       },
       {
         label: "No",
         onClick: () => navigate("/admin/tailors"),
       },
     ],
   });
 };


 ////////////////////////////////
const allVendorList = useCallback(async() =>{
  try {
    setLoading(true)
 const result = await adminVendorList(token, setLoading);
 if (result.data) {
   console.log("test 4 ");
   console.log(result.data);
   setVendorList(result.data);
 } else {
   setError(true);
   setTimeout(() => {
     setError(false);
   }, 4000);
   toast.error(result);
 }
 setLoading(false);
   
  } catch (error) {
   setLoading(false)
    console.log(error);
  }
},[token,setLoading]);


///////////////////////////////

    useEffect(() => {
      allVendorList();

      // console.log(allVendor);
    }, [allVendorList,verifySuccess, blockSuccess]);


///////////////////////////////////

  return (
    <>
      <Box sx={{ width: "100%", padding: "1rem" }}>
        <Toaster toasterOptions={{ duratiom: 4000 }} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            alignItems: "center",
            marginTop:"5rem",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
            sx={{width:{sm:"50rem",lg:"30vw"}}}
          >
            <Tab label="Verified" {...a11yProps(0)} />
            <Tab label="Verifiy Pending" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          {loading ? (
            <Loading
              // sx={{
              //   // marginTop: "10rem",
              //   height: "100%",
              //   width: "69.5rem",
              //   marginLeft: ".5rem",
              //   justifyContent: "center",
              //   alignItems: "center",
              // }}
            />
          ) : (
            <TableContainer
              component={Paper}
              // sx={{
              //   marginTop: "-.5rem",
              //   height: "100%",
              //   width: "69.5rem",
              //   marginLeft: "-1.1rem",
              // }}
            >
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell align="center">Mobile</StyledTableCell>
                    <StyledTableCell align="center">Email</StyledTableCell>
                    {/* <StyledTableCell align="center">Carbs&nbsp;(g)</StyledTableCell> */}
                    <StyledTableCell align="center">
                      Block/Unblock
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {vendorList?.map((vendor) => (
                    <StyledTableRow key={vendor._id}>
                      {vendor.isVerified ? (
                        <>
                          <StyledTableCell component="th" scope="row">
                            {vendor.firstName}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {vendor.mobile}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {vendor.email}
                          </StyledTableCell>
                          {/* <StyledTableCell align="center">{row.carbs}</StyledTableCell> */}
                          <StyledTableCell align="center">
                            <Button
                              variant="contained"
                              color={vendor.isBlocked ? "error" : "success"}
                              sx={{
                                width: "6rem", // Set the desired width for the button
                                "@media (max-width: 960px)": {
                                  width: "10vw", // Set the desired width for smaller screens
                                },
                              }}
                              onClick={() => {
                                handleVendorBlock(vendor._id, vendor.isBlocked);
                              }}
                            >
                              {!vendor.isBlocked ? "UnBlock" : "Block"}
                            </Button>
                          </StyledTableCell>
                        </>
                      ) : (
                        ""
                      )}
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {loading ? (
            <Loading
              sx={{
                // marginTop: "10rem",
                height: "100%",
                width: "69.5rem",
                marginLeft: ".5rem",
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          ) : (
            <TableContainer
              component={Paper}
              sx={{
                marginTop: "-.5rem",
                height: "100%",
                width: "69.5rem",
                marginLeft: "-1.1rem",
              }}
            >
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell align="center">Mobile</StyledTableCell>
                    <StyledTableCell align="center">Email</StyledTableCell>
                    {/* <StyledTableCell align="center">Carbs&nbsp;(g)</StyledTableCell> */}
                    <StyledTableCell align="center">Action</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {vendorList?.map((vendor) => (
                    <StyledTableRow key={vendor._id}>
                      {vendor.isVerified ? (
                        ""
                      ) : (
                        <>
                          <StyledTableCell component="th" scope="row">
                            {vendor.firstName}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {vendor.mobile}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {vendor.email}
                          </StyledTableCell>
                          {/* <StyledTableCell align="center">{row.carbs}</StyledTableCell> */}
                          <StyledTableCell align="center">
                            <Button
                              variant="contained"
                              color="success"
                              onClick={async () => {
                                handleVendorVerify(
                                  vendor._id,
                                  vendor.isVerified
                                );
                              }}
                            >
                              Verify
                            </Button>
                          </StyledTableCell>
                        </>
                      )}
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </TabPanel>
      </Box>
    </>
  );
};

export default VendorTable;
