import React from 'react';
import './App.css';

import theme from './utility/CustomTheme';
import {ThemeProvider } from "@mui/material/styles";
import UserRoutes from './routes/userRoutes/UserRoutes';

function App() {
  return (
    <div className="App">
    <ThemeProvider theme={theme}>
    <UserRoutes />
     </ThemeProvider>
    </div>
  );
}

export default App;
