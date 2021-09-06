import React, { Component } from 'react';
//? css
import './styles.css/header1.css';
import user from './../assets/user.svg';
//? router
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
//? redux
import { logoutAction } from './../states/actions';

class Header1 extends Component {
  state = {
    isPopup: false,
    popupState: ' Header1-hidePopup',
  };

  onLogoutClick = () => {
    //! remove the id from local storage
    localStorage.removeItem('id');
    this.props.logoutAction();
  };

  onProfilePicCLick = () => {
    this.setState({ isPopup: !this.state.isPopup });
    if (this.state.isPopup) this.setState({ popupState: ' Header1-hidePopup' });
    else this.setState({ popupState: '' });
  };

  renderPopup = () => {
    const style = { textDecoration: 'none', color: 'white' };
    return this.props.authReducer.isLogin ? (
      <div className={'Header1-popup' + this.state.popupState}>
        <Link to='/' style={style}>
          <div className='Header1-btn'>Profile</div>
        </Link>
        <Link to='/' style={style}>
          <div className='Header1-btn'>My Account</div>
        </Link>
        {this.props.authReducer.role === 'admin' ? (
          <Link to='/admin' style={style}>
            <div className='Header1-btn'>Admin Menu</div>
          </Link>
        ) : null}
        <div onClick={this.onLogoutClick} className='Header1-btn'>
          Logout
        </div>
      </div>
    ) : (
      <div className={'Header1-popup' + this.state.popupState}>
        <Link to='/login' style={style}>
          <div className='Header1-btn'>Login</div>
        </Link>
        <Link to='/login' style={style}>
          <div className='Header1-btn'>Sign Up</div>
        </Link>
      </div>
    );
  };

  render() {
    return (
      <>
        {this.renderPopup()}
        <div className='Header1-container'>
          <div className='Header1-item Header1-item1'>
            <Link to={'/'} style={{ textDecoration: 'none', color: 'black' }}>
              Furniture.
            </Link>
          </div>
          <div
            onClick={this.onProfilePicCLick}
            className='Header1-item Header1-item2'
          >
            <img src={user} alt='profile pic' />
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

export default connect(mapStateToProps, { logoutAction })(Header1);
