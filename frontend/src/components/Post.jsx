import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import AddComment from "./AddComment"
import Comment from "./Comment"
import DeleteButton from "./DeleteButton"
import FollowButton from "./FollowButton"
import LikeButton from "./LikeButton"
import Placeholder from "./Placeholder"
import Avatar from "./Avatar"
import UnfollowButton from "./UnfollowButton"
import UnlikeButton from "./UnlikeButton"

const Post = ({ user, post ,comments, classNameOne="w-2/3 mx-auto" }) => {
    // const [comments, setComments] = useState([])
    
    // useEffect( () => {
    //         const fetchComments = async () => {
    //             try {
    //                 const res = await fetch('http://localhost:5000/feed')
    //                 const data = await res.json()
    //                 setComments(data.comments)
    //                 console.log(data.comments)
    //             } catch (error) {
    //                 console.log('Error fetching data',error)
    //             }
    //         }
    
    //         fetchComments()
    //     }, [])

    return (
        <li className={`card bg-base-100 shadow-sm mb-4 ${classNameOne}`}>
            <div className="flex justify-between">
                { post?.user.profileImage ? (
                    <Avatar src={post.user.profileImage} link={`/profile/${post.user._id}`} classNameOne='w-1/2 m-2' classNameTwo='w-12' p='p-0'>
                        <h2 className="card-title justify-self-end py-2 pl-5">
                         <Link to={`/profile/${post.user._id} `}>
                                {post.userName.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                            </Link>
                        </h2>
                    </Avatar>
                ) : (
                    <Placeholder user={post.user} classNameOne='w-full m-2' classNameTwo='w-12' link={`/profile/${post.user._id}`} padding='p-0'>
                        <Link to={`/profile/${post.user._id}` }>
                            <h2 className="card-title justify-self-end py-2 pl-5">
                                { post.userName.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') }
                            </h2>
                        </Link>
                    </Placeholder>
                )}
                <div className="mt-3 mr-2">
                    {/* <!-- for follow and unfollow button --> */}
                    {/* <!-- show the follow/unfollow button when its not the users own posts --> */}
                        { user.followingId.includes(post.user._id) ? (
                            <UnfollowButton />
                        ) : (
                            <FollowButton />
                        )}
                </div>
            </div>

            <figure>
                <Link to={ `/post/${post._id}` }>
                    <img src={ post.image }/>
                </Link>
            </figure>
            <div className="card-body">
                <div className="flex flex-wrap">
                    <div className="w-1/2">
                        <h2 className="card-title">{ post.title }</h2>
                        <p>{ post.caption }</p>
                    </div>
                    <div className="w-1/2">
                        <div className="card-actions justify-end">
                            <h3 className="pt-2">Likes: {post.likes}</h3>
                            {/* <!-- Like and Unlike Button --> */}
                            { user.likedPostId.includes(post._id) ? (
                            <UnlikeButton className= 'btn btn-primary' />
                        ) : (
                            <LikeButton className= 'btn btn-primary' />
                        )}
                            {/* <!-- Delete Button if you're the user --> */}
                            <DeleteButton className= 'btn btn-primary' />
                        </div>
                    </div>
                </div>

                <h2 className="pt-4">Comments</h2>
                {/* // <!-- Comments Form --> */}
                <AddComment />
                {/* <!-- List of Comments on the post --> */}
                <ul>
                    {/* <Comment comment={}/> */}
                        { comments.map((comment) => (
                            post._id === comment.postId &&
                                <Comment key={comment._id} comment={comment}/>
                        ))}
                </ul>
            </div>
        </li>
    )
}

export default Post