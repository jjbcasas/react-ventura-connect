import { useState, useEffect, useRef } from "react"
import AddPost from "../components/AddPost"
import Spinner from "../components/Spinner"
import { useOutletContext, useParams} from "react-router-dom"
import toast from 'react-hot-toast'
import Avatar from "../components/Avatar"
import Placeholder from "../components/Placeholder"
import Upload from "../components/Upload"
import FollowButton from "../components/FollowButton"
import ProfilePost from "../components/ProfilePost"
import ProfileRecommend from "../components/ProfileRecommend"
import UnfollowButton from "../components/UnfollowButton"

const Profile = () => {
    const [posts, setPosts] = useState([])
    const [comments, setComments] = useState([])
    const [accountUser, setAccountUser] = useState({})
    // const [usersFriends, setUsersFriends] = useState([])
    const [loading, setLoading] = useState(true)
    const { user, setUser, setMessages } = useOutletContext()
    const { id } = useParams()
    const fileInputRef = useRef(null)

    useEffect( () => {
        setLoading(true)
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/profile/${id}`, {
                  credentials: 'include'
              })
                const data = await res.json()
                setPosts(data.posts)
                setComments(data.comments)
                setAccountUser(data.accountUser)
                // setUsersFriends(data.usersFriends)

                console.log(data)
                console.log(user)
            } catch (error) {
                console.error('Error fetching data',error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [id])


    const addPost = async (formData) => {
        try {
            const res = await fetch('/api/feed/createPost', {
                method: 'POST',
                credentials: 'include',
                body: formData
            })
            const data = await res.json()

            // if (data.message){
            //     setMessages(data.message)
            // }
            if ( res.ok ) {
                if (data.newPost) {
                    setPosts([data.newPost, ...posts])
                    toast.success('Post Added Successfully')
                }
            } else {
                console.error('Error adding a post', error)
                toast.error('Could not connect to the server')
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    const followUser = async (userId) => {
        try {
            const res = await fetch(`/api/feed/followUser/${userId}`,{
                method: 'PUT',
                credentials: 'include',
            })
            const data = await res.json()
    
            if( res.ok ) {
                if ( data.updatedFollow ) {
                    setAccountUser({...accountUser, followerId: data.updatedFollow.followerId})
                    toast.success(data.message)
                }
            } else {
                console.error('Error following a user:', data.message || 'Unknown error')
                toast.error(data.message)
            }
        } catch (error) {
            console.error('Error following a user:', error)
            toast.error('Could not connect to the server')
        }
    }

    const unfollowUser = async (userId) => {
        try {
            const res = await fetch(`/api/feed/unfollowUser/${userId}`,{
                method: 'PUT',
                credentials: 'include',
            })
            const data = await res.json()
    
            if ( res.ok ) {
                if ( data.updatedUnfollow ) {
                    setAccountUser({...accountUser, followerId: data.updatedUnfollow.followerId })
                    toast.success(data.message)
                }
            } else {
                console.error('Error following a user:', data.message || 'Unknown error')
                toast.error(data.message)
            }
        } catch (error) {
            console.error('Error unfollowing a user:', error)
            toast.error('Could not connect to the server')
        }
    }

    const likePost = async (postId) => {
        try {
            const res = await fetch(`/api/feed/likePost/${postId}`,{
                method: 'PUT',
                credentials: 'include',
            })
    
            const data = await res.json()
    
            if ( res.ok ) {
                if ( data.updatedUser && data.updatedLike ) {
                    setUser({...user, likedPostId: data.updatedUser.likedPostId})
                    setPosts(posts.map( post => (
                        post._id === postId ? { ...post, likes: data.updatedLike.likes } : post
                    )))
                    setAccountUser( accountUser._id === user._id ? {...accountUser, likedPostId: data.updatedUser.likedPostId } : {...accountUser})
                    toast.success(data.message)
                } else {
                    console.error('Error in liking post:', data.message || 'Unknown error')
                    toast.error(data.message)
                }
            }
        } catch (error) {
            console.error('Error in liking post:', error)
            toast.error('Could not connect to the server')
        }

    }

    const unlikePost = async (postId) => {
        try {
            const res = await fetch(`/api/feed/minusLike/${postId}`,{
                method: 'PUT',
                credentials: 'include',
            })
    
            const data = await res.json()
    
            if ( res.ok ) {
                if ( data.updatedUser && data.updatedLike ) {
                    setUser({...user, likedPostId: data.updatedUser.likedPostId})
                    setPosts(posts.map( post => (
                        post._id === postId ? { ...post, likes: data.updatedLike.likes } : post
                    )))
                    setAccountUser( accountUser._id === user._id ? {...accountUser, likedPostId: data.updatedUser.likedPostId } : {...accountUser})
                    toast.success(data.message)
                }
            } else {
                console.error('Error in unliking post:', data.message || 'Unknown error')
                toast.error(data.message)
            }
        } catch (error) {
            console.error('Error in unliking post:', error)
            toast.error('Could not connect to the server')
        }

    }

    const deletePost = async (postId) => {
        try {
            const res = await fetch(`/api/feed/deletePost/${postId}`, {
                method: 'DELETE',
                credentials: 'include',
            })

            const data = await res.json()
            
            if ( res.status === 200 ) {
                setPosts(posts.filter( post => post._id !== postId))
                toast.success(data.message || 'Post deleted successfully!' )
            } else {
                console.error('Error deleting post:', data.message || 'Unknown error')
                toast.error(data.message)
            }
        } catch (error) {
            console.error('Error deleting post:', error)
            toast.error('Could not connect to the server')
        }
    }

    const addComment = async(comment, postId) => {
        try {
            const res = await fetch(`/api/feed/comments/${postId}`,{
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({comment}),
            })

            const data = await res.json()

            if ( res.ok ) {
                if (data.comment){
                    setComments([ data.comment, ...comments ])
                    toast.success(data.message)
                }
            } else {
                console.error('Error adding a comment:', data.message || 'Unknown error')
                toast.error(data.message)
            }
        } catch (error) {
            console.error('Error adding a comment:', error)
            toast.error('Could not connect to the server')
        }
    }
    console.log('Type of likePost:', typeof likePost)

  return (
    <div className="flex flex-wrap justify-evenly min-h-125">
        { loading ? (
               <Spinner loading={loading} />
         ): (
            <>
                <div className="w-1/4 pt-4 pb-4 px-2">
                    { accountUser?.profileImage ?
                            
                        <Avatar src={accountUser?.profileImage} user={accountUser} classNameOne='w-full' classNameTwo="w-20 mx-auto" />
                        : /* No Profile Image */
                        <Placeholder user={accountUser} classNameOne='w-full' classNameTwo='w-20 mx-auto'/> }
                    
                        {/* Upload Button for User */}
                        { accountUser?._id === user?._id ? (
                    
                            accountUser?.profileImage ? (
                                
                                <Upload title='Change Photo' />
                            ) : (
                                <Upload title='Add Photo' />
                            )
                            
                        ) : ( accountUser?.followerId?.includes(user?._id) ? (
                                    <UnfollowButton classNameOne='mt-2' postId={accountUser?._id} unfollowUser={unfollowUser}/>
                            ):(
                                    <FollowButton classNameOne='mt-2' postId={accountUser?._id} followUser={followUser}/>
                            )
                        )}

                    {/* Profile Details */}
                    { accountUser?._id === user?._id ? 
                        <div>
                            <p className="text-center"><strong>Email</strong>: { accountUser?.email } </p>
                            <p className="text-center"><strong>User Name</strong>: { posts[0]?.userName?.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') } </p>
                        </div>
                        : <p className="text-center"><strong>Email</strong>: { accountUser?.email } </p> }
                            
                    { accountUser?._id === user?._id && <AddPost width='w-full' classNameOne="pt-4 text-center" divWidth='w-full' addPost={addPost} fileInputRef={fileInputRef} />}
                </div>

                {/* Profile Feed for users without post */}
                <div className="w-2/4 pt-4">
                    <ul className="mt-5">
                        { posts.map((post) => (
                            <ProfilePost key={post?._id} post={post} comments={comments} user={user} accountUser={accountUser} likePost={likePost} unlikePost={unlikePost} deletePost={deletePost} classNameOne="w-full" addComment={addComment}/>
                        ))}
                    </ul>            
                </div>
                
                {/* Friends List Section of User */}
                <div className="w-1/4 px-2">
                    {/* <Recommend /> */}
                    <h3 className="text-center pt-4"><strong>{ accountUser?._id === user?._id ? 'My Friends' : `${accountUser?.userName}'s Friends` }</strong></h3>
                    <div className="card w-full bg-base-100 card-xs shadow-sm">
                        <div className="card-body">
                                {accountUser?.followingId?.length == 0 ? (
                                    /* if without friends yet */
                                    <h3 className="text-center">No Friends yet</h3>
                                ) : ( /* if with friends */
                                    <ul className="flex flex-wrap">
                                        {accountUser?.followingId?.map( following => (
                                            <ProfileRecommend key={following._id} following={following} /*onClick={handleClick}*/ />
                                        ))}
                                    </ul>
                                )}
                        </div>
                    </div>
                </div>
            </>
        )}
    </div>
  )
}

export default Profile