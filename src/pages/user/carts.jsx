import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../../components/Header";
import { converToRupiah } from "../../helpers/converToRupiah";
import { UpdateCartAction } from "../../redux/actions";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import "./styles/cart.css";
import Swal from "sweetalert2";
import NumberFormat from "react-number-format";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

class Carts extends Component {
  state = {
    modalopen: false,
    indexEdit: -1,
    qtyInput: 0,
  };

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
        newCart.splice(index, 1);
        this.props.UpdateCartAction(newCart, userId);
        MySwal.fire("Deleted!", "Your file has been deleted.", "success");
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
        <div className="rounded my-2 shadow w-100 d-flex p-3 cart-container ">
          <div className="cart-img-wrapper mr-3 skeleton">
            <img
              height="100%"
              className="rounded cart-img "
              width="100%"
              src={data.image}
              alt={data.name}
            />
          </div>
          <div>
            <h3 className="text-capitalize mt-2">{data.name}</h3>
            <h6>{data.category.name}</h6>
            <div>Qty {data.qty} pcs</div>
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
    this.props.UpdateCartAction(newCart, userId);
    this.toggle();
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
                <div className="rounded shadow cart-checkout-cont">
                  <h1>checkout</h1>
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

export default connect(mapStateToProps, { UpdateCartAction })(Carts);
