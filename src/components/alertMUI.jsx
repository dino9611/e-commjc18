import React, { Component } from 'react';
// import Button from '@material-ui/core/Button';
// import {withStyles} from '@material-ui/core/styles'
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import {AiFillCloseCircle} from 'react-icons/ai'

class AlertMui extends Component {
    state = {  }
    render() { 
        return (
        <Snackbar
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            open={this.props.openSnack}
            autoHideDuration={6000}
            onClose={this.props.handleClose}
            message={this.props.message}
            action={
            <React.Fragment>
                <IconButton size="small" aria-label="close" color="inherit" onClick={this.props.handleClose}>
                    <AiFillCloseCircle/>
                </IconButton>
            </React.Fragment>
            }
        />
         
        );
    }
}
 
export default AlertMui;