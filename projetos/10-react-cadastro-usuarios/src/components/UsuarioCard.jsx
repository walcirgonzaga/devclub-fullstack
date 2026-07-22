import PropTypes from "prop-types";
import "./UsuarioCard.css";

function UsuarioCard({ usuario, aoRemover }) {
  return (
    <li className="usuario-card">
      <div>
        <strong>{usuario.nome}</strong>
        <span>{usuario.email}</span>
        {usuario.idade && <span className="idade">{usuario.idade} anos</span>}
      </div>
      <button onClick={() => aoRemover(usuario.id)} aria-label={`Remover ${usuario.nome}`}>
        🗑️
      </button>
    </li>
  );
}

UsuarioCard.propTypes = {
  usuario: PropTypes.shape({
    id: PropTypes.string.isRequired,
    nome: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    idade: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }).isRequired,
  aoRemover: PropTypes.func.isRequired,
};

export default UsuarioCard;
