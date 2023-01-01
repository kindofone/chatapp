import { BrowserRouter, Routes, Route } from 'react-router-dom';
import socketIO from 'socket.io-client';
import Chat from './Chat';
import Home from './Home';

const socket = socketIO.connect();

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home socket={socket} />} />
        <Route path='/chat' element={<Chat socket={socket} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
