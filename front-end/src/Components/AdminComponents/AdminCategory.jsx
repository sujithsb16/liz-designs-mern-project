import React, { useCallback, useEffect, useState } from 'react'
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { adminAddCategory, adminCategoryList, categoryStatusControl } from '../../apiCalls/adminApiCalls';
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useNavigate } from 'react-router-dom';


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


const AdminCategory = () => {

  //////////////////////////////////

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  ///////////////////////////////////


    const navigate = useNavigate();


     const [open, setOpen] = useState(false);
     const [category, setCategory] = useState(" ");
     const [categoryList, setCategoryList] = useState([]);
     const [error, setError] = useState(false);
     const [loading, setLoading] = useState(false);
     const [addCategorySuccess, setAddCategorySuccess] = useState(false);
     const [blockSuccess, setBlockSuccess] = useState(false);


 const admin = useSelector((state) => state.adminLogin);
 const token = admin.adminInfo.token;
 
//////////////////////////////////////////////////////



     const handleSubmit = () => {
         addCategory(category)
         setOpen(false);
     };

/////////////////////////////////////////////////

const addCategory = async () => {
  try {
    console.log(category);

    const result = await adminAddCategory(category, token, setLoading);
    if (result.status === 200) {
      // Successful response
      setAddCategorySuccess(!addCategorySuccess)
      
    } else {
      // Handle other response status codes
      // You can customize the error handling as needed
      throw new Error(`Unexpected response status code: ${result.status}`);
    }
  } catch (error) {
    console.log(error.message);
  }
};

/////////////////////////////////////

const handleCategoryBlock = (id, status) => {
  confirmAlert({
    title: "Confirm",
    message: `Are you sure ?`,
    buttons: [
      {
        label: "Yes",
        onClick: () => {
          categoryBlock(id, status);
          // navigate("/admin");
        },
      },
      {
        label: "No",
        onClick: () => navigate("/admin/category"),
      },
    ],
  });
};

//////////////////////////////////////////

const categoryBlock = async (id, status) => {
  try {
    setLoading(true);
    const result = await categoryStatusControl(id, status, token, setLoading);

    console.log("blocksucess2");

    if (result.data) {
      console.log("test 4 ");
      console.log(result.data);
       setCategoryList(
         categoryList.map((category) => {
           if (category._id === id) {
             return { ...category, isBlocked: !category.isBlocked };
           } else {
             return category;
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
};









///////////////////////////////////////

const getCategory = useCallback(async () => {
  try {
    setLoading(true);
    const result = await adminCategoryList(token, setLoading);
    if (result.data) {
      console.log("test 4 ");
      console.log(result.data);
      setCategoryList(result.data);
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
},[token]);

///////////////////////////////

     useEffect(() => {
       getCategory();
     }, [getCategory,addCategorySuccess,blockSuccess]);

///////////////////////////////////////
     
  return (
    <>
      <Box
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
          Add Category
        </Button>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Category</DialogTitle>
          <DialogContent>
            <DialogContentText>Please Enter Category Name</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Category"
              type="email"
              fullWidth
              variant="standard"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
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
                  <StyledTableCell align="center">Category</StyledTableCell>
                  <StyledTableCell align="center">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categoryList.map((category, index) => (
                  <StyledTableRow key={category._id}>
                    <StyledTableCell component="th" scope="category">
                      {index + 1} {/* Display serial number */}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {category.category}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button
                        variant="contained"
                        color={!category.isBlocked ? "error" : "success"}
                        sx={{
                          width: "6rem", // Set the desired width for the button
                          "@media (max-width: 960px)": {
                            width: "10vw", // Set the desired width for smaller screens
                          },
                        }}
                        onClick={() => {
                          handleCategoryBlock(category._id, category.isBlocked);
                        }}
                      >
                        {category.isBlocked ? "List" : "Unlist"}
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

export default AdminCategory
