import React, {useState, useEffect, Fragment} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'


export default function EmployeeUpdate() {
    const [employee, setEmployee] = useState({
        first_name: '',
        last_name: '',
        email: '',
        position: '',
        salary: '',
        department: '',
        date_of_joining: '',
        created_at: '',
        updated_at: ''
    })
    const [errorMsg, setErrorMsg] = useState("")
    const { employeeId } = useParams()
    const host = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5010'
    const employeesUrl = `${host}/api/v1/emp/employees`
    const navigate = useNavigate();

    const getEmployee = async() => {
        try {
            const res = await axios.get(`${employeesUrl}/${employeeId}`);
            console.log(res.data)
            setEmployee(res.data)
        } catch (err) {
            console.error(err)
        }
    }

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
            const res = await axios.put(`${employeesUrl}/${employeeId}`, {
                ...employee,
                date_of_joining: employee.date_of_joining.substring(0,10)
            });
            navigate(`/employee/details/${employee._id}`)
        } catch (err) {
            console.error(err)
            if(err.response){
                console.error('Response data:', err.response.data);
                console.error('Response status:', err.response.status);
                console.error('Response headers:', err.response.headers);
                const errorMessages = err.response.data.error?.map(err => err.msg).join('\n');
                // alert(`Oops, there seems to be a problem :(\n\n${err.response.data.message}\n${errorMessages}`)
                setErrorMsg(`${err.response.data.message}.\n${errorMessages}`)
            }
        } 
    }

    const goToEmployeeList = () =>{
        navigate('/employee')
    }

    useEffect(() => {
        getEmployee()
    }, [employeeId])


    return (
        <div class="w-75 m-4 p-4">
            <form>
                <h2>Employee Update</h2>
                <p>Please ensure all changes are accurate and backups are available.</p>
                    <div class="form-group row">
                        <label>First Name</label>
                        <input type="text" class="form-control" id="first_name" name="first_name" 
                            value={employee.first_name} onChange={handleInput}/>
                    </div>
                    <div class="form-group row">
                    <label>Last Name</label>
                    <input type="text" class="form-control" id="last_name" name="last_name" 
                        value={employee.last_name} onChange={handleInput}/>
                    </div>
                    <div class="form-group row">  
                        <label>Email</label>
                        <input type="email" class="form-control" id="email" name="email" 
                        value={employee.email} onChange={handleInput}/>
                    </div>
                    <div class="form-group row">
                        <label>Position</label>
                        <input type="text" class="form-control" id="position" name="position" 
                            value={employee.position} onChange={handleInput}/>
                    </div>
                    <div class="form-group row">   
                        <label>Salary</label>
                        <input type="number" class="form-control" id="salary" name="salary" 
                            value={employee.salary} onChange={handleInput}/>
                    </div>
                    <div class="form-group row">   
                        <label>Department</label>
                        <input type="text" class="form-control" id="department" name="department" 
                            value={employee.department} onChange={handleInput}/>
                    </div>
                    <div class="form-group row">
                        <label>Date of Joining</label>
                        <input type="date" class="form-control" id="date_of_joining" name="date_of_joining" 
                            value={employee.date_of_joining?.substring(0,10)} onChange={handleInput}/>
                    </div>
                    <div class="form-group row">
                        <label>Created at: </label>
                        <input type="text" class="form-control" id="created_at" name="created_at" disabled
                            value={employee.created_at?.substring(0,10)} onChange={handleInput}/>
                    </div>
                    <div class="form-group row">
                        <label>Updated at</label>
                        <input type="text" class="form-control" id="updated_at" name="updated_at" disabled
                            value={employee.updated_at?.substring(0,10)} onChange={handleInput}/>
                    </div>
                    <div class="d-flex justify-content-start">
                            <input type="submit" value="Update" class="btn btn-primary m-1" onClick={handleSubmit}></input>
                            <button class="btn btn-secondary m-1" onClick={() => goToEmployeeList()}>Cancel</button>
                    </div>
                    <div class="text-danger"><p>{errorMsg}</p></div>
            </form>
        </div>
    )
}
