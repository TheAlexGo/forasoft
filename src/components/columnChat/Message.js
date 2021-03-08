import {logo} from "../../assets/assets";

const Message = ({ userName, userMsg, userClass, messageTime }) => {
  // компонент сообщения

  return(
    <div className={userClass}>
      <div className="message-block">
        <img src={logo} alt="logo" width="40" height="40" />
        <div className="message-block__user-info">
          <div className="message-block__user-info__username">
            { userName }
          </div>
          <div className="message-block__user-info__message">
            <div>
              { userMsg }
            </div>
          </div>
          <div className="message-block__user-info__time">
            { messageTime }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Message
