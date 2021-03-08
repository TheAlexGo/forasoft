import {useSelector} from "react-redux";
import {logo} from "../../assets/assets";

const Profile = () => {
  // компонент блока с профилем пользователя

  const username = useSelector(state => state.chat.username)
  return(
    <div className="App__body-block__content__left__profile-block">
      <img src={logo} width="80" height="80" alt="logo"/>
      <h5>{ username }</h5>
    </div>
  )
}

export default Profile
