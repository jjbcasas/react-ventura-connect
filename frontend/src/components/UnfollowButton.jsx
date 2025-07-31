const UnfollowButton = ({classNameOne, unfollowUser, postId}) => {
  return (
    <div className="w-20 mx-auto">
        <button className={`btn btn-soft btn-primary w-full ${classNameOne}`} type="button" onClick={()=>unfollowUser(postId)}>Unfollow</button>
    </div>
  )
}

export default UnfollowButton
