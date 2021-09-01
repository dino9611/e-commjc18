export const LoginAction = (userdata) => {
  return {
    type: "LOGIN",
    payload: userdata, // userdata type datana harus object
  };
};
