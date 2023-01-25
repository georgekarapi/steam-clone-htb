import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Store from './pages/Store';
import Home from './pages/Home';
import GameView from './pages/GameView';

function App() {
  return (
    <Router>
      <NavBar />
      <div className="relative">
        <div className="absolute left-[80px] overflow-hidden md:w-[calc(100%-80px)]">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/store/:gameId" element={<GameView />} />
            <Route exact path="/store" element={<Store />} />
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
