// rafce

import { useEffect, useState } from "react";

const App = () => {
  // usss
  const [sayi, setSayi] = useState(42);
  // uffs
  useEffect(() => {
    console.log("Sayı değişti", sayi);
    document.title = "Sayı: " + sayi;
  }, [sayi]); // Deps array'deki değişkenler

  return (
    <div>
      <button onClick={() => setSayi(sayi + 1)}>+</button>
      <h1>{sayi}</h1>
    </div>
  );
};

export default App;
