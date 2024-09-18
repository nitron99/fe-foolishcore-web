import * as actionTypes from "../actionTypes.js";

const initialState = {
  isAuthenticated: false,
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOG_IN:
      sessionStorage.setItem("user", JSON.stringify(action.payload));
      return { ...state, user: action.payload, isAuthenticated: true };

    case actionTypes.LOG_OUT:
      sessionStorage.clear();
      localStorage.clear();
      return initialState;  

    default:
      return state;
  }
};

export default authReducer;
