import * as actionTypes from "../actionTypes.js";

const initialState = {

};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.LOG_OUT:
      return initialState;  

    default:
      return state;
  }
};

export default profileReducer;
