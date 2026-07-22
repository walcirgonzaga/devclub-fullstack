import { useEffect, useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import api from "../../services/api";

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

const Select = styled.select`
  padding: 6px;
  border-radius: 6px;
  border: 1px solid #e0e0f0;
`;

function AdminOrders() {
  const [pedidos, setPedidos] = useState([]);

  async function carregar() {
    const { data } = await api.get("/orders/all");
    setPedidos(data);
  }

  useEffect(() => {
    carregar();
  }, []);

  async function aoAlterarStatus(id, status) {
    await api.patch(`/orders/${id}`, { status });
    toast.success("Status atualizado");
    carregar();
  }

  return (
    <div>
      <h1>Pedidos</h1>
      <Tabela>
        <thead>
          <tr>
            <th>Data</th>
            <th>Usuário</th>
            <th>Itens</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido) => (
            <tr key={pedido._id}>
              <td>{new Date(pedido.createdAt).toLocaleString("pt-BR")}</td>
              <td>#{pedido.user_id}</td>
              <td>{pedido.products.reduce((soma, p) => soma + p.quantity, 0)} itens</td>
              <td>
                {pedido.total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </td>
              <td>
                <Select
                  value={pedido.status}
                  onChange={(evento) => aoAlterarStatus(pedido._id, evento.target.value)}
                >
                  <option value="pendente">Pendente</option>
                  <option value="pago">Pago</option>
                  <option value="cancelado">Cancelado</option>
                </Select>
              </td>
            </tr>
          ))}
        </tbody>
      </Tabela>
    </div>
  );
}

export default AdminOrders;
