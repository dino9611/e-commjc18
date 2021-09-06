import React, { Component } from 'react';
//? redux
import { connect } from 'react-redux';
import { loginAction } from './states/actions';
//? material UI
// import { Button } from '@material-ui/core';
//? pages
import { Home } from './pages';
import { Login } from './pages/user';
import { ManageProduct } from './pages/admin';
//? router
import { Switch, Route } from 'react-router-dom';
//? css
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//? axios
import axios from 'axios';
//? components
import { Header1 } from './components';

class App extends Component {
  state = {
    loading: true,
  };

  componentDidMount = () => {
    let id = localStorage.getItem('id');
    if (id) {
      axios
        .get(`http://localhost:5000/users/${id}`)
        .then((res) => {
          this.props.loginAction(res.data);
        })
        .catch(() => {
          alert('server error');
        })
        .finally(() => {
          this.setState({ loading: false });
        });
    } else this.setState({ loading: false });
  };

  render = () => {
    if (this.state.loading) {
      return (
        <>
          <div>loading</div>
        </>
      );
    }
    return (
      <>
        <Header1 />
        <Switch>
          <Route exact path={'/'} component={Home} />
          <Route exact path={'/login'} component={Login} />
          <Route exact path={'/admin'} component={ManageProduct} />
        </Switch>
      </>
    );
  };
}

export default connect(null, { loginAction })(App);
