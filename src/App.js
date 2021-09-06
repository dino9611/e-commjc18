import React, { Component } from "react";
import "./App.css";
import { Login } from "./pages/user";

import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import PageNotFound from "./pages/pageNotFound";
import DetailProd from "./pages/detailProduct";
import AdminPage from "./pages/admin/adminPage";
import Products from "./pages/products";
import axios from "axios";
import { connect } from "react-redux";
import { LoginAction } from "./redux/actions";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "./helpers/ApiUrl";

import Header from "./components/Header";
import Loading from "./components/loading";
class App extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    let id = localStorage.getItem("id");
    if (id) {
      axios
        .get(`${API_URL}/users/${id}`)
        .then((res) => {
          this.props.LoginAction(res.data);
        })
        .catch((err) => {
          alert("server error");
        })
        .finally(() => {
          this.setState({ loading: false });
        });
    } else {
      this.setState({ loading: false });
    }
  }

  renderAdminRoute = () => {
    return (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/products" exact component={Products} />
        <Route path="/admin" component={AdminPage} />
        <Route path="/login" exact component={Login} />
        <Route path="/products/:idProd" component={DetailProd} />
        <Route path="*" component={PageNotFound} />
      </Switch>
    );
  };

  renderUserRoute = () => (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/products" exact component={Products} />
      <Route path="/login" exact component={Login} />
      <Route path="/products/:idProd" component={DetailProd} />
      <Route path="*" component={PageNotFound} />
    </Switch>
  );

  renderUmum = () => (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/products" exact component={Products} />
      <Route path="/login" exact component={Login} />
      <Route path="/products/:idProd" component={DetailProd} />
      <Route path="*" component={PageNotFound} />
    </Switch>
  );

  renderFinal = () => {
    let { role } = this.props.auth;

    if (role === "admin") {
      return this.renderAdminRoute();
    } else if (role === "user") {
      return this.renderUserRoute();
    } else {
      return this.renderUmum();
    }
  };

  render() {
    if (this.state.loading) {
      return (
        <div>
          <Loading />
        </div>
      );
    }
    return (
      <div>
        {/* <Header /> */}
        {this.renderFinal()}
        <ToastContainer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { LoginAction })(App);
