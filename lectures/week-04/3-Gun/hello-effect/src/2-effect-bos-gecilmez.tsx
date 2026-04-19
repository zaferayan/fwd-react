// rafce

import { useEffect } from "react";

const App = () => {
  console.log("RENDERED");
  // uffs
  useEffect(() => {
    console.log("Her render'da çalışır");
  }); // Dependency array boş geçmeyin

  useEffect(() => {
    console.log("ilk render'da çalışır");
  }, []);

  return <div>App</div>;
};

export default App;
