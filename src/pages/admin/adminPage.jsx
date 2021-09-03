import React, { Component } from 'react';

import AdminContainer from './adminContainer';
import {Switch,Route} from 'react-router-dom'

import HomeAdmin from './adminHome';

class AdminPage extends Component {
   
    render() { 
        // console.log(this.props.match)
        
        return (
            <div className='manageproduct-container'>
                <Switch>
                    <Route path='/admin' exact component={HomeAdmin} />
                    <Route path='/admin/:subMenu' component={AdminContainer} />
                </Switch>              
            </div>
          );
    }
}
 
export default AdminPage;