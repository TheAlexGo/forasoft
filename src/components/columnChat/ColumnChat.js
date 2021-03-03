import React from "react";
import Users from "./Users";

class ColumnChat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isActive: false,
    }
  }

  infoChat() {
    return(
      this.state.isActive ? <Users clients={[
        {name: 'Alex', isOnline: true},
        {name: 'Alex', isOnline: true},
        {name: 'Alex', isOnline: true},
        {name: 'Alex', isOnline: true},
        {name: 'Alex', isOnline: true},
        {name: 'Alex', isOnline: true},
        {name: 'Alex', isOnline: true},
        {name: 'Alex', isOnline: true},
      ]} /> : null
    )
  }

  handleClick() {
    this.setState({
      isActive: !this.state.isActive
    })
  }

  render() {
    return(
      <div className="chat-block">
        <h6 onClick={() => this.handleClick()}>Комната: #123</h6>
        {this.infoChat()}
        <input type="text"/>
      </div>
    )
  }
}

export default ColumnChat
