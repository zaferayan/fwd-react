import { useState } from "react";

// rafce
const App = () => {
  const [sayi, setSayi] = useState(1);

  console.log("RENDERED: ", sayi);

  setSayi((sayi) => sayi + 1);

  return <div>{sayi}</div>;
};

export default App;
