import * as actionTypes from "../actionTypes.js";

const initialState = {
  commentsList: null,
  totalArticleComments: null,
  repliesList: null
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_COMMENTS:
      return { ...state, commentsList: action.payload };
    case actionTypes.GET_TOTAL_ARTICLE_COMMENTS:
      return { ...state, totalArticleComments: action.payload };
    case actionTypes.GET_REPLIES:
      return { ...state, repliesList: action.payload };

    case actionTypes.LOG_OUT:
      return initialState;  

    default:
      return state;
  }
};

export default commentReducer;
