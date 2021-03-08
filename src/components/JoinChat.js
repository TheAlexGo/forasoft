import {ID_CHAT, JOIN_BUTTON, JOIN_BUTTON_LOADING, NAME_USER} from "../constants/C_Join";
import {useDispatch} from "react-redux";
import React from "react";
import axios from "axios";
import {auth, setChatID, setUsername} from "../store/actions/chatActions";
import socket from '../server_socket/socket'
import {A_JOIN_CHAT} from "../constants/C_Server_Socket";

const JoinChat = () => {
  // Компонент входа в приложение

  const [username, setName] = React.useState('');
  const [chatID, setID] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);
  const dispatch = useDispatch();

  const onJoin = async () => {
    // функция входа в приложение
    if(!username || !chatID) return alert('Заполните все поля');

    setLoading(true);

    // формирование объекта
    const obj = {
      username,
      chatID
    }
    // отправка запроса на формирование комнаты
    await axios.post('/rooms',obj).then();
    dispatch(setUsername(username))
    dispatch(setChatID(Number(chatID)))
    socket.emit(A_JOIN_CHAT, obj);
    dispatch(auth());
  }

  const handleSubmit = (e) => {
    // отключение ивента submit
    e.preventDefault()
  }

  return(
    <form className="join-block" onSubmit={handleSubmit}>
      <input
        className="join-block__name"
        type="text"
        placeholder={NAME_USER}
        value={username}
        onChange={e => setName(e.target.value)}
      />
      <input
        className="join-block__chat"
        type="text"
        placeholder={ID_CHAT}
        value={chatID}
        onChange={e => setID(e.target.value)}
      />
      <button
        disabled={isLoading}
        onClick={onJoin}
        className="join-block__button"
        type="submit"
      >
        {!isLoading ? JOIN_BUTTON : JOIN_BUTTON_LOADING}
      </button>
    </form>
  )
}

export default JoinChat
