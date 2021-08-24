const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");

const BlogSchema = new Schema({
  title: { type: String, required: true, minLength: 1, maxLength: 100 },
  timestamp: { type: Date, default: Date.now },
  text: { type: String, required: true, minLength: 1 },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

BlogSchema.virtual("date").get(function() {
  return DateTime.fromJSDate(this.timestamp).toFormat("yyyy-MM-dd, HH:mm");
});

BlogSchema.virtual("url").get(function() {
  return `/posts/${this._id}`;
});

module.exports = mongoose.model("Blog Post", BlogSchema);