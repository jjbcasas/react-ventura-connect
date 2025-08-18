import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const PublicRoute = () => {
    const { isAuthenticated } = useAuth()

  return isAuthenticated ? <Navigate to='/feed' replace /> : <Outlet />
}

export default PublicRoute
