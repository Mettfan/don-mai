import './App.css';
import { Route, Routes } from 'react-router-dom';
import Landing from './Components/Landing/Landing';
import Home from './Components/Home/Home';
import Nav from './Components/Nav/Nav';

function App() {
  return (
    <div className="App">
      <Nav/>
      <Routes>
        <Route path ="/" element={<Landing></Landing>} />
        <Route path ="/home" element={<Home></Home>} />
      </Routes>
    </div>
  );
}

export default App;
