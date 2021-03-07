import './App.scss';
import Main from "./components/Main";
import JoinChat from "./components/JoinChat";
import {useSelector} from "react-redux";
import {BrowserRouter, Route, Redirect} from "react-router-dom";

function App() {
  const isAuth = useSelector(state => state.chat.isAuth);
  const currentChatID = useSelector(state => state.chat.currentChat);
  const url = `/rooms/${currentChatID}`;

  return (
    <BrowserRouter>
      <div className="App">
        <Route
          path="/login"
          render={() => !isAuth ?
            <JoinChat /> : <Redirect to={url} />}
        />
        <Redirect from='/' to='/login'/>
        <Route path="/rooms/:id" component={Main} />

      </div>
    </BrowserRouter>

  );
}

export default App;
