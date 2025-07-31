import passport from 'passport'
import validator from 'validator'
import User from '../models/User.js'

    // This endpoint would primarily be used to check if a user is already authenticated
    // when the React app loads or navigates to a protected route.
  export const getUser = (req, res) => {
        // If req.user exists, it means Passport has successfully authenticated
        // the user and populated the req.user object from the session.
        if (req.user) {
            // Send back the user data to the client.
            // The client-side React app will then use this data to update its auth state
            // and conditionally redirect to '/feed' or show the logged-in UI.
            console.log(req.user)
            return res.status(200).json({
                isAuthenticated: true,
                user: {
                    _id: req.user._id,
                    userName: req.user.userName,
                    email: req.user.email,
                    // Include any other non-sensitive user data your frontend needs
                    profileImage: req.user.profileImage,
                    likedPostId: req.user.likedPostId,
                    followingId: req.user.followingId,
                    followerId: req.user.followerId,
                },
                message: 'User is already logged in.'
                // user: req.user || null
            });
        }

        // If req.user does not exist, the user is not authenticated.
        // Send a response indicating that the client needs to log in.
        res.status(200).json({ // 200 OK because the request was processed successfully, just no user found
            isAuthenticated: false,
            user: null,
            message: 'No user authenticated. Please log in.'
        });
    }
  
  export const postLogin = (req, res, next) => {
    console.log(req.user)
    const validationErrors = []
    if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
    if (validator.isEmpty(req.body.password)) validationErrors.push({ msg: 'Password cannot be blank.' })
  
    if (validationErrors.length) {
      req.flash('errors', validationErrors)
      return res.json({ message: req.flash() })
    }
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })
  
    passport.authenticate('local', (err, user, info) => {
      if (err) { return next(err) }
      if (!user) {
        req.flash('errors', info)
        return res.json({ message: req.flash() })
      }
      req.logIn(user, (err) => {
        if (err) { return next(err) }
        req.flash('success', { message: 'Success! You are logged in.' })
        res.json({ user, message: req.flash() })
        // console.log(user)
        console.log(req.user)
      })
    })(req, res, next)
  }

  export const logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            console.error('Error during Passport logout:', err);
            // If there's an error during logout, inform the client.
            // You might want to send a 500 status or a specific error message.
            return res.status(500).json({ message: 'Failed to log out.', error: err.message });
        }
        console.log('User has logged out.')
    })
    req.session.destroy((err) => {
        if (err) {
            console.error('Error: Failed to destroy the session during logout.', err);
            // Even if session destruction fails, you might still consider the user logged out
            // from a client perspective if req.logout succeeded. However, it's good to log
            // and potentially return an error for debugging.
            return res.status(500).json({ message: 'Error destroying session during logout.' });
        }

        // Remove req.user (Passport typically handles this, but a good safeguard)
        req.user = null;

        // Instead of redirecting, send a JSON success response
        res.status(200).json({ message: 'Logout successful' });
        
    });
  }
  
  // export const getSignup = (req, res) => {
  //   if (req.user) {
  //     return res.redirect('/feed')
  //   }
  //   res.render('signup', {
  //     title: 'Create Account'
  //   })
  // }
  
  export const postSignup = async (req, res, next) => {
    console.log(req.body)
    const validationErrors = []
    if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
    if (!validator.isLength(req.body.password, { min: 8 })) validationErrors.push({ msg: 'Password must be at least 8 characters long' })
    if (req.body.password !== req.body.confirmPassword) validationErrors.push({ msg: 'Passwords do not match' })
  
    if (validationErrors.length) {
        req.flash('errors', validationErrors)
        return res.status(500).json({ /* 400 Bad Request for validation errors*/
            message: req.flash(),
            errors: validationErrors // Send the specific validation errors
        })
    }
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })
  
    const user = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        followerId: [],
        followingId: [],
        likedPostId: [],
    })
  
      try {
        const existingUser = await User.findOne({$or: [
          {email: req.body.email},
          {userName: req.body.userName}
        ]})
          if (existingUser) {
                req.flash("errors", {
                    message: 'Account with that email address or username already exists.' 
                })
                return res.status(409).json({/* 409 Conflict for duplicate user */
                    message: req.flash()
                })
          }

          const savedUser = await user.save()
          // After successful signup, log the user in using Passport's login method
        // Then send a JSON success response
          await req.logIn(savedUser, (err) => {
            if (err) {
                // If login itself fails after signup (rare, but handle it)
                console.error('Error during login after signup:', err)
                return res.status(500).json({
                    message: 'Signup successful, but login failed.'
                })
            }
            // Successful signup and login
            // Send back user data (e.g., sanitized user object, success message)
            res.status(201).json({ // 201 Created for successful resource creation
                message: /*'Signup successful!'*/ req.flash(),
                user: { // Send back relevant user data, e.g., for storing in client-side state
                    id: savedUser._id,
                    userName: savedUser.userName,
                    email: savedUser.email,
                    // followerId: [],
                    // followingId: [],
                    // likedPostId: [],
                    // ... exclude sensitive info like password
                }
            });
          })
      } catch (error) {
            console.error('Signup error', error)
            return res.status(500).json({ message: 'An unexpected server error occurred during signup.' })
      }
    
  }

  export const googleCallback = async ( req, res) => {
    
    // Successful authentication, redirect home.
    res.redirect('/feed');
  }