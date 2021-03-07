import {logo} from "../../assets/assets";

const User = ({ name, isOnline } ) => {
  return(
    <div className="block-client__client-info-block">
      <img src={logo} width="50" height="50" alt="logo"/>
      <div>
        <div className="block-client__client-info-block__client-name">
          {name}
        </div>
        <div className="block-client__client-info-block__client-status">
          {isOnline ? 'Онлайн' : 'Не онлайн'}
        </div>
      </div>
    </div>
  )
}

export default User
