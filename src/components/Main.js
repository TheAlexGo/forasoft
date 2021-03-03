import React from "react";
import ColumnRoom from "./columnRoom/ColumnRoom";
import ColumnChat from "./columnChat/ColumnChat";
import ColumnDesc from "./columnDesc/ColumnDesc";

class Main extends React.Component{
  render() {
    return(
      <div className="App__body-block">
        <div className="App__body-block__content">
          <div className="App__body-block__content__left">
            <ColumnRoom />
          </div>
          <div className="App__body-block__content__center">
            <ColumnChat />
          </div>
          <div className="App__body-block__content__right">
            <ColumnDesc />
          </div>
        </div>
      </div>
    )
  }
}

export default Main
