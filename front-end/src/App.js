import React from 'react';
import './App.css';

import { LocalizationProvider } from "@mui/x-date-pickers";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import theme from './utility/CustomTheme';
import {ThemeProvider } from "@mui/material/styles";
import UserRoutes from './routes/userRoutes/UserRoutes';
import AdminRoutes from './routes/adminRoutes/AdminRoutes';
import VendorRoutes from './routes/vendorRoutes/VendorRoutes';




function App() {

  
  

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div
        className="App"
        style={{
          overflowX: "hidden", // Set overflowX to "hidden" to hide horizontal scrollbar
          // Set overflowX to "hidden" to hide horizontal scrollbar
          height: "100vh",
        }}
      >
        <ThemeProvider theme={theme}>
            <UserRoutes />
         

          <AdminRoutes />
          <VendorRoutes />
        </ThemeProvider>
      </div>
    </LocalizationProvider>
  );
}

export default App;
