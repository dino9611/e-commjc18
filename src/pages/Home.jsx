import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Home extends Component {
    state = {  }
    render() { 
        return (
            <div>
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