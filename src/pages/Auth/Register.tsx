import { useState } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState<string>("Febin Mathew");
  const [email, setEmail] = useState<string>("fmfebinmathew4@gmail.com");
  const [password, setPassword] = useState<string>("f$123sdfsdfsdf");
  const navigate = useNavigate();
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post<{ email: string; name: string }>(
        "/auth/register",
        {
          name,
          email,
          password,
        }
      );

      navigate("/login");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleRegister}>
        <label>
          Name:
          <input
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
