import { useState } from "react";

const App = () => {
  // usss
  const [sayi, setSayi] = useState(42);
  const [isim, setIsim] = useState("Zafer");
  const [isVisible, setIsVisible] = useState(false);
  const [kisiler, setKisiler] = useState(["Zafer", "Burak", "Serkan"]);
  const [user, setUser] = useState({
    name: "Zafer",
    ders: "Reacct",
  });
  return (
    <div>
      <h1>{sayi}</h1>
      <h1>{isim}</h1>
      <h1>{isVisible}</h1>
      <h1>{kisiler}</h1>
      <h1>{user.ders}</h1>
    </div>
  );
};

export default App;
