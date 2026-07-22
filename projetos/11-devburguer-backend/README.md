# DevBurguer — API

Backend do projeto final da formação Full Stack Pro (DevClub): e-commerce de hambúrgueres.

**Stack:** Node.js, Express, Sequelize (SQLite), MongoDB (via `mongodb-memory-server`), JWT, Multer, Yup, Stripe.

> Adaptação: o curso usa PostgreSQL + Docker + MongoDB real. Aqui uso SQLite (mesma arquitetura Sequelize/MVC, zero configuração) e `mongodb-memory-server` (Mongo real, mas auto-gerenciado — sobe junto com o processo, sem precisar instalar/serviço externo). Stripe funciona em modo teste; sem chave configurada, pedidos são criados direto como "pago" (modo demo).

## Rodar

```bash
npm install
cp .env.example .env      # ajuste JWT_SECRET e, se quiser, STRIPE_SECRET_KEY
npm run migrate           # cria as tabelas (SQLite)
npm run seed               # cria usuário admin + categorias + produtos de exemplo
npm start                  # ou: npm run dev (com reload automático)
```

Servidor sobe em `http://localhost:3333`. Login de admin criado pelo seed: `admin@devburguer.com` / `admin123`.

## Rotas

| Método | Rota              | Auth        | Descrição                        |
|--------|-------------------|-------------|-----------------------------------|
| POST   | /users            | -           | Cria usuário                      |
| POST   | /sessions         | -           | Login (retorna JWT)                |
| GET    | /categories       | -           | Lista categorias                  |
| GET    | /products         | -           | Lista produtos (`?category_id=`, `?offer=true`) |
| POST   | /categories       | admin       | Cria categoria (multipart, campo `file`) |
| PUT    | /categories/:id   | admin       | Edita categoria                   |
| POST   | /products         | admin       | Cria produto (multipart, campo `file`) |
| PUT    | /products/:id     | admin       | Edita produto                     |
| DELETE | /products/:id     | admin       | Remove produto                    |
| POST   | /orders           | usuário     | Cria pedido (gera Payment Intent se Stripe configurado) |
| GET    | /orders           | usuário     | Lista pedidos do usuário logado    |
| PATCH  | /orders/:id       | usuário     | Atualiza status do pedido          |

Rotas autenticadas exigem header `Authorization: Bearer <token>`.

## Conceitos aplicados

- Arquitetura MVC (models / controllers / routes)
- Migrations com Sequelize CLI
- Relacionamento 1:N (Category → Products)
- Hash de senha com bcrypt + campo virtual
- Autenticação JWT + middleware de admin
- Upload de imagens com Multer
- Validação de dados com Yup
- Banco NoSQL (MongoDB/Mongoose) para pedidos
- Integração com Stripe (Payment Intents)
