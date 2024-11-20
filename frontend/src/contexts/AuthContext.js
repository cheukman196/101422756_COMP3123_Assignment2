import React, { createContext, useState, useEffect } from 'react'
import axios from '../config/AxiosConfig'
import { useNavigate } from 'react-router-dom'

// AuthContext and AuthProvider
// holds Authenticate information

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false) // whether user is authenticated
    const [token, setToken] = useState(null) // current token, unused after updating to use cookies
    const [username, setUsername] = useState('') // current username
    const navigate = useNavigate()

    const login = (token, username) => {
        setIsAuth(true)
        setToken(token)
        setUsername(username)
    }

    const logout = async () => {
        try {
          // call backend to send http request to delete cookie
          // because cookie is set to HttpCookie (cannot be accessed via javascript)
          axios.post('/api/v1/user/logout', {}, { withCredentials: true })
          setIsAuth(false)
          setToken(null)
          setUsername('')
          navigate('/')
        } catch (err) {
          console.error(err)
        }
        
    }

    // on page refresh, check for existing cookie by sending a request to backend
    // if cookie exists, it will be sent along with the request
    // if cookie exists & verified by backend, it will send back auth state to frontend
    useEffect(() => {
        const checkAuth = async () => {
          try {
            console.log('calling checkAuth()')
            console.log("axios cookie check")
            const res = await axios.get('/api/v1/user/check-auth', { withCredentials: true });
            
            setIsAuth(res.data.isAuth);
            setUsername(res.data.username);
            if(isAuth)
              navigate('/employee')
                
          } catch (err) {
            setIsAuth(false);
            setUsername(null);
          }
        };
        checkAuth();
      }, []);

      // Important: since auth state check and update is async,
      // conditional nav may fail due to the async nature
      // To fix that, we trigger a check only after isAuth is updated (listed dependency here)
      useEffect(() => {
        if(isAuth)
          navigate('/employee')
      }, [isAuth]);


    return (
        <AuthContext.Provider value={{ isAuth, token, username, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthProvider}
