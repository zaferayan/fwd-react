// rafce

import { useState } from "react";

const App = () => {
  const [isim, setIsim] = useState("Zafer");

  return (
    <div className="p-4">
      <input
        className="input"
        value={isim}
        onChange={(e) => setIsim(e.target.value)}
      />
    </div>
  );
};

export default App;
