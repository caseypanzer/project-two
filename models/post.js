var mongoose = require ('mongoose'),
    Schema   = mongoose.Schema;

var postSchema = new Schema({
  lastUpdated: {type: String, required: true},
  lastUpdatedBy: {type: String, required: true},
  title: {type: String, required: true},
  articleText: {type: String, required: true},
  coverPhoto: {type: Array},
  previousEntries: {type: Array}
});

var Post = mongoose.model("Post", postSchema);

module.exports = Post;
