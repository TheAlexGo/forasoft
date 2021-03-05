import './App.scss';
import Main from "./components/Main";
import JoinChat from "./components/JoinChat";

function App() {

  const showChat = 0 ? <Main /> : <JoinChat />;

  return (
    <div className="App">
      { showChat }
    </div>
  );
}

export default App;
