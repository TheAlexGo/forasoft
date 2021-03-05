import React from "react";
import Users from "./Users";

class ColumnChat extends React.Component {
  render() {
    return(
      <div className="">
        <Users clients={[
          {name: 'Alex', isOnline: true},
          {name: 'Pavel', isOnline: false},
        ]} />
      </div>
    )
  }
}

export default ColumnChat
