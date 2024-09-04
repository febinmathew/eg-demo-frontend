import { useContext, useState } from "react";
import axios from "../../api/axios";
import { AuthContext } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [error, setError] = useState<string>("");
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
      if (response.status == 201) {
        login(response.data.access_token);
        navigate("/");
      }
    } catch (e) {
      console.error("Login failed", e, typeof e);
      if (e.status == 401) setError(e.response.data.message);
      else if (e.status == 429) {
        setError("Too many requests. Please slow down!");
      } else if (e.status == 400) {
        setError("Some of the fields does not meet the required constraints!");
      } else {
        setError("Unknown error occurred!");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-violet-500 to-indigo-600">
      <div className="max-w-md w-full bg-white p-8 border border-gray-200 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Login</h1>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100 h-12 px-4"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100 h-12 px-4"
              required
            />
          </div>
          {error && (
            <p className="my-2 text-sm text-red-800 text-center">{error}</p>
          )}
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Login
          </button>
          <p className="text-sm mt-1">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </form>
        {/* {error && (
          <p
            id="email-error"
            className="mt-4 text-sm text-white bg-red-600 p-2 rounded-md text-center"
          >
            {error}
          </p>
        )} */}
      </div>
    </div>
  );
}

export default Login;
