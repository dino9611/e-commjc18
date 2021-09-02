import React, { Component } from 'react';


class ButtonComp extends Component {
    state = {  }
    render() {
        
        const {onClick,children,className,style} = this.props
        
        return (
            <button 
                onClick={onClick} 
                className={'login-button rounded '+className}
                style={style} 
            >
                {children}
            </button>
        );
    }
}
 
export default ButtonComp;