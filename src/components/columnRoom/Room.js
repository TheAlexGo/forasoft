import {useDispatch, useSelector} from "react-redux";
import {setChatID} from "../../store/actions/chatActions";
import socket from "../../server_socket/socket";
import {A_JOIN_CHAT} from "../../constants/C_Server_Socket";

const Room = ({ chatID, lastMSG } ) => {
  const dispatch = useDispatch();

  const username = useSelector(state => state.chat.username);
  const currentChatID = useSelector(state => state.chat.currentChat);
  const classRoom = chatID === currentChatID ? 'active' : null;
  const changeRoom = async () => {
    const obj = {
      chatID,
      username
    }
    console.log(obj);

    socket.emit(A_JOIN_CHAT, obj);
    // const { data } = await axios.get(`/rooms/${obj.chatID}`)
    // dispatch(setRooms(data.rooms));
    dispatch(setChatID(chatID));
  }
  return(
    <div className={classRoom} onClick={changeRoom}>
      <div className="block-room__room-info-block" >
        <img src="./logo512.png" width="50" height="50" alt="logo"/>
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
  )
}

export default Room
