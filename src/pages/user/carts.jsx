import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import Header from "../../components/Header";
import { converToRupiah } from "../../helpers/converToRupiah";
import {
  UpdateCartAction,
  UpdateCartQtyAction,
  deleteCartAction,
} from "../../redux/actions";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import "./styles/cart.css";
import Swal from "sweetalert2";
import NumberFormat from "react-number-format";
import withReactContent from "sweetalert2-react-content";
import ButtonComp from "../../components/Button";
import axios from "axios";
import { API_URL } from "../../helpers/ApiUrl";
import { toast } from "react-toastify";

const MySwal = withReactContent(Swal);

class Carts extends Component {
  state = {
    modalopen: false,
    indexEdit: -1,
    qtyInput: 0,
    banks: [
      { name: "BCA", norek: "11000" },
      { name: "mandiri", norek: "000111" },
    ],
    pilihanbank: {},
    alamat: createRef(),
  };

  async componentDidMount() {
    let res = await axios.get(`${API_URL}/bank`);
    this.setState({ banks: res.data });
  }

  deleteCart = (index) => {
    let newCart = this.props.carts;
    let userId = this.props.userId;
    MySwal.fire({
      title: `Are you sure delete ${newCart[index].name} ?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#003e4d",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        this.props.deleteCartAction(newCart[index].id, userId, MySwal);
      }
    });
  };

  editQTY = (index) => {
    let qty = this.props.carts[index].qty;
    this.setState({ indexEdit: index, modalopen: true, qtyInput: qty });
  };

  renderCart = () => {
    if (!this.props.carts.length) {
      return (
        <div className="rounded my-2 shadow w-100 d-flex p-3 cart-container ">
          <h1 className="text-center">Cart Kosong silahkan ke Product page</h1>
        </div>
      );
    }
    return this.props.carts.map((data, index) => {
      return (
        <div
          className="rounded my-2 shadow w-100 d-flex p-3 cart-container "
          // style={{ backgroundColor:  ? "red" : "white" }}
        >
          <div className="cart-img-wrapper mr-3 skeleton">
            <img
              height="100%"
              className="rounded cart-img "
              width="100%"
              src={API_URL + data.image}
              alt={data.name}
            />
          </div>
          <div>
            <h3 className="text-capitalize mt-2">{data.name}</h3>
            <h6>{data.category}</h6>
            <div>
              Qty {data.qty} pcs {data.stock < data.qty ? "out of stock" : null}
            </div>
            <div>
              {data.qty} X {converToRupiah(data.price)}
            </div>
            {/* <h2 className="mt-5">{converToRupiah(data.price)}</h2> */}
          </div>
          <div className="ml-auto text-right d-flex flex-column">
            <h5>Subtotal {converToRupiah(data.price * data.qty)}</h5>
            <div className="mt-auto">
              <button
                className="btn btn-primary mr-4"
                onClick={() => this.editQTY(index)}
              >
                Edit Qty
              </button>
              <button
                className="btn btn-danger"
                onClick={() => this.deleteCart(index)}
              >
                Delete From Cart
              </button>
            </div>
          </div>
        </div>
      );
    });
  };

  toggle = () => {
    this.setState({ modalopen: !this.state.modalopen });
  };

  onChangeInput = (e) => {
    this.setState({ qtyInput: e.value });
  };

  processEdit = () => {
    let index = this.state.indexEdit;
    let newCart = this.props.carts;
    let userId = this.props.userId;
    newCart[index].qty = parseInt(this.state.qtyInput);
    this.props.UpdateCartQtyAction(
      newCart[index].id,
      newCart[index].products_id,
      parseInt(this.state.qtyInput),
      userId,
      this.toggle
    );
    // this.toggle();
  };

  renderModal = () => {
    let data = this.props.carts[this.state.indexEdit];
    return (
      <Modal centered isOpen={this.state.modalopen} toggle={this.toggle}>
        <ModalHeader toggle={this.toggle}>Edit Qty {data?.name}</ModalHeader>
        <ModalBody>
          <NumberFormat
            allowNegative={false}
            onValueChange={this.onChangeInput}
            value={this.state.qtyInput}
            className="form-control"
          />
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={this.processEdit}>
            Process
          </button>

          <button className="btn btn-danger" onClick={this.toggle}>
            cancel
          </button>
        </ModalFooter>
      </Modal>
    );
  };

  renderRadio = () => {
    return this.state.banks.map((val, index) => {
      return (
        <span className="mr-3">
          <input
            key={index}
            type="radio"
            name="pilihanbank"
            value={val.name}
            className="mr-1"
            checked={this.state.pilihanbank.name === val.name}
            onClick={() => this.setState({ pilihanbank: val })}
          />
          {val.name}
        </span>
      );
    });
  };

  hargaTotal = () => {
    // let total = 0;
    // let carts = this.props.carts;
    // for (let i = 0; i < carts.length; i++) {
    //   total += carts[i].qty * carts[i].price;
    // }
    // return total;
    // atas bawah sama saja
    return this.props.carts.reduce((preval, val) => {
      return preval + val.qty * val.price;
    }, 0);
  };

  onCheckoutHandler = () => {
    let carts = this.props.carts;
    let pajak = this.hargaTotal() * (10 / 100);
    let ongkir = 200000;
    let bank = this.state.pilihanbank.id;
    let userId = this.props.userId;
    let orderPost = {
      carts_id: carts[0].carts_id,
      alamat: this.state.alamat.current.value,
      userId: userId,
      pajak: pajak,
      ongkir: ongkir,
      banks_id: bank,
    };
    axios
      .post(`${API_URL}/order/checkout`, orderPost)
      .then((res) => {
        toast.success(res.data.message);
        this.props.UpdateCartAction([]);
      })
      .catch((err) => {
        console.log(err);
        let data = err.response.data.data.map(
          (val) => `nama products: ${val.name}, hanya ${val.stock} stocknya `
        );
        data.join(";");
        toast.error(err.response.data.message + " " + data);
      });
  };

  render() {
    return (
      <div>
        {this.renderModal()}
        <Header />
        <div className="container py-5">
          <div className="cart-grid">
            <div>{this.renderCart()}</div>
            <div>
              <div className="px-5 py-2">
                <div className="rounded shadow cart-checkout-cont px-3 py-2">
                  <h2 className="text-center">CheckOut</h2>
                  <textarea
                    cols="30"
                    ref={this.state.alamat}
                    className="form-control mb-2"
                    rows="5"
                    placeholder="alamat Ex: jl. siswa Kuala tungkal"
                  ></textarea>
                  <h6>
                    Total :
                    <span className="float-right">
                      {converToRupiah(this.hargaTotal())}
                    </span>
                  </h6>
                  <h6>
                    Pajak (10%) :
                    <span className="float-right">
                      {converToRupiah(this.hargaTotal() * (10 / 100))}
                    </span>
                  </h6>
                  <h6>
                    Ongkir :
                    <span className="float-right">
                      {converToRupiah(200000)}
                    </span>
                  </h6>
                  <div>
                    {/* <span className="float-right ">+</span> */}
                    <hr />
                  </div>
                  <h6>
                    Grand Total :
                    <span className="float-right">
                      {converToRupiah(
                        this.hargaTotal() +
                          this.hargaTotal() * (10 / 100) +
                          200000
                      )}
                    </span>
                  </h6>
                  <div>{this.renderRadio()}</div>
                  <div className="mt-3">
                    <ButtonComp
                      onClick={this.onCheckoutHandler}
                      className="py-2 px-1"
                    >
                      CheckOut
                    </ButtonComp>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    carts: state.auth.carts,
    userId: state.auth.id,
  };
};

export default connect(mapStateToProps, {
  UpdateCartAction,
  UpdateCartQtyAction,
  deleteCartAction,
})(Carts);
