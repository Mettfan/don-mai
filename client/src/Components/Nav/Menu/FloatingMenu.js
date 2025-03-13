import React from "react";
import { NavLink } from "react-router-dom";
import "./FloatingMenu.css";

function FloatingMenu({ closeCallback }) {
  return (
    <div className="menuContainer">
      <div className="closeButtonContainer">
        <h1 className="menuTitle">Menu</h1>
        <button className="closeMenuButton" onClick={() => closeCallback()}>
          &times;
        </button>
      </div>
      <NavLink
        className="menuLink"
        to="/upload/product"
        onClick={closeCallback}
      >
        CREATE
      </NavLink>
      <NavLink className="menuLink" to="/update/price" onClick={closeCallback}>
        EDIT
      </NavLink>
      <NavLink className="menuLink" to="/profile" onClick={closeCallback}>
        PROFILE
      </NavLink>
      {/* <NavLink className="menuLink" to="/print/list" onClick={closeCallback}>
        PRINT
      </NavLink> */}
    </div>
  );
}

export default FloatingMenu;