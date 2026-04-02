import { useState } from "react";

// rafce
const App = () => {
  const [sayi, setSayi] = useState(1);

  const handleAdd = () => {
    setSayi((prev) => prev + 1);
    setSayi((prev) => prev + 1);
    setSayi((prev) => prev + 1);
    // setSayi(sayi + 1);
    // setSayi(sayi + 1);
    // setSayi(sayi + 1);
  };

  return (
    <div>
      <h1>{sayi}</h1>
      <button className="btn btn-primary" onClick={handleAdd}>
        +3
      </button>
    </div>
  );
};

export default App;
