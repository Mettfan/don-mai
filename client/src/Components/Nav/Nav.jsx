import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import Cookie from "universal-cookie";
import "./Nav.css";
import FloatingMenu from "./Menu/FloatingMenu";
import MenuIcon from "../../Assets/Menu.png";
import UserNav from "../User/UserNav/UserNav";

let cookie = new Cookie();

export default function Nav() {
  let user = useSelector((state) => state.user) || cookie.get("user");
  let userSucursal = useSelector((state) => state.sucursales?.sucursal);
  let [isMenuVisible, setMenuVisibility] = useState(false);

  function toggleMenu() {
    setMenuVisibility(isMenuVisible === true ? false : true);
  }

  return (
    <nav className="navbar">
      <div className="navbarContainer">
        <img
          onClick={() => toggleMenu()}
          src={MenuIcon}
          alt="Menu"
          className="menuIcon"
        />
        {isMenuVisible && (
          <FloatingMenu closeCallback={() => toggleMenu()}></FloatingMenu>
        )}
        <NavLink className="navLink" to="/home">
          HOME
        </NavLink>
        <NavLink className="navLink" to="/catalog">
          CATALOG
        </NavLink>
        {user?.privileges && (
          <NavLink className="navLink" to="/tickets">
            Tickets
          </NavLink>
        )}
        {userSucursal?.id && (
          <NavLink className="navLink" to="/sucursal">
            Sucursal
          </NavLink>
        )}
        <UserNav user={user}></UserNav>
      </div>
    </nav>
  );
}