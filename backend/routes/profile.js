import express from 'express'
const router = express.Router()
import upload from '../middleware/multer.js'
import { ensureAuth } from '../middleware/auth.js'
import { getProfile, createPost, likePost, minusLikePost, deletePost, followUser, unfollowUser, uploadProfilePhoto, changeProfilePhoto, createComment } from '../controllers/profile.js'

// Profile Routes
router.get('/:id', ensureAuth, getProfile)
router.post('/createPost', upload.single('file'), createPost)
router.put('/likePost/:id', likePost)
router.put('/minusLikePost/:id', minusLikePost)
router.delete('/deletePost/:id', deletePost)
router.put('/followUser/:id', followUser)
router.put('/unfollowUser/:id', unfollowUser)
router.put('/uploadProfilePhoto', upload.single('file'), uploadProfilePhoto)
router.put('/changeProfilePhoto', upload.single('file'), changeProfilePhoto)
router.post('/comments/:id', createComment)

export default router