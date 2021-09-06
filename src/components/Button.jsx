import React, { Component } from "react";

class ButtonComp extends Component {
  state = {};
  render() {
    const { onClick, children, className, style } = this.props;

    return (
      <button
        onClick={onClick}
        className={"login-button rounded " + className}
        style={style}
        disabled={Boolean(this.props.disabled)}
      >
        {children}
      </button>
    );
  }
}

export default ButtonComp;
