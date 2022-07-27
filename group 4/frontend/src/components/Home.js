import React from 'react'
import {Link} from 'react-router-dom'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Carousel from 'react-bootstrap/Carousel'; 
import '../style/style.css';

export default function Home() {
  return (
    <Box sx={{padding: "12px", display: "flex", flexWrap: "wrap", justifyContent: "space-around", alignItems: "center", width: "100%", minHeight: '100vh'}} >
      <Box>
        <Typography variant="h4" >EXCLUSIVITY,EXCITEMENT<br />AND SOPHISTICATION</Typography>
        <Typography variant='body1' >Whatever you've got in mind <br/> we've got inside!!!</Typography>
        <Link style={{textDecoration: "none"}} to="/products">
        <Button sx={{margin: "16px 0px",backgroundColor: "black"}} variant="contained" >Explore</Button>
        </Link>
      </Box>
      {/* <img width={850} src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png" alt="home" /> */}
      <div>
      <Carousel fade>
  <Carousel.Item>
    <img
      className ="d-block w-100 Imagestyling"
      src="https://cdn.pixabay.com/photo/2018/03/26/23/07/dropshipping-3264486__340.jpg"
      alt="First slide"
    />
    <Carousel.Caption>
      
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100 Imagestyling"
      src="https://cdn.pixabay.com/photo/2016/06/19/08/58/shop-1466324__340.jpg"
      alt="Second slide"
    />

    <Carousel.Caption>
      
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100 Imagestyling"
      src="https://cdn.pixabay.com/photo/2018/03/27/10/03/online-store-3265497__340.jpg"
      alt="Third slide"
    />

    <Carousel.Caption>
      
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
    </div>
    </Box>
  )
}
