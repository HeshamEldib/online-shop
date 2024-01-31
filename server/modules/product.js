const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  rating: {
    rate: { type: Number, default: 0 },
    count: { type: Number, default: 0 },
    ratings: [{ user: String, rating: Number }],
  },
  comment: [{ author: String, content: String, date: String }],
  author: { type: String },
});

module.exports = mongoose.model("Product", productSchema);
