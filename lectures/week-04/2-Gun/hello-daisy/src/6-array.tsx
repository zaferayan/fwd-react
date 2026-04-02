/// Spread operator
/// ...arr => {name, email=asdasd}
/// ..user

import { useState } from "react";

const App = () => {
  const [users, setUsers] = useState(["Ayşenur", "Zaman", "Melisa"]);
  const [username, setUsername] = useState("");

  const handleAdd = () => {
    setUsers([...users, username]);
  };

  return (
    <div>
      <input
        className="input"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button className="btn btn-primary" onClick={handleAdd}>
        Ekle
      </button>
      {users.map((u) => (
        <h1>{u}</h1>
      ))}
    </div>
  );
};

export default App;
