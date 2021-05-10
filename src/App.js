// import logo from './logo.svg';
import './style.css';
import GameLogic from './GameLogic'

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <h2 className='title'> MasterMind </h2>
        <GameLogic />
      </header>
    </div>
  );
}

export default App;
