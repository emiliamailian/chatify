import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideNav from "../components/SideNav";

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

    const fetchMessages = async () => {
      const res = await fetch("https://chatify-api.up.railway.app/messages", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setMessages(data);
    };

    fetchMessages();
  }, [token, navigate]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMsg.trim()) return;

    const csrfRes = await fetch("https://chatify-api.up.railway.app/csrf", {
      method: "PATCH",
      credentials: "include",
    });
    const { csrfToken } = await csrfRes.json();

    await fetch("https://chatify-api.up.railway.app/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-CSRF-Token": csrfToken,
      },
      credentials: "include",
      body: JSON.stringify({ message: newMsg }),
    });

    setNewMsg("");
    const refetch = await fetch("https://chatify-api.up.railway.app/messages", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setMessages(await refetch.json());
  };

  const handleDelete = async (id) => {
    const csrfRes = await fetch("https://chatify-api.up.railway.app/csrf", {
      method: "PATCH",
      credentials: "include",
    });
    const { csrfToken } = await csrfRes.json();

    await fetch(`https://chatify-api.up.railway.app/messages/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "X-CSRF-Token": csrfToken,
      },
      credentials: "include",
    });

    setMessages(messages.filter((m) => m.id !== id));
  };

  return (
    <>
      <SideNav />
      <div style={{ marginLeft: "160px" }}>
        <h2>Chat</h2>
        <div>
          {Array.isArray(messages) &&
            messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  textAlign: msg.userId === user.sub ? "right" : "left",
                  border: "1px solid #ddd",
                  margin: "8px 0",
                  padding: "5px 10px",
                  borderRadius: "8px",
                }}
              >
                <p>{msg.message}</p>
                {msg.userId === user.sub && (
                  <button onClick={() => handleDelete(msg.id)}>Radera</button>
                )}
              </div>
            ))}
        </div>

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
