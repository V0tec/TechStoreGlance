import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(username, password);
    if (success) {
      navigate("/profile");
    } else {
      setError("Невірний логін або пароль");
    }
  };

  const goToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="login-page">
      <h2>Вхід</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Пошта"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Увійти</button>
      </form>
      <button onClick={goToRegister} style={{ marginTop: "10px" }}>
        Зареєструватися
      </button>
    </div>
  );
}

export default LoginPage;
