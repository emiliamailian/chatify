import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authService";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await login({ username, password });
    if (!res.success) {
      setError(res.message);
      return;
    }

    const access_token = res.data?.access_token;
    if (!access_token) {
      setError("Ingen token mottogs från API (login misslyckades)");
      return;
    }

    const decoded = jwtDecode(access_token);
    localStorage.setItem("token", access_token);
    localStorage.setItem("user", JSON.stringify(decoded));
    navigate("/chat");
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Logga in</button>
      </form>
    </div>
  );
}
