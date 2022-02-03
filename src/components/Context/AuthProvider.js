import React, { useState, createContext, useEffect } from "react";

const AuthContext = createContext({
  isAuthenticated: false,
});

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    JSON.parse(localStorage.getItem("isAuthenticated"))
  );

  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated);
  }, isAuthenticated);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
