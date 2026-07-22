import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import api from "../services/api";
import { useCart } from "../contexts/CartContext";

const CHAVE_PUBLICA_STRIPE = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
const stripePromise = CHAVE_PUBLICA_STRIPE ? loadStripe(CHAVE_PUBLICA_STRIPE) : null;

const Container = styled.main`
  max-width: 480px;
  margin: 0 auto;
  padding: 40px 24px;
`;

const Card = styled.div`
  background: #fff;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
`;

const Botao = styled.button`
  margin-top: 24px;
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-weight: 700;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

function FormularioPagamento({ onSucesso }) {
  const stripe = useStripe();
  const elements = useElements();
  const [processando, setProcessando] = useState(false);

  async function aoConfirmar(evento) {
    evento.preventDefault();
    if (!stripe || !elements) return;

    setProcessando(true);
    const { error } = await stripe.confirmPayment({ elements, redirect: "if_required" });

    if (error) {
      toast.error(error.message);
      setProcessando(false);
      return;
    }

    onSucesso();
  }

  return (
    <form onSubmit={aoConfirmar}>
      <PaymentElement />
      <Botao type="submit" disabled={!stripe || processando}>
        {processando ? "Processando..." : "Pagar"}
      </Botao>
    </form>
  );
}

function Checkout() {
  const { itens, total, limpar } = useCart();
  const navegar = useNavigate();
  const [clientSecret, setClientSecret] = useState(null);
  const [pedidoCriado, setPedidoCriado] = useState(false);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function criarPedido() {
      const produtos = itens.map((item) => ({
        product_id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantidade,
      }));

      const { data } = await api.post("/orders", { products: produtos, total });

      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
      } else {
        // Sem Stripe configurado no backend: pedido já sai "pago" (modo demo)
        setPedidoCriado(true);
        limpar();
      }

      setCarregando(false);
    }

    if (itens.length > 0) {
      criarPedido();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function aoSucessoPagamento() {
    limpar();
    setPedidoCriado(true);
  }

  if (carregando) {
    return (
      <Container>
        <Card>Preparando pagamento...</Card>
      </Container>
    );
  }

  if (pedidoCriado) {
    return (
      <Container>
        <Card>
          <h1>Pedido confirmado! 🎉</h1>
          <p>Obrigado pela compra. Acompanhe o status em &quot;Meus Pedidos&quot;.</p>
          <Botao onClick={() => navegar("/pedidos")}>Ver meus pedidos</Botao>
        </Card>
      </Container>
    );
  }

  return (
    <Container>
      <Card>
        <h1>Pagamento</h1>
        <p>
          Total: <strong>{total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</strong>
        </p>

        {stripePromise && clientSecret ? (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <FormularioPagamento onSucesso={aoSucessoPagamento} />
          </Elements>
        ) : (
          <p>Stripe não configurado (defina VITE_STRIPE_PUBLIC_KEY no front-end).</p>
        )}
      </Card>
    </Container>
  );
}

export default Checkout;
