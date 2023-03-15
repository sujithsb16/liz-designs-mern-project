import { Card, CardContent, CardMedia, Typography, CardActions } from '@mui/material'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import React, { Fragment } from 'react'
import { useState } from 'react'
import product1 from '../../assets/single product.jpg'

const Cards = (props) => {

  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
    console.log(props.isSmall)
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const cardNames=[ {name:'Dress 1',image:product1},{name:'Dress 2',image:product1},
    {name:'Dress 3',image:product1},{name:'Dress 4',image:product1}]




  return (

    

    <Fragment>
      <div>{props.isSmall}</div>
        <Grid container sx={{display:'flex',justifyContent:'center'}}  >
        {cardNames.map((value,index)=>{
           return  <Grid  
            xs={12} sm={6} lg={3} item key={index} sx={{borderRadius:5}}>
           
          <Card
          key={index}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          sx={{ position: 'relative', margin: '10px', borderRadius:3,bgcolor:'warning.main',  }}
          
        >
           
           <CardMedia
            image={value.image}
            sx={{
              height:{xs:200,sm:250},
              opacity: hoveredIndex === index ? 0.5 : 1,
            }}
          />
          
          
      {hoveredIndex === index && (
            <CardActions style={{ position: 'absolute', top: '90%', left: '50%', transform: 'translate(-50%, -50%)' }}>
              <Button variant="contained" color="primary">
               View
              </Button>
            </CardActions>
          )}
            < CardContent>
          <Typography color="primary" variant='h6' fontWeight={{xs:550}} >{value.name}</Typography>
          </CardContent>
           </Card>
            </Grid>
        
    } )} 
    </Grid>
    </Fragment>
  )
}

export default Cards
