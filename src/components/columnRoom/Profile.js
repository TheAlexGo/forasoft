import {useSelector} from "react-redux";

const Profile = () => {
  const username = useSelector(state => state.chat.username)
  return(
    <div className="App__body-block__content__left__profile-block">
      <img src="./logo512.png" width="80" height="80" alt="logo"/>
      <h5>{ username }</h5>
    </div>
  )
}

export default Profile
