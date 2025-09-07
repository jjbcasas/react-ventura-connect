export const ensureAuth = ( req, res, next ) => {
    if ( req.isAuthenticated()) {
        return next()
    } else {
        console.log(req)
        res.status(401).json({ message: 'Unauthorized' })
    }
}