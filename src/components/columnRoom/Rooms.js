import React from "react";
import '../columnRoom/style.scss'
import Room from "./Room";
import {useSelector} from "react-redux";

const Rooms = () => {
  const rooms = useSelector(state => state.chat.rooms)

  const clientsBlock = rooms.map((room, index) => <Room chatID={room.chatID} lastMSG={room.lastMSG} key={index} />)
  return (
    <div>
      <h6>Комнаты</h6>
      <div className="block-room">
        { clientsBlock }
      </div>
    </div>
  )
}

export default Rooms
