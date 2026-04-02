import { useState } from "react";

const App = () => {
  // usss
  const [sayi, setSayi] = useState(42);

  console.log("App çağrıldı");

  return (
    <>
      <button className="btn btn-primary" onClick={() => setSayi(sayi + 1)}>
        {sayi}
      </button>
      <h1>{sayi}</h1>
    </>
  );
};

export default App;
