import * as actionTypes from "../actionTypes";
import * as api from "../../api/index";
import { toast } from "react-toastify";

export const GetTags = (page, limit, setLoading) => async (dispatch) => {
  dispatch({ type: actionTypes.CLEAR_ERRORS });
  setLoading(true);
  try {
    const { data, status } = await api.getTags(page, limit);
    if(status === 200){
      dispatch({ type: actionTypes.GET_TAGS, payload: data.data });
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