import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../../helpers/ApiUrl";

export const LoginAction = (userdata) => {
  return {
    type: "LOGIN",
    payload: userdata, // userdata type datana harus object
  };
};

export const AddToCartAction = (data, userId) => {
  // data object

  return (dispatch) => {
    // add cart
    axios
      .post(`${API_URL}/carts`, data)
      .then(() => {
        // get cart dengan userid terntentu
        axios
          .get(`${API_URL}/carts?_expand=product&userId=${userId}`)
          .then((res) => {
            dispatch({ type: "CART", carts: res.data });
            toast.success("berhasil Add To Cart");
          })
          .catch(() => {
            alert("error server");
          });
      })
      .catch((err) => {
        alert("error");
      });
  };
};
