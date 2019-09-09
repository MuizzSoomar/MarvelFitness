import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import allReducers from "./reducers/index";

const allStoreEnhancers = compose(
  applyMiddleware(thunk)
  // window.devToolsExtension && window.devToolsExtension()
);

const store = createStore(allReducers, allStoreEnhancers);

export default store;
