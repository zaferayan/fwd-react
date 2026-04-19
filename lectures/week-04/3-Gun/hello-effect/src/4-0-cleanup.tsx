import { useEffect, useState } from "react";

const App = () => {
  const [isVisible, setIsVisible] = useState(true);
  return (
    <div>
      <button onClick={() => setIsVisible(!isVisible)}>
        Göster/Gizle
      </button>
      {isVisible && <Sayac />}
    </div>
  );
};

const Sayac = () => {
  const [sayi, setSayi] = useState(42);

  useEffect(() => {
    const timer = setInterval(() => {
      setSayi((prev) => prev + 1);
      console.log("Timer çalıştı");
    }, 1000);

    // Arkamızı toplamak için
    // return () => {}
    // return void; // Herhangi bir şey yapmaz
    return () => {
      clearInterval(timer);
      console.log("Sayac öldü");
    };
  }, []);

  return <div>{sayi}</div>;
};

export default App;
