import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { 
  CLEAR_CRASHES, 
  CLEAR_ERRORS 
} from '../../redux/actionTypes';

const ErrorHandler = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector(state => state.other);

  useEffect(() => {
    try {
      console.log(state);
      if(state.errors !== null) errorParser(state.errors);
      if(state.crashes !== null) crashParser(state.crashes);
    } catch (err) {}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  // ============== testing function ==============
  const errorParser = (data) => {
    if("message" in data){
      toast.error(data.message);
    }

    // errors will be resolved at first occurance.
    dispatch({ type: CLEAR_ERRORS });
  };

  const crashParser = (data) => {
    if("message" in data.response.data){
      toast.error(data.response.data.message);
    }

    // crashes will be resolved at first occurance.
    dispatch({ type: CLEAR_CRASHES });
  };
}

export default ErrorHandler