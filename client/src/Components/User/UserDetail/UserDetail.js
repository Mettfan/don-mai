import React, { useCallback, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { editOneUser, fetchOneUser } from "../../../features/users/userSlice";
import "./UserDetail.css";
import LOGODONMAY from "../../../Assets/LOGODONMAY.png";
import Modal from "react-modal";

function UserDetail(props) {
  let cookie = new Cookies();
  let dispatch = useDispatch();
  let [imageUrl, setImageUrl] = useState(LOGODONMAY);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalError, setModalError] = useState(true);
  const [modalValues, setModalValues] = useState({});
  const [editingUser, setEditingUser] = useState({});
  const [error, setError] = useState();
  const [ user, setUser ] = useState(props.user || cookie.get("user"))
  
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
      modalValues.password && editingUser.password &&
      modalValues.password === editingUser.password
    ) {
      setModalError(true);
    } else {
      setModalError(false);
    }
  }, [editingUser, modalValues]);

  let nav = useNavigate();
  // let user = props.user || cookie.get("user");
  let handleOnLogOut = () => {
    cookie.remove("user");
    nav("/");
    window.location.reload();
  };
  if (!user) {
    return (
      <div>
        Please log in to view this page!
        <button onClick={() => nav("/register")}>Register</button>
      </div>
    );
  }
  // let onURLchange = (e) => {
  //     setImageUrl(e.target.value)
  // }
  // let changeProfileImage = (url) => {
  //     console.log({id: user.id, findBy: 'image', infoUpdated: url});
  //     dispatch(editOneUser({id: user.id, findBy: 'image', infoUpdated: url}))
  // }

  const openOrCloseModal = () => {
    if (!modalIsOpen) {
      setModalValues(user);

      setEditingUser(user);
      console.log(user);
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
    if (editingUser.password !== editingUser.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    delete editingUser.confirmPassword;
  
   
    dispatch(editOneUser({ editingUser })).then((response) => {
      if (response.error) {
        alert(response.error);
      } else {
        alert('Usuario editado correctamente')
        setModalIsOpen(false);
        dispatch(fetchOneUser({
          filter: "email",
          value: editingUser.email,
          password: editingUser.password,
        })).then((response) => {
          if (!response.error) {
            setUser(response.payload); 
          }
        });
      }
    });
  };

  return (
    <>
      <div className="userDetailContainer">
        <img alt="" className="userDetailImage" src={imageUrl || user.image} />
        <div className="userDetailInfo">
          <div>{user.name}</div>
          <div>{user.email}</div>
          <div>{user.phone ? <div>{user.phone}</div> : null}</div>
          <div>{user.privileges}</div>
          <div>{user.id}</div>
          <button onClick={openOrCloseModal}>Editar</button>
          {/* {JSON.stringify(user)} */}
          <button
            className="logoutButton"
            onClick={() => {
              handleOnLogOut();
            }}
          >
            Cerrar Sesión
          </button>
        </div>
        {/* <input placeholder='URL de Imagen' type={'text'} onChange={(e) => {onURLchange(e)}}  ></input>
            <button onClick={() => {changeProfileImage(imageUrl) }} >Upload</button>
            {imageUrl} */}
      </div>
      <Modal isOpen={modalIsOpen} onRequestClose={openOrCloseModal}>
        <button onClick={openOrCloseModal}>X</button>
        <form onSubmit={(e) => handleUserEdit(e)}>
          <h2>Editar información personal</h2>
          <input
            maxLength={100}
            name="name"
            value={editingUser.name}
            onChange={handleChangeModalInput}
            type="text"
            autoComplete="name"
            required
          ></input>
          <input
            name="email"
            value={editingUser.email}
            onChange={handleChangeModalInput}
            type="text"
            autoComplete="email"
            required
          ></input>
          {user.phone ? (
            <input
              name="phone"
              value={editingUser.phone}
              onChange={handleChangeModalInput}
              type="tel"
              autoComplete="phone"
            ></input>
          ) : (
            <div>
              <p>Te gustaria agregar un numero de teléfono?</p>
              <input
                input
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
            name="password"
            value={editingUser.password}
            onChange={handleChangeModalInput}
            type="password"
            autoComplete="password"
            maxLength={100}
            required
          ></input>
          <input
            name="confirmPassword"
            value={editingUser.confirmPassword}
            maxLength={100}
            onChange={handleChangeModalInput}
            type="password"
            autoComplete="password"
            required
          ></input>
          {error && <p>{error}</p>}
          {modalError ? (
            <>
              <p className="text-sm text-red-600 inline ml-3">
                Tienes que hacer cambios para guardar
              </p>
              <button
                disabled
                className="flex items-center justify-center w-16 h-10 mt-8 ml-64 bg-red-600 text-white rounded-xl"
              >
                Guardar
              </button>
            </>
          ) : (
            <button
              type="submit"
              className="flex items-center justify-center w-10 h-10 bg-red-600 text-white rounded-full"
            >
              Guardar
            </button>
          )}
        </form>
      </Modal>
    </>
  );
}

export default UserDetail;
