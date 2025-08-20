import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideNav from "../components/SideNav";
import { createMessage, deleteMessage, getMessages } from "../api/chatService";
import DOMPurify from "dompurify";

export default function Chat() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    (async () => {
      const res = await getMessages();
      if (res.success) setMessages(res.data);
    })();
  }, [token, navigate]);

  const handleSend = async (e) => {
    e.preventDefault();
    const clean = DOMPurify.sanitize(newMsg);
    const res = await createMessage(clean);
    if (res.success) {
      setMessages([...messages, res.data]);
      setNewMsg("");
    }
  };

  const handleDel = async (id) => {
    await deleteMessage(id);
    setMessages(messages.filter((m) => m.id !== id));
  };

  return (
    <>
      <SideNav />
      <div style={{ marginLeft: "170px" }}>
        <h2>Chat</h2>

        {Array.isArray(messages) &&
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`chat-bubble ${
                msg.userId === user.sub ? "bubble-right" : "bubble-left"
              }`}
            >
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <img
                  src={msg.avatar}
                  alt="avatar"
                  width="30"
                  height="30"
                  style={{ borderRadius: "50%" }}
                />
                <strong>{msg.username}</strong>
              </div>
              <p dangerouslySetInnerHTML={{ __html: msg.message }}></p>
              {msg.userId === user.sub && (
                <button onClick={() => handleDel(msg.id)}>Radera</button>
              )}
            </div>
          ))}

        <form onSubmit={handleSend}>
          <input
            type="text"
            placeholder="Skriv meddelande..."
            value={newMsg}
            onChange={(e) => setNewMsg(e.target.value)}
          />
          <button type="submit">Skicka</button>
        </form>
      </div>
    </>
  );
}
