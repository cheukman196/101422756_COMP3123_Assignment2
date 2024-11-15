import React, {useState, useEffect, Fragment} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'


export default function EmployeeUpdate() {
    const [employee, setEmployee] = useState({})
    const { employeeId } = useParams()
    const host = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5010'
    const employeesUrl = `${host}/api/v1/emp/employees`
    const navigate = useNavigate();


    const getEmployee = async() => {
        try {
            console.log(employeesUrl + `/${employeeId}`)
            const res = await axios.get(employeesUrl + `/${employeeId}`);
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
                    <input type="text" id="email" name="email" 
                        value={employee.email} onChange={handleInput}/>

                    <label>Position</label>
                    <input type="text" id="position" name="position" 
                        value={employee.position} onChange={handleInput}/>

                    <label>Salary</label>
                    <input type="text" id="salary" name="salary" 
                        value={employee.salary} onChange={handleInput}/>

                    <label>Date of Joining</label>
                    <input type="text" id="date_of_joining" name="date_of_joining" 
                        value={employee.date_of_joining?.substring(0,10)} onChange={handleInput}/>

                    <p>Created On: {employee.created_at?.substring(0,10)}</p>
                    <p>Last Updated: {employee.update_at ? employee.update_at.substring(0,10) : 'n/a'}</p>
            </form>
        </div>
    )
}
