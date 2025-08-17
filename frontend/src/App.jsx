import { 
  Route, 
  createBrowserRouter, 
  createRoutesFromElements, 
  RouterProvider 
} from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Feed from './pages/Feed'
import Login from './pages/Login'
import Post from './pages/Post'
import Profile from './pages/Profile'
import Signup from './pages/Signup'
import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'
import ErrorPage from './components/ErrorPage'
import { AuthProvider } from './context/AuthContext'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout />} errorElement={<ErrorPage />} >
      <Route index element={<Home />} />
      <Route path='/feed' element={<Feed />}/>
      {/* {isAuthenticated ? <Route path='/feed' element={<Feed />}/> : <Route path='/login' element={<Login />}/> } */}
      <Route path='/login' element={<Login />}/>
      <Route path='/post/:id' element={<Post />}/>
      <Route path='/profile/:id' element={<Profile />}/>
      <Route path='/signup' element={<Signup />}/>
    </Route>
  )
)

const App = () => {

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
