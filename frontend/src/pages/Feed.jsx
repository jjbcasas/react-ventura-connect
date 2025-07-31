import { useState, useEffect } from "react"
import AddPost from "../components/AddPost"
import Post from '../components/Post'
import Spinner from "../components/Spinner"
import { useOutletContext, Link } from "react-router-dom"
import ProfileRecommend from "../components/ProfileRecommend"

const Feed = () => {
    const [posts, setPosts] = useState([])
    const [allUsers, setAllUsers] = useState([])
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true)
    const { user } = useOutletContext()

    useEffect( () => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/feed')
                const data = await res.json()
                setPosts(data.posts)
                setAllUsers(data.allUsers)
                setComments(data.comments)
                console.log(data)
                console.log(data.allUsers)
            } catch (error) {
                console.log('Error fetching data',error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])
    console.log(user)

  return (
    <div className="flex flex-wrap justify-evenly min-h-125">
            <div className="w-2/3 pt-4">
                
                <div className="card bg-base-100 w-2/3 shadow-sm mb-4 mx-auto">
                    <AddPost />
                </div>
                    { loading ? (
                        <Spinner loading={loading} />
                    ) : (
                        <>
                            <ul>
                                { posts.map((post) => (
                                    <Post key={post._id} user={user} post={post} comments={comments}/>
                                ))}
                            </ul>
                        </>
                    )}

            </div>

            {/* <!-- Right Section/Div --> */}
            <div className="w-1/3">
                    {/* <Recommend /> */}
                    <h3 className="text-center pt-4"><strong>Recommended people</strong></h3>
                <div className="card w-full bg-base-96 card-xs shadow-sm">
                    <div className="card-body">
                        <ul className="flex flex-wrap">
                            { allUsers.map(users => (
                                !user.followingId.includes(users._id) && users._id !== user._id &&
                                    <ProfileRecommend key={users._id} following={users} width='w-16' />
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Feed
