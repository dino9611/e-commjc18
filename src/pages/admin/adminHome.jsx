import React, { Component } from 'react';
import HeaderAdmin from '../../components/HeaderAdmin';



class HomeAdmin extends Component {
  
    render() { 
        return (
            <>
                <HeaderAdmin subMenu={'Home'}/>
                <h1>Admin Home</h1>
            </>
          );
    }
}
export default HomeAdmin