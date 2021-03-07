import {
  ADD_MESSAGE,
  AUTHENTICATED,
  JOIN_USER, LEAVE_USER,
  SET_CURRENT_CHAT,
  SET_ROOMS,
  SET_USERNAME,
  UNAUTHENTICATED
} from "../constActions";

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
 * @returns {{payload: name, type: string}}
 */
export const setUsername = (name) =>
  ({type: SET_USERNAME, payload: name});

/**
 * Установка номера действующего чата
 * @returns {{payload: chatID, type: string}}
 */
export const setChatID = (chatID) =>
  ({type: SET_CURRENT_CHAT, payload: chatID});

/**
 * Установка комнат в состояние
 * @returns {{payload: rooms, type: string}}
 */
export const setRooms = (rooms) =>
  ({type: SET_ROOMS, payload: rooms});

/**
 * Установка комнат в состояние: добавление пользователя с isOnline: true
 * @returns {{payload: rooms, type: string}}
 */
export const joinUser = (rooms) =>
  ({type: JOIN_USER, payload: rooms});

/**
 * Установка комнат в состояние: установка пользователю isOnline: false
 * @returns {{payload: rooms, type: string}}
 */
export const leaveUser = (rooms) =>
  ({type: LEAVE_USER, payload: rooms});


/**
 * Установка комнат в состояние: добавление сообщения
 * @returns {{payload: rooms, type: string}}
 */
export const addMessage = (rooms) =>
  ({type: ADD_MESSAGE, payload: rooms});

