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
  const token = cookie.get("token");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.users);
  const [user] = useState(props.user || cookie.get("user"));
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editError, setEditError] = useState("");
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterByEmail, setFilterByEmail] = useState("");
  const [filterByPrivileges, setFilterByPrivileges] = useState("");
  const [filterByAge, setFilterByAge] = useState("");
  const [ uniqueNames, setUniqueNames] = useState([]);
  const [uniqueEmails, setUniqueEmails] = useState([]);
  const [uniquePrivileges, setUniquePrivileges] = useState([]);
  const [uniqueAges, setUniqueAges] = useState([]);

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
          console.log(response.data, "!!!!!!!!");

          // Extraer opciones únicas para los filtros
          const names = [...new Set(response.data.map((user) => user.name))];
          const emails = [...new Set(response.data.map((user) => user.email))];
          const privileges = [
            ...new Set(response.data.map((user) => user.privileges)),
          ];
          const ages = [...new Set(response.data.map((user) => user.age))];

          setUniqueNames(names);
          setUniqueEmails(emails);
          setUniquePrivileges(privileges);
          setUniqueAges(ages);
        } else if (response.data.error) {
          console.error("Error:", response.data.error);
        }
      } catch (error) {
        console.error("Failed", error);
      }
    };

    getAllUsers();
    console.log(uniqueEmails, "??????");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleEditClick = (user) => {
    // Eliminar el hash de la contraseña y establecer confirmPassword en blanco
    setEditingUser({ ...user, newPassword: "", confirmPassword: "" });
  };

  const handleUserEdit = async (e) => {
    e.preventDefault();
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(editingUser.email)) {
      setEditError("El correo electrónico no es válido");
      return;
    }
    if (editingUser.newPassword !== editingUser.confirmPassword) {
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

  const normalizeText = (text) => {
    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  };

  const filterUsers = (user) => {
    const normalizedSearchTerm = normalizeText(searchTerm);
    const normalizedName = normalizeText(user.name);
    const normalizedEmail = normalizeText(user.email);
    // const normalizedPrivileges = normalizeText(user.privileges);
    // const normalizedAge = user.age.toString();

    const matchesSearchTerm =
      normalizedName.includes(normalizedSearchTerm) ||
      normalizedEmail.includes(normalizedSearchTerm);

    const matchesEmail = !filterByEmail || user.email === filterByEmail;
    const matchesPrivileges =
      !filterByPrivileges || user.privileges === filterByPrivileges;
    const matchesAge = !filterByAge || user.age.toString() === filterByAge;

    return matchesSearchTerm && matchesEmail && matchesPrivileges && matchesAge;
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/deleteUser/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data.message);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const filteredUsers = users.filter(filterUsers);

  return (
    <div className="super-user-dashboard">
      <h1>Super User Dashboard</h1>
      <button onClick={() => setOpen(true)}>Crear usuario</button>
      <Modal isOpen={open}>
        <button onClick={() => setOpen(false)}>x</button>
        <CrearUser></CrearUser>
      </Modal>
      <div className="search-filters-dashboard">
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input-dashboard"
        />
        <select
          value={filterByEmail}
          onChange={(e) => setFilterByEmail(e.target.value)}
          className="select-filter-dashboard"
        >
          <option value="">Filtrar por email</option>
          {uniqueEmails.map((email) => (
            <option key={email} value={email}>
              {email}
            </option>
          ))}
        </select>
        <select
          value={filterByPrivileges}
          onChange={(e) => setFilterByPrivileges(e.target.value)}
          className="select-filter-dashboard"
        >
          <option value="">Filtrar por privilegios</option>
          {uniquePrivileges.map((privilege) => (
            <option key={privilege} value={privilege}>
              {privilege}
            </option>
          ))}
        </select>
        <select
          value={filterByAge}
          onChange={(e) => setFilterByAge(e.target.value)}
          className="select-filter-dashboard"
        >
          <option value="">Filtrar por edad</option>
          {uniqueAges.map((age) => (
            <option key={age} value={age}>
              {age}
            </option>
          ))}
        </select>
      </div>
      <h2>Total de usuarios: {filteredUsers.length}</h2>
      <ul>
        {filteredUsers.map((user) => (
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
                    value={editingUser.newPassword}
                    onChange={(e) =>
                      setEditingUser({
                        ...editingUser,
                        newPassword: e.target.value,
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
                <button type="submit">Guardar cambios</button>
                <button type="button" onClick={handleCancelEdit}>
                  Cancelar
                </button>
              </form>
            ) : (
              <>
                <h3>Nombre: {user.name}</h3>
                <p>Email: {user.email}</p>
                <p>Edad: {user.age}</p>
                <p>Teléfono: {user.phone}</p>
                <p>Productos disponibles: {user.bought}</p>
                <p>Privilegios: {user.privileges}</p>
                <p>Deshabilitado: {user.disabled ? "Sí" : "No"}</p>
                <Link to={`/SuperCatalog/${user.id}`}>Productos</Link>
                <Link to={`/SuperTickets/${user.id}`}>Tickets</Link>
                <button onClick={() => handleEditClick(user)}>Editar</button>
                <button onClick={() => handleDelete(user.id)}>Eliminar</button>
              </>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
}

export default SuperUserDashboard;
