import * as actionTypes from "../actionTypes";
import * as api from "../../api/index";

export const GetTotalArticlesLikes = (id, setLoading) => async (dispatch) => {
  dispatch({ type: actionTypes.CLEAR_ERRORS });
  setLoading(true);
  try {
    const { data, status } = await api.getTotalArticlesLikes(id);
    if(status === 200){
      dispatch({ type: actionTypes.GET_TOTAL_ARTICLE_LIKE, payload: data.data });
    }else{
      dispatch({ type: actionTypes.SET_ERRORS, payload: data });
    }
    setLoading(false);
  } catch (error) {
    dispatch({ type: actionTypes.SET_CRASHES, payload: error });
    setLoading(false);
  }
};

export const GetArticleLiked = (id, setLoading) => async (dispatch) => {
  dispatch({ type: actionTypes.CLEAR_ERRORS });
  setLoading(true);
  try {
    const { data, status } = await api.getArticleLiked(id);
    if(status === 200){
      dispatch({ type: actionTypes.GET_ARTICLE_LIKED, payload: data.data });
    }else{
      dispatch({ type: actionTypes.SET_ERRORS, payload: data });
    }
    setLoading(false);
  } catch (error) {
    dispatch({ type: actionTypes.SET_CRASHES, payload: error });
    setLoading(false);
  }
};

export const LikeArticle = (id, setLoading) => async (dispatch) => {
  dispatch({ type: actionTypes.CLEAR_ERRORS });
  setLoading(true);
  try {
    const { data, status } = await api.likeArticle(id);
    if(status === 201){
      // toast.success(data?.message);
    }else{
      dispatch({ type: actionTypes.SET_ERRORS, payload: data });
    }
    setLoading(false);
  } catch (error) {
    dispatch({ type: actionTypes.SET_CRASHES, payload: error });
    setLoading(false);
  }
};

