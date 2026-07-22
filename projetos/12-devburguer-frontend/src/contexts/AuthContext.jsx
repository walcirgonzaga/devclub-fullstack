import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import api from "../services/api";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const salvo = localStorage.getItem("@devburguer:user");
    return salvo ? JSON.parse(salvo) : null;
  });

  async function login(email, password) {
    const { data } = await api.post("/sessions", { email, password });

    localStorage.setItem("@devburguer:token", data.token);
    localStorage.setItem("@devburguer:user", JSON.stringify(data.user));
    setUser(data.user);

    return data.user;
  }

  async function register(name, email, password) {
    await api.post("/users", { name, email, password });
    return login(email, password);
  }

  function logout() {
    localStorage.removeItem("@devburguer:token");
    localStorage.removeItem("@devburguer:user");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, autenticado: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useAuth() {
  return useContext(AuthContext);
}
