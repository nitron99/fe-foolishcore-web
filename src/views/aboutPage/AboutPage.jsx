import React from 'react';

import { 
  Box,
  Container, 
  Typography
} from '@mui/material';

import "./styles.scss"

const AboutPage = () => {
  return (
    <Container 
      maxWidth="ms">
      <Box
        className="flex__Column"
        gap={"20px"}
        mt={"20px"}
        mb={"20px"}>


        <Typography
          variant='h5'>
          <strong>About us</strong>
        </Typography>

        <Typography
          variant='subtitle1'
          textAlign={"center"}>
          Coming soon
        </Typography>
        
      </Box>
    </Container>
  )
}

export default AboutPage;