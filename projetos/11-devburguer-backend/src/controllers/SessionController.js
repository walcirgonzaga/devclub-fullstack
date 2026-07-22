const jwt = require("jsonwebtoken");
const { User } = require("../../models");

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.scope(null).findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: "Usuário não encontrado" });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: "Senha inválida" });
    }

    const { id, name, admin } = user;

    return res.json({
      user: { id, name, email, admin },
      token: jwt.sign({ id, admin }, process.env.JWT_SECRET, { expiresIn: "7d" }),
    });
  }
}

module.exports = new SessionController();
