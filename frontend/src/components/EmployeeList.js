import React, {useState, useEffect, Fragment} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function EmployeeList(){
    const [employees, setEmployees] = useState([])
    const host = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5010'
    const employeesUrl = host + "/api/v1/emp/employees"
    const navigate = useNavigate();


    const getEmployees = async() => {
        try {
            const res = await axios.get(employeesUrl);
            console.log(res.data)
            setEmployees(res.data)

        } catch (err) {
            console.error(err)
        }
    }

    const goToEmployeeDetail = (empId) => {
        navigate(`/employee/details/${empId}`)
    }

    const goToEmployeeUpdate = (empId) => {
        navigate(`/employee/update/${empId}`)
    }

    useEffect(() => {
        getEmployees();
    }, []) 


    return (
        <>
        <table>
            <thead>
                <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {employees.map((emp, index) => (
                <tr key={index}>
                    <td>{emp.first_name} {emp.last_name}</td>
                    <td>{emp.email}</td>
                    <td>{emp.department}</td>
                    <td>
                        <button onClick={() => goToEmployeeUpdate(emp._id)}>Update</button>
                        <button onClick={() => goToEmployeeDetail(emp._id)}>Details</button>
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
        </>
    )
}
