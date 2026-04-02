// Controlled vs Uncontrolled component

import { useRef } from "react";

// Uncontrolled component
// ----------------------
// Input değerleri DOM'dan/inputtan direkt okunur
// State yoktur

const App = () => {
  // useRef
  // urfs
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    const isim = inputRef.current?.value;
    alert(isim);
  };

  return (
    <div>
      <input ref={inputRef} className="input" />
      <button className="btn btn-primary" onClick={handleClick}>
        Gonder
      </button>
    </div>
  );
};

export default App;
