const yup = require("yup");

const createProductSchema = yup.object({
  name: yup.string().required("Nome é obrigatório"),
  price: yup.number().positive("Preço precisa ser positivo").required("Preço é obrigatório"),
  category_id: yup.number().required("Categoria é obrigatória"),
  offer: yup.boolean(),
});

module.exports = { createProductSchema };
