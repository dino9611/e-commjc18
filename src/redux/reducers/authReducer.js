const INITIAL_STATE = {
  id: 0,
  username: "",
  password: "",
  email: "",
  role: "",
  role_id: 0,
  isLogin: false,
  carts: [],
  loadingCarts: false,
};

// payload
// {
//   "id": 1,
//   "username": "dino",
//   "password": "abcde",
//   "email": "dinopwdk@gmail.com",
//   "role": "user",
// }

//? hasil akhir
// return {
//    "id": 1,
//   "username": "dino",
//   "password": "abcde",
//   "email": "dinopwdk@gmail.com",
//   "role": "user",
//    isLogin: true
// }

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOGIN":
      let newState = state;
      newState = { ...state, ...action.payload, isLogin: true };
      // return { ...state, ...action.payload, isLogin: true };
      return newState;
    case "LOGOUT":
      return INITIAL_STATE;
    case "CART":
      return { ...state, carts: action.carts };
    case "LoadingCarts":
      return { ...state, loadingCarts: true };
    case "AFTERPROCESS":
      return { ...state, loadingCarts: false };
    default:
      return state;
  }
};

export default authReducer;
