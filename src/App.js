import './App.scss';
import Main from "./components/Main";
import JoinChat from "./components/JoinChat";
import {useSelector} from "react-redux";

function App() {
  const isAuth = useSelector(store => store.chat.isAuth);
  const showChat = isAuth ? <Main /> : <JoinChat />;

  return (
    <div className="App">
      { showChat }
    </div>
  );
}

export default App;
