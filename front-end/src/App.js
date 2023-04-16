import React from 'react';
import './App.css';

import theme from './utility/CustomTheme';
import {ThemeProvider } from "@mui/material/styles";
import UserRoutes from './routes/userRoutes/UserRoutes';
import AdminRoutes from './routes/adminRoutes/AdminRoutes';
import VenderRoutes from './routes/venderRoutes/VenderRoutes';


function App() {

  
  

  return (
    <div
      className="App"
      style={{
        overflowX: "hidden", // Set overflowX to "hidden" to hide horizontal scrollbar
      }}
    >
      <ThemeProvider theme={theme}>
        <UserRoutes />
        <AdminRoutes />
        <VenderRoutes />
      </ThemeProvider>
    </div>
  );
}

export default App;
