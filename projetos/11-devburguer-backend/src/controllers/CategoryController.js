const { Category } = require("../../models");

class CategoryController {
  async index(req, res) {
    const categories = await Category.findAll();
    return res.json(categories);
  }

  async store(req, res) {
    const { name } = req.body;
    const url = req.file ? `/uploads/${req.file.filename}` : null;

    const nomeExiste = await Category.findOne({ where: { name } });
    if (nomeExiste) {
      return res.status(409).json({ error: "Categoria já existe" });
    }

    const category = await Category.create({ name, url });
    return res.status(201).json(category);
  }

  async update(req, res) {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }

    const url = req.file ? `/uploads/${req.file.filename}` : category.url;
    await category.update({ name: req.body.name || category.name, url });

    return res.json(category);
  }
}

module.exports = new CategoryController();
