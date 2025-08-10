import express from 'express'
const router = express.Router()
import upload from '../middleware/multer.js'
import { getPost, followUser, unfollowUser, likePost, minusLikePost, deletePost, createComment, uploadProfilePhoto, changeProfilePhoto } from '../controllers/post.js'
import { ensureAuth } from '../middleware/auth.js'

// Post Routes
router.get('/:id',ensureAuth, getPost)
// router.post('/createPost/:id', upload.single('file'), postController.createPost)
router.put('/likePost/:id', likePost)
router.put('/minusLikePost/:id', minusLikePost)
router.delete('/deletePost/:id', deletePost)
router.put('/followUser/:id', followUser)
router.put('/unfollowUser/:id', unfollowUser)
router.post('/comments/:id', createComment)
router.put('/uploadProfilePhoto', upload.single('file'), uploadProfilePhoto)
router.put('/changeProfilePhoto', upload.single('file'), changeProfilePhoto)

export default router