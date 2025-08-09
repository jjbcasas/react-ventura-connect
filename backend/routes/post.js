import express from 'express'
const router = express.Router()
import upload from '../middleware/multer.js'
import { getPost } from '../controllers/post.js'
import { ensureAuth } from '../middleware/auth.js'

// Post Routes
router.get('/:id',ensureAuth, getPost)
// router.post('/createPost/:id', upload.single('file'), postController.createPost)
// router.put('/likePost/:id', postController.likePost)
// router.put('/minusLikePost/:id', postController.minusLikePost)
// router.delete('/deletePost/:id', postController.deletePost)
// router.put('/followUser/:id', postController.followUser)
// router.put('/unfollowUser/:id', postController.unfollowUser)
// router.post('/comments/:id', postController.createComment)

export default router