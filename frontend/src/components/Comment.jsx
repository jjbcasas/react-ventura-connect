import { Link } from "react-router-dom"
import Placeholder from "./Placeholder"
import Avatar from "./Avatar"

const Comment = ({ comment, padding, accountUser }) => {
  return (
    <div>
        <li className={`flex ${padding} items-center`}>
        {/* <!-- Avatar of each comment --> */}
        { comment?.commentUser?.profileImage ? (
        // {/* For comments with avatar */}
            <div className="w-1/8">
                <Avatar src={comment?.commentUser?.profileImage} link={`/profile/${comment?.commentUser?._id}` } user={comment?.commentUser} classNameOne='w-full my-auto' classNameTwo='w-12' p='p-0'/>
                {/* <div className="avatar w-full my-5">
                    <div className="w-12 rounded-full mx-auto">
                        <Link to={`/profile/${comment?.commentUser?._id}` }>
                            <img src={ comment?.commentUser?.profileImage } />
                        </Link>
                    </div>
                </div> */}
            </div>
        ) : (
        
        // {/* // <!-- for comments without avatar --> */}
            <div className="w-1/8">
                <Placeholder user={comment.commentUser} link={`/profile/${comment?.commentUser?._id}`} classNameOne='w-full my-auto' padding='p-0' classNameTwo='w-12'/>
                {/* <Link to={`/profile/${comment?.commentUser?._id}` }>
                    <div className="avatar avatar-placeholder w-full my-5">
                        <div className="bg-neutral text-neutral-content w-12 rounded-full mx-auto">
                            <span className="text-3xl">
                                { comment?.commentUser?.userName?.split(' ').map(word => word.charAt(0).toUpperCase()).join(' ')}
                               
                            </span>
                        </div>
                    </div>
                </Link> */}
            </div>
        
        )}

        {/* <!-- Comment Username and message --> */}
            <div className="card bg-base-100 w-7/8 shadow-sm">
                <div className="card-body">
                    <p><strong>
                        { comment?.commentUserName?.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') }
                        {/* <%= comment.commentUserName.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') %> */}
                        </strong></p>
                    <span>
                        { comment.comment }
                    </span>
                </div>
            </div>
        </li>    
    </div>
  )
}

export default Comment
