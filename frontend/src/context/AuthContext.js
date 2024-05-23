import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
    token: null,
    role: null,
  });

  const login = (user, token, role) => {
    setAuth({ isAuthenticated: true, user, token, role });
  };

  const logout = () => {
    setAuth({ isAuthenticated: false, user: null, token: null, role: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
