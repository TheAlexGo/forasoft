import React from "react";
import '../columnRoom/style.scss'
import Room from "./Room";

const Rooms = ({ rooms } ) => {
  const clientsBlock = rooms.map((room, index) => <Room name={room.name} lastMSG={room.lastMSG} key={index} />)
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
