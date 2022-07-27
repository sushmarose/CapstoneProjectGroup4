import React, { useEffect, useState } from 'react'
import "./Dashb.css"
import { isLoggedIn, isAdmin, doLogout,getUser} from '../service/Auth';
import { getProducts} from '../service/Product';
import { Doughnut } from "react-chartjs-2";
import '../style/style.css'
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);
function Dashboard() {
  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#093848"],
        hoverBackgroundColor: ["#44513c", "#9a745c"],
        data: [],
      },
    ],
  };
    const [totalProduct, settotalProduct] = useState([])
  const [outOfStock, setoutOfStock] = useState(0)
  const [totalAmount, settotalAmount] = useState(0)

  
  useEffect(() => {
    getProducts()
      .then(res => {
        if (res.data.err === 0) {
          settotalProduct(res.data.prodata)
          const productData=res.data.prodata;
          for (let index = 0; index < productData.length; index++) {
            if(productData[index].Stock<=0) setoutOfStock(outOfStock+1);
            settotalAmount(totalAmount+productData[index].price)
          }
        }
      })
  }, [])
  return (
    <div>
         <h1 class="heading-name">Dashboard</h1>
    <div class="col-div-3">
        <div class="box">
            <center>
            <p>{totalProduct.length}<br/><span>Products</span></p>
            <i class="fa fa-users box-icon"></i>
            </center>
        </div>
    </div>
    <div class="col-div-3">
        <div class="box">
            <center>
            <p>1<br/><span>Orders</span> <br/></p>
            
            <i class="fa fa-list box-icon"></i>
            </center>
        </div>
    </div>
    <div class="col-div-3">
        <div class="box">
            <center>
            <p>2<br/><span>Users</span></p>
            <i class="fa fa-shopping-bag box-icon"></i>
            </center>
        </div>
    </div>
    <div class="col-div-3">
        <div class="box">
            <center>
            <p>2<br/><span>Out of Stock</span></p>
            <i class="fa fa-tasks box-icon"></i>
            </center>
        </div>
    </div>
    <div class="clearfix"></div>
    <br/><br/>
    <div class="col-div-12 padding-css">
        <div class="box">
            <center>
            <p>76,046 Rs<br/><span>Total Amount</span></p>
            <i class="fa fa-tasks box-icon"></i>
            </center>
        </div>
    </div>
    
    <div className="doughnutChart">
                  <Doughnut data={doughnutState} />
                </div>
        
    </div>
  )
}

export default Dashboard