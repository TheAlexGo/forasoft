import React from "react";
import {BUTTON_VALUE, INPUT_PLACEHOLDER} from "../../constants/C_Chat";
import Messages from "./Messages";

class ColumnChat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isActive: false,
    }
  }



  render() {
    return(
      <div className="chat-block">
        <div className="chat-block__wrapper">
          <h6>Комната: #123</h6>
          <div className="chat-block__wrapper__chat-block">
            <Messages messages={[{
              userName: 'Alex',
              userMsg: 'Первое сообщение',
              userClass: 'me',
            },
              {
                userName: 'Pavel',
                userMsg: 'Второе сообщение',
                userClass: null,
              }]}/>
          </div>
          <div className="chat-block__wrapper__input-block">
            <input type="text" placeholder={ INPUT_PLACEHOLDER } />
            <button type="submit">
              <span>{ BUTTON_VALUE }</span>
              <img width="15" height="15" src="./send-arrow.svg" alt="Send"/>
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default ColumnChat
