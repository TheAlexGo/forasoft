import {SET_CURRENT_CHAT, SET_USERNAME, UNAUTHENTICATED} from "../constActions";

const {AUTHENTICATED} = require("../constActions");

const defaultState = {
  username: '',
  currentChat: null,
  isAuth: false,
  rooms: [
    {
      numChat: 123,
      messages: [
        {
          user_id: 'MASASKDSAD',
          user_name: 'Alex',
          user_message: 'Первое сообщение'
        },
        {
          user_id: 'MASNDJSAD',
          user_name: 'Pavel',
          user_message: 'Второе сообщение'
        },
        {
          user_id: 'MASNDJSAD',
          user_name: 'Pavel',
          user_message: 'Второе сообщение'
        },
        {
          user_id: 'MASNDJSAD',
          user_name: 'Pavel',
          user_message: 'Второе сообщение'
        },
        {
          user_id: 'MASNDJSAD',
          user_name: 'Pavel',
          user_message: 'Второе сообщение'
        },
        {
          user_id: 'MASNDJSAD',
          user_name: 'Pavel',
          user_message: 'Второе сообщение'
        },
        {
          user_id: 'MASNDJSAD',
          user_name: 'Pavel',
          user_message: 'Второе сообщение'
        },
        {
          user_id: 'MASNDJSAD',
          user_name: 'Pavel',
          user_message: 'Второе сообщение'
        }
      ],
      lastMSG: 'Второе сообщение'
    },
    {
      numChat: 124,
      messages: [
        {
          user_id: 'MASASKDSAD',
          user_name: 'Alex',
          user_message: 'Третье сообщение'
        },
        {
          user_id: 'MASNDJSAD',
          user_name: 'Pavel',
          user_message: 'Четвёртое сообщение'
        },
        {
          user_id: 'MASNDJSAD',
          user_name: 'Pavel',
          user_message: 'Четвёртое сообщение'
        },
        {
          user_id: 'MASASKDSAD',
          user_name: 'Alex',
          user_message: 'Третье сообщение'
        },
        {
          user_id: 'MASASKDSAD',
          user_name: 'Alex',
          user_message: 'Третье сообщение'
        },
        {
          user_id: 'MASNDJSAD',
          user_name: 'Pavel',
          user_message: 'Четвёртое сообщение'
        },

      ],
      lastMSG: 'Третье сообщение'
    }
  ],
  users: [],
};

const chatReducer = (state = defaultState, action) => {
  switch (action.type) {
    case AUTHENTICATED:
      return {
        ...state,
        isAuth: action.payload.isAuth
      };
    case UNAUTHENTICATED:
      return {
        ...state,
        isAuth: action.payload.isAuth
      }
    case SET_USERNAME:
      return {
        ...state,
        username: action.payload.username,
      }
    case SET_CURRENT_CHAT:
      return {
        ...state,
        currentChat: action.payload
      }
    default:
      return state;
  }
}

export default chatReducer;
