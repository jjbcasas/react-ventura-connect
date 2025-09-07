import express from 'express'
const router = express.Router()
import { getUser, postLogin, logout, postSignup, googleCallback} from '../controllers/auth.js'
import passport from 'passport'
import dotenv from 'dotenv'
import path from 'path'
import { ensureAuth } from '../middleware/auth.js'
dotenv.config({ path: './backend/config/.env'})

// Auth Routes
router.get('/user', ensureAuth, getUser)
// router.get('/login', getUser)
router.post('/login', ensureAuth, postLogin)
router.post('/logout', logout)
// router.get('/signup', getSignup)
router.post('/signup', postSignup)

// Google Routes
router.get('/auth/google', passport.authenticate('google', { scope: ['email','profile'], prompt: 'select_account'}))
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: `${process.env.FRONTEND_URL}/login` }), googleCallback)

export default router
