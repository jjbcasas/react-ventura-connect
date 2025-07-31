import express from 'express'
const router = express.Router()
// import feedController from '../controllers/feed'
import { getFeed, createPost, likePost, minusLike, deletePost, createComment, followUser, unfollowUser } from '../controllers/feed.js'
import upload  from '../middleware/multer.js'
// import { ensureAuth } from '../middleware/auth'

// Feed Routes
router.get('/', /*ensureAuth,*/ getFeed)
router.post('/createPost', upload.single('file'), createPost)
router.put('/likePost/:id', likePost)
router.put('/minusLike/:id', minusLike)
router.delete('/deletePost/:id', deletePost)
router.post('/comments/:id', createComment)
router.put('/followUser/:id', followUser)
router.put('/unfollowUser/:id', unfollowUser)

export default router