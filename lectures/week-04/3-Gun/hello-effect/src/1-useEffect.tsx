// rafce

import { useEffect } from "react";

const App = () => {
  console.log("RENDERED");
  // uffs
  useEffect(() => {
    console.log("EFFECT çalıştı");
    // Side effect burada hallediyoruz
    document.title = "Hellooo";
  }, []);

  return <div>App</div>;
};

export default App;
