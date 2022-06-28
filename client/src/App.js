import './App.css';
import { Route, Routes } from 'react-router-dom';
import Landing from './Components/Landing/Landing';
import Home from './Components/Home/Home';
import Nav from './Components/Nav/Nav';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Sell from './Components/Sell/Sell';
import Convert from './Components/Convert/Convert'
import Delivery from './Components/Delivery/Delivery';
function App() {
  return (
    <div className="App">
      <Nav/>
      <Routes>
        <Route path ="/" element={<Landing></Landing>} />
        <Route path ="/home" element={<Home></Home>} />
        <Route path ="/login" element={<Login></Login>} />
        <Route path ="/register" element={<Register></Register>} />
        <Route path ="/sell" element={<Sell></Sell>} />
        <Route path ="/convert" element={<Convert></Convert>} />
        <Route path ="/delivery" element={<Delivery/>} />
      </Routes>
    </div>
  );
}

export default App;
