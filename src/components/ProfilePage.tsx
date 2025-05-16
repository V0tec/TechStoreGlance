import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <h2>Профіль користувача</h2>
      <p>
        Ви авторизовані як: <strong>admin</strong>
      </p>
      <button onClick={handleLogout}>Вийти</button>
    </div>
  );
}

export default ProfilePage;
