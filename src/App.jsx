import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  return (
    <div style={{ textAlign: "center", marginTop: "50px", fontFamily: "Arial" }}>
      <h1>🚀 Meu App React Funcional</h1>

      <div style={{ margin: "20px 0" }}>
        <input
          type="text"
          placeholder="Digite seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: "8px", fontSize: "16px" }}
        />
      </div>

      <p>Olá, {name || "visitante"}!</p>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => setCount(count + 1)}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            marginRight: "10px",
          }}
        >
          Incrementar
        </button>
        <button
          onClick={() => setCount(0)}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Resetar
        </button>
      </div>

      <h2 style={{ marginTop: "30px" }}>Contador: {count}</h2>
    </div>
  );
}

export default App;
