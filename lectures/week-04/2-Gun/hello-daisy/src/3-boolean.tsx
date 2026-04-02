import { useState } from "react";

const App = () => {
  // usss
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div>
      <button
        className="btn btn-primary"
        onClick={() => setIsVisible(!isVisible)}
      >
        Aç/Kapa
      </button>
      {isVisible && <div>Claude Kod kaynak kodları</div>}
    </div>
  );
};

export default App;
