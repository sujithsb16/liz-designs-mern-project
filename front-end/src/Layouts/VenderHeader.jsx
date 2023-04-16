
// import React, { useState } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   IconButton,
//   Menu,
//   MenuItem,
//   Button,
//   Box,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import ContentCutIcon from "@mui/icons-material/ContentCut";
// import { styled } from "@mui/material/styles";

// const StyledAppBar = styled(AppBar)(({ theme }) => ({
//   flexGrow: 1,
// }));

// const StyledIconButton = styled(IconButton)(({ theme }) => ({
//   marginRight: theme.spacing(2),
// }));

// const StyledTypography = styled(Typography)(({ theme }) => ({
//   flexGrow: 1,
// }));

// const CenteredBox = styled(Box)(({ theme }) => ({
//   flexGrow: 1,
//   display: "flex",
//   alignItems: "center",
// }));

// const ResponsiveAppBar = () => {
//   const [anchorEl, setAnchorEl] = useState(null);

//   const handleMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const handleLogout = () => {
//     // Handle logout logic here
//     console.log("Logout clicked");
//   };

//   return (
//     <StyledAppBar position="static">
//       <Toolbar>
//         <StyledIconButton
//           edge="start"
//           color="inherit"
//           aria-label="menu"
//           onClick={handleMenuOpen}
//         >
//           <MenuIcon />
//         </StyledIconButton>
//         <CenteredBox flexGrow={1}>
//           <Typography
//             sx={{
//               display: { xs: "none", md: "flex" },
//               fontFamily: "Inria Serif",
//               fontWeight: 700,
//               letterSpacing: ".3rem",
//               color: "inherit",
//               textDecoration: "none",
//             }}
//             variant="h6"
//           >
//             Liz Designs
//           </Typography>
//           <ContentCutIcon fontSize="small" style={{ margin: "0 8px" }} />
//           <Typography
//             variant="h6"
//             sx={{ color: "inherit", fontFamily: "Inria Serif" }}
//           >
//             Tailors
//           </Typography>
//         </CenteredBox>
//         <Button color="inherit" onClick={handleLogout}>
//           Logout
//         </Button>
//       </Toolbar>
//       {/* Responsive menu */}
//       <Menu
//         id="responsive-menu"
//         anchorEl={anchorEl}
//         keepMounted
//         open={Boolean(anchorEl)}
//         onClose={handleMenuClose}
//       >
//         <MenuItem onClick={handleMenuClose}>Item 1</MenuItem>
//         <MenuItem onClick={handleMenuClose}>Item 2</MenuItem>
//         <MenuItem onClick={handleMenuClose}>Item 3</MenuItem>
//       </Menu>
//     </StyledAppBar>
//   );
// };

// export default ResponsiveAppBar;

import React, { useState } from "react";
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
import { Link } from "react-router-dom";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Divider from "@mui/material/Divider";

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
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Handle logout logic here
    console.log("Logout clicked");
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
          <Button
            color="inherit"
            sx={{ marginLeft: "auto" }}
            onClick={handleLogout}
          >
            <LogoutIcon />
          </Button>
        </Toolbar>
        {/* Responsive menu */}
        <Menu
          id="responsive-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Item 1</MenuItem>
          <MenuItem onClick={handleMenuClose}>Item 2</MenuItem>
          <MenuItem onClick={handleMenuClose}>Item 3</MenuItem>
        </Menu>
      </StyledAppBar>
    </>
  );
};

export default ResponsiveAppBar;
