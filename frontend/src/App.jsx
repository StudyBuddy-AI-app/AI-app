import { useState } from "react";
import { sendChatMessage } from "./api";
import "./styles.css";

function App() {
  const [mode, setMode] = useState("explain");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I am StudyBuddy AI. Choose a mode and ask me anything about your study topic.",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSend = async () => {
    if (!message.trim() || loading) return;

    const userMessage = {
      role: "user",
      content: message,
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const historyForBackend = updatedMessages
        .filter((msg, index) => index !== 0)
        .map((msg) => ({
          role: msg.role,
          content: msg.content,
        }));

      const result = await sendChatMessage({
        mode,
        message: userMessage.content,
        history: historyForBackend.slice(0, -1),
      });

      const botMessage = {
        role: "assistant",
        content: result.reply,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        role: "assistant",
        content:
          "Chat cleared. I am ready to help again. Choose a mode and start.",
      },
    ]);
    setError("");
    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>StudyBuddy AI</h1>
          <p>Your Level 2 AI study assistant</p>
        </header>

        <div className="controls">
          <div className="mode-group">
            <label>Mode:</label>
            <select value={mode} onChange={(e) => setMode(e.target.value)}>
              <option value="explain">Explain Mode</option>
              <option value="quiz">Quiz Mode</option>
            </select>
          </div>

          <button className="clear-btn" onClick={handleClearChat}>
            Clear Chat
          </button>
        </div>

        <div className="chat-box">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.role === "user" ? "user" : "assistant"}`}
            >
              <div className="message-role">
                {msg.role === "user" ? "You" : "StudyBuddy"}
              </div>
              <div className="message-content">{msg.content}</div>
            </div>
          ))}

          {loading && (
            <div className="message assistant">
              <div className="message-role">StudyBuddy</div>
              <div className="message-content">Thinking...</div>
            </div>
          )}
        </div>

        {error && <div className="error-box">{error}</div>}

        <div className="input-area">
          <textarea
            placeholder={
              mode === "explain"
                ? "Ask a topic to explain..."
                : "Ask for a quiz or answer the quiz question..."
            }
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            rows="4"
          />
          <button onClick={handleSend} disabled={loading}>
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;