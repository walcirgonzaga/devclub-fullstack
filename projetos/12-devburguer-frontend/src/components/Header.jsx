import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background: ${({ theme }) => theme.colors.secondary};
  color: #fff;
`;

const Logo = styled(Link)`
  font-weight: 700;
  font-size: 1.2rem;

  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 24px;
  font-weight: 600;
`;

const CartLink = styled(Link)`
  position: relative;
`;

const Badge = styled.span`
  position: absolute;
  top: -8px;
  right: -12px;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-size: 0.7rem;
  border-radius: 999px;
  padding: 2px 6px;
`;

const BotaoSair = styled.button`
  background: none;
  border: none;
  color: #b8b8c8;
  cursor: pointer;
  font-weight: 600;
`;

function Header() {
  const { user, logout, autenticado } = useAuth();
  const { quantidadeTotal } = useCart();
  const navegar = useNavigate();

  function aoSair() {
    logout();
    navegar("/login");
  }

  return (
    <Container>
      <Logo to="/">
        Dev<span>Burguer</span>
      </Logo>

      <Nav>
        <Link to="/">Home</Link>

        {autenticado && (
          <>
            <CartLink to="/carrinho">
              🛒 Carrinho
              {quantidadeTotal > 0 && <Badge>{quantidadeTotal}</Badge>}
            </CartLink>
            <Link to="/pedidos">Meus Pedidos</Link>
            {user?.admin && <Link to="/admin/produtos">Admin</Link>}
            <BotaoSair onClick={aoSair}>Sair</BotaoSair>
          </>
        )}

        {!autenticado && <Link to="/login">Entrar</Link>}
      </Nav>
    </Container>
  );
}

export default Header;
