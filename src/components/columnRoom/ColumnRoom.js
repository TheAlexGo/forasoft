import React from "react";
import {HEADING_MAIN_h1} from "../../constants/C_Main";
import Profile from "./Profile";
import Rooms from "./Rooms";

class ColumnRoom extends React.Component {
  render() {
    return(
      <div className="">
        <h3>{HEADING_MAIN_h1}</h3>
        <Profile />
        <Rooms rooms={[
          {name: 'Alex', lastMSG: 'Последнее сообщение'},
        ]} />
      </div>
    )
  }
}

export default ColumnRoom
