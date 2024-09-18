import * as actionTypes from "../actionTypes.js";

const initialState = {
  // errors
  errors: null,

  // crashes
  crashes: null
};

const miscellaneousReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ERRORS:
      return { ...state, errors: action.payload };
    case actionTypes.CLEAR_ERRORS:
      return { ...state, errors: null };

    case actionTypes.SET_CRASHES:
      return { ...state, crashes: action.payload };
    case actionTypes.CLEAR_CRASHES:
      return { ...state, crashes: null };

    case actionTypes.LOG_OUT:
      return initialState;  

    default:
      return state;
  }
};

export default miscellaneousReducer;
