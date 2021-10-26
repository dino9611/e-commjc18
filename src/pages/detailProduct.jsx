import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "./../components/Header";
import NumberFormat from "react-number-format";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import axios from "axios";
import { API_URL } from "../helpers/ApiUrl";
import Loading from "../components/loading";
import { connect } from "react-redux";
import { converToRupiah } from "../helpers/converToRupiah";
import ButtonComp from "../components/Button";
import { AddToCartAction } from "./../redux/actions";
import { toast } from "react-toastify";

class DetailProd extends Component {
  state = {
    detailProd: {},
    loading: true,
    qty: 1,
  };

  componentDidMount() {
    console.log(this.props.location.state);
    let idProd = this.props.match.params.idProd;
    // kalo statenya false /kosong maka get data lagi dengan idprod
    if (!this.props.location.state) {
      axios
        .get(`${API_URL}/products/${idProd}`, {
          params: {
            _expand: "category",
          },
        })
        .then((res) => {
          this.setState({ detailProd: res.data });
        })
        .catch((err) => {
          alert("server error");
        })
        .finally(() => {
          this.setState({ loading: false });
        });
    } else {
      this.setState({ loading: false, detailProd: this.props.location.state });
    }
  }

  onAddTocartClick = () => {
    let userId = this.props.userData.id;
    if (this.props.userData.role !== "user") {
      if (this.props.userData.isLogin) {
        toast.error("tidak bisa belanja karena admin");
      } else {
        toast.error("tidak bisa belanja karena belum login");
      }
      return; // biar koding berenti disini
    }
    let dataProd = this.state.detailProd;
    let AddCart = {
      ...dataProd,
      qty: parseInt(this.state.qty),
    };
    this.props.AddToCartAction(AddCart, userId);
  };

  rendreBreadCrumbd = () => {
    return (
      <Breadcrumbs aria-label="breadcrumb" className="mt-3">
        <Link className="link-breadCrumb txt-link" to="/">
          Home
        </Link>
        <Link className="link-breadCrumb txt-link" to="/products">
          Products
        </Link>
        <Typography style={{ color: "#003e4d", fontWeight: "bold" }}>
          {this.state.detailProd?.name}
        </Typography>
      </Breadcrumbs>
    );
  };

  onChangeQTY = (values) => {
    const { value } = values;
    let QtyLast = this.state.qty;
    console.log(value);
    if (value) {
      if (QtyLast === "1") {
        if (value[0] === "1") {
          this.setState({ qty: value });
        } else {
          this.setState({ qty: value[0] });
        }
      } else {
        this.setState({ qty: value });
      }
    } else {
      this.setState({ qty: 1 });
    }
  };

  render() {
    const { image, name, stock, category, price, keterangan } =
      this.state.detailProd;
    const { qty } = this.state;
    console.log(qty);
    if (this.state.loading) {
      return (
        <div>
          <Header />
          <Loading />
        </div>
      );
    }
    return (
      <div>
        <Header />
        <div className="container">
          {this.rendreBreadCrumbd()}
          <div className="detail-product-container px-5 py-2 mt-2">
            <div className="detail-image rounded shadow p-1  card">
              <img
                style={{ objectFit: "cover" }}
                src={API_URL + image}
                alt={name}
                width={"100%"}
                height={"100%"}
              />
            </div>
            <div className="detail-prod px-5 py-1 d-flex justify-content-center">
              <div className="bg-white px-5 py-2 shadow w-100">
                <h2 className="text-capitalize my-4">{name}</h2>
                <h4 className="text-capitalize my-4"> {category}</h4>
                <div>Stock {stock} pcs</div>
                <h3 className="text-capitalize my-4">
                  {converToRupiah(price * qty)}
                </h3>
                <div className="d-flex  my-5">
                  <button className="btn btn-secondary mr-3">-</button>
                  <NumberFormat
                    className="w-75 text-center form-control"
                    placeholder="Ex:  1 pcs"
                    suffix=" pcs"
                    allowNegative={false}
                    value={qty}
                    onValueChange={this.onChangeQTY}
                  />
                  <button className="btn btn-primary ml-3">+</button>
                </div>
                <div className="my-4 d-flex my-5 ">
                  <ButtonComp
                    className="w-100 p-3"
                    disabled={this.props.userData.loadingCarts}
                    onClick={this.onAddTocartClick}
                  >
                    {this.props.userData.loadingCarts
                      ? "loading"
                      : "Add To Cart"}
                  </ButtonComp>
                </div>
              </div>
            </div>
            <div className="detail-ket">
              <p>Keterangan:</p>
              {keterangan}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.auth,
  };
};

export default connect(mapStateToProps, { AddToCartAction })(DetailProd);
