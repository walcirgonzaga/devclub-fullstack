import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";

const URL_BASE = "http://localhost:3333";

const Tabela = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;

  th,
  td {
    padding: 12px 16px;
    text-align: left;
    border-bottom: 1px solid ${({ theme }) => theme.colors.background};
  }

  th {
    color: ${({ theme }) => theme.colors.textLight};
    font-size: 0.8rem;
    text-transform: uppercase;
  }
`;

const Miniatura = styled.img`
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 8px;
`;

const BotaoAcao = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.danger};
  font-weight: 600;
`;

function AdminProducts() {
  const [produtos, setProdutos] = useState([]);

  async function carregar() {
    const { data } = await api.get("/products");
    setProdutos(data);
  }

  useEffect(() => {
    carregar();
  }, []);

  async function aoRemover(id) {
    await api.delete(`/products/${id}`);
    toast.success("Produto removido");
    carregar();
  }

  return (
    <div>
      <h1>Produtos</h1>
      <Tabela>
        <thead>
          <tr>
            <th></th>
            <th>Nome</th>
            <th>Categoria</th>
            <th>Preço</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => (
            <tr key={produto.id}>
              <td>
                <Miniatura src={`${URL_BASE}${produto.url}`} alt={produto.name} />
              </td>
              <td>{produto.name}</td>
              <td>{produto.category?.name}</td>
              <td>
                {Number(produto.price).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </td>
              <td>
                <Link to={`/admin/produtos/${produto.id}/editar`}>Editar</Link>{" "}
                <BotaoAcao onClick={() => aoRemover(produto.id)}>Remover</BotaoAcao>
              </td>
            </tr>
          ))}
        </tbody>
      </Tabela>
    </div>
  );
}

export default AdminProducts;
