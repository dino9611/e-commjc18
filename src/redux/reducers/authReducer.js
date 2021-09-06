const INITIAL_STATE = {
  id: 0,
  username: "",
  password: "",
  email: "",
  role: "",
  isLogin: false,
  carts: [],
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
      return { ...state, ...action.payload, isLogin: true };
    case "LOGOUT":
      return INITIAL_STATE;
    case "CART":
      return { ...state, carts: action.carts };
    default:
      return state;
  }
};

export default authReducer;
