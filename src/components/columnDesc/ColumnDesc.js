import React from "react";
import Users from "./Users";
import LinkBlock from "./LinkBlock";

class ColumnChat extends React.Component {
  render() {
    return(
      <div className="desc-block">
        <Users />
        <LinkBlock />
      </div>
    )
  }
}

export default ColumnChat
