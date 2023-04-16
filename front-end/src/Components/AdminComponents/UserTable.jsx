import React, { useEffect } from "react";
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

import { Button, Typography } from "@mui/material";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { allUserListAction } from "../../actions/adminActions";
import axios from "axios";

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


function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const UserTable = () => {

    const navigate = useNavigate();

    const [value, setValue] = React.useState(0);
    const [blockSuccess, setBlockSuccess] = React.useState(false);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    
    const userBlock = async (id, status) => {
      try {
          // dispatch(venderBlockReq());
          
          console.log(id);
          console.log("blocksucess1");
        const adminInfo = JSON.parse(localStorage.getItem("adminInfo"));
        console.log(adminInfo.token);
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminInfo.token}`,
          },
        };

        const sendStatus = {
          blocked: status,
        };
       const{data} = await axios.patch(`/admin/blockuser/${id}`, sendStatus, config);
        
       dispatch(allUserListAction());

       console.log("blocksucess2");

     

     
          
        
        // dispatch(allUserListAction());

        //    dispatch(venderBlockSuccess());
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        console.log(message);
        // dispatch(venderBlockFail(message));
      }
    };


    const dispatch = useDispatch();
    const userList = useSelector((state) => state.userList);
    const { loading, allUser } = userList;

    const handleUserBlock = (id, status) => {
      confirmAlert({
        title: "Confirm",
        message: `Are you sure ?`,
        buttons: [
          {
            label: "Yes",
            onClick: () => {
             userBlock(id, status) 
              // navigate("/admin");
              
            },
          },
          {
            label: "No",
            onClick: () => navigate("/admin/users"),
          },
        ],
      });
    };


    useEffect(() => {
      dispatch(allUserListAction());
     
;
      // console.log(allUser);
    }, [dispatch, 
        // verifySuccess, 
        blockSuccess
    ]);


  return (
    <>
      <Box
        sx={{
            
          width: "100%",
          paddindTop: "10rem",
          overflowX: "auto", // Add horizontal scrolling for smaller screens
          "&::-webkit-scrollbar": {
            height: "0.4rem",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#c4c4c4",
          },
        }}
      >
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            paddingTop: "5rem",
            justifyContent: "center",
            width: "100%", // Update to use 100% width
            maxWidth: "69.5rem", // Add maxWidth for better responsiveness
            margin: "0 auto", // Center align the container
            overflowX: "hidden", // Add horizontal scrolling for smaller screens
            "@media (min-width: 960px)": {
              overflowX: "hidden", // Hide horizontal scrollbar for screens wider than 960px
            },
          }}
        >
          <TableContainer
            component={Paper}
            sx={{
              height: "100%",

              marginLeft: "0.5rem",
            }}
          >
            {loading ? (
              <Loading />
            ) : (
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
                  {allUser.map((user) => (
                    <StyledTableRow key={user._id}>
                      <>
                        <StyledTableCell component="th" scope="row">
                          {user.firstName}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {user.mobile}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {user.email}
                        </StyledTableCell>
                        {/* <StyledTableCell align="center">{row.carbs}</StyledTableCell> */}
                        <StyledTableCell align="center">
                          {user.isBlocked ? (
                            <Button
                              variant="contained"
                              sx={{
                                width: "6rem", // Set the desired width for the button
                                "@media (max-width: 960px)": {
                                  width: "10vw", // Set the desired width for smaller screens
                                },
                              }}
                              onClick={() => {
                                handleUserBlock(user._id, !user.isBlocked);
                              }}
                            >
                              UnBlock
                            </Button>
                          ) : (
                            <Button
                              variant="contained"
                              color={"error"}
                              sx={{
                                width: "6rem", // Set the desired width for the button
                                "@media (max-width: 960px)": {
                                  width: "10vw", // Set the desired width for smaller screens
                                },
                              }}
                              onClick={() => {
                                handleUserBlock(user._id, !user.isBlocked);
                              }}
                            >
                              Block
                            </Button>
                          )}
                        </StyledTableCell>
                      </>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TableContainer>
        </Box>
      </Box>
    </>
  );
}

export default UserTable
