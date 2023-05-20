import React, { useCallback, useEffect, useState } from 'react'
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { useSelector } from 'react-redux';
import toast, { Toaster } from "react-hot-toast";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useNavigate } from "react-router-dom";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { adminAddBanner, adminBannerList, bannerStatusControl } from '../../apiCalls/adminApiCalls';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";




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



const AdminBanner = () => {
  //////////////////////////////////

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setImage("")
  };

  ///////////////////////////////////

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [bannerList, setBannerList] = useState([]);
  const [bannerName, setBannerName] = useState("")
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addBannerSuccess, setAddBannerSuccess] = useState(false);
  const [blockSuccess, setBlockSuccess] = useState(false);
  const [image, setImage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
     const [id, setId] = useState("");




  const admin = useSelector((state) => state.adminLogin);
  const token = admin.adminInfo.token;

  ////////image upload/////////

  function handleUpload(event) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result);
      };
    }
  }

  /////////////////////////////////////

  //////////////////////////////////////////////////////

  const handleSubmit = () => {
    addBanner(bannerName);
    setOpen(false);
  };

  /////////////////////////////////////////////////

  const addBanner = async () => {
    try {
      console.log(bannerName);

      const result = await adminAddBanner(bannerName, image, token, setLoading);
      if (result.status === 200) {
        // Successful response
        setAddBannerSuccess(!addBannerSuccess);
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

  const handleBannerBlock = (id, status) => {
    confirmAlert({
      title: "Confirm",
      message: `Are you sure ?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            bannerBlock(id, status);
            // navigate("/admin");
          },
        },
        {
          label: "No",
          onClick: () => navigate("/admin/banner"),
        },
      ],
    });
  };

  //////////////////////////////////////////

  const bannerBlock = async (id, status) => {
      setIsSubmitting(true);
    try {
      setLoading(true);
      const result = await bannerStatusControl(id, status, token, setLoading);

      console.log("blocksucess2");

      if (result.data) {
        console.log("test 4 ");
        console.log(result.data);
        setBannerList(
          bannerList.map((banner) => {
            if (banner._id === id) {
              return { ...banner, isBlocked: !banner.isBlocked };
            } else {
              return banner;
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

  ///////////////////////////////////////

  const getBanner = useCallback(async () => {
    try {
      setLoading(true);
      const result = await adminBannerList(token, setLoading);
      if (result.data) {
        console.log("test 4 ");
        console.log(result.data);
        setBannerList(result.data);
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

  ///////////////////////////////

  useEffect(() => {
    getBanner();
  }, [getBanner, addBannerSuccess, blockSuccess]);

  ///////////////////////////////////////

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
        <Toaster toasterOptions={{ duratiom: 4000 }} />

        <Button
          variant="outlined"
          onClick={handleClickOpen}
          sx={{ marginTop: 10 }}
        >
          Add Banner
        </Button>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Banner</DialogTitle>
          <DialogContent>
            <DialogContentText>Please Enter Banner Name</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Banner"
              type="email"
              fullWidth
              variant="standard"
              value={bannerName}
              onChange={(e) => {
                setBannerName(e.target.value);
              }}
            />
            <Button
              component="label"
              variant="outlined"
              startIcon={<UploadFileIcon />}
              sx={{ marginRight: "1rem", marginTop: "1vh" }}
            >
              Upload Image
              <input type="file" accept=".jpg" hidden onChange={handleUpload} />
            </Button>
            {image ? (
              <div>
                <img
                  src={image}
                  alt={`Image`}
                  style={{
                    width: "auto",
                    height: "150px",
                    margin: "10px",
                  }}
                />
              </div>
            ) : (
              ""
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Add</Button>
          </DialogActions>
        </Dialog>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            paddingTop: "2vh",
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
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>SI. No</StyledTableCell>
                  <StyledTableCell align="center">Banner</StyledTableCell>
                  <StyledTableCell align="center">Image</StyledTableCell>
                  <StyledTableCell align="center">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bannerList.map((banner, index) => (
                  <StyledTableRow key={banner._id}>
                    <StyledTableCell component="th" scope="banner">
                      {index + 1} {/* Display serial number */}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {banner.banner}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <img
                        src={banner.image.url}
                        alt={`Image`}
                        style={{
                          Maxwidth: "200px",
                          height: "100px",
                          margin: "10px",
                        }}
                      />
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button
                        disabled={banner._id === id && isSubmitting}
                        variant="contained"
                        color={!banner.isBlocked ? "error" : "success"}
                        sx={{
                          width: "6rem", // Set the desired width for the button
                          "@media (max-width: 960px)": {
                            width: "10vw", // Set the desired width for smaller screens
                          },
                        }}
                        onClick={() => {
                          handleBannerBlock(banner._id, banner.isBlocked);
                          setId(banner._id);
                        }}
                      >
                        {banner._id === id && isSubmitting
                          ? "..."
                          : banner.isBlocked
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

export default AdminBanner
