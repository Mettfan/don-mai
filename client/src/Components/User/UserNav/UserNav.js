import React from "react";
import { useNavigate } from "react-router-dom";
import "./UserNav.css";

function UserNav(props) {
  let user = props.user;
  let nav = useNavigate();
  let onUserClick = () => {
    user ? nav("/profile") : nav("/login");
  };

  return (
    <>
      <div className="userNavThumb" onClick={() => onUserClick()}>
        {user?.image ? (
          <img alt="" className="userNavImage" src={user.image} />
        ) : (
          <img
            alt="placeholder"
            className="userNavImage"
            src="https://via.placeholder.com/50"
          />
        )}
        <div>{user?.name || "Login"}</div>
      </div>
    </>
  );
}

export default UserNav;