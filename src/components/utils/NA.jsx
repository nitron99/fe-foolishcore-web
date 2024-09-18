import React from 'react';

import { 
  Typography 
} from '@mui/material';

const NA = ({label}) => {
  return (
    <Typography
      variant='caption'
      color={"grey"}>
      <i>{ label ? label : "NA"}</i>
    </Typography>
  )
}

export default NA;