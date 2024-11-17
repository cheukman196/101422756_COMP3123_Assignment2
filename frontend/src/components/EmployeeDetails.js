import React, {useState, useEffect, Fragment} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

export default function EmployeeDetails() {
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

    const goToEmployeeList = () =>{
      navigate('/employee')
    }

    const goToEmployeeUpdate = () =>{
      navigate(`/employee/update/${employeeId}`)
    }

  useEffect(() => {
      getEmployee()
  }, [employeeId])

    return (
        <div class="w-75 m-4 p-4">
        <form>
            <h2>Employee Details</h2>
            <p>Reminder from HR: Please do not divulge corporate information.</p>
                <div class="form-group row">
                    <label>First Name</label>
                    <input type="text" class="form-control" id="first_name" name="first_name" 
                        value={employee.first_name} disabled/>
                </div>
                <div class="form-group row">
                <label>Last Name</label>
                <input type="text" class="form-control" id="last_name" name="last_name" 
                    value={employee.last_name} disabled/>
                </div>
                <div class="form-group row">  
                    <label>Email</label>
                    <input type="email" class="form-control" id="email" name="email" 
                    value={employee.email} disabled/>
                </div>
                <div class="form-group row">
                    <label>Position</label>
                    <input type="text" class="form-control" id="position" name="position" 
                        value={employee.position} disabled/>
                </div>
                <div class="form-group row">   
                    <label>Salary</label>
                    <input type="number" class="form-control" id="salary" name="salary" 
                        value={employee.salary} disabled/>
                </div>
                <div class="form-group row">
                    <label>Department</label>
                    <input type="text" class="form-control" id="department" name="department" 
                        value={employee.department} disabled/>
                </div>
                <div class="form-group row">
                    <label>Date of Joining</label>
                    <input type="date" class="form-control" id="date_of_joining" name="date_of_joining" 
                        value={employee.date_of_joining?.substring(0,10)} disabled/>
                </div>
                <div class="form-group row">
                    <label>Created at: </label>
                    <input type="text" class="form-control" id="created_at" name="created_at"
                        value={employee.created_at?.substring(0,10)} disabled/>
                </div>
                <div class="form-group row">
                    <label>Updated at</label>
                    <input type="text" class="form-control" id="updated_at" name="updated_at"
                        value={employee.updated_at?.substring(0,10)} disabled/>
                </div>
                <div class="d-flex justify-content-start">
                        <input type="submit" value="Edit" class="btn btn-warning m-1" onClick={() => goToEmployeeUpdate()}></input>
                        <button class="btn btn-secondary m-1" onClick={() => goToEmployeeList()}>Cancel</button>
                </div>
            </form>
        </div>
    )
}
