import { Typography } from '@mui/material'
import React from 'react'

const NewArrivals = () => {
  return (
    <div>
      <Typography
      variant='h4' 
      fontWeight={{xs:400,sm:500,md:600,lg:800}}
      my={{xs:.5,sm:1,md:1.6,lg:2}} 
      sx={{ 
      fontFamily: 'Inria Serif',
      color:'primary.main',
       }
      }>
  New Arriavals
</Typography>
    </div>
  )
}

export default NewArrivals
