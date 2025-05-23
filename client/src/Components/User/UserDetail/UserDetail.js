import React, { useCallback, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { editOneUser } from "../../../features/users/userSlice";
import "./UserDetail.css";
import LOGODONMAY from "../../../Assets/LOGODONMAY.png";
import Modal from "react-modal";
import CambiarPlan from "../../CambiarPlan/CambiarPlan";
import axios from "axios";

function UserDetail(props) {
  let cookie = new Cookies();
  let dispatch = useDispatch();
  let [imageUrl] = useState(LOGODONMAY);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalError, setModalError] = useState(true);
  const [modalValues, setModalValues] = useState({});
  const [editingUser, setEditingUser] = useState({});
  const [error, setError] = useState();
  const [user, setUser] = useState(props.user || cookie.get("user"));
  const token = cookie.get("token");
  console.log(user);

  useEffect(() => {
    if (!user) {
      console.log("No user data available, please login");
      return;
    }
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/users`, {
          params: {
            filter: "email",
            value: user.email,
            password: user.password
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data && !response.data.error) {
          setUser(response.data);
          cookie.set("user", JSON.stringify(response.data), { path: "/" });
        } else if (response.data.error) {
          console.error("Error fetching user:", response.data.error);
        }
      } catch (error) {
        console.error("Failed to fetch user details", error);
      }
    };

    fetchUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeModalInput = useCallback(
    (e) => {
      const { name, value } = e.target;
      setEditingUser((prev) => ({ ...prev, [name]: value }));
    },
    [setEditingUser]
  );

  useEffect(() => {
    if (
      modalValues.name === editingUser.name &&
      modalValues.email === editingUser.email &&
      modalValues.phone === editingUser.phone &&
      (!editingUser.newPassword ||
        editingUser.newPassword === modalValues.password)
    ) {
      setModalError(true);
    } else {
      setModalError(false);
    }
  }, [editingUser, modalValues, user]);

  let nav = useNavigate();
  let handleOnLogOut = () => {
    cookie.remove("user");
    cookie.remove("token"); // Elimina el token de las cookies
    delete axios.defaults.headers.common["Authorization"]; // Elimina el token de las cabeceras de axios
    nav("/");
    window.location.reload();
  };

  const openOrCloseModal = () => {
    if (!modalIsOpen) {
      setModalValues(user);
      setEditingUser(user);
      setModalIsOpen(!modalIsOpen);
    }
    setModalIsOpen(!modalIsOpen);
  };

  const handleUserEdit = async (e) => {
    e.preventDefault();
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(editingUser.email)) {
      setError("El correo electrónico no es válido");
      return;
    }
    if (editingUser.newPassword && editingUser.confirmNewPassword) {
      if (editingUser.newPassword !== editingUser.confirmNewPassword) {
        setError("Las contraseñas no coinciden");
        return;
      }
    }

    // Crear un objeto para enviar solo los campos que han cambiado
    const updatedFields = {};
    if (editingUser.name !== user.name) updatedFields.name = editingUser.name;
    if (editingUser.email !== user.email)
      updatedFields.email = editingUser.email;
    if (editingUser.phone !== user.phone)
      updatedFields.phone = editingUser.phone;
    if (editingUser.newPassword)
      updatedFields.newPassword = editingUser.newPassword;
    updatedFields.id = user.id;

    dispatch(editOneUser({ editingUser: updatedFields })).then((response) => {
      if (response.error) {
        alert(response.error);
      } else {
        alert("Usuario editado correctamente");
        setModalIsOpen(false);
        setUser(response.payload); // Actualizar el estado del usuario con la respuesta
        cookie.set("user", JSON.stringify(response.payload), { path: "/" }); // Actualizar la cookie
        window.location.reload();
      }
    });
  };

  return (
    <>
      <div className="userDetailContainer">
        <img alt="" className="userDetailImage" src={imageUrl || user.image} />
        <div className="userDetailInfo">
          <div className="userInfo">{user.name}</div>
          <div className="userInfo">{user.email}</div>
          <div className="userInfo">
            {user.phone ? <div>{user.phone}</div> : null}
          </div>
          <div className="userInfo">Privileges: {user.privileges}</div>
          <div className="userInfo">Productos disponibles: {user.bought}</div>
          <div className="userInfo">User ID: {user.id}</div>
          <button onClick={openOrCloseModal} className="editButton">
            Editar
          </button>
          <CambiarPlan userId={user.id} />
          <button className="logoutButton" onClick={handleOnLogOut}>
            Cerrar Sesión
          </button>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={openOrCloseModal}
        className="modalContent"
        overlayClassName="modalOverlay"
      >
        <button onClick={openOrCloseModal} className="modalCloseButton">
          X
        </button>
        <form onSubmit={handleUserEdit}>
          <h2>Editar información personal</h2>
          <input
            className="inputField"
            maxLength={100}
            name="name"
            value={editingUser.name}
            onChange={handleChangeModalInput}
            type="text"
            autoComplete="name"
            required
          ></input>
          <input
            className="inputField"
            name="email"
            value={editingUser.email}
            onChange={handleChangeModalInput}
            type="text"
            autoComplete="email"
            required
          ></input>
          {user.phone ? (
            <input
              className="inputField"
              name="phone"
              value={editingUser.phone}
              onChange={handleChangeModalInput}
              type="tel"
              autoComplete="phone"
            ></input>
          ) : (
            <div>
              <p>Te gustaría agregar un número de teléfono?</p>
              <input
                className="inputField"
                name="phone"
                value={editingUser.phone}
                onChange={handleChangeModalInput}
                type="tel"
                autoComplete="phone"
              ></input>
            </div>
          )}
          <p>Quieres cambiar tu clave?</p>
          <input
            className="inputField"
            name="newPassword"
            value={editingUser.newPassword || ""}
            onChange={handleChangeModalInput}
            type="password"
            autoComplete="new-password"
            placeholder="Nueva contraseña"
            maxLength={100}
          ></input>
          <input
            className="inputField"
            name="confirmNewPassword"
            value={editingUser.confirmNewPassword || ""}
            onChange={handleChangeModalInput}
            type="password"
            autoComplete="new-password"
            placeholder="Confirmar nueva contraseña"
            maxLength={100}
          ></input>
          {error && <p>{error}</p>}
          {modalError ? (
            <>
              <p className="errorMessage">
                Tienes que hacer cambios para guardar
              </p>
              <button className="saveButton" disabled>
                Guardar
              </button>
            </>
          ) : (
            <button className="saveButton" type="submit">
              Guardar
            </button>
          )}
        </form>
      </Modal>
    </>
  );
}

export default UserDetail;
