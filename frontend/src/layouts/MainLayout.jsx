import { Outlet, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
// import AlertMessages from '../components/AlertMessages'
import toast from 'react-hot-toast'


const MainLayout = () => {
  // const [user, setUser] = useState()
  // const [messages, setMessages] = useState({})
  const navigate = useNavigate()
  const { user } = useAuth()
  
  // useEffect(()=>{
  //   const fetchUser = async ()=> {
  //     try {
  //       const res = await fetch('/api/user',{
  //         method: 'GET',
  //         credentials: 'include'
  //       })
  //       const data = await res.json()
  //       setUser(data.user)
        
        
  //     } catch (error) {
  //         console.log(error)
  //     }
  //   }
  //   fetchUser()
    
  // },[])
  // console.log(user)

  // const logout = async () => {
  //       const res = await fetch('/api/logout')
  //       const data = await res.json()
  
  //       if ( res.status === 200 ) {
  //         if ( data.message ) {
  //           setUser(null)
  //           navigate('/')
  //           toast.success(data.message)
  //         }
  //       }
  //     }

  return (
    <>
      <Header user={user} /*logout={logout}*//>
      {/* <h1>Hi, {user?.email}</h1> */}
      {/* <AlertMessages messages={messages} /> */}
      <Outlet /*context={{ user, setUser , messages, setMessages }}*/ />
      <Footer />
    </>
  )
}

export default MainLayout
