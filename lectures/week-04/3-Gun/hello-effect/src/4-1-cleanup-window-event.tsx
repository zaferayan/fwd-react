// rafce

import { useEffect, useState } from "react";

const App = () => {
  // usss
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  // uffs
  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <h1>{size.width + "/" + size.height}</h1>
    </div>
  );
};

export default App;
