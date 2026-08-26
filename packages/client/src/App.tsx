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

  return <div className="">{message} ajarngnsf</div>;
}

export default App;
