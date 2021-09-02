import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './../components/Header'

class Home extends Component {
    state = {  }
    render() { 
        return (
            <div>
                <Header/>
                <h1>ini Home</h1>
                <Link to='/login'>
                    TO LOGIN
                    </Link>
                <button onClick={()=>{
                    localStorage.removeItem('id')
                }}>logout</button>
            </div>
          );
    }
}
 
export default Home;