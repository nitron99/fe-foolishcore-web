import React from 'react';
import { useNavigate } from 'react-router-dom';

import { 
  Box,
  Container,
  Typography
} from '@mui/material';

import Logo from "../../assets/icons/logo-black.png";

import "./styles.scss";

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigate = (route) => {
    window.scrollTo(0, 0);
    navigate(route);
  };

  return (
    <Box className="footer">
      <Container maxWidth="lg">
        <Box className="footer__container flexCenterCenterColumn"
          gap={"40px"}>
          <img
            src={Logo}
            alt='logo'
            style={{ width: "250px" }}
            />

          <Typography
            variant='body2'>
            Solution for all your foolish cravings
          </Typography>
          <Box
            className="flexCenterCenterRow"
            sx={{ color: "#665704" }}>
            <Typography
              variant='body2'
              className='footer__links'
              onClick={() => handleNavigate("/")}>
              Home
            </Typography>&nbsp;●&nbsp;
            <Typography
              variant='body2'
              className='footer__links'
              onClick={() => handleNavigate("/about")}>
              About
            </Typography>&nbsp;●&nbsp;
            <Typography
              variant='body2'
              className='footer__links'>
              Support
            </Typography>&nbsp;●&nbsp;
            <Typography
              variant='body2'
              className='footer__links'>
              Report bug
            </Typography>&nbsp;●&nbsp;
            <Typography
              variant='body2'
              className='footer__links'
              onClick={() => handleNavigate("/privacy-policy")}>
              Privacy Policy
            </Typography>&nbsp;●&nbsp;
            <Typography
              variant='body2'
              className='footer__links'
              onClick={() => handleNavigate("/terms-and-conditions")}>
              Terms & conditions
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer