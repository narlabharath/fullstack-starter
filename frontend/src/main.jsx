import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "../dist/output.css";

function App() {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [endpoint, setEndpoint] = useState("hello");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Loading...");

    const url = `https://literate-fishstick-7r94xw99rv9cxwvq-5000.app.github.dev/api/${endpoint}`;
    const payload = endpoint === "hello" ? { name: input } : { word: input };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setMessage(data.message || data.result || "✅ Received but empty");
    } catch (err) {
      console.error("Fetch error:", err);
      setMessage("Error connecting to Flask.");
    }
  };

  return (
    <div className="h-[667px] w-[375px] bg-white text-black rounded-[2rem] shadow-2xl p-6 flex flex-col justify-between">
      <div className="text-center text-lg font-bold text-blue-700">
        Fullstack Starter 🔥
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 mt-6">
        <select
          value={endpoint}
          onChange={(e) => setEndpoint(e.target.value)}
          className="w-full p-3 rounded border bg-gray-100"
        >
          <option value="hello">/api/hello</option>
          <option value="repeat">/api/repeat</option>
        </select>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter something..."
          className="w-full p-3 rounded border text-black placeholder-gray-500"
        />

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-500 font-semibold"
        >
          Send to Flask
        </button>
      </form>

      <div className="text-center mt-6 text-blue-700 font-medium break-words">
        {message}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
