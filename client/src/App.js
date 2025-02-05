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
import SuperUserDashboard from "./Components/SuperUserDashBoard/SuperUserDashBoard";
import SuperCatalog from "./Components/SuperCatalog/SuperCatalog";
import SuperTickets from "./Components/SuperTickets/SuperTickets";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute"; 

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
  let focusSearch = () => {
    document.getElementById('inputSearch').focus()

  }
  return (
    <div onClick={() => focusSearch()} className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas protegidas */}
        <Route
          path="/upload/product"
          element={
            <ProtectedRoute>
              <UploadProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/delivery"
          element={
            <ProtectedRoute>
              <Delivery />
            </ProtectedRoute>
          }
        />
        <Route
          path="/catalog/"
          element={
            <ProtectedRoute>
              <Catalog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <Search />
            </ProtectedRoute>
          }
        />
        <Route
          path="/stats"
          element={
            <ProtectedRoute>
              <Stats />
            </ProtectedRoute>
          }
        />
        <Route
          path="/printest"
          element={
            <ProtectedRoute>
              <Example />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update/price"
          element={
            <ProtectedRoute>
              <UpdatePrice />
            </ProtectedRoute>
          }
        />
        <Route
          path="/calculator"
          element={
            <ProtectedRoute>
              <Calculator />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products/:id"
          element={
            <ProtectedRoute>
              <ProductDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/superuser"
          element={
            <ProtectedRoute>
              <SuperUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tickets"
          element={
            <ProtectedRoute>
              <TicketHandler />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tickets/:id"
          element={
            <ProtectedRoute>
              <TicketDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tickets/stats"
          element={
            <ProtectedRoute>
              <TicketStats />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tickets/backup"
          element={
            <ProtectedRoute>
              <RestoreTickets />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sucursal/:id"
          element={
            <ProtectedRoute>
              <Sucursal />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sucursal/"
          element={
            <ProtectedRoute>
              <UserSucursal />
            </ProtectedRoute>
          }
        />
        <Route
          path="/onlist/"
          element={
            <ProtectedRoute>
              <Faltante />
            </ProtectedRoute>
          }
        />
        <Route
          path="/print/list"
          element={
            <ProtectedRoute>
              <Listado />
            </ProtectedRoute>
          }
        />
        <Route
          path="/DashBoard"
          element={
            <ProtectedRoute>
              <SuperUserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/SuperCatalog/:id"
          element={
            <ProtectedRoute>
              <SuperCatalog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/SuperTickets/:id"
          element={
            <ProtectedRoute>
              <SuperTickets />
            </ProtectedRoute>
          }
        />
        <Route
          path="/complete/product/:attribute"
          element={
            <ProtectedRoute>
              <CompleteProductInfo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/membership"
          element={
            <ProtectedRoute>
              <Membership />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;