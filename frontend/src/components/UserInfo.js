import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

// Component: display username after login, show Logout button

export default function UserInfo() {
    const { isAuth, username, logout } = useContext(AuthContext)

    return (
        <>
        { isAuth ?
        <div className="container d-flex align-items-center justify-content-end">
            <div className="font-monospace"><h6>Welcome {username}</h6></div>
            <div><button className="btn btn-outline-secondary btn-sm m-2" onClick={logout}>Logout</button></div>
        </div> : 
        <div></div>
        }
        
        </>
    )
}
