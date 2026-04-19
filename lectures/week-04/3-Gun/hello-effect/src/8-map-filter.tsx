// rafce

import { useState } from "react";

const App = () => {
  const [users, setUsers] = useState([
    { id: "1", name: "Gülben" },
    { id: "2", name: "Göker" },
    { id: "3", name: "Zafer" },
  ]);

  const handleDelete = (id: string) => {
    // filter
    const newUsers = users.filter((user) => user.id !== id);
    setUsers(newUsers);
  };

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.name}{" "}
          <button onClick={() => handleDelete(user.id)}>
            Sil
          </button>
        </li>
      ))}
    </ul>
  );
};

export default App;
