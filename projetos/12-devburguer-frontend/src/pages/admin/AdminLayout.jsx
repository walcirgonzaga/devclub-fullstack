import styled from "styled-components";
import { NavLink, Outlet } from "react-router-dom";

const Container = styled.div`
  display: flex;
  min-height: calc(100vh - 68px);
`;

const Sidebar = styled.aside`
  width: 220px;
  background: #fff;
  padding: 32px 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ItemMenu = styled(NavLink)`
  padding: 12px 24px;
  color: ${({ theme }) => theme.colors.textLight};
  font-weight: 600;

  &.ativo {
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.background};
    border-right: 3px solid ${({ theme }) => theme.colors.primary};
  }
`;

const Conteudo = styled.div`
  flex: 1;
  padding: 32px;
`;

function AdminLayout() {
  return (
    <Container>
      <Sidebar>
        <ItemMenu to="/admin/produtos" className={({ isActive }) => (isActive ? "ativo" : "")}>
          Produtos
        </ItemMenu>
        <ItemMenu to="/admin/produtos/novo" className={({ isActive }) => (isActive ? "ativo" : "")}>
          Novo Produto
        </ItemMenu>
        <ItemMenu to="/admin/pedidos" className={({ isActive }) => (isActive ? "ativo" : "")}>
          Pedidos
        </ItemMenu>
      </Sidebar>
      <Conteudo>
        <Outlet />
      </Conteudo>
    </Container>
  );
}

export default AdminLayout;
