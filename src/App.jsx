import { useState, useEffect } from "react";
import axios from "axios";
import './App.css'

const API_URL = "http://localhost:5000/users";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Fetch users from API
  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => setUsers(response.data))
      .catch((error) => console.error(error));
  }, []);

  // Add new user
  const addUser = () => {
    if (!name || !email) return alert("Please fill all fields!");
    axios
      .post(API_URL, { name, email })
      .then((response) => {
        setUsers([...users, response.data]);
        setName("");
        setEmail("");
      })
      .catch((error) => console.error(error));
  };

  // Delete user
  const deleteUser = (id) => {
    axios
      .delete(`${API_URL}/${id}`)
      .then(() => setUsers(users.filter((user) => user.id !== id)))
      .catch((error) => console.error(error));
  };

  return (
    <div className="container">
      <div className="card">
        <h1>User List</h1>
  
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <span>{user.name} - {user.email}</span>
              <button onClick={() => deleteUser(user.id)}>Delete</button>
            </li>
          ))}
        </ul>
  
        <h2>Add New User</h2>
        <div className="form">
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button onClick={addUser}>Add User</button>
        </div>
      </div>
    </div>
  );
}

export default App;
