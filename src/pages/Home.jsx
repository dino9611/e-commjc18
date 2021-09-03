import React, { Component,memo } from 'react';
import { Link } from 'react-router-dom';
import Header from './../components/Header'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
import axios from 'axios';
import { API_URL } from '../helpers/ApiUrl';
import { converToRupiah } from '../helpers/converToRupiah';

class Home extends Component {
    state = {
        products:[]
    }

    componentDidMount(){
        axios.get(`${API_URL}/products?_expand=category`)
        .then((res)=>{
            this.setState({products:res.data})
        })
    }

    renderCard = ()=>{
        return this.state.products.map((val,index)=>{
            return(
                <div key={index} className="col-md-3 my-3">
                    <Card className='shadow' >
                        <CardImg  top width="100%" className='card-prod-img ' src={val.image} alt="Card image cap" />
                        <CardBody>
                            <CardTitle tag="h5" className='text-capitalize'>{val.name}</CardTitle>
                            <CardSubtitle tag="h5" className="mb-2 text-muted">{converToRupiah(val.price) }</CardSubtitle>
                            <CardSubtitle tag="h6" className="mb-2 text-muted">{val.category.name}</CardSubtitle>
                        </CardBody>
                    </Card>
                </div>
            )
        })
    }

    render() { 
        return (
            <div>
                <Header/>
                <div className="product-container">
                    <div className=''>

                        <div className='mt-5 px-5'>
                            <div className='bg-danger' style={{height:'80vh',position:'sticky'}}>
                                <h2>Filter </h2>

                            </div>
                        </div>

                    </div>
                    <div className="container">
                        <div className="row">
                            {this.renderCard()}

                            
                        </div>
                    </div>

                </div>

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