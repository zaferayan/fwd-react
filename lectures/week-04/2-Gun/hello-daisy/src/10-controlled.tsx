// Controlled vs Uncontrolled component

// Controlled component
// ----------------------
// State inputu kontrol eder
// State değişince input tekrar render edilir
import { useState } from "react";

const App = () => {
  const [name, setName] = useState("Zafer");

  return <input value={name} onChange={(e) => setName(e.target.value)} />;
};

export default App;
