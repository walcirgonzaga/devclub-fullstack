# DevBurguer — Front-end

Front-end do projeto final da formação Full Stack Pro (DevClub): e-commerce de hambúrgueres. Consome a API [`11-devburguer-backend`](../11-devburguer-backend).

**Stack:** React + Vite, React Router DOM, Styled-Components, React Hook Form, React Toastify, Stripe Elements, Axios.

## Rodar

```bash
# 1. Suba a API (em outro terminal) — veja ../11-devburguer-backend/README.md
cd ../11-devburguer-backend && npm start

# 2. Suba o front
npm install
cp .env.example .env   # opcional: só necessário se for testar pagamento real via Stripe
npm run dev
```

Acesse `http://localhost:5173`. Login de admin (criado pelo seed do backend): `admin@devburguer.com` / `admin123`.

## Fluxo

- **Home** (`/`) — cardápio público, filtro por categoria, adicionar ao carrinho
- **Login / Registrar** — autenticação JWT
- **Carrinho** (`/carrinho`) — ajustar quantidade, remover itens
- **Checkout** (`/checkout`) — cria o pedido na API; se `VITE_STRIPE_PUBLIC_KEY` estiver configurada, mostra o formulário de pagamento (Stripe Elements); caso contrário, confirma o pedido direto (modo demo)
- **Meus Pedidos** (`/pedidos`) — histórico do usuário logado
- **Admin** (`/admin/*`, somente `admin: true`) — CRUD de produtos (com upload de imagem) e gestão de status dos pedidos

## Estrutura

```
src/
  components/   Header, ProductCard, PrivateRoute
  contexts/     AuthContext (JWT + localStorage), CartContext (carrinho)
  pages/        Login, Register, Home, Cart, Checkout, Orders
  pages/admin/  AdminLayout, AdminProducts, AdminProductForm, AdminOrders
  services/     api.js — instância axios com interceptor de token
  styles/       theme.js, GlobalStyle.js
```

## Conceitos aplicados

- Componentização, props e PropTypes
- Context API (autenticação e carrinho, persistidos em localStorage)
- React Hook Form (login, registro, formulário de produto)
- React Router DOM (rotas públicas, privadas e admin-only)
- Styled-Components com tema global
- Integração com API externa (Axios + interceptor JWT)
- Upload de arquivo via FormData
- Stripe Elements (Payment Intents) com fallback para modo demo
