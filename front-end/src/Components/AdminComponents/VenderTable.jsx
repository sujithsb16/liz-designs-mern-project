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
import { allVenderList, venderBlock, verifyVender } from "../../actions/adminActions";
import { Button, Typography } from "@mui/material";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
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

const VenderTable = () => {



  const navigate = useNavigate()

   const [value, setValue] = React.useState(0);

   const handleChange = (event, newValue) => {
     setValue(newValue);
   };







  const dispatch = useDispatch()
  const venderList = useSelector((state) => state.venderList)
  const {loading, allVender} = venderList
  const venderVerify = useSelector((state) => state.adminVenderVerify);
  const { success:verifySuccess } = venderVerify;
  const venderBlockState = useSelector((state) => state.adminVenderBlock)
  const {success:blockSuccess } = venderBlockState

 

  ////verifyVender/////////

   const verifyHandler = (id, status) => {

    console.log("verify test");
     confirmAlert({
       title: "Confirm",
       message: `Are you sure ?`,
       buttons: [
         {
           label: "Yes",
           onClick: () => {
             dispatch(verifyVender(id, status));
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
/////////BlockVender///////

 const handleVenderBlock = (id, status) => {
   confirmAlert({
     title: "Confirm",
     message: `Are you sure ?`,
     buttons: [
       {
         label: "Yes",
         onClick: () => {
           dispatch(venderBlock(id, status));
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


    useEffect(() => {
      dispatch(allVenderList());

      // console.log(allVender);
    }, [dispatch, verifySuccess, blockSuccess]);




  return (
    <>
      <Box sx={{ width: "100%", paddindTop: "10rem" }}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            paddingTop: "5rem",
            justifyContent: "center",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            sx={{
              margin: "auto",
              display: "flex",
              justifyContent: "center",
              paddingLeft: "25rem",
            }}
          >
            <Tab label="Verified" {...a11yProps(0)} />
            <Tab label="Verifiy Pending" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
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
                    <StyledTableCell align="center">
                      Block/Unblock
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allVender.map((vender) => (
                    <StyledTableRow key={vender._id}>
                      {vender.isVerified ? (
                        <>
                          <StyledTableCell component="th" scope="row">
                            {vender.firstName}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {vender.mobile}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {vender.email}
                          </StyledTableCell>
                          {/* <StyledTableCell align="center">{row.carbs}</StyledTableCell> */}
                          <StyledTableCell align="center">
                            {vender.isBlocked ? (
                              <Button
                                variant="contained"
                                style={{ width: "6.5rem" }}
                                onClick={() => {
                                  handleVenderBlock(
                                    vender._id,
                                    !vender.isBlocked
                                  );
                                }}
                              >
                                UnBlock
                              </Button>
                            ) : (
                              <Button
                                style={{ width: "6.5rem" }}
                                variant="contained"
                                color="error"
                                onClick={() => {
                                  handleVenderBlock(
                                    vender._id,
                                    !vender.isBlocked
                                  );
                                }}
                              >
                                Block
                              </Button>
                            )}
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
                  {allVender.map((vender) => (
                    <StyledTableRow key={vender._id}>
                      {vender.isVerified ? (
                        ""
                      ) : (
                        <>
                          <StyledTableCell component="th" scope="row">
                            {vender.firstName}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {vender.mobile}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {vender.email}
                          </StyledTableCell>
                          {/* <StyledTableCell align="center">{row.carbs}</StyledTableCell> */}
                          <StyledTableCell align="center">
                            {/* {vender.isVerified ? (
                              <Typography sx={{ color: `green` }}>
                                Verified
                              </Typography>
                            ) : (
                              <Button
                                variant="contained"
                                href={`/vender/unblock/${vender._id}`}
                              >
                                Verify
                              </Button>
                            )} */}

                            <Button
                              variant="contained"
                              color="success"
                              onClick={async () => {
                                verifyHandler(vender._id, !vender.isVerified);
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

export default VenderTable;
