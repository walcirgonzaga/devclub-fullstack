import { useEffect, useState } from "react";
import styled from "styled-components";
import api from "../services/api";

const Container = styled.main`
  max-width: 700px;
  margin: 0 auto;
  padding: 40px 24px;
`;

const Pedido = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
`;

const Cabecalho = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const StatusTag = styled.span`
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #fff;
  background: ${({ theme, $status }) =>
    $status === "pago" ? theme.colors.success : $status === "cancelado" ? theme.colors.danger : "#f0932b"};
`;

const Vazio = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  text-align: center;
  margin-top: 48px;
`;

function Orders() {
  const [pedidos, setPedidos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    api.get("/orders").then((res) => {
      setPedidos(res.data);
      setCarregando(false);
    });
  }, []);

  if (carregando) return null;

  if (pedidos.length === 0) {
    return (
      <Container>
        <Vazio>Você ainda não fez nenhum pedido.</Vazio>
      </Container>
    );
  }

  return (
    <Container>
      <h1>Meus Pedidos</h1>

      {pedidos.map((pedido) => (
        <Pedido key={pedido._id}>
          <Cabecalho>
            <span>{new Date(pedido.createdAt).toLocaleString("pt-BR")}</span>
            <StatusTag $status={pedido.status}>{pedido.status}</StatusTag>
          </Cabecalho>
          <ul>
            {pedido.products.map((produto) => (
              <li key={produto.product_id}>
                {produto.quantity}x {produto.name}
              </li>
            ))}
          </ul>
          <strong>
            Total: {pedido.total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </strong>
        </Pedido>
      ))}
    </Container>
  );
}

export default Orders;
