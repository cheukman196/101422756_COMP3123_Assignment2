import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { Navigate } from 'react-router-dom'

// Component to wrap screens that are only accessible after login
// Check auth state using AuthContext

export default function PrivateRoute({ children }) {
    const { isAuth } = useContext(AuthContext)
    console.log(`Is Authenticated: ${isAuth}`) // display auth state
    return isAuth? children : <Navigate to="/" />
}
