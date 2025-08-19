import { useNavigate } from "react-router-dom";

export default function SideNav() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div
      style={{
        width: "150px",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        backgroundColor: "#f4f4f4",
        padding: "20px",
      }}
    >
      <button onClick={handleLogout}>Logga ut</button>
    </div>
  );
}
