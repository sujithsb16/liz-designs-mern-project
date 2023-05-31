import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { useDispatch, useSelector } from "react-redux";
import { setUserLogout } from "../Redux/userSlice";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";


const links = [ "/shop","/profile"];

const pages = [ "Shop","Profile"];
const settings = ["Profile", "Logout"];

function Header() {
const MySwal = withReactContent(Swal);

  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  console.log(userLogin);
  let userInfo
  if(userLogin){
     userInfo = userLogin.userInfo;
     console.log(userInfo);

    }else{
      userInfo = null;
    }
 const handleShoppingCartClick = () => {
 MySwal.fire({
   icon: "warning",
   title: "Please Login",
   time: 4000,
 }).then(() => {
   loginHandler();
 });  
 };
 const handleWishlistClick = () => {
   MySwal.fire({
     icon: "warning",
     title: "Please Login",
     time: 4000,
   }).then(() => {
     loginHandler();
   });
 };


const logoutHandler = () => {
  dispatch(setUserLogout());
  navigate("/");
  console.log(userInfo);
};

const loginHandler = () => {
  navigate("/usersignin");
}
  



  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  return (
    <>
      <AppBar
        position="static"
        sx={{
          height: "100px",
          bgcolor: "primary.main",
          display: "flex",
          alignItems: "center", // Align items vertically center
          justifyContent: "center",
        }}
      >
        <Container maxWidth="xl" sx={{ bgcolor: "primary.main" }}>
          <Toolbar
            disableGutters
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Typography
              variant="h6"
              noWrap
              component="a"
              onClick={() => navigate("/")}
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "Inria Serif",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Liz Designs
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page, index) => {
                  // Check if the current page is "Profile" and userInfo is null
                  if (page === "Profile" && !userInfo) {
                    return null; // Return nothing to hide the link
                  }
                  // Otherwise, render the link as usual
                  return (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Link
                        key={index}
                        to={`${links[index]}`}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <Typography textAlign="center" fontFamily="Inria Serif">
                          {page}
                        </Typography>
                      </Link>
                    </MenuItem>
                  );
                })}
              </Menu>
            </Box>
            {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
            <Typography
              variant="h5"
              noWrap
              component="a"
              onClick={() => navigate("/")}
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "Inria Serif",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                "@media (max-width: 600px)": {
                  fontWeight: 200,
                  letterSpacing: ".2rem",
                },
              }}
            >
              Liz Designs
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                textDecoration: "none",
              }}
            >
              {pages.map((page, index) => {
                // Check if the current page is "Profile" and userInfo is null
                if (page === "Profile" && !userInfo) {
                  return null; // Return nothing to hide the link
                }
                // Otherwise, render the link as usual
                return (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Link
                      key={index}
                      to={`${links[index]}`}
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      <Typography textAlign="center" fontFamily="Inria Serif">
                        {page}
                      </Typography>
                    </Link>
                  </MenuItem>
                );
              })}
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                "@media (max-width: 600px)": {
                  marginRight: 1,
                  gap: 2,
                },
              }}
            >
              {userInfo ? (
                <FavoriteIcon onClick={() => navigate("/wishlist")} />
              ) : (
                <FavoriteIcon onClick={handleWishlistClick} />
              )}
              {userInfo ? (
                <ShoppingCartIcon onClick={() => navigate("/cart")} />
              ) : (
                <ShoppingCartIcon onClick={handleShoppingCartClick} />
              )}

              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {userInfo ? (
                    <Typography
                      textAlign="center"
                      sx={{ fontFamily: "Inria Serif", fontSize: 18 }}
                      color="white"
                    >
                      {userInfo.name}
                    </Typography>
                  ) : (
                    <Avatar alt="" src="" />
                  )}
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "3.5vh", ml: "3vw" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  {userInfo ? (
                    <Typography
                      textAlign="center"
                      onClick={() => {
                        logoutHandler();
                      }}
                    >
                      Logout
                    </Typography>
                  ) : (
                    <Typography
                      textAlign="center"
                      onClick={() => {
                        loginHandler();
                      }}
                    >
                      Login
                    </Typography>
                  )}
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
export default Header;
