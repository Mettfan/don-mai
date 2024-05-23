import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import axios from "axios";
import { Link } from "react-router-dom";
import { editOneUser } from "../../features/users/userSlice";
import Modal from "react-modal";
import "./SuperUserDashBoard.css";
import CrearUser from "./CrearUser/CrearUser";

function SuperUserDashboard(props) {
  let cookie = new Cookies();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.users);
  const [user] = useState(props.user || cookie.get("user"));
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editError, setEditError] = useState("");
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!user) {
      console.log("No user data available, please login");
      return;
    }
    const getAllUsers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/users/getAllUsers`,
          {
            params: {
              userId: user.id,
            },
          }
        );

        if (response.data && !response.data.error) {
          setUsers(response.data);
          console.log(response.data);
        } else if (response.data.error) {
          console.error("Error:", response.data.error);
        }
      } catch (error) {
        console.error("Failed", error);
      }
    };

    getAllUsers();
  }, [user]);

  const handleEditClick = (user) => {
    setEditingUser({ ...user, confirmPassword: user.password });
  };

  const handleUserEdit = async (e) => {
    e.preventDefault();
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(editingUser.email)) {
      setEditError("El correo electrónico no es válido");
      return;
    }
    if (editingUser.password !== editingUser.confirmPassword) {
      setEditError("Las contraseñas no coinciden");
      return;
    }
    delete editingUser.confirmPassword;

    dispatch(editOneUser({ editingUser })).then((response) => {
      if (response.error) {
        alert(response.error);
      } else {
        alert("Usuario editado correctamente");
        setEditingUser(null);

        const updatedUsers = users.map((user) =>
          user.id === editingUser.id ? editingUser : user
        );
        setUsers(updatedUsers);
      }
    });
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setEditError("");
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/deleteUser/${id}`
      );
      alert(response.data.message);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="super-user-dashboard">
      <h1>Super User Dashboard</h1>
      <button onClick={() => setOpen(true)}>Crear usuario</button>
      <Modal  isOpen={open}>
        <button onClick={() => setOpen(false)}>x</button>
        <CrearUser></CrearUser>
      </Modal>
      <ul>
        {users.map((user) => (
          <div key={user.id} className="user-card">
            {editingUser && editingUser.id === user.id ? (
              <form onSubmit={handleUserEdit} className="edit-form">
                <h2>Editando Usuario:</h2>
                <div>
                  <label>Nombre:</label>
                  <input
                    type="text"
                    value={editingUser.name}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label>Email:</label>
                  <input
                    type="email"
                    value={editingUser.email}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, email: e.target.value })
                    }
                    disabled
                  />
                </div>
                <div>
                  <label>Edad:</label>
                  <input
                    type="number"
                    value={editingUser.age}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, age: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label>Teléfono:</label>
                  <input
                    type="text"
                    value={editingUser.phone}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, phone: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label>Privilegios:</label>
                  <input
                    type="text"
                    value={editingUser.privileges}
                    onChange={(e) =>
                      setEditingUser({
                        ...editingUser,
                        privileges: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label>Cuenta Deshabilitada:</label>
                  <input
                    type="checkbox"
                    checked={editingUser.disabled}
                    onChange={(e) =>
                      setEditingUser({
                        ...editingUser,
                        disabled: e.target.checked,
                      })
                    }
                  />
                </div>
                <div>
                  <label>Contraseña:</label>
                  <input
                    type="password"
                    value={editingUser.password}
                    onChange={(e) =>
                      setEditingUser({
                        ...editingUser,
                        password: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label>Confirmar Contraseña:</label>
                  <input
                    type="password"
                    value={editingUser.confirmPassword}
                    onChange={(e) =>
                      setEditingUser({
                        ...editingUser,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                </div>
                {editError && <p style={{ color: "red" }}>{editError}</p>}
                <button type="button" onClick={handleCancelEdit}>
                  Descartar
                </button>
                <button type="submit">Guardar</button>
              </form>
            ) : (
              <>
                <h2>Detalles del Usuario: {user.name}</h2>
                {/* <img src={user.image} alt="profile" className="profile-image" /> */}
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Edad:</strong> {user.age || "No especificado"}
                </p>
                <p>
                  <strong>Compras:</strong> {user.bought || "Ninguna"}
                </p>
                <p>
                  <strong>Teléfono:</strong> {user.phone || "No especificado"}
                </p>
                <p>
                  <strong>Privilegios:</strong> {user.privileges}
                </p>
                <p>
                  <strong>Cuenta Deshabilitada:</strong>{" "}
                  {user.disabled ? "Sí" : "No"}
                </p>
                <p>
                  <strong>Creado el:</strong>{" "}
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
                <p>
                  <strong>Última actualización:</strong>{" "}
                  {new Date(user.updatedAt).toLocaleDateString()}
                </p>
                <button onClick={() => handleEditClick(user)}>Editar</button>
                <Link to={`/SuperCatalog/${user.id}`}>Productos</Link>
                <Link to={`/SuperTickets/${user.id}`}>Tickets</Link>
                <button
                  className="borrarUsuario"
                  onClick={() => handleDelete(user.id)}
                >
                  Borrar
                </button>
              </>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
}

export default SuperUserDashboard;
