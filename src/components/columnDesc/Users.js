import User from "./User";
import React from "react";
import '../columnChat/style.scss'

const Users = ({ clients } ) => {
  const clientsBlock = clients.map((client, index) =>
    <User
      name={client.name}
      isOnline={client.isOnline}
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
