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

export const LogoutActionthunk = () => {
  return (dispatch) => {
    localStorage.removeItem("id");
    dispatch({ type: "LOGOUT" });
  };
};

export const AddToCartAction = (data, userId) => {
  // data object

  return async (dispatch) => {
    //get data user cart
    dispatch({ type: "LoadingCarts" });
    let dataToAxios = {
      users_id: userId,
      products_id: data.id,
      qty: data.qty,
    };
    try {
      let res = await axios.post(`${API_URL}/cart`, dataToAxios);
      dispatch({ type: "CART", carts: res.data.carts });
      toast.success("berhasil add to cart");
      dispatch({ type: "AFTERPROCESS" });
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message || "server error");
      dispatch({ type: "AFTERPROCESS" });
    }
  };
};

// export const AddToCartAction = (data, userId) => {
//   // data object

//   return async (dispatch) => {
//     //get data user cart
//     dispatch({ type: "LoadingCarts" });
//     try {
//       const res = await axios.get(`${API_URL}/users/${userId}`);
//       let carts = res.data.carts; //array
//       // add cart
//       // cek ada atau tidak product didalam cart yang ada
//       let indexfind = carts.findIndex((val) => val.id === data.id);
//       if (indexfind < 0) {
//         carts.push(data);
//       } else {
//         carts[indexfind].qty += data.qty;
//       }

//       await axios.patch(`${API_URL}/users/${userId}`, { carts: carts });
//       // refresh userdata
//       const res1 = await axios.get(`${API_URL}/users/${userId}`);
//       dispatch({ type: "CART", carts: res1.data.carts });
//       toast.success("berhasil add to cart");
//       dispatch({ type: "AFTERPROCESS" });
//     } catch (error) {
//       console.log(error);
//       dispatch({ type: "AFTERPROCESS" });
//     }

//     // add cart
//   };
// };

export const UpdateCartAction = (carts) => {
  return (dispatch) => {
    dispatch({ type: "CART", carts: carts });
  };
};

export const UpdateCartQtyAction = (
  cart_detail_id,
  products_id,
  newqty,
  userId,
  toggle
) => {
  // datacart = array
  // index = number

  return (dispatch) => {
    axios
      .patch(`${API_URL}/cart/qty/${cart_detail_id}`, {
        qty: newqty,
        users_id: userId,
        products_id,
      })
      .then((res) => {
        // refresh userdata
        dispatch({ type: "CART", carts: res.data.carts });
        toggle();
      })
      .catch((err) => {
        alert(err.response.data.message || err);
      });
    // axios
    //   .patch(`${API_URL}/users/${userId}`, { carts: newCart })
    //   .then(() => {
    //     // refresh userdata
    //     axios
    //       .get(`${API_URL}/users/${userId}`)
    //       .then((res1) => {
    //         dispatch({ type: "CART", carts: res1.data.carts });
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       });
    //   })
    //   .catch((err) => {
    //     alert(err);
    //   });
  };
};

export const deleteCartAction = (cartdetailId, userId, MySwal) => {
  // datacart = array
  // index = number
  return (dispatch) => {
    axios
      .delete(`${API_URL}/cart/${cartdetailId}/${userId}`)
      .then((res) => {
        // refresh userdata
        dispatch({ type: "CART", carts: res.data.carts });
        MySwal.fire("Deleted!", "Your file has been deleted.", "success");
      })
      .catch((err) => {
        // alert(err);
        MySwal.fire("Deleted!", "gagal delete ", "error");
      });
  };
};
