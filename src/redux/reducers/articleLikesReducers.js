import * as actionTypes from "../actionTypes.js";

const initialState = {
  totalLikes: null,
  articleLiked: false
};

const articleLikeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_TOTAL_ARTICLE_LIKE:
      return { ...state, totalLikes: action.payload };
    case actionTypes.GET_ARTICLE_LIKED:
      return { ...state, articleLiked: action.payload };

    case actionTypes.LOG_OUT:
      return initialState;  

    default:
      return state;
  }
};

export default articleLikeReducer;
