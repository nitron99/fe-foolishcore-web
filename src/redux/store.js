import { createStore, compose, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import {thunk} from "redux-thunk";
import rootReducer from "./reducers/index.js";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
export const persistor = persistStore(store, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// eslint-disable-next-line import/no-anonymous-default-export
export default { store, persistor };
