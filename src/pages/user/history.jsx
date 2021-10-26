import axios from "axios";
import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { API_URL } from "../../helpers/ApiUrl";
import { connect } from "react-redux";
import { FiShoppingBag } from "react-icons/fi";
import ButtonComp from "../../components/Button";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";

import { converToRupiah } from "../../helpers/converToRupiah";

const History = (props) => {
  //? -> return array yang panjangnya 2 dimana array[0] berisi state
  //? array[1] isinya function yang berfungsi untuk merubah state seperti this.setState
  const [history, sethistory] = useState([]);
  const [modalOpen, setmodalOpen] = useState(false);
  const [payInput, setPayinput] = useState("");
  const [indexbayar, setindexbayar] = useState(-1);
  const [detailTrans, setdetailtrans] = useState([]);
  const [modalDetailtrans, setmodalDetailtrans] = useState(false);
  const fetchData = () => {
    let id = props.userId;
    axios
      .get(`${API_URL}/transactions?userId=${id}&_embed=transactionDetails`)
      .then((res) => {
        sethistory(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const renderTRX = (date, id) => {
    let random = new Date(date).getTime();
    let alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase();
    let alph = alphabet[id % 26];
    return `TRX-${alph}${random}`;
  };

  const rendetanggal = (tanggal) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(tanggal).toLocaleString("id-ID", options);
  };
  //   onwaiting -> onConfirmation ->on process -> ondelivery -> acceptbyuser -> rating
  const renderHistory = () => {
    return history.map((val, index) => {
      return (
        <div
          key={index}
          className="shadow rounded py-2 px-3 mb-3"
          style={{ height: "30vh" }}
        >
          <div>
            <FiShoppingBag className="mb-1" />
            <span className="text-secondary ml-3">
              {renderTRX(val.last_update, val.id)} |
            </span>
            <span className="text-secondary ml-1">
              {rendetanggal(val.last_update)}
            </span>
            <span className="float-right px-2 py-1 alert-primary">
              {val.status}
            </span>
          </div>
          <hr />
          <div
            className=" align-items-center "
            style={{ height: "50%", width: "60%" }}
          >
            <h6 className="font-weight-bold w-25 px-1 m-0 text-secondary">
              Alamat pengiriman :
            </h6>
            <h6 className="text-secondary p-1 font-weight-light ">
              {val.alamat}
            </h6>
          </div>
          <div className=" d-flex justify-content-end">
            <ButtonComp
              className="mr-3  py-2"
              onClick={() => uploadPembayaran(index)}
              style={{ width: "20%" }}
            >
              Upload Pembayaran
            </ButtonComp>
            <ButtonComp
              onClick={() => openDetailTrans(val.id)}
              className=" py-2"
              style={{ width: "20%" }}
            >
              Detail Transaksi
            </ButtonComp>
          </div>
        </div>
      );
    });
  };

  const toggle = () => {
    setmodalOpen(!modalOpen);
  };
  const toggletx = () => {
    setmodalDetailtrans(!modalDetailtrans);
  };

  const uploadPembayaran = (index) => {
    setindexbayar(index);
    setmodalOpen(true);
  };

  const openDetailTrans = (id) => {
    axios
      .get(
        `${API_URL}/transactionDetails?_expand=product&_expand=transaction&transactionId=${id}`
      )
      .then((res) => {
        setdetailtrans(res.data);
        setmodalDetailtrans(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onChangeInput = (e) => {
    setPayinput(e.target.value);
  };

  const renderTotal = (transactionDetails) => {
    return transactionDetails.reduce((preval, val) => {
      return preval + val.qty * val.price;
    }, 0);
  };

  const renderTransaksiDetails = () => {
    return detailTrans.map((val, index) => {
      return (
        <div key={index} className="d-flex  my-2">
          <div className="mr-2  p-1 ">
            <img
              src={val.product.image}
              height={100}
              width={100}
              style={{ objectFit: "cover" }}
              alt={val.product.name}
            />
          </div>
          <div className="py-2">
            <div className="text-capitalize cart-text">{val.product.name}</div>
            <div>
              {converToRupiah(val.price)} X {val.qty} pcs
            </div>
            <div className="">
              subTotal :{converToRupiah(val.price * val.qty)}
            </div>
          </div>
        </div>
      );
    });
  };

  const renderModalDetail = () => {
    if (detailTrans.length === 0) {
      return null;
    }
    let data = detailTrans[0].transaction;
    return (
      <Modal centered isOpen={modalDetailtrans} toggle={toggletx}>
        <ModalHeader toggle={toggletx}>
          Transaksi {renderTRX(data.last_update, data.id)}
        </ModalHeader>
        <ModalBody>
          {renderTransaksiDetails()}
          <div className="d-flex  my-2">
            <div className="mr-2 p-2 cart-text " style={{ width: 100 }}>
              TOTAL
            </div>
            <div className="py-2 px-2 cart-text">
              {converToRupiah(renderTotal(detailTrans))}
            </div>
          </div>
        </ModalBody>
        {/* <ModalFooter>
          <button className="btn btn-danger" onClick={toggletx}>
            close
          </button>
        </ModalFooter> */}
      </Modal>
    );
  };

  const renderModal = () => {
    let data = history[indexbayar];
    if (indexbayar < 0) {
      return null;
    }
    return (
      <Modal centered isOpen={modalOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          Transaksi {renderTRX(data.last_update, data.id)}
        </ModalHeader>
        <ModalBody>
          <div>
            total bayar : {converToRupiah(renderTotal(data.transactionDetails))}
          </div>
          <div>
            {data.bank} <br />
            NO Rek: {data.norek}
          </div>
          <input
            type="text"
            onChange={onChangeInput}
            value={payInput}
            className="form-control"
          />
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={processPembayaran}>
            Process
          </button>
          <button className="btn btn-danger" onClick={toggle}>
            cancel
          </button>
        </ModalFooter>
      </Modal>
    );
  };

  const processPembayaran = () => {
    let idTrans = history[indexbayar].id;
    let updateData = {
      status: "onConfirmation",
      bukti: payInput,
    };
    axios
      .patch(`${API_URL}/transactions/${idTrans}`, updateData)
      .then(() => {
        fetchData();
        setmodalOpen(false);
        setPayinput("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // component didmount
  //   useEffect(() => {
  //     return () => {
  // ini willUnmount
  //     };
  //   }, []);
  // componentdidUpdate
  //   useEffect(() => {}, [history]);

  return (
    <div>
      {renderModal()}
      {renderModalDetail()}
      <Header />

      <div className="container mt-5 py-3">{renderHistory()}</div>

      {/* <button onClick={() => this.setState({state[0]:this.state[0]+1})}>tambah</button> */}

      {/* <button onClick={() => setangka(angka + 1)}>tambah</button> */}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.auth.id,
  };
};

export default connect(mapStateToProps)(History);
