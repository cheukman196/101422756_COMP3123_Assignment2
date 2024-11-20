import React, {useState, useEffect, Fragment} from 'react'
import axios from '../config/AxiosConfig'
import { useNavigate, useParams } from 'react-router-dom'
import UserInfo from './UserInfo'

// Component: static form (disabled) to display employee details
// has button to navigate to employee update form

export default function EmployeeDetails() {
    // initialize state to avoid error displaying
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
    const { employeeId } = useParams() // get id from url params
    const host = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5010'
    const employeesUrl = `${host}/api/v1/emp/employees`
    const navigate = useNavigate();

    const getEmployee = async() => {
        try {
            const res = await axios.get(`${employeesUrl}/${employeeId}`);
            setEmployee(res.data)
        } catch (err) {
            console.error(err)
        }
    }

    const goToEmployeeList = () =>{
      navigate('/employee')
    }

    const goToEmployeeUpdate = () =>{
      navigate(`/employee/update/${employeeId}`)
    }

  useEffect(() => {
      getEmployee()
  }, [employeeId]) // re-render if employeeId is updated

    return (
        <div className="w-75 m-4 p-4">
            <UserInfo></UserInfo>
        <form>
            <h2>Employee Details</h2>
            <p>Reminder from HR: Please do not divulge corporate information.</p>
                <div className="form-group row">
                    <label>First Name</label>
                    <input type="text" className="form-control" id="first_name" name="first_name" 
                        value={employee.first_name} disabled/>
                </div>
                <div className="form-group row">
                <label>Last Name</label>
                <input type="text" className="form-control" id="last_name" name="last_name" 
                    value={employee.last_name} disabled/>
                </div>
                <div className="form-group row">  
                    <label>Email</label>
                    <input type="email" className="form-control" id="email" name="email" 
                    value={employee.email} disabled/>
                </div>
                <div className="form-group row">
                    <label>Position</label>
                    <input type="text" className="form-control" id="position" name="position" 
                        value={employee.position} disabled/>
                </div>
                <div className="form-group row">   
                    <label>Salary</label>
                    <input type="number" className="form-control" id="salary" name="salary" 
                        value={employee.salary} disabled/>
                </div>
                <div className="form-group row">
                    <label>Department</label>
                    <input type="text" className="form-control" id="department" name="department" 
                        value={employee.department} disabled/>
                </div>
                <div className="form-group row">
                    <label>Date of Joining</label>
                    <input type="date" className="form-control" id="date_of_joining" name="date_of_joining" 
                        value={employee.date_of_joining?.substring(0,10)} disabled/>
                </div>
                <div className="form-group row">
                    <label>Created at: </label>
                    <input type="text" className="form-control" id="created_at" name="created_at"
                        value={employee.created_at?.substring(0,10)} disabled/>
                </div>
                <div className="form-group row">
                    <label>Updated at</label>
                    <input type="text" className="form-control" id="updated_at" name="updated_at"
                        value={employee.updated_at?.substring(0,10)} disabled/>
                </div>
                <div className="d-flex justify-content-start">
                        <input type="submit" value="Edit" className="btn btn-warning m-1" onClick={() => goToEmployeeUpdate()}></input>
                        <button className="btn btn-secondary m-1" onClick={() => goToEmployeeList()}>Cancel</button>
                </div>
            </form>
        </div>
    )
}
