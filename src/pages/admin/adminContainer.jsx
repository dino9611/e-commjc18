import React, { Component } from 'react';
import HeaderAdmin from '../../components/HeaderAdmin';
import './styles/manageProduct.css'
import ManageProductComp from './manageProduct'

class ManageProductPage extends Component {
    state = {  }
    render() { 
        return (
            <div className='manageproduct-container'>
                <HeaderAdmin/>
                <ManageProductComp/>
            </div>
          );
    }
}
 
export default ManageProductPage;