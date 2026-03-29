import { useState } from "react";

function Dashboard() {
  const [token, setToken] = useState("");

  const createToken = async () => {
    const response = await fetch("http://localhost:9090/api/tokens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: "Kanna" })
    });

    const data = await response.json();
    setToken(data.tokenValue);
  };

  return (
    <div>
      <button onClick={createToken}>Get Token</button>
      <p>Your Token: {token}</p>
    </div>
  );
}

export default Dashboard;