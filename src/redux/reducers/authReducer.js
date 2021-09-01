const INITIAL_STATE = {
  id: 0,
  username: "",
  password: "",
  email: "",
  role: "",
  isLogin: false,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, ...action.payload, isLogin: true };
    default:
      return state;
  }
};

export default authReducer;
