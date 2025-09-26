import React, {
    createContext,
    useContext,
    useState,
    useMemo
} from 'react'
import toast from 'react-hot-toast'
import { useAuth } from "../context/AuthContext"

const AppContext = createContext(null)

export const AppProvider = ({ children }) => {
    const [ posts, setPosts ] = useState([])
    const [ comments, setComments ] = useState([])
    const [ accountUser, setAccountUser ] = useState({})
    const { user, setUser } = useAuth()

    const addPost = async (formData, apiUrl) => {
        try {
            const res = await fetch(apiUrl, {
                method: 'POST',
                credentials: 'include',
                body: formData
            })
            const data = await res.json()

            if ( res.ok ) {
                if (data.post) {
                    setPosts([data.post, ...posts])
                    toast.success(data.message)
                }
            } else {
                console.error('Error adding a post', data.message)
                toast.error(data.message)
            }

        } catch (error) {
            console.error('Error adding a post:', error)
            toast.error('Could not connect to the server')
        }
    }

    const deletePost = async (postId, apiUrl) => {
        try {
            const res = await fetch(`${apiUrl}${postId}`, {
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

    const addComment = async(comment, postId, apiUrl) => {
        try {
            const res = await fetch(`${apiUrl}${postId}`,{
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

    const followUserInFeed = async (userId) => {
        try {
            const res = await fetch(`/api/feed/followUser/${userId}`,{
                method: 'PUT',
                credentials: 'include',
            })
            const data = await res.json()
    
            if( res.ok ) {
                if ( data.updatedFollowing ) {
                    setUser({...user, followingId: data.updatedFollowing.followingId})
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

    const unfollowUserInFeed = async (userId) => {
        try {
            const res = await fetch(`/api/feed/unfollowUser/${userId}`,{
                method: 'PUT',
                credentials: 'include',
            })
            const data = await res.json()
    
            if ( res.ok ) {
                if ( data.updatedUnfollowing ) {
                    setUser({...user, followingId: data.updatedUnfollowing.followingId })
                    toast.success(data.message)
                }
            } else {
                console.error('Error unfollowing a user:', data.message || 'Unknown error')
                toast.error(data.message)
            }
        } catch (error) {
            console.error('Error unfollowing a user:', error)
            toast.error('Could not connect to the server')
        }
    }

    const likePostInFeed = async (postId) => {
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

    const unlikePostInFeed = async (postId) => {
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

    const uploadPhoto = async (formData, apiUrl) => {
        try {
            const res = await fetch(apiUrl, {
                method: 'PUT',
                credentials: 'include',
                body: formData
            })
            const data = await res.json()

            if ( res.ok ){
                if ( data.newProfileImage.profileImage ){
                    setUser({...user, profileImage: data.newProfileImage.profileImage})
                    setAccountUser(
                        accountUser._id === user._id
                            ? {...accountUser, profileImage: data.newProfileImage.profileImage}
                            : accountUser
                    )
                    toast.success(data.message)
                }
            } else {
                console.error('Error uploading photo:', data.message)
                toast.error(data.message)
            }
        } catch (error) {
            console.error('Error uploading photo:', error)
            toast.error('Could not connect to the server')
        }
    }

    const changePhoto = async (formData, apiUrl ) => {
        try {
            const res = await fetch(apiUrl, {
                method: 'PUT',
                credentials: 'include',
                body: formData
            })
            const data = await res.json()

            if ( res.ok ){
                if ( data.newProfileImage.profileImage ){
                    setUser({...user, profileImage: data.newProfileImage.profileImage})
                    setAccountUser(
                        accountUser._id === user._id
                            ? {...accountUser, profileImage: data.newProfileImage.profileImage}
                            : accountUser
                    )
                    toast.success(data.message)
                }
            } else {
                console.error('Error uploading photo:', data.message)
                toast.error(data.message)
            }
        } catch (error) {
            console.error('Error uploading photo:', error)
            toast.error('Could not connect to the server')
        }
    }

    const followUser = async ( userId, apiUrl ) => {
        try {
            const res = await fetch(`${apiUrl}${userId}`,{
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

    const unfollowUser = async ( userId, apiUrl ) => {
        try {
            const res = await fetch(`${apiUrl}${userId}`,{
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
                console.error('Error unfollowing a user:', data.message || 'Unknown error')
                toast.error(data.message)
            }
        } catch (error) {
            console.error('Error unfollowing a user:', error)
            toast.error('Could not connect to the server')
        }
    }

    const appContextValue = useMemo(()=> ({
        posts,
        setPosts,
        comments,
        setComments,
        accountUser,
        setAccountUser,
        addPost,
        deletePost,
        addComment,
        followUserInFeed,
        unfollowUserInFeed,
        likePostInFeed,
        unlikePostInFeed,
        followUser,
        unfollowUser,
        uploadPhoto,
        changePhoto
    }), [ addPost, posts, setPosts, deletePost, addComment, comments, setComments, accountUser, setAccountUser, followUserInFeed, unfollowUserInFeed, likePostInFeed, unlikePostInFeed, followUser, unfollowUser, uploadPhoto, changePhoto ])
  return (
    
    <AppContext.Provider value={appContextValue}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)