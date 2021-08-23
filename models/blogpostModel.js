const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");

const BlogPostSchema = new Schema({
  title: { type: String, required: true, minLength: 1, maxLength: 100 },
  timestamp: { type: Date, default: Date.now, required: true },
  text: { type: String, required: true, minLength: 1 },
  // messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
});

BlogPostSchema.virtual("date").get(function() {
  return DateTime.fromJSDate(this.timestamp).toFormat("yyyy-MM-dd, HH:mm");
});

module.exports = mongoose.model("Blog Post", BlogPostSchema);