import React, { Component } from "react";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
class HeaderAdmin extends Component {
  state = {};
  render() {
    // console.log(this.props.subMenu)
    const { subMenu } = this.props;
    return (
      <div className="bg-warna py-4">
        <div
          className=" d-flex flex-column align-items-center"
          style={{ height: "100%" }}
        >
          <h1 className="mb-5">Admin</h1>
          <div
            style={{ maxHeight: "70vh" }}
            className="mt-5 w-100 px-2 flex-wrap  d-flex flex-column mt-5 "
          >
            <div>
              <Link className="txt-link text-white" to="/">
                <AiFillHome size={30} />
              </Link>
            </div>
            <Link to="/admin">
              <button
                style={{ fontWeight: "bold" }}
                className={`my-2 py-3 w-100 btn ${
                  subMenu === "Home" ? "btn-success" : `btn-light`
                }`}
              >
                Home
              </button>
            </Link>
            <Link to="/admin/manage">
              <button
                style={{ fontWeight: "bold" }}
                className={`my-2 py-3 w-100 btn ${
                  subMenu === "manage" ? "btn-success" : `btn-light`
                }`}
              >
                Manage Product
              </button>
            </Link>
            <button
              style={{ fontWeight: "bold" }}
              className="my-2 py-3 w-100 btn btn-light"
            >
              Manage Transaction
            </button>
            <button
              style={{ fontWeight: "bold" }}
              className="my-2 py-3 w-100 btn btn-light"
            >
              Manage User
            </button>
          </div>
          <div className=" mt-auto mb-2 w-75">
            <button
              style={{ fontWeight: "bold" }}
              className="w-100 btn btn-light"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default HeaderAdmin;
