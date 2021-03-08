import {useDispatch, useSelector} from "react-redux";
import {setChatID} from "../../store/actions/chatActions";
import {logo} from "../../assets/assets";
import {Link} from "react-router-dom";
import socket from "../../server_socket/socket";
import {A_JOIN_CHAT} from "../../constants/C_Server_Socket";

const Room = ({ chatID, lastMSG } ) => {
  const dispatch = useDispatch();

  const username = useSelector(state => state.chat.username);
  const currentChatID = useSelector(state => state.chat.currentChat);
  const classRoom = chatID === currentChatID ? 'active' : null;

  const url = `/rooms/${chatID}`;

  const changeRoom = () => {
    const obj = {
      chatID,
      username
    }

    socket.emit(A_JOIN_CHAT, obj);
    dispatch(setChatID(chatID));
  }
  return(
    <Link onClick={changeRoom} to={url}>
      <div className={classRoom} >
        <div className="block-room__room-info-block" >
          <img src={logo} width="50" height="50" alt="logo"/>
          <div>
            <div className="block-room__room-info-block__room-name">
              #{chatID}
            </div>
            <div className="block-room__room-info-block__room-lastMSG">
              {lastMSG}
            </div>
          </div>
        </div>
      </div>
    </Link>

  )
}

export default Room
