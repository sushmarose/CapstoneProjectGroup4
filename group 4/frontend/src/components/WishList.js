import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom';
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
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from '@mui/material/Divider';
import { deleteCartItem, updateCart } from '../redux/cartSlice';
import { addCartItem } from '../redux/cartSlice';


export default function WishList() {
    const reduxData = useSelector((store) => store.cart.data)
    /*   const reduxTotalValue = reduxData.reduce((total, each) => total += parseInt(each.price), 0) */

    const data = JSON.parse(localStorage.getItem("myProWhishList"))
    const totalValue = data.reduce((total, each) => total += parseInt(each.price) * parseInt(each.quantity), 0)

    const navigate = useNavigate()
    const dispatch = useDispatch()




    return (
        <Container>
            <h1>WISH LIST</h1>

            <Box sx={{ flexGrow: 1, p: 3, }}>
                <Grid container spacing={3}>
                    {data?.map(pro => {

                        const onClickDeleteButton = () => {
                            console.log("delete fn called");
                            const updatedData = data.filter(item => item._id !== pro._id)
                            console.log(updatedData);
                            localStorage.setItem('myProWhishList', JSON.stringify(updatedData))
                            navigate("/wishlist")
                        }

                        const addToCart = () => {
                            if (localStorage.getItem('myProCart') != undefined) {
                                /* console.log(each.id) */
                                let arr = JSON.parse(localStorage.getItem('myProCart'))
                                console.log(arr);
                                const checker = arr.filter(eachObj => eachObj._id === pro._id)
                                if (checker.length !== 0) {
                                    alert('Item is already in the cart')
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

                        return (
                            <Grid key={pro._id} item xs={12}>
                                <Card sx={{ display: 'flex', justifyContent: 'space-between', alignItems: "center", p: 2 }} >
                                    <Box sx={{ width: "300px" }}>
                                        <CardMedia
                                            component="img"
                                            alt={pro.name}
                                            sx={{
                                                width: 150,
                                            }}
                                            image={pro.imageURL}
                                        />
                                        <Typography variant="h6">{pro.name}</Typography>
                                        <Typography variant="h6">Rs {pro.price}/-</Typography>
                                    </Box>
                                    <Button onClick={addToCart} variant="contained" >Add To Cart</Button>
                                    <CardActions>
                                        <Button onClick={onClickDeleteButton} variant="outlined" color="error" startIcon={<DeleteIcon />}>
                                            Delete
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        )
                    }
                    )}

                </Grid>

                    {data.length == 0 && <Typography variant="h5" >No Items in the WishList</Typography>}
            </Box>
        </Container>
    )
}
