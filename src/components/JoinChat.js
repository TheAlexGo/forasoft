import {ID_CHAT, JOIN_BUTTON, NAME_USER} from "../constants/C_Join";

const JoinChat = () => {
  return(
    <div className="join-block">
      <input className="join-block__name" type="text" placeholder={NAME_USER} />
      <input className="join-block__chat" type="text" placeholder={ID_CHAT} />
      <button className="join-block__button">
        {JOIN_BUTTON}
      </button>
    </div>
  )
}

export default JoinChat
