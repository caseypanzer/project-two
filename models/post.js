var mongoose = require ('mongoose'),
    Schema   = mongoose.Schema;

var postSchema = new Schema({
  lastUpdated: { type: String },
  lastUpdatedBy: { type: String},
  title: {type: String, required: true},
  articleText: {type: String, required: true},
  coverPhoto: {type: Array},
  previousEntries: {type: Array},
  category_ID: {type: String}
});

var Post = mongoose.model("Post", postSchema);

module.exports = Post;
