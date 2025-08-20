import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/authService";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    avatar: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const result = await registerUser(form);
    if (!result.success) {
      setError(result.message);
      return;
    }

    alert("Registrerad! Logga in nu.");
    navigate("/login");
  };

  return (
    <div>
      <h2>Registrera</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Användarnamn"
          name="username"
          value={form.username}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Lösenord"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Avatar URL (valfritt)"
          name="avatar"
          value={form.avatar}
          onChange={handleChange}
        />
        <button type="submit">Registrera</button>
      </form>
    </div>
  );
}
