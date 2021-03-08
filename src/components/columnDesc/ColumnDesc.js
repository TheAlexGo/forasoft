import React from "react";
import Users from "./Users";
import LinkBlock from "./LinkBlock";

const ColumnDesc = () => {
  // компонент колонки с чатом
  return(
    <div className="desc-block">
      <Users />
      <LinkBlock />
    </div>
  )

}

export default ColumnDesc
