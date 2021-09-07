import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../../helpers/ApiUrl";

export const LoginAction = (userdata) => {
  return {
    type: "LOGIN",
    payload: userdata, // userdata type datana harus object
  };
};

export const LogoutAction = () => {
  return {
    type: "LOGOUT",
  };
};
export const AddToCartAction = (data, userId) => {
  // data object

  return (dispatch) => {
    //get data user cart
    dispatch({ type: "LoadingCarts" });
    axios.get(`${API_URL}/users/${userId}`).then((res) => {
      let carts = res.data.carts; //array
      // add cart
      // cek ada atau tidak product didalam cart yang ada
      let indexfind = carts.findIndex((val) => val.id == data.id);
      if (indexfind < 0) {
        carts.push(data);
      } else {
        carts[indexfind].qty += data.qty;
      }
      axios
        .patch(`${API_URL}/users/${userId}`, { carts: carts })
        .then(() => {
          // refresh userdata
          axios
            .get(`${API_URL}/users/${userId}`)
            .then((res1) => {
              dispatch({ type: "CART", carts: res1.data.carts });
              toast.success("berhasil add to cart");
              dispatch({ type: "AFTERPROCESS" });
            })
            .catch((err) => {
              console.log(err);
              dispatch({ type: "AFTERPROCESS" });
            });
        })
        .catch((err) => {
          console.log(err);
          dispatch({ type: "AFTERPROCESS" });
        });
    });

    // add cart
  };
};

export const UpdateCartAction = (newCart, userId) => {
  // datacart = array
  // index = number

  return (dispatch) => {
    axios
      .patch(`${API_URL}/users/${userId}`, { carts: newCart })
      .then(() => {
        // refresh userdata
        axios
          .get(`${API_URL}/users/${userId}`)
          .then((res1) => {
            dispatch({ type: "CART", carts: res1.data.carts });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        alert(err);
      });
  };
};
