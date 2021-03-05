import React from "react";
import '../columnRoom/style.scss'
import Message from "./Message";

const Messages = ({ messages } ) => {
  return messages.map((message, index) =>
    <Message
      userName={message.userName}
      userMsg={message.userMsg}
      userClass={message.userClass}
      key={index}
    />)
}

export default Messages
