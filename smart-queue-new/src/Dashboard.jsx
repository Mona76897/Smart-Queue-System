import { useEffect, useState } from "react";

function Dashboard() {
  const [tokens, setTokens] = useState([]);
  const [time, setTime] = useState(new Date());

  const API = "http://localhost:9090/api/tokens";
  const user = localStorage.getItem("user");

  const fetchTokens = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setTokens(data);
  };

  useEffect(() => {
    fetchTokens();

    const interval = setInterval(() => {
      fetchTokens();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const generateToken = async () => {
    await fetch(`${API}?counter=Counter1`, { method: "POST" });
    fetchTokens();
  };

  const callNext = async () => {
    await fetch(`${API}/next?counter=Counter1`, { method: "POST" });
    fetchTokens();
  };

  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const current = tokens.find(t => t.status === "DONE");

  const waitingCount = tokens.filter(t => t.status === "WAITING").length;
  const total = tokens.length;
  const progress = total ? ((total - waitingCount) / total) * 100 : 0;

  return (
    <div className="flex h-screen bg-gray-100">

      {/* SIDEBAR */}
      <div className="w-64 bg-blue-700 text-white flex flex-col p-4 shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Smart Queue</h1>

        <button className="mb-3 text-left hover:bg-blue-600 p-2 rounded">
          Dashboard
        </button>

        <button
          onClick={() => window.open("http://localhost:5173/display", "_blank")}
          className="text-left hover:bg-blue-600 p-2 rounded"
        >
          Display Screen
        </button>

        <div className="mt-auto">
          <p className="text-sm">Logged in as</p>
          <p className="font-bold">{user.email}</p>

          <button
            onClick={logout}
            className="mt-3 bg-red-500 w-full p-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Dashboard</h2>

          <div className="text-right">
            <p className="text-sm text-gray-500">{user.role}</p>
            <p className="font-semibold">{time.toLocaleTimeString()}</p>
          </div>
        </div>

        {/* CURRENT TOKEN */}
        <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-6 rounded">
          <h3 className="text-gray-600">Now Serving</h3>
          <p className="text-3xl font-bold text-green-700">
            {current ? `Token ${current.number}` : "None"}
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-4 mb-6">

          <div className="bg-white p-4 rounded shadow hover:shadow-lg">
            <h3 className="text-gray-500">Total</h3>
            <p className="text-2xl font-bold">{total}</p>
          </div>

          <div className="bg-white p-4 rounded shadow hover:shadow-lg">
            <h3 className="text-gray-500">Waiting</h3>
            <p className="text-2xl font-bold">{waitingCount}</p>
          </div>

          <div className="bg-white p-4 rounded shadow hover:shadow-lg">
            <h3 className="text-gray-500">Completed</h3>
            <p className="text-2xl font-bold">{total - waitingCount}</p>
          </div>

        </div>

        {/* PROGRESS BAR */}
        <div className="mb-6">
          <p className="mb-1 text-sm text-gray-600">Queue Progress</p>
          <div className="w-full bg-gray-300 rounded h-3">
            <div
              className="bg-green-500 h-3 rounded"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="mb-6">
          <button
            onClick={generateToken}
            className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded mr-3 transition"
          >
            Generate Token
          </button>

          <button
            onClick={callNext}
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded transition"
          >
            Call Next
          </button>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded shadow p-4">
          <h3 className="text-lg font-bold mb-3">Token List</h3>

          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="p-2">Token</th>
                <th className="p-2">Status</th>
                <th className="p-2">Counter</th>
              </tr>
            </thead>

            <tbody>
              {tokens.map((t) => (
                <tr
                  key={t.number}
                  className={`border-b hover:bg-gray-50 ${
                    t.status === "DONE" ? "bg-green-50" : ""
                  }`}
                >
                  <td className="p-2">#{t.number}</td>

                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded text-white text-sm ${
                        t.status === "WAITING"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>

                  <td className="p-2">{t.counter}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;