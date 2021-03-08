import {BUTTON_VALUE_LINK, LINK_BODY, LINK_HEADING} from "../../constants/C_Chat";
import {link} from "../../assets/assets";
import React from "react";
import './style.scss'
import {useSelector} from "react-redux";

const LinkBlock = () => {
  const chatID = useSelector(state => state.chat.currentChat);
  const copyLink = () => {
    navigator.clipboard.writeText(document.querySelector('#out').value).then();
  }

  const url = `${window.location.protocol}//${window.location.host}/rooms/${chatID}?join=yes`;

  return(
    <div className="block-link">
      <h5>{ LINK_HEADING }</h5>
      <div className="block-link__body">{ LINK_BODY }</div>
      <input className="block-link__body__input-link" id="out" type="text" defaultValue={url}/>

      <button onClick={copyLink}>
        <span>{ BUTTON_VALUE_LINK }</span>
        <img width="20" height="20" src={link} alt={BUTTON_VALUE_LINK}/>
      </button>
    </div>
  )
}

export default LinkBlock;
