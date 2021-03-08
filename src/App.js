import './App.scss';
import Main from "./components/Main";
import JoinChat from "./components/JoinChat";
import {useDispatch, useSelector} from "react-redux";
import {BrowserRouter, Route, Redirect} from "react-router-dom";
import socket from "./server_socket/socket";
import {
  A_ABANDONED_CHAT, A_JOIN_CHAT,
  A_JOINED_CHAT, A_JOINED_CHAT_LINK, A_JOINED_CHAT_LINK_ABORT, A_JOINED_CHAT_LINK_SUCCESS, A_LOGIN, A_SET_MESSAGES,
} from "./constants/C_Server_Socket";
import {addMessage, auth, joinUser, leaveUser, setChatID, setUsername} from "./store/actions/chatActions";
import React from "react";
import {store} from "./store/store";

function App() {
  // Компонент основного приложения

  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.chat.isAuth);
  const currentChatID = useSelector(state => state.chat.currentChat);
  const urlReq = window.location.pathname; // Получение url без host
  const join = window.location.search.replace('?').split('=')[1]; /* получение значения join для подключения к чату по
  ссылке */

  let url = `/rooms/${currentChatID}`; // формирование url для редиректа после логина
  if(urlReq.split('/')[1] === 'rooms') {
    const chatID = urlReq.split('/')[2]; // получение id чата, к которому надо подключиться
    if(join === 'yes') {
      socket.emit(A_JOINED_CHAT_LINK, {chatID: chatID}); // отправка запроса на подключение
    }
  }

  // Обработка событий с сервера
  React.useEffect(() => {
    const username = localStorage.username;
    const chatID = Number(localStorage.currentChat);

    // событие подключения к чату по ссылке: успешно
    socket.on(A_JOINED_CHAT_LINK_SUCCESS, (chatID) => {
      // подключение к чату, id которого пришло от сервера
      const obj = {
        chatID,
        username
      }
      socket.emit(A_JOIN_CHAT, obj);
      dispatch(setChatID(Number(chatID)));
    })

    // событие подключения к чату по ссылке: отклонено
    socket.on(A_JOINED_CHAT_LINK_ABORT, () => {
      // подключение к дефолтному чату
      const obj = {
        chatID,
        username
      }
      socket.emit(A_JOIN_CHAT, obj);
      dispatch(setChatID(Number(chatID)));
    })

    // событие выхода из чата
    socket.on(A_ABANDONED_CHAT, rooms => {
      dispatch(leaveUser(rooms));
    })

    // событие подключения к чату
    socket.on(A_JOINED_CHAT, rooms => {
      dispatch(joinUser(rooms));
      localStorage.username = store.getState().chat.username;
      localStorage.currentChat = store.getState().chat.currentChat;
    })

    // событие отправки сообщения
    socket.on(A_SET_MESSAGES, rooms => {
      dispatch(addMessage(rooms));
    })

    // событие входа в приложение
    socket.on(A_LOGIN, (rooms) => {

      console.log('Вход');

      // Вход в комнату, если данные уже сохранены
      if(rooms.find(room => room.chatID === chatID)) {
        if(username && chatID) {
          console.log('Ты уже есть!');
          dispatch(setUsername(username));
          dispatch(setChatID(chatID));

          const obj = {
            chatID,
            username
          }
          if(join !== 'yes') {
            socket.emit(A_JOIN_CHAT, obj);
          }

          dispatch(auth());
        }
      }
    })
  }, [dispatch])

  return (
    <BrowserRouter>
      <div className="App">
        <Route
          path="/login"
          render={() => !isAuth ?
            <JoinChat /> : <Redirect to={url} />}
        />
        <Redirect from='/' to='/login'  />
        <Route path="/rooms/:id" component={Main} />
      </div>
    </BrowserRouter>

  );
}

export default App;
