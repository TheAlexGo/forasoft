import {BUTTON_VALUE, INPUT_PLACEHOLDER} from "../../constants/C_Chat";
import socket from "../../server_socket/socket";
import {A_SEND_MESSAGE} from "../../constants/C_Server_Socket";
import React from "react";
import {useSelector} from "react-redux";
import {arrow} from "../../assets/assets";

const SendMessageForm = () => {
  // компонент формы отправки сообщения

  const [message, setMessage] = React.useState('');
  const chatID = useSelector(state => state.chat.currentChat);
  const rooms = useSelector(state => state.chat.rooms);
  const messages = rooms.find(room => room.chatID === chatID)
    ? rooms.find(room => room.chatID === chatID).messages
    : [];
  const username = useSelector(state => state.chat.username);

  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  const time = `${String(today.getHours()).padStart(2, '0')}:${String(today.getMinutes()).padStart(2, '0')}`;

  const sendMessage = () => {
    // функция отправки сообщения

    if(message !== '') {
      // добавление нового сообщения
      messages.push(
        {
          user_name: username,
          user_message: message,
          message_time: `${dd}.${mm}.${yyyy}, ${time}`
        }
      )

      const obj = {
        chatID,
        messages
      }

      setMessage('');

      socket.emit(A_SEND_MESSAGE, obj);
    }
  }

  const handleSubmit = (e) => {
    // отключение ивента submit
    e.preventDefault()
  }

  const onKeyDown = () => {
    // при нажатии клавиши - фокус на input
    document.querySelector('.chat-block__wrapper__input-block input').focus();
  }

  React.useEffect(() => {
    // включение и отключение ивента
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [])

  return(
    <form className="chat-block__wrapper__input-block" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder={ INPUT_PLACEHOLDER }
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button type="submit" onClick={sendMessage}>
        <span>{ BUTTON_VALUE }</span>
        <img width="15" height="15" src={arrow} alt="Send"/>
      </button>
    </form>
  )
}

export default SendMessageForm
