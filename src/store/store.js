import {combineReducers, createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import chatReducer from "./reducers/chatReducer";

const rootReducer = combineReducers({
  chat: chatReducer,
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
