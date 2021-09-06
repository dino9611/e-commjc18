import { combineReducers } from "redux";
import authReducer from "./authReducer";

export default combineReducers({
  auth: authReducer,
});

// {
//   auth:{
//     id: 0,
//     username: "",
//     password: "",
//     email: "",
//     role: "",
//     isLogin: false,
//     carts: [],
//   },
// history:[]
// }

// let obj = this.setState.auth
// obj = {...obj,...newdata,isLogin:true}
// this.setState({auth:obj})
