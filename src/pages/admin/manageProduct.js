import axios from 'axios';
import React, { Component, createRef } from 'react';
import './style.css/manageProduct.css';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
//? router
import { Redirect } from 'react-router-dom';
//? redux
import { connect } from 'react-redux';

class ManageProduct extends Component {
  state = {
    products: [],
    page: 0,
    limit: 3,
    totalProd: 0,
    addData: {
      name: createRef(),
      price: createRef(),
      image: createRef(),
      stock: createRef(),
      categoryId: createRef(),
      keterangan: createRef(),
    },
    categories: [],
    openModal: false,
    modalTitle: '',
    modalButton: '',
    modalButtonName: '',
    currentProduct: {},
  };
  componentDidMount = () => {
    this.fetchData();
    this.fetchCategories();
  };

  fetchCategories = () => {
    axios
      .get(`http://localhost:5000/categories`)
      .then((res) => {
        this.setState({
          categories: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  fetchData = (curr) => {
    const { page, limit } = this.state;
    let currPage;
    if (curr === undefined) currPage = page;
    else currPage = curr;
    axios
      .get(
        `http://localhost:5000/products?_page=${
          currPage + 1
        }&_limit=${limit}&_expand=category`
      )
      .then((res) => {
        this.setState({
          products: res.data,
          totalProd: res.headers['x-total-count'],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  toggle = () => {
    this.setState({ openModal: !this.state.openModal });
  };

  addProductModal = () => {
    this.setState({
      modalTitle: 'Add Product',
      modalButton: this.proccessData,
      modalButtonName: 'add product',
    });
    this.toggle();
  };

  proccessData = () => {
    const { name, image, price, stock, categoryId, keterangan } =
      this.state.addData;
    let addData = {
      name: name.current.value,
      price: parseInt(price.current.value),
      image: image.current.value,
      stock: parseInt(stock.current.value),
      categoryId: parseInt(categoryId.current.value),
      keterangan: keterangan.current.value,
    };
    {
      const { name, image, price, stock, categoryId, keterangan } = addData;
      if (name && image && price && stock && keterangan && categoryId) {
        let isEdit = this.state.modalTitle[0] === 'E';
        if (isEdit) {
          axios
            .put(
              `http://localhost:5000/products/${this.state.currentProduct.id}`,
              addData
            )
            .then(() => {
              this.fetchData();
            })
            .catch((err) => {
              console.log(err);
            });
          this.setState({ openModal: false });
        } else {
          axios
            .post(`http://localhost:5000/products`, addData)
            .then(() => {
              this.fetchData();
            })
            .catch((err) => {
              console.log(err);
            });
          this.setState({ openModal: false });
        }
      } else alert('pastikan semua input terisi');
    }
  };

  editDataModal = (prod) => {
    this.setState({
      currentProduct: {
        _name: prod.name,
        _image: prod.image,
        _price: prod.price,
        _stock: prod.stock,
        _categoryId: prod.categoryId,
        _keterangan: prod.keterangan,
        id: prod.id,
      },
      modalTitle: 'Edit Product',
      modalButton: this.proccessData,
      modalButtonName: 'confirm edit',
    });
    this.toggle();
  };

  deleteModal = (id) => {
    this.setState({
      modalTitle: 'Delete Product',
      modalButton: () => {
        axios
          .delete(`http://localhost:5000/products/${id}`)
          .then(() => {
            this.fetchData();
          })
          .catch((err) => {
            console.log(err);
          });
        this.setState({ openModal: false });
      },
      modalButtonName: 'confirm delete',
    });
    this.toggle();
  };

  renderModal = () => {
    if (this.state.modalTitle[0] === 'D') {
      return (
        <Modal isOpen={this.state.openModal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            {this.state.modalTitle}
          </ModalHeader>
          <ModalFooter>
            <button
              onClick={this.state.modalButton}
              className='btn btn-secondary'
            >
              {this.state.modalButtonName}
            </button>
          </ModalFooter>
        </Modal>
      );
    }

    let isEdit = this.state.modalTitle[0] === 'E';
    if (isEdit) {
      var { _name, _image, _price, _stock, _categoryId, _keterangan } =
        this.state.currentProduct;
    }
    const { name, image, price, stock, categoryId, keterangan } =
      this.state.addData;
    return (
      <Modal isOpen={this.state.openModal} toggle={this.toggle}>
        <ModalHeader toggle={this.toggle}>{this.state.modalTitle}</ModalHeader>
        <ModalBody>
          <input
            defaultValue={isEdit ? _name : null}
            className='form-control my-1'
            type='text'
            ref={name}
            placeholder='product name'
          />
          <input
            defaultValue={isEdit ? _price : null}
            className='form-control my-1'
            type='number'
            ref={price}
            placeholder='price'
          />
          <input
            defaultValue={isEdit ? _stock : null}
            className='form-control my-1'
            type='number'
            ref={stock}
            placeholder='stock'
          />
          <input
            defaultValue={isEdit ? _image : null}
            className='form-control my-1'
            type='text'
            ref={image}
            placeholder='image'
          />
          <select
            defaultValue={isEdit ? _categoryId : 0}
            className='form-control my-1'
            ref={categoryId}
          >
            <option hidden value={0}>
              choose categories
            </option>
            ;
            {this.state.categories.map((el, i) => {
              return (
                <option key={i} value={el.id}>
                  {el.name}
                </option>
              );
            })}
          </select>
          <textarea
            defaultValue={isEdit ? _keterangan : null}
            className='form-control my-1'
            ref={keterangan}
            id=''
            cols='30'
            rows='10'
            placeholder='keterangan'
          ></textarea>
        </ModalBody>
        <ModalFooter>
          <button
            onClick={this.state.modalButton}
            className='btn btn-secondary'
          >
            {this.state.modalButtonName}
          </button>
        </ModalFooter>
      </Modal>
    );
  };

  onPrevClick = () => {
    let { page } = this.state;
    if (page + 1 <= 1) {
      return;
    }
    page--;
    this.setState({ page });
    this.fetchData(page);
  };
  onNextClick = () => {
    let { page, totalProd, limit } = this.state;
    if (page + 1 >= Math.ceil(totalProd / limit)) {
      return;
    }
    page++;
    this.setState({ page });
    this.fetchData(page);
  };

  renderProducts = () => {
    const iStart = this.state.page * this.state.limit + 1;
    if (!this.state.products.length) {
      return null;
    }
    return this.state.products.map((el, i) => {
      return (
        <div key={el.id} className='ManageProduct-item'>
          <div>{i + iStart}</div>
          <div>{el.name}</div>
          <div>
            <img src={el.image} alt={el.name} />
          </div>
          <div>{el.price}</div>
          <div>{el.stock}</div>
          <div>{el.category.name}</div>
          <div className='d-flex justify-content-around'>
            <button
              onClick={() => this.editDataModal(el)}
              className='btn btn-success'
            >
              Edit
            </button>
            <button
              onClick={() => this.deleteModal(el.id)}
              className='btn btn-danger'
            >
              Delete
            </button>
          </div>
        </div>
      );
    });
  };

  render() {
    const { limit, totalProd, page } = this.state;
    if (this.props.authReducer.role !== 'admin') {
      return <Redirect to='/' />;
    }
    return (
      <>
        {this.renderModal()}
        <div className='d-flex flex-column align-items-end'>
          <div className='ManageProduct-item item-description'>
            <div>No.</div>
            <div>Name</div>
            <div>Image</div>
            <div>Price</div>
            <div>Stock</div>
            <div>Category</div>
            <div>Action</div>
          </div>
          {this.renderProducts()}
          <div className='ManageProduct-item prev-next'>
            <div onClick={this.onPrevClick}>Previous</div>
            <button onClick={this.addProductModal} className='btn btn-primary'>
              add product
            </button>
            <div>{`Page: ${page + 1}/${Math.ceil(totalProd / limit)}`}</div>
            <div onClick={this.onNextClick}>Next</div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { authReducer } = state;
  return {
    authReducer,
  };
};

export default connect(mapStateToProps)(ManageProduct);
