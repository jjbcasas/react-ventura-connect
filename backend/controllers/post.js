import cloudinary from '../middleware/cloudinary.js'
import Post from '../models/Post.js'
import User from '../models/User.js'
import Comment from '../models/Comment.js'

export const getPost = async(req, res) => {
    try {
        // Find a specific post and populate
        const post = await Post.findOne({ _id: req.params.id }).populate({
            path: 'user',
                populate: {
                    path: 'followingId'
                }
        }).sort({ createdAt: 'desc'}).lean()

        const accountUser = await User.findOne({ _id: post.user }).populate('followingId').sort({ createdAt: 'desc'}).lean()

        // Find or get all comment under the same user
        const comments = await Comment.find({ postId: req.params.id}).populate({
            path: 'commentUser'
        })
        .sort({ createdAt: 'desc'}).lean()

        res.status(200).json({ post, accountUser ,comments, message: 'Data fetched successfully!' })
    } catch (error) {
        console.log(error)
    }
}