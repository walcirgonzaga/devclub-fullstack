require("dotenv/config");
const app = require("./app");
const connectMongo = require("./mongo/connection");

const PORTA = process.env.PORT || 3333;

connectMongo()
  .then(() => {
    app.listen(PORTA, () => {
      console.log(`DevBurguer API rodando em http://localhost:${PORTA}`);
    });
  })
  .catch((err) => {
    console.error("Erro ao conectar no MongoDB:", err);
    process.exit(1);
  });
