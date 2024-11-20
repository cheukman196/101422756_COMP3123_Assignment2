import React, {useState, useEffect, Fragment} from 'react'
import axios from '../config/AxiosConfig'
import { useNavigate } from 'react-router-dom'
import UserInfo from './UserInfo'

// Component: List to display all existing employees
// Displays name, department and position
// Provides buttons to Update employee, see Details, and Delete employee

export default function EmployeeList(){
    const [employees, setEmployees] = useState([])
    const [refreshList, setRefreshList] = useState(false) // flag for emp list to re-render
    const [deptSearchString, setDeptSearchString] = useState('')
    const [searchInput, setSearchInput] = useState('')
    const host = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5010'
    const employeesUrl = host + "/api/v1/emp/employees"
    const navigate = useNavigate();


    const getEmployees = async() => {
        try {
            // if search string provided, .../api/v1/emp/employees?dept=xxx
            const url = `${employeesUrl}${deptSearchString != ''? `?dept=${deptSearchString}` : ""}`
            const res = await axios.get(url);
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

    const deleteEmployee = async (empId, fname, lname) => {
        if (window.confirm(`Confirm deleting employee: "${fname} ${lname}"?`)){
            try {
                await axios.delete(`${employeesUrl}?eid=${empId}`)
                setRefreshList(true)
            } catch (err){
                console.error(err)
                alert("Error deleting employee.")
            }
        } 
    }

    const handleInput = (e) => {
        const {value} = e.target
        setSearchInput(value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setDeptSearchString(searchInput)
        setRefreshList(true)
    }

    useEffect(() => {
        // refresh on refresh flag true, toggle flag to false
        getEmployees();
        setRefreshList(false)
    }, [refreshList]) 


    return (
        <div className="container">
            <UserInfo></UserInfo>
            <h2>Employee List</h2>
            <button className="btn btn-primary" onClick={() => {navigate(`/employee/create`)}}>Create Employee</button>
            <br></br>
            <form onSubmit={handleSubmit} className="my-3">
                <div className='d-flex'>
                    <input type="text" name="dept" id="dept" value={searchInput} onChange={handleInput} 
                        placeholder='Search by Department' className="form-control w-50"></input>
                    <button className="btn btn-warning m-1" type="submit">Search</button>
                    { deptSearchString == '' ?
                        <></> :
                        <button className="btn btn-secondary m-1" onClick={() => {
                            setDeptSearchString('')
                            setSearchInput('')
                            setRefreshList(true)
                        }}>Cancel</button>
                    }
                </div>
            </form>
            <h5>{deptSearchString == ''? '' : `Search by Department: '${deptSearchString}'`}</h5>

            <table className="table">
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Position</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((emp, index) => (
                    <tr key={index}>
                        <td>{emp.first_name} {emp.last_name}</td>
                        <td>{emp.department}</td>
                        <td>{emp.position}</td>
                        <td>
                            <button className="btn btn-primary mx-1" onClick={() => goToEmployeeUpdate(emp._id)}>Update</button>
                            <button className="btn btn-secondary mx-1" onClick={() => goToEmployeeDetail(emp._id)}>Details</button>
                            <button className="btn btn-danger mx-1" onClick={() => deleteEmployee(emp._id, emp.first_name, emp.last_name)}>Delete</button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
