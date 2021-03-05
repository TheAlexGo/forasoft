import {ID_CHAT, JOIN_BUTTON, NAME_USER} from "../constants/C_Join";
import {useDispatch} from "react-redux";
import React from "react";
import axios from "axios";
import {auth, setChatID, setUsername} from "../store/actions/chatActions";

const JoinChat = () => {
  const [username, setName] = React.useState('');
  const [chatID, setID] = React.useState('');
  const dispatch = useDispatch();

  const onJoin = () => {
    if(!username || !chatID) return alert('Заполните все поля');
    axios.post('/rooms',{
      username,
      chatID
    }).then(() => {
      dispatch(setUsername(username))
      dispatch(setChatID(Number(chatID)))
      dispatch(auth())
    });

  }

  return(
    <div className="join-block">
      <input
        className="join-block__name"
        type="text"
        placeholder={NAME_USER}
        value={username}
        onChange={e => setName(e.target.value)}
      />
      <input
        className="join-block__chat"
        type="text"
        placeholder={ID_CHAT}
        value={chatID}
        onChange={e => setID(e.target.value)}
      />
      <button onClick={onJoin} className="join-block__button">
        {JOIN_BUTTON}
      </button>
    </div>
  )
}

export default JoinChat
