import './App.scss';
import Main from "./components/Main";
import JoinChat from "./components/JoinChat";
import {useDispatch, useSelector} from "react-redux";
import {BrowserRouter, Route, Redirect} from "react-router-dom";
import socket from "./server_socket/socket";
import {
  A_ABANDONED_CHAT, A_JOIN_CHAT,
  A_JOINED_CHAT, A_JOINED_CHAT_LINK, A_JOINED_CHAT_LINK_ABORT, A_JOINED_CHAT_LINK_SUCCESS, A_SET_MESSAGES,
} from "./constants/C_Server_Socket";
import {addMessage, auth, joinUser, leaveUser, setChatID, setUsername} from "./store/actions/chatActions";
import React from "react";
import {store} from "./store/store";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.chat.isAuth);
  const currentChatID = useSelector(state => state.chat.currentChat);
  let url = `/rooms/${currentChatID}`;
  const urlReq = window.location.pathname;
  const join = window.location.search.replace('?').split('=')[1];
  if(urlReq.split('/')[1] === 'rooms') {
    const chatID = urlReq.split('/')[2];

    if(join === 'yes') {
      socket.emit(A_JOINED_CHAT_LINK, {chatID: chatID});
    }
  }

  React.useEffect(() => {
    const username = localStorage.username;
    const chatID = Number(localStorage.currentChat);
    socket.on(A_JOINED_CHAT_LINK_SUCCESS, (chatID) => {
      const obj = {
        chatID,
        username
      }
      socket.emit(A_JOIN_CHAT, obj);
      dispatch(setChatID(Number(chatID)));
    })

    socket.on(A_JOINED_CHAT_LINK_ABORT, () => {
      const obj = {
        chatID,
        username
      }
      socket.emit(A_JOIN_CHAT, obj);
      dispatch(setChatID(Number(chatID)));
    })

    socket.on(A_ABANDONED_CHAT, rooms => {
      dispatch(leaveUser(rooms));
    })

    socket.on(A_JOINED_CHAT, rooms => {
      dispatch(joinUser(rooms));
      localStorage.username = store.getState().chat.username;
      localStorage.currentChat = store.getState().chat.currentChat;
    })

    socket.on(A_SET_MESSAGES, rooms => {
      dispatch(addMessage(rooms));
    })

    socket.on('LOGIN', (rooms) => {

      console.log('Вход');

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
