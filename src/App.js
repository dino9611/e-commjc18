import React, { Component } from "react";
import "./App.css";
import { Login } from "./pages/user";

import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import axios from "axios";
import { connect } from "react-redux";
import { LoginAction } from "./redux/actions";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "./helpers/ApiUrl";
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

  render() {
    if (this.state.loading) {
      return (
        <div>
          <h1>Loadingg</h1>
        </div>
      );
    }
    return (
      <div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
        </Switch>
        <ToastContainer />
      </div>
    );
  }
}

export default connect(null, { LoginAction })(App);
