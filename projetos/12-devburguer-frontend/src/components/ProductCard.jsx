import PropTypes from "prop-types";
import styled from "styled-components";
import { useCart } from "../contexts/CartContext";
import { toast } from "react-toastify";

const URL_BASE = "http://localhost:3333";

const Card = styled.article`
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  min-width: 220px;
`;

const Imagem = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
`;

const Info = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Preco = styled.strong`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.1rem;
`;

const BotaoAdicionar = styled.button`
  margin-top: 8px;
  padding: 10px;
  border: none;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.secondary};
  color: #fff;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
  }
`;

function ProductCard({ produto }) {
  const { adicionar } = useCart();

  function aoAdicionar() {
    adicionar(produto);
    toast.success(`${produto.name} adicionado ao carrinho!`);
  }

  return (
    <Card>
      <Imagem src={`${URL_BASE}${produto.url}`} alt={produto.name} />
      <Info>
        <span>{produto.name}</span>
        <Preco>
          {Number(produto.price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
        </Preco>
        <BotaoAdicionar onClick={aoAdicionar}>Adicionar</BotaoAdicionar>
      </Info>
    </Card>
  );
}

ProductCard.propTypes = {
  produto: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    url: PropTypes.string,
  }).isRequired,
};

export default ProductCard;
