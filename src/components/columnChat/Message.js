const Message = ({ userName, userMsg, userClass }) => {
  // const userClass = 'me';

  return(
    <div className={userClass}>
      <div className="message-block">
        <img src="./logo512.png" alt="logo" width="40" height="40" />
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
            22:23, 04.03.2021
          </div>
        </div>
      </div>
    </div>
  )
}

export default Message
