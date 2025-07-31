// import Input from '../components/Input'
// import Submit from '../components/Submit'
import { Link, useOutletContext, useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import { useState } from 'react'
// import AlertMessages from '../components/AlertMessages'

const Signup = () => {
    const navigate = useNavigate()
    const { setUser, setMessages } = useOutletContext()
    const [ userName, setUserName] = useState('')
    const [ email, setEmail] = useState('')
    const [ password, setPassword] = useState('')
    const [ confirmPassword, setConfirmPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

        const createUser = {
            userName,
            email,
            password,
            confirmPassword
        }
        // try {
            const response = await fetch('/api/signup', { // Assuming /signup is your backend route
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(createUser),
                credentials: 'include'
            });

            const data = await response.json(); // Parse the JSON response
            console.log(data)

             if (data.message){
            setMessages(data.message)
            console.log(data.message)
        }
        if (data.user){
            setUser(data.user)
            // navigate('/feed')
        }

        //     if (response.ok) { // Check if the HTTP status code is 2xx (success)
        //         // Handle successful signup and login
        //         console.log('Signup successful:', data);
        //         // You can store user data (e.g., in Context/Redux)
        //         // Redirect user to /feed on the client-side using react-router-dom's navigate
        //         // navigate('/feed');
        //     } else {
        //         // Handle errors based on the JSON response
        //         console.error('Signup failed:', data.message);
        //         // Display `data.message` and/or `data.errors` to the user in your UI
        //         // Example: set local state htmlFor error message display
        //         setError(data.message || 'Unknown error');
        //         if (data.errors) {
        //             // Display specific validation errors to the user
        //             console.log(data.errors);
        //         }
        //     }
        // } catch (error) {
        //     console.error('Network error during signup:', error);
        //     setError('Could not connect to the server. Please try again.');
        // }
    }

    return (
        <div>
            {/* <Header data='text-center' /> */}

            {/* <!-- Main Section --> */}
            <main className="container min-h-125">
                <div className="row justify-content-center">
                    <section className="col-6 mt-5 w-full flex">
                        <section className="mx-auto">

                            {/* <!-- Back Button --> */}
                            <Link to="/" className="btn btn-primary">
                                <FaArrowLeft />
                                Back
                            </Link>

                            {/* Flash Message htmlFor errors */}
                            {/* <AlertMessages messages={messages} /> */}

                            {/* <!-- Sign Up Form --> */}
                            {/* <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 mt-2 rounded-box">
                                <form action="/signup" method="POST">
                                    <div className="mb-3">
                                        <Input label='User Name' name='username' type='text' />
                                    </div>
                                    <div className="mb-3">
                                        <Input label='Email Address' name='exampleInputEmail1' type='email' descriptionId='emailHelp' />
                                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                    </div>
                                        <div className="mb-3">
                                            <Input label='Password' name='password' type='password' />
                                        </div>
                                    <div className="mb-3">
                                        <Input label='Confirm Password' name='confirm Password' type='password' />
                                    </div>  
                                    <Submit value='Submit' type='submit' />
                                </form>
                            </fieldset> */}

                            {/* <!-- Sign Up Form --> */}
            <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 mt-2 rounded-box">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="userName" className="fieldset-label">User Name</label>
                  <input 
                        type="text" 
                        className="input" 
                        id="userName" 
                        name="userName" 
                        required
                        value={userName}
                        onChange={(e)=> setUserName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="fieldset-label">Email address</label>
                  <input 
                        type="email" 
                        className="input" 
                        id="exampleInputEmail1" 
                        aria-describedby="emailHelp" 
                        name="email" 
                        required
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                    />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="fieldset-label">Password</label>
                  <input 
                        type="password" 
                        className="input" 
                        id="password" 
                        name="password" 
                        required
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="fieldset-label">Confirm Password</label>
                  <input 
                        type="password" 
                        className="input" 
                        id="confirmPassword" 
                        name="confirmPassword" 
                        required
                        value={confirmPassword}
                        onChange={(e)=> setConfirmPassword(e.target.value)}
                        />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </fieldset>

                        </section>
                    </section>
                </div>
            </main>            

            {/* <Footer /> */}
        </div>
    )
}

export default Signup
