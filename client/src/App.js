import "./App.css";
import { Route, Routes } from "react-router-dom";
import Landing from "./Components/Landing/Landing";
import Home from "./Components/Home/Home";
import Nav from "./Components/Nav/Nav";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Stats from "./Components/Stats/Stats";
import Delivery from "./Components/Delivery/Delivery";
import Catalog from "./Components/Catalog/Catalog";
import { Search } from "./Components/UpdatePrice/Search";
import { Example } from "./Components/UpdatePrice/PrintTest";
import UpdatePrice from "./Components/UpdatePrice/UpdatePrice/UpdatePrice";
import Calculator from "./Components/Calculator/Calculator";
import ProductDetail from "./Components/ProductDetail/ProductDetail";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAllProducts } from "./features/products/productSlicetest";
import SuperUser from "./Components/SuperUser/SuperUser";
import UserDetail from "./Components/User/UserDetail/UserDetail";
import TicketHandler from "./Components/TicketHandler/TicketHandler";
import TicketDetail from "./Components/TicketDetail/TicketDetail";
import TicketStats from "./Components/TicketStats/TicketStats";
import CompleteProductInfo from "./Components/CompleteProductInfo/CompleteProductInfo";
import RestoreTickets from "./Components/TicketHandler/RestoreTickets/RestoreTickets";
import Sucursal from "./Components/Sucursal/Sucursal";
import UserSucursal from "./Components/Sucursal/UserSucursal/UserSucursal";
import UploadProduct from "./pages/UploadProduct/UploadProduct";
import { fetchOneSucursal } from "./features/sucursal/sucursalSlice";
import Cookies from "universal-cookie";
import Faltante from "./pages/Faltante/Faltante";
import Listado from "./pages/Listado/Listado";
import Membership from "./Components/Membership/Membership";
import Modal from "react-modal";

Modal.setAppElement("#root");

function App() {
  let dispatch = useDispatch();
  let cookie = new Cookies();
  let user = cookie.get("user");

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(fetchOneSucursal({ filter: "UserId", value: user.id }));
    }
  }, [dispatch, user]);

  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/upload/product" element={<UploadProduct />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/search" element={<Search />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/printest" element={<Example />} />
        <Route path="/update/price" element={<UpdatePrice />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/superuser" element={<SuperUser />} /> {/* 1 */}
        <Route path="/profile" element={<UserDetail />} />
        <Route path="/tickets" element={<TicketHandler />} />
        <Route path="/tickets/:id" element={<TicketDetail />} />
        <Route path="/tickets/stats" element={<TicketStats />} />{/* hasta aca llegue */}
        <Route path="/tickets/backup" element={<RestoreTickets />} />
        <Route path="/sucursal/:id" element={<Sucursal />} />
        <Route path="/sucursal/" element={<UserSucursal />} />
        <Route path="/onlist/" element={<Faltante />} />
        <Route path="/print/list" element={<Listado />} />
        <Route
          path="/complete/product/:attribute"
          element={<CompleteProductInfo />}
        />
        <Route path="/membership" element={<Membership />} />
      </Routes>
    </div>
  );
}

export default App;