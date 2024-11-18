import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export default function UserSignUp() {

    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
    })
    
    const [errorMsg, setErrorMsg] = useState('')
    const host = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5010'
    const userUrl = `${host}/api/v1/user/signup`
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
            navigate(`/user/login`)
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
            <form>
                <h2>User Signup</h2>
                    <div class="form-group row">
                        <label>Username</label>
                        <input type="text" class="form-control" id="username" name="username" 
                            value={user.username} onChange={handleInput}/>
                    </div>
                    <div class="form-group row">
                        <label>Email</label>
                        <input type="email" class="form-control" id="email" name="email" 
                        value={user.email} onChange={handleInput}/>
                    </div>
                    <div class="form-group row">
                        <label>Password</label>
                        <input type="password" class="form-control" id="password" name="password" 
                            value={user.password} onChange={handleInput}/>
                    </div>

                    <div class="d-flex justify-content-start">
                            <input type="submit" value="Signup" class="btn btn-primary m-1" onClick={handleSubmit}></input>
                            <button class="btn btn-secondary m-1" onClick={() => navigate('/user/login')}>Cancel</button>
                    </div>
                    <div class="text-danger"><p>{errorMsg}</p></div>
            </form>
        </div>
    )
}
