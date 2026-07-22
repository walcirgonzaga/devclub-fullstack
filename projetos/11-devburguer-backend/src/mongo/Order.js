const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    user_id: { type: Number, required: true },
    products: [
      {
        product_id: Number,
        name: String,
        price: Number,
        quantity: Number,
      },
    ],
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pendente", "pago", "cancelado"],
      default: "pendente",
    },
    payment_intent_id: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
