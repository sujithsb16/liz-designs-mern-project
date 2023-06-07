import { Box, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react'
import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Bar,
  Legend,
  PieChart,
  Pie,
} from "recharts";
import { vendorChartApi } from '../../apiCalls/vendorApiCalls';
import { useSelector } from 'react-redux';

const Chart = () => {

  const vendor = useSelector((state) => state.vendorLogin);
  const token = vendor.vendorInfo.token;
    const [error, setError] = useState(false);
      const [loading, setLoading] = useState(false);
      const [data, setData] = useState([]);



 

    const vendorChart = useCallback(async()=>{
        try {

         const result = await vendorChartApi(token,setLoading);

         if(result.data){

            setData(result.data)

         }


            
        } catch (error) {
            
        }

    },[])

    console.log(data);


    useEffect(() => {
      vendorChart();
    }, [vendorChart]);


  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <BarChart width={500} height={250} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="sales" fill="#8884d8" />
          {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
        </BarChart>
        <Box width={"50%"}>
          <Typography variant="h4"> Your Money </Typography>
          <Box sx={{ background: "yellow", padding: 2 }}>
            <Typography variant="h6"> Your Money </Typography>
            <Typography variant="subtitle1">
              {" "}
              Total Money you Earned :
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Chart
