import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Store from './pages/Store';
import Home from './pages/Home';
import GameView from './pages/GameView';
import ContextProvider from './utils/ContextProvider';
import Cart from './pages/Cart';

function App() {
  return (
    <Router>
      <ContextProvider>
        <NavBar />
        <div className="h-screen relative">
          <div className="absolute overflow-hidden w-full pb-[65px] md:pb-0 md:left-[80px] md:w-[calc(100%-80px)]">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/store/:gameId" element={<GameView />} />
              <Route exact path="/store" element={<Store />} />
              <Route exact path="/cart" element={<Cart />} />
              {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
          </div>
        </div>
      </ContextProvider>
    </Router>
  );
}

export default App;
