import { useEffect, useState } from "react";

function Display() {
  const [tokens, setTokens] = useState([]);
  const API = "http://localhost:9090/api/tokens";

  const fetchTokens = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setTokens(data);
  };

  useEffect(() => {
    fetchTokens();
    const interval = setInterval(fetchTokens, 2000);
    return () => clearInterval(interval);
  }, []);

  const current = tokens.find(t => t.status === "DONE");
  const waiting = tokens.filter(t => t.status === "WAITING").slice(0, 5);

  return (
    <div className="h-screen bg-black text-white flex flex-col">

      {/* HEADER */}
      <div className="bg-gray-900 p-4 text-center text-3xl font-bold border-b border-gray-700">
        SMART QUEUE DISPLAY
      </div>

      {/* MAIN */}
      <div className="flex flex-1">

        {/* LEFT - CURRENT TOKEN */}
        <div className="flex-1 flex flex-col items-center justify-center border-r border-gray-700">

          <h2 className="text-3xl mb-4 text-gray-400">
            NOW SERVING
          </h2>

          {current ? (
            <>
              <div className="text-8xl font-bold text-green-400 animate-pulse">
                {current.number}
              </div>

              <div className="mt-4 text-xl text-gray-300">
                Counter: {current.counter}
              </div>
            </>
          ) : (
            <div className="text-4xl text-gray-500">
              Waiting...
            </div>
          )}
        </div>

        {/* RIGHT - QUEUE LIST */}
        <div className="w-1/3 p-6">

          <h2 className="text-2xl mb-4 border-b border-gray-600 pb-2">
            Next Tokens
          </h2>

          {waiting.length === 0 ? (
            <p className="text-gray-500">No tokens waiting</p>
          ) : (
            waiting.map((t) => (
              <div
                key={t.number}
                className="bg-gray-800 p-4 mb-3 rounded flex justify-between items-center"
              >
                <span className="text-xl font-bold">
                  #{t.number}
                </span>

                <span className="text-yellow-400">
                  WAITING
                </span>
              </div>
            ))
          )}

        </div>

      </div>

      {/* FOOTER */}
      <div className="bg-gray-900 text-center p-2 text-sm text-gray-400">
        Powered by Smart Queue System
      </div>

    </div>
  );
}

export default Display;