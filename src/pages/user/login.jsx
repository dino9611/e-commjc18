import React, { Component } from 'react';
import './styles/login.css'
import Gambar1 from './../../assets/login-1.jpg'
import axios from 'axios'
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux'
import { LoginAction } from '../../redux/actions';

// import {AiFillEye,AiFillEyeInvisible} from 'react-icons/ai'
class Login extends Component {
    state = {
        showpassword:'password',
        username:'',
        password:''
    }

    onCheckShow = (e)=>{
        if(e.target.checked){
            this.setState({showpassword:'text'})
        }else{
            this.setState({showpassword:'password'})
        }
    }

    onInputChange = (e)=>{
        this.setState({[e.target.name]:e.target.value})
    }   

    LoginHandler =()=>{
        const {username,password} =this.state
        axios.get(`http://localhost:5000/users?username=${username}&password=${password}`)
        .then((res)=>{
            if(res.data.length){
                alert('user ada')
                localStorage.setItem('id',res.data[0].id) 
                // dalam kasus real id nggak boleh disimpan 
                // dalam localstorage , better token yang disimpan
                this.props.LoginAction(res.data[0])
            }else{
                alert('user tidak ditemukan')
            }
        }).catch((err)=>{
            alert('server error')
        })
    }

    onLoginClick=()=>{
        this.LoginHandler()

    }

    render() {
        const {showpassword,username,password} =this.state 
        if(this.props.isLogin){
            return(
                <Redirect to='/'/>
            )
        }
        return (
            <div>
                <div className="container mt-5  login-container">
                    <div className="row p-0" style={{height:'100%'}}>
                        <div className="col-md-7 m-0 img-wrap bg-primary  d-none d-md-block p-0">
                            <img src={Gambar1}  width="100%"  />
                        </div>
                        <div className="col-md-5 col-12 d-flex flex-column justify-content-center align-items-center ">
                            
                            <h1 className='mb-5'>Login</h1>
                            <input 
                                value={username}
                                type="text" 
                                onChange={this.onInputChange} 
                                name="username" 
                                placeholder='username' 
                                className=' my-2 form-control'
                            />
                            <input 
                                value={password}
                                type={showpassword}
                                onChange={this.onInputChange}
                                name="password"
                                placeholder='password'
                                className='my-2 form-control'
                            />
                            <div className='align-self-end'>
                                <input type="checkbox" onChange={this.onCheckShow} /> show password
                            </div>
                            <div className='align-self-start'>
                                <button className='login-button py-2 px-4 rounded' onClick={this.onLoginClick}  >
                                    Login
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state)=>{
    return{
        isLogin:state.auth.isLogin
    }
}

export default connect(mapStateToProps,{LoginAction}) (Login);