import {
  ADD_MESSAGE,
  JOIN_USER,
  LEAVE_USER,
  SET_CURRENT_CHAT,
  SET_ROOMS,
  SET_USERNAME,
  UNAUTHENTICATED
} from "../constActions";

const {AUTHENTICATED} = require("../constActions");

// example: rooms: [
//   {
//     chatID: 123,
//     messages: [
//       {
//         user_id: 'MASASKDSAD',
//         user_name: 'Alex',
//         user_message: 'Первое сообщение'
//       },
//       {
//         user_id: 'MASNDJSAD',
//         user_name: 'Pavel',
//         user_message: 'Второе сообщение'
//       },
//       {
//         user_id: 'MASNDJSAD',
//         user_name: 'Pavel',
//         user_message: 'Второе сообщение'
//       },
//       {
//         user_id: 'MASNDJSAD',
//         user_name: 'Pavel',
//         user_message: 'Второе сообщение'
//       },
//       {
//         user_id: 'MASNDJSAD',
//         user_name: 'Pavel',
//         user_message: 'Второе сообщение'
//       },
//       {
//         user_id: 'MASNDJSAD',
//         user_name: 'Pavel',
//         user_message: 'Второе сообщение'
//       },
//       {
//         user_id: 'MASNDJSAD',
//         user_name: 'Pavel',
//         user_message: 'Второе сообщение'
//       },
//       {
//         user_id: 'MASNDJSAD',
//         user_name: 'Pavel',
//         user_message: 'Второе сообщение'
//       }
//     ],
//     lastMSG: 'Второе сообщение'
//   },
//   {
//     chatID: 124,
//     messages: [
//       {
//         user_id: 'MASASKDSAD',
//         user_name: 'Alex',
//         user_message: 'Третье сообщение'
//       },
//       {
//         user_id: 'MASNDJSAD',
//         user_name: 'Pavel',
//         user_message: 'Четвёртое сообщение'
//       },
//       {
//         user_id: 'MASNDJSAD',
//         user_name: 'Pavel',
//         user_message: 'Четвёртое сообщение'
//       },
//       {
//         user_id: 'MASASKDSAD',
//         user_name: 'Alex',
//         user_message: 'Третье сообщение'
//       },
//       {
//         user_id: 'MASASKDSAD',
//         user_name: 'Alex',
//         user_message: 'Третье сообщение'
//       },
//       {
//         user_id: 'MASNDJSAD',
//         user_name: 'Pavel',
//         user_message: 'Четвёртое сообщение'
//       },
//
//     ],
//     lastMSG: 'Третье сообщение'
//   }
// ],
//   users: [
//   {
//     name: 'Alex',
//     isOnline: true,
//   },
//   {
//     name: 'Pavel',
//     isOnline: true,
//   }
// ],

const defaultState = {
  username: '',
  currentChat: null,
  isAuth: false,
  rooms: [
    {
    chatID: 123,
    users: [
      {
        name: '',
        isOnline: null,
      }
    ],
    messages: [
      {
        user_id: 'MASASKDSAD',
        user_name: 'Alex',
        user_message: 'Первое сообщение'
      }
    ],
    lastMSG: 'Второе сообщение'
  },
  ],
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
        username: action.payload,
      }
    case SET_CURRENT_CHAT:
      return {
        ...state,
        currentChat: action.payload
      }
    case SET_ROOMS:
      return {
        ...state,
        rooms: [...action.payload]
      }
    case JOIN_USER:
      return {
        ...state,
        rooms: [...action.payload]
      }
    case LEAVE_USER:
      return {
        ...state,
        rooms: [...action.payload]
      }
    case ADD_MESSAGE:
      return {
        ...state,
        rooms: [...action.payload]
      }
    default:
      return state;
  }
}

export default chatReducer;
