import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "./../components/Header";
import HomeImage from "./../assets/Home.jpg";
import ButtonComp from "./../components/Button";
import Slider from "react-slick";
import axios from "axios";
import { API_URL } from "../helpers/ApiUrl";
import { Card, CardImg, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import { FiArrowRightCircle, FiArrowLeftCircle } from "react-icons/fi";
// import axios from "axios";
// import { API_URL } from "../helpers/ApiUrl";
import { converToRupiah } from "../helpers/converToRupiah";
// import Typography from "@material-ui/core/Typography";
// import Breadcrumbs from "@material-ui/core/Breadcrumbs";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <FiArrowRightCircle
      className={className}
      style={{ ...style, display: "block", color: "#003e4d" }}
      onClick={onClick}
    />
  );
}

function SamplebeforeArrow(props) {
  const { className, style, onClick } = props;
  return (
    <FiArrowLeftCircle
      className={className}
      style={{ ...style, display: "block", color: "#003e4d" }}
      onClick={onClick}
    />
  );
}
class Home extends Component {
  state = {
    products: [],
  };

  componentDidMount() {
    axios.get(`${API_URL}/products?limit=7`).then((res) => {
      this.setState({ products: res.data });
    });
  }

  renderCard = () => {
    return this.state.products.map((val, index) => {
      return (
        <Link
          key={index}
          className="txt-link"
          to={{
            pathname: `/products/${val.id}`,
            state: val, // value di property state harus object // val sudah object
          }}
        >
          <Card className="shadow mx-2">
            <CardImg
              top
              width="100%"
              className="card-prod-img skeleton "
              src={API_URL + val.image}
              alt="Card image cap"
            />
            <CardBody>
              <CardTitle tag="h5" className="text-capitalize">
                {val.name}
              </CardTitle>
              <CardSubtitle tag="h5" className="mb-2 text-muted">
                {converToRupiah(val.price)}
              </CardSubtitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">
                {val.category}
              </CardSubtitle>
            </CardBody>
          </Card>
        </Link>
      );
    });
  };

  render() {
    const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplebeforeArrow />,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
    return (
      <div>
        <Header />
        <div className="row home-top  m-0">
          <div className="col-md-5 order-md-first box-home d-flex justify-content-center align-items-center p-5">
            <div className="lingkaran"></div>
            <div className="lingkaran1"></div>
            <div className="jumbo-text">
              <h1>AKEA</h1>
              <h2>Furniture for Your HOME.</h2>
              <h6 className="text-secondary">
                We Create your Home more Aesthetic
              </h6>
              <Link to="/products">
                <ButtonComp className="px-1 py-2 w-50 btn-jumbo">
                  See All Product
                </ButtonComp>
              </Link>
            </div>
          </div>
          <div className="col-md-7 order-first p-0 m-0">
            <img
              className="home-img"
              height="100%"
              width="100%"
              src={HomeImage}
              alt="home"
            />
          </div>
        </div>
        <div className="jumbo2">
          <div
            style={{ height: "20vh" }}
            className="container d-flex justify-content-center align-items-center"
          >
            <h1>Furniture Terbaik </h1>
          </div>
        </div>
        <div className="px-5 py-4">
          <Slider {...settings}>{this.renderCard()}</Slider>
        </div>
        <div className="jumbo2">
          <div
            style={{ height: "40vh" }}
            className="container d-flex justify-content-center align-items-center"
          >
            <h1>Footer </h1>
          </div>
        </div>

        {/* <Link to="/products">All Products</Link> */}
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
