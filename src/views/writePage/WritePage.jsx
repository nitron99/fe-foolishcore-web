import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createReactEditorJS } from 'react-editor-js';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { 
  Autocomplete,
  Box,
  Button,
  Container, 
  TextField,
  Typography
} from '@mui/material';

import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

import { 
  GetTags 
} from '../../redux/actions/tagsActions';
import { 
  CreateArticle 
} from '../../redux/actions/articlesActions';

import "./styles.scss";
import Editor from '../../components/editor/Editor';


const WritePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector(state => state.tag);
  const [loading, setLoading] = useState(true);
  const editorCore = useRef(null);
  const [data, setData] = useState();
  const [title, setTitle] = useState("");

  const [tagsList, setTagsList] = useState([]);
  const [selectedTagsList, setSelectedTagsList] = useState([]);

  useEffect(() => {
    dispatch(GetTags(0, 1000, setLoading));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      console.log(state);
      formatTagsList(state.tagsList);
    } catch (err) {}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const formatTagsList = (data) => {
    setTagsList(data[3] || []);
  };
  
  // useEffect(() => {
  //   console.log(data);
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [data]);

  const handleInitialize = useCallback((instance) => {
    editorCore.current = instance
  }, []);

  const handleSubmit = async () => {
    let tempBlocks = await editorCore.current.save()
    console.log(title);
    let obj = {
      Title: title,
      Blocks: tempBlocks, 
      Tags: selectedTagsList.map(i => { return i.Id })
    }
    console.log(obj);
    dispatch(CreateArticle(obj, setLoading)).then(() => {
      navigate("/");
    });
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ backgroundColor: "white" }}>
        <Box
          sx={{ margin: "20px auto 40px auto", maxWidth: "650px" }}>
          <TextField
            variant='outlined' 
            fullWidth
            multiline
            maxRows={4}
            placeholder='Title of article'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />
        </Box>

        <Box
          sx={{ margin: "20px auto 40px auto", maxWidth: "650px" }}>
          <Autocomplete
            multiple
            options={tagsList}
            getOptionLabel={(option) => 
              <Typography
                variant='body2'>
                {option.Title}
              </Typography>}
            onChange={(e, value) => setSelectedTagsList(value)}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Tags"
              />
            )}
            // renderTags={(value, getTagProps, ownerState) => {console.log(value, getTagProps, ownerState)}}
            // ChipProps={{
            //   size: 'small'
            // }}
          />
        </Box>

        <Editor
          blocks={data}
          handleInitialize={handleInitialize}
          readOnly={false}
          autofocus={true}
          />

        <Box 
          className="flexCenter_Row" gap={"20px"}
          margin={"auto"}
          sx={{ marginTop: "100px", maxWidth: "650px" }}>
          <Button
            variant='outlined'
            onClick={() => {navigate("/")}}>
            <CloseIcon fontSize='small' sx={{ marginRight: "5px" }}/>
            Cancel
          </Button>
          <Button
            onClick={() => {handleSubmit()}}>
            <SaveIcon fontSize='small' sx={{ marginRight: "5px" }}/>
            Post Article
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default WritePage;