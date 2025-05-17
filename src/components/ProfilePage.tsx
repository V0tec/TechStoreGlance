import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const { logout, firstName } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="profile-page">
      <h2>Профіль користувача</h2>
      <p>
        Ви авторизовані як: <strong>{firstName || "користувач"}</strong>
      </p>
      <button onClick={handleLogout}>Вийти</button>
    </div>
  );
}

export default ProfilePage;
