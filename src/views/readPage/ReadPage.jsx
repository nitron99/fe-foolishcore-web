import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import moment from 'moment/moment';

import { 
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container, 
  Divider, 
  IconButton, 
  TextField, 
  Tooltip, 
  Typography
} from '@mui/material';

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import EditIcon from '@mui/icons-material/Edit';

import Editor from '../../components/editor/Editor';

import { 
  GetArticle 
} from '../../redux/actions/articlesActions';
import { 
  CreateComment, 
  DeleteComment, 
  GetComments, 
  GetTotalArticleComments, 
  UpdateComment
} from '../../redux/actions/commentActions';
import {
  GetArticleLiked,
  GetTotalArticlesLikes, 
  LikeArticle 
} from '../../redux/actions/articleLikesActions';

import ConfirmationModal from '../../components/modals/ConfirmationModal';

import "./styles.scss";
import { LikeComment } from '../../redux/actions/commentLikesActions';

const Data = {
  Comment: "",
  EditComment: "",
  Reply: ""
}

const ReadPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const state = useSelector(state => state.article);
  const articleLike = useSelector(state => state.articleLike);
  const comment = useSelector(state => state.comment);
  const [formData, setFormData] = useState(Data);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);
  const [loadingComments, setLoadingComments] = useState(true);
  const [deleteConfirmationModalOpen, setDeleteConfirmationModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  const [article, setArticle] = useState(null);

  const [articleLikes, setArticleLikes] = useState(0);
  // this is total comment + replies
  const [articleComments, setArticleComments] = useState(0);
  const [articleLiked, setArticleLiked] = useState(false);

  const [commentsList, setCommentsList] = useState([]);
  const [commentsTotal, setCommentsTotal] = useState(0);

  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [commenting, setCommenting] = useState(false);

  const [editId, setEditId] = useState(null);
  const [editing, setEditing] = useState(false);

  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if("articleId" in params){
      window.scrollTo(0, 0)
      dispatch(GetArticle(params.articleId, setLoading));
      dispatch(GetComments(params.articleId, 0, 1000, setLoadingComments));

      dispatch(GetTotalArticlesLikes(params.articleId, setLoading2));
      dispatch(GetTotalArticleComments(params.articleId, setLoading2));
      dispatch(GetArticleLiked(params.articleId, setLoading2));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      formatArticlesObj(state.article[0] || null)
    } catch (err) {}
  }, [state]);

  useEffect(() => {
    try {
      setArticleLiked(articleLike.articleLiked[0] || false);
      setArticleLikes(articleLike.totalLikes[0] || 0);
    } catch (err) {}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articleLike]);

  useEffect(() => {
    try {
      console.log(comment);
      formatCommentsList(comment.commentsList);
      setArticleComments(comment.totalArticleComments[0] || 0);
    } catch (err) {}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comment]);

  // ----------------- obj formatter -----------------
  const formatArticlesObj = (obj) => {
    setArticle(obj);
  };
  
  const formatCommentsList = (data) => {
    setCommentsList(data[3] || []);
    setCommentsTotal(data[2] || 0);
  };  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ----------------- Comments -----------------
  const handlePostComment = () => {
    let obj = {
      Comment: formData.Comment,
    };
    
    dispatch(CreateComment(article.Id, obj, setCommenting)).then(() => {
      setFormData(Data);
      setIsCommentOpen(false);
      dispatch(GetComments(params.articleId, 0, 1000, setCommenting));
    });
  };

  const handleUpdateComment = (id) => {
    let obj = {
      Comment: formData.EditComment,
    };
    
    dispatch(UpdateComment(editId, obj, setEditing)).then(() => {
      setFormData(Data);
      setEditId(null);
      dispatch(GetComments(params.articleId, 0, 1000, setEditing));
    });
  };

  const handleDeleteComment = () => {
    setDeleteConfirmationModalOpen(false);
    dispatch(DeleteComment(deleteId, setDeleting)).then(() => {
      setDeleteId(null);
      dispatch(GetComments(params.articleId, 0, 1000, setDeleting));
    })
  };  

  // ----------------- Likes -----------------
  const handleLikeArticle = (id) => {
    dispatch(LikeArticle(id, setLoading)).then(() => {
      dispatch(GetTotalArticlesLikes(id, setLoading));
      dispatch(GetArticleLiked(id, setLoading2));
    });
  };

  const handleLikeComment = (id) => {
    dispatch(LikeComment(id, setLoadingComments)).then(() => {
      dispatch(GetComments(params.articleId, 0, 1000, setLoadingComments));
    });
  };

  return (
    <Container 
      maxWidth="ms">

      <ConfirmationModal
        open={deleteConfirmationModalOpen}
        setOpen={setDeleteConfirmationModalOpen}
        title={modalTitle}
        onConfirm={handleDeleteComment}
        onCancel={() => setDeleteId(null)}
        />

        <Box
          className="interactions flex__Column"
          gap={"15px"}>
          <Box
            className="flexCenterCenterColumn">
            <IconButton
              sx={{
                "&:hover": {
                  color: "coral"
                }
              }}
              onClick={() => {
                handleLikeArticle(article.Id);
              }}>
              {
                articleLiked
                ?
                <ThumbUpAltOutlinedIcon 
                  sx={{ 
                    color: 'coral'
                  }}
                  />
                :
                <ThumbUpAltOutlinedIcon 
                  />
              }
            </IconButton>
            <Typography
              variant='caption'
              color={"grey"}>
              {articleLikes}
            </Typography>
          </Box>
          <Box
            className="flexCenterCenterColumn">
            <a href='#comment_section'>
              <IconButton
                sx={{
                  "&:hover": {
                    color: "fuchsia"
                  }
                }}>
                <CommentOutlinedIcon />
              </IconButton>
            </a>
            <Typography
              variant='caption'
              color={"grey"}>
             {articleComments}
            </Typography>
          </Box>
          <IconButton
            sx={{
              "&:hover": {
                color: "lime"
              }
            }}
            onClick={() => {

            }}>
            <BookmarkBorderOutlinedIcon />
          </IconButton>
          <IconButton
            onClick={() => {

            }}>
            <MoreHorizOutlinedIcon />
          </IconButton>
        </Box>
      
      {
        loading
        ?
        <CircularProgress />
        :
        <Box
          mt="20px"
          position={"relative"}
         >
          <Typography 
            variant='h4'
            mb="20px"
            fontWeight={800}>
            {article.Title}
          </Typography>
          <Box
            className="read__user flexCenterSBRow"
            >
            <Box
              className="flexCenter_Row"
              gap={"10px"}>
              <Avatar
                src={article.Author.DP} 
                sx={{ width: "40px", height: "40px" }}
                />
              <Typography variant='subtitle2'>
                {article.Author.Name}
              </Typography>
            </Box>
            <Typography
              variant='body2'
              color={"grey"}>
              {moment(article.createdAt).format("DD MMM YYYY")}&nbsp;
              ({moment(article.createdAt).startOf('sec').fromNow()})
            </Typography>
          </Box>
          <Box>
            {
              article !== null
              &&
              <Editor
                blocks={article.Blocks}
                readOnly={true}
                autofocus={false}
                onSave={null} 
                />
            }
          </Box>

          <Typography
            variant='subtitle1'>
            Comments
          </Typography>
          <Divider />  
          <Box
            sx={{ padding: "10px 0px", gap: "10px" }}
            className="flexFSSBRow">
            <Avatar
              src={JSON.parse(sessionStorage.getItem("user"))?.picture || ""}
              alt='avatar'
              sx={{ 
                width: "40px",
                height: "40px"
              }}>
              {JSON.parse(sessionStorage.getItem("user"))?.name[0] || "NA"}
            </Avatar>
            
            <Box
              width={"100%"}
              className="flex__Column">
              <TextField 
                placeholder='Add a comment...'
                fullWidth
                name='Comment'
                value={formData.Comment}
                onChange={handleChange}
                onFocus={() => setIsCommentOpen(true)}
                />
              
              {
                isCommentOpen
                &&
                <Box
                  sx={{ padding: "10px 0px", gap: "10px" }}
                  className="flexCenterFERow">
                  <Button
                    variant='standard'
                    onClick={() => setIsCommentOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    loading={commenting}
                    disabled={!(formData.Comment !== "")}
                    onClick={handlePostComment}>
                    Post
                  </Button>
                </Box>
              }
            </Box>
          </Box>
          <Box
            mb={"20px"}
            id="comment_section">
            {
              loadingComments
              ?
              <CircularProgress />
              :
                commentsList.length === 0
                ?
                  <Box
                    height={"150px"}
                    className="flexCenterCenterRow">
                    <Typography
                      variant='subtitle2'>
                      No comment found
                    </Typography>
                  </Box>
                :
                  commentsList.map((comment, commentIndex) => (
                    <Box
                      key={commentIndex}
                      className="flexFSSBRow"
                      sx={{ padding: "5px 0px 12px 0px" }}>
                      <Box
                        className="flexFS_Row"
                        sx={{ width: "100%" }}
                        gap="10px">
                        <Avatar
                          src={comment?.User?.DP || ""}
                          alt='avatar'
                          sx={{ 
                            width: "34px",
                            height: "34px"
                          }}>
                        </Avatar>
                        <Box
                          sx={{ width: "100%" }}>
                          <Typography
                            variant='caption'
                            color={"grey"}>
                            {comment?.User?.Name}&nbsp;•&nbsp;
                            {moment(comment.createdAt).startOf('sec').fromNow()}&nbsp;
                            {
                              comment.createdAt !== comment.updatedAt 
                              &&
                              <Chip
                                size='small'
                                label={<i>Edited</i>}
                                />
                            }
                          </Typography>
                          {
                            editId !== null && editId === comment.Id
                            ?
                            <Box
                              sx={{ width: "100%" }}>
                              <TextField
                                variant='outlined'
                                multiline
                                fullWidth
                                name="EditComment"
                                value={formData.EditComment}
                                onChange={handleChange}
                                />
                              <Box
                                sx={{ padding: "10px 0px", gap: "10px" }}
                                className="flexCenterFERow">
                                <Button
                                  variant='standard'
                                  onClick={() => setEditId(null)}>
                                  Cancel
                                </Button>
                                <Button
                                  loading={editing}
                                  disabled={!(formData.EditComment !== "")}
                                  onClick={handleUpdateComment}>
                                  Save
                                </Button>
                              </Box>
                            </Box>
                            :
                            <Box>
                              <Typography
                                variant='body2'>
                                {comment.Text}
                              </Typography>
                              <Box
                                className="flexCenter_Row"
                                gap={"20px"}>
                                <Box
                                  className="flexCenter_Row">
                                  <IconButton
                                    onClick={() => {
                                      handleLikeComment(comment.Id);
                                    }}>
                                    {
                                      comment.LikedByMe === true
                                      ?
                                      <FavoriteBorderOutlinedIcon 
                                        fontSize="small"
                                        sx={{ 
                                          color: 'coral'
                                        }}
                                        />
                                      :
                                      <FavoriteBorderOutlinedIcon 
                                        fontSize="small"/>
                                    }
                                  </IconButton>
                                  <Typography
                                    variant='caption'
                                    color={"grey"}>
                                    {comment.Likes}
                                  </Typography>
                                </Box>
                                <Link>
                                  <Typography
                                    variant='caption'
                                    fontWeight={500}
                                    color={"black"}>
                                    <i>Reply</i>
                                  </Typography>
                                </Link>
                              </Box>
                            </Box>
                          }
                        </Box>
                      
                      </Box>
                      {
                        comment?.User?.Id === JSON.parse(sessionStorage.getItem("user"))?.id && editId === null
                        &&
                        <Box
                          className="flexCenterSBRow"
                          gap={"10px"}>
                          <Tooltip
                            title="Edit comment">
                            <IconButton
                              onClick={() => {
                                setEditId(comment?.Id);
                                setFormData({ ...formData, EditComment: comment.Text})
                              }}>
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          {
                            deleteId === comment.Id && deleting
                            ?
                            <CircularProgress 
                              size={40}
                              sx={{ padding: "8px"}}
                              />
                            :
                            <Tooltip
                              title="Delete comment">
                              <IconButton
                                onClick={() => {
                                  setDeleteId(comment?.Id);
                                  setModalTitle("Delete comment");
                                  setDeleteConfirmationModalOpen(!deleteConfirmationModalOpen);
                                }}>
                                <DeleteOutlineOutlinedIcon />
                              </IconButton>
                            </Tooltip>
                          }
                        </Box>
                      }
                    </Box>
                  ))
          }
          </Box>
        </Box>
      }
    </Container>

  )
}

export default ReadPage;