import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./pages/Chat";

export default function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/register"
          element={!token ? <Register /> : <Navigate to="/chat" />}
        />
        <Route
          path="/login"
          element={!token ? <Login /> : <Navigate to="/chat" />}
        />
        <Route
          path="/chat"
          element={token ? <Chat /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
