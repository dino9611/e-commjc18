import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class HeaderAdmin extends Component {
    state = {  }
    render() { 
        return (
            <div className='bg-warna py-4'>
                <div className=' d-flex flex-column align-items-center' style={{height:'100%'}}>
                    <h1 className='mb-5'>Admin</h1>
                    <div style={{maxHeight:'70vh'}} className='mt-5 w-100 px-2 flex-wrap  d-flex flex-column mt-5 '>
                        <Link to='/'>
                            <button style={{fontWeight:"bold"}} className='my-2 py-3 w-100 btn btn-light'>
                                Home
                            </button>
                        </Link>
                        <button style={{fontWeight:"bold"}} className='my-2 py-3 w-100 btn btn-light'>
                            Manage Product
                        </button>
                        <button style={{fontWeight:"bold"}} className='my-2 py-3 w-100 btn btn-light'>
                            Manage Transaction
                        </button>
                        <button style={{fontWeight:"bold"}} className='my-2 py-3 w-100 btn btn-light'>
                            Manage User
                        </button>
                    </div>
                    <div className=' mt-auto mb-2 w-75'>
                        <button style={{fontWeight:"bold"}} className='w-100 btn btn-light'>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
          );
    }
}
 
export default HeaderAdmin;