// rafce

import { useEffect, useState } from "react";

const App = () => {
  const [sayi, setSayi] = useState(42);

  // Sonsuz döngü oluşturur
  useEffect(() => {
    console.log("RENDERED");
    setSayi(sayi + 1); // Render tetikler
  }, [sayi]); // SAyı değeri değişti, effect tekrar çalıştı

  return <div>App</div>;
};

export default App;
