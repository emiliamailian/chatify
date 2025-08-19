import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./pages/Chat";

function App() {
  // kolla om token finns i localStorage
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
        {/* default-route */}
        <Route
          path="*"
          element={<Navigate to={token ? "/chat" : "/login"} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
