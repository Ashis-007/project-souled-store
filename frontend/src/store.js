import { createStore, applyMiddleware } from "redux";
import reducer from "./reducer";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import reduxThunk from "redux-thunk";

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(logger, reduxThunk))
);

store.subscribe(() => console.log("Updated State", store.getState()));

export default store;
