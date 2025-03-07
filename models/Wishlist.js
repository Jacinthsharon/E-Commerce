const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true, unique: true }, // 🔹 Prevent duplicates
    added_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Wishlist", wishlistSchema);
