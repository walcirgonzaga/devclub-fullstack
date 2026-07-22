const { Router } = require("express");
const multer = require("multer");
const multerConfig = require("./multerConfig");

const UserController = require("./controllers/UserController");
const SessionController = require("./controllers/SessionController");
const CategoryController = require("./controllers/CategoryController");
const ProductController = require("./controllers/ProductController");
const OrderController = require("./controllers/OrderController");

const authMiddleware = require("./middlewares/authMiddleware");
const isAdmin = require("./middlewares/isAdmin");

const routes = Router();
const upload = multer(multerConfig);

// Públicas
routes.post("/users", UserController.store);
routes.post("/sessions", SessionController.store);
routes.get("/categories", CategoryController.index);
routes.get("/products", ProductController.index);

// Autenticadas
routes.use(authMiddleware);

routes.post("/orders", OrderController.store);
routes.get("/orders", OrderController.index);
routes.patch("/orders/:id", OrderController.updateStatus);

// Autenticadas + admin
routes.post("/categories", isAdmin, upload.single("file"), CategoryController.store);
routes.put("/categories/:id", isAdmin, upload.single("file"), CategoryController.update);

routes.post("/products", isAdmin, upload.single("file"), ProductController.store);
routes.put("/products/:id", isAdmin, upload.single("file"), ProductController.update);
routes.delete("/products/:id", isAdmin, ProductController.delete);

routes.get("/orders/all", isAdmin, OrderController.indexAll);

module.exports = routes;
