// rafce

import { useState, type ChangeEvent } from "react";

const App = () => {
  const [user, setUser] = useState({
    name: "Zafer",
    email: "zafer@gmail",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const deger = e.target.value;
    setUser({ ...user, name: deger });
  };

  return (
    <div>
      <input className="input" onChange={handleChange} />
      <h1>
        {user.name} - {user.email}
      </h1>
    </div>
  );
};

export default App;
