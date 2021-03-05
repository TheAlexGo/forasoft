import React from "react";
import '../columnRoom/style.scss'
import Message from "./Message";
import {useSelector} from "react-redux";

const Messages = () => {
  const currentChat = useSelector(state => state.chat.currentChat);
  console.log(currentChat)
  const messages = useSelector(state => state.chat.rooms.find(room => room.numChat === currentChat).messages)
  return messages.map((message, index) =>
  {
    const userClass = message.user_id === 'MASASKDSAD' ? 'me' : null;
    return <Message
      userName={message.user_name}
      userMsg={message.user_message}
      userClass={userClass}
      key={index}
    />
  })
}

export default Messages
