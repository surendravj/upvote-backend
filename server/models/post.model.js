const mongoose = require('mongoose')

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  tags: [String],
  upVotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  downVotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

  createdAt: {
    type: Date,
    default: Date.now
  },

  updatedAt: Date
})

const BlogPost = mongoose.model('BlogPost', blogPostSchema)

module.exports = BlogPost
