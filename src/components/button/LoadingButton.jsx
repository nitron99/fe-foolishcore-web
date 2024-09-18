import React from 'react';

import { 
  Button, 
  CircularProgress 
} from '@mui/material';

import "./styles.scss";

const LoadingButton = (props) => {
  return (
    <Button { ...props } 
      disabled={props.loading === true ? true : props.disabled}>
      {
        props.loading
        ? <CircularProgress 
            size={30}
            color='grey'
            />
        : props.children || ""
      }
    </Button>
  )
}

export default LoadingButton;