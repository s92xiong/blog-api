const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  title: { type: String, required: true, minLength: 1, maxLength: 100 },
  text: { type: String, required: true, maxLength: 10000 },
  timestamp: { type: Date, default: Date.now, required: true }
});

module.exports = mongoose.model("message", MessageSchema);