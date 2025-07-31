import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useState, useEffect } from 'react'
import AlertMessages from '../components/AlertMessages'

const MainLayout = () => {
  const [user, setUser] = useState()
  const [messages, setMessages] = useState({})
  useEffect(()=>{
    const fetchUser = async ()=> {
      try {
        const res = await fetch('http://localhost:5000/user',{
          method: 'GET',
          credentials: 'include'
        })
        const data = await res.json()
        setUser(data.user)
        
        
      } catch (error) {
          console.log(error)
      }
    }
    fetchUser()
    
  },[])
  console.log(user)

  return (
    <>
      <Header user={user}/>
      {/* <h1>Hi, {user?.email}</h1> */}
      <AlertMessages messages={messages} />
      <Outlet context={{ user, setUser, messages, setMessages }} />
      <Footer />
    </>
  )
}

export default MainLayout
