const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
  title: { type: String, required: true, minLength: 1, maxLength: 50 },
  text: { type: String, required: true, maxLength: 1000 },
  timestamp: { type: Date, default: Date.now, required: true }
});

module.exports = mongoose.model("BlogPost", BlogPostSchema);