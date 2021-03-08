import User from "./User";
import React from "react";
import '../columnChat/style.scss'
import {useSelector} from "react-redux";

const Users = () => {
  const rooms = useSelector(state => state.chat.rooms); //
  const currentChatID = useSelector(state => state.chat.currentChat);
  const users = rooms.find(room => room.chatID === currentChatID) ?
    rooms.find(room => room.chatID === currentChatID).users : [];

  const clientsBlock = users.map((user, index) =>
    <User
      name={user.name}
      isOnline={user.isOnline}
      key={index} />)
  return (
    <div>
      <h6>Пользователи</h6>
      <div className="block-client">
        { clientsBlock }
      </div>
    </div>
  )
}

export default Users
