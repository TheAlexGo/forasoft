import {BUTTON_VALUE, INPUT_PLACEHOLDER} from "../../constants/C_Chat";
import socket from "../../server_socket/socket";
import {A_SEND_MESSAGE, A_SET_MESSAGES} from "../../constants/C_Server_Socket";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {addMessage} from "../../store/actions/chatActions";
import {arrow} from "../../assets/assets";

const SendMessageForm = () => {
  const [message, setMessage] = React.useState('');
  const chatID = useSelector(state => state.chat.currentChat);
  const rooms = useSelector(state => state.chat.rooms);
  const messages = rooms.find(room => room.chatID === chatID)
    ? rooms.find(room => room.chatID === chatID).messages
    : [];
  const username = useSelector(state => state.chat.username);

  const dispatch = useDispatch();

  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  const time = `${String(today.getHours()).padStart(2, '0')}:${String(today.getMinutes()).padStart(2, '0')}`;

  const sendMessage = () => {
    if(message !== '') {
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

      socket.emit(A_SEND_MESSAGE, obj);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const onKeyDown = () => {
    document.querySelector('.chat-block__wrapper__input-block input').focus();
  }

  React.useEffect(() => {
    document.addEventListener('keydown', onKeyDown);

    socket.on(A_SET_MESSAGES, rooms => {
      setMessage('');
      dispatch(addMessage(rooms));
    })

    return () => document.removeEventListener('keydown', onKeyDown);
  }, [dispatch])

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
