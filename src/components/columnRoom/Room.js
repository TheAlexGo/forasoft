import {useDispatch, useSelector} from "react-redux";
import {setChatID} from "../../store/actions/chatActions";

const Room = ({ numChat, lastMSG } ) => {
  const dispatch = useDispatch();

  const currentChat = useSelector(state => state.chat.currentChat);
  const classRoom = numChat === currentChat ? 'active' : null;
  const changeRoom = () => dispatch(setChatID(numChat));
  return(
    <div className={classRoom} onClick={changeRoom}>
      <div className="block-room__room-info-block" >
        <img src="./logo512.png" width="50" height="50" alt="logo"/>
        <div>
          <div className="block-room__room-info-block__room-name">
            #{numChat}
          </div>
          <div className="block-room__room-info-block__room-lastMSG">
            {lastMSG}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Room
