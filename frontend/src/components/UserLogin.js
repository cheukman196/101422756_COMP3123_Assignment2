import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function UserLogin() {

    const [user, setUser] = useState({
        username: '',
        password: '',
    })
    
    const [errorMsg, setErrorMsg] = useState('')
    const host = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5010'
    const userUrl = `${host}/api/v1/user/login`
    const navigate = useNavigate();

    const handleInput = (e) => {
        const {name, value} = e.target
        console.log(`${name}: ${value}`)
        setUser((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        setErrorMsg('');
        try {
            const res = await axios.post(userUrl, {
              ...user,
            });
            navigate(`/employee`)

        } catch (err) {
            console.error(err)
            if(err.response){
                console.error('Response data:', err.response.data);
                console.error('Response status:', err.response.status);
                console.error('Response headers:', err.response.headers);
                let errorMessages = '';
                if(Array.isArray(err.response.data.error)){
                    errorMessages = err.response.data.error?.map(err => err.msg).join('\n');
                } 
                setErrorMsg(`${err.response.data.message}\n${errorMessages}`)
            }

        } 
    }

    return (
        <div class="w-50 m-4 p-4">
            <form onSubmit={handleSubmit}>
                <h2>User Login</h2>
                    <div class="form-group row">
                        <label>Username / Email</label>
                        <input type="text" class="form-control" id="username" name="username" 
                            value={user.username} onChange={handleInput}/>
                    </div>

                    <div class="form-group row">
                        <label>Password</label>
                        <input type="password" class="form-control" id="password" name="password" 
                            value={user.password} onChange={handleInput}/>
                    </div>

                    <div class="d-flex justify-content-start">
                            <input type="submit" value="Sign In" class="btn btn-primary m-1"></input>
                            <button class="btn btn-secondary m-1" onClick={() => navigate('/user/signup')}>Create Account</button>
                    </div>
                    <div class="text-danger"><p>{errorMsg}</p></div>
            </form>
        </div>
    )
}
