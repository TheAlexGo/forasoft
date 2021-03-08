import React from "react";
import Messages from "./Messages";
import SendMessageForm from "./SendMessageForm";
import {useSelector} from "react-redux";
import {useMemo} from "react";

const ColumnChat = () => {
  // Компонент колонки чата: средняя колонка

  const currentChatID = useSelector(state => state.chat.currentChat);
  const rooms = useSelector(state => state.chat.rooms);
  const messages = useMemo(() =>
    rooms.find(room => room.chatID === currentChatID)
    ? rooms.find(room => room.chatID === currentChatID).messages
    : [], [currentChatID, rooms]);

  React.useEffect(() => {
    // при получении сообщения - опускать чат к последнему сообщению
    document.querySelector('.chat-block__wrapper__chat-block').scrollTop =
      document.querySelector('.chat-block__wrapper__chat-block').scrollHeight
  }, [messages])

  return(
    <div className="chat-block">
      <div className="chat-block__wrapper">
        <h6>Комната: #{currentChatID}</h6>
        <div className="chat-block__wrapper__chat-block">
          <Messages />
        </div>
        <SendMessageForm />
      </div>
    </div>
  )
}

export default ColumnChat
