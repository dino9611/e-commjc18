import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./../components/Header";
import { Card, CardImg, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import axios from "axios";
import { API_URL } from "../helpers/ApiUrl";
import { converToRupiah } from "../helpers/converToRupiah";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { debounce } from "throttle-debounce";
// import NumberFormat from "react-number-format";
import Pagination from "@material-ui/lab/Pagination";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalProduct, setTotalProducts] = useState([]);
  const [categoryId, setcategoriid] = useState(0);
  // component didmount
  useEffect(() => {
    let categories = axios.get(`${API_URL}/categories`);
    let products = axios.get(
      `${API_URL}/products?_expand=category&_page=${this.state.page}&_limit=${this.state.limit}`
    );

    // const res =await Promise.all([categories, products])
    Promise.all([categories, products]).then((res) => {
      setProducts(res[1].data);
      setCategories(res[0].data);
      setTotalProducts(res[1].headers["x-total-count"]);
    });
  }, []);

  const productFilterHandler = async () => {
    // let { nameFilter, categoryId, priceMax, priceMin } = this.state;
    let url = `${API_URL}/products?_expand=category&_page=${this.state.page}&_limit=${this.state.limit}`;
    // if (nameFilter) {
    //   url += `&name_like=${nameFilter}`;
    // }
    // if (categoryId !== "0") {
    //   url += `&categoryId=${categoryId}`;
    // }
    // if (priceMax) {
    //   url += `&price_lte=${priceMax}`;
    // }
    // if (priceMin) {
    //   url += `&price_gte=${priceMin}`;
    // }
    try {
      const res = await axios.get(url);
      console.log(res);
      setProducts(res.data);
      setTotalProducts(res.headers["x-total-count"]);
    } catch (err) {
      console.log(err);
    }

    // axios.get(url).then((res) => {
    //   console.log(res);
    //   setProducts(res.data);
    //   setTotalProducts(res.headers["x-total-count"]);
    // });
  };
  //   component didupdate
  useEffect(() => {
    productFilterHandler();
  }, [categoryId, priceMax, priceMin, nameFilter, page]);
};

export default Products;
