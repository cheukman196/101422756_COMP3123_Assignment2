import React, {useState, useEffect, Fragment} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'


export default function EmployeeUpdate() {
    const [employee, setEmployee] = useState({
        first_name: '',
        last_name: '',
        email: '',
        position: '',
        salary: '',
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
        console.log(employee._id)
        try {
            console.log(`${employeesUrl}/${employeeId}`)
            console.log(employee)
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
        <div>
            <form>
                <h2>Employee Update</h2>
                    <label>First Name</label>
                    <input type="text" id="first_name" name="first_name" 
                        value={employee.first_name} onChange={handleInput}/>

                    <label>Last Name</label>
                    <input type="text" id="last_name" name="last_name" 
                        value={employee.last_name} onChange={handleInput}/>

                    <label>Email</label>
                    <input type="email" id="email" name="email" 
                        value={employee.email} onChange={handleInput}/>

                    <label>Position</label>
                    <input type="text" id="position" name="position" 
                        value={employee.position} onChange={handleInput}/>

                    <label>Salary</label>
                    <input type="number" id="salary" name="salary" 
                        value={employee.salary} onChange={handleInput}/>

                    <label>Date of Joining</label>
                    <input type="date" id="date_of_joining" name="date_of_joining" 
                        value={employee.date_of_joining?.substring(0,10)} onChange={handleInput}/>
                    
                    <label>Created at: </label>
                    <input type="text" id="create_at" name="create_at" disabled
                        value={employee.created_at?.substring(0,10)} onChange={handleInput}/>
                    
                    <label>Updated at</label>
                    <input type="text" id="updated_at" name="updated_at" disabled
                        value={employee.updated_at?.substring(0,10)} onChange={handleInput}/>


                    <input type="submit" value="Update" onClick={handleSubmit}></input>
                    <button onClick={() => goToEmployeeList()}>Cancel</button>
                    <div><p>{errorMsg}</p></div>
            </form>
        </div>
    )
}
