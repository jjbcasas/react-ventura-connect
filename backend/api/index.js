import express from 'express'
// initializes express
const app = express()
// requiring mongoose to connect to mongodb.
import mongoose from 'mongoose'
// package that helps us with our authentication or login
import passport from 'passport'
// to make a session for our users to stay logged in and then store our session info to mongodb
// express-session creates the cookie
import session from 'express-session'
// mongostore stores the session object to our mongodb
import MongoStore from 'connect-mongo' /*(session)*/
// it shows alert msg when logging in/verification is a success or an error
import flash from 'express-flash'
// helps us log everything thats happening. to see all the requests coming thru
import logger from 'morgan'
// enable cross-origin requests
import cors from 'cors'
// requires dotenv for us to use environment variables
import dotenv from 'dotenv'
import passportConfig from '../config/passport.js'
import passportGoogleConfig from '../config/passport-google.js'
import { connectDB } from '../config/database.js'
import feedRoutes from '../routes/feed.js'
import mainRoutes from '../routes/main.js'
import profileRoutes from '../routes/profile.js'
import postRoutes from '../routes/post.js'
import path from 'path'

// use .env file in config folder
dotenv.config({ path: './backend/config/.env'})

// Passport config
passportConfig(passport)

// Passport google-oauth20 config
passportGoogleConfig(passport)

// connect to the Database
connectDB()

// static folder
app.use(express.static('public'))

// body parsing, so we can pull something from the request
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// logging
app.use(logger('dev'))

// cors middleware
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true // If you're sending cookies/sessions
    })
)

// setup sessions - stored in mongodb
app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.DB_STRING
        })
        /*new MongoStore({ mongooseConnection: mongoose.connection})*/
    })
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// use flash messages for errors, info, etc.
app.use(flash())

// Routes
app.use('/', mainRoutes)
app.use('/feed', feedRoutes)
app.use('/profile', profileRoutes)
app.use('/post', postRoutes)

// server running
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}, you better catch it!`)
})

export default app