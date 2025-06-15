import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

// ✅ Authentication Context에서 useAuth 커스텀 훅도 export 해줍시다.
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/me", { withCredentials: true })
      .then(res => setUser(res.data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = () =>
    axios.get("/api/me", { withCredentials: true })
      .then(res => setUser(res.data.user));

  const logout = () =>
    axios.post("/api/logout", {}, { withCredentials: true })
      .then(() => setUser(null));

  return (
    <AuthContext.Provider value={{ user, loading, isLogged: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
