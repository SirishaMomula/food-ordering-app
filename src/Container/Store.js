import {createStore, applyMiddleware} from 'redux'
import { thunk } from "redux-thunk"; 

import { composeWithDevTools } from 'redux-devtools-extension'
import reducers from "../Reducer"; 

const middleware = [thunk];

const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(...middleware))
)
export default store;