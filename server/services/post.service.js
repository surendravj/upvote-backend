const BlogPost = require('../models/post.model')

exports.createPost = async (req, res) => {
  try {
    const { title, content, tags } = req.body
    const author = req.user.id
    const newPost = new BlogPost({
      title,
      content,
      author,
      tags
    })
    await newPost.save()
    return res.status(201).json(newPost)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', error })
  }
}

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await BlogPost.find({})
      .limit(50)
      .populate('author', 'username email')
      .exec()
    return res.status(200).json(posts)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', error })
  }
}

exports.getPost = async (req, res) => {
  try {
    return res.status(200).json(req.post)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', error })
  }
}

exports.getUserAllPosts = async (req, res) => {
  try {
    const posts = await BlogPost.find({ author: req.user.id }).limit(50).exec()
    return res.status(200).json(posts)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', error })
  }
}

exports.deletePost = async (req, res) => {
  try {
    const isDeleted = await BlogPost.findByIdAndDelete(req.post.id)
    if (isDeleted) {
      return res.status(204).json({ msg: 'Document deleted succesfully' })
    } else {
      return res.status(400).json({ msg: 'document deletetion not succesfull' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', error })
  }
}

exports.searchPost = async (req, res) => {
  try {
    const searchQuery = req.query.q || ''
    const query = {
      $or: [
        { title: { $regex: searchQuery, $options: 'i' } }, // Case-insensitive search
        { content: { $regex: searchQuery, $options: 'i' } },
        { tags: { $regex: searchQuery, $options: 'i' } }
      ]
    }

    const matchingPosts = await BlogPost.find(query)
      .limit(50)
      .populate('author', 'username email')
      .exec()
    res.status(200).json(matchingPosts)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

exports.upVotePost = async (req, res) => {
  try {
    const updatedPost = await BlogPost.findByIdAndUpdate(
      req.post.id,
      { $addToSet: { upVotes: req.body.userId } },
      { new: true }
    )
    if (!updatedPost) {
      return res.status(404).json({ error: 'Post not found' })
    }
    res.status(200).json(updatedPost)
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' })
  }
}

exports.downVotePost = async (req, res) => {
  try {
    const updatedPost = await BlogPost.findByIdAndUpdate(
      req.post.id,
      { $addToSet: { downVotes: req.body.userId } },
      { new: true }
    )
    if (!updatedPost) {
      return res.status(404).json({ error: 'Post not found' })
    }
    res.status(200).json(updatedPost)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}
