import { useEffect, useState } from "react";

const API_URL =
  "https://jsonplaceholder.typicode.com/users";

type User = {
  id: number;
  name: string;
};

const App = () => {
  // usss
  const [users, setUsers] = useState<User[]>([]);
  // uffs
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((json) => setUsers(json));
  }, []); // Deps array

  return (
    <ul>
      {users.length === 0 && <h1>Yükleniyor</h1>}
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};

export default App;
