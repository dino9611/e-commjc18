import React, { Component } from "react";
import "./App.css";
import { Login } from "./pages/user";

import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import axios from "axios";
import { connect } from "react-redux";
import { LoginAction } from "./redux/actions";
class App extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    let id = localStorage.getItem("id");
    if (id) {
      axios
        .get(`http://localhost:5000/users/${id}`)
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
      </div>
    );
  }
}

export default connect(null, { LoginAction })(App);
