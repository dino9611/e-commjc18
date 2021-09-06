import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "./../components/Header";
// import { Card, CardImg, CardBody, CardTitle, CardSubtitle } from "reactstrap";
// import axios from "axios";
// import { API_URL } from "../helpers/ApiUrl";
// import { converToRupiah } from "../helpers/converToRupiah";
// import Typography from "@material-ui/core/Typography";
// import Breadcrumbs from "@material-ui/core/Breadcrumbs";
class Home extends Component {
  state = {};

  render() {
    return (
      <div>
        <Header />
        <Link to="/products">All Products</Link>
        {/* <Link to='/login'>
                    TO LOGIN
                    </Link>

                <input type="text" onChange = {debounce(1000,(e)=>this.tes(e,2))} />
                <button onClick={()=>{
                    localStorage.removeItem('id')
                }}>logout</button> */}
      </div>
    );
  }
}

export default Home;
