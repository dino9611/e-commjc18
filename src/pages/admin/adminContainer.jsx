import React, { Component } from 'react';
import HeaderAdmin from '../../components/HeaderAdmin';
import './styles/manageProduct.css'
import ManageProductComp from './manageProduct'
import NotFound from '../pageNotFound';

class AdminContainer extends Component {
    state = {  }
    render() { 
        const {subMenu} =this.props.match.params
        // console.log(subMenu)
        if(subMenu === 'manage'){
            return (
                <>
                    <HeaderAdmin subMenu={subMenu}/>
                    <ManageProductComp/>
                </>
            );
        }else{
            return (
                <>
                    <HeaderAdmin/>
                    <NotFound/>
                </>
            )
        }
    }
}
  
export default AdminContainer;