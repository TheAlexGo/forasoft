import {
  ADD_MESSAGE,
  JOIN_USER,
  LEAVE_USER,
  SET_CURRENT_CHAT,
  SET_ROOMS,
  SET_USERNAME,
  UNAUTHENTICATED,
  AUTHENTICATED
} from "../constActions";

// объявление дефолтного состояния
const defaultState = {
  username: '',
  currentChat: null,
  isAuth: false,
  rooms: [],
};

// объявление reducer для чата
const chatReducer = (state = defaultState, action) => {
  let new_rooms = []
  switch (action.type) {
    // событие аутентификации
    case AUTHENTICATED:
      return {
        ...state,
        isAuth: action.payload.isAuth
      };
    // событие выхода
    case UNAUTHENTICATED:
      return {
        ...state,
        isAuth: action.payload.isAuth
      }
    // событие установки username
    case SET_USERNAME:
      return {
        ...state,
        username: action.payload,
      }
    // событие установки действительного номера чата
    case SET_CURRENT_CHAT:
      return {
        ...state,
        currentChat: action.payload
      }
    // событие установки комнат
    case SET_ROOMS:
      return {
        ...state,
        rooms: [...action.payload]
      }
    // событие входа в чат
    case JOIN_USER:
      new_rooms = getCorrectRooms(action)
      console.log('Пользователь присоединился')
      return {
        ...state,
        rooms: new_rooms
      }
    // событие выхода из чата
    case LEAVE_USER:
      new_rooms = getCorrectRooms(action)
      console.log('Пользователь вышел')
      return {
        ...state,
        rooms: new_rooms
      }
    // событие добавления нового сообщения
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
  // функция объединения комнат и удаление дубликатов
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
