import { createContext, useState, useEffect, ReactNode } from "react";
import axios from "../../api/axios";
import { isAuthenticated, removeToken, saveToken } from "../../utils/auth";

interface AuthContextProps {
  isAuthenticated: boolean;
  user: any;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: isAuthenticated(),
    user: null,
  });

  useEffect(() => {
    if (auth.isAuthenticated) {
      axios
        .get("/user/user-data")
        .then((response) => {
          setAuth((prev) => ({
            ...prev,
            isAuthenticated: true,
            user: response.data,
          }));
        })
        .catch(() => {
          setAuth((prev) => ({ ...prev, isAuthenticated: false, user: null }));
          removeToken();
        });
    }
  }, [auth.isAuthenticated]);

  const login = (token: string) => {
    saveToken(token);
    setAuth({
      isAuthenticated: true,
      user: null,
    });
  };

  const logout = () => {
    removeToken();
    setAuth({
      isAuthenticated: false,
      user: null,
    });
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
