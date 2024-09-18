import * as actionTypes from "../actionTypes";
import * as api from "../../api/index";
import { toast } from "react-toastify";

export const GetComments = (id, page, limit, setLoading) => async (dispatch) => {
  dispatch({ type: actionTypes.CLEAR_ERRORS });
  setLoading(true);
  try {
    const { data, status } = await api.getComments(id, page, limit);
    if(status === 200){
      dispatch({ type: actionTypes.GET_COMMENTS, payload: data.data });
    }else{
      dispatch({ type: actionTypes.SET_ERRORS, payload: data });
    }
    setLoading(false);
  } catch (error) {
    dispatch({ type: actionTypes.SET_CRASHES, payload: error });
    setLoading(false);
  }
};

export const GetTotalArticleComments = (id, setLoading) => async (dispatch) => {
  dispatch({ type: actionTypes.CLEAR_ERRORS });
  setLoading(true);
  try {
    const { data, status } = await api.getTotalArticleComments(id);
    if(status === 200){
      dispatch({ type: actionTypes.GET_TOTAL_ARTICLE_COMMENTS, payload: data.data });
    }else{
      dispatch({ type: actionTypes.SET_ERRORS, payload: data });
    }
    setLoading(false);
  } catch (error) {
    dispatch({ type: actionTypes.SET_CRASHES, payload: error });
    setLoading(false);
  }
};

// export const GetArticle = (id, setLoading) => async (dispatch) => {
//   dispatch({ type: actionTypes.CLEAR_ERRORS });
//   setLoading(true);
//   try {
//     const { data, status } = await api.getArticle(id);
//     console.log(data, status);
//     if(status === 200){
//       dispatch({ type: actionTypes.GET_ARTICLE, payload: data.data });
//     }else{
//       toast.error(data?.message);
//       dispatch({ type: actionTypes.SET_ERRORS, payload: data });
//     }
//     setLoading(false);
//   } catch (error) {
//     dispatch({ type: actionTypes.SET_CRASHES, payload: error });
//     setLoading(false);
//   }
// };

export const CreateComment = (id, formData, setLoading) => async (dispatch) => {
  dispatch({ type: actionTypes.CLEAR_ERRORS });
  setLoading(true);
  try {
    const { data, status } = await api.createComment(id, formData);
    if(status === 201){
      toast.success(data?.message);
    }else{
      dispatch({ type: actionTypes.SET_ERRORS, payload: data });
    }
    setLoading(false);
  } catch (error) {
    dispatch({ type: actionTypes.SET_CRASHES, payload: error });
    setLoading(false);
  }
};

export const UpdateComment = (id, formData, setLoading) => async (dispatch) => {
  dispatch({ type: actionTypes.CLEAR_ERRORS });
  setLoading(true);
  try {
    const { data, status } = await api.updateComment(id, formData);
    if(status === 202){
      toast.success(data?.message);
    }else{
      dispatch({ type: actionTypes.SET_ERRORS, payload: data });
    }
    setLoading(false);
  } catch (error) {
    dispatch({ type: actionTypes.SET_CRASHES, payload: error });
    setLoading(false);
  }
};

export const DeleteComment = (id, setLoading) => async (dispatch) => {
  dispatch({ type: actionTypes.CLEAR_ERRORS });
  setLoading(true);
  try {
    const { data, status } = await api.deleteComment(id);
    if(status === 202){
      toast.success(data?.message);
    }else{
      dispatch({ type: actionTypes.SET_ERRORS, payload: data });
    }
    setLoading(false);
  } catch (error) {
    dispatch({ type: actionTypes.SET_CRASHES, payload: error });
    setLoading(false);
  }
};