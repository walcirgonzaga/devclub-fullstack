import { NavLink } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <span className="logo">Cadastro de Usuários</span>
      <nav>
        <NavLink to="/" end className={({ isActive }) => (isActive ? "ativo" : "")}>
          Cadastro
        </NavLink>
        <NavLink to="/usuarios" className={({ isActive }) => (isActive ? "ativo" : "")}>
          Listagem
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
