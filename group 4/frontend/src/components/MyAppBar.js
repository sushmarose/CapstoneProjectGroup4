import React, { useState, useEffect }  from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import Badge from '@mui/material/Badge';
import { useNavigate } from 'react-router-dom'
import { isLoggedIn, isAdmin, doLogout,getUser} from '../service/Auth';
import { useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import { InputBase } from '@mui/material';
import TextField from '@mui/material/TextField';


export default function MyAppBar() {

  const [filter,setFilter]=useState("");
  const navigate = useNavigate();
  const data = useSelector((store) => store.cart.data)
  console.log("admin tom",getUser())
  useEffect(()=>{
    let searchParams = new URLSearchParams();
      if(filter){
        searchParams.set("name",filter);
      }
      navigate({
        pathname:"/products",
        search:searchParams.toString()
      })
  },[filter])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" style = {{backgroundColor: "black"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 0 }}
          >
            <ShoppingBagIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1}}>
          Shop For Home
          </Typography>
          {isLoggedIn() && (
            <Box sx={{flexGrow: 1, display: "flex", alignItems: "center", borderRadius: "5px", backgroundColor: "#D3D3D3", opacity: 0.9}}>
              <SearchIcon style={{color: "#222"}} />
              <TextField sx={{border: "none", outline: "none", width: "100%", p:0, borderRadius: 2}}  onChange={(event)=> setFilter(event.target.value)} id="search" placeholder="Search for products" size="small" variant="outlined" />
            </Box>
          )}
          {!isLoggedIn() && (
            <>
              <Button color="inherit" onClick={() => navigate("/login")}>Login</Button>
              <Button color="inherit" onClick={() => navigate("/signup")}>SignUp</Button>
            </>
          )}
          {isLoggedIn() && (
            <>
              <Button color="inherit" onClick={() => navigate("/")}>Home </Button>
               
            </>
          )}
          {isLoggedIn() && (
            <>
              <Button color="inherit" onClick={() => navigate("/products")}>Products</Button>
            </>
          )}
          {isLoggedIn() && isAdmin() && (
            <>
              <Button color="inherit" onClick={() => navigate("/addproduct")}>Add Product</Button>
            </>
          )}
          {isLoggedIn() && isAdmin() && (
            <>
              <Button color="inherit" onClick={() => navigate("/bulkupload")}>Bulk Upload</Button>
            </>
          )}
          {isLoggedIn() && !isAdmin() && (
            <>
              {/* <Button color="inherit" onClick={() => navigate("/wishlist")}>WishList</Button> */}
              <Button color="inherit" onClick={() => navigate("/wishlist")} >
                wishlist
                <Badge  color="success">
                  <FavoriteIcon />
                </Badge>
              </Button>
            </>
          )}
          {isLoggedIn() && !isAdmin () &&(
            <>
              <Button color="inherit" onClick={() => navigate("/cart")} >
                Cart
                <Badge sx={{mx: 1}} badgeContent={data.length} color="success">
                  <ShoppingCartIcon />
                </Badge>
              </Button>

            </>
          )}
          {isLoggedIn() && isAdmin() && (
            <>
              <Button color="inherit" onClick={() => navigate("/Dashboard")}>Dashboard</Button>
            </>
          )}
          {isLoggedIn() && (
            <>
              <Button color="inherit" onClick={doLogout}>Logout</Button>
            </>
          )}

        </Toolbar>
      </AppBar>
    </Box>
  );
}
