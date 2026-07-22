import styled from "styled-components";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

const URL_BASE = "http://localhost:3333";

const Container = styled.main`
  max-width: 700px;
  margin: 0 auto;
  padding: 40px 24px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  background: #fff;
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
`;

const Imagem = styled.img`
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 8px;
`;

const Info = styled.div`
  flex: 1;
`;

const Quantidade = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  button {
    width: 28px;
    height: 28px;
    border: 1px solid #e0e0f0;
    background: #fff;
    border-radius: 6px;
    cursor: pointer;
  }
`;

const BotaoRemover = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  font-size: 1.1rem;
`;

const Resumo = styled.div`
  margin-top: 24px;
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BotaoFinalizar = styled(Link)`
  padding: 12px 28px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-weight: 700;
`;

const Vazio = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  text-align: center;
  margin-top: 48px;
`;

function Cart() {
  const { itens, remover, alterarQuantidade, total } = useCart();

  if (itens.length === 0) {
    return (
      <Container>
        <Vazio>
          Seu carrinho está vazio. <Link to="/">Ver cardápio</Link>
        </Vazio>
      </Container>
    );
  }

  return (
    <Container>
      <h1>Meu Carrinho</h1>

      {itens.map((item) => (
        <Item key={item.id}>
          <Imagem src={`${URL_BASE}${item.url}`} alt={item.name} />
          <Info>
            <strong>{item.name}</strong>
            <p>{Number(item.price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
          </Info>
          <Quantidade>
            <button onClick={() => alterarQuantidade(item.id, item.quantidade - 1)}>-</button>
            <span>{item.quantidade}</span>
            <button onClick={() => alterarQuantidade(item.id, item.quantidade + 1)}>+</button>
          </Quantidade>
          <BotaoRemover onClick={() => remover(item.id)}>🗑️</BotaoRemover>
        </Item>
      ))}

      <Resumo>
        <span>
          Total: <strong>{total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</strong>
        </span>
        <BotaoFinalizar to="/checkout">Finalizar pedido</BotaoFinalizar>
      </Resumo>
    </Container>
  );
}

export default Cart;
