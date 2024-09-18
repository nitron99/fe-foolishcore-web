import * as actionTypes from "../actionTypes.js";

const initialState = {
  tagsList: null, 
  articleTagsList: null
};

const tagReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_TAGS:
      return { ...state, tagsList: action.payload };


    case actionTypes.LOG_OUT:
      return initialState;  

    default:
      return state;
  }
};

export default tagReducer;
