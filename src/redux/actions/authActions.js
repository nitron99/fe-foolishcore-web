import * as actionTypes from "../actionTypes";
import * as api from "../../api/index";
import { toast } from "react-toastify";

export const Authenicate = (formData, setLoading) => async (dispatch) => {
  dispatch({ type: actionTypes.CLEAR_ERRORS });
  setLoading(true);
  try {
    const { data, status } = await api.authenicate(formData);
    console.log(data, status)
    if(status === 200){
      dispatch({ type: actionTypes.LOG_IN, payload: data.data });
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