import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const CartContext = createContext({});

export function CartProvider({ children }) {
  const [itens, setItens] = useState(() => {
    const salvo = localStorage.getItem("@devburguer:cart");
    return salvo ? JSON.parse(salvo) : [];
  });

  function persistir(novosItens) {
    setItens(novosItens);
    localStorage.setItem("@devburguer:cart", JSON.stringify(novosItens));
  }

  function adicionar(produto) {
    const existente = itens.find((item) => item.id === produto.id);

    if (existente) {
      persistir(
        itens.map((item) =>
          item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item
        )
      );
    } else {
      persistir([...itens, { ...produto, quantidade: 1 }]);
    }
  }

  function remover(id) {
    persistir(itens.filter((item) => item.id !== id));
  }

  function alterarQuantidade(id, quantidade) {
    if (quantidade < 1) return remover(id);
    persistir(itens.map((item) => (item.id === id ? { ...item, quantidade } : item)));
  }

  function limpar() {
    persistir([]);
  }

  const total = itens.reduce((soma, item) => soma + item.price * item.quantidade, 0);
  const quantidadeTotal = itens.reduce((soma, item) => soma + item.quantidade, 0);

  return (
    <CartContext.Provider
      value={{ itens, adicionar, remover, alterarQuantidade, limpar, total, quantidadeTotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useCart() {
  return useContext(CartContext);
}
