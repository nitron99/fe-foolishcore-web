import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { GoogleLogin, useGoogleOneTapLogin, useGoogleLogin  } from '@react-oauth/google'
import { useDispatch } from 'react-redux';

import { 
  Avatar,
  Box, 
  Button, 
  Container, 
  IconButton, 
  InputAdornment, 
  Menu, 
  MenuItem, 
  TextField,
  Typography
} from '@mui/material';

import FaceLogo from "../../assets/icons/logo.png";
import Logo from "../../assets/icons/logo-black.png";

import CreateIcon from '@mui/icons-material/Create';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

import { 
  Authenicate 
} from '../../redux/actions/authActions';

import {
  LOG_OUT
} from "../../redux/actionTypes";

import "./styles.scss";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [loading, setLoading] = useState(false);

  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);

  const controlNavbar = () => {
    if(window.scrollY > lastScrollY + 5){
      setShow(false);
    }else if(window.scrollY < lastScrollY){
      setShow(true);
    }
    setLastScrollY(window.scrollY);
  }

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastScrollY]);

  const handleCloseProfileMenu = () => {
    setProfileMenuAnchor(null);
    setProfileMenuOpen(false);
  };

  const handleNavigate = (route) => {
    handleCloseProfileMenu();
    navigate(route);
  };

  // =========== handle login ===========
  const handleAuth = (obj) => {
    console.log(obj);
    let payload = {
      token: obj
    }
    dispatch(Authenicate(payload, setLoading)).then(() => {
      console.log("request sent")
    });
  };

  // =========== handle logout ===========
  const handleLogout = () => {
    dispatch({ type: LOG_OUT });
    handleCloseProfileMenu();
  };

  return (
    show
    ?
    <Box
      className="navbar flexCenterCenterRow"
      sx={{ 
        backgroundColor: "white", 
      }}>
      <Container maxWidth="lg">
        <Box className="flexCenterSBRow">
          <Box 
            className="flexCenter_Row navbar__logo" 
            gap={"5px"}
            onClick={() => navigate("/")}>
            <img
              src={FaceLogo}
              alt='logo'
              style={{ width: "40px" }}
              />
            <img
              src={Logo}
              alt='logo'
              style={{ width: "150px" }}
              />
          </Box>
          <Box className="flexCenter_Row" gap={"20px"}>
            {
              location.pathname !== "/new-article"
              &&
              <TextField
                variant='outlined'
                sx={{ ".MuiOutlinedInput-root": { height: "42px"}, maxWidth: "230px"}}
                InputProps={{
                  startAdornment: 
                    <InputAdornment position="start"
                    sx={{ marginLeft: "-5px"}}>
                      <SearchIcon 
                        color='grey'/>
                    </InputAdornment>,
                }}
                />
            }
            {
              (JSON.parse(sessionStorage.getItem("user")) && location.pathname !== "/new-article")
              &&
              <Button
                variant='text'
                sx={{ height: "42px" }}
                onClick={() => navigate("/new-article")}>
                <CreateIcon fontSize='small' sx={{ marginRight: "5px" }} />
                Write
              </Button>
            }
            {
              JSON.parse(sessionStorage.getItem("user"))
              ?
              <IconButton
                sx={{ marginRight: "-8px", marginLeft: "-8px"}}
                onClick={(e) => {
                  setProfileMenuAnchor(e.currentTarget);
                  setProfileMenuOpen(!profileMenuOpen);
                }}>
                <Avatar
                  src={JSON.parse(sessionStorage.getItem("user"))?.picture || ""}
                  alt='avatar'
                  sx={{ 
                    width: "40px",
                    height: "40px"
                  }}>
                  {JSON.parse(sessionStorage.getItem("user"))?.name[0] || "NA"}
                </Avatar>
              </IconButton>
              :
                <GoogleLogin
                  onSuccess={credentialResponse => {
                    console.log(credentialResponse);
                    handleAuth(credentialResponse.credential);
                  }}
                  onError={() => {
                    console.log('Login Failed');
                  }}
                  useOneTap
                  shape="pill"
                  text="signin"
                  width="120px"
                />
            }
          </Box>
        </Box>
      </Container>  

      <Menu
        anchorEl={profileMenuAnchor}
        open={profileMenuOpen}
        onClose={handleCloseProfileMenu}>
        <MenuItem 
          onClick={() => {handleNavigate("/profile")}}>
          <Box
            className="flexCenter_Row"
            gap={"10px"}>
            <AccountCircleOutlinedIcon />
            <Typography>
              Profile
            </Typography>
          </Box>
        </MenuItem>
        <MenuItem 
          onClick={() => {handleNavigate("/dashboard")}}>
          <Box
            className="flexCenter_Row"
            gap={"10px"}>
            <DashboardOutlinedIcon />
            <Typography>
              Dashboard
            </Typography>
          </Box>
        </MenuItem>
        <MenuItem 
          onClick={handleLogout}>
          <Box
            className="flexCenter_Row"
            gap={"10px"}>
            <LogoutOutlinedIcon />
            <Typography>
              Logout
            </Typography>
          </Box>
        </MenuItem>
      </Menu>
    </Box>
    :
    <Box 
      sx={{ 
        minHeight: "64px",  
        borderBottom:" solid 1px rgb(240, 240, 240)" 
      }} 
    />
  )
}

export default Navbar