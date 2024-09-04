import { useState } from "react";
import axios from "../../api/axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [error, setError] = useState<string>("");
  const [name, setName] = useState<string>("Febin Mathew");
  const [email, setEmail] = useState<string>("fmfebinmathew4@gmail.com");
  const [password, setPassword] = useState<string>("f$123sdfsdfsdf");
  const [confirmPassword, setConfirmPassword] =
    useState<string>("f$123sdfsdfsdf");
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
    } catch (e) {
      console.error("Login failed", e);
      if (e.status == 409) {
        setError("Email already exists!");
      } else if (e.status == 429) {
        setError("Too many requests. Please slow down!");
      } else {
        setError("Unknown error occurred!");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-violet-500 to-indigo-600">
      <div className="max-w-md w-full bg-white p-8 border border-gray-200 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Register</h1>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label
              htmlFor="text"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100 h-12 px-4"
              required
            />
          </div>
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
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100 h-12 px-4"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            Register
          </button>
        </form>
        <p className="text-sm mt-1">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
