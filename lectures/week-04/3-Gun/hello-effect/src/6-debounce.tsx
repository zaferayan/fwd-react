// rafce

import { useEffect, useState } from "react";

const API_URL = "http://localhost:3000/users";

type User = {
  id: string;
  name: string;
};

const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [sorgu, setSorgu] = useState("");

  //uffs
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("Aranıyor", sorgu);
      // 500ms sonra burada arama çağrısı gerçekleşir
      fetch(API_URL + "?name:startsWith=" + sorgu)
        .then((res) => res.json())
        .then((json) => setUsers(json));
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [sorgu]);

  return (
    <div>
      <input
        type="text"
        placeholder="Isim giriniz"
        value={sorgu}
        onChange={(e) => setSorgu(e.target.value)}
      />
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </div>
  );
};

export default App;
