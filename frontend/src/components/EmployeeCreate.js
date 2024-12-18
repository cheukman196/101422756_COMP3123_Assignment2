import React, {useState} from 'react'
import axios from '../config/AxiosConfig'
import { useNavigate, useParams } from 'react-router-dom'
import UserInfo from './UserInfo'

// Component: Form for employee creation

export default function EmployeeCreate() {
    // get current date: format yyyy-mm-dd for html date input 
    let date = new Date(Date.now())
    date = date.toISOString().split('T')[0]

    const [employee, setEmployee] = useState({
        first_name: '',
        last_name: '',
        email: '',
        position: '',
        salary: '',
        department: '',
        date_of_joining: date,
    })
    
    const [errorMsg, setErrorMsg] = useState('')
    const host = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5010'
    const employeesUrl = `${host}/api/v1/emp/employees`
    const navigate = useNavigate();

    const handleInput = (e) => {
        const {name, value} = e.target
        console.log(`${name}: ${value}`)
        setEmployee((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        setErrorMsg('');
        try {
            // call add employee and navigate to employee list
            const res = await axios.post(employeesUrl, {
              ...employee,
            });
            navigate(`/employee`)
        } catch (err) {
            // if validation fails, display error msg
            console.error(err)
            if(err.response){
                console.error('Response data:', err.response.data);
                console.error('Response status:', err.response.status);
                console.error('Response headers:', err.response.headers);
                const errorMessages = err.response.data.error?.map(err => err.msg).join('\n');
                setErrorMsg(`${err.response.data.message}.\n${errorMessages}`)
            }
        } 
    }

    const goToEmployeeList = () =>{
        navigate('/employee')
    }

    return (
        <div className="w-75 m-4 p-4">
            <UserInfo></UserInfo>
            <form>
                <h2>Create New Employee</h2>
                    <div className="form-group row">
                        <label>First Name</label>
                        <input type="text" className="form-control" id="first_name" name="first_name" 
                            value={employee.first_name} onChange={handleInput}/>
                    </div>
                    <div className="form-group row">
                    <label>Last Name</label>
                    <input type="text" className="form-control" id="last_name" name="last_name" 
                        value={employee.last_name} onChange={handleInput}/>
                    </div>
                    <div className="form-group row">  
                        <label>Email</label>
                        <input type="email" className="form-control" id="email" name="email" 
                        value={employee.email} onChange={handleInput}/>
                    </div>
                    <div className="form-group row">
                        <label>Position</label>
                        <input type="text" className="form-control" id="position" name="position" 
                            value={employee.position} onChange={handleInput}/>
                    </div>
                    <div className="form-group row">   
                        <label>Salary</label>
                        <input type="number" className="form-control" id="salary" name="salary" 
                            value={employee.salary} onChange={handleInput}/>
                    </div>
                    <div className="form-group row">
                        <label>Department</label>
                        <input type="text" className="form-control" id="department" name="department" 
                            value={employee.department} onChange={handleInput}/>
                    </div>
                    <div className="form-group row">
                        <label>Date of Joining</label>
                        <input type="date" className="form-control" id="date_of_joining" name="date_of_joining" 
                            value={employee.date_of_joining} onChange={handleInput}/>
                    </div>

                    <div className="d-flex justify-content-start">
                            <input type="submit" value="Create" className="btn btn-primary m-1" onClick={handleSubmit}></input>
                            <button className="btn btn-secondary m-1" onClick={() => goToEmployeeList()}>Cancel</button>
                    </div>
                    <div className="text-danger"><p>{errorMsg}</p></div>
            </form>
        </div>
    )
}
