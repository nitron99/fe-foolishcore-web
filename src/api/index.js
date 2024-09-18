
import axios from "axios";

const API = axios.create({
  baseURL: ``,
});

// Request Interceptor
API.interceptors.request.use((req) => {
  if(sessionStorage.getItem("user")){
    req.headers.Authorization = `Bearer ${JSON.parse(sessionStorage.getItem("user")).token}`;
  }
  return req;
});

// Response Interceptor
API.interceptors.response.use(
  (response) => {
    // console.log(response);
    return response;
  }, (error) => {
    return Promise.reject(error);
  }
);

export const authenicate = (form) => API.post(`http://localhost:8000/apps/web/v1/user`, form);

// ============= GENERAL =============

// contents
export const getArticles = (page, limit) => API.get(`http://localhost:8000/apps/web/v1/contents?page=${page}&limit=${limit}`);
export const getArticle = (id) => API.get(`http://localhost:8000/apps/web/v1/contents/${id}`);

// articles

// article likes
export const getTotalArticlesLikes = (id) => API.get(`http://localhost:8000/apps/web/v1/article-likes/${id}`);
export const getArticleLiked = (id) => API.get(`http://localhost:8000/apps/web/v1/article-likes/liked/${id}`);
export const likeArticle = (id) => API.post(`http://localhost:8000/apps/web/v1/article-likes/${id}`);

// tags
export const getTags = (page, limit) => API.get(`http://localhost:8000/apps/web/v1/tags?page=${page}&limit=${limit}`);

// comments
export const getComments = (id, page, limit) => API.get(`http://localhost:8000/apps/web/v1/comment/${id}?page=${page}&limit=${limit}`);
export const getTotalArticleComments = (id) => API.get(`http://localhost:8000/apps/web/v1/comment/total/${id}`);
export const createComment = (id, form) => API.post(`http://localhost:8000/apps/web/v1/comment/${id}`, form);
export const updateComment = (id, form) => API.put(`http://localhost:8000/apps/web/v1/comment/${id}`, form);
export const deleteComment = (id) => API.delete(`http://localhost:8000/apps/web/v1/comment/${id}`);

// comment likes
export const likeComment = (id) => API.post(`http://localhost:8000/apps/web/v1/comment-likes/${id}`);

export const getReplies = () => API.get(``);
export const createReply = () => API.post(``);
export const updateReply = () => API.put(``);
export const deleteReply = () => API.delete(``);
export const likeReply = () => API.get(``);



// ============= DASHBOARD =============
// articles
export const getArticlesDASH = (page, limit) => API.get(`http://localhost:8000/apps/web/v1/dashboard/articles?page=${page}&limit=${limit}`);
export const createArticleDASH = (form) => API.post(`http://localhost:8000/apps/web/v1/dashboard/articles`, form);

export const createArticle = (form) => API.post(`http://localhost:8000/apps/web/v1/article`, form);


// ============= PROFILE ===============