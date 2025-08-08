import { useOutletContext,useNavigate, Link } from 'react-router-dom'
// import Input from '../components/Input'
// import Submit from '../components/Submit'
import { FaArrowLeft } from 'react-icons/fa'
import { useState } from 'react'
import toast from 'react-hot-toast'
// import AlertMessages from '../components/AlertMessages'

const Login = () => {

    const navigate = useNavigate()
    const [ email, setEmail] = useState('')
    const [ password, setPassword ] = useState('')
    const { setUser, setMessages } = useOutletContext()

    // console.log(user)

    const handleSubmit = async (event) => {
        event.preventDefault()

        const newLogin = {
            email,
            password
        }
        // try{
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newLogin),
            credentials: 'include'
        })
        const data = await response.json()
        console.log(data)

        if (data.message){
            setMessages(data.message)
            // toast.error("login success!")
        }
        if (data.user){
            setUser(data.user)
            navigate('/feed')
        }
        // 1. Check `response.ok` for success (status 200-299)
    //     if (response.ok) {
    //         // Successful login
    //         if (data.message) {
    //             // Assuming `setMessages` is for a generic notification system
    //             setMessages(data.message);
    //         }
    //         if (data.user) {
    //             // If this is a direct login handler, update user state
    //             setUser(data.user);
    //             navigate('/feed'); // Navigate on success
    //         }
    //     } else {
    //         // Server responded with an error status (e.g., 400, 401, 500)
    //         console.error('Login failed:', data.message || 'Unknown error');
    //         // Assuming `setMessages` is used for displaying errors to the user
    //         setMessages(data.message || 'Login failed. Please try again.');

    //         // You might want more specific error handling here:
    //         // if (response.status === 401) {
    //         //     setMessages('Invalid email or password.');
    //         // } else if (response.status === 400 && data.errors) {
    //         //     setMessages(data.errors.map(err => err.msg).join(', '));
    //         // } else {
    //         //     setMessages('An unexpected error occurred.');
    //         // }
    //     }
    // } catch (error) {
    //     // Handle network errors, JSON parsing errors, or other unexpected issues
    //     console.error('Fetch or parsing error:', error);
    //     setMessages('Network error or server unreachable. Please try again.');
    // }
        
    }


    return (
        <div>
            
            <div className="min-h-125 flex flex-col pt-10">
                <div className="mx-auto pt-5">

                    {/* <!-- Back Button --> */}
                    <Link to={"/"} className="btn btn-primary w-20">
                        <FaArrowLeft />
                        Back 
                    </Link>

                   {/* <AlertMessages messages={messages} /> */}

                    {/* <!-- Login Form --> */}
                    <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
                        <legend className="fieldset-legend">Login</legend>
                        <form onSubmit={handleSubmit}>

                            <label htmlFor='email' className="fieldset-label">Email</label>
                            <input 
                                type="email" 
                                name="email" 
                                id='email' 
                                className="input" 
                                placeholder="Email" 
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <label htmlFor='password' className="fieldset-label">Password</label>
                            <input 
                                type="password" 
                                name="password" 
                                id='password' 
                                className="input" 
                                placeholder="Password" 
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <button type="submit" className="btn btn-neutral mt-4">Login</button>
                            
                        </form>
                    </fieldset> 
                       </div>

            </div>

        </div>
    )
}

export default Login
