function isAdmin(req, res, next) {
  if (!req.userAdmin) {
    return res.status(403).json({ error: "Apenas administradores podem realizar essa ação" });
  }

  return next();
}

module.exports = isAdmin;
