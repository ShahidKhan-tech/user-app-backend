const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  description: { type: String, required: true },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Auth",
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
