const { getUserById, getPostById } = require('../middleware/params.middleware')
const { createPost, getAllPosts, getPost, getUserAllPosts, deletePost, searchPost, upVotePost, downVotePost } = require('../services/post.service')

const router = require('express').Router()

router.param('userId', getUserById)
router.param('postId', getPostById)


router.get('/posts', getAllPosts)
router.get('/search',searchPost)
router.get('/:postId', getPost)
router.get('/:userId/posts',getUserAllPosts)
router.post('/:userId', createPost)
router.delete('/:postId',deletePost)
router.put('/:postId/up',upVotePost)
router.put('/:postId/down',downVotePost)




module.exports = router
