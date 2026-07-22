const yup = require("yup");

const createUserSchema = yup.object({
  name: yup.string().required("Nome é obrigatório"),
  email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  password: yup.string().min(6, "Senha precisa ter ao menos 6 caracteres").required("Senha é obrigatória"),
});

module.exports = { createUserSchema };
