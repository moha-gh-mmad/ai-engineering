import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((data) => {
        (console.log(data, "aowrnpi"), setMessage(data.message));
      });
  }, []);

  return <div className="font-bold p-4 text-3xl">{message} ajarngnsf</div>;
}

export default App;
