import { useContext, useState } from "react";
import axios from "../../api/axios";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState<string>("fmfebinmathew4@gmail.com");
  const [password, setPassword] = useState<string>("f$123sdfsdfsdf");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post<{ access_token: string }>(
        "/auth/login",
        {
          email,
          password,
        }
      );

      login(response.data.access_token);
      navigate("/");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
