const Room = ({ name, lastMSG } ) => {
  return(
    <div className="block-room__room-info-block" >
      <img src="./logo512.png" width="50" height="50" alt="logo"/>
      <div>
        <div className="block-room__room-info-block__room-name">
          {name}
        </div>
        <div className="block-room__room-info-block__room-lastMSG">
          {lastMSG}
        </div>
      </div>
    </div>
  )
}

export default Room
