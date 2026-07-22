const { Product, Category } = require("../../models");
const { createProductSchema } = require("../schemas/ProductSchema");

class ProductController {
  async index(req, res) {
    const { category_id, offer } = req.query;
    const where = {};

    if (category_id) where.category_id = category_id;
    if (offer) where.offer = offer === "true";

    const products = await Product.findAll({
      where,
      include: { model: Category, as: "category", attributes: ["name"] },
    });

    return res.json(products);
  }

  async store(req, res) {
    try {
      await createProductSchema.validate(req.body);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }

    const { name, price, category_id, offer } = req.body;
    const url = req.file ? `/uploads/${req.file.filename}` : null;

    const categoria = await Category.findByPk(category_id);
    if (!categoria) {
      return res.status(400).json({ error: "Categoria não encontrada" });
    }

    const product = await Product.create({
      name,
      price,
      category_id,
      url,
      offer: offer === "true" || offer === true,
    });

    return res.status(201).json(product);
  }

  async update(req, res) {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    const url = req.file ? `/uploads/${req.file.filename}` : product.url;
    const { name, price, category_id, offer } = req.body;

    await product.update({
      name: name ?? product.name,
      price: price ?? product.price,
      category_id: category_id ?? product.category_id,
      offer: offer ?? product.offer,
      url,
    });

    return res.json(product);
  }

  async delete(req, res) {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    await product.destroy();
    return res.json({ message: "Produto removido" });
  }
}

module.exports = new ProductController();
