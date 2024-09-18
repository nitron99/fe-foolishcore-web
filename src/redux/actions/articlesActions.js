import * as actionTypes from "../actionTypes";
import * as api from "../../api/index";
import { toast } from "react-toastify";

export const GetArticles = (page, limit, setLoading) => async (dispatch) => {
  dispatch({ type: actionTypes.CLEAR_ERRORS });
  setLoading(true);
  try {
    const { data, status } = await api.getArticles(page, limit);
    console.log(data, status);
    if(status === 200){
      dispatch({ type: actionTypes.GET_ALL_ARTICLES, payload: data.data });
    }else{
      toast.error(data?.message);
      dispatch({ type: actionTypes.SET_ERRORS, payload: data });
    }
    setLoading(false);
  } catch (error) {
    dispatch({ type: actionTypes.SET_CRASHES, payload: error });
    setLoading(false);
  }
};

export const GetArticle = (id, setLoading) => async (dispatch) => {
  dispatch({ type: actionTypes.CLEAR_ERRORS });
  setLoading(true);
  try {
    const { data, status } = await api.getArticle(id);
    console.log(data, status);
    if(status === 200){
      dispatch({ type: actionTypes.GET_ARTICLE, payload: data.data });
    }else{
      toast.error(data?.message);
      dispatch({ type: actionTypes.SET_ERRORS, payload: data });
    }
    setLoading(false);
  } catch (error) {
    dispatch({ type: actionTypes.SET_CRASHES, payload: error });
    setLoading(false);
  }
};

export const CreateArticle = (formData, setLoading) => async (dispatch) => {
  dispatch({ type: actionTypes.CLEAR_ERRORS });
  setLoading(true);
  try {
    const { data, status } = await api.createArticle(formData);
    if(status === 201){
      toast.success(data?.message);
    }else{
      toast.error(data?.message);
      dispatch({ type: actionTypes.SET_ERRORS, payload: data });
    }
    setLoading(false);
  } catch (error) {
    dispatch({ type: actionTypes.SET_CRASHES, payload: error });
    setLoading(false);
  }
};