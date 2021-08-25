const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, minLength: 4, maxLength: 30 },
  password: { type: String, required: true, minLength: 6 }
});

module.exports = mongoose.model("User", userSchema);