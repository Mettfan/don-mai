import './App.css';
import { Route, Routes } from 'react-router-dom';
import Landing from './Components/Landing/Landing';
import Home from './Components/Home/Home';
import Nav from './Components/Nav/Nav';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Convert from './Components/Convert/Convert'
import Delivery from './Components/Delivery/Delivery';
import Catalog from './Components/Catalog/Catalog';
import { Search } from './Components/UpdatePrice/Search';
import { Example } from './Components/UpdatePrice/PrintTest';
import UpdatePrice from './Components/UpdatePrice/UpdatePrice/UpdatePrice';
import Calculator from './Components/Calculator/Calculator';
import ProductDetail from './Components/ProductDetail/ProductDetail';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAllProducts } from './features/products/productSlicetest';
import SuperUser from './Components/SuperUser/SuperUser';
import UserDetail from './Components/User/UserDetail/UserDetail';
import TicketHandler from './Components/TicketHandler/TicketHandler';
import TicketDetail from './Components/TicketDetail/TicketDetail';
import TicketStats from './Components/TicketStats/TicketStats';
import CompleteProductInfo from './Components/CompleteProductInfo/CompleteProductInfo';
import BackupTickets from './Components/TicketHandler/BackupTickets/BackupTickets';

function App() {
  let dispatch = useDispatch()
  useEffect(()=>{
    dispatch( fetchAllProducts() )
  }, [])

  return (
    <div className="App">
      <Nav/>
      <Routes>
        <Route path ="/" element={<Landing></Landing>} />
        <Route path ="/home" element={<Home></Home>} />
        <Route path ="/login" element={<Login></Login>} />
        <Route path ="/register" element={<Register></Register>} />
        <Route path ="/convert" element={<Convert></Convert>} />
        <Route path ="/delivery" element={<Delivery/>} />
        <Route path ="/catalog" element={<Catalog/>} />
        <Route path ="/search" element={<Search/>} />
        <Route path ="/printest" element={<Example/>} />
        <Route path ="/update/price" element={<UpdatePrice/>} />
        <Route path ="/calculator" element={<Calculator/>} />
        <Route path ="/products/:id" element={<ProductDetail/>} />
        <Route path ="/superuser" element={<SuperUser/>} />
        <Route path ="/profile" element={<UserDetail/>} />
        <Route path ="/tickets" element={<TicketHandler/>} />
        <Route path ="/tickets/:id" element={<TicketDetail/>} />
        <Route path ="/tickets/stats" element={<TicketStats/>} />
        <Route path ="/tickets/backup" element={<BackupTickets/>} />

        <Route path ="/complete/product/:attribute" element={<CompleteProductInfo/>} />
        {/* <Route path ="/complete/product/:attribute" element={<CompletePCompra/>} /> */}

      </Routes>
    </div>
  );
}

export default App;
