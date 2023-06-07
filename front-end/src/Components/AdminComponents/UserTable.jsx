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
import { adminUserList, userStatusControl } from "../../apiCalls/adminApiCalls";
import toast, { Toaster } from "react-hot-toast";



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



const UserTable = () => {

    const navigate = useNavigate();

//////////////////////////////////////////////////////
   
    const admin = useSelector((state) => state.adminLogin);
    const token = admin.adminInfo.token;

const [error, setError] = useState(false);
const [loading, setLoading] = useState(false);
const [userList, setUserList] = useState([]);
const [blockSuccess, setBlockSuccess] = useState(false)

    
/////////////////////////////////////////////////////////


const userBlock = async (id, status) => {
  try {
    setLoading(true);
    const result = await userStatusControl(id, status, token, setLoading);

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

////////////////////////////////////////



const allUserList = useCallback(async () => {
  try {
    setLoading(true);
    const result = await adminUserList(token, setLoading);
    if (result.data) {
      console.log("test 4 ");
      console.log(result.data);
      setUserList(result.data);
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 4000);
      toast.error(result);
    }
    setLoading(false);
  } catch (error) {
    setLoading(false);
    console.log(error.message);
  }
}, [token]);





    useEffect(() => {

      allUserList()
     
;
      // console.log(allUser);
    }, [allUserList, 
        // verifySuccess, 
        blockSuccess
    ]);


  return (
    <>
      <Box sx={{ width: "100%", padding: "1rem" }}>
        <Toaster toasterOptions={{ duratiom: 4000 }} />

        {loading ? (
          <Loading />
        ) : (
          <TableContainer
            component={Paper}
            sx={{
              marginTop: "5rem",
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
                {userList?.map((user) => (
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
                        <Button
                          variant="contained"
                          color={user.isBlocked ? "error" : "success"}
                          sx={{
                            width: "6rem", // Set the desired width for the button
                            "@media (max-width: 960px)": {
                              width: "10vw", // Set the desired width for smaller screens
                            },
                          }}
                          onClick={() => {
                            handleUserBlock(user._id, user.isBlocked);
                          }}
                        >
                          {!user.isBlocked ? "UnBlock" : "Block"}
                        </Button>
                      </StyledTableCell>
                    </>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </>
  );
}

export default UserTable
