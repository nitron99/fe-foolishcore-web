import * as actionTypes from "../actionTypes";
import * as api from "../../api/index";

export const LikeComment = (id, setLoading) => async (dispatch) => {
  dispatch({ type: actionTypes.CLEAR_ERRORS });
  setLoading(true);
  try {
    const { data, status } = await api.likeComment(id);
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
