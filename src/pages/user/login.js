import React, { Component } from 'react';
//? css
import './styles/login.css';
//? assets
import loginBg from './../../assets/login.jpg';
//? axios
import axios from 'axios';
//? router
import { Redirect } from 'react-router-dom';
//? redux
import { connect } from 'react-redux';
import { loginAction } from './../../states/actions';

class Login extends Component {
  state = {
    showPassword: 'password',
    username: '',
    password: '',
  };

  onCheckShow = (event) => {
    if (event.target.checked) this.setState({ showPassword: 'text' });
    else this.setState({ showPassword: 'password' });
  };

  onInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  loginHandler = () => {
    axios
      .get(
        `http://localhost:5000/users?username=${this.state.username}&password=${this.state.password}`
      )
      .then((res) => {
        if (res.data.length) {
          alert('user ada');
          // * retrieve user data
          this.props.loginAction(res.data[0]);
          //! save data id in local storage (use token in real scenario)
          localStorage.setItem('id', res.data[0].id);
        } else alert('user tidak ada');
      })
      .catch(() => {
        alert('server error');
      });
  };

  onLoginClick = () => {
    this.loginHandler();
  };

  render() {
    if (this.props.authReducer.isLogin) {
      return <Redirect to='/' />;
    }
    return (
      <>
        <div className={'Login-container'}>
          <img src={loginBg} alt='login.jpg' className='shadow1' />

          <div className='a shadow1'>
            <h1>Login</h1>
            <input
              type='text'
              name='username'
              placeholder='username'
              onChange={this.onInputChange}
            />
            <input
              type={this.state.showPassword}
              name='password'
              placeholder='password'
              onChange={this.onInputChange}
            />
            <div className='d-flex align-items-center'>
              <div className='checkb mr-2'>show password</div>
              <input
                type='checkbox'
                className='checkb'
                onChange={this.onCheckShow}
              />
              <div className='ml-3'>don't have an account?</div>
            </div>
            <button onClick={this.onLoginClick}>login</button>
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

export default connect(mapStateToProps, { loginAction })(Login);
