import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addCartItem } from '../redux/cartSlice';
import { getProducts, deleteProduct } from '../service/Product';
import { isAdmin } from '../service/Auth';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { searchProducts } from '../service/Product';
import ReactPaginate from 'react-paginate'
import FavoriteIcon from '@mui/icons-material/Favorite';
import '../style/style.css'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Products() {
  const [proData, setProData] = useState([]);
  const [allProData, setAllProData] = useState([])
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  //Pagination 
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 3;

  useEffect(() => {
    searchProducts(location.search)
      .then(res => {
        if (res.data.err == 0) {
          /* console.log(res.data.prodata); */
          setProData(res.data.prodata)
        }
      })
  }, [location.search])

  useEffect(() => {
    getProducts()
      .then(res => {
        if (res.data.err === 0) {
          setProData(res.data.prodata)
          setAllProData(res.data.prodata)
        }
      })
  }, [])
  
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    /* console.log(`Loading items from ${itemOffset} to ${endOffset}`); */
    setCurrentItems(proData.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(proData.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, proData]);


  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % proData.length;
    setItemOffset(newOffset);
  };



  const onClickDeleteProBtn = (id) => {
    if (window.confirm("Do you want to delete the product")) {
      deleteProduct(id)
        .then(res => {
          alert("Product Deleted")
          window.location.reload()
        })
    }
  }

  const onClickSelect = (event) => {
    console.log(event.target.value);
    if (event.target.value === "Low") {
      const sortedData = [...proData].sort((a, b) => a.price - b.price)
      setProData(sortedData)
    } else {
      const sortedData = [...proData].sort((a, b) => a.price - b.price)
      setProData(sortedData.reverse())
    }
  }

  const OnClickFilter = event => {
    console.log(event.target.value);
    if (event.target.value === 'select') {
      setProData(allProData)
    } else {
      const filteredData = allProData.filter(each => each.category === event.target.value)
      setProData(filteredData)
    }

  }




  return (
    <Container>
      <h3> <center>Latest Collection</center></h3>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <select style={{ padding: "4px 15px", borderRadius: "6px", fontWeight: "bold",backgroundColor: "black",color: "white" }} onChange={onClickSelect}>
          <option style={{ fontWeight: "bold" }} value="select">Sort By Price</option>
          <option style={{ fontWeight: "bold" }} value="Low">Low to High</option>
          <option style={{ fontWeight: "bold" }} value="High">High to Low</option>
        </select>

        <select style={{ padding: "4px 15px", borderRadius: "6px", fontWeight: "bold",backgroundColor: "black",color: "white" }} onChange={OnClickFilter}>
          <option style={{ fontWeight: "bold" }} value="select">Filter By Category</option>
          <option style={{ fontWeight: "bold" }} value="Furniture">Furniture</option>
          <option style={{ fontWeight: "bold" }} value="Wall Accents">Wall Accents</option>
          <option style={{ fontWeight: "bold" }} value="Decor">Decor</option>
          <option style={{ fontWeight: "bold" }} value="Storage">Storage</option>
        </select>

      </Box>
      <Box sx={{ flexGrow: 1, p: 3, }}>
        <Grid container spacing={3}>
          {currentItems?.map(pro => {

            const addToCart = () => {
              if (localStorage.getItem('myProCart') != undefined) {
                /* console.log(each.id) */
                let arr = JSON.parse(localStorage.getItem('myProCart'))
                console.log(arr);
                const checker = arr.filter(eachObj => eachObj._id === pro._id)
                if (checker.length !== 0) {
                  alert('Item alredy added into the cart')
                } else {
                  localStorage.setItem('myProCart', JSON.stringify([...arr, { ...pro, quantity: 1 }]))
                  dispatch(addCartItem({ ...pro }))
                  alert("Item is Added to the cart")
                }
              } else {
                localStorage.setItem('myProCart', JSON.stringify([{ ...pro, quantity: 1 }]))
                dispatch(addCartItem({ ...pro }))
                alert("Item is Added to the cart")
              }
            }


            const addToWhishList = () => {
              if (localStorage.getItem('myProWhishList') != undefined) {
                /* console.log(each.id) */
                let arr = JSON.parse(localStorage.getItem('myProWhishList'))
                console.log(arr);
                const checker = arr.filter(eachObj => eachObj._id === pro._id)
                if (checker.length !== 0) {
                  alert('Item alredy added into the WishList')
                } else {
                  localStorage.setItem('myProWhishList', JSON.stringify([...arr, { ...pro, quantity: 1 }]))
                  alert("Item is Added to the WishList")
                }
              } else {
                localStorage.setItem('myProWhishList', JSON.stringify([{ ...pro, quantity: 1 }]))
                alert("Item is Added to the WishList")
              }
            }

            return (
              <Grid key={pro._id} item xs={12} sm={6} md={4}>

                <Card sx={{ maxWidth: 345, minHeight: 550, display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start" }}>
                  {!isAdmin() && <Button onClick={addToWhishList} variant="contained" sx={{margin: "10px",backgroundColor: "black"}} >WishList</Button>}
                  <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", margin: "auto" }}>
                    <CardMedia
                      component="img"
                      alt={pro.name}
                      maxheight={200}
                      image={pro.imageURL}
                    />
                  </Box>

                  <Box>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {pro.name}
                      </Typography>
                      <Typography variant="body2" color="text.dark">
                        Category : {pro.category}
                      </Typography>
                      <Typography variant="body2" color="text.dark">
                        Price : {pro.price}
                      </Typography>
                      <Typography variant="body2" color="text.dark">
                        Stock : {pro.Stock}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button variant="contained" color="secondary" size="small" onClick={() => navigate(`/product-details/${pro._id}`)}>Info</Button>
                      {!isAdmin() && <Button variant="contained" color="primary" onClick={() => {
                        addToCart()
                      }} size="small">Add To Cart</Button>}
                      {isAdmin() && <Button variant="contained" color="error" onClick={() => onClickDeleteProBtn(pro._id)} >DELETE</Button>}
                    </CardActions>
                  </Box>

                </Card>

              </Grid>
            )
          }


          )}

        </Grid>
      </Box>

      <ReactPaginate
        breakLabel="..."
        nextLabel="Next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="< Previous"
        renderOnZeroPageCount={null}
        containerClassName="pagination-cont"
        pageLinkClassName='page-link'
        previousLinkClassName='page-link'
        nextLinkClassName='page-link'
        activeLinkClassName='active-link'
      />

    </Container>
  )
}
