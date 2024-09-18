import React from 'react';

import { 
  Box,
  Button,
  Modal, 
  Typography
} from '@mui/material';

import "./styles.scss";

const ConfirmationModal = ({
  open, 
  setOpen, 
  title, 
  onConfirm,
  onCancel
}) => {

  const handleClose = () => {
    setOpen(false);
    onCancel && onCancel();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}>
      <Box className="flexCenterCenterRow"
        width={"100vw"} height={"100vh"}>
        <Box minWidth={"400px"} className="confirm">
          <Box width={"100%"}
            sx={{ margin: "15px 15px 30px 15px"}}>
            <Typography variant='h6'>
              {title}
            </Typography>
            <Typography variant='body1'>
              Are you sure you want to continue?
            </Typography>
          </Box>
          <Box className="flexCenterFERow"
            sx={{ gap: "20px", margin: "15px"}}>
            <Button variant='text'
              onClick={handleClose}>
              Cancel
            </Button>
            <Button 
              variant='contained' 
              color={'error'}
              onClick={onConfirm}>
              Confirm
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}

export default ConfirmationModal;