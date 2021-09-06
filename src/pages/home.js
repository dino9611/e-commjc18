import React, { Component } from 'react';
//? router
// import { Link } from 'react-router-dom';
//? redux
// import { connect } from 'react-redux';

class Home extends Component {
  onLogoutClick = () => {
    //! remove the id from local storage
    localStorage.removeItem('id');
    this.props.logoutAction();
  };
  render() {
    return (
      <>
        <h1>Home</h1>
        <p>click logo to return to home</p>
      </>
    );
  }
}

export default Home;
