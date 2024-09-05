import { useState } from "react";
import axios from "../../api/axios";
import { Link, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import UserDto from "../../types/UserDto";

function Register() {
  const [error, setError] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const navigate = useNavigate();
  const validateFields = (): boolean => {
    const hasAtLeast1Letter = /[a-zA-Z]/.test(password.trim());
    const hasAtLeast1Number = /\d/.test(password.trim());
    const hasAtLeast1SpecialCharacter =
      /[!"#$%&'()*+,-.:;<=>?@[\]^_`{|}~]/.test(password.trim());
    if (password.length < 8) {
      setError("Password must have at least 8 characters");
      return false;
    } else if (!hasAtLeast1Letter) {
      setError("Password must have at least 1 letter");
      return false;
    } else if (!hasAtLeast1Number) {
      setError("Password must have at least 1 number");
      return false;
    } else if (!hasAtLeast1SpecialCharacter) {
      setError("Password must have at least 1 special character");
      return false;
    } else if (password != confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateFields()) {
      return;
    }
    try {
      const response = await axios.post<UserDto>("/auth/register", {
        name,
        email,
        password,
      });
      if (response.status == 201) {
        navigate("/login");
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        console.error("Registration failed", e);
        if (e.status == 409) {
          setError("Email already exists!");
        } else if (e.status == 429) {
          setError("Too many requests. Please slow down!");
        } else if (e.status == 400) {
          setError(
            "Some of the fields does not meet the required constraints!"
          );
        } else {
          setError("Unknown error occurred!");
        }
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
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
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
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setError("");
              }}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100 h-12 px-4"
              required
            />
          </div>
          {error && (
            <p className="my-2 text-sm text-red-800 text-center">{error}</p>
          )}
          <button className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
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
