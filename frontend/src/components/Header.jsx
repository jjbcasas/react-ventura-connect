import { Link, useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import Placeholder from './Placeholder'
import Avatar from './Avatar'

const Header = ({data,user}) => {
  const { id } = useParams()
  const location = useLocation()
  const shouldShowHeaderContent = 
    location.pathname === '/feed' || 
    location.pathname === `/post/${id}` || 
    location.pathname === `/profile/${id}`

    console.log(user)
  return (
    <header>
        <div className={`navbar bg-base-100 shadow-sm ${data}`}>
            <div className="flex-1">
                <Link to={user ? '/feed' : '/' } className="btn btn-ghost text-xl">Ventura Connect</Link>
            </div>

            { shouldShowHeaderContent && <div className="flex-none">

              { user ? 
              <Avatar classNameTwo='mx-auto' user={user}/>
              : <Placeholder classNameTwo='mx-auto' user={user} /> }
                <ul className="menu menu-horizontal px-1">
                  <li>{
                        id === user?._id ?
                        <Link to={`/feed`}>Feed</Link>
                        :
                        <Link to={`/profile/${user?._id}`}>Profile</Link>
                      }
                  </li>
                  <li><Link to="/logout">Logout</Link></li>
                </ul>
              </div>}
        </div>
    </header>
  )
}

export default Header
