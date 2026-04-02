// rafce

import { useState, type SubmitEvent } from "react";

const App = () => {
  // usss
  const [firstname, setFirstname] = useState("Zafer");

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    // Sayfanın tekrar gönderilmesini engeller
    e.preventDefault();
    // Backend'e istek at
    // fetch("/", {
    //   method: "POST",
    //   body: {

    //   }
    // })
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="input"
        name="firstname"
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
      />
      <button>Gönder</button>
    </form>
  );
};

export default App;
