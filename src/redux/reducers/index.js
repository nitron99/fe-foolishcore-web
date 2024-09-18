import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';

import AuthReducers from "./authReducers";
import ArticleReducer from "./articlesReducers";
import ArticleLikeReducer from "./articleLikesReducers";
import TagReducer from "./tagsReducers";
import CommentReducer from "./commentsReducers";

import DashboardReducer from "./dashboardReducers";
import ProfileReducer from "./profileReducers";
import MiscellaneousReducer from "./miscellaneousReducers";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  auth: AuthReducers,
  article: ArticleReducer,
  articleLike: ArticleLikeReducer,
  tag: TagReducer,
  comment: CommentReducer,
  dashboard: DashboardReducer,
  profile: ProfileReducer,
  other: MiscellaneousReducer
});

export default persistReducer(persistConfig, rootReducer);