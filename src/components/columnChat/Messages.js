import React from "react";
import '../columnRoom/style.scss'
import Message from "./Message";
import {useSelector} from "react-redux";

const Messages = () => {
  const username = useSelector(state => state.chat.username);
  const currentChat = useSelector(state => state.chat.currentChat);
  const rooms = useSelector(state => state.chat.rooms);
  const messages = rooms.find(room => room.chatID === currentChat)
    ? rooms.find(room => room.chatID === currentChat).messages
    : [];


  return messages.map((message, index) =>
  {
    const userClass = message.user_name === username ? 'me' : null;
    return <Message
      userName={message.user_name}
      userMsg={message.user_message}
      messageTime={message.message_time}
      userClass={userClass}
      key={index}
    />
  })
}

export default Messages
