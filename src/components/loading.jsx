import React, { Component } from "react";
import { Spinner } from "reactstrap";

class Loading extends Component {
  state = {};
  render() {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "90vh" }}
      >
        <Spinner color="success" style={{ width: "3rem", height: "3rem" }} />
      </div>
    );
  }
}

export default Loading;
