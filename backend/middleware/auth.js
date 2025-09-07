export const ensureAuth = ( req, res, next ) => {
    if ( req.isAuthenticated()) {
        return next()
    } else {
        console.log(req.user)
        res.status(401).json({ message: 'Unauthorized' })
    }
}