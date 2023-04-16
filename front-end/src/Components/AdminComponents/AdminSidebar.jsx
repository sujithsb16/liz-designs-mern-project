import React, { useEffect } from 'react'
import { AppBar, CssBaseline, Drawer, List, ListItem, ListItemButton, ListItemIcon, Toolbar, Typography } from '@mui/material';
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
import { AdminLogout } from '../../actions/adminActions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import LogoutIcon from "@mui/icons-material/Logout";

const AdminSidebar = (props) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const adminLogoutHandler = (e)=>{
         dispatch(AdminLogout());
         navigate("/admin/");
    }
    const adminLogOut = useSelector((state) => state.adminLogin);
    const  adminInfo  = adminLogOut;

    useEffect(()=>{
        if(!adminInfo.adminInfo){
            navigate("/admin/");
        }else{
          console.log(adminInfo);
        }
    },[navigate,adminInfo])
    


    const drawerWidth = 240;
  return (
    <>
      <Box
        sx={{ display: "flex", minHeight: "100vh",}}
      >
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar sx={{ display: "flex" }}>
            <Typography variant="h6" noWrap component="div" textAlign="center">
              Admin
            </Typography>
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
        <Drawer
          // anchor="right"
          variant="permanent"
          sx={{
            width: 240,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: 240,
              boxSizing: "border-box",
            },
            "@media (max-width: 600px)": {
              // Media query for smaller devices
              width: 180, // Width for smaller devices
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: {
                width: 180,
                boxSizing: "border-box",
              },
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: "auto" }}>
            <List>
              {[
                { text: "Dashboard", href: "/admin/dashboard" },
                { text: "Users", href: "/admin/users" },
                { text: "Tailors", href: "/admin/tailors" },
                { text: "Products", href: "/admin/products" },
              ].map((item) => (
                <ListItem key={item.text} disablePadding>
                  <ListItemButton
                    sx={{
                      borderRadius: "50px",
                      marginTop: "1rem",
                      bgcolor: "info.main",
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
        {props.props}
      </Box>
    </>
  );
}

export default AdminSidebar
