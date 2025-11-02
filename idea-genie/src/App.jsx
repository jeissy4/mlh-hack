import ReactMarkdown from "react-markdown";
import { useState } from "react";
import { askGenie } from "./gemini.js";
import { motion } from "framer-motion";
import "./index.css"; 

function App() {
  const [input, setInput] = useState("");
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const response = await askGenie(input);
    setIdea(response);
    setLoading(false);
  };

  return (
    <div className="app">
      <motion.h1
        className="title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        🧞‍♂️ Idea Genie
      </motion.h1>

      <input
        type="text"
        placeholder="Ask for an idea..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="input"
      />

      <button onClick={handleAsk} className="button">
        {loading ? "✨ Thinking..." : "Ask Genie"}
      </button>

      {idea && (
        <motion.div
          className="idea-box"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
              <ReactMarkdown>{idea}</ReactMarkdown>
        </motion.div>
      )}
    </div>
  );
}

export default App;
