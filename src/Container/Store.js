import { createStore, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk"; // Correctly import thunk as a named export
import rootReducer from "../Reducer";

// Check if Redux DevTools is available
const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)) // Apply middleware correctly
);

export default store;
