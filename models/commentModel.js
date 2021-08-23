const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  name: { type: String, default: "Anonymous", minLength: 1, maxLength: 100 },
  text: { type: String, required: true, minLength: 1, maxLength: 10000 },
  timestamp: { type: Date, default: Date.now, required: true },
  blog_post: { type: Schema.Types.ObjectId, ref: "Blog Post" },
});

CommentSchema.virtual("date").get(function() {
  return DateTime.fromJSDate(this.timestamp).toFormat("yyyy-MM-dd, HH:mm");
});

module.exports = mongoose.model("Comment", CommentSchema);