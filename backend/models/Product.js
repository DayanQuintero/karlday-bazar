const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    brand: { type: String, default: "KARLDAY", trim: true },
    description: { type: String, default: "", trim: true },
    category: {
      type: String,
      enum: ["calzado", "ropa", "accesorios", "deporte", "outlet", "bazar"],
      default: "bazar"
    },
    priceMXN: { type: Number, required: true, min: 1 },
    stock: { type: Number, default: 0, min: 0 },
    imageUrl: { type: String, default: "" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);