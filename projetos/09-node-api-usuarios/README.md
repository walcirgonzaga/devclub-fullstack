# API de Cadastro de Usuários

API REST simples feita com Node.js + Express, construída no módulo "Node" da formação Full Stack Pro (DevClub).

## Rodar

```bash
npm install
npm start
```

Servidor sobe em `http://localhost:3000`.

## Rotas

| Método | Rota            | Descrição                              |
|--------|-----------------|-----------------------------------------|
| GET    | /usuarios       | Lista todos (aceita `?nome=` para filtrar) |
| GET    | /usuarios/:id   | Busca um usuário pelo id                |
| POST   | /usuarios       | Cria usuário (`nome`, `email`, `idade`) |
| PUT    | /usuarios/:id   | Edita usuário                           |
| DELETE | /usuarios/:id   | Remove usuário                          |

## Conceitos aplicados

- Rotas GET/POST/PUT/DELETE
- Query params, route params e body params
- Persistência simples em arquivo JSON (`usuarios.json`)
- Validação de campos obrigatórios e e-mail duplicado
