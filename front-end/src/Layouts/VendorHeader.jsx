

import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Drawer,
  Box,
  List,
  ListItemText,
  ListItemButton,
  ListItem,
  ListItemIcon,
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Divider from "@mui/material/Divider";
import { setVendorLogout } from "../Redux/vendorSlice";
import { useDispatch, useSelector } from "react-redux";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  flexGrow: 0,
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(2),
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  display: { xs: "none", md: "flex" },
  fontFamily: "Inria Serif",
  fontWeight: 700,
  letterSpacing: ".3rem",
  color: "inherit",
  textDecoration: "none",
  "@media (max-width: 600px)": {
    // Media query for smaller devices
    fontWeight: 200,
    letterSpacing: "0rem",
    color: "inherit",
    textDecoration: "none",
    marginLeft: "1rem",
  },
}));

const ResponsiveAppBar = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [anchorEl, setAnchorEl] = useState(null);

/////////////////////////////////

const vendorDetail = useSelector((state) => state.vendorLogin);
const { vendorInfo } = vendorDetail;


//////////////////////////////////


  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    console.log("Logout clicked");
    dispatch(setVendorLogout());
    navigate("/vendor");
    // Handle logout logic here
  };




/////////////////////////////////////////////







  return (
    <>
      <StyledAppBar
        position="static"
        sx={{
          height: "80px",
          bgcolor: "primary.main",
          display: "f",
          // alignItems: "center", // Align items vertically center
          justifyContent: "center",
        }}
      >
        <Toolbar>
          <StyledIconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </StyledIconButton>
          <StyledTypography variant="h6" sx={{ marginLeft: "auto" }}>
            Liz Designs
          </StyledTypography>
          <ContentCutIcon fontSize="small" sx={{ marginLeft: "1rem" }} />
          <StyledTypography variant="h6" sx={{ marginLeft: "1rem" }}>
            Tailors
          </StyledTypography>

          {vendorInfo ? (
            <Button
              color="inherit"
              sx={{ marginLeft: "auto" }}
              onClick={handleLogout}
            >
              <LogoutIcon />
            </Button>
          ) : (
            <Button
              color="inherit"
              sx={{ marginLeft: "auto" }}
              onClick={() => {
                navigate("/vendor");
              }}
            >
              Login
            </Button>
          )}
        </Toolbar>
        {/* Responsive menu */}
        <Menu
          id="responsive-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => navigate("/vendorhome")}>Dashboard</MenuItem>
          <MenuItem onClick={() => navigate("/vendor/addproducts")}>
            Products
          </MenuItem>
          <MenuItem onClick={() => navigate("/vendor/orders")}>Orders</MenuItem>
        </Menu>
      </StyledAppBar>
    </>
  );
};

export default ResponsiveAppBar;
