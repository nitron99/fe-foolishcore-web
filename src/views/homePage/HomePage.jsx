import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

import { 
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Typography,
} from '@mui/material';

import { 
  Authenicate 
} from '../../redux/actions/authActions';

import { 
  GetArticles 
} from '../../redux/actions/articlesActions';

import "./styles.scss";

// import { GoogleLogin } from '@react-oauth/google';

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector(state => state.article);
  const [loading, setLoading] = useState(false);

  const [articlesList, setArticlesList] = useState([]);
  const [articlesTotal, setArticlesTotal] = useState(0);

  useEffect(() => {
    dispatch(GetArticles(0, 100, setLoading))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      console.log(state)
      formatArticlesList(state.articlesList[3]);
      setArticlesTotal(state.articlesList[2]);
    } catch (err) {}
  }, [state]);

  // ------------------- list formatter -------------------
  const formatArticlesList = (list) => {
    console.log(list)
    setArticlesList(list);
  }

  const handleOpenArticle = (id) => {
    navigate(`/${id}`);
  };

  
  function convertToPastel(hex, intensity) {
    function hexToRgb(hex) {
        hex = hex.replace('#', '');
        const bigint = parseInt(hex, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return [r, g, b];
    }

    function rgbToHex(r, g, b) {
        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
    }

    let [r, g, b] = hexToRgb(hex);

    r = Math.floor(r + (255 - r) * intensity);
    g = Math.floor(g + (255 - g) * intensity);
    b = Math.floor(b + (255 - b) * intensity);

    return rgbToHex(r, g, b);
  }


  return (
    <Container 
      maxWidth="ms">
      {/* <GoogleLogin
        onSuccess={credentialResponse => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />; */}
      <Box
        mt="20px">
        {/* <Button
          variant='text'>
          Testasdklfhjkl;asjdfl;kajsdlkfjasl;kf
        </Button>
        <Button
          variant='outlined'>
          Test
        </Button>
        <Button
          variant='contained'>
          Test
        </Button> */}
        {
          loading
          ?
            <CircularProgress />
          :
            articlesList.map((article, index) => (
              <Box key={index}
                onClick={() => handleOpenArticle(article.Id)}
                className="home_article flex__Column"
                gap={"10px"}>
                <Typography
                  variant='h6'>
                  {article.Title}
                </Typography>
                <Box
                  className="flexCenter_Row"
                  gap={"10px"}>
                  {
                    article.Tags.map((tag, tagIndex) => (
                      <Chip 
                        key={tagIndex}
                        size='small'
                          sx={{ 
                            color: convertToPastel(tag.Color, -0.25), 
                            backgroundColor: convertToPastel(tag.Color, 0.9),
                            border: "1px solid",
                            borderColor: convertToPastel(tag.Color, 0.9), 
                            transition: "0.2s all",
                            "&: hover": {
                              cursor: "pointer",
                              borderColor: convertToPastel(tag.Color, -0.25)
                            }  }}
                          label={"#"+tag.Title} 
                          />
                    ))
                  }
                </Box>
                <Box
                  className="flexCenterSBRow">
                  <Box
                    className="flexCenter_Row"
                    gap={"10px"}>
                    <Avatar
                      src={article?.Author?.DP}
                      style={{ 
                        width: "34px",
                        height: "34px"
                      }}>
                    </Avatar>
                    <Typography
                      variant='body2'
                      color={"grey"}>
                      {article?.Author?.Name}
                    </Typography>
                  </Box>
                  <Typography
                    variant='body2'
                    color={"grey"}>
                    {moment(article.createdAt).startOf('sec').fromNow()}
                  </Typography>
                </Box>
              </Box>
            ))
        }

      </Box>
    </Container>
  )
}

export default HomePage;