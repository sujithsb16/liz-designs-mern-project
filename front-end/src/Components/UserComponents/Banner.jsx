import { Box } from '@mui/system'
import React, { Fragment } from 'react'
import banner from "../../assets/banner1.jpg"

const Banner = () => {




  return (
    <Fragment>
        <Box component='img'
        src={banner}
        alt="banner-main"
        sx={{
            height:"auto",
            maxWidth: '100%',
            marginTop:{xs:1,sm:1.5,md:2,lg:3}
          }} ></Box>
    </Fragment>
  )
}

export default Banner
