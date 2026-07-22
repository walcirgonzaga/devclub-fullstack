import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UsuarioCard from "../components/UsuarioCard";
import { listarUsuarios, removerUsuario } from "../services/api";
import "./Listagem.css";

function Listagem() {
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    buscarUsuarios();
  }, []);

  async function buscarUsuarios() {
    setCarregando(true);
    const dados = await listarUsuarios();
    setUsuarios(dados);
    setCarregando(false);
  }

  async function aoRemover(id) {
    await removerUsuario(id);
    setUsuarios((atual) => atual.filter((usuario) => usuario.id !== id));
  }

  if (carregando) {
    return <p className="status">Carregando usuários...</p>;
  }

  return (
    <main className="listagem">
      <h1>Usuários cadastrados</h1>

      {usuarios.length === 0 ? (
        <p className="status">
          Nenhum usuário cadastrado ainda. <Link to="/">Cadastrar o primeiro</Link>
        </p>
      ) : (
        <ul>
          {usuarios.map((usuario) => (
            <UsuarioCard key={usuario.id} usuario={usuario} aoRemover={aoRemover} />
          ))}
        </ul>
      )}
    </main>
  );
}

export default Listagem;
