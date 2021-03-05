import {AUTHENTICATED, SET_CURRENT_CHAT, SET_USERNAME, UNAUTHENTICATED} from "../constActions";

/**
 * Войти в чат
 * @returns {{payload: {isAuth}, type: string}}
 */
export const auth = () =>
  ({type: AUTHENTICATED, payload: {isAuth: true}});

/**
 * Выйти из чата
 * @returns {{payload: {isAuth}, type: string}}
 */
export const unAuth = () =>
  ({type: UNAUTHENTICATED, payload: {isAuth: false}});

/**
 * Установка имени пользователя
 * @returns {{payload: {isAuth}, type: string}}
 */
export const setUsername = (name) =>
  ({type: SET_USERNAME, payload: {username: name}});

/**
 * Установка номера действующего чата
 * @returns {{payload: {isAuth}, type: string}}
 */
export const setChatID = (chatID) =>
  ({type: SET_CURRENT_CHAT, payload: chatID});

