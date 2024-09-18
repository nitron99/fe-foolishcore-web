import * as actionTypes from "../actionTypes.js";

const initialState = {
  articlesList: null
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ARTICLES_DASH:
      return { ...state, articlesList: action.payload };

    case actionTypes.LOG_OUT:
      return initialState;  

    default:
      return state;
  }
};

export default dashboardReducer;
