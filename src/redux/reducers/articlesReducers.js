import * as actionTypes from "../actionTypes.js";

const initialState = {
  articlesList: null,
  article: null
};

const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_ARTICLES:
      return { ...state, articlesList: action.payload };
    case actionTypes.GET_ARTICLE:
      return { ...state, article: action.payload };

    case actionTypes.LOG_OUT:
      return initialState;  

    default:
      return state;
  }
};

export default articleReducer;
