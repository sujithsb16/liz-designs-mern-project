import React, { useEffect, useState } from 'react'
import { AppBar, CssBaseline, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, Toolbar, Typography, useMediaQuery } from '@mui/material';
import Box from "@mui/material/Box";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import GroupIcon from "@mui/icons-material/Group";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CheckroomIcon from '@mui/icons-material/Checkroom';
// import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import Divider from "@mui/material/Divider";
import { AdminLogout, allVendorList } from '../../actions/adminActions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import LogoutIcon from "@mui/icons-material/Logout";
import CategoryIcon from "@mui/icons-material/Category";
import { setAdminLogout } from '../../Redux/adminSlice';
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { styled, useTheme } from "@mui/material/styles";



const AdminSidebar = (props) => {
    const { window } = props;


    const [mobileOpen, setMobileOpen] = React.useState(false);
 const handleDrawerToggle = () => {
   setMobileOpen(!mobileOpen);
 };

  //  const container =
  //    window !== undefined ? () => window().document.body : undefined;



    const navigate = useNavigate();
    const dispatch = useDispatch();

    const adminLogoutHandler = (e)=>{
         dispatch(setAdminLogout());
        //  navigate("/admin/");
    }
    const adminLogOut = useSelector((state) => state.adminLogin);
    const  adminInfo  = adminLogOut;
    const adminInf  = useSelector((state) => state.adminLogin.adminInfo);

    useEffect(()=>{
        if(!adminInfo.adminInfo){
            navigate("/admin/");
        }else{
          console.log(adminInf);
        }
    },[navigate,adminInfo])

    //  useEffect(() => {
    //    dispatch(allVendorList());

    //    // console.log(allVendor);
    //  }, [dispatch,]);
    console.log(props);

      const location = useLocation();

      const [data, setData] = useState([]);

      // useEffect(() => {
      //   const graphData = async () => {
      //     const res = await graphDataApi();
      //     setData(res);
      //     console.log(res);
      //     console.log(data);
      //   };
      //   graphData();
      // }, []);

        const container =
          window !== undefined ? () => window().document.body : undefined;


      console.log(data);

      const [open, setOpen] = React.useState(true);
        const theme = useTheme();
           const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));



      const handleDrawerOpen = () => {
        setOpen(true);
      };

      const handleDrawerClose = () => {
        setOpen(false);
      };




    const drawerWidth = 240;
  return (
    <>
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar sx={{ display: "flex" }}>
            <Typography variant="h6" noWrap component="div" textAlign="center">
              Admin
            </Typography>

            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, marginLeft: "1rem", display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              variant="h6"
              noWrap
              sx={{ marginLeft: "auto" }}
              component="div"
              textAlign="center"
              onClick={() => {
                adminLogoutHandler();
              }}
              //   sx={{ flexGrow: 1 }}
            >
              <LogoutIcon />
            </Typography>
          </Toolbar>
        </AppBar>
        {/* <Drawer
          variant="permanent"
          sx={{
            width: 240,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: 240,
              boxSizing: "border-box",
            },
            "@media (max-width: 600px)": {
              display: "none", // Hide the drawer for screens smaller than 600px
            },
          }}
        > */}
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            // container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            <Toolbar />
            <Box sx={{ overflow: "auto" }}>
              <List sx={{ padding: ".5vw" }}>
                {[
                  { text: "Dashboard", href: "/admin/dashboard" },
                  { text: "Users", href: "/admin/users" },
                  { text: "Tailors", href: "/admin/tailors" },
                  { text: "Products", href: "/admin/products" },
                  { text: "Category", href: "/admin/category" },
                  { text: "Banner", href: "/admin/banner" },
                  { text: "Coupon", href: "/admin/coupon" },
                  { text: "Orders", href: "/admin/orders" },
                ].map((item) => (
                  <ListItem key={item.text} disablePadding>
                    <ListItemButton
                      sx={{
                        borderRadius: "50px",
                        marginTop: "1rem",
                        bgcolor:
                          location.pathname === item.href
                            ? "warning.main"
                            : "info.main",
                      }}
                      divider
                      component={Link}
                      to={item.href}
                    >
                      <ListItemIcon>
                        {item.text === "Dashboard" ? (
                          <DashboardIcon />
                        ) : item.text === "Users" ? (
                          <GroupIcon />
                        ) : item.text === "Tailors" ? (
                          <ContentCutIcon />
                        ) : item.text === "Products" ? (
                          <CheckroomIcon />
                        ) : item.text === "Category" ? (
                          <CategoryIcon />
                        ) : item.text === "Banner" ? (
                          <ViewCarouselIcon />
                        ) : item.text === "Coupon" ? (
                          <LocalOfferIcon />
                        ) : item.text === "Orders" ? (
                          <ShoppingBasketIcon />
                        ) : (
                          ""
                        )}
                      </ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "ltr" ? (
                  <ChevronLeftIcon />
                ) : (
                  <ChevronRightIcon />
                )}
              </IconButton>
            </Box>
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            <Toolbar />

            <Box sx={{ overflow: "auto" }}>
              <List sx={{ padding: ".5vw" }}>
                {[
                  { text: "Dashboard", href: "/admin/dashboard" },
                  { text: "Users", href: "/admin/users" },
                  { text: "Tailors", href: "/admin/tailors" },
                  { text: "Products", href: "/admin/products" },
                  { text: "Category", href: "/admin/category" },
                  { text: "Banner", href: "/admin/banner" },
                  { text: "Coupon", href: "/admin/coupon" },
                  { text: "Orders", href: "/admin/orders" },
                ].map((item) => (
                  <ListItem key={item.text} disablePadding>
                    <ListItemButton
                      sx={{
                        borderRadius: "50px",
                        marginTop: "1rem",
                        bgcolor:
                          location.pathname === item.href
                            ? "warning.main"
                            : "info.main",
                      }}
                      divider
                      component={Link}
                      to={item.href}
                    >
                      <ListItemIcon>
                        {item.text === "Dashboard" ? (
                          <DashboardIcon />
                        ) : item.text === "Users" ? (
                          <GroupIcon />
                        ) : item.text === "Tailors" ? (
                          <ContentCutIcon />
                        ) : item.text === "Products" ? (
                          <CheckroomIcon />
                        ) : item.text === "Category" ? (
                          <CategoryIcon />
                        ) : item.text === "Banner" ? (
                          <ViewCarouselIcon />
                        ) : item.text === "Coupon" ? (
                          <LocalOfferIcon />
                        ) : item.text === "Orders" ? (
                          <ShoppingBasketIcon />
                        ) : (
                          ""
                        )}
                      </ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
             
            </Box>
          </Drawer>
        </Box>

        {location.pathname === "/admin/dashboard" ? (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Box sx={{ width: "40%" }}> {props.chart}</Box>
            <Box sx={{ width: "40%" }}>{props.orderChart}</Box>
          </Box>
        ) : (
          ""
        )}
        {props.props}
        {/* <Box sx={{ marginTop: "11vh" }}>
          <Typography
            fontWeight={{ xs: 400, sm: 500, md: 600, lg: 800 }}
            sx={{
              fontFamily: "Inria Serif",
              color: "primary.main",
              textAlign: "center",
              fontSize: {
                xs: "1.7rem",
                sm: "1.75rem",
                md: "2rem",
                lg: "1.4rem",
              },
            }}
          >
            Total Revenue : ₹{data.delivered + data.unDelivered}
          </Typography>
          <Typography
            fontWeight={{ xs: 400, sm: 500, md: 600, lg: 800 }}
            sx={{
              fontFamily: "Inria Serif",
              color: "primary.main",
              textAlign: "center",
              fontSize: {
                xs: "1.7rem",
                sm: "1.75rem",
                md: "2rem",
                lg: "1.4rem",
              },
            }}
          >
            Total Delivered : ₹{data.delivered}
          </Typography>
          <Typography
            fontWeight={{ xs: 400, sm: 500, md: 600, lg: 800 }}
            sx={{
              fontFamily: "Inria Serif",
              color: "primary.main",
              textAlign: "center",
              fontSize: {
                xs: "1.7rem",
                sm: "1.75rem",
                md: "2rem",
                lg: "1.4rem",
              },
            }}
          >
            Total Not Delivered : ₹{data.unDelivered}
          </Typography>
        </Box> */}
      </Box>
    </>
  );
}

export default AdminSidebar
