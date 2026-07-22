const Order = require("../mongo/Order");
const Stripe = require("stripe");

const chaveStripeConfigurada =
  process.env.STRIPE_SECRET_KEY && !process.env.STRIPE_SECRET_KEY.includes("substituir");

const stripe = chaveStripeConfigurada ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;

class OrderController {
  async index(req, res) {
    const orders = await Order.find({ user_id: req.userId }).sort({ createdAt: -1 });
    return res.json(orders);
  }

  async store(req, res) {
    const { products, total } = req.body;

    if (!products || !products.length) {
      return res.status(400).json({ error: "O pedido precisa ter ao menos um produto" });
    }

    let paymentIntentId = null;
    let clientSecret = null;

    if (stripe) {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(total * 100),
        currency: "brl",
        automatic_payment_methods: { enabled: true },
      });
      paymentIntentId = paymentIntent.id;
      clientSecret = paymentIntent.client_secret;
    }

    const order = await Order.create({
      user_id: req.userId,
      products,
      total,
      payment_intent_id: paymentIntentId,
      status: stripe ? "pendente" : "pago", // sem Stripe configurado, marca como pago (modo demo)
    });

    return res.status(201).json({ order, clientSecret });
  }

  async updateStatus(req, res) {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ error: "Pedido não encontrado" });
    }

    order.status = req.body.status || order.status;
    await order.save();

    return res.json(order);
  }
}

module.exports = new OrderController();
