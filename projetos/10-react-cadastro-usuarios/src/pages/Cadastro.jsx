import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { criarUsuario } from "../services/api";
import "./Cadastro.css";

function Cadastro() {
  const refNome = useRef();
  const refEmail = useRef();
  const refIdade = useRef();
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);
  const navegar = useNavigate();

  async function aoSubmeter(evento) {
    evento.preventDefault();
    setErro("");

    const nome = refNome.current.value.trim();
    const email = refEmail.current.value.trim();
    const idade = refIdade.current.value;

    if (!nome || !email) {
      setErro("Nome e email são obrigatórios.");
      return;
    }

    try {
      setEnviando(true);
      await criarUsuario({ nome, email, idade: idade ? Number(idade) : null });
      navegar("/usuarios");
    } catch (erroRequisicao) {
      setErro(erroRequisicao.message);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <main className="cadastro">
      <form onSubmit={aoSubmeter}>
        <h1>Cadastro de Usuário</h1>

        <label htmlFor="nome">Nome</label>
        <input id="nome" ref={refNome} type="text" placeholder="Seu nome" />

        <label htmlFor="email">E-mail</label>
        <input id="email" ref={refEmail} type="email" placeholder="seu@email.com" />

        <label htmlFor="idade">Idade</label>
        <input id="idade" ref={refIdade} type="number" placeholder="Opcional" />

        {erro && <p className="erro">{erro}</p>}

        <button type="submit" disabled={enviando}>
          {enviando ? "Salvando..." : "Cadastrar"}
        </button>
      </form>
    </main>
  );
}

export default Cadastro;
