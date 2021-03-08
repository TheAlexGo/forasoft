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
  rooms: [],
};

const chatReducer = (state = defaultState, action) => {
  let new_rooms = []
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
      new_rooms = getCorrectRooms(action)
      console.log('Пользователь присоединился')
      return {
        ...state,
        rooms: new_rooms
      }
    case LEAVE_USER:
      new_rooms = getCorrectRooms(action)
      console.log('Пользователь вышел')
      return {
        ...state,
        rooms: new_rooms
      }
    case ADD_MESSAGE:
      new_rooms = getCorrectRooms(action)
      console.log('Новое сообщение')
      return {
        ...state,
        rooms: new_rooms
      }
    default:
      return state;
  }
}

export default chatReducer;

function getCorrectRooms(action) {
  let new_rooms;
  if(localStorage.rooms) {
    const roomsLS = [{...action.payload}, ...JSON.parse(localStorage.rooms)]
    new_rooms = roomsLS.filter((room1, index, self) => {
      return index === self.findIndex((room2) => (
        room2.chatID === room1.chatID
      ))
    })
  } else {
    new_rooms = [{...action.payload}]
  }

  localStorage.rooms = JSON.stringify(new_rooms);
  return new_rooms
}
