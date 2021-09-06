const INITIAL_STATE = {
  primaryColor: 'rgb(97, 56, 245)',
  secondaryColor: 'rgb(60, 22, 197)',
};

const headerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'PRIM_COLOR':
      return;
    case 'SEC_COLOR':
      return;
    default:
      return state;
  }
};

export default headerReducer;
