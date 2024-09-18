import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { 
  Box,
  Container, 
  Typography
} from '@mui/material';

import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import ErrorHandler from '../components/errorHandler/ErrorHandler';

//routes
import AuthPage from '../views/authPage/AuthPage';
import HomePage from '../views/homePage/HomePage';
import UserPage from '../views/userPage/UserPage';
import ReadPage from '../views/readPage/ReadPage';
import WritePage from '../views/writePage/WritePage';
import DashboardPage from '../views/dashboardPage/DashboardPage';

import AboutPage from '../views/aboutPage/AboutPage';
import PrivacyPolicyPage from '../views/privacyPolicyPage/PrivacyPolicyPage';
import TermsAndConditionsPage from '../views/termsAndConditionsPage/TermsAndConditionsPage';

import "../global.scss";

const MainRouter = () => {
  return (
    <Router>
      <Box minHeight={"100vh"}>
        <Navbar/>
        <Routes>
          <Route path='/' element={<HomePage />}/>
          {/* <Route path='/:userId' element={<UserPage />}/> */}
          <Route path='/:articleId' element={<ReadPage />}/>
          <Route path='/new-article' element={<WritePage />}/>
          <Route path='/auth' element={<AuthPage />}/>
          <Route path='/profile' element={<UserPage />}/>
          <Route path='/dashboard' element={<DashboardPage />}/>

          <Route path='/about' element={<AboutPage />}/>
          <Route path='/privacy-policy' element={<PrivacyPolicyPage />}/>
          <Route path='/terms-and-conditions' element={<TermsAndConditionsPage />}/>

          <Route path='*' element={<NotFoundPage />}/>
        </Routes>
      </Box>
      <Footer />
      <ErrorHandler />
    </Router>
  )
}

export default MainRouter;


//  404 not found page
const NotFoundPage = () => {
  return (
    <Container maxWidth="lg">
      <Box 
        height={"calc(100vh - 64px)"}
        className="flexCenterCenterRow">
        <Typography variant='h3'>
          404 - Page not found
        </Typography>
      </Box>
    </Container>
  )
}