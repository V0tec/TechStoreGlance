import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validatePassword = (password: string): boolean => {
    // Вимоги: мінімум 8 символів, хоча б одна велика літера, хоча б одна цифра
    const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePassword(password)) {
      setError(
        "Пароль має містити щонайменше 8 символів, одну велику літеру та одну цифру."
      );
      return;
    }

    const success = register(email, password, firstName, lastName);
    if (success) {
      navigate("/profile");
    } else {
      setError("Такий користувач вже існує.");
    }
  };

  return (
    <div className="register-page">
      <form onSubmit={handleSubmit}>
        <h2>Реєстрація</h2>

        <input
          type="text"
          placeholder="Ім'я"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Прізвище"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Пошта"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Зареєструватися</button>

        {error && <p>{error}</p>}
      </form>
    </div>
  );
}

export default Register;
