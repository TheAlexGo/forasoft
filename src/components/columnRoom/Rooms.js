import React from "react";
import '../columnRoom/style.scss'
import Room from "./Room";

const Rooms = ({ rooms } ) => {
  const clientsBlock = rooms.map(room => <Room name={room.name} lastMSG={room.lastMSG}/>)
  return (
    <div>
      <h6>Пользователи</h6>
      <div className="block-room">
        { clientsBlock }
      </div>
    </div>
  )
}

export default Rooms
