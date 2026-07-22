# Cadastro de Usuários (React)

Front-end em React + Vite construído no módulo "React" da formação Full Stack Pro (DevClub). Consome a API [`09-node-api-usuarios`](../09-node-api-usuarios).

## Rodar

```bash
# 1. Suba a API (em outro terminal)
cd ../09-node-api-usuarios && npm start

# 2. Suba o front
npm install
npm run dev
```

Acesse `http://localhost:5173`.

## Estrutura

```
src/
  components/   Header, UsuarioCard (props + PropTypes)
  pages/        Cadastro (useRef), Listagem (useState + useEffect)
  services/     api.js — fetch para a API Node
```

## Conceitos aplicados

- JSX e componentização
- Props e PropTypes
- useRef (formulário de cadastro)
- useState / useEffect (listagem)
- React Router DOM (rotas `/` e `/usuarios`)
- Integração com API externa via fetch + CORS
