const { User } = require("../../models");
const { createUserSchema } = require("../schemas/UserSchema");

class UserController {
  async store(req, res) {
    try {
      await createUserSchema.validate(req.body);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }

    const { name, email, password } = req.body;

    const emailExiste = await User.findOne({ where: { email } });
    if (emailExiste) {
      return res.status(409).json({ error: "Já existe um usuário com esse e-mail" });
    }

    const user = await User.create({ name, email, password });

    return res.status(201).json({ id: user.id, name: user.name, email: user.email });
  }
}

module.exports = new UserController();
