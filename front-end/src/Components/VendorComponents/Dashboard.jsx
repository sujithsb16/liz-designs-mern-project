import { Box } from '@mui/material'
import React from 'react'
import Chart from './Chart';

const Dashboard = () => {
    
  return (
    <>
      <Box sx={{ width: "100%", background: "#E9E8E8" }}>
        <Chart />
      </Box>
    </>
  );
}

export default Dashboard
