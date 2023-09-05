const { default: mongoose } = require('mongoose')
const User = require('../models/user.model')
const BlogPost = require('../models/post.model')

exports.getUserById = async (req, res, next, id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid user ID' })
    }
    const user = await User.findById(id)
      .select('username email isVerified')
      .exec()
    if (!user) {
      return res.status(400).json({ error: 'User not found' })
    } else {
      req.user = user
      next()
    }
  } catch (error) {
    throw error
  }
}

exports.getPostById = async (req, res, next, id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid Post ID' })
    }
    const post = await BlogPost.findById(id).exec()
    if (!post) {
      return res.status(400).json({ error: 'Post not found' })
    } else {
      req.post = post
      next()
    }
  } catch (error) {
    throw error
  }
}
