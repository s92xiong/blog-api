const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: string, required: true, minLength: 4, maxLength: 30 },
  password: { type: string, required: true, minLength: 6 }
});

module.exports = mongoose.model("User", userSchema);