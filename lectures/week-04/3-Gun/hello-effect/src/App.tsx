import { useEffect, useState } from "react";

const App = () => {
  // usss
  const [theme, setTheme] = useState<"light" | "dark">(
    "light",
  );

  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    setTheme(
      localTheme === null
        ? theme
        : (localTheme as "light" | "dark"),
    );
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div>
      <button onClick={toggleTheme}>Tema değiştir</button>
      <h1>{theme}</h1>
    </div>
  );
};

export default App;
