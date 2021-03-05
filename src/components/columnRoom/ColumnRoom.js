import React from "react";
import {HEADING_MAIN_h1} from "../../constants/C_Main";
import Profile from "./Profile";
import Rooms from "./Rooms";

const ColumnRoom = () => {

  return(
    <div>
      <h3>{HEADING_MAIN_h1}</h3>
      <Profile />
      <Rooms />
    </div>
  )
}

export default ColumnRoom
