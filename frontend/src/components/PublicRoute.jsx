import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import Spinner from "./Spinner"

const PublicRoute = () => {
  const { isAuthenticated, isLoading } = useAuth()

  if ( isLoading ) {
    return <Spinner loading={isLoading} />
  }

  return isAuthenticated ? <Navigate to='/feed' replace /> : <Outlet />
}

export default PublicRoute
