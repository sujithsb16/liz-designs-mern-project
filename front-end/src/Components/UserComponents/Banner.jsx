import { Box } from '@mui/system'
import React, { Fragment, useCallback, useEffect, useState } from 'react'
import banner from "../../assets/banner1.jpg"
import { userBanner } from '../../apiCalls/userApiCalls'

const Banner = () => {

  const [banner, setBanner] = useState("")
const [error, setError] = useState(false);
const [loading, setLoading] = useState(false);

  const getBanner = useCallback(async () => {
    try {
      setLoading(true);
      const result = await userBanner(setLoading);
      if (result.data) {
        console.log("test 4 ");
        console.log(result.data);
        setBanner(result.data);
      } else {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 4000);
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {}
  }, []);
  
  useEffect(() => {
    getBanner();
  }, [getBanner]);



  return (
    <Fragment>
        <Box component='img'
        src={banner?.image?.url}
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
