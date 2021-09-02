import React, { Component,createRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { Button } from '@material-ui/core';
import axios from 'axios';
import { API_URL } from '../../helpers/ApiUrl';
import ButtonComp from '../../components/Button';
import {Modal,ModalBody,ModalHeader,ModalFooter} from 'reactstrap'

const styles ={
    table: {
      minWidth: 500,
    },
}


class ManageProduct extends Component {
    state = {
        products:[],
        page:0,
        limit:2,
        totalProd:0,
        addData:{
            name:createRef(),
            price: createRef(),
            image: createRef(),
            stock:createRef(),
            categoryId:createRef(),
            keterangan:createRef()
        },
        categories:[],
        openModal:false

    }



    componentDidMount(){
        this.fetchData()
        this.fetchCategories()

    }

    componentDidUpdate(prevprops,prevstate){
        if(prevstate.page !== this.state.page){
            this.fetchData()
        }else if(prevstate.limit !== this.state.limit){
            this.fetchData()
        }
    }

    fetchCategories = ()=>{
        axios.get(`${API_URL}/categories`)
        .then((res)=>{
            this.setState({categories:res.data})
        }).catch((err)=>{
            console.log(err)
        })
    }

    fetchData = ()=>{
        const {page,limit} = this.state
        axios.get(`${API_URL}/products?_page=${page+1}&_limit=${limit}&_expand=category`)
        .then((res)=>{
            console.log(res)
            this.setState({products:res.data,totalProd:parseInt(res.headers['x-total-count'])})
        }).catch((err)=>{
            console.log(err)
        })
    }

    toggle = ()=>{
        this.setState({openModal:!this.state.openModal})
    }

    handleChangePage = (e,newPage)=>{
        this.setState({page:newPage})
    }

    handleChangeRowsPerPage = (e)=>{
        // console.log(event.target.value)
        let limit 
        if(e.target.value < 0){
            limit = this.state.totalProd
        }else{
            limit = e.target.value

        }
        this.setState({page:0,limit:limit})

    }


    processAddData = ()=>{
        let AddData={
            name:this.state.addData.name.current.value,
            image:this.state.addData.image.current.value,
            price:parseInt(this.state.addData.price.current.value),
            stock:parseInt(this.state.addData.stock.current.value),
            keterangan:this.state.addData.keterangan.current.value,
            categoryId:parseInt(this.state.addData.categoryId.current.value),
        }
        let {name,image,price,stock,keterangan,categoryId}=AddData
        if(name && image && price && stock && keterangan && categoryId){
            axios.post(`${API_URL}/products`,AddData)
            .then(()=>{
                this.fetchData()
                this.setState({openModal:false})
            }).catch((err)=>{
                console.log(err)
            })
        }else{
            alert('pastikan semua terisi')
        }
       
    }

    renderTableBody = ()=>{
        if(!this.state.products.length){
            return(
                <TableRow style={{ height: 53 * 6 }}>
                    <TableCell colSpan={7} />
                </TableRow>
            )  
        }
        let rumusNo = (this.state.page) * 2
        return this.state.products.map((val,index)=>{
            return(
            <TableRow key={index}>
                <TableCell width=''>{rumusNo+index+1}</TableCell>
                <TableCell align="left" >{val.name}</TableCell>
                <TableCell align="left" ><img src={val.image} height='100px' alt={val.name}/></TableCell>
                <TableCell align="left"  >{val.price}</TableCell>
                <TableCell align="left" >{val.stock}</TableCell>
                <TableCell align="left">{val.category.name}</TableCell>
                <TableCell align="center">
                        <Button  color='primary'>
                            Edit
                        </Button>
                        <Button color='secondary'>
                            Delete
                        </Button>
                </TableCell>
            </TableRow>

            )
        })
    }



    renderModal = ()=>{
        let {name,image,price,stock,keterangan,categoryId}=this.state.addData
        return (
            <Modal isOpen={this.state.openModal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>ADD products</ModalHeader>
                <ModalBody>
                    <input className='form-control my-1' type='text' ref={name} placeholder='product Name' />
                    <input className='form-control my-1' type='number' ref={price} placeholder='price' />
                    <input className='form-control my-1' type='number' ref={stock} placeholder='stock' />
                    <input className='form-control my-1' type='text' ref={image} placeholder='image' />
                    <select className='form-control my-1' defaultValue={0} ref={categoryId}>
                        <option hidden value={0}>pilih category</option>
                        {
                            this.state.categories.map((val,index)=>{
                                return <option key={index} value={val.id}>{val.name}</option>
                            })
                        }
                    </select>
                    <textarea placeholder='keterangan' className='form-control my-1' ref={keterangan} cols="30" rows="5"></textarea>
                </ModalBody>
                <ModalFooter>
                    <ButtonComp onClick={this.processAddData} style={{width:"25%"}} className='px-1 py-2'>
                        Add Product
                    </ButtonComp>
                    <button className='btn btn-secondary'>
                        Cancel
                    </button>
                </ModalFooter>
            </Modal>
        )

    }




    render() { 
        const {classes}=this.props
        console.log(this.state.totalProd)
        return (
            <div>
                {this.renderModal()}
                <div className='container pt-5'>
                    <div className='my-2'>
                        <ButtonComp onClick={this.toggle} style={{width:"15%"}} className='px-1 py-2'>
                            Add Product
                        </ButtonComp>
                    </div>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="custom pagination table">
                            <TableHead>
                                <TableRow style={{backgroundColor:'#003e4d',color:'white'}}>
                                    <TableCell component='th' className='text-white'>No.</TableCell>
                                    <TableCell align="left"  className='text-white' >Name</TableCell>
                                    <TableCell align="left"  className='text-white'>image</TableCell>
                                    <TableCell align="left"  className='text-white' >Price</TableCell>
                                    <TableCell align="left"  className='text-white'>Stock</TableCell>
                                    <TableCell align="left"  className='text-white'>category</TableCell>
                                    <TableCell align="center"  className='text-white'>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.renderTableBody()}
                            
                            {/* {(rowsPerPage > 0
                                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : rows
                            ).map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell style={{ width: 160 }} align="right">
                                        {row.calories}
                                    </TableCell>
                                    <TableCell style={{ width: 160 }} align="right">
                                        {row.fat}
                                    </TableCell>
                                </TableRow>
                            ))} */}

                     
                            </TableBody>
                            <TableFooter>
                                <TableRow> 
                                    <TablePagination 
                                        rowsPerPageOptions={[2, { label: 'All', value: -1 }]}
                                        colSpan={3}
                                        count={this.state.totalProd}
                                        rowsPerPage={this.state.limit}
                                        page={this.state.page}
                                        SelectProps={{
                                            inputProps: { 'aria-label': 'rows per page' },
                                            native: true,
                                        }}
                                        onPageChange={this.handleChangePage}
                                        onRowsPerPageChange={this.handleChangeRowsPerPage}
                                    />
                                </TableRow> 
                            </TableFooter>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        );
    }
}
 
export default  withStyles(styles) (ManageProduct);