import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Very important!
  const navigate = useNavigate();

  const API_BASE_URL = 'http://localhost:5000'; // Your backend URL

  // Function to check auth status on initial app load
    const checkAuthStatus = async () => {
        try {
            setIsLoading(true); // Start loading
            const res = await fetch(`${API_BASE_URL}/login`);
            const data = await res.json()

            if (data.isAuthenticated && data.user) {
                setUser(data.user);
                setIsAuthenticated(true);
            } else {
                setUser(null);
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.error('Error checking auth status:', error);
            setUser(null);
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false) // Finished loading
        }
    };

    // Function to handle user login
  const login = async (email, password) => {
    try {
      const res = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok && data.isAuthenticated && data.user) {
        setUser(data.user);
        setIsAuthenticated(true);
        navigate('/feed'); // Redirect to feed on successful login
        return { success: true, user: data.user };
      } else {
        // Handle login errors (e.g., incorrect credentials)
        return { success: false, message: data.message || 'Login failed.' };
      }
    } catch (error) {
      console.error('Error during login:', error);
      return { success: false, message: 'Network error or server unavailable.' };
    }
  };

  // Function to handle user logout
  const logout = async () => {
    try {
      await fetch(`${API_BASE_URL}/logout`, {
        method: 'POST', // Logout is typically a POST request
      });
      setUser(null);
      setIsAuthenticated(false);
      navigate('/login'); // Redirect to login after logout
    } catch (error) {
      console.error('Error during logout:', error);
      // Even if error, typically log out on client side
    }
  };


  // Run checkAuthStatus once on component mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

//   const login = async (email, password) => { /* ... (as discussed) ... */ };
//   const logout = async () => { /* ... (as discussed) ... */ };

  const authContextValue = useMemo(() => ({
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    checkAuthStatus,
  }), [user, isAuthenticated, isLoading, login, logout, checkAuthStatus]); // Include functions in dependency array

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);