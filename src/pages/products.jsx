import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "./../components/Header";
import { Card, CardImg, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import axios from "axios";
import { API_URL } from "../helpers/ApiUrl";
import { converToRupiah } from "../helpers/converToRupiah";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { debounce } from "throttle-debounce";

class Products extends Component {
  state = {
    products: [],
    pass: "",
    statusAlert: false,
    nameFilter: "",
    categoryId: 0,
    priceMin: "",
    priceMax: "",
    categories: [],
  };

  componentDidMount() {
    // axios
    //   .get(`${API_URL}/products?_expand=category`)
    //   .then((res) => {
    //     this.setState({ products: res.data });

    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    let categories = axios.get(`${API_URL}/categories`);
    let products = axios.get(`${API_URL}/products?_expand=category`);

    Promise.all([categories, products]).then((res) => {
      console.log(res);
      this.setState({ products: res[1].data, categories: res[0].data });
    });
  }

  productFilterHandler = () => {
    let { nameFilter, categoryId, priceMax, priceMin } = this.state;
    let url = `${API_URL}/products?_expand=category`;
    if (nameFilter) {
      url += `&name_like=${nameFilter}`;
    }
    if (categoryId != "0") {
      url += `&categoryId=${categoryId}`;
    }
    if (priceMax) {
      url += `&price_lte=${priceMax}`;
    }
    if (priceMin) {
      url += `&price_gte=${priceMin}`;
    }

    axios.get(url).then((res) => {
      console.log(res);
      this.setState({ products: res.data });
    });
  };

  componentDidUpdate(prevprops, prevstate) {
    if (
      prevstate.categoryId !== this.state.categoryId ||
      prevstate.priceMax !== this.state.priceMax ||
      prevstate.priceMin !== this.state.priceMin
    ) {
      this.productFilterHandler();
    } else if (prevstate.nameFilter !== this.state.nameFilter) {
      this.productFilterHandler();
    }
  }

  renderCard = () => {
    return this.state.products.map((val, index) => {
      return (
        <div key={index} className="col-md-3 my-3">
          <Link
            className="txt-link"
            to={{
              pathname: `/products/${val.id}`,
              state: val, // value di property state harus object // val sudah object
            }}
          >
            <Card className="shadow">
              <CardImg
                top
                width="100%"
                className="card-prod-img skeleton "
                src={val.image}
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
                  {val.category.name}
                </CardSubtitle>
              </CardBody>
            </Card>
          </Link>
        </div>
      );
    });
  };

  rendreBreadCrumbd = () => {
    return (
      <Breadcrumbs aria-label="breadcrumb" className="mt-3">
        <Link className="link-breadCrumb txt-link" to="/">
          Home
        </Link>
        <Typography style={{ color: "#003e4d", fontWeight: "bold" }}>
          Products
        </Typography>
      </Breadcrumbs>
    );
  };

  cek = () => {
    const reg = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})"
    );
    if (reg.test(this.state.pass)) {
      // alert("berhasil");
      this.setState({ statusAlert: false });
    } else {
      this.setState({ statusAlert: true });
    }
  };

  inputChange = (e) => {
    console.log(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
    // this.productFilterHandler();
  };

  renderCategories = () => {
    return this.state.categories.map((val, index) => {
      return (
        <option key={index} value={val.id}>
          {val.name}
        </option>
      );
    });
  };
  render() {
    return (
      <div>
        <Header />
        <div className="product-container">
          <div className="">
            <div className="mt-5 px-5">
              <div
                className="bg-danger"
                style={{ height: "80vh", position: "sticky" }}
              >
                <div>
                  <select
                    onChange={this.inputChange}
                    name="categoryId"
                    value={this.state.categoryId}
                  >
                    <option value={0}>All</option>
                    {this.renderCategories()}
                  </select>
                </div>
                <div>
                  <input
                    type="text"
                    name="nameFilter"
                    // value={this.state.nameFilter}
                    onChange={debounce(700, this.inputChange)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            {this.rendreBreadCrumbd()}
            <div className="row">{this.renderCard()}</div>
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

export default Products;