import React, { Component } from 'react';
import './styles/login.css'
import Gambar1 from './../../assets/login-1.jpg'
import axios from 'axios'
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux'
import { LoginAction } from '../../redux/actions';
import {toast} from 'react-toastify'

import {AiFillCheckCircle} from 'react-icons/ai'
import {API_URL} from './../../helpers/ApiUrl'


class Login extends Component {
    state = {
        showpassword:'password',
        username:'',
        password:'',
        openSnack:false,
        message:'',
        status:'success'
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
        axios.get(`${API_URL}/users?username=${username}&password=${password}`)
        .then((res)=>{
            if(res.data.length){
                // alert('user ada')
                
                toast.success('Berhasil login',
                    {
                        position: "top-right",
                        autoClose: 5000,
                        icon:()=> <AiFillCheckCircle/>
                    }

                )

                localStorage.setItem('id',res.data[0].id) 
                // // dalam kasus real id nggak boleh disimpan 
                // // dalam localstorage , better token yang disimpan
                this.props.LoginAction(res.data[0])
                
            }else{
                toast.error(
                    'user tidak ada',
                    {
                        position: "top-right",
                        autoClose: 5000,
                    
                    }

                )
            }
        }).catch((err)=>{
            toast.error(
                'server error',
                {
                    position: "top-right",
                    autoClose: 5000,
                }
            )
        })
    }

    onLoginClick=(e)=>{
        // alert('e')
        e.preventDefault()
        this.LoginHandler()
    }

    handleClick = () => {
        this.setState({openSnack:true})
    };
    
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        this.setState({openSnack:false})
    };

    render() {
        const {showpassword,username,password} =this.state 
        if(this.props.isLogin){
            return(
                <Redirect to='/'/>
            )
        }
        return (
            <div>
                <div className="container mt-0 mt-sm-5  login-container">
                    <div className="row p-0" style={{height:'100%'}}>
                        <div className="col-md-7 col-sm-6 m-0  img-wrap bg-primary  d-md-block p-0">
                            <img alt='foto' src={Gambar1} height="100%"  width="100%" style={{objectFit:'cover'}} />
                        </div>
                        <div className="col-md-5 col-sm-6 tinggi-img col-12">
                            <form onSubmit={this.onLoginClick} style={{width:'100%',height:'100%'}} className=' d-flex flex-column justify-content-center align-items-start ' >
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
                                <div className='align-self-start button-log-cont'>
                                    <button className=' login-button  py-2 px-4 rounded' type='submit' >
                                        Login
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {/* <Alert
                    message={this.state.message}
                    openSnack={this.state.openSnack}
                    status={this.state.status}
                    handleClose={this.handleClose}
                /> */}
                 
              
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