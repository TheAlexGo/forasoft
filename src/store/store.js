import {combineReducers, createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import chatReducer from "./reducers/chatReducer";

// Объявление reducer'ов
const rootReducer = combineReducers({
  chat: chatReducer,
})

// На всякий случай подключение thunk
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
