import { useState } from 'react';
import './App.css';
import Routes from './routes';
import GlobalStyle from "./styles/global"

function App() {
  const [user, setUser] = useState([])
  const [techs, setTechs] = useState([])

  return (
    <div className="App">
      <header className="App-header">
        <GlobalStyle />

        <Routes setUser={setUser} 
                user={user}
                techs={techs}
                setTechs={setTechs} 
        />
      </header>
    </div>
  );
}

export default App;
